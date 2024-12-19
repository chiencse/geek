const { getPool, sql } = require("../config/db");

exports.filterProducts = async (
  offset,
  size,
  minPrice,
  maxPrice,
  color,
  searchTerm
) => {
  try {
    const pool = await getPool();

    // First query to get the filtered products with pagination
    const productsQuery = `
        SELECT DISTINCT 
          p.ProductID, 
          p.ProductName, 
          p.BasePrice, 
          p.RateAverage, 
          pc.Color,
          c.Name AS CategoryName
        FROM Product p
        LEFT JOIN ProductColor pc ON p.ProductID = pc.ProductID
        LEFT JOIN Category c ON p.CategoryID = c.CategoryID
        WHERE 
          p.BasePrice BETWEEN @MinPrice AND @MaxPrice
          AND (@Color IS NULL OR pc.Color = @Color)
          AND (@SearchTerm IS NULL OR p.ProductName LIKE '%' + @SearchTerm + '%')
        ORDER BY p.RateAverage DESC
        OFFSET @Offset ROWS FETCH NEXT @Size ROWS ONLY;
      `;

    const result = await pool
      .request()
      .input("MinPrice", sql.Decimal, minPrice)
      .input("MaxPrice", sql.Decimal, maxPrice)
      .input("Color", sql.VarChar, color || null)
      .input("SearchTerm", sql.NVarChar, searchTerm || null)
      .input("Offset", sql.Int, offset)
      .input("Size", sql.Int, size)
      .query(productsQuery);

    // Second query to get the total number of filtered records
    const countQuery = `
        SELECT COUNT(*) AS totalRecords
        FROM Product p
        LEFT JOIN ProductColor pc ON p.ProductID = pc.ProductID
        LEFT JOIN Category c ON p.CategoryID = c.CategoryID
        WHERE 
          p.BasePrice BETWEEN @MinPrice AND @MaxPrice
          AND (@Color IS NULL OR pc.Color = @Color)
          AND (@SearchTerm IS NULL OR p.ProductName LIKE '%' + @SearchTerm + '%');
      `;

    const countResult = await pool
      .request()
      .input("MinPrice", sql.Decimal, minPrice)
      .input("MaxPrice", sql.Decimal, maxPrice)
      .input("Color", sql.VarChar, color || null)
      .input("SearchTerm", sql.NVarChar, searchTerm || null)
      .query(countQuery);

    const totalRecords = countResult.recordset[0].totalRecords;

    return {
      products: result.recordset,
      totalRecords,
    };
  } catch (err) {
    throw new Error(err.message);
  }
};
