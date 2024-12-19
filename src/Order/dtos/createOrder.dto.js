// dto/order.dto.js
class OrderDTO {
  constructor({
    userName,
    productName,
    color,
    size,
    quantity,
    phoneNo,
    note,
    addressID,
    paymentID,
    carrierID,
    price,
    email,
    district,
    commune,
    province,
    address,
    houseType,
    discountID,
  }) {
    this.userName = userName;
    this.productName = productName;
    this.color = color;
    this.size = size;
    this.quantity = quantity;
    this.phoneNo = phoneNo;
    this.note = note;
    this.addressID = addressID;
    this.paymentID = paymentID;
    this.carrierID = carrierID;
    this.price = price;
    this.email = email;
    this.district = district;
    this.commune = commune;
    this.province = province;
    this.address = address;
    this.houseType = houseType;
    this.discountID = discountID;
  }
}

module.exports = OrderDTO;
