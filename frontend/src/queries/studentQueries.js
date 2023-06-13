import { queryClient, axios } from "../config/config";
import { useMutation, useQuery } from "@tanstack/react-query";

const PRESCRIPTION_KEY = "Prescriptions";


const getPrescriptions = async (params) => {
  const { data } = await axios.get("/tutor/prescriptions", {
    params: {
      ...params,
    },
  });

  return data;
};

const useGetPrescriptions = (params) =>
  useQuery({
    queryKey: [PRESCRIPTION_KEY, params?.id, params?.status],
    staleTime: 1000 * 60 * 2,
    retry: false,
    queryFn: () => getPrescriptions(params),
    enabled: !!params?.id && !!params?.status,
  });

const deletePrescription = async (params) => {
  const { data } = await axios.delete("/tutor/prescription", {
    params: {
      ...params,
    },
  });

  return data;
};

const useDeletePrescription = () =>
  useMutation({
    mutationFn: deletePrescription,
    onSuccess: () => {
      queryClient.invalidateQueries([PRESCRIPTION_KEY]);
    },
  });

const patchPrescription = async (params) => {
  const { data } = await axios.patch("/tutor/prescription", params);
  return data;
};

const usePatchPrescription = () =>
  useMutation({
    mutationFn: patchPrescription,
    onSuccess: () => {
      queryClient.invalidateQueries([PRESCRIPTION_KEY]);
    },
  });

export {
  useGetPrescriptions,
  useDeletePrescription,
  usePatchPrescription,
};
