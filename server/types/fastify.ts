import { JWT } from "@fastify/jwt";
import { FastifyInstance } from "fastify";

declare module "fastify" {
  interface FastifyRequest {
    jwt: JWT;
  }
  interface FastifyInstant extends FastifyInstance {
    authenticate: any;
  }
}

type UserPayload = {
  id: string;
  email: string;
  name: string;
};

declare module "@fastify/jwt" {
  interface FastifyJWT {
    user: UserPayload;
  }
}
