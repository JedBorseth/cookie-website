import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { cartState } from "../atoms/cartStates";

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const cart = useRecoilValue(cartState);
  const [total, setTotal] = useState(0);
  const [price, setPrice] = useState(0);
  const priceTotal = () => {
    let i = 0;
    cart.forEach((item: { price: number }) => {
      i += item.price;
    });
    setPrice(Math.floor(i));
  };
  useEffect(() => {
    setTotal(cart.length);
    priceTotal();
  }, [cart]);
  return (
    <div className="navbar bg-base-100 px-5">
      <div className="flex-1">
        <Link href={router.pathname === "/" ? "#" : "/"}>
          <button className="btn btn-ghost text-xl normal-case">
            Jeds Cookies
          </button>
        </Link>
      </div>
      <div className="flex-none">
        <div className="dropdown-end dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className=" badge indicator-item badge-sm">
                {total && total}
              </span>
            </div>
          </label>
          <div
            tabIndex={0}
            className="card dropdown-content card-compact mt-3 w-52 bg-base-100 shadow"
          >
            <div className="card-body">
              <span className="text-lg font-bold">{total && total} Items</span>
              <span className="text-info">Subtotal: ${price}</span>
              <div className="card-actions">
                <Link href="/cart">
                  <button className="btn btn-primary btn-block">
                    View cart
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="dropdown-end dropdown">
          <label tabIndex={0} className="avatar btn btn-ghost btn-circle">
            <div className="w-10 rounded-full">
              {session && session.user?.image ? (
                <Image
                  src={session.user.image}
                  width="80"
                  height="80"
                  alt="Profile"
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="currentColor"
                  viewBox="-4 -4 20 20"
                >
                  <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z" />
                </svg>
              )}
            </div>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
          >
            <li>
              <a className="justify-between" href="../cart">
                View Cart
              </a>
            </li>

            <li>
              {session ? (
                <a
                  onClick={() => {
                    signOut();
                  }}
                >
                  Logout
                </a>
              ) : (
                <a
                  onClick={() => {
                    signIn();
                  }}
                >
                  Login
                </a>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
