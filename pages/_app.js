import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { CartProvider } from "../components/CartContext";
import LoadingBar from "react-top-loading-bar";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    // Handle route change start
    const handleStart = () => {
      setProgress(40);
    };

    // Handle route change complete
    const handleComplete = () => {
      setProgress(100);
    };

    // Handle route change error
    const handleError = () => {
      setProgress(100);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleError);

    // Cleanup event listeners
    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleError);
    };
  }, [router]);

  return (
    <CartProvider>
      <LoadingBar
        color="#610397ff"
        progress={progress}
        waitingTime={400}
        height={3}
        shadow={true}
        onLoaderFinished={() => setProgress(0)}
      />
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </CartProvider>
  );
}