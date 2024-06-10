import { Elysia, error, t } from "elysia";
import { generateIdFromEntropySize } from "lucia";
import { db } from "./database";
import { eventTable, userTable } from "./schema";
import { lucia } from "./lucia";
import postgres from "postgres";
import { Argon2id } from "oslo/password";
import { nanoid } from "nanoid";
import cors from "@elysiajs/cors";
import { eq } from "drizzle-orm";

const argon = new Argon2id();

const app = new Elysia()
  .use(cors())
  .get("/", () => "Hello Elysia")
  .guard(
    {
      body: t.Object({
        username: t.String(),
        password: t.String(),
      }),
    },
    (guardedApp) => {
      guardedApp.post("/sign-up", async ({ body, set }) => {
        const username = body.username;
        const password = body.password;

        if (!password || !username) {
          return;
        }

        const passwordHash = await argon.hash(password);

        const userId = generateIdFromEntropySize(10);

        try {
          await db.insert(userTable).values({
            id: userId,
            username: username,
            passwordHash: passwordHash,
          });
          const session = await lucia.createSession(userId, {});
          const sessionCookie = lucia
            .createSessionCookie(session.id)
            .serialize();

          set.headers["Set-Cookie"] = sessionCookie;
        } catch (e) {
          if (e instanceof postgres.PostgresError && e.code === "23505") {
            return error("Conflict", "Username already taken");
          }

          return error("Internal Server Error");
        }
      });

      guardedApp.post("/login", async ({ body, set }) => {
        const username = body.username;
        const password = body.password;

        if (!password || !username) {
          return error("Bad Request", "A username and password is required");
        }

        const user = await db.query.userTable.findFirst({
          where: (users, { eq }) => eq(users.username, username),
        });

        if (!user) {
          return error("Not Found", "No user exists with that username");
        }

        const validPassword = await argon.verify(user.passwordHash, password);

        if (!validPassword) {
          return error("Unauthorized", "Invalid password");
        }

        const session = await lucia.createSession(user.id, {});
        const sessionCookie = lucia.createSessionCookie(session.id).serialize();

        set.headers["Set-Cookie"] = sessionCookie;

        return user;
      });

      return guardedApp;
    },
  )
  .post("/event", async ({ set }) => {
    const newEvent = (
      await db
        .insert(eventTable)
        .values({
          id: nanoid(),
        })
        .returning()
    )[0];

    set.status = 201;
    return newEvent;
  })
  .put(
    "/event/:eventId",
    async ({ set, params, body }) => {
      const updatedEvent = await db
        .update(eventTable)
        .set({ name: body.eventName })
        .where(eq(eventTable.id, params.eventId))
        .returning();

      set.status = 200;

      return updatedEvent;
    },
    {
      body: t.Object({
        eventName: t.String(),
      }),
    },
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

export type App = typeof app;
