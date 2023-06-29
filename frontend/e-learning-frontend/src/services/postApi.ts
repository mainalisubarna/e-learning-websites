import axios from "axios";
export const POST_API = async (props: any) => {
  console.log(props);
  const { url, credintals } = props;
  console.log(credintals, url);
  const response = await axios.post(
    import.meta.env.VITE_SERVER_URL + url,
    credintals,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};
