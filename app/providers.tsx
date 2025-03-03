"use client";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";
import { AdminUserProvider } from "./context/AdminUserContext";

type Props = {
  children: ReactNode;
};

const Providers = (props: Props) => {
  return <SessionProvider>
    <AdminUserProvider>
      {props.children}
    </AdminUserProvider>
  </SessionProvider>;
};

export default Providers;
