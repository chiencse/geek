const express = require("express");
const router = express.Router();
const CategoryController = require("./category.controller");

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: API for managing Categories
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Fetches a list of all product categories available on the platform
 *     description: Returns a list of all categories, including details such as category ID, name, description, and parent category ID.
 *     tags:
 *       - Categories
 *     responses:
 *       200:
 *         description: Successfully fetched categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   categoryID:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: Electronics
 *                   description:
 *                     type: string
 *                     example: Electronics and gadgets
 *                   parentCategoryID:
 *                     type: integer
 *                     nullable: true
 *                     example: null
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An error occurred while fetching categories. Please try again later.
 */

router.get("/", CategoryController.getAllCategory);

/**
 * @swagger
 * /categories/{categoryID}/products:
 *   get:
 *     summary: Fetch all products by category with pagination
 *     description: Returns a paginated list of products belonging to a specific category.
 *     tags:
 *       - Categories
 *     parameters:
 *       - name: categoryID
 *         in: path
 *         required: true
 *         description: The ID of the category to fetch products for.
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: page
 *         in: query
 *         required: false
 *         description: The page number (default is 1).
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: pageSize
 *         in: query
 *         required: false
 *         description: The number of items per page (default is 10).
 *         schema:
 *           type: integer
 *           example: 5
 *     responses:
 *       200:
 *         description: Successfully fetched products by category.
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
 *                       productID:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "Product Name"
 *                       price:
 *                         type: number
 *                         format: float
 *                         example: 100.0
 *                 meta:
 *                   type: object
 *                   properties:
 *                     totalRecords:
 *                       type: integer
 *                       example: 50
 *                     totalPages:
 *                       type: integer
 *                       example: 10
 *                     currentPage:
 *                       type: integer
 *                       example: 2
 *                     pageSize:
 *                       type: integer
 *                       example: 5
 *       400:
 *         description: Bad Request (Invalid parameters).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid category ID or pagination parameters."
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An error occurred while fetching products."
 */
router.get("/:categoryID/products", CategoryController.getAllProductByCategory);

module.exports = router;
