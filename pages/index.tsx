import { NextPage } from "next";
import { cn } from "@/utils/tailwind";

const Home: NextPage = () => {
  return (
    <div
      className={cn(
        "flex h-[80%] w-screen items-center justify-center align-middle",
      )}
    >
      <label className={cn("text-9xl font-black")}>Todos</label>
    </div>
  );
};

export default Home;
