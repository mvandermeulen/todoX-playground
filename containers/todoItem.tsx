import useSWR from "swr";
import TodoItemRoot from "@/components/todoItem";
import { Todo } from "@/lib/types/todo.types";
import fetcher from "@/utils/fetcher";

const TodoItem: React.FC<{ todo: Todo }> = ({ todo }) => {
  const { completed, text } = todo;

  const { data: todos = [], mutate } = useSWR("/api/todos", fetcher, {
    // revalidateOnMount: true,
  });

  const _handleDelete = async (e) => {
    // e.preventDefault();
    let updatedTodos = todos.filter((t) => t.id !== todo.id);

    try {
      await mutate(
        fetch(`/api/todos?todoId=${todo.id}`, {
          method: "DELETE",
        }),
        {
          optimisticData: [...updatedTodos],
          rollbackOnError: true,
          populateCache: (newItem) => {
            return [...updatedTodos];
          },
          revalidate: true,
        },
      );
    } catch (e) {
      // If the API errors, the original data will be
      // rolled back by SWR automatically.
    }
  };

  const _handleChange = async (e) => {
    // e.preventDefault();
    let updatedTodos = todos.map((t) =>
      t.id === todo.id ? { ...todo, completed: !t.completed } : t,
    );

    try {
      await mutate(
        fetch(`/api/todos?todoId=${todo.id}`, {
          method: "PUT",
          body: JSON.stringify({ completed: !todo.completed }),
        }),
        {
          optimisticData: [...updatedTodos],
          rollbackOnError: true,
          populateCache: (r, newItem) => {
            return [...updatedTodos];
          },
          revalidate: true,
        },
      );
    } catch (e) {
      // If the API errors, the original data will be
      // rolled back by SWR automatically.
    }
  };

  return (
    <TodoItemRoot
      isCompleted={completed}
      text={text}
      handleChange={_handleChange}
      handleDelete={_handleDelete}
    />
  );
};

export default TodoItem;
