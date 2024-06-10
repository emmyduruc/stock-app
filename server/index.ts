import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import fjwt from "@fastify/jwt";
import swagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import * as dotenv from "dotenv";
import fastify from "fastify";
import "reflect-metadata";
import { creatAuthRoutes } from "./src/auth/auth.routes";
import { authSchemas } from "./src/auth/auth.schema";
import { jwtConfig, verifyToken } from "./src/configs/jwt";
import { swaggerConfig, swaggerUiOptions } from "./src/configs/swagger";
import { registerErrorHandler } from "./src/middlewares/error.middleware";
import { createStockRoutes } from "./src/stock/stock.route";
import { createStockService } from "./src/stock/stock.service";
import { corsConfig } from "./src/configs/cors";

dotenv.config();

const server = fastify().withTypeProvider<TypeBoxTypeProvider>();

server.register(cors, corsConfig);
server.register(helmet);
server.register(swagger, swaggerConfig);
server.register(fastifySwaggerUi, swaggerUiOptions);
server.register(fjwt, jwtConfig);
server.addHook("preHandler", (req, res, next) => {
  req.jwt = server.jwt;
  return next();
});
server.decorate("authenticate", verifyToken);

server.register(creatAuthRoutes);
server.register(createStockRoutes);

for (let schema of [...authSchemas]) {
  server.addSchema(schema);
}

async function startServer() {
  const port = process.env.PORT;
  createStockService.subscribeToTradeUpdates("AAPL");
  await registerErrorHandler(server);
  await server.listen({ port: Number(port), host: "0.0.0.0" });
}

startServer()
  .then(() => {
    console.log(`Server started successfully at...... ${process.env.PORT}`);
  })
  .catch((err) => {
    console.error("Error starting server:", err);
    process.exit(1);
  });
