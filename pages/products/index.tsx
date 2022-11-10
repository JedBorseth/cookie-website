import { createClient } from "next-sanity";
import Image from "next/image";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import imageUrlBuilder from "@sanity/image-url";
import { useRecoilState } from "recoil";
import { cartState } from "../../atoms/cartStates";
const Products = ({ products }: { products: any }) => {
  const [cart, setCart]: any = useRecoilState(cartState);
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
        <div className="grid place-items-center py-10 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product: any) => {
            return (
              <div className="card glass my-10 w-64" key={product._id}>
                <figure>
                  <a href={`../products/${product._id}`}>
                    <Image
                      src={urlFor(product.poster.asset._ref).url()}
                      width="384"
                      height="600"
                      alt="Featured Image"
                      className="rounded-md shadow-xl"
                    />
                  </a>
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{product.name}</h2>
                  <p>{product.short_desc}</p>
                  <div className="card-actions justify-end">
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        setCart([...cart, product]);
                      }}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
};

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

export default Products;
