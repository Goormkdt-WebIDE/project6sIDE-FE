// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useAuthContext } from "../context/AuthContext";
import {
  getAllProjects,
  createNewProject as createNewProjectAPI,
  deleteProject as deleteProjectAPI,
  FormValue,
} from "../service/http-requests/ide-api";

const baseQuery = "projects";

export default function useAllProjects() {
  const queryClient = useQueryClient();
  const { user } = useAuthContext();

  const allProjectQuery = useQuery(
    [baseQuery, user?.email],
    () => getAllProjects(),
    {
      staleTime: 1000 * 60 * 60,
      enabled: !!user,
    }
  );

  const createNewProject = useMutation(
    (data: FormValue) => createNewProjectAPI(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([baseQuery, user?.email]);
      },
    }
  );

  const deleteProject = useMutation(
    (projectId: string) => deleteProjectAPI(projectId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([baseQuery, user?.email]);
      },
    }
  );

  return { allProjectQuery, createNewProject, deleteProject };
}
