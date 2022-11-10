import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import { cartState } from "../atoms/cartStates";
import imageUrlBuilder from "@sanity/image-url";
import { createClient } from "next-sanity";
const Featured = ({ products }: any) => {
  const { data: session } = useSession();
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
    <div className="md: relative grid w-full justify-center gap-5 pt-5 md:flex md:justify-evenly md:pt-12">
      {products && (
        <h2 className="top-3 text-2xl md:absolute">Featured Products</h2>
      )}
      {products &&
        products.map(
          (item: {
            price: number;
            featured: boolean;
            _id: string;
            name: string;
            poster: { asset: { _ref: string } };
            short_desc: string;
          }) => {
            if (item.featured) {
              return (
                <div className="card glass w-52 rounded pt-5" key={item._id}>
                  <figure>
                    <a href={`../products/${item._id}`}>
                      <Image
                        src={urlFor(item.poster.asset._ref).url()}
                        width="112"
                        height="200"
                        alt="Featured Image"
                        className="rounded-md shadow-xl"
                      />
                    </a>
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">{item.name}</h2>
                    <p>{item.short_desc}</p>
                    <p className="text-end text-gray-200 hover:text-white">
                      ${item.price}
                    </p>
                    <div className="card-actions justify-end">
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          setCart([...cart, item]);
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            }
          }
        )}
    </div>
  );
};

export default Featured;
