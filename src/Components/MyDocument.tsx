"use client";
import { Document, Page, Text, View } from "@react-pdf/renderer";
import { styles } from "./styles";
import { customerInfoType } from "@/Apptypes/InputsType";
import { productInfoType } from "@/Apptypes/productType";

type payStatusType = "Paid" | "Unpaid" | "Pending";

type BillProps = {
  docType:string;
  customerInfo: customerInfoType;
  products: productInfoType[];
  status: payStatusType;
};

const Bill = (props: BillProps) => {
  const { docType,customerInfo, products, status } = props;

  const totalPrice = products.reduce((acc, item) => {
    const discountedPrice = item.price - (item.price * item.discount) / 100;
    return acc + discountedPrice * item.quantity;
  }, 0);

  return (
    <Document
      title="Invoice"
      author="AlgoBright Tech Private Limited"
      subject="Invoice Document"
      keywords="Invoice, PDF, React-PDF"
    >
      <Page size="A4" style={styles.page} id="invoice">
        <View style={styles.bill}>
          <View style={styles.compInfo}>
            <View style={styles.leftItems}>
              {/* logo and trademark */}
              <View style={styles.suppa}>
                <Text style={styles.companyName}>AlgoBright</Text>
                <Text style={styles.companyNameSup}>TM</Text>
              </View>

              <View style={styles.compAddress}>
                <Text style={styles.compName}>
                  Algobright Tech Private Limited
                </Text>
                <Text>
                  C/o Arvind Rajendra Mehta,{"\n"}
                  A635,wardno.44, Paharpura,{"\n"}
                  Biharsharif, Nalanda, Biharsharif, Bihar,{"\n"}
                  803101{"\n"}
                  INDIA
                </Text>
              </View>

              <View style={styles.billTo}>
                <Text style={styles.billToLabel}>Billed To:</Text>
                <Text>
                  {customerInfo.name}
                  {"\n"}
                  {customerInfo.address}
                  {"\n"}
                  Phone no. : +91 {customerInfo.phone.toString()}
                  {"\n"}
                  Email: {customerInfo.email}
                </Text>
              </View>
            </View>

            <View style={styles.rightItems}>
              <Text style={styles.invoice}>{docType}</Text>

              <View style={styles.invoiceDetails}>
                <View style={styles.eachInfo}>
                  <Text style={styles.eachInfoLabel}>Invoice No</Text>
                  <Text style={styles.eachInfoValue}> : INV-001</Text>
                </View>
                <View style={styles.eachInfo}>
                  <Text style={styles.eachInfoLabel}>Date</Text>
                  <Text style={styles.eachInfoValue}> : 10-06-2026</Text>
                </View>
              </View>

              <View style={styles.amountDetails}>
                <View style={styles.eachInfo}>
                  <Text style={styles.eachInfoLabel}>Total Amount (INR)</Text>
                  <Text style={styles.eachInfoValue}>
                    {" "}
                    : Rs. {totalPrice.toFixed(2)}/-
                  </Text>
                </View>
                <View style={styles.eachInfo}>
                  <Text style={styles.eachInfoLabel}>Mode of Payment</Text>
                  <Text style={styles.eachInfoValue}> : Cash</Text>
                </View>
                <View style={styles.eachInfo}>
                  <Text style={styles.eachInfoLabel}>Status</Text>
                  <Text
                    style={[
                      styles.eachInfoValue,
                      styles.payStatus,
                      styles[status.toLowerCase() as "paid" | "unpaid"],
                    ]}
                  >
                    {" "}
                    : {status}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.OrderItems}>
            <View style={styles.itemHeader}>
              <Text style={styles.colDescription}>Description</Text>
              <Text style={styles.colPrice}>Price</Text>
              <Text style={styles.colDiscount}>Discount</Text>
              <Text style={styles.colAmount}>Amount</Text>
            </View>
            <View style={styles.itemsList}>
              {products.map((item, index) => (
                <View
                  style={[
                    styles.itemRow,
                    index % 2 === 0 ? styles.itemRowOdd : styles.itemRowEven,
                  ]}
                  key={item.id}
                >
                  <Text style={styles.colDescription}>{item.description}</Text>
                  <Text style={styles.colPrice}>
                    Rs. {item.price.toFixed(2)}
                  </Text>
                  <Text style={styles.colDiscount}>{item.discount}%</Text>
                  <Text style={styles.colAmount}>
                    Rs.{" "}
                    {(item.price - (item.price * item.discount) / 100).toFixed(
                      2,
                    )}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Bill;

// import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
// import { customerInfoType } from "@/Apptypes/InputsType";
// import { productInfoType } from "@/Apptypes/productType";

// // Styles work like CSS-in-JS, flexbox based
// const styles = StyleSheet.create({
//   page: {
//     padding: 30,
//     fontSize: 12,
//   },
//   title: {
//     fontSize: 20,
//     marginBottom: 10,
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 5,
//   },
// });

// // This is where "props" come in — your component takes data in
// // and uses it to fill the PDF, instead of hardcoding text.
// type InvoiceItem = {
//   name: string;
//   price: number;
// };

// type MyDocumentProps = {
//   customerName: string;
//   items: InvoiceItem[];
// };

// // Define props type, then destructure it in the function signature
// export default function MyDocument({ customerName, items }: MyDocumentProps) {
//   return (
//     <Document>
//       <Page size="A4" style={styles.page}>
//         <Text style={styles.title}>Invoice for {customerName}</Text>

//         {items.map((item, index) => (
//           <View style={styles.row} key={index}>
//             <Text>{item.name}</Text>
//             <Text>₹{item.price}</Text>
//           </View>
//         ))}
//       </Page>
//     </Document>
//   );
// }
