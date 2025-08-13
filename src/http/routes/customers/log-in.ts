import { type FastifyApp } from "#types";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { ClientError } from "@/http/client-error";
import { compare } from "bcryptjs";

export async function logIn(app: FastifyApp) {
  app.post(
    "/log-in",
    {
      schema: {
        tags: ["customers"],
        description: "Authenticate an customer.",
        body: z.object({
          email: z.string(),
          password: z.string()
        }),
        response: {
          200: z.object({
            token: z.string()
          }),
          400: z.object({
            message: z.string()
          })
        }
      }
    },
    async (request, reply) => {
      const { email, password } = request.body;
      
      const customer = await prisma.customer.findUnique({
        where: { email }
      });
      
      if (!customer) {
        throw new ClientError("This customer don't exists.");
      }
      
      const isValidPassword = await compare(password, customer.password);
      
      if (!isValidPassword) {
        throw new ClientError("Invalid password.");
      }
      
      const token = await reply.jwtSign(
        {
          sub: customer.id
        },
        {
          sign: { expiresIn: "7d" }
        }
      );
      
      return reply.status(200).send({ token });
    }
  );
}