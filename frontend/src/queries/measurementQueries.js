import { queryClient, axios } from "../config/config.js";
import { useMutation, useQuery } from "@tanstack/react-query";

const MEASUREMENTS_KEY = "Measurements";

const getMeasurement = async (measurement, params) => {
  const { data } = await axios.get(`/measurement/${measurement}`, {
    params,
  });
  return data;
};

const useGetMeasurement = (measurement, params) =>
  useQuery({
    queryKey: ["Measurement", measurement],
    staleTime: Infinity,
    retry: false,
    queryFn: () => getMeasurement(measurement, params),
  });

const postMeasurement = async (body, measurement) => {
  try {
    const { data } = await axios.post(`/measurement/${measurement}`, body);
    return data;
  } catch (e) {
    throw e?.response?.data?.details;
  }
};

const usePostMeasurement = (measurement) =>
  useMutation({
    mutationFn: (body) => postMeasurement(body, measurement),
    onSuccess: (data) => {
      queryClient.invalidateQueries(MEASUREMENTS_KEY);
      return data;
    },
  });

const deleteMeasurement = async (params) => {
  const { data } = await axios.delete(`/measurement/${params?.measurement}`, {
    params: { id: params?.id },
  });
  return data;
};

const useDeleteMeasurement = () =>
  useMutation({
    mutationFn: (params) => deleteMeasurement(params),
    onSuccess: (data) => {
      queryClient.invalidateQueries(MEASUREMENTS_KEY);
      return data;
    },
  });

export {
  useGetMeasurement,
  getMeasurement,
  usePostMeasurement,
  useDeleteMeasurement,
};
