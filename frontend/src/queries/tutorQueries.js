import { queryClient, axios } from "../config/config";
import { useMutation, useQuery } from "@tanstack/react-query";


const PRESCRIPTION_KEY = "Prescriptions";

const getStudentOverview = async (id) => {
  const { data } = await axios.get("/student/overview", {
    params: {
      id: id,
    },
  });
  return data;
};

const useGetStudentOverview = (id) =>
  useQuery({
    queryKey: ["StudentOverview", id],
    staleTime: 1000 * 60 * 2,
    retry: false,
    queryFn: () => getStudentOverview(id),
    enabled: !!id,
  });

const getMeasurement = async (measurement, params) => {
  const { data } = await axios.get(`/student/${measurement}`, {
    params: {
      ...params,
    },
  });
  return data;
};

const useGetMeasurement = (measurement, params) =>
  useQuery({
    queryKey: [measurement, params?.id],
    staleTime: 1000 * 60 * 2,
    retry: false,
    queryFn: () => getMeasurement(measurement, params),
    enabled: !!params?.id && !!measurement,
  });


const getPrescriptions = async (params) => {
  const { data } = await axios.get("/student/prescriptions", {
    params: {
      ...params,
    },
  });

  return data;
};

const useGetPrescriptions = (params) =>
  useQuery({
    queryKey: [PRESCRIPTION_KEY, params?.id, params?.status, params?.by],
    staleTime: 1000 * 60 * 2,
    retry: false,
    queryFn: () => getPrescriptions(params),
    enabled: !!params?.id && !!params?.status && !!params?.by,
  });

const postPrescription = async (params) => {
  const { data } = await axios.post("/student/prescription", {
    ...params,
  });
  return data;
};

const usePostPrescription = () =>
  useMutation({
    mutationFn: (params) => postPrescription(params),
    onSuccess: () => {
      queryClient.invalidateQueries([PRESCRIPTION_KEY]);
    },
  });

const deletePrescription = async (params) => {
  const { data } = await axios.delete("/student/prescription", {
    params: {
      ...params,
    },
  });
  return data;
};

const useDeletePrescription = () =>
  useMutation({
    mutationFn: (params) => deletePrescription(params),
    onSuccess: () => {
      queryClient.invalidateQueries([PRESCRIPTION_KEY]);
    },
  });

export {
  useGetStudentOverview,
  useGetMeasurement,
  
  useGetPrescriptions,
  usePostPrescription,
  useDeletePrescription,
};
