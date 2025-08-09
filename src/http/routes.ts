import { type FastifyApp } from "#types";

import { signIn } from "./routes/customers/sign-in";

export async function routes(app: FastifyApp) {
  app.register(signIn);
}