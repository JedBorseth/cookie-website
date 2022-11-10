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
        <div className="hero min-h-screen bg-neutral">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">Jedsens Cookies</h1>
              <p className="py-6">
                The Worlds Greatest Cookies. Made with love and care. We use
                only the finest ingredients to make our cookies. We are a small
                family owned business and we take pride in our work. We hope you
                enjoy our cookies as much as we enjoy making them.
              </p>
              <a className="btn btn-primary" href="../products">
                Shop Now
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="grid min-h-screen place-items-center bg-base-300 py-20 text-white">
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
