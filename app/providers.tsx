"use client";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Providers = (props: Props) => {
  return <>{props.children}</>;
};

export default Providers;
