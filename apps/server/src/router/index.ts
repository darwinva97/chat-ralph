import { messageRouter } from "./message";
import { createTRPCRouter } from "./trpc";
import { userRouter } from "./user";

export const appRouter = createTRPCRouter({
  user: userRouter,
  message: messageRouter,
});

export type AppRouter = typeof appRouter;

// export * from "./trpc";
