// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useAuthContext } from "../context/AuthContext";
import {
  getProject,
  addRootDirectory as addRootDirectoryAPI,
  addRootCode as addRootCodeAPI,
  deleteDirectory as deleteDirectoryAPI,
  deleteCode as deleteCodeAPI,
  updateDirectory as updateDirectoryAPI,
  updateCode as updateCodeAPI,
  addSubDirectory as addSubDirectoryAPI,
  addCodeToSubDirectory as addCodeToSubDirectoryAPI,
} from "../service/http-requests/ide-api";

const baseQuery = "project";

export default function useProjects(projectName: string) {
  const queryClient = useQueryClient();
  const { user } = useAuthContext();

  const projectQuery = useQuery(
    [baseQuery, user?.email, projectName],
    () =>
      getProject({
        name: projectName,
        email: user?.email as string,
      }),
    {
      staleTime: 1000 * 60 * 60,
      enabled: !!user,
    }
  );

  const addRootDirectory = useMutation(
    ({ name, projectId }: { name: string; projectId: string }) =>
      addRootDirectoryAPI(name, projectId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([baseQuery, user?.email, projectName]);
      },
    }
  );

  const addRootCode = useMutation(
    ({
      name,
      text,
      projectId,
    }: {
      name: string;
      text: string;
      projectId: string;
    }) => addRootCodeAPI(name, text, projectId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([baseQuery, user?.email, projectName]);
      },
    }
  );

  const addSubDirectory = useMutation(
    ({ name, directoryId }: { name: string; directoryId: string }) =>
      addSubDirectoryAPI(name, directoryId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([baseQuery, user?.email, projectName]);
      },
    }
  );

  const addCodeToSubDirectory = useMutation(
    ({
      name,
      text,
      directoryId,
    }: {
      name: string;
      text: string;
      directoryId: string;
    }) => addCodeToSubDirectoryAPI(name, text, directoryId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([baseQuery, user?.email, projectName]);
      },
    }
  );

  const deleteDirectory = useMutation(
    (directoryId: string) => deleteDirectoryAPI(directoryId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([baseQuery, user?.email, projectName]);
      },
    }
  );

  const deleteCode = useMutation((codeId: string) => deleteCodeAPI(codeId), {
    onSuccess: () => {
      queryClient.invalidateQueries([baseQuery, user?.email, projectName]);
    },
  });

  const updateDirectory = useMutation(
    ({ name, directoryId }: { name: string; directoryId: string }) =>
      updateDirectoryAPI(name, directoryId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([baseQuery, user?.email, projectName]);
      },
    }
  );

  const updateCode = useMutation(
    ({ name, text, codeId }: { name: string; text: string; codeId: string }) =>
      updateCodeAPI(name, text, codeId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([baseQuery, user?.email, projectName]);
      },
    }
  );

  return {
    projectQuery,
    addRootDirectory,
    addRootCode,
    addSubDirectory,
    addCodeToSubDirectory,
    deleteDirectory,
    deleteCode,
    updateDirectory,
    updateCode,
  };
}
