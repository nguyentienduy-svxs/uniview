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

## Test phân quyền bằng mock user

Auth chạy ở chế độ mock theo mặc định. Thêm các biến sau vào file `.env` ở thư mục gốc:

```env
VITE_AUTH_MODE=mock
VITE_MOCK_SESSION=free
```

`VITE_MOCK_SESSION` nhận một trong các giá trị:

- `guest`: chưa đăng nhập
- `free`: tài khoản Free
- `direction`: có gói Direction Snapshot
- `admission`: có gói Admission Pass
- `both`: có cả hai entitlement

Khởi động lại Vite sau khi đổi giá trị. Khi nối backend thật, đổi thành `VITE_AUTH_MODE=api`; `AuthContext` sẽ gọi `/auth/me` qua `authApi`.
