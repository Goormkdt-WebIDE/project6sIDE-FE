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
    ({
      name,
      projectId,
      directoryId,
    }: {
      name: string;
      projectId: string;
      directoryId: string;
    }) => addSubDirectoryAPI(name, projectId, directoryId),
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
      projectId,
      directoryId,
    }: {
      name: string;
      text: string;
      projectId: string;
      directoryId: string;
    }) => addCodeToSubDirectoryAPI(name, text, projectId, directoryId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([baseQuery, user?.email, projectName]);
      },
    }
  );

  const deleteDirectory = useMutation(
    ({ projectId, directoryId }: { projectId: string; directoryId: string }) =>
      deleteDirectoryAPI(projectId, directoryId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([baseQuery, user?.email, projectName]);
      },
    }
  );

  const deleteCode = useMutation(
    ({ projectId, codeId }: { projectId: string; codeId: string }) =>
      deleteCodeAPI(projectId, codeId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([baseQuery, user?.email, projectName]);
      },
    }
  );

  const updateDirectory = useMutation(
    ({
      name,
      projectId,
      directoryId,
    }: {
      name: string;
      projectId: string;
      directoryId: string;
    }) => updateDirectoryAPI(name, projectId, directoryId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([baseQuery, user?.email, projectName]);
      },
    }
  );

  const updateCode = useMutation(
    ({
      name,
      text,
      projectId,
      codeId,
    }: {
      name: string;
      text: string;
      projectId: string;
      codeId: string;
    }) => updateCodeAPI(name, text, projectId, codeId),
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
