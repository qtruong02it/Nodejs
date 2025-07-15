# 🌐 Node.js RESTful API

Đây là một dự án xây dựng API sử dụng **Node.js** và **Express.js** với kiến trúc **MVC rõ ràng**, đồng thời kết hợp **Sequelize** (ORM) để kết nối và thao tác với cơ sở dữ liệu quan hệ (SQL). Dự án phù hợp để học tập hoặc làm nền tảng cho các hệ thống backend thực tế.


---

## 🚀 Tính năng chính

- Tạo RESTful API chuẩn cho các thao tác CRUD
- Tổ chức code rõ ràng theo mô hình MVC
- Sử dụng Sequelize để thao tác với cơ sở dữ liệu
- Hỗ trợ migration và seed dữ liệu bằng Sequelize CLI
- Cấu hình linh hoạt bằng biến môi trường `.env`
- (Tuỳ chọn) Giao diện view với EJS

---

## ⚙️ Cài đặt & chạy ứng dụng

### Bước 1 – Clone dự án về máy
```bash
Bước 1
git clone https://github.com/qtruong02it/Nodejs.git
cd Nodejs
Bước 2 – Cài đặt các thư viện phụ thuộc
npm install
Bước 3 – Thiết lập biến môi trường
Tạo file .env mới (hoặc sao chép từ .env.example) và chỉnh sửa:

  DB_HOST=localhost
  DB_USER=root
  DB_PASSWORD=yourpassword
  DB_NAME=nodejs_demo
  DB_DIALECT=mysql
  PORT=3000
Bước 4 – Khởi tạo cơ sở dữ liệu

  npx sequelize-cli db:migrate       # Tạo bảng
  npx sequelize-cli db:seed:all      # Thêm dữ liệu mẫu
Bước 5 – Chạy ứng dụng
  npm start
  # hoặc
  node src/server.js
  Mở trình duyệt tại địa chỉ: http://localhost:3000
