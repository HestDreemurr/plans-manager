import { type Environment } from "vitest/environments";
import { config } from "dotenv";
import { resolve } from "path";
import { v4 as uuid } from "uuid";
import { execSync } from "child_process";
import { Client } from "pg";

config({
  path: resolve(__dirname, "..", ".env.test"),
  quiet: true
});

const prismaCLI = "./node_modules/.bin/prisma";

const schema = `tests_schema_${uuid()}`;
const databaseURL = `${process.env.DATABASE_URL}?schema=${schema}`;

export default <Environment>{
  name: "custom",
  transformMode: "ssr",
  
  setup(global) {
    process.env.DATABASE_URL = databaseURL;
    global.process.env.DATABASE_URL = databaseURL;
    
    execSync(`${prismaCLI} db push`);

    return {
      async teardown() {
        const client = new Client({
          connectionString: databaseURL
        });
        
        await client.connect();
        await client.query(`
          DROP SCHEMA IF EXISTS "${schema}" CASCADE
        `);
        
        await client.end();
      }
    }
  }
};