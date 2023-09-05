import { nanoid } from "nanoid";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import TodoInputRoot from "@/components/todoInput";
import { TODOPATH } from "@/lib/constants";
import fetcher from "@/utils/fetcher";

const TodoInput = () => {
  const { data: session } = useSession();

  const { data: todos = [], mutate } = useSWR(TODOPATH, fetcher, {
    revalidateOnMount: true,
  });

  const _handleSubmit = async (text) => {
    if (text.trim().length <= 0) return;

    let newTodo = {
      id: nanoid(),
      text,
      userId: session.user.id,
      completed: false,
      createdAt: new Date(),
    };

    try {
      await mutate(
        fetch(TODOPATH, {
          method: "POST",
          body: JSON.stringify(newTodo),
        }),
        {
          optimisticData: [newTodo, ...todos],
          rollbackOnError: true,
          populateCache: (r, newItem) => {
            return [newTodo, ...todos];
          },
          revalidate: true,
        },
      );
    } catch (e) {
      // If the API errors, the original data will be
      // rolled back by SWR automatically.
    }
  };

  return <TodoInputRoot handleSubmit={_handleSubmit} />;
};

export default TodoInput;
