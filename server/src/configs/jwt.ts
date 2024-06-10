import dotenv from "dotenv";
import { FastifyReply, FastifyRequest } from "fastify";
import { FastifyJWT } from "@fastify/jwt";

dotenv.config();

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

export const verifyToken = async (req: FastifyRequest, reply: FastifyReply) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return reply.status(401).send({ message: "Authentication required" });
  }

  const token = authHeader?.split?.(" ")?.[1];

  try {
    const decoded = req.jwt.verify<FastifyJWT["user"]>(token);
    console.log({ decoded });
    req.user = decoded;
  } catch (err) {
    return reply.status(401).send({ message: "Invalid token" });
  }
};
