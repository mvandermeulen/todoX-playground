import useSWR from "swr";
import LoadingDots from "@/components/shared/icons/loadingDots";
import { NoTodos } from "@/components/todoItem";
import TodoListRoot from "@/components/todoList";
import { TODOPATH } from "@/lib/constants";
import fetcher from "@/utils/fetcher";
import TodoItem from "./todoItem";

const TodoList: React.FC = () => {
  const {
    data: todos = [],
    error,
    isLoading,
  } = useSWR(TODOPATH, fetcher, {
    // revalidateOnMount: true,
  });

  if (error != null) return <div>{error?.info?.message}</div>;
  if (isLoading) return <LoadingDots />;

  if (todos.length === 0) {
    return <NoTodos />;
  }

  console.log("todos", todos);

  return (
    <TodoListRoot>
      {todos.map((todo) => (
        <TodoItem todo={todo} />
      ))}
    </TodoListRoot>
  );
};

export default TodoList;
