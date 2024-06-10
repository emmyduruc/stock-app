import { FastifyInstance } from "fastify";
import { createStockController } from "./stock.controller";

export const createStockRoutes = async (app: FastifyInstance) => {
  app.get(
    "/stock/:symbol",
    {
      schema: {
        description: "Get stock data",
        tags: ["Stock"],
        params: {
          type: "object",
          properties: {
            symbol: { type: "string" },
          },
        },
        security: [{ bearerAuth: [] }],
      },

      preHandler: [app.authenticate],
    },

    createStockController.getStocksBySymbol
  );

  app.get(
    "/stock/:symbol/:from/:to",
    {
      schema: {
        tags: ["Stock"],
        params: {
          type: "object",
          properties: {
            symbol: { type: "string" },
            from: { type: "number" },
            to: { type: "number" },
          },
        },

        security: [{ bearerAuth: [] }],
      },
      preHandler: [app.authenticate],
    },

    createStockController.aggregateCandlestickData
  );

  app.get(
    "/stock/db/:symbol",
    {
      schema: {
        tags: ["Stock"],
        params: {
          type: "object",
          properties: {
            symbol: { type: "string" },
          },
        },
      },
    },
    createStockController.getStockBySymbolInDb
  );
};
