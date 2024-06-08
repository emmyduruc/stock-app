import dotenv from "dotenv";
dotenv.config({ path: "../.env.development" });

export const jwtConfig = {
  secret: process.env.JWT_SECRET as string,
  cookie: {
    cookieName: process.env.COOKIES_SECRET as string,
    signed: false,
  },
  sign: {
    expiresIn: "1d",
  },
};
