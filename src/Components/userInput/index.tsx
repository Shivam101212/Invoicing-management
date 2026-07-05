import React, { Dispatch, SetStateAction } from "react";
import styles from "./user.module.css";
import { customerInfoType } from "@/Apptypes/InputsType";
import { productInfoType } from "@/Apptypes/productType";
import { FaUser } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";


type UserInputProps = {
  customerInfo: customerInfoType;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  products: productInfoType[];
  handleProductChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
  ) => void;
  handleRemoveItem: (id: number) => void;
  handleAddProduct: () => void;
};

const UserInput = (props: UserInputProps) => {
  const {
    customerInfo,
    products,
    handleInputChange,
    handleProductChange,
    handleRemoveItem,
    handleAddProduct,
  } = props;

  return (
    <div className={styles.userInput}>
      <div className={styles.invoiceDetails}>Billing Details</div>
      <div className={styles.customer}>
        <div className={styles.customerInfo}>
          <FaUser />
          <span>Customer Information</span>
        </div>
        <div className={styles.one}>
          <span>Customer Name</span>
          <input
            type="text"
            placeholder="Enter customer name"
            className={styles.customerName}
            name="name"
            value={customerInfo.name}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.two}>
          <span>Customer Address</span>
          <input
            type="text"
            placeholder="Enter customer address"
            className={styles.customerAddress}
            name="address"
            value={customerInfo.address}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.third}>
          <span>Customer Phone</span>
          <input
            type="text"
            placeholder="Enter customer phone number"
            className={styles.customerPhone}
            name="phone"
            value={customerInfo.phone}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.forth}>
          <span>Customer Email </span>
          <input
            type="text"
            placeholder="Enter customer email"
            className={styles.customerEmail}
            name="email"
            value={customerInfo.email}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className={styles.products}>
        <div className={styles.producthead}>
          <div className={styles.pdleft}>
            <MdOutlineShoppingCart />
            <span>Order Items</span>
          </div>
          <button
            className={styles.addProductButton}
            onClick={handleAddProduct}
          >
            + Add Product
          </button>
        </div>

        {/* <div className={styles.heading}>
          <span>Product Name</span>
          <span>Product Price</span>
          <span>Discount</span>
          <span>Final Price</span>
        </div> */}
        {products.map((product) => (
          <OrderItem
            key={product.id}
            product={product}
            handleProductChange={handleProductChange}
            handleRemoveItem={handleRemoveItem}
          />
        ))}
      </div>
    </div>
  );
};

export default UserInput;

const OrderItem = (props: {
  product: productInfoType;
  handleProductChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
  ) => void;
  handleRemoveItem: (id: number) => void;
}) => {
  const { product, handleProductChange, handleRemoveItem } = props;
  const finalPrice = product.price - (product.price * product.discount) / 100;

  return (
    <div className={styles.orderItem}>
      <div className={styles.itemHead}>
        <div className={styles.pdtittle}>
          <span>Product Name</span>
          <input
          type="text"
          placeholder="Enter product name"
          className={styles.productName}
          name="description"
          value={product.description}
          onChange={(e) => handleProductChange(e, product.id)}
        />
        </div>
        <button
          className={styles.removeButton}
          onClick={() => handleRemoveItem(product.id)}
        >
          <RiDeleteBin6Line />

        </button>
      </div>

      <div className={styles.bottomItem}>
        <div className={styles.price}>
        <span>Price</span>
        <input
        type="text"
        placeholder="Enter product price"
        className={styles.productPrice}
        name="price"
        value={product.price}
        onChange={(e) => handleProductChange(e, product.id)}
      />
      </div>

      <div className={styles.Discount}>
        <span>Discount</span>
        <input
        type="text"
        placeholder="Discount"
        className={styles.productDiscount}
        name="discount"
        value={product.discount}
        onChange={(e) => handleProductChange(e, product.id)}
      />
      </div>

      <div className={styles.final}>
        <span>Final Price</span>
        <input
        type="text"
        placeholder="Final Price"
        className={styles.finalPrice}
        name="finalPrice"
        value={finalPrice}
        readOnly
      />
      </div>
      </div>
    </div>
  );
};
