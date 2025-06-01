export const getBaseUrl = () => {
  if (process.env.NODE_ENV === "production") {
    return `https://${process.env.WEBSITE_URL}`;
  }

  return "http://localhost:3000";
};
