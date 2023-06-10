import axios from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_APP_IP,
  headers: {
    "Content-type": "application/json",
  },
});

export { client };
