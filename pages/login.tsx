import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { cn } from "utils/tailwind";
import Layout from "@/components/layout/layout";
import Background from "@/components/shared/background";
import LoadingDots from "@/components/shared/icons/loadingDots";

export default function Login() {
  const [signInClicked, setSignInClicked] = useState(false);
  const [noSuchAccount, setNoSuchAccount] = useState(false);
  const [email, setEmail] = useState("");
  const [buttonText, setButtonText] = useState("Send magic link");

  const _handleSubmit = async (e) => {
    e.preventDefault();
    setSignInClicked(true);
    const res = await fetch("/api/auth/account-exists", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const { exists } = await res.json();
    if (exists) {
      const res = await signIn("email", {
        email,
        redirect: false,
      });
      setSignInClicked(false);
      if (res?.ok && !res?.error) {
        setEmail("");
        setButtonText("Email sent - check your inbox!");
      } else {
        setButtonText("Error sending email - try again?");
      }
    } else {
      setNoSuchAccount(true);
      setSignInClicked(false);
    }
  };

  return (
    <>
      <div className={cn("flex h-[80%] w-screen items-center justify-center")}>
        <Background />
        <div
          className={cn(
            "relative w-full max-w-md overflow-hidden",
            "shadow-xl shadow-[#0001]",
            "login-container",
          )}
        >
          <div
            className={cn(
              "flex flex-col items-center justify-center",
              "space-y-3 px-4 py-6 pt-8 sm:px-16",
              "border-y border-gray-300",
              "text-center",
            )}
          >
            <h3 className="text-xl font-semibold">Sign In</h3>
            <p className="text-sm text-gray-500">
              Use your email address to sign in.
            </p>
          </div>
          <form
            onSubmit={_handleSubmit}
            className={cn("flex flex-col", "space-y-4 px-4 py-8 sm:px-16")}
          >
            <div>
              <label htmlFor="email" className="block text-xs text-gray-600">
                EMAIL ADDRESS
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="panic@thedis.co"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => {
                  setNoSuchAccount(false);
                  setEmail(e.target.value);
                }}
                className={cn(
                  "block w-full",
                  "appearance-none rounded-md border border-gray-300",
                  "focus:border-black focus:outline-none focus:ring-black",
                  "placeholder-gray-400 sm:text-sm",
                  "mt-1 px-3 py-2",
                )}
              />
            </div>
            <button
              disabled={signInClicked}
              className={cn(
                signInClicked
                  ? "cursor-not-allowed border-gray-200 bg-gray-100"
                  : "border-black bg-black text-white hover:bg-white hover:text-black",
                "flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all",
                "focus:outline-none",
              )}
            >
              {signInClicked ? (
                <LoadingDots color="#808080" />
              ) : (
                <p>{buttonText}</p>
              )}
            </button>
            {noSuchAccount ? (
              <p className="text-center text-sm text-red-500">
                No such account.{" "}
                <Link href="/register" className="font-semibold text-red-600">
                  Sign up
                </Link>{" "}
                instead?
              </p>
            ) : (
              <p className="text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <Link href="/register" className="font-semibold text-gray-800">
                  Sign up
                </Link>{" "}
                for free.
              </p>
            )}
          </form>
        </div>
      </div>
      <style jsx>
        {`
          .login-container::after {
            content: "";
            pointer-events: none;
            user-select: none;
            position: absolute;
            inset: 0px;
            border-radius: inherit;
            padding: 1px;
            backdrop-filter: blur(5px);
            background: linear-gradient(
              rgba(0, 0, 0, 0.7),
              rgba(255, 255, 255, 0.07)
            );
            mask-mode: match-source, match-source;
            mask-repeat: repeat, repeat;
            mask-clip: content-box, border-box;
            mask-origin: content-box, border-box;
            mask-position: 0% 0%, 0% 0%;
            mask-size: auto, auto;
            mask-image: linear-gradient(black, black),
              linear-gradient(black, black);
            mask-composite: exclude;
          }
        `}
      </style>
    </>
  );
}
