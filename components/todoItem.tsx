import { cn } from "@/utils/tailwind";

const TodoItemRoot = ({
  isCompleted,
  text,
  handleChange,
  handleDelete,
}: {
  isCompleted: boolean;
  text: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleDelete: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
}) => {
  return (
    <li className={cn("flex h-7 items-center justify-between", "my-2")}>
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={handleChange}
        className={cn("h-5 w-5", "mr-2 mt-2", "hover:cursor-pointer")}
      />
      <label
        className={cn(
          "mr-2 h-5 px-2",
          "w-full bg-transparent",
          "text-base",
          "hover:cursor-pointer hover:bg-[#fff7]",
          "focus:outline-none",
          isCompleted && "line-through",
        )}
      >
        {text}
      </label>
      <button onClick={handleDelete} className={cn("h-5 w-5", "text-base")}>
        ✕
      </button>
    </li>
  );
};

export default TodoItemRoot;

export const NoTodos = () => (
  <div className={cn("flex justify-between", "my-2")}>
    Try adding a todo ☝️️
  </div>
);
