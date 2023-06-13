import { queryClient, axios } from "../config/config";
import { useMutation, useQuery } from "@tanstack/react-query";

const getTrustedUseres = async () => {
  const { data } = await axios.get(`/trustedUsers`);
  return data;
};

const useGetTrustedUsers = () =>
  useQuery({
    queryKey: ["TrustedUsers"],
    queryFn: () => getTrustedUseres(),
    staleTime: 1000 * 60 * 1,
    refetchOnWindowFocus: true,
  });

const deleteTrustedUser = async (id) => {
  const { data } = await axios.delete(`/trustedUsers/`, {
    params: {
      id: id,
    },
  });
  return data;
};

const useDeleteTrustedUser = () =>
  useMutation({
    queryKey: ["TrustedUsers"],
    mutationFn: (id) => deleteTrustedUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["TrustedUsers"]);
    },
  });

export { useGetTrustedUsers, useDeleteTrustedUser };
