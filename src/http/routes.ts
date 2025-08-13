import { type FastifyApp } from "#types";

import { signIn } from "./routes/customers/sign-in";
import { logIn } from "./routes/customers/log-in";

export async function routes(app: FastifyApp) {
  app.register(signIn);
  app.register(logIn);
}