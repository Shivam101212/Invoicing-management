import Image from "next/image";
import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";
import Features from "../Components/Features";
import Cta from "../Components/Cta";
import Footer from "../Components/Footer";

export default function Home() {
  return (
    <>
    <Navbar />
    <Hero />
    <Features />
    <Cta />
    <Footer />
    {/* {Array.from({ length: 100 }).map((_, index) => (
      <p key={index} className="text-center text-blue bg-red-500">
        Scroll down to see the navbar effect!
      </p>
    ))} */}
    
    </>
  );
}
