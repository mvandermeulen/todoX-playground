import { NextPage } from "next";
import Head from "next/head";
import TodoInput from "@/containers/todoInput";
import TodoList from "@/containers/todoList";
import Main from "@/components/layout/main";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Todos</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <TodoInput />
        <TodoList />
      </Main>
    </>
  );
};

export default Home;
