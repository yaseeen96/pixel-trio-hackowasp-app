import { useSelector } from "react-redux";
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

export async function signupController({ email, password, fullName }) {
  const SIGNUP_API_URL = endpoints.signupEndpoint;
  const requestBody = {
    email,
    password,
    fullName,
  };

  try {
    const response = await axios.post(SIGNUP_API_URL, requestBody);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
  }
}

export async function verifySignupController({ email, otp }) {
  const VERIFY_SIGNUP_API_URL = endpoints.verifySignupEndpoint;
  const requestBody = {
    email,
    otp,
  };
  try {
    const response = await axios.post(VERIFY_SIGNUP_API_URL, requestBody);
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
}

export async function logoutController() {
  const token = useSelector((state) => state.auth.authToken);
  const requestBody = {};
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axios.post(endpoints.logout, requestBody, config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function logoutAllDevicesController() {
  const token = useSelector((state) => state.auth.authToken);
  const requestBody = {};
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.post(
      endpoints.logoutAllDevices,
      requestBody,
      config
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
