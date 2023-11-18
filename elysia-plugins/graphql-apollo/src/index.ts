import { Elysia } from "elysia";
import { apollo, gql } from '@elysiajs/apollo'

const app = new Elysia()
  .use(
    apollo({
        typeDefs: gql`
            type Book {
                title: String
                author: String
            }

            type Query {
                books: [Book]
            }
        `,
        resolvers: {
            Query: {
                books: () => {
                    return [
                      {
                        title: 'Elysia',
                        author: 'saltyAom'
                      },
                      {
                        title: 'cool',
                        author: 'micex'
                      },
                      {
                        title: 'very very cool',
                        author: 'jack'
                      },
                      {
                        title: 'very very cool',
                        author: 'jack 2'
                      }
                    ]
                }
            }
        },
        context: async ({ request }) => {
          const authorization = request.headers.get('Authorization')

          return {
              authorization
          }
      }
    })
  )
  .get("/", () => "Hello Elysia")
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
