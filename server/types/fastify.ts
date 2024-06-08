import { JWT } from "@fastify/jwt";

declare module "fastify" {
  interface FastifyRequest {
    jwt: JWT;
  }
}

// declare module "fastify" {
//   interface FastifyRequest {
//     jwt: {
//       sign(payload: any): string;
//       // Add other properties/methods if needed
//     };
//   }
// }
