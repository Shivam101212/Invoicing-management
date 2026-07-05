import React from "react";
import SignupForm from "./SignupForm";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";

const page = () => {
  return (
    <>
      <Navbar />
      <SignupForm />
      <Footer />
    </>
  );
};

export default page;
