# 📦 Thư mục Mock Data — UniView

Thư mục này tập trung toàn bộ dữ liệu mẫu (mock data) được sử dụng tạm thời khi cơ sở dữ liệu PostgreSQL chưa có dữ liệu thật.

## Danh sách các file mock:
- `user.js`: Tài khoản mẫu (Nguyễn Minh Anh, Huỳnh Huệ Mẫn, Guest profile, demo credentials)
- `annualDemo.js`: Kịch bản và dữ liệu mẫu gói Annual Demo
- `careerReport.js`: Báo cáo nghề nghiệp và điểm chuẩn mẫu
- `decisionBoard.js`: Bảng ra quyết định và kịch bản so sánh mẫu
- `taskWorkspaces.js`: Nhiệm vụ trải nghiệm và minh chứng mẫu
- Các file `*.html`: Mẫu báo cáo tĩnh dạng HTML/PDF

## Cách chuyển đổi giữa Mock Data và Real Database:
1. **Trên giao diện người dùng**:
   - Ở góc dưới màn hình có nút **🛠 Dev Tools: Data Mode**.
   - Bấm **📋 Mock** để sử dụng mock data trong thư mục này.
   - Bấm **🌐 Real API** để kết nối trực tiếp đến Spring Boot backend (`http://localhost:8080`) và PostgreSQL trên Render.
2. **Trong file cấu hình `.env`**:
   - `VITE_DATA_MODE=mock` (mặc định)
   - `VITE_DATA_MODE=real`
   - `VITE_AUTH_MODE=api` (khi muốn đăng nhập/đăng ký lưu vào PostgreSQL thật)

## Khi nào có thể xóa thư mục này?
Khi bạn đã nhập đầy đủ dữ liệu thực vào database PostgreSQL trên Render và bật `VITE_DATA_MODE=real`, bạn có thể xóa toàn bộ thư mục `mock-data/` này mà không ảnh hưởng đến các luồng chính của hệ thống.
