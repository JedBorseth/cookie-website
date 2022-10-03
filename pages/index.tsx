import type { NextPage } from "next";
import Navbar from "../components/Navbar";
import { createClient } from "next-sanity";
import Featured from "../components/Featured";
import Footer from "../components/Footer";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { cartState } from "../atoms/cartStates";

const Home: NextPage = ({ products }: any) => {
  const { data: session } = useSession();

  return (
    <>
      <div className="min-h-screen bg-neutral text-white">
        <Navbar />
        <Featured products={products} />
      </div>
      <Footer />
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const client = createClient({
    projectId: "vk2oe4w2",
    dataset: "production",
    apiVersion: "2022-03-25",
    useCdn: false,
  });
  const products = await client.fetch(`*[_type == "product"]`);
  return { props: { products } };
}
