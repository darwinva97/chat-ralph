import { EventEmitter } from "events";
import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";
import { db } from "../prisma";
import type { NodeHTTPCreateContextFnOptions } from "@trpc/server/adapters/node-http";
import type { IncomingMessage } from "http";

const ee = new EventEmitter();

ee.setMaxListeners(ee.getMaxListeners() < 100 ? 100 : ee.getMaxListeners());

type ContextOptions = NodeHTTPCreateContextFnOptions<
  IncomingMessage,
  WebSocket
>;

const onClose = async (options: ContextOptions) => {
  try {
    const fp = options.req.url?.split("fp=")?.[1];
    if (!fp) return;

    const user = await db.user.update({
      where: {
        fp,
      },
      data: {
        online: false,
      },
    });

    ee.emit("bye", user);
  } catch (error) {
    // console.error(error);
    console.log("Error on close");
  }
};

export const createTRPCContext = function () {
  const opts = arguments[0] as ContextOptions;
  opts.req.socket.once("close", onClose.bind(null, opts));
  return {
    db,
    ee,
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const publicProcedure = t.procedure;

export const createTRPCRouter = t.router;

// const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
//   // if (!ctx.session?.user) {
//   //   throw new TRPCError({ code: "UNAUTHORIZED" });
//   // }
//   return next({
//     ctx: {
//       // infers the `session` as non-nullable
//       // session: { ...ctx.session, user: ctx.session.user },
//     },
//   });
// });

// export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);
