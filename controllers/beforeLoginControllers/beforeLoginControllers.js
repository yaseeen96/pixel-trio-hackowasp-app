import endpoints from "../../endpoints";

import axios from "axios";
export async function loginController({ email, password }) {
  const LOGIN_API_URL = endpoints.loginEndpoint;
  const requestBody = {
    email,
    password,
  };

  try {
    const response = await axios.post(LOGIN_API_URL, requestBody);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
