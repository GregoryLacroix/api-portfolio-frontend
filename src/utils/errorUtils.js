export const getResponseError = (error) => {
  if (error === null || error === undefined) {
    return null;
  }

  if (error.response) {
    if (error.response.status === 400 && error.response.data) {
      const responseErrors = error.response.data.data.errors;

      if (responseErrors) {
        const errorData = {};

        responseErrors.forEach((element) => {
          errorData[element.path] = element.message;
        });

        return errorData;
      }

      return null;
    }
  }
};
