"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faAngleDown,
  faArrowRightFromBracket,
  faBaby,
  faBars,
  faBolt,
  faCartArrowDown,
  faEllipsis,
  faMagnifyingGlass,
  faPerson,
  faPersonDress,
  faPhone,
  faSuitcaseMedical,
  faUserPlus,
  faXmark
} from "@fortawesome/free-solid-svg-icons"
import { faAddressCard, faEnvelope, faHeart, faUser } from "@fortawesome/free-regular-svg-icons"
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import freshlogo from "../../assets/images/freshcart-logo.svg"
import { useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "@/store/store";
import { useAppSelector } from "@/store/store";
import useLogout from "@/features/auth/hooks/useLogout";

export default function Navbar() {
  const { numOfCartItems } = useAppSelector((state) => state.cart);
  const logout = useLogout()
  const pathname = usePathname();
  const [menuOpen, setmenuOpen] = useState(false)

  const toggleMenu = () => {
    setmenuOpen(!menuOpen)
  }

  const { count: wishlistCount } = useAppSelector(
    (state) => state.wishlist
  );

  const { isAuthenticated } = useSelector(
    (appState: AppState) => appState.auth
  )

  return <>
    <header>
      <div className="container">
        {/* top nav */}
        <div className="hidden lg:flex justify-between text-sm py-2 items-center border-b border-gray-300/30 ">
          <ul className="flex items-center gap-5 *:flex *:items-center *:gap-2">
            <li className="">
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
              <select name="" id="">
                <option value="">EGP</option>
                <option value="">SAR</option>
                <option value="">AED</option>
              </select>
            </li>
            <li>
              <select name="" id="">
                <option value="ar">العربية</option>
                <option value="en">English</option>
              </select>
            </li>
          </ul>
        </div>

        {/* main nav */}
        <nav className="flex items-center justify-between  py-5">
          <h1>
            <Link href="/">
              <Image
                src={freshlogo}
                alt="fresh cart logo"
                priority
              />
            </Link>
          </h1>

          <search className="relative hidden lg:block">
            <input type="text" className="form-control min-w-96 " placeholder="Search for products..." />
            <FontAwesomeIcon icon={faMagnifyingGlass} className="w-4 text-sm absolute right-2 top-1/2 -translate-1/2" />
          </search>

          <ul className="hidden lg:flex items-center gap-6 text-center justify-between">
            <li>
              <Link
                href="/wishlist"
                className={`flex flex-col items-center gap-1 transition-colors duration-200 ${pathname === "/wishlist"
                  ? "text-primary-600"
                  : "text-gray-700 hover:text-primary-600"
                  }`}
              >
                <div className="relative">
                  <FontAwesomeIcon icon={faHeart} className="text-sm w-4" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </div>
                <span className="text-sm">Wishlist</span>

              </Link>
            </li>

            <li>
              <Link
                href="/cart"
                className={`flex flex-col items-center gap-1 transition-colors duration-200 ${pathname === "/cart"
                  ? "text-primary-600"
                  : "text-gray-700 hover:text-primary-600"
                  }`}
              >
                <div className="relative">
                  <FontAwesomeIcon icon={faCartArrowDown} className="text-sm w-4" />
                  <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {numOfCartItems}
                  </span>
                </div>
                <span className="text-sm">Cart</span>
              </Link>
            </li>

            <li>
              <Link
                href="/account"
                className={`flex flex-col items-center gap-1 transition-colors duration-200 ${pathname === "/account"
                  ? "text-primary-600"
                  : "text-gray-700 hover:text-primary-600"
                  }`}
              >
                <FontAwesomeIcon icon={faUser} className="text-sm w-5" />
                <span className="text-sm mt-2.5">Account</span>
              </Link>
            </li>

            {isAuthenticated ? (
              <li>
                <button
                  onClick={logout}
                  className="flex flex-col items-center gap-1 transition-colors duration-200 text-gray-700 hover:text-primary-600"
                >
                  <FontAwesomeIcon icon={faArrowRightFromBracket} className="text-sm w-4" />
                  <span className="text-sm mt-2.5">Logout</span>
                </button>
              </li>
            ) : (
              <>
                <li>
                  <Link
                    href="/signup"
                    className={`flex flex-col items-center gap-1 transition-colors duration-200 ${pathname === "/signup"
                      ? "text-primary-600"
                      : "text-gray-700 hover:text-primary-600"
                      }`}
                  >
                    <FontAwesomeIcon icon={faUserPlus} className="text-sm w-4" />
                    <span className="text-sm  mt-2.5">Sign Up</span>
                  </Link>
                </li>

                <li>
                  <Link
                    href="/login"
                    className={`flex flex-col items-center gap-1 transition-colors duration-200 ${pathname === "/login"
                      ? "text-primary-600"
                      : "text-gray-700 hover:text-primary-600"
                      }`}
                  >
                    <FontAwesomeIcon icon={faAddressCard} className="text-sm w-4" />
                    <span className="text-sm  mt-2.5">Login</span>
                  </Link>
                </li>
              </>
            )}
          </ul>

          <button className=" btn lg:hidden bg-primary-600 text-white" onClick={toggleMenu}>
            {menuOpen ?
              (<FontAwesomeIcon icon={faXmark} className="w-6 text-white" />)
              : (<FontAwesomeIcon icon={faBars} className="w-6 text-white" />)}
          </button>
        </nav>
      </div>

      {/* catigory nav */}
      <nav className=" hidden lg:block bg-gray-100 py-3">
        <div className="container flex items-center gap-8 ">

          <div className="relative group">
            <button className="btn bg-primary-600 text-white flex items-center gap-2 hover:bg-primary-600/95 transition-colors duration-200">
              <FontAwesomeIcon icon={faBars} className="w-6" />
              <span>All Categories</span>
              <FontAwesomeIcon icon={faAngleDown} className="w-6" />
            </button>
            <menu className="hidden absolute group-hover:block  top-10 min-w-56 bg-white shadow-lg *:py-3 *:px-3 divide-y-2 divide-gray-300/20 *:hover:bg-gray-100 flex flex-col rounded-lg">
              <Link href="/categories/mens-fashion" className="flex items-center gap-3">
                <li>
                  <FontAwesomeIcon icon={faPerson} className=" text-xl text-primary-600" fixedWidth />
                  <span>
                    Men's Fashion
                  </span>
                </li>
              </Link>
              <Link href="/categories/womens-fashion" className="flex items-center gap-3">
                <li>
                  <FontAwesomeIcon icon={faPersonDress} className="text-xl text-primary-600" fixedWidth />
                  <span>
                    Women's Fashion
                  </span>
                </li>
              </Link>
              <Link href="/categories/baby-fashion" className="flex items-center gap-3">
                <li>
                  <FontAwesomeIcon icon={faBaby} className="text-xl text-primary-600" fixedWidth />
                  <span>
                    Baby's Fashion
                  </span>
                </li>
              </Link>
              <Link href="/categories/Health" className="flex items-center gap-3">
                <li>
                  <FontAwesomeIcon icon={faSuitcaseMedical} className="text-xl text-primary-600" fixedWidth />
                  <span>
                    Health & Beauty
                  </span>
                </li>
              </Link>
              <Link href="/categories/electronics" className="flex items-center gap-3">
                <li>
                  <FontAwesomeIcon icon={faBolt} className="text-xl text-primary-600" fixedWidth />
                  <span>
                    Electronics
                  </span>
                </li>
              </Link>
              <Link href="/products" className="flex items-center gap-3">
                <li>
                  <FontAwesomeIcon icon={faEllipsis} className="text-xl text-primary-600" fixedWidth />
                  <span>
                    View All Categories
                  </span>
                </li>
              </Link>
            </menu>
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

      {/* nav offcanvas*/}
      {menuOpen && (
        <>
          <div className=" overlay cursor-pointer fixed inset-0 z-30 bg-black/50" onClick={toggleMenu}></div>
          <div className=" offcanvas space-y-5 fixed z-40 bg-white top-0 bottom-0 p-6 animate-slide-in">
            <div className=" flex items-center justify-between border-b border-gray-300/50 pb-4">
              <h1>
                <Link href="/home">
                  <Image
                    src={freshlogo}
                    alt="fresh cart logo"
                    priority
                  />
                </Link>
              </h1>
              <button className="btn rounded-full " onClick={toggleMenu}>
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>

            <search className=" relative">
              <input type="text" className="form-control min-w-64 " placeholder="Search for products..." />
              <FontAwesomeIcon icon={faMagnifyingGlass} className="w-4 text-sm absolute right-3 top-1/2 -translate-1/2" />
            </search>

            <div>
              <h2 className="text-xl font-bold">Main Menu</h2>
              <ul className="mt-2 *:hover:bg-gray-100 transition-colors duration-200 space-y-2 ">
                <li>
                  <Link
                    href="/wishlist"
                    className={`flex py-3 px-2 items-center gap-2 transition-colors duration-200 ${pathname === "/wishlist"
                      ? " bg-gray-100"
                      : "text-gray-700 hover:text-primary-600"
                      }`}
                  >
                    <div className="relative">
                      <FontAwesomeIcon icon={faHeart} className="text-sm w-4" />
                      {wishlistCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                          {wishlistCount}
                        </span>
                      )}
                    </div>

                    <span className="text-sm">Wishlist</span>
                  </Link>
                </li>
 <li>
                  <Link
                    href="/cart"
                    className={`flex  py-3 px-2 items-center gap-1 transition-colors duration-200 ${pathname === "/cart"
                      ? " bg-gray-100"
                      : "text-gray-700 hover:text-primary-600"
                      }`}
                  >
                    <div className="relative">
                      <FontAwesomeIcon icon={faCartArrowDown} className="text-sm w-5" />
                      <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
                    </div>
                    <span className="text-sm">Cart</span>
                  </Link>
                </li>

                <li>
                  <Link
                    href="/account"
                    className={`flex  py-3 px-2 items-center gap-1 transition-colors duration-200 ${pathname === "/account"
                      ? " bg-gray-100"
                      : "text-gray-700 hover:text-primary-600"
                      }`}
                  >
                    <FontAwesomeIcon icon={faUser} className="text-sm w-3" />
                    <span className="text-sm">Account</span>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="border-t border-gray-300/50 pt-5">
              <h2 className=" text-xl font-bold">Account</h2>
              <ul className="mt-2 *:hover:bg-gray-100 transition-colors duration-200 space-y-2  ">

                {isAuthenticated ? (
                  <li className="cursor-pointer flex  py-3 px-2 items-center gap-1 hover:bg-gray-100 transition-colors duration-200">
                    <button onClick={logout}>
                      <FontAwesomeIcon icon={faArrowRightFromBracket} className="text-sm w-4" />
                      <span className="text-sm">Logout</span>
                    </button>
                  </li>
                ) : (
                  <>
                    <li>
                      <Link
                        href="/signup"
                        className={`flex  py-3 px-2 items-center gap-1 transition-colors duration-200 ${pathname === "/signup"
                          ? " bg-gray-100"
                          : "text-gray-700 hover:text-primary-600"
                          }`}
                      >
                        <FontAwesomeIcon icon={faUserPlus} className="text-sm w-4" />
                        <span className="text-sm">Sign Up</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/login"
                        className={`flex  py-3 px-2 items-center gap-1 transition-colors duration-200 ${pathname === "/login"
                          ? " bg-gray-100"
                          : "text-gray-700 hover:text-primary-600"
                          }`}
                      >
                        <FontAwesomeIcon icon={faAddressCard} className="text-sm w-4" />
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
}