import { FastifyReply, FastifyRequest } from "fastify";
import { createStockService } from "./stock.service";

export const createStockController = {
  getStocksBySymbol: async (
    request: FastifyRequest<{ Params: { symbol: string } }>,
    reply: FastifyReply
  ) => {
    await createStockService.getStocksBySymbol(request, reply);
  },
  aggregateCandlestickData: async (
    request: FastifyRequest<{
      Params: { symbol: string; from: number; to: number };
    }>,
    reply: FastifyReply
  ) => {
    await createStockService.aggregateCandlestickData(request, reply);
  },

  getStockBySymbolInDb: async (
    request: FastifyRequest<{
      Params: { symbol: string };
    }>,
    reply: FastifyReply
  ) => {
    await createStockService.getStockBySymbolInDb(request, reply);
  },
};
