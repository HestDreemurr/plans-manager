import { type FastifyApp } from "#types";
import { z } from "zod";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { ClientError } from "@/http/client-error";

export async function signIn(app: FastifyApp) {
  app.post(
    "/sign-in",
    {
      schema: {
        tags: ["customers"],
        description: "Create an customer account.",
        body: z.object({
          name: z.string().min(3),
          email: z.string().email(),
          password: z.string().min(6)
        }),
        response: {
          201: z.object({
            token: z.string()
          }),
          409: z.object({
            message: z.string()
          })
        }
      }
    }, async (request, reply) => {
      const { name, email } = request.body;
      const password = await hash(request.body.password, 6);
      
      const customerAlreadyExists = await prisma.customer.findUnique({
        where: { email }
      });
      
      if (customerAlreadyExists) {
        throw new ClientError("This customer already exists.", 409);
      }
      
      const customer = await prisma.customer.create({
        data: {
          name,
          email,
          password
        }
      });
      
      const token = await reply.jwtSign(
        {
          sub: customer.id
        },
        {
          sign: { expiresIn: "7d" }
        }
      );
      
      return reply.status(201).send({ token });
    }
  );
}