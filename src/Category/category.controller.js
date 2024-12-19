const CategoryModel = require("./category.model");
const Paging = require("../common/Paging");
exports.getAllCategory = async (req, res) => {
  try {
    const categories = await CategoryModel.getAllCategory();
    res.json(categories);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.getAllProductByCategory = async (req, res) => {
  try {
    const { categoryID } = req.params;
    const { page, pageSize } = req.query;

    const { currentPage, size, offset } = Paging.calculatePaging(
      page,
      pageSize
    );

    const { products, totalRecords } =
      await CategoryModel.getAllProductByCategory(categoryID, offset, size);

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
    console.error(err);
    res.status(500).json({
      message: "An error occurred while fetching products.",
      details: err.message,
    });
  }
};
