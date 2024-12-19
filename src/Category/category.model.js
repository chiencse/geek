const { getPool, sql } = require("../config/db");

exports.getAllCategory = async () => {
  try {
    const pool = await getPool();
    const result = await pool.request().query("SELECT * FROM Category");
    return result.recordset;
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.getAllProductByCategory = async (categoryID, offset, size) => {
  try {
    const pool = await getPool();
    const result = await pool
      .request()
      .input("categoryID", sql.Int, categoryID)
      .input("offset", sql.Int, offset)
      .input("size", sql.Int, size)
      .query(
        `SELECT p.ProductID, p.ProductName, RateAverage, BasePrice, ProductCode, Gender, CategoryID, SupplierID FROM Product p Left Join ProductImage pi on p.ProductID = pi.ProductID WHERE categoryID = @categoryID ORDER BY productID OFFSET @offset ROWS FETCH NEXT @size ROWS ONLY`
      );

    const totalRecords = await pool
      .request()
      .input("categoryID", sql.Int, categoryID)
      .query(
        "SELECT COUNT(*) AS totalRecords FROM Product WHERE categoryID = @categoryID"
      );

    return {
      products: result.recordset,
      totalRecords: totalRecords.recordset[0].totalRecords,
    };
  } catch (err) {
    throw new Error(err.message);
  }
};
