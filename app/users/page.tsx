"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import ApiRoutes from "../api/apiRoutes";
import { fetchData } from "../api/api";
import { FullPageLoader } from "../components/Loader/ComponentLoader";
interface User {
  id: number;
  name: string;
}
function Page() {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[], Error>({
    queryKey: [ApiRoutes.FetchUsers],
    queryFn: () => fetchData<User>({ endpoint: ApiRoutes.FetchUsers }),
  });
  if (isLoading) {
    return <FullPageLoader />;
  }
  return (
    <div className="p-12 w-full grid grid-cols-3 place-items-center ">
      {users?.map((user) => {
        return <li key={user.id}>{user.name}</li>;
      })}
    </div>
  );
}

export default Page;
