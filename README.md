# UniView — EdTech Platform

Nền tảng khám phá ngành học, trường đại học và định hướng tuyển sinh cá nhân hóa.

---

## 📁 Cấu trúc Monorepo

```text
uniview/
├── frontend/                  # Toàn bộ ứng dụng React 19 + Vite + Tailwind CSS v4
│   ├── src/
│   │   ├── mock-data/         # 📦 Nơi tập trung TẤT CẢ mock data (dễ xóa sau này)
│   │   ├── api/               # API clients (kết nối Spring Boot + JWT Bearer)
│   │   ├── context/           # DataModeContext, AuthContext, AssessmentContext...
│   │   └── components/
│   │       └── layout/
│   │           └── DataModeToggle.jsx   # 🛠 Nút chuyển đổi Mock ↔ Real API
│   ├── public/
│   ├── scripts/
│   ├── .env                   # VITE_API_URL, VITE_DATA_MODE, VITE_AUTH_MODE
│   ├── package.json
│   └── vite.config.js
│
├── backend/                   # 🚀 Toàn bộ mã nguồn Backend
│   ├── src/main/java/com/uniview/backend/
│   │   ├── config/            # SecurityConfig, CorsConfig, JwtAuthenticationFilter
│   │   ├── auth/              # UserEntity (users table), AuthService, AuthController
│   │   ├── feedback/          # FeedbackEntity (feedbacks table), FeedbackService, FeedbackController
│   │   └── assessment/        # AssessmentProxyController
│   ├── src/main/resources/
│   │   └── application.properties  # Kết nối PostgreSQL trên Render
│   ├── backend-assessment/    # Assessment scoring engine (NestJS)
│   └── pom.xml                # Spring Boot 3.3.5 Maven configuration
│
├── .gitignore
└── README.md
```

---

## 🚀 Hướng dẫn khởi chạy

### 1. Frontend
```bash
cd frontend
npm install
npm run dev        # Chạy tại http://localhost:5173
```

### 2. Backend (Spring Boot)
```bash
cd backend
mvn spring-boot:run   # Chạy tại http://localhost:8080
```

### 3. Assessment Engine (NestJS — nếu dùng Real API mode cho bài khảo sát)
```bash
cd backend/backend-assessment
npm install
npm run start:dev  # Chạy tại http://localhost:8081
```

---

## 🗄️ Cấu hình Database PostgreSQL (Render)

Được cấu hình trong `backend/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://dpg-dbu4erd6e07s73bppg20-a.singapore-postgres.render.com:5432/db_2extn_uniview?sslmode=require
spring.datasource.username=db_2extn_uniview_user
spring.datasource.password=y1lSdLQXkhTxbSW1olqOAjRk3c683awj
spring.datasource.driver-class-name=org.postgresql.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
```

---

## 🔄 Chế độ dữ liệu (Data Mode: Mock ↔ Real API)

1. **Trên giao diện (Góc dưới bên trái)**:
   - Nút **🛠 Dev Tools: Chế độ dữ liệu**
   - **📋 Mock**: Dùng dữ liệu giả trong `src/mock-data/` & `localStorage`.
   - **🌐 Real API**: Gọi API thật từ Spring Boot backend (`http://localhost:8080`) lưu vào PostgreSQL trên Render.
2. **Trong file `.env`**:
   - `VITE_DATA_MODE=mock` hoặc `VITE_DATA_MODE=real`
   - `VITE_AUTH_MODE=mock` hoặc `VITE_AUTH_MODE=api`
