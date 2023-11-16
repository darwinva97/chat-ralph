import { createTRPCProxyClient, createWSClient, wsLink } from "@trpc/client";
import superjson from "superjson";
import type { AppRouter } from "server";

const wsClient = createWSClient({
  url: () => {
    const fp = window.localStorage.getItem("visitorId");
    const url = `${import.meta.env.VITE_WS_URL || "ws://localstho:3030"}?fp=${fp}`;
    return url;
  },
  onClose(cause) {
    console.log(`❌ Websocket closed because: ${cause}`);
  },
});

// Pass AppRouter as generic here. 👇 This lets the `trpc` object know
// what procedures are available on the server and their input/output types.
export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    wsLink({
      client: wsClient,
    }),
  ],
  transformer: superjson,
});
