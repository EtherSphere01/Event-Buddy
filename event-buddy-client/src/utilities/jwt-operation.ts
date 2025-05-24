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
export { getRole };
