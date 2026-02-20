"use client";

import { faLock, faShieldAlt, faTruck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

type Props = {
  totalCartPrice: number;
  numberOfCartItems: number;
};

export default function CartSummaty({
  totalCartPrice,
  numberOfCartItems,
}: Props) {
  const subtotal = totalCartPrice;
  const freeShippingLimit = 500;

  const shipping = subtotal >= freeShippingLimit ? 0 : 70;
  const total = Math.round(subtotal + shipping);

  const remainingForFreeShipping = Math.max(
    freeShippingLimit - subtotal,
    0
  );

  const progress = Math.min(
    (subtotal / freeShippingLimit) * 100,
    100
  );

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm sticky top-24">

      {/* Header */}
      <div className="bg-linear-to-r from-primary-600 to-primary-700 px-6 py-4">
        <h2 className="flex items-center text-lg font-bold text-white gap-2">
          Order Summary
        </h2>

        <span className="text-sm text-white/80">
          you have {numberOfCartItems}
          {numberOfCartItems === 1 ? " item" : " items"} in your cart
        </span>
      </div>

      {/* Body */}
      <div className="p-6 space-y-5">

        {/* Free Shipping */}
        {shipping > 0 && (
          <div className="bg-linear-to-r from-orange-50 to-amber-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <FontAwesomeIcon icon={faTruck} className="text-orange-500" />
              <span className="text-sm font-medium text-gray-700">
                add {remainingForFreeShipping} EGP for free shipping
              </span>
            </div>

            <div className="h-2 bg-orange-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-orange-400 to-amber-400 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {shipping === 0 && (
          <div className="bg-linear-to-r from-green-50 to-emerald-50 rounded-xl p-4 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <FontAwesomeIcon icon={faTruck} className="text-green-600" />
              </div>

              <div>
                <p className="font-semibold text-green-700">
                  Free shipping!
                </p>
                <p className="text-sm text-green-600">
                  You qualify for free delivery
                </p>
              </div>
            </div>

            <div className="h-2 bg-orange-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-orange-400 to-amber-400 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Prices */}
        <div className="space-y-3">
          <div className="flex justify-between text-gray-600 text-sm">
            <span>Subtotal</span>
            <span className="font-medium text-gray-900">
              {subtotal} EGP
            </span>
          </div>

          <div className="flex justify-between text-gray-600 text-sm">
            <span>Shipping</span>

            {shipping === 0 ? (
              <span className="font-medium text-gray-900">FREE</span>
            ) : (
              <span className="font-medium text-gray-900">
                {shipping} EGP
              </span>
            )}
          </div>

          <div className="border-t border-dashed border-gray-200 pt-4">
            <div className="flex justify-between items-end">
              <span className="text-gray-900 font-semibold">
                Total
              </span>

              <div className="text-right">
                <span className="text-2xl font-bold text-gray-900">
                  {total}
                </span>
                <span className="text-sm text-gray-500 ml-1">
                  EGP
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Promo Code */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">
            Promo Code
          </label>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter promo code"
              className="flex-1 border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />

            <button
              type="button"
              className="bg-emerald-600 text-white px-4 rounded-xl text-sm font-medium hover:bg-emerald-700 transition-all"
            >
              Apply
            </button>
          </div>
        </div>

        {/* Checkout Button */}
        
        <Link
       href="/checkout"
  className="w-full bg-linear-to-r from-primary-600 to-primary-700 text-white py-4 px-6 rounded-xl font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 shadow-lg shadow-emerald-600/20 active:scale-[0.98] flex items-center justify-center"
>
  <FontAwesomeIcon icon={faLock} className="mr-2" />
  Secure Checkout
</Link>

        {/* Footer */}
        <div className="flex flex-col items-center gap-3 py-2">
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <FontAwesomeIcon icon={faShieldAlt} className="text-green-500" />
              <span>Secure Payment</span>
            </div>

            <div className="w-px h-4 bg-gray-200" />

            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <FontAwesomeIcon icon={faTruck} className="text-green-500" />
              <span>Fast Delivery</span>
            </div>
          </div>

          <Link
            href="/"
            className="block text-center text-primary-600 hover:text-primary-700 text-sm font-medium"
          >
            continue shopping
          </Link>
        </div>

      </div>
    </div>
  );
}