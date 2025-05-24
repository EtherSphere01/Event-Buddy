import { jwtDecode } from "jwt-decode";

const getRole = (accessToken: string, refreshToken: string): string => {
  try {
    localStorage.setItem("accessToken", JSON.stringify(accessToken));
    localStorage.setItem("refreshToken", JSON.stringify(refreshToken));

    const decoded: any = jwtDecode(accessToken);
    return decoded?.role || "User";
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return "User";
  }
};

const decodeJWT = (): any => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      return null;
    }
    const decoded: any = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
};

const singOut = async (): Promise<void> => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
};
export { getRole, decodeJWT, singOut };
