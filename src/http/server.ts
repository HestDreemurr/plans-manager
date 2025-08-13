import { fastify } from "fastify";
import { validatorCompiler, serializerCompiler, jsonSchemaTransform, type ZodTypeProvider } from "fastify-type-provider-zod";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { fastifyJwt } from "@fastify/jwt";
import { errorHandler } from "./error-handler";

import { routes } from "./routes";

const app = fastify({
  logger: {
    transport: { target: "pino-pretty" }
  }
}).withTypeProvider<ZodTypeProvider>();

const port = process.env.PORT ?? 3333;

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.setErrorHandler(errorHandler);

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Plans Manager",
      descripion: "API for managing subscriptions in a SaaS system.",
      version: "1.0.0"
    },
    servers: [
      {
        url: "http://localhost:3333",
        description: "Development server"
      }
    ],
    tags: [
      { name: "customers", description: "Customer auth end-points" }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    }
  },
  transform: jsonSchemaTransform
});

app.register(fastifySwaggerUi, {
  routePrefix: "/docs"
});

app.register(fastifyJwt, {
  secret: process.env.JWT_SECRET_KEY
});

app.register(routes);

app.listen({ port }).then(() => {
  app.log.info("HTTP server running!");
  app.log.info(`Docs running on http://localhost:${port}/docs`);
});

export { app };