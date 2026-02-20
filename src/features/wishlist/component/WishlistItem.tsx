"use client";

import { WishlistProduct } from "../types/wishlist.types";
import { useAppDispatch } from "@/store/store";
import { removeWishlistItem } from "../store/wishlist.slice";
import { removeProductFromWishlist } from "../server/wishlist.actions";
import { toast } from "react-toastify";

export default function WishlistItem({
  product,
}: {
  product: WishlistProduct;
}) {
  const dispatch = useAppDispatch();

  const handleRemove = async () => {
    dispatch(removeWishlistItem(product._id));
    await removeProductFromWishlist(product._id);
    toast.success("Removed from wishlist");
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
      <img
        src={product.imageCover}
        alt={product.title}
        className="w-full h-56 object-contain p-4"
      />
      <div className="p-4">
        <h2 className="font-bold text-lg text-gray-800 mb-2 truncate">
          {product.title}
        </h2>

        <div className="flex justify-between items-center">
          <span className="text-gray-800 font-bold">
            {product.price} EGP
          </span>
          <span className="text-yellow-500">
            ⭐ {product.ratingsAverage}
          </span>
        </div>

        <button
          onClick={handleRemove}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Remove
        </button>
      </div>
    </div>
  );
}