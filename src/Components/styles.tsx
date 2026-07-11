"use client";
import { StyleSheet, Font } from "@react-pdf/renderer";

// Register real font files — react-pdf can't use CSS var() or system fonts
Font.register({
  family: "Smooch",
  src: "/fonts/Smooch_Sans/static/SmoochSans-Regular.ttf",
});
Font.register({
  family: "Inter",
  src: "/fonts/Inter/static/Inter_18pt-Regular.ttf",
});

// Assuming 1em ≈ 12pt as base — adjust if your base size differs
export const styles = StyleSheet.create({
  page: {
    width: "210mm",
    height: "297mm",
  },
  bill: {
    flexDirection: "column",
    position: "relative",
    width: "210mm",
    height: "297mm",
    backgroundColor: "#ffffff",
  },

  compInfo: {
    flexDirection: "row",
    width: "100%",
     // 2em
  },

  // left/right column widths replace grid-template-columns: 323fr 206fr
  leftItems: {
    flexDirection: "column",
    width: "59.06%",padding: 24
  },
  rightItems: {
    flexDirection: "column",
    width: "41.94%",
    padding: 28
  },

  suppa: {
    flexDirection: "row",
  },
  companyName: {
    position: "relative",
    fontFamily: "Smooch",
    fontSize: 30, 
    fontWeight: "bold",
    color: "#0076ce",
  },
  companyNameSup: {
    fontSize: 6, 
    height: 10,
  },

  compAddress: {
    flexDirection: "column",
    marginTop: 21, // 1.75em
    fontSize: 12,
    gap: 6, // 0.5em
  },
  compName: {
    fontWeight: 700,
  },

  billTo: {
    flexDirection: "column",
    marginTop: 24, // 2em
    gap: 9, // 0.75em
    width: "70%",
    textAlign: "justify",
    fontSize: 12,
  },
  billToLabel: {
    fontWeight: 700,
  },

  invoice: {
    width: "100%",
    textAlign: "center",
    fontSize: 18, // 2em
    textTransform: "uppercase",
  },

  invoiceDetails: {
    marginTop: 30, // 1.75em
    
  },

  eachInfo: {
    flexDirection: "row",
  },
  eachInfoLabel: {
    width: "57.14%", // 2fr of 2fr/1.5fr
    fontSize: 12,
    fontWeight: 700,
  },
  eachInfoValue: {
    width: "42.86%", // 1.5fr of 2fr/1.5fr
    fontSize: 12,
  },

  amountDetails: {
    marginTop: 24, // 2em
  },

  payStatus: {
    fontWeight: 700,
  },
  paid: {
    color: "#00b300",
  },
  unpaid: {
    color: "#ff0000",
  },

  // Order Items
  OrderItems: {
    flexDirection: "column",
    marginTop: 12, // 1em
    width: "100%",
    fontSize: 12,
  },

  itemHeader: {
    flexDirection: "row",
    paddingVertical: 6,
    paddingHorizontal: 22,
    width: "100%",
    backgroundColor: "#d9d9d9",
    fontWeight: 700,
    gap: 12,
  },

  itemsList: {
    backgroundColor: "#f2f2f2",
    flexDirection: "column",
    width: "100%",
  },

  itemRow: {
    flexDirection: "row",
    paddingVertical: 6,
    paddingHorizontal: 18,
    gap: 12,
    width: "100%",
  },
  itemRowOdd: {
    backgroundColor: "#f2f2f2",
  },
  itemRowEven: {
    backgroundColor: "#ffffff",
  },

  // columns replace grid-template-columns: 2.5fr 1fr 1fr 1fr (total 5.5)
  colDescription: {
    width: "45.45%",
    textAlign: "left",
  },
  colPrice: {
    width: "18.18%",
    textAlign: "center",
  },
  colDiscount: {
    width: "18.18%",
    textAlign: "center",
  },
  colAmount: {
    width: "18.18%",
    textAlign: "center",
  },
});