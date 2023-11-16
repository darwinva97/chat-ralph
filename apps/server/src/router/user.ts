import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "./trpc";
import { faker } from "@faker-js/faker";
import { generateNumberString } from "../utils";
import type { User } from "@prisma/client";

export const userRouter = createTRPCRouter({
  identify: publicProcedure
    .input(
      z.object({
        fp: z.string(),
      })
    )
    .query(async ({ input, ctx: { db } }) => {
      let account: User | null = null;

      try {
        account = await db.user.update({
          where: input,
          data: {
            online: true,
          },
        });
      } catch (error) {}

      if (!account) {
        const username =
          faker.color.human() + faker.animal.type() + generateNumberString();
        account = await db.user.create({
          data: {
            ...input,
            username,
            online: true,
          },
        });
      }

      // get last 10 messages
      const messagesPromise = db.message.findMany({
        take: 10,
        orderBy: {
          createdAt: "desc",
        },
      });

      const usersPromise = db.user.findMany();

      const [users, messages] = await Promise.all([
        usersPromise,
        messagesPromise,
      ]);

      return { account, messages, users };
    }),
});
