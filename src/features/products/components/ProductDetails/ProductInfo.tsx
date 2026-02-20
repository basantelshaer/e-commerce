"use client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Product } from '../../types/products.types';
import Rating from '@/components/ui/Rating';
import ImageGallery from "react-image-gallery";
import 'react-image-gallery/styles/image-gallery.css'
export default function ProductInfo({ product }: { product: Product}) {

  const { _id, brand, category, createdAt, description, id, imageCover
    , images, price, quantity, ratingsAverage, ratingsQuantity, slug, sold
    , subcategory, title, updatedAt, priceAfterDiscount } = product

  const onSale = priceAfterDiscount ? priceAfterDiscount < price : false
  const discountpersentege = priceAfterDiscount ?
    Math.round(((price - priceAfterDiscount) / price) * 100) : 0;

     const isLowStock = quantity > 0 && quantity < 10;
      const [count, setCount] = useState(1);

  return <>
   <section className="py-6">
    <div className=" container mx-auto px-4">
      <div className=" flex flex-col lg:flex-row gap-8">

        <div className="product-img lg:w-1/4">
        <div className="bg-white rounded-xl shadow-sm p-4 sticky top-4">
      <ImageGallery
  items={(images ?? []).map((image)=>{
    return{
      original:image,
      thumbnail:image
    }
  })}
  showFullscreenButton={false}
  showPlayButton={false}
  showNav={false}
/>
        </div>

        </div>
         <div id="product-info" className="lg:w-3/4">
      <div className="bg-white rounded-xl shadow-sm p-6">

        {/* Category & Brand */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Link
            href="#"
            className="bg-primary-50 text-primary-700 text-xs px-3 py-1.5 rounded-full hover:bg-primary-100 transition"
          >
            {category.name}
          </Link>

          <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-full">
            {brand.name}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
          {title}
        </h1>

        {/* Ratings */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-yellow-500 font-medium">
            <Rating value={ratingsAverage ?? 0} />
          </span>
          <span className="text-sm text-gray-600">
            ({ratingsQuantity} reviews)
          </span>
        </div>

        {/* Price Section */}
        <div className="flex items-center flex-wrap gap-3 mb-6">
          <span className="text-3xl font-bold text-gray-900">
            {priceAfterDiscount || price} EGP
          </span>

          {onSale && (
            <>
              <span className="text-lg text-gray-400 line-through">
                {price} EGP
              </span>

              <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-full font-medium">
                Save{discountpersentege}%
              </span>
            </>
          )}
        </div>

        {/* Stock Status */}
        <div className="flex items-center gap-2 mb-6">
          {quantity > 0 ? (
            <span className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-green-50 text-green-700">
              <span className={`w-2 h-2 rounded-full ${isLowStock ? 'bg-yellow-600' : ' bg-green-500'} `}></span>
              {isLowStock
                ? `Only ${quantity} left - Order soon!`
                : "In Stock"}
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-red-50 text-red-700">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              Out of Stock
            </span>
          )}
        </div>

        {/* Description */}
        <div className="border-t border-gray-100 pt-5 mb-6">
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>

        {/* Quantity Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quantity
          </label>

          <div className="flex items-center gap-4">
            <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={()=>{setCount(count-1)}}
                disabled={count === 1}
                className="px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-primary-600 transition disabled:opacity-50"
              >
                <FontAwesomeIcon icon={faMinus} />
              </button>

              <input
                type="number"
                min={1}
                value={count}
                onChange={(e)=>{setCount(+e.target.value)}}
                className="w-16 text-center border-0 focus:ring-0 focus:outline-none text-lg font-medium"
              />

              <button
               onClick={()=>{setCount(count+1)}}
                disabled={count === quantity}
                className="px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-primary-600 transition disabled:opacity-50"
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>

            <span className="text-sm text-gray-500">
              {quantity} available
            </span>
          </div>
        </div>

        {/* Total Price */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Total Price:</span>
            <span className="text-2xl font-bold text-primary-600">
              { count * (priceAfterDiscount || price)} EGP
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="flex-1 text-white py-3.5 px-6 rounded-xl font-medium bg-primary-600 hover:bg-primary-700 active:scale-95 transition">
            🛒 Add to Cart
          </button>

          <button className="flex-1 text-white py-3.5 px-6 rounded-xl font-medium bg-slate-900 hover:bg-slate-800 active:scale-95 transition">
            ⚡ Buy Now
          </button>
        </div>
      </div>
    </div>
      </div>
    </div>
   </section>
  </>
}