# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
# uniview

## Test phân quyền bằng tài khoản mock

Đặt `VITE_AUTH_MODE=mock` trong `.env`, sau đó đăng nhập bằng một trong ba tài khoản:

- `chiduy / ChiDuy@2026`: Gói Tháng — Personal Workspace trong 30 ngày.
- `chiman / ChiMan@2026`: Gói Năm — toàn bộ hành trình 12 tháng và đã bao gồm Admission Pass.
- `chian / ChiAn@2026`: Admission Pass 2027 — công cụ cho một mùa tuyển sinh.

Bảng giá được cấu hình tập trung trong `.env` bằng `VITE_MONTHLY_PLAN_PRICE`, `VITE_ANNUAL_PLAN_PRICE` và `VITE_ADMISSION_PASS_PRICE`. Khi nối backend thật, đổi `VITE_AUTH_MODE=api`; `AuthContext` sẽ gọi `/auth/me` qua `authApi`.
