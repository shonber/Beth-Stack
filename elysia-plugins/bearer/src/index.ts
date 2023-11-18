import { Elysia } from "elysia";
import { bearer } from '@elysiajs/bearer'

const app = new Elysia()
  .use(bearer())
  .get('/sign', ({bearer}) => bearer, {
    beforeHandle({ bearer, set }) {
      if (!bearer) {
          set.status = 401
          set.headers[
              'Authorization'
          ] = `Bearer realm='sign', error="invalid_request"`

          return `401 - Unauthorized`
      }
    }
  })
  .get("/", () => "Home")
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

// bun dev -  bun run --watch src/index.ts