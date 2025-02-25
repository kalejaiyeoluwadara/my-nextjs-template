"use client";
import React, { FunctionComponent, Suspense, useEffect, useState } from "react";
import { ReactQueryProvider } from "@/app/context/ReactQueryProvider";
import { Toaster } from "sonner";
import images from "@/public/images";
import Image from "next/image";
type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const [loaderIsVisible, setLoaderIsVisible] = useState(true);

  const iswindow = typeof window !== "undefined" ? true : false;

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Set a timeout to hide the loader after 5 seconds
      const timeout = setTimeout(() => {
        setLoaderIsVisible(false);
      }, 2000);

      // Cleanup function to clear the timeout if the component unmounts or dependencies change
      return () => clearTimeout(timeout);
    }
  }, [iswindow]);

  return (
    <>
      {!loaderIsVisible && (
        <ReactQueryProvider>
          <Toaster
            position="bottom-center"
            richColors
            closeButton
            toastOptions={{
              duration: 3000,
              unstyled: false,
            }}
          />
          <Suspense fallback={<PageLoader />}>{children}</Suspense>
        </ReactQueryProvider>
      )}

      {loaderIsVisible && <PageLoader />}
    </>
  );
};

const PageLoader: FunctionComponent = () => {
  return (
    <div className="w-[100vw] h-[100vh] min-h-[100vh] grid place-items-center bg-white">
      <div className="w-40 h-20 animate-pulse transition-all duration-150 ease-in-out object-contain relative">
        <Image src={images.logo} alt="logo" />
      </div>
    </div>
  );
};

export default Layout;
