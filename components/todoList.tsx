import React from "react";
import { cn } from "@/utils/tailwind";

const TodoListRoot = ({ children }: { children: React.ReactNode }) => {
  return (
    <ul className={cn("h-[80%] w-full overflow-scroll px-2")}>
      {React.Children.map(children, (child) => {
        return <>{child}</>;
      })}
    </ul>
  );
};

export default TodoListRoot;
