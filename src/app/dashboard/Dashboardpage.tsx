"use client";

import { useId, useRef, useState } from "react";
import styles from "./page.module.css";
import UserInput from "@components/userInput";
import { customerInfoType } from "@/Apptypes/InputsType";
import { productInfoType } from "@/Apptypes/productType";
import Bill from "@components/MyDocument";
import { PDFViewer } from "@/lib/react-pdf";

type orderItemType = {
  id: number;
  description: string;
  quantity: number;
  price: number;
};

export default function Home() {
  const invoiceRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const [customerInfo, setCustomerInfo] = useState<customerInfoType>({
    name: "MediBridge",
    address: "Medi",
    phone: "9090909090",
    email: "main@example.cm",
  });

  const [products, setProducts] = useState<productInfoType[]>([
    {
      id: 0,
      description: "",
      price: 0,
      discount: 0,
      quantity: 1,
    },
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "name") {
      setCustomerInfo((prev) => ({ ...prev, name: value }));
    } else if (name === "address") {
      setCustomerInfo((prev) => ({ ...prev, address: value }));
    } else if (name === "phone") {
      let numericValue = value.replace(/\D/g, "");
      if (numericValue.length > 10) {
        numericValue = numericValue.slice(0, 10);
      }

      setCustomerInfo((prev) => ({ ...prev, phone: numericValue }));
    } else if (name === "email") {
      setCustomerInfo((prev) => ({ ...prev, email: value.toLowerCase() }));
    }
  };

  const handleProductChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
  ) => {
    const { name, value } = e.target;

    const oldItems = products.find((item) => item.id === id);
    if (!oldItems) return;

    let updatedItem = { ...oldItems, [name]: value };

    if (["price", "discount"].includes(name)) {
      let finalValue = Number(value.replace(/\D/g, ""));

      if (name == "discount") {
        if (finalValue > 100) {
          finalValue = 100;
        }
        if (finalValue < 0) {
          finalValue = 0;
        }
      }
      updatedItem = { ...oldItems, [name]: finalValue };
    }

    setProducts((prevItems) =>
      prevItems.map((item) => (item.id === id ? updatedItem : item)),
    );
  };

  const handleAddItem = () => {
    const defaultValue = {
      id: Date.now(),
      description: "",
      price: 0,
      discount: 0,
      quantity: 1,
    };
    const hasEmptyItem = products.some((item) => item.description === "");

    if (hasEmptyItem) {
      alert("Please fill in all product details before adding a new product.");
      return;
    }
    const newItem = {
      id: Date.now(),
      description: "",
      price: 0,
      discount: 0,
      quantity: 1,
    };
    setProducts((prev) => [...prev, newItem]);
  };

  const handleRemoveItems = (id: number) => {
    if (products.length === 1) {
      setProducts([
        {
          id: 0,
          description: "",
          price: 0,
          discount: 0,
          quantity: 1,
        },
      ]);
    } else {
      setProducts((prev) => prev.filter((product) => product.id !== id));
    }
  };

  return (
    <div className={"mainOuter " + styles.page}>
      <UserInput
        customerInfo={customerInfo}
        handleInputChange={handleInputChange}
        products={products}
        handleProductChange={handleProductChange}
        handleRemoveItem={handleRemoveItems}
        handleAddProduct={handleAddItem}
      />
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          justifyContent: "center",
        }}
      ></div>

      {/* Invoice Preview Wrapper with the Ref attached */}
      {/* <div className={styles.invoicePreview}> */}
      <PDFViewer width="50%" height="600">
        <Bill
          customerInfo={customerInfo}
          products={products}
          status="Paid"
          compRef={invoiceRef}
        />
      </PDFViewer>
      <button
        className={styles.btn}
        // onClick={downloadPDF}
        disabled={
          isDownloading ||
          !customerInfo.name ||
          !customerInfo.address ||
          !customerInfo.phone ||
          !customerInfo.email
        }
        style={{
          padding: "10px 24px",
          backgroundColor: isDownloading ? "#666" : "#0072ce",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: isDownloading ? "not-allowed" : "pointer",
          fontWeight: "bold",
        }}
      >
        {isDownloading ? "Generating PDF..." : "Download Invoice PDF"}
      </button>
    </div>
  );
}

// export default function InvoicePage() {
//   const items = [
//     { name: 'Item A', price: 100 },
//     { name: 'Item B', price: 250 },
//   ];

//   return (
//     <div>
//       {/* Option 1: Preview the PDF right on the page */}
//       <PDFViewer width="50%" height="600">
//         <MyDocument customerName="Rahul" items={items} />
//       </PDFViewer>

//       {/* Option 2: Give the user a download button */}
//       <PDFDownloadLink
//         document={<MyDocument customerName="Rahul" items={items} />}
//         fileName="invoice.pdf"
//       >
//         {({ loading }) =>
//           loading ? 'Preparing document...' : 'Download PDF'
//         }
//       </PDFDownloadLink>
//     </div>
//   );
// }
