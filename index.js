const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json({ limit: "150mb" }));
app.use(bodyParser.urlencoded({ limit: "150mb", extended: true }));

const { getPool, sql } = require("./src/config/db");

//Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API",
      version: "1.0.0",
      description: "Document for API",
    },
    components: {},
    security: [],
  },

  apis: [
    "src/Category/category.routes.js",
    "src/Product/product.routes.js",
    "src/Order/order.routes.js",
  ], // Đường dẫn đến file chứa chú thích Swagger cho API
};

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// app.use("/user", require("./src/user/user.route"));
// app.use("/order", isAuth, require("./src/order/order.routes"));
// app.use("/pro", require("./src/proc/pro.routes"));

app.use("/categories", require("./src/Category/category.routes"));
app.use("/products", require("./src/Product/product.routes"));
app.use("/orders", require("./src/Order/order.routes"));

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(process.env.PORT, async () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
