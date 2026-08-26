"use client";

import { useId, useRef, useState, useEffect } from "react";
import styles from "./page.module.css";
import UserInput from "@components/userInput";
import { customerInfoType } from "@/Apptypes/InputsType";
import { productInfoType } from "@/Apptypes/productType";
import Bill from "@components/MyDocument";
import { PDFViewer } from "@/lib/react-pdf";
import dynamic from "next/dynamic";

const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  },
);
type orderItemType = {
  id: number;
  description: string;
  quantity: number;
  price: number;
};
// customer data
type CustomerPreset = {
  key: string;
  label: string;
  data: customerInfoType;
};

export default function Home() {
  const invoiceRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [docType, setDocType] = useState<string>("Invoice");

  const [customerPresets, setCustomerPresets] = useState<CustomerPreset[]>([]);

  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  useEffect(() => {
    const fetchCustomers = async () => {
      const res = await fetch("/api/customers");

      if (!res.ok) {
        console.error("Error fetching customers:", await res.text());
        return;
      }

      const data = await res.json();

      const formatted: CustomerPreset[] = data.map((c: customerInfoType) => ({
        key: c.key, // using your actual `key` column from the DB now
        label: c.name,
        data: {
          name: c.name,
          address: c.address,
          phone: c.phone,
          email: c.email,
        },
      }));

      setCustomerPresets(formatted);
    };

    fetchCustomers();
  }, []);
  const [customerInfo, setCustomerInfo] = useState<customerInfoType>({
    key: "ramu",
    name: "MediBridge",
    address: "Medi",
    phone: "9090909090",
    email: "main@example.cm",
  });
  // for customer select usestate
  const [selectedCustomer, setSelectedCustomer] =
    useState<string>("SelectCustomer");

  const [products, setProducts] = useState<productInfoType[]>([
    {
      id: 0,
      description: "",
      price: 0,
      discount: 0,
      quantity: 1,
    },
  ]);
  // customer change handler
  const handleCustomerSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const key = e.target.value;
    setSelectedCustomer(key);

    if (key === "SelectCustomer") return; // placeholder option, do nothing

    const preset = customerPresets.find((c) => c.key === key);
    if (preset) {
      setCustomerInfo(preset.data);
    }
  };
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

  const isFormFilled =
    !!customerInfo.name?.toString().trim() &&
    !!customerInfo.address?.toString().trim() &&
    !!customerInfo.phone?.toString().trim() &&
    !!customerInfo.email?.toString().trim();

  const handleSaveCustomer = async () => {
    setSaveError(null);
    setIsSaving(true);

    try {
      const res = await fetch("/api/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customerInfo),
      });

      const result = await res.json();

      if (!res.ok) {
        setSaveError(result.error || "Something went wrong");
        return;
      }

      // add the new customer to the dropdown list immediately, no page refresh needed
      setCustomerPresets((prev) => [
        ...prev,
        { key: result.key, label: result.name, data: result },
      ]);

      setSelectedCustomer(result.key); // auto-select the newly added customer
    } catch (err) {
      setSaveError("Network error, please try again");
    } finally {
      setIsSaving(false);
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
        docType={docType}
        setDocType={setDocType}
        customerInfo={customerInfo}
        handleInputChange={handleInputChange}
        products={products}
        handleProductChange={handleProductChange}
        handleRemoveItem={handleRemoveItems}
        handleAddProduct={handleAddItem}
        selectedCustomer={selectedCustomer}
        handleCustomerSelect={handleCustomerSelect}
        customerOptions={customerPresets}
        onSaveCustomer={handleSaveCustomer}
        isSaveDisabled={!isFormFilled || isSaving}
        saveError={saveError}
        isSaving={isSaving}
      />
      <div
        style={{
          width: "100%",
          height: "100vh",
          // backgroundColor: "red",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Invoice Preview Wrapper with the Ref attached */}
        {/* <div className={styles.invoicePreview}> */}
        <PDFViewer width="100%" height="100%">
          <Bill
            docType={docType}
            customerInfo={customerInfo}
            products={products}
            status="Paid"
          />
        </PDFViewer>
        <PDFDownloadLink
          document={
            <Bill
              customerInfo={customerInfo}
              products={products}
              status="Paid"
              docType={docType}
            />
          }
          fileName="invoice.pdf"
          className="w-170px  -mt-11 rounded-lg bg-blue-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-800"
        >
          {({ loading }) =>
            loading ? "Preparing document..." : "Download PDF"
          }
        </PDFDownloadLink>
      </div>

      {/* <button
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
      </button> */}
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
