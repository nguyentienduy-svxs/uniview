import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from "fs";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "feedback-dev-api",
      configureServer(server) {
        server.middlewares.use("/api/feedback", (req, res) => {
          const feedbackFile = path.resolve(process.cwd(), "feedbacks-local-db.json");
          let current = [];
          if (fs.existsSync(feedbackFile)) {
            try {
              current = JSON.parse(fs.readFileSync(feedbackFile, "utf8") || "[]");
            } catch {}
          }

          if (req.method === "POST") {
            let body = "";
            req.on("data", (chunk) => {
              body += chunk;
            });
            req.on("end", () => {
              try {
                const parsed = JSON.parse(body || "{}");
                current.unshift({
                  ...parsed,
                  receivedAt: new Date().toISOString(),
                });
                fs.writeFileSync(feedbackFile, JSON.stringify(current, null, 2), "utf8");
                console.log("[UniView Feedback] Đã lưu phản hồi vào database feedbacks-local-db.json thành công!");
              } catch (err) {
                console.warn("[UniView Feedback] Lỗi xử lý feedback:", err);
              }
              res.setHeader("Content-Type", "application/json");
              res.statusCode = 200;
              res.end(JSON.stringify({ ok: true, message: "Đã lưu góp ý vào database" }));
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
