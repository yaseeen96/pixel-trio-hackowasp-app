import axiosInstance from "./axios";
import * as SecureStore from "expo-secure-store";

export const setSession = async (token) => {
  console.log("SET SESSION", token);
  if (token) {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
    await SecureStore.setItemAsync("token", token);
  }
};

export const getSession = async () => {
  const token = await SecureStore.getItemAsync("token");
  if (token) {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
  return token;
};
export const clearSession = async () => {
  await SecureStore.deleteItemAsync("token");
  console.log("session cleared");
};
