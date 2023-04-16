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

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

export function getDistance(loc1, loc2) {
  /*
  Returns the distance between two locations specified by their latitude and longitude coordinates.
  The input locations should be objects in the format {latitude: 1, longitude: 1}.
  The output distance is in kilometers.
  */
  const R = 6371; // Radius of the earth in km

  const lat1 = toRadians(loc1.latitude);
  const lon1 = toRadians(loc1.longitude);
  const lat2 = toRadians(loc2.latitude);
  const lon2 = toRadians(loc2.longitude);

  const dlat = lat2 - lat1;
  const dlon = lon2 - lon1;

  const a =
    Math.sin(dlat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;
  return distance.toFixed(2);
}
