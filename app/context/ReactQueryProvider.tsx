import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

// Define a new instance of QueryClient
const queryClient = new QueryClient();

interface ReactQueryProviderProps {
  children: ReactNode;
}
// provider
export const ReactQueryProvider = ({ children }: ReactQueryProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
