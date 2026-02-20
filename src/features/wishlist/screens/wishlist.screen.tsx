"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setWishlist } from "../store/wishlist.slice";
import { getLoggedUserWishlist } from "../server/wishlist.actions";
import WishlistItem from "../component/WishlistItem";

export default function WishlistScreen() {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.wishlist);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getLoggedUserWishlist()
      .then((res) => {
        dispatch(setWishlist(res.data));
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [dispatch]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Failed to load wishlist
      </div>
    );

  if (items.length === 0)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Your wishlist is empty
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>

      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6">
        {items.map((product) => (
          <WishlistItem key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}