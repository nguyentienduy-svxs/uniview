import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from "fs";
import path from "path";
import { buildXlsxBuffer, generateExcelCsv } from "./scripts/excelBuilder.js";

function syncExcelFiles(entries) {
  try {
    const xlsxBuf = buildXlsxBuffer(entries);
    const csvContent = generateExcelCsv(entries);

    const rootXlsx = path.resolve(process.cwd(), "feedbacks-export.xlsx");
    const rootCsv = path.resolve(process.cwd(), "feedbacks-export.csv");
    const publicDir = path.resolve(process.cwd(), "public");

    try { fs.writeFileSync(rootXlsx, xlsxBuf); } catch {}
    try { fs.writeFileSync(rootCsv, csvContent, "utf8"); } catch {}

    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    try { fs.writeFileSync(path.resolve(publicDir, "feedbacks-export.xlsx"), xlsxBuf); } catch {}
    try { fs.writeFileSync(path.resolve(publicDir, "feedbacks-export.csv"), csvContent, "utf8"); } catch {}
  } catch (err) {
    console.warn("[UniView Feedback] Lỗi ghi file Excel:", err);
  }
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "feedback-dev-api",
      configureServer(server) {
        const feedbackFile = path.resolve(process.cwd(), "feedbacks-local-db.json");
        let initialEntries = [];
        if (fs.existsSync(feedbackFile)) {
          try {
            initialEntries = JSON.parse(fs.readFileSync(feedbackFile, "utf8") || "[]");
            syncExcelFiles(initialEntries);
          } catch {}
        }

        server.middlewares.use("/api/feedback", (req, res) => {
          let current = [];
          if (fs.existsSync(feedbackFile)) {
            try {
              current = JSON.parse(fs.readFileSync(feedbackFile, "utf8") || "[]");
            } catch {}
          }

          const url = req.url || "";
          if (req.method === "GET" && (url.includes("xlsx") || url.includes("excel"))) {
            const buf = buildXlsxBuffer(current);
            res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            res.setHeader("Content-Disposition", 'attachment; filename="feedbacks-export.xlsx"');
            res.statusCode = 200;
            res.end(buf);
            return;
          }

          if (req.method === "GET" && (url.includes("export") || url.endsWith(".csv"))) {
            const csv = generateExcelCsv(current);
            res.setHeader("Content-Type", "text/csv; charset=utf-8");
            res.setHeader("Content-Disposition", 'attachment; filename="uniview-feedbacks.csv"');
            res.statusCode = 200;
            res.end(csv);
            return;
          }

          if (req.method === "POST") {
            const chunks = [];
            req.on("data", (chunk) => {
              chunks.push(chunk);
            });
            req.on("end", () => {
              try {
                const bodyStr = Buffer.concat(chunks).toString("utf8");
                const parsed = JSON.parse(bodyStr || "{}");
                current.unshift({
                  ...parsed,
                  userName: parsed.userName || (parsed.userId ? "Thành viên" : "Khách vãng lai (Chưa đăng nhập)"),
                  receivedAt: new Date().toISOString(),
                });
                fs.writeFileSync(feedbackFile, JSON.stringify(current, null, 2), "utf8");
                syncExcelFiles(current);
                console.log("[UniView Feedback] Đã lưu phản hồi vào database và cập nhật file Excel feedbacks-export.xlsx thành công!");
              } catch (err) {
                console.warn("[UniView Feedback] Lỗi xử lý feedback:", err);
              }
              res.setHeader("Content-Type", "application/json");
              res.statusCode = 200;
              res.end(JSON.stringify({
                ok: true,
                message: "Đã lưu góp ý vào database và file Excel",
                excelUrl: "/feedbacks-export.xlsx",
              }));
            });
          } else if (req.method === "GET") {
            res.setHeader("Content-Type", "application/json");
            res.statusCode = 200;
            res.end(JSON.stringify(current));
          } else {
            res.setHeader("Content-Type", "application/json");
            res.statusCode = 200;
            res.end(JSON.stringify({ ok: true }));
          }
        });
      },
    },
  ],
});
