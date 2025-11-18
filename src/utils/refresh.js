import axios from "axios";
import createRefresh from "react-auth-kit/createRefresh";

const refresh = createRefresh({
  interval: 10, // The time in sec to refresh the Access token,
  refreshApiCallback: async (param) => {
    try {
      // const response = await axios.post("/refresh", param, {
      //   headers: { Authorization: `Bearer ${param.authToken}` },
      // });
      const response = JSON.parse(localStorage.getItem("user"));
      console.log("Refreshing");
      return {
        isSuccess: true,
        newAuthToken: response.token,
        newAuthTokenExpireIn: 10,
        newRefreshTokenExpiresIn: 60,
      };
    } catch (error) {
      console.error(error);
      return {
        isSuccess: false,
      };
    }
  },
});

export default refresh;