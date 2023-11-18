import { Elysia } from "elysia";
import { yoga } from '@elysiajs/graphql-yoga'

const app = new Elysia()
.use(
  yoga({
      typeDefs: /* GraphQL */`
          type Query {
              msg: String
          }
      `,
      resolvers: {
          Query: {
              msg: () => 'Hello from Elysia'
          }
      }
  })
)
  .get("/", () => "Hello Elysia")
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
