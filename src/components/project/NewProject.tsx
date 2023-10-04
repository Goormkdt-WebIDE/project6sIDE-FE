import React, { useEffect, useState } from "react";
import SubmitButton from "../form/SubmitButton";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import NameInput from "../form/NameInput";
import { useAuthContext } from "../../context/AuthContext";

import {
  FormValue,
  createNewProject,
} from "../../service/http-requests/ide-api";
import { AxiosError } from "axios";
import { notifyError, notifySuccess } from "../../service/toast";

export default function NewProject() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [errorFromSubmit, setErrorFromSubmit] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { user } = useAuthContext();

  const onSubmit = async (data: FormValue) => {
    try {
      setLoading(true);
      await createNewProject(data);
      notifySuccess("새 프로젝트 생성에 성공했습니다.");
      navigate(`/workspace/${data.name}`);
    } catch (error) {
      const axiosError = error as AxiosError;
      const message = `새 프로젝트 생성에 실패했습니다. : ${axiosError.code}`;
      notifyError(message);
      setErrorFromSubmit(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {}, [user]);

  return (
    <form
      className="max-w-md w-full p-8 rounded-lg shadow-lg bg-opacity-90"
      onSubmit={handleSubmit(onSubmit)}
    >
      <NameInput<FormValue>
        name="name"
        placeholder="Project Name"
        register={register}
        errors={errors}
      />
      <SubmitButton text="새 프로젝트 생성" loading={loading} />
    </form>
  );
}
