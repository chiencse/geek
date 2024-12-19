require("dotenv").config();
const sql = require("mssql");

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: true, // Sử dụng mã hóa kết nối
    trustServerCertificate: true, // Bỏ qua xác minh chứng chỉ
  },
};

// Tạo kết nối pool và giữ kết nối suốt thời gian hoạt động
let poolPromise = sql.connect(dbConfig);

async function getPool() {
  if (!poolPromise) {
    poolPromise = sql.connect(dbConfig); // Nếu chưa có pool, tạo mới
    console.log("Connected to SQL Server");
  }
  return poolPromise;
}
module.exports = { getPool, sql }; // Xuất pool và sql để sử dụng trong các module khác
