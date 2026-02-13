"use client";

import Image from "next/image";
import reviewAuthorImg from "@/assets/images/review-author.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faShieldHalved, faTruckFast } from "@fortawesome/free-solid-svg-icons";

export default function SignupHero() {
  return (
      <div className="space-y-8 py-10"> 
        <div className="welcome-msg">
          <h2 className="text-4xl font-bold">
            Welcome to <span className="text-primary-600"> FreshCart</span>
          </h2>
          <p className="text-lg mt-2">
            Join thousands of happy customers who trust FreshCart for their daily
            grocery needs
          </p>
        </div>
        <ul className="*:flex *:items-center *:gap-3 space-y-5">
          <li>
            <div className="icon size-12 rounded-full text-xl bg-primary-200 flex 
            justify-center items-center text-primary-600">
              <FontAwesomeIcon icon={faStar} />
            </div>
            <div className="content">
              <h3 className="font-semibold">premium quality</h3>
              <p className="text-gray-600">premium quality products sourced from trusted suppliers</p>
            </div>
          </li>

          <li>
            <div className="icon size-12 rounded-full text-xl bg-primary-200 flex 
            justify-center items-center text-primary-600">
              <FontAwesomeIcon icon={faTruckFast} />
            </div>
            <div className="content">
              <h3 className="font-semibold">fast delivery</h3>
              <p className="text-gray-600">same day delivery avaliable in most areas</p>
            </div>
          </li>

          <li>
            <div className="icon size-12 rounded-full text-xl bg-primary-200 flex 
            justify-center items-center text-primary-600">
              <FontAwesomeIcon icon={faShieldHalved} />
            </div>
            <div className="content">
              <h3 className="font-semibold">secure shopping</h3>
              <p className="text-gray-600">your data and payments are completely secure</p>
            </div>
          </li>
        </ul>

        <div className="review p-6 rounded-xl bg-white shadow-md">
          <div className="flex items-center gap-3">
            <Image
              className="size-12 "
              src={reviewAuthorImg}
              alt="Review author"
              width={50}
              height={50}
            />

            <div>
              <h3>Sarah Jonson</h3>
              <div className="rating">
                <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                <FontAwesomeIcon icon={faStar}  className="text-yellow-400" />
                <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
              </div>
            </div>
          </div>

          <blockquote className="text-gray-700 italic mt-4">
            <p>
              "freshcart has transformed my shopping experience, the quality of
              product is outstanding, and the delivery is always on time, highly
              recommended"
            </p>
          </blockquote>
        </div>
      </div>
  );
}
