import { Elysia, t } from 'elysia'
import { cookie } from '@elysiajs/cookie'
import { jwt } from '@elysiajs/jwt'
import { serverTiming } from '@elysiajs/server-timing'
import { swagger } from '@elysiajs/swagger'

const app = new Elysia()
    .use(swagger({
        documentation: {
            tags: [
              { name: 'App', description: 'General endpoints' },
              { name: 'Auth', description: 'Authentication endpoints' }
            ],
            info: {
                title: 'Elysia Documentation',
                version: '1.0.0'
            }
          }
    }))
    .use(
        jwt({
            name: 'loginJWT',
            secret: 'secret123',
            exp: Math.floor(new Date(new Date().setDate(new Date().getDate() + 4)).getTime() / 1000),
            iss: 'MiceX.Pro',
            iat: Math.floor(new Date().getTime() / 1000),
        })
    )
    .use(cookie())
    .use(serverTiming())

    .group('/auth', app => app
        .get('/sign/:name', 
        async ({ loginJWT, cookie, setCookie, params }) => 
        {
            setCookie('auth', await loginJWT.sign(params), {
                httpOnly: true,
                maxAge: 4 * 86400,
            })
    
            return `Sign in as ${cookie.auth}`
        },
        {
            detail: {
                tags: ['Auth']
            }
        })
        .get('/logout', async ({ cookie: {auth}, params }) => {
            try {
                auth.remove();
                return `logged out`
            } catch (error) {
                return `error`
            }
        },
        {
            detail: {
                tags: ['Auth']
            }
        })
    )
    .get('/profile', async ({ loginJWT, set, cookie: { auth } }) => {
        const profile = await loginJWT.verify(auth)
        if (!profile) {
            set.status = 401
            return 'Unauthorized'
        }

        return `Hello ${profile.name}`;
    },
    {
        detail: {
            tags: ['App']
        }
    })
    .get('/', () => "Home")
    .listen(8080)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
