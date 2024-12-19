// routes/order.routes.js
const express = require("express");
const OrderController = require("./order.controller");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Orders
 *     description: API for managing Orders
 */

/**
 * @swagger
 * /orders/create:
 *   post:
 *     tags:
 *       - Orders
 *     summary: Create a new order
 *     description: Place an order for a product. If the user provides a new address, `AddressID` can be `NULL`. If `CarrierID` is `NULL`, the user will receive the product in-store. `DiscountID` can be `NULL` if no discount is applied.
 *     operationId: createOrder
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *                 description: Name of the user
 *                 example: "assessment"
 *               productName:
 *                 type: string
 *                 description: Name of the product
 *                 example: "KAPPA Women's Sneakers"
 *               color:
 *                 type: string
 *                 description: Color of the product
 *                 example: "Yellow"
 *               size:
 *                 type: integer
 *                 description: Size of the product
 *                 example: 38
 *               quantity:
 *                 type: integer
 *                 description: Quantity of the product to order
 *                 example: 1
 *               phoneNo:
 *                 type: string
 *                 description: Phone number of the user
 *                 example: "328355333"
 *               note:
 *                 type: string
 *                 description: Special note for the order
 *                 example: "Please deliver after 6 PM"
 *               addressID:
 *                 type: integer
 *                 description: ID of the user's address. If `AddressID` is `NULL`, the user can provide a new address in the `address` field.
 *                 nullable: true
 *                 example: 1
 *               paymentID:
 *                 type: integer
 *                 description: ID of the payment method used
 *                 example: 1
 *               carrierID:
 *                 type: integer
 *                 description: ID of the shipping carrier. If `CarrierID` is `NULL`, the user opts for "Receive in Store" instead of home delivery.
 *                 nullable: true
 *                 example: null
 *               price:
 *                 type: number
 *                 format: decimal
 *                 description: Final price for the order (including discounts, taxes, etc.)
 *                 example: 980000
 *               email:
 *                 type: string
 *                 description: Email address of the user
 *                 example: "gu@gmail.com"
 *               district:
 *                 type: string
 *                 description: District of the user's shipping address (optional)
 *                 nullable: true
 *                 example: "Ba Be"
 *               commune:
 *                 type: string
 *                 description: Commune of the user's shipping address (optional)
 *                 nullable: true
 *                 example: "Phu Loc"
 *               province:
 *                 type: string
 *                 description: Province of the user's shipping address (optional)
 *                 nullable: true
 *                 example: "Bac Kan"
 *               address:
 *                 type: string
 *                 description: Full address of the user. Required if `addressID` is `NULL`.
 *                 example: "73 Tan Hoa 2"
 *               houseType:
 *                 type: string
 *                 description: Type of house (optional)
 *                 nullable: true
 *                 example: "Nha rieng"
 *               discountID:
 *                 type: integer
 *                 description: ID of any discount applied. Can be `NULL` if no discount is applied.
 *                 nullable: true
 *                 example: 1
 *     responses:
 *       200:
 *         description: Order successfully placed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Order successfully placed!"
 *
 *       400:
 *         description: Bad Request (Invalid input data)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid data provided for order creation"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An error occurred while creating the order."
 *                 details:
 *                   type: string
 *                   example: "Database connection error"
 */
router.post("/create", OrderController.createOrder);

/**
 * @swagger
 * /orders/{orderID}/payment:
 *   post:
 *     tags:
 *       - Orders
 *     summary: Execute payment for an order
 *     description: Executes the payment process for the specified order ID.
 *     operationId: executePayment
 *     parameters:
 *       - name: orderID
 *         in: path
 *         required: true
 *         description: ID of the order to execute the payment for.
 *         schema:
 *           type: integer
 *           example: 12345
 *     responses:
 *       200:
 *         description: Payment successfully executed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Payment successfully executed for the order."
 *                 data:
 *                   type: object
 *                   description: Result of the payment execution
 *                   additionalProperties: true
 *       400:
 *         description: Bad Request (Invalid order ID)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid order ID provided."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An error occurred while executing payment."
 *                 details:
 *                   type: string
 *                   example: "Payment gateway connection failed"
 */
router.post("/:orderID/payment", OrderController.executePayment);

module.exports = router;
