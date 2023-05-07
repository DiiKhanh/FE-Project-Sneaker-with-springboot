import axios from "../axiosConfig";

export const signIn = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/api/auth/signin",
        method: "post",
        data,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const signUp = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/api/auth/signup",
        method: "post",
        data,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

// logout
export const logOut = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/api/auth/logout",
        method: "post",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
