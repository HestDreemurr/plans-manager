import { ClientError } from "./client-error";
import { ZodError } from "zod";
import { Request, Reply } from "fastify";
import { app } from "./server";

export async function errorHandler(
  error: Error,
  request: Request,
  reply: Reply
) {
  if (error instanceof ClientError || error.validation) {
    return reply.status(error.status ?? 400).send({ 
      message: error.message
    });
  }
  
  if (process.env.NODE_ENV !== "production") {
    app.log.error(error);
  } else {
    app.log.error({ message: error.message, stack: error.stack });
  }
  
  return reply.status(500).send({ message: "Internal server error." });
}