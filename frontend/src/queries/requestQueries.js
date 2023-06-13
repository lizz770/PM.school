import { queryClient, axios } from "../config/config";
import { useMutation, useQuery } from "@tanstack/react-query";

const searchUser = async (params) => {
  const { data } = await axios.get(`/search`, {
    params: {
      user: params,
    },
  });
  return data;
};

const useSearchUser = (params) =>
  useQuery({
    queryKey: ["Search", params],
    staleTime: Infinity,
    queryFn: () => searchUser(params),
    enabled: false,
  });

const getPending = async () => {
  const { data } = await axios.get(`/requests/pending`);
  return data;
};

const useGetPending = () =>
  useQuery({
    queryKey: ["Pending"],
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    queryFn: () => getPending(),
  });

const cancelRequest = async (id) => {
  const { data } = await axios.delete(`/requests/cancel`, {
    params: { id: id },
  });
  return data;
};

const useCancelRequest = () =>
  useMutation({
    mutationFn: (id) => cancelRequest(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["Pending"]);
    },
  });

const declineRequest = async (id) => {
  const { data } = await axios.delete(`/requests/decline`, {
    params: {
      id: id,
    },
  });
  return data;
};

const useDeclineRequest = () =>
  useMutation({
    mutationFn: (id) => declineRequest(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["Pending"]);
    },

    onError: () => {
      queryClient.invalidateQueries(["Pending"]);
    },
  });

const acceptRequest = async (id) => {
  const { data } = await axios.patch(
    `/requests/accept`,
    { id },
    {
      params: {
        id: id,
      },
    }
  );
  return data;
};

const useAcceptRequest = () =>
  useMutation({
    mutationFn: (id) => acceptRequest(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["Pending"]);
    },
  });

const postRequest = async (params) => {
  const { data } = await axios.post(`/requests`, params);
  return data;
};

const usePostRequest = () =>
  useMutation({
    mutationFn: (params) => postRequest(params),
    onSuccess: () => {
      queryClient.invalidateQueries(["Pending"]);
    },
  });

export {
  useSearchUser,
  useGetPending,
  useCancelRequest,
  useDeclineRequest,
  useAcceptRequest,
  usePostRequest,
};
