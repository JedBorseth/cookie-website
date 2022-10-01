import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import { cartTotalState } from "../atoms/cartStates";
const Featured = ({ products }: any) => {
  const { data: session } = useSession();
  const [cartTotal, setCartTotal]: any = useRecoilState(cartTotalState);

  useEffect(() => {
    if (cartTotal) {
      cartTotal.forEach((item: { id: string; count: string }) => {
        localStorage.setItem(item.id, item.count);
      });
    }
    console.log(cartTotal);
    console.log(localStorage);
  }, [cartTotal]);

  return (
    <div className="md: relative grid w-full justify-center gap-5 pt-5 md:flex md:justify-evenly md:pt-12">
      {products && (
        <h2 className="top-3 text-2xl md:absolute">Featured Products</h2>
      )}
      {products &&
        products.map(
          (item: {
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
                    <Image
                      src={
                        "https://cdn.sanity.io/images/vk2oe4w2/production/" +
                        item.poster.asset._ref.slice(6).slice(0, -5) +
                        ".webp"
                      }
                      width="112"
                      height="200"
                      alt="Featured Image"
                      className="rounded-md shadow-xl"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">{item.name}</h2>
                    <p>{item.short_desc}</p>
                    <div className="card-actions justify-end">
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          const count =
                            Number(localStorage.getItem(item._id)) + 1;

                          setCartTotal([
                            ...cartTotal,
                            { id: item._id, count: count },
                          ]);
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
