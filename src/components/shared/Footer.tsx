"use client";
import Image from "next/image";
import logo from "../../assets/images/freshcart-logo.svg";
import minilogo from "../../assets/images/mini-logo.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faPinterestP,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

export default function Footer() {
  return (
    <>
    <footer className="py-5 bg-white border-t border-gray-400/20">
    <div className="container">
    <div className="grid md:grid-cols-2 xl:grid-cols-5 py-8 gap-6">
        
     <div className="space-y-3 xl:col-span-2">
          <Image src={logo} alt="FreshCart logo" width={150} height={40} />

          <p>
            FreshCart is your one-stop destination for quality products. From
            fashion to electronics, we bring you the best brands at competitive
            prices with a seamless shopping experience.
          </p>

          <ul className="flex items-center gap-4 *:text-gray-500 text-lg *:hover:text-primary-600 *:transition-colors *:duration-200">
            <li>
              <a href="#">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
            </li>
            <li>
              <a href="#">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </li>
            <li>
              <a href="#">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </li>
            <li>
              <a href="#">
                <FontAwesomeIcon icon={faPinterestP} />
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-bold text-xl mb-4">Categories</h2>
          <ul className="space-y-3 *:hover:text-primary-600 *:transition-colors *:duration-200">
            <li>
              <Link href="#">Men's Fashion</Link>
            </li>
            <li>
              <Link href="#">Women's Fashion</Link>
            </li>
            <li>
              <Link href="#">baby & toys</Link>
            </li>
            <li>
              <Link href="#">Beauty & Health</Link>
            </li>
            <li>
              <Link href="#">Electronics</Link>
            </li>
          </ul>
        </div>

        <div>
          <h2  className="font-bold text-xl mb-4">Quick Links</h2>
          <ul className="space-y-3 *:hover:text-primary-600 *:transition-colors *:duration-200">
            <li>
              <Link href="/about">About Us</Link>
            </li>
            <li>
              <Link href="/contact">Contact Us</Link>
            </li>
            <li>
              <Link href="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/terms">terms of service</Link>
            </li>
            <li>
              <Link href="/shipping-policy">Shipping policy</Link>
            </li>
          </ul>
        </div>

        <div>
          <h2  className="font-bold text-xl mb-4">Customer Service</h2>
          <ul className="space-y-3 *:hover:text-primary-600 *:transition-colors *:duration-200">
            <li>
              <Link href="/account">My Account</Link>
            </li>
            <li>
              <Link href="/orders">My orders</Link>
            </li>
            <li>
              <Link href="/wishlist">Wishlist</Link>
            </li>
            <li>
              <Link href="/returns-and-refunds">Return & Refunds</Link>
            </li>
            <li>
              <Link href="/help-center">Help Center</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex justify-between items-center py-5 border-t border-gray-400/20">
        <p>&copy; {new Date().getFullYear()} FreshCart. All rights reserved.</p>
        <Image
          src={minilogo}
          alt="minilogo"
          width={40}
          height={40}
        />
      </div>
    </div>
    </footer>
    </>
  );
}
