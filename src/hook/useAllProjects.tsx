// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import { useQuery } from "react-query";
import { useAuthContext } from "../context/AuthContext";
import { getAllProjects } from "../service/http-requests/ide-api";

const baseQuery = "projects";

export default function useAllProjects() {
  const { user } = useAuthContext();
  const allProjectQuery = useQuery(
    [baseQuery, user?.email],
    () => getAllProjects(),
    {
      staleTime: 1000 * 60 * 60,
      enabled: !!user,
    }
  );

  return { allProjectQuery };
}
