import axios from "../axiosConfig";

export const fetchAllUser = (page) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: `/api/user/all?page=${page}`,
        method: "get",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
