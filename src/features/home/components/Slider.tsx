"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import{Navigation,Pagination,Autoplay}from "swiper/modules"
import Link from "next/link";
import img from "../../../assets/images/home-slider-1.png";
import "swiper/css/navigation" 
import "swiper/css/pagination"
import "swiper/css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight}from "@fortawesome/free-solid-svg-icons"
export default function Slider() {
  return (
    <section className="relative ">
      <Swiper
       slidesPerView={1}
       modules={[Navigation,Pagination,Autoplay]}
       navigation={{
         prevEl: ".custom-prev",
         nextEl: ".custom-next",
       }}
       pagination={{
        clickable: true,
       }}
       autoplay={{
        delay: 5000,
       }}
       loop={true}
       >
        <SwiperSlide>
          <div
            style={{
              backgroundImage: `url(${img.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="h-full flex items-center justify-center"
          >
            <div className="overlay py-20 text-white p-4 w-full h-full bg-linear-to-r from-green-500/90 to-green-400/50">
              <div className="container h-full content-center">
                <h2 className="text-white text-3xl font-bold mb-4 max-w-96">
                  fresh products deliverd to your doors
                </h2>
                <p>get 20% off on your first order</p>
                <div className="mt-4 flex gap-3">
                  <Link
                    href="/products"
                    className="btn bg-white border-2 border-white/50 text-green-500"
                  >
                    shop now
                  </Link>
                  <Link
                    href="/products"
                    className="btn bg-white border-2 border-white/50 text-green-500"
                  >
                    view Deals
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            style={{
              backgroundImage: `url(${img.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="h-full flex items-center justify-center"
          >
            <div className="overlay py-20 text-white p-4 w-full h-full bg-linear-to-r from-green-500/90 to-green-400/50">
              <div className="container h-full content-center">
                <h2 className="text-white text-3xl font-bold mb-4 max-w-96">
                  fresh products deliverd to your doors
                </h2>
                <p>get 20% off on your first order</p>
                <div className="mt-4 flex gap-3">
                  <Link
                    href="/products"
                    className="btn bg-white border-2 border-white/50 text-green-500"
                  >
                    shop now
                  </Link>
                  <Link
                    href="/products"
                    className="btn bg-white border-2 border-white/50 text-green-500"
                  >
                    view Deals
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            style={{
              backgroundImage: `url(${img.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="h-full flex items-center justify-center"
          >
            <div className="overlay py-20 text-white p-4 w-full h-full bg-linear-to-r from-green-500/90 to-green-400/50">
              <div className="container h-full content-center">
                <h2 className="text-white text-3xl font-bold mb-4 max-w-96">
                  fresh products deliverd to your doors
                </h2>
                <p>get 20% off on your first order</p>
                <div className="mt-4 flex gap-3">
                  <Link
                    href="/products"
                    className="btn bg-white border-2 border-white/50 text-green-500"
                  >
                    shop now
                  </Link>
                  <Link
                    href="/products"
                    className="btn bg-white border-2 border-white/50 text-green-500"
                  >
                    view Deals
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      <button
     className="custom-prev absolute text-white left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center
    rounded-full bg-white/90 shadow-md border border-gray-200 hover:bg-white hover:shadow-lg transition-all duration-200
    active:scale-95">
  <FontAwesomeIcon icon={faChevronLeft} className="text-lg text-gray-700"/>
   </button>
    <button
     className="custom-next absolute text-white right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center
    rounded-full bg-white/90 shadow-md border border-gray-200 hover:bg-white hover:shadow-lg transition-all duration-200
    active:scale-95">
  <FontAwesomeIcon icon={faChevronRight} className="text-lg text-gray-700"/>
   </button>
    </section>
  );
}