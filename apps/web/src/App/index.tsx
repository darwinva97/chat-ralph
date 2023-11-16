import { useEffect, useReducer, useRef } from "react";
import { AppContext, initialState, reducer, useStore } from "../context";
import { Header } from "./Header";
import { Messages } from "./Messages";
import { Entry } from "./Entry";

import classes from "./style.module.css";
import { useInit } from "../hooks/useInit";

const Main = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const {
    state: { messages },
  } = useStore();

  useInit();

  const scrollChat = () => {
    const main = mainRef.current!;
    main.scrollTop = main.scrollHeight;
  }

  useEffect(() => {
    scrollChat()
  }, [messages]);

  return (
    <div className={classes.container}>
      <Header scrollChat={scrollChat} />
      <main className={classes.main} ref={mainRef}>
        <Messages />
      </main>
      <Entry />
    </div>
  );
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <Main />
    </AppContext.Provider>
  );
};

export default App;
