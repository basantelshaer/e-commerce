"use client";

import Link from "next/link";
import { Product } from "../types/products.types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import Rating from "@/components/ui/Rating";
import {
  addProductToCart,
  getLoggedUserCart,
} from "@/features/cart/server/cart.actions";
import { toast } from "react-toastify";
import { setCartInfo } from "@/features/cart/store/cart.slice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  addProductToWishlist,
  getLoggedUserWishlist,
  removeProductFromWishlist,
} from "@/features/wishlist/server/wishlist.actions";

import {
  setWishlist,
  removeWishlistItem,
} from "@/features/wishlist/store/wishlist.slice";

import { faEye, faHeart } from "@fortawesome/free-regular-svg-icons";
import { useEffect } from "react";

export default function ProductCard({ info }: { info: Product }) {
  const {
    id,
    category,
    title,
    imageCover,
    ratingsAverage,
    ratingsQuantity,
    price,
    priceAfterDiscount,
  } = info;

  const dispatch = useAppDispatch();

  const { items } = useAppSelector((state) => state.wishlist);
  const isInWishlist = items.some((item) => item._id === id);

  const handleToggleWishlist = async () => {
    try {
      if (isInWishlist) {
        dispatch(removeWishlistItem(id));
        await removeProductFromWishlist(id);
        toast.success("Removed from wishlist");
      } else {
        const response = await addProductToWishlist(id);
        dispatch(setWishlist(response.data));
        toast.success("Added to wishlist");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getLoggedUserWishlist()
      .then((res) => {
        dispatch(setWishlist(res.data));
      })
      .catch(() => {});
  }, [dispatch]);

  const onSale = priceAfterDiscount ? priceAfterDiscount < price : false;

  const discountPercentage = priceAfterDiscount
    ? Math.round(((price - priceAfterDiscount) / price) * 100)
    : 0;

  const handleAddToCart = async () => {
    try {
      const response = await addProductToCart({ productId: id });

      if (response.status === "success") {
        toast.success(response.message);
        const cartInfo = await getLoggedUserCart();
        dispatch(setCartInfo(cartInfo));
      }
    } catch (error) {
      toast.error("failed to add product to cart");
    }
  };

  const handleShare = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const url = `${window.location.origin}/products/${id}`;

    if (navigator.share) {
      navigator.share({
        title,
        url,
      });
    } else {
      navigator.clipboard.writeText(url);
      toast.success("Link copied");
    }
  };

  return (
    <div className="product-card group bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="relative overflow-hidden">
        <img
          className="w-full h-60 object-contain bg-white p-4 transition-transform duration-300 group-hover:scale-105"
          alt={title}
          src={imageCover}
        />

        {onSale && (
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-md shadow">
              -{discountPercentage}%
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none"></div>

        <div className="absolute top-3 right-3 z-20 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          {/* wishlist */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleToggleWishlist();
            }}
            className={`bg-white shadow-md h-9 w-9 rounded-full flex items-center justify-center transition-all ${
              isInWishlist
                ? "text-red-500"
                : "hover:text-primary-600"
            }`}
          >
            <FontAwesomeIcon icon={faHeart} />
          </button>

          {/* rotate (في النص) */}
          <button
            onClick={handleShare}
            className="bg-white shadow-md h-9 w-9 rounded-full flex items-center justify-center transition-all hover:text-primary-600"
          >
            <FontAwesomeIcon icon={faArrowsRotate} />
          </button>

          {/* view */}
          <Link href={`/products/${id}`}>
            <button className="bg-white shadow-md h-9 w-9 rounded-full flex items-center justify-center transition-all hover:text-primary-600">
              <FontAwesomeIcon icon={faEye} />
            </button>
          </Link>
        </div>
      </div>

      <div className="p-4">
        <div className="text-xs text-gray-500 mb-1">{category.name}</div>

        <h3 className="font-medium mb-1 cursor-pointer">
          <Link className="line-clamp-2" href={`/products/${id}`}>
            {title}
          </Link>
        </h3>

        <div className="flex items-center mb-2">
          <Rating value={ratingsAverage} />
          <span className="text-xs text-gray-500 ml-2">
            {ratingsAverage} ({ratingsQuantity})
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-primary-600">
              {onSale ? priceAfterDiscount : price} EGP
            </span>

            {onSale && (
              <span className="text-sm text-gray-500 ml-2 line-through">
                {price}
              </span>
            )}
          </div>

          <button
            className="bg-primary-600 text-white h-10 w-10 rounded-full flex items-center justify-center hover:bg-primary-700"
            onClick={handleAddToCart}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </div>
    </div>
  );
}