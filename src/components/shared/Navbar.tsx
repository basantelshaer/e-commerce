"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faArrowRightFromBracket,
  faBars,
  faCartArrowDown,
  faMagnifyingGlass,
  faPhone,
  faUserPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  faAddressCard,
  faEnvelope,
  faHeart,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import freshlogo from "../../assets/images/freshcart-logo.svg";
import { useState } from "react";
import { useSelector } from "react-redux";

import type { AppState } from "@/store/store";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setmenuOpen] = useState(false);

  const toggleMenu = () => {
    setmenuOpen(!menuOpen);
  };

  const isAuthenticated = useSelector(
    (state: AppState) => state.auth.isAuthenticated
  );

  return (
    <>
      <header>
        <div className="container">
          {/* top nav */}
          <div className="hidden lg:flex justify-between text-sm py-2 items-center border-b border-gray-300/30 ">
            <ul className="flex items-center gap-5 *:flex *:items-center *:gap-2">
              <li>
                <FontAwesomeIcon icon={faPhone} className="w-4" />
                <a href="tel:+1 (800) 123-4567">+1 (234) 567-890</a>
              </li>
              <li>
                <FontAwesomeIcon icon={faEnvelope} className="w-5" />
                <a href="mailto:info@freshcart.com">suport@freshcart.com</a>
              </li>
            </ul>
            <ul className="flex items-center gap-5">
              <li>
                <Link href="/track-order">Track Order</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              <li>
                <select>
                  <option>EGP</option>
                  <option>SAR</option>
                  <option>AED</option>
                </select>
              </li>
              <li>
                <select>
                  <option value="ar">العربية</option>
                  <option value="en">English</option>
                </select>
              </li>
            </ul>
          </div>

          {/* main nav */}
          <nav className="flex items-center justify-between py-5">
            <h1>
              <Link href="/">
                <Image src={freshlogo} alt="fresh cart logo" priority />
              </Link>
            </h1>

            {/* search */}
            <div className="relative hidden lg:block">
              <input
                type="text"
                className="form-control min-w-96"
                placeholder="Search for products..."
              />
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="w-4 text-sm absolute right-2 top-1/2 -translate-y-1/2"
              />
            </div>

            <ul className="hidden lg:flex items-center gap-6 text-center justify-between">
              <li>
                <Link
                  href="/wishlist"
                  className={`flex flex-col items-center gap-1 transition-colors duration-200 ${
                    pathname === "/wishlist"
                      ? "text-primary-600"
                      : "text-gray-700 hover:text-primary-600"
                  }`}
                >
                  <FontAwesomeIcon icon={faHeart} className="text-sm w-4" />
                  <span className="text-sm">Wishlist</span>
                </Link>
              </li>

              <li>
                <Link
                  href="/cart"
                  className={`flex flex-col items-center gap-1 transition-colors duration-200 ${
                    pathname === "/cart"
                      ? "text-primary-600"
                      : "text-gray-700 hover:text-primary-600"
                  }`}
                >
                  <div className="relative">
                    <FontAwesomeIcon
                      icon={faCartArrowDown}
                      className="text-sm w-4"
                    />
                    <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      3
                    </span>
                  </div>
                  <span className="text-sm">Cart</span>
                </Link>
              </li>

              <li>
                <Link
                  href="/account"
                  className={`flex flex-col items-center gap-1 transition-colors duration-200 ${
                    pathname === "/account"
                      ? "text-primary-600"
                      : "text-gray-700 hover:text-primary-600"
                  }`}
                >
                  <FontAwesomeIcon icon={faUser} className="text-sm w-3" />
                  <span className="text-sm">Account</span>
                </Link>
              </li>

              {isAuthenticated ? (
                <li className="cursor-pointer flex flex-col items-center gap-1 hover:text-primary-600 transition-colors duration-200">
                  <FontAwesomeIcon
                    icon={faArrowRightFromBracket}
                    className="text-sm w-4"
                  />
                  <span className="text-sm">Logout</span>
                </li>
              ) : (
                <>
                  <li>
                    <Link
                      href="/login"
                      className={`flex flex-col items-center gap-1 transition-colors duration-200 ${
                        pathname === "/login"
                          ? "text-primary-600"
                          : "text-gray-700 hover:text-primary-600"
                      }`}
                    >
                      <FontAwesomeIcon
                        icon={faAddressCard}
                        className="text-sm w-4"
                      />
                      <span className="text-sm">Login</span>
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/signup"
                      className={`flex flex-col items-center gap-1 transition-colors duration-200 ${
                        pathname === "/signup"
                          ? "text-primary-600"
                          : "text-gray-700 hover:text-primary-600"
                      }`}
                    >
                      <FontAwesomeIcon
                        icon={faUserPlus}
                        className="text-sm w-4"
                      />
                      <span className="text-sm">Sign Up</span>
                    </Link>
                  </li>
                </>
              )}
            </ul>

            <button
              className="btn lg:hidden bg-primary-600 text-white"
              onClick={toggleMenu}
            >
              {menuOpen ? (
                <FontAwesomeIcon icon={faXmark} className="w-6 text-white" />
              ) : (
                <FontAwesomeIcon icon={faBars} className="w-6 text-white" />
              )}
            </button>
          </nav>
        </div>

        {/* category nav */}
        <nav className="hidden lg:block bg-gray-100 py-3">
          <div className="container flex items-center gap-8">
            <div className="relative group">
              <button className="btn bg-primary-600 text-white flex items-center gap-2 hover:bg-primary-600/95 transition-colors duration-200">
                <FontAwesomeIcon icon={faBars} className="w-6" />
                <span>All Categories</span>
                <FontAwesomeIcon icon={faAngleDown} className="w-6" />
              </button>
              <ul className="hidden absolute group-hover:block top-10 min-w-56 bg-white shadow-lg divide-y-2 divide-gray-300/20 flex flex-col rounded-lg">
              </ul>
            </div>

            <ul className="flex items-center gap-6">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/recently-added">Recently Added</Link>
              </li>
              <li>
                <Link href="/featured-products">Featured Products</Link>
              </li>
              <li>
                <Link href="/offer">Offers</Link>
              </li>
              <li>
                <Link href="/brands">Brands</Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* offcanvas */}
        {menuOpen && (
          <>
            {/* overlay */}
            <div
              className="overlay cursor-pointer fixed inset-0 z-30 bg-black/50"
              onClick={toggleMenu}
            ></div>

         <div className="offcanvas fixed top-0 right-0 bottom-0 w-80 space-y-5 z-40 bg-white p-6 animate-slide-in">       
         {/* header */}
              <div className="flex items-center justify-between border-b border-gray-300/50 pb-4">
                <h1>
                  <Link href="/">
                    <Image src={freshlogo} alt="fresh cart logo" priority />
                  </Link>
                </h1>
                <button className="btn rounded-full" onClick={toggleMenu}>
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>

              {/* search */}
              <div className="relative">
                <input
                  type="text"
                  className="form-control min-w-64"
                  placeholder="Search for products..."
                />
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="w-4 text-sm absolute right-3 top-1/2 -translate-y-1/2"
                />
              </div>

              {/* main menu */}
              <div>
                <h2 className="text-xl font-bold">Main Menu</h2>

              </div>

              {/* account */}
              <div className="border-t border-gray-300/50 pt-5">
                <h2 className="text-xl font-bold">Account</h2>

                <ul className="mt-2 space-y-2">
                  {isAuthenticated ? (
                    <li className="cursor-pointer flex py-3 px-2 items-center gap-1 hover:bg-gray-100 transition-colors duration-200">
                      <FontAwesomeIcon
                        icon={faArrowRightFromBracket}
                        className="text-sm w-4"
                      />
                      <span className="text-sm">Logout</span>
                    </li>
                  ) : (
                    <>
                      <li>
                        <Link
                          href="/signup"
                          className={`flex py-3 px-2 items-center gap-1 transition-colors duration-200 ${
                            pathname === "/signup"
                              ? "bg-gray-100"
                              : "text-gray-700 hover:text-primary-600"
                          }`}
                        >
                          <FontAwesomeIcon
                            icon={faUserPlus}
                            className="text-sm w-4"
                          />
                          <span className="text-sm">Sign Up</span>
                        </Link>
                      </li>

                      <li>
                        <Link
                          href="/login"
                          className={`flex py-3 px-2 items-center gap-1 transition-colors duration-200 ${
                            pathname === "/login"
                              ? "bg-gray-100"
                              : "text-gray-700 hover:text-primary-600"
                          }`}
                        >
                          <FontAwesomeIcon
                            icon={faAddressCard}
                            className="text-sm w-4"
                          />
                          <span className="text-sm">Login</span>
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </>
        )}
      </header>
    </>
  );
}