import axios from "axios";
export const POST_API = async (url: string, credintals: any) => {
  try {
    const response = await axios.post(
      import.meta.env.VITE_SERVER_URL + url,
      credintals,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }
  }
};
