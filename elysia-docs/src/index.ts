import { Elysia } from "elysia";
import { getUserById, isSignIn } from "./userFunctions";
import { Users } from "./plugins/Users";

const sessTokenRegex = /sessToken=([^;]+)/;

const app = new Elysia()
  .state({
    'version': '1.0.0',
  })
  .decorate('launchDate', () => Date.now())
  .use(Users({
    prefix: "/v1"
  }))
  .get("/version", ({
    launchDate, 
    store: { version } 
  }) => `${version} ${launchDate()}`)
  .get("/", () => "Home")
  .get("/blog", () => "Blog")
  .post("/blog", () => "Blog - new post")
  .get("/id/:id", ({params: { id }}) => getUserById(id))
  .get("/context", (context) => new Response(
    JSON.stringify(context),
    {
        headers: {
            'Content-Type': 'application/json'
        }
    })
  )
  .get("/tmp/*", () => `temp data`)
  .get("*", () => `404 - Not Found`)
  .group('/letter', app => app 
    .get('/a', () => "a")
    .get('/b', () => "b")
    .get('/c', () => "c")
  )
  // Global Hook (2 methods)
  // Outputs The Requests
  .onRequest((req) => {
    console.log(3);

    const launchDate = new Date(req.launchDate());
    const method = req.request.method;
    const url = req.request.url;
    const status = req.set.status;

    const cookieHeader = req.request.headers.get("cookie");
    if (cookieHeader) {
      const sessTokenRegex = /sessToken=([^;]+)/;

      const match = cookieHeader.match(sessTokenRegex);

      const sessTokenValue = match ? match[1] : null;

      console.log(`${launchDate} | ${method} ${url} ${status} | sessToken: ${sessTokenValue}\n`);
    } else {
        console.log(`${launchDate} | ${method} ${url} ${status} | Guest\n`);
    }
  })
  // .on('request', () => console.log("A request has been recieved"))
  .get('/secret', () => 'Hello', {
    beforeHandle: ({ set, request: { headers } }) => {
        console.log(1);
        if(!isSignIn(headers)) {
            set.status = 401
            return 'Unauthorized'
        }
    },
    afterHandle: ({ set, request: { headers } }) => {
      console.log(2);
      
  },
  })
  .listen(3000);



console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
