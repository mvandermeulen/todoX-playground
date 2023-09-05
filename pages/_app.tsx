import { AppProps } from "next/app";
import { Inter } from "@next/font/google";
import { SessionProvider } from "next-auth/react";
import { SessionProviderProps } from "next-auth/react";
import Layout from "@/components/layout/layout";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

interface CustomAppProps extends AppProps {
  pageProps: SessionProviderProps;
}

const App = ({ Component, pageProps }: CustomAppProps) => {
  return (
    <>
      <SessionProvider session={pageProps?.session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
    </>
  );
};

export default App;
