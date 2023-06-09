import { useSelector } from "react-redux";
import endpoints from "../endpoints";
import axios from "../util/axios";

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
    return error.response.data;
  }
}
export async function getBookingsController() {
  try {
    const response = await axios.get("/user/bookings");
    return response.data;
  } catch (error) {
    console.error(error);
    return error.response.data;
  }
}

export async function bookServiceController({ formData }) {
  try {
    // console.log("FORM DATA", formData);
    const response = await axios.post("/user/bookService", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return error?.message;
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
    return error.response.data;
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
  try {
    console.log(endpoints.logout);
    const response = await axios.post(endpoints.logout);
    return response.data;
  } catch (error) {
    throw new Error(error?.message);
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

export async function signInWithGoogleController({ token }) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.get(
      endpoints.signInWithGoogleEndpoint,
      config
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
}

export async function validateMyselfController() {
  try {
    const response = await axios.get(endpoints.validateMyselfEndpoint);
    return response.data;
  } catch (error) {
    throw new Error(error?.message);
  }
}

export async function getVendorsController() {
  try {
    const response = await axios.get(endpoints.getVendorsEndpoint);
    return response.data;
  } catch (error) {
    throw new Error(error?.message);
  }
}
