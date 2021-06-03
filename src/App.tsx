import React from "react";
import { GetInformed } from "./pages";
import { Footer, Header, Landing, Layout } from "./components";

export const App: React.FC = () => {
  return (
    <Layout>
      <Header />
      <Landing />
      <GetInformed />
      <Footer />
    </Layout>
  );
};
