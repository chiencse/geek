class Paging {
  static calculatePaging(page, pageSize) {
    const currentPage = parseInt(page, 10) || 1;
    const size = parseInt(pageSize, 10) || 10;

    if (currentPage < 1) throw new Error("Page must be greater than 0");
    if (size < 1) throw new Error("PageSize must be greater than 0");

    const offset = (currentPage - 1) * size;
    return { currentPage, size, offset };
  }
}

module.exports = Paging;
