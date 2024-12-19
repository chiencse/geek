// models/order.model.js
const { getPool, sql } = require("../config/db");

exports.createOrder = async (orderDTO) => {
  const pool = await getPool();
  try {
    // Execute stored procedure InsertOrder
    const result = await pool
      .request()
      .input("UserName", sql.NVarChar, orderDTO.userName)
      .input("ProductName", sql.NVarChar, orderDTO.productName)
      .input("Color", sql.NVarChar, orderDTO.color)
      .input("Size", sql.Int, orderDTO.size)
      .input("Quantity", sql.Int, orderDTO.quantity)
      .input("PhoneNo", sql.NVarChar, orderDTO.phoneNo)
      .input("Note", sql.NVarChar, orderDTO.note)
      .input("AddressID", sql.Int, orderDTO.addressID || null)
      .input("PaymentID", sql.Int, orderDTO.paymentID)
      .input("CarrierID", sql.Int, orderDTO.carrierID || null)
      .input("Price", sql.Decimal(10, 2), orderDTO.price)
      .input("Email", sql.NVarChar, orderDTO.email)
      .input("District", sql.NVarChar, orderDTO.district || null)
      .input("Commune", sql.NVarChar, orderDTO.commune || null)
      .input("Province", sql.NVarChar, orderDTO.province || null)
      .input("Address", sql.NVarChar, orderDTO.address || null)
      .input("HouseType", sql.NVarChar, orderDTO.houseType || null)
      .input("DiscountID", sql.Int, orderDTO.discountID || null)
      .execute("InsertOrder");

    // Return the result of the stored procedure execution
    return result.recordset;
  } catch (err) {
    console.error("Error executing stored procedure:", err);
    throw new Error("An error occurred while placing the order");
  }
};

exports.executePayment = async (orderID) => {
  return {
    message: "Payment will execute via API Gateway",
  };
};
