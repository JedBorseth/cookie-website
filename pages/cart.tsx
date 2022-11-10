import React, { useEffect, useRef, useState } from "react";
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

  const clearChecked = () => {
    const checked = document.querySelectorAll("input:checked");
    if (checked.length > 0) {
      let cartCopy = [...cart];
      checked.forEach((item: any) => {
        if (item.id !== "checkAll") {
          console.log("removing:", item.id);
          cartCopy = cartCopy.filter(
            (cart_item: { _id: any }) => cart_item._id !== item.id
          );
          setCart(cartCopy);
        }
        item.checked = false;
      });
    } else {
      console.log("No checked items");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-neutral text-white">
        <Navbar />
        <div className="grid place-items-center py-10">
          <Table
            cartDisplay={cartDisplay}
            unique={unique}
            clearChecked={clearChecked}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;

const Table = ({ cartDisplay, unique, clearChecked }: any) => {
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const priceTotal = () => {
      let i = 0;
      cartDisplay.forEach((item: { price: number }) => {
        i += item.price;
      });
      setPrice(Math.floor(i));
    };
    priceTotal();
  });

  return (
    <div className="w-[90%] overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>
              <label>
                <input
                  type="checkbox"
                  className="checkbox"
                  id="checkAll"
                  onClick={(e) => {
                    const input = document.querySelectorAll(".check");
                    input.forEach((item: any) => {
                      item.checked = (e.target as HTMLInputElement).checked;
                    });
                  }}
                />
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
              {unique.map(
                (
                  item: {
                    price: number;
                    _id: string;
                    name: string;
                    short_desc: string;
                  },
                  index: string | number
                ) => {
                  let i = 0;
                  cartDisplay.map((quantity: { _id: string }) => {
                    if (quantity._id === item._id) {
                      i++;
                    }
                  });

                  return (
                    <tr key={item._id}>
                      <th>
                        <label>
                          <input
                            type="checkbox"
                            className="check checkbox"
                            id={item._id}
                          />
                        </label>
                      </th>
                      <td>
                        <div className="flex items-center space-x-3">
                          <div>
                            <div className="font-bold">{item.name}</div>
                            <div className="text-sm opacity-50">
                              ${item.price} x {i}
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
                      <td>{i}</td>
                      <th>
                        <a
                          className="btn btn-ghost btn-xs"
                          href={`../products/${item._id}`}
                        >
                          View Product
                        </a>
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
              <button
                className="btn"
                onClick={() => {
                  clearChecked();
                }}
              >
                Clear
              </button>
            </th>
            <th>Total: ${price}</th>
            <th></th>
            <th>Total: {cartDisplay.length}</th>
            <th>
              {cartDisplay.length > 0 ? (
                <a className="btn glass" href="../checkout">
                  Checkout
                </a>
              ) : (
                <p className="btn glass">Checkout</p>
              )}
            </th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
