import axios from "axios";
import { FastifyReply, FastifyRequest } from "fastify";
import dotenv from "dotenv";
import WebSocket from "ws";
import { prisma } from "../configs/prisma";
import { getErrorResponse } from "../middlewares/error.guard";
dotenv.config();

export const createStockService = {
  subscribeToTradeUpdates: (symbol: string) => {
    //task:1
    const socket = new WebSocket(
      "wss://ws.finnhub.io?token=" + process.env.FINNHUB_API_KEY
    );

    socket.addEventListener("open", function () {
      socket.send(JSON.stringify({ type: "subscribe", symbol: "AAPL" }));

      socket.send(
        JSON.stringify({ type: "subscribe", symbol: "IC MARKETS:1" })
      );
      socket.send(
        JSON.stringify({ type: "subscribe", symbol: "BINANCE:BTCUSDT" })
      );
    });

    socket.addEventListener("message", async function (event: any) {
      const tradeData = JSON.parse(event.data);
      if (!tradeData.data) return;
      for (const trade of tradeData.data) {
        const { c, p, s, t, v } = trade;
        if (s && t && p !== null && v !== null) {
          //task no:2
          await prisma.stockModel.create({
            data: {
              symbol: s,
              timestamp: t,
              price: p,
              volume: v,
            },
          });
        }
      }
    });

    const unsubscribe = function (symbol: string) {
      socket.send(JSON.stringify({ type: "unsubscribe", symbol: symbol }));
    };

    return unsubscribe;
  },

  aggregateCandlestickData: async (
    request: FastifyRequest<{
      Params: { symbol: string; from: number; to: number };
    }>,
    reply: FastifyReply
  ) => {
    const { symbol, from, to } = request.params;
    //This end point requires persmission to access cant afford
    const endpoint = `https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=60&from=${from}&to=${to}&token=${process.env.FINNHUB_API_KEY}`;
    const { data } = await axios.get(endpoint);
    console.log({ data });
    const candlestickData = data.c;

    return reply.status(200).send(candlestickData);
  },

  getStocksBySymbol: async (
    request: FastifyRequest<{ Params: { symbol: string } }>,
    reply: FastifyReply
  ) => {
    try {
      const { symbol } = request.params;
      console.log({ symbol });
      const endpoint = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${process.env.FINNHUB_API_KEY}`;

      const { data } = await axios.get(endpoint, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      });
      console.log({ data });
      if (!data) {
        const { status, message } = getErrorResponse("STOCK_NOT_FOUND");
        return reply.status(status).send({ message });
      }
      return reply.status(200).send(data);
    } catch (error) {
      console.error(error);
      const { status, message } = getErrorResponse("INTERNAL_SERVER_ERROR");
      return reply.status(status).send({ message });
    }
  },

  getStockDateRange: async (
    request: FastifyRequest<{
      Params: { symbol: string; from: string; to: string };
    }>,
    reply: FastifyReply
  ) => {
    try {
      //curl "https://finnhub.io/api/v1/stock/candle?symbol=AAPL&resolution=1&from=1693493346&to=1693752546&token="

      const { symbol, from, to } = request.params;
      const endpoint = `https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=1&from=${from}&to=${to}&token=${process.env.FINNHUB_API_KEY}`;
      const { data } = await axios.get(endpoint, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      });
      if (data.length === 0) {
        const { status, message } = getErrorResponse("STOCK_NOT_FOUND");
        return reply.status(status).send({ message });
      }
      return reply.status(200).send(data);
    } catch (error) {
      console.error(error);
      const { status, message } = getErrorResponse("INTERNAL_SERVER_ERROR");
      return reply.status(status).send({ message });
    }
  },
  getStockBySymbolInDb: async (
    request: FastifyRequest<{
      Params: { symbol: string };
    }>,
    reply: FastifyReply
  ) => {
    try {
      const { symbol } = request.params;
      const stocks = await prisma.stockModel.findMany({
        where: {
          symbol: symbol,
        },
      });
      const serializedStocks = stocks.map((stock) => ({
        ...stock,
        timestamp: stock.timestamp.toString(),
      }));
      if (stocks.length === 0) {
        const { status, message } = getErrorResponse("STOCK_NOT_FOUND");
        return reply.status(status).send({ message });
      }
      return reply.status(200).send(serializedStocks);
    } catch (error) {
      console.error(error);
      const { status, message } = getErrorResponse("INTERNAL_SERVER_ERROR");
      return reply.status(status).send({ message });
    }
  },
};
