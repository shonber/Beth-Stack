import { Elysia } from "elysia";
import { cors } from '@elysiajs/cors'

const app = new Elysia()
  .use(cors({
    origin: [/\*.google.com$/],
    methods: ['GET', 'POST'],
  }))
  .get("/", () => "Home")
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
