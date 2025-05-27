export const fetchDataService = async (url, queryParam = "", method, body) => {
  try {
    const response = await fetch(
      `${url}${queryParam ? `?${queryParam}` : ""}`,
      {
        method: method,
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body:
          body && (method === "POST" || method === "PUT" || method === "PATCH")
            ? JSON.stringify(body)
            : null,
      },
    );
    if (!response.ok)
      throw new Error(`Service failed with error code ${response.status}`);
    const data_obj = await response.json();
    return data_obj;
  } catch (error) {
    console.log("Error fetching! ", error);
    return error;
  }
};
