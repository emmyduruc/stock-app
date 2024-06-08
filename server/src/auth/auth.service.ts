import { prisma } from "../configs/prisma";
import { getErrorResponse } from "../middlewares/error.guard";
import bcrypt from "bcryptjs";
import { jwtProvider } from "../provider/jwt.provider";
import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserInput, LoginUserInput } from "./auth.schema";

export const createAuthService = {
  register: async (
    request: FastifyRequest<{ Body: CreateUserInput }>,
    reply: FastifyReply
  ) => {
    const { email, password, firstname } = request.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      const { status, message } = getErrorResponse("USER_ALREADY_EXISTS");
      return reply.status(status).send({ message });
    }

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstname,
      },
    });
    if (!user) {
      const { status, message } = getErrorResponse("USER_NOT_CREATED");
      return reply.status(status).send({ message });
    }
    const token = jwtProvider({ email, id: user.id });

    return reply.status(201).send({ accessToken: token, user });
  },
  login: async (
    request: FastifyRequest<{ Body: LoginUserInput }>,
    reply: FastifyReply
  ) => {
    const { email, password } = request.body;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      const { status, message } = getErrorResponse("USER_NOT_FOUND");
      return reply.status(status).send({ message });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const { status, message } = getErrorResponse("INVALID_PASSWORD");
      return reply.status(status).send({ message });
    }

    const token = jwtProvider({ email, id: user.id });
    return reply.status(200).send({ accessToken: token, user });
  },

  logout: (request: FastifyRequest, reply: FastifyReply) => {
    return reply.send({ message: "Logged out" });
  },
};
