import { Elysia } from "elysia";

export const Users = (config: { prefix: string; }) => 
  new Elysia({ 
    prefix: config.prefix,
    name: "plugin-users",
  })
  .get('/sign-in', () => "sign in")
  .get('/sign-up', () => "sign up")
  .get('/profile', () => "profile")