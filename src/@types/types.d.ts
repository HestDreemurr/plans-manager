import type {
  FastifyInstance,
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  FastifyBaseLogger
} from "fastify";
import { type ZodTypeProvider } from "fastify-type-provider-zod";

export type FastifyApp = FastifyInstance<
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  FastifyBaseLogger,
  ZodTypeProvider
>;