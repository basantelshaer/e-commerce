"use client";
import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faReceipt,
  faArrowLeft,
  faShoppingBag,
  faTruck,
  faShieldAlt,
  faBox,
} from "@fortawesome/free-solid-svg-icons";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { shippingAddressSchema, shippingAddressValues } from "../schemas/checkout.schemas";
import ShippingForm from "../components/ShippingForm";
import PaymentMethods from "../components/PaymentMethods";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { createCashOrder, createOnlineOrder } from "../server/checkout.actions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { clearcart } from "@/features/cart/store/cart.slice";

export default function CheckoutScreen() {
  const [PaymentMethod, setPaymentMethod] = useState<"cash" | "card">("cash")
  const { cartId, totalCartPrice } = useAppSelector(
  (state) => state.cart
)
const subtotal = totalCartPrice || 0
const shipping = subtotal > 0 ? 0 : 0
const total = subtotal + shipping
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { register, handleSubmit, reset, formState: { errors } } = useForm({

    defaultValues: {
      details: "",
      phone: "",
      city: ""
    },
    resolver: zodResolver(shippingAddressSchema),
    mode: "onSubmit",
    reValidateMode: "onChange"
  })
  


  const onSubmit: SubmitHandler<shippingAddressValues> = async (values) => {
    try {
      if (!cartId) {
        return
      }

      if (PaymentMethod == 'cash') {
        const response = await createCashOrder({
          cartId,
          shippingAddress: values
        })
        if (response.status == 'success') {
          dispatch(clearcart())
          toast.success("order created successfully")
          reset()
          setTimeout(() => {
            router.push('/orders')
          }, 2000)
        }

      } else {
        const response = await createOnlineOrder({
          cartId,
          shippingAddress: values,
          url: "http://localhost:3000/orders"
        })
        if (response.status == 'success') {
          dispatch(clearcart())
          toast.success("redirecting you to payment getway ")
          setTimeout(() => {
            location.href = response.session.url
          }, 2000)
        }
      }
    } catch (error) {

    }

  }

  return <>
    <div className="bg-linear-to-b from-gray-50 to-white min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-primary-600 transition">
              Home
            </Link>
            <span className="text-gray-300">/</span>
            <Link
              href="/cart"
              className="hover:text-primary-600 transition"
            >
              Cart
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-medium">
              Checkout
            </span>
          </nav>

          {/* Page Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <span className="bg-linear-to-br from-primary-600 to-primary-700 text-white w-12 h-12 rounded-xl flex items-center justify-center">
                  <FontAwesomeIcon icon={faReceipt} />
                </span>
                Complete Your Order
              </h1>
              <p className="text-gray-500 mt-2">
                Review your items and complete your purchase
              </p>
            </div>

            <Link
              href="/cart"
              className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-primary-50 transition"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              Back to Cart
            </Link>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              <ShippingForm register={register} errors={errors} />
              <PaymentMethods selectedMethod={PaymentMethod} changeMethod={setPaymentMethod} />
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h2 className="text-lg font-semibold mb-4">
                  Shipping Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    placeholder="Full Name"
                    className="border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <input
                    placeholder="Phone"
                    className="border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <input
                    placeholder="Address"
                    className="md:col-span-2 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm sticky top-4">
                {/* Header */}
                <div className="bg-linear-to-r from-primary-600 to-primary-700 px-6 py-4">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <FontAwesomeIcon icon={faShoppingBag} />
                    Order Summary
                  </h2>
                  <p className="text-primary-100 text-sm mt-1">
                    {/* {numOfCartItems}{" "}
                    {numOfCartItems === 1 ? "item" : "items"} */}
                  </p>
                </div>

                {/* Cart Items */}
                <div className="p-5">
                  <div className="space-y-3 max-h-56 overflow-y-auto mb-5 pr-1">
                    {/* {products.map((item) => (
                      <div
                        key={item._id}
                        className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <div className="w-14 h-14 rounded-lg bg-white p-1 border border-gray-100 shrink-0">
                          <img
                            src={item.product.imageCover}
                            alt={item.product.title}
                            className="w-full h-full object-contain"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {item.product.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {item.count} ×{" "}
                            {item.price.toLocaleString()} EGP
                          </p>
                        </div>

                        <p className="text-sm font-bold text-gray-900 shrink-0">
                          {(item.count * item.price).toLocaleString()}
                        </p>
                      </div>
                    ))} */}
                  </div>

                  <hr className="border-gray-100 my-4" />

                  {/* Price Breakdown */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span className="font-medium">
                        {subtotal.toLocaleString()} EGP
                      </span>
                    </div>

                    <div className="flex justify-between text-gray-600">
                      <span className="flex items-center gap-2">
                        <FontAwesomeIcon
                          icon={faTruck}
                          className="text-gray-400"
                        />
                        Shipping
                      </span>
                      {shipping === 0 ? (
                        <span className="text-green-600 font-semibold">
                          FREE
                        </span>
                      ) : (
                        <span className="font-medium">
                          {shipping} EGP
                        </span>
                      )}
                    </div>
                  </div>

                  <hr className="border-gray-100 my-4" />

                  {/* Total */}
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">
                      Total
                    </span>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-primary-600">
                        {total.toLocaleString()} EGP
                      </span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full mt-6 bg-linear-to-r from-primary-600 to-primary-700 text-white py-4 rounded-xl font-semibold hover:opacity-90 transition flex items-center justify-center gap-2"
                  >
                    <FontAwesomeIcon icon={faShieldAlt} />
                    Proceed to Payment
                  </button>

                  {/* Trust Badge */}
                  <div className="flex items-center justify-center gap-4 mt-4 py-3 border-t border-gray-100">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <FontAwesomeIcon
                        icon={faShieldAlt}
                        className="text-green-500"
                      />
                      <span>Secure</span>
                    </div>
                    <div className="w-px h-4 bg-gray-200"></div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <FontAwesomeIcon icon={faTruck}
                        className="text-green-500" />
                      <span>Fast Delivery</span>
                    </div>
                    <div className="w-px h-4 bg-gray-200"></div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <FontAwesomeIcon icon={faBox}
                        className="text-orange-500" />
                      <span>Esay Returns</span>
                    </div>

                  </div>


                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </>
}