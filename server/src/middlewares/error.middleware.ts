import {
  FastifyInstance,
  FastifyError,
  FastifyReply,
  FastifyRequest,
} from "fastify";

async function errorHandler(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) {
  console.error("Error occurred:", error);

  if (error.validation) {
    reply.status(400).send({
      message: "Validation error",
      errors: error.validation,
    });
    return;
  }

  reply.status(500).send({
    message: "Internal server error",
  });
}

export async function registerErrorHandler(app: FastifyInstance) {
  app.setErrorHandler(errorHandler);
}
