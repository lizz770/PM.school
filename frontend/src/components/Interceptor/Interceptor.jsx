import React, { useEffect } from "react";
import { queryClient, axios } from "../../config/config";

const UNAUTHORIZED = 401;
const Interceptor = () => {
  const interceptor = axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error?.response?.status === UNAUTHORIZED) {
        //установить для запроса 'ME' значение false
        queryClient.setQueriesData(["Me"], { authed: false });
        //Удалите все запросы, кроме запроса "Me"
        queryClient.removeQueries({
          predicate: (query) => {
            return query.queryKey[0] !== "Me";
          },
        });
      }
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  return <></>;
};

export default Interceptor;
