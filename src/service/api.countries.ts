import { API_URL } from "@/src/constants";
import axios from "axios";

export const getLatestCountry = async () => {
     try {
          const res = await axios.get(`${API_URL}`);

          return {
               data: res.data,
               status: res.status,
          };
     } catch (error) {
          console.error("Error fetching latest posts:", error);

          return {
               data: [],
               status: 500,
          };
     }
};


