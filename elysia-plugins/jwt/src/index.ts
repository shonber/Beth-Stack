import { Elysia, t } from 'elysia'
import { cookie } from '@elysiajs/cookie'
import { jwt } from '@elysiajs/jwt'
import { serverTiming } from '@elysiajs/server-timing'

const app = new Elysia()
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
    .get('/sign/:name', async ({ loginJWT, cookie, setCookie, params }) => {
        setCookie('auth', await loginJWT.sign(params), {
            httpOnly: true,
            maxAge: 4 * 86400,
        })

        return `Sign in as ${cookie.auth}`
    })
    .get('/profile', async ({ loginJWT, set, cookie: { auth } }) => {
        const profile = await loginJWT.verify(auth)
        if (!profile) {
            set.status = 401
            return 'Unauthorized'
        }

        return `Hello ${profile.name}`;
    })
    .listen(8080)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
