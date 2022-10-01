import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useSession, signIn, signOut, getProviders } from "next-auth/react";
import Router from "next/router";
const Login = ({ providers }: any) => {
  const { data: session } = useSession();
  if (session) {
    Router.push("/");
  }
  return (
    <>
      <div className="min-h-screen bg-neutral text-white">
        <Navbar />
        <div className="grid h-[50vh] place-items-center">
          <button
            className="btn glass"
            onClick={() => {
              signIn(providers.github.id);
            }}
          >
            Login With Github
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
