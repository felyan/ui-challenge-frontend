const apiRequest = async (url = "", optionsObj = undefined, errMsg = null) => {
  try {
    const response = await fetch(url, optionsObj);
    if (!response.ok) throw Error("Please reload the app");
  } catch (err: Error) {
    errMsg = err.message;
  } finally {
    return errMsg;
  }
};

export default apiRequest;
