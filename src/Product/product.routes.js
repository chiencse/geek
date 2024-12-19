const express = require("express");
const router = express.Router();
const ProductController = require("./product.controller");

/**
 * @swagger
 * tags:
 *   - name: Products
 *     description: API for managing products
 */

/**
 * @swagger
 * /products/filter:
 *   get:
 *     tags:
 *       - Products
 *     summary: Filter products based on various filters
 *     description: Allows users to filter products by price, color, search term, and category.
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Page number for pagination
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: pageSize
 *         in: query
 *         description: Number of products per page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *       - name: minPrice
 *         in: query
 *         description: Minimum price for filtering products
 *         required: false
 *         schema:
 *           type: number
 *           format: float
 *       - name: maxPrice
 *         in: query
 *         description: Maximum price for filtering products
 *         required: false
 *         schema:
 *           type: number
 *           format: float
 *       - name: color
 *         in: query
 *         description: Color of the product to filter
 *         required: false
 *         schema:
 *           type: string
 *       - name: searchTerm
 *         in: query
 *         description: Term to search for in product names
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of filtered products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       ProductID:
 *                         type: integer
 *                       ProductName:
 *                         type: string
 *                       BasePrice:
 *                         type: number
 *                         format: float
 *                       RateAverage:
 *                         type: number
 *                         format: float
 *                       Color:
 *                         type: string
 *                       CategoryName:
 *                         type: string
 *                 meta:
 *                   type: object
 *                   properties:
 *                     totalRecords:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *                     currentPage:
 *                       type: integer
 *                     pageSize:
 *                       type: integer
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 details:
 *                   type: string
 */

router.get("/filter", ProductController.filterProducts);

module.exports = router;
