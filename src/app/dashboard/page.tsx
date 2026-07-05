"use client";

import { useId, useRef, useState } from "react";
import Bill from "@components/bill";
import styles from "./page.module.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import UserInput from "@components/userInput";
import { customerInfoType } from "@/Apptypes/InputsType";
import { productInfoType } from "@/Apptypes/productType";

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
    }
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };
  const downloadPDF = async () => {
    const element = invoiceRef.current;
    if (!element) return;

    setIsDownloading(true);

    try {
      // 1. Take a high-resolution snapshot of the specific div
      const canvas = await html2canvas(element, {
        scale: 2, // High resolution for crisp text
        useCORS: true, // Ensures Google Fonts load correctly in the snapshot
        backgroundColor: "#ffffff", // Forces a white background
      });

      const imgData = canvas.toDataURL("image/png");

      // 2. Initialize an A4 PDF
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // 3. Calculate math to perfectly fit the snapshot onto the A4 page
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      // 4. Paste the snapshot onto the PDF and trigger the browser download
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("AlgoBright_Invoice.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to download PDF.");
    } finally {
      setIsDownloading(false);
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
      >
        
      </div>

      {/* Invoice Preview Wrapper with the Ref attached */}
      <div className={styles.invoicePreview}>
       
        <Bill
          customerInfo={customerInfo}
          products={products}
          status="Paid"
          compRef={invoiceRef}
        />
         <button
         className={styles.btn}
          onClick={downloadPDF}
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
    </div>
  );
}
