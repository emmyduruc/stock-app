import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserInput, LoginUserInput } from "./auth.schema";
import { createAuthService } from "./auth.service";

export const createAthController = {
  login: async (
    request: FastifyRequest<{ Body: LoginUserInput }>,
    reply: FastifyReply
  ) => {
    await createAuthService.login(request, reply);
  },

  register: async (
    request: FastifyRequest<{ Body: CreateUserInput }>,
    reply: FastifyReply
  ) => {
    await createAuthService.register(request, reply);
  },

  logout: (request: FastifyRequest, reply: FastifyReply) => {
    return reply.send({ message: "Logged out" });
  },
};
