import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { $ref } from "../auth/auth.schema";
import { createAthController } from "./auth.controller";
export async function creatAuthRoutes(app: FastifyInstance) {
  app.get("/", (request: FastifyRequest, reply: FastifyReply) => {
    reply.send({ message: "/ route hit" });
  });
  app.post(
    "/auth/register",
    {
      schema: {
        description: "Register a new user",
        tags: ["Auth"],
        body: $ref("createUserSchema"),
        response: {
          201: $ref("loginResponseSchema"),
        },
      },
    },
    createAthController.register
  );
  app.post(
    "/auth/login",
    {
      schema: {
        tags: ["Auth"],
        body: $ref("loginSchema"),
        response: {
          201: $ref("loginResponseSchema"),
        },
      },
    },
    createAthController.login
  );
  app.delete("/logout", createAthController.logout);
  app.log.info("user routes registered");
}
