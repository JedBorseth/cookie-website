import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useRecoilState } from "recoil";
import { cartState } from "../atoms/cartStates";

const Cart = () => {
  const [cart, setCart] = useRecoilState(cartState);
  const [cartDisplay, setCartDisplay] = useState([]);
  const [unique, setUnique]: any = useState(null);
  useEffect(() => {
    setCartDisplay(cart);
    const uniqueArray = [
      ...new Map(
        cart.map((item: { [x: string]: any }) => [item["_id"], item])
      ).values(),
    ];
    setUnique(uniqueArray);
  }, [cart]);
  return (
    <>
      <div className="min-h-screen bg-neutral text-white">
        <Navbar />
        <div className="grid place-items-center py-10">
          <Table cartDisplay={cartDisplay} unique={unique} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;

const Table = ({ cartDisplay, unique }: any) => {
  const [price, setPrice] = useState(0);
  const priceTotal = () => {
    let i = 0;
    cartDisplay.forEach((item: { price: number }) => {
      i += item.price;
    });
    setPrice(Math.floor(i));
  };
  useEffect(() => {
    priceTotal();
  });
  return (
    <div className="w-[90%] overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>Title</th>
            <th className="">Description</th>
            <th>Quantity</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cartDisplay.length > 0 && (
            <>
              {console.log(unique)}
              {unique.map(
                (item: {
                  price: number;
                  _id: string;
                  name: string;
                  short_desc: string;
                }) => {
                  return (
                    <tr key={item._id}>
                      <th>
                        <label>
                          <input type="checkbox" className="checkbox" />
                        </label>
                      </th>
                      <td>
                        <div className="flex items-center space-x-3">
                          <div>
                            <div className="font-bold">{item.name}</div>
                            <div className="text-sm opacity-50">
                              ${item.price}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="">
                        {item.short_desc}
                        <br />
                        <span className="badge badge-ghost badge-sm">
                          Lorem ipsum dolor sit amet.
                        </span>
                      </td>
                      <td>1</td>
                      <th>
                        <button className="btn btn-ghost btn-xs">
                          View Product
                        </button>
                      </th>
                    </tr>
                  );
                }
              )}
            </>
          )}
        </tbody>

        <tfoot>
          <tr>
            <th>
              <button className="btn">Clear</button>
            </th>
            <th>Total: ${price}</th>
            <th></th>
            <th>Total: 2</th>
            <th>
              <button className="btn glass">Checkout</button>
            </th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
