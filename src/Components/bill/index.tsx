import { customerInfoType } from "@/Apptypes/InputsType";
import { productInfoType } from "@/Apptypes/productType";
import styles from "./bill.module.css";

type payStatusType = "Paid" | "Unpaid" | "Pending";

type BillProps = {
  customerInfo: customerInfoType;
  products: productInfoType[];
  status: payStatusType;
  compRef: React.RefObject<HTMLDivElement | null>;

};

const Bill = (props: BillProps) => {
  const { customerInfo, products, status,compRef } = props;

  const totalPrice = products.reduce((acc, item) => {
    const discountedPrice = item.price - (item.price * item.discount) / 100;
    return acc + discountedPrice * item.quantity;
  }, 0);

  return (
    <div className={styles.bill} ref={compRef}>
      {/* company info */}
      <div className={styles.compInfo}>
        {/* left items */}
        <div className={styles.leftItems}>
          <span className={styles.companyName}>
            AlgoBright <span>TM</span>
          </span>
          <div className={styles.compAddress}>
            <span className={styles.compName}>
              Algobright Tech Private Limited
            </span>
            <span>
              C/o Arvind Rajendra Mehta,
              <br />
              A635,wardno.44, Paharpura,
              <br />
              Biharsharif, Nalanda, Biharsharif, Bihar,
              <br />
              803101 <br />
              INDIA
            </span>
          </div>

          <div className={styles.billTo}>
            <span>Billed To:</span>
            <span>
              {customerInfo.name} <br />
              {customerInfo.address} <br />
              Phone no. : +91 {customerInfo.phone.toString()}
              <br />
              Email: {customerInfo.email}
            </span>
          </div>
        </div>

        {/* right items */}
        <div className={styles.rightItems}>
          <span className={styles.invoice}>Invoice</span>

          {/* invoice info */}
          <div className={styles.invoiceDetails}>
            <div className={styles.eachInfo}>
              <span>Invoice No</span>
              <span>&nbsp;:&nbsp;INV-001</span>
            </div>
            <div className={styles.eachInfo}>
              <span>Date</span>
              <span>&nbsp;:&nbsp;10-06-2026</span>
            </div>
          </div>

          {/* amount details */}
          <div className={styles.amountDetails}>
            <div className={styles.eachInfo}>
              <span>Total Amount (INR)</span>
              <span>&nbsp;:&nbsp;Rs. {totalPrice.toFixed(2)}/-</span>
            </div>
            <div className={styles.eachInfo}>
              <span>Mode of Payment</span>
              <span>&nbsp;:&nbsp;Cash</span>
            </div>
            <div className={styles.eachInfo}>
              <span>Status</span>
              <span
                className={`${styles.payStatus} ${styles[status.toLowerCase()]}`}
              >
                &nbsp;:&nbsp;{status}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* items info */}
      <div className={styles.OrderItems}>
        <div className={styles.itemHeader}>
          <span>Description</span>
          <span>Price</span>
          <span>Discount</span>
          <span>Amount</span>
        </div>
        <div className={styles.itemsList}>
          {products.map((item) => (
            <div className={styles.itemRow} key={item.id}>
              <span>{item.description}</span>
              <span>Rs. {item.price.toFixed(2)}</span>
              <span>{item.discount}%</span>
              <span>
                Rs.{" "}
                {(
                  item.price -
                  (item.price * item.discount) / 100
                ).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bill;
