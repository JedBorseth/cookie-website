import { SanityClient } from "@sanity/client";
import { createClient } from "next-sanity";
import Image from "next/image";
import { useRouter } from "next/router";
import Footer from "../../components/Footer";
import imageUrlBuilder from "@sanity/image-url";
import Navbar from "../../components/Navbar";

const Product = ({ products }: any) => {
  const router = useRouter();
  const id = router.query.product;
  const product = products.find((product: any) => product._id === id);
  console.log(product);
  const client = createClient({
    projectId: "vk2oe4w2",
    dataset: "production",
    apiVersion: "2022-03-25",
    useCdn: false,
  });

  const builder = imageUrlBuilder(client);
  function urlFor(source: any) {
    return builder.image(source);
  }

  return (
    <>
      <div className="min-h-screen bg-neutral text-white">
        <Navbar />
        <div className="p-10">
          <h1 className="mb-10 text-center text-2xl">{product.name}</h1>
          <div className="flex flex-wrap justify-center">
            <Image
              src={urlFor(product.poster.asset._ref).url()}
              width="192"
              height="300"
              alt="Featured Image"
              className="mr-10 rounded-md shadow-xl"
            />
            <h2 className="ml-10 mr-10 self-end text-xl">${product.price}</h2>
            <p className="m-5 flex-1 p-5">{product.text[0].children[0].text}</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Product;

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

export async function getStaticPaths() {
  const client = createClient({
    projectId: "vk2oe4w2",
    dataset: "production",
    apiVersion: "2022-03-25",
    useCdn: false,
  });
  const products = await client.fetch(`*[_type == "product"]`);
  const paths = products.map((product: any) => ({
    params: { product: product._id },
  }));
  return { paths, fallback: false };
}
