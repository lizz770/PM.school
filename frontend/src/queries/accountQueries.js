import { queryClient, axios } from "../config/config.js";
import { useMutation, useQuery } from "@tanstack/react-query";

const deleteAccount = async () => {
  const { data } = await axios.delete("me/delete");
  return data;
};

const useDeleteAccount = () =>
  useMutation({
    mutationFn: deleteAccount,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["Me"]);
      return data;
    },
  });

const getHomeStats = async () => {
  const { data } = await axios.get("me/home");
  return data;
};

const useHomeStats = () =>
  useQuery({
    queryKey: ["HomeStats"],
    staleTime: 1000 * 60 * 5,
    queryFn: getHomeStats,
  });

const changePassword = async (params) => {
  const { data } = await axios.patch("me/password", params);
  return data;
};

const useChangePassword = () =>
  useMutation({
    mutationFn: changePassword,
    onSuccess: (data) => {
      queryClient.setQueriesData(["Me"], { authed: "false" });
      return data;
    },
  });

export { useDeleteAccount, useHomeStats, useChangePassword };
