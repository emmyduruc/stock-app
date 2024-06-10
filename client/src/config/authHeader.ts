const authHeader = () => {
  const token = localStorage.getItem("jwtToken");
  return {
    "Accept-Language": "application/json",
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export const requestConfig = {
  headers: authHeader(),
};
