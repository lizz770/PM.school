import { queryClient, axios } from "../config/config.js";
import { useMutation, useQuery } from "@tanstack/react-query";

const login = async (body) => {
  const { data } = await axios.post("/login", body);
  return data;
};

const useLogin = () =>
  useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["Me"]);
      return data;
    },
  });

const logout = async () => {
  try {
    const { data } = await axios.post("/logout");
    return data;
  } catch (error) {
    throw error;
  }
};

const useLogout = () =>
  useMutation({
    mutationFn: logout,
    onError: (error) => {
      queryClient.setQueriesData(["Me"], { authed: false });
    },
    onSuccess: (data) => {
      queryClient.setQueriesData(["Me"], { authed: false });
      return data;
    },
  });

const whoami = async () => {
  try {
    const { data } = await axios.get("/me");
    return data;
  } catch (error) {
    return { authed: "false" };
  }
};

const useWhoami = () =>
  useQuery({
    queryKey: ["Me"],
    staleTime: Infinity,
    retry: false,
    queryFn: whoami,
    onError: (error) => {
      return error;
    },
  });

const register = async (body) => {
  try {
    const { data } = await axios.post("/register", body);
    return data;
  } catch (error) {
    throw error?.response?.data?.message;
  }
};

const useRegister = () =>
  useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["Me"]);
      return data;
    },
  });

export { useLogin, useLogout, useWhoami, useRegister };
