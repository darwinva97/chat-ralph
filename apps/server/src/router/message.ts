import { observable } from "@trpc/server/observable";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "./trpc";
import type { Message } from "@prisma/client";

export const messageRouter = createTRPCRouter({
  onBye: publicProcedure.subscription(({ ctx: { ee } }) => {
    return observable((emit) => {
      const onBye = (data: Message) => {
        // emit data to client
        emit.next(data);
      };
      // trigger `onBye()` when `bye` is triggered in our event emitter
      ee.on("bye", onBye);
      // unsubscribe function when client disconnects or stops subscribing
      return () => {
        ee.off("bye", onBye);
      };
    });
  }),
  onAdd: publicProcedure.subscription(({ ctx: { ee } }) => {
    return observable((emit) => {
      const onAdd = (data: Message) => {
        // emit data to client
        emit.next(data);
      };
      // trigger `onAdd()` when `add` is triggered in our event emitter
      ee.on("add", onAdd);
      // unsubscribe function when client disconnects or stops subscribing
      return () => {
        ee.off("add", onAdd);
      };
    });
  }),
  add: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        content: z.string(),
        type: z.optional(z.string()),
      })
    )
    .mutation(async ({ input, ctx: { ee, db } }) => {
      const message = await db.message.create({
        data: input,
      });

      ee.emit("add", message);
      return { message };
    }),
});
