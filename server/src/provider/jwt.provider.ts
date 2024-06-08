import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface IPayload {
  email: string;
  id: string;
}
export const jwtProvider = (payload: IPayload) => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
