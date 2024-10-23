import axios from "axios";
import { useDispatch } from "react-redux";
import { refreshData } from "../redux/slices/userSlice";
export default async function sendFormData(
  url,
  data,
  method = "POST",
  headers = {
    "Content-Type": "application/json",
  }
) {
  try {
    const response = await axios({
      method,
      url,
      data,
      headers,
      withCredentials: true,
      timeout: 10000,
    });
    console.log("Response from server", response.data);
    return response.data;
  } catch (error) {
    console.error("Error sending form data:", error);
    throw error;
  }
}
