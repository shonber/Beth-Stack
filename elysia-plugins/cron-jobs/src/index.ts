import { Elysia } from "elysia";
import { cron } from '@elysiajs/cron'

const app = new Elysia()
  .use(
    cron({
        name: 'timeLogger',
        pattern: '*/1 * * * * *', // second, minute, hour, day of month, month, day of week
        run() {
            console.log(new Date())
        }
    })
  )
  .get("/", () => "Hello Elysia")
  .get('/stop', ({ store: { cron: { timeLogger } } }) => {
    timeLogger.stop()

    return 'Stop timeLogger'
  })
  .listen(3000);
  

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
