export const fetchDataService = async ({ url, method }) => {
  try {
    const response = await fetch(url, {
      method: method,
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok)
      throw new Error(`Service failed with error code ${response.status}`);
    const data_obj = await response.json();
    console.log("Data: ", data_obj);
    return data_obj?.data;
  } catch (error) {
    console.log("Error fetching! ", error);
  }
};
