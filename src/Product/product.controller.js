const { filterProducts } = require("../Product/product.model");
const Paging = require("../common/Paging"); // Assuming paging helper is in `common/paging.js`

exports.filterProducts = async (req, res) => {
  try {
    const {
      page = 1,
      pageSize = 10,
      minPrice,
      maxPrice,
      color,
      searchTerm,
    } = req.query;

    // Calculate pagination
    const { currentPage, size, offset } = Paging.calculatePaging(
      page,
      pageSize
    );

    // Get filtered products and total record count
    const { products, totalRecords } = await filterProducts(
      offset,
      size,
      minPrice,
      maxPrice,
      color,
      searchTerm
    );

    // Calculate total pages
    const totalPages = Math.ceil(totalRecords / size);

    res.json({
      data: products,
      meta: {
        totalRecords,
        totalPages,
        currentPage,
        pageSize: size,
      },
    });
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({
      message: "An error occurred while fetching products.",
      details: err.message,
    });
  }
};
