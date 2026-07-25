import axios from "axios";

const brevo = axios.create({
  baseURL: "https://api.brevo.com/v3",
  headers: {
    accept: "application/json",
    "api-key": process.env.BREVO_API_KEY,
    "content-type": "application/json",
  },
});

export default brevo;