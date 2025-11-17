export async function fetchRequest(
  reqPath,
  reqMethod = "GET",
  reqHeaders = null,
  reqData
) {
  const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;

  const access_token = "@123#123"; //fetch from redux store later on

  try {
    const res = await fetch(`${baseUrl}${reqPath}`, {
      method: reqMethod,
      headers: reqHeaders,
      body: reqData,
    });

    console.log("Req triggered: ", baseUrl, reqPath);

    const data = await res.json();
    if (res.status === 200) {
      console.log("Request sucessfull", data);

      return data;
    } else {
      console.error("Error in request");

      return null;
    }
  } catch (error) {
    console.error(" API Error:", error.message);
    return null;
  }
}
