const createRequest = async (url: string, options = {}) => {
  try {
    const response = await fetch(url, options);

    if (response.status === 204) return;

    return response.json();
  } catch (err) {
    console.log(err)
  }
};

export default createRequest;