import Router from "next/router";
import React from "react";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { cn } from "utils/tailwind";
import LoadingDots from "../shared/icons/loadingDots";

const HeaderIsland: React.FC = () => {
  const { data: session, status } = useSession();

  const [darkMode, toggleDarkMode] = useState(true);

  console.log(status);

  const _handleClick = (e) => {
    e.preventDefault();
    if (session?.user?.email) {
      signOut();
    } else {
      Router.push("/login");
    }
  };

  const _handleModeClick = (e) => {
    e.preventDefault();
    toggleDarkMode((_) => !_);
  };

  return (
    <nav
      className={cn(
        "flex w-full justify-center",
        "mb-5 px-5 py-5",
        // "border-b border-slate-900",
      )}
    >
      <div
        className={cn(
          "flex h-14 w-fit items-center justify-between align-middle md:min-w-[33%] lg:min-w-[25%]",
          // "md:w-1/2",
          "rounded-full border border-slate-900",
          "px-5",
        )}
      >
        <div
          className={cn(
            "flex w-full items-center justify-between align-middle",
            " px-2",
            "font-medium",
          )}
        >
          <div className={cn("flex items-center")}>
            <label className={cn("text-sm")}>Hello,&nbsp;</label>
            {status == "loading" ? (
              <LoadingDots />
            ) : (
              <label
                className={cn(
                  "text-sm",
                  session?.user?.email && "underline decoration-dashed",
                )}
              >
                {session?.user?.email
                  ? session?.user?.email.split("@")[0]
                  : "stranger"}
              </label>
            )}
          </div>
          <button
            aria-label="Toggle Dark Mode"
            type="button"
            className={cn(
              "flex h-9 w-9 items-center justify-center",
              // "bg-gray-200",
              "rounded-lg",
              "transition-all",
            )}
            onClick={_handleModeClick}
          >
            {!darkMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="h-5 w-5 text-gray-800"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                ></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="h-5 w-5 text-gray-800"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                ></path>
              </svg>
            )}
          </button>
        </div>

        <div
          className={cn("relative inline-block", "border-l border-slate-900")}
        >
          <button
            type="button"
            className={cn(
              "h-10 w-16 justify-center",
              "px-2 py-2",
              "text-sm font-medium text-gray-900",
              "hover:bg-gray-50",
              "focus:outline-none",
            )}
            aria-expanded="true"
            aria-haspopup="true"
            onClick={_handleClick}
          >
            {status == "loading" ? (
              <LoadingDots />
            ) : (
              <>{session?.user?.email ? "Signout" : "Login"}</>
            )}
          </button>
        </div>
      </div>
      <style jsx>{`
        nav {
          display: flex;
          align-items: center;
        }
      `}</style>
      <style jsx global>
        {`
          html {
            filter: invert(${darkMode ? 1 : 0});
          }
        `}
      </style>
    </nav>
  );
};

export default HeaderIsland;
