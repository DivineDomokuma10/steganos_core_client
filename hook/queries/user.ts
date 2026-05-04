import UserApi from "@/api/user";
import { useQuery } from "@tanstack/react-query";

export const useGetUserProfile = () => {
  return useQuery({
    queryKey: ["my-profile"],
    queryFn: async () => await UserApi.getUserProfile(),
  });
};
