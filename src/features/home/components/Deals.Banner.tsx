import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const deals = [
  {
    badge: "🔥",
    label: "Deal of the Day",
    title: "Fresh Organic Fruits",
    desc: "Get up to 40% off on selected organic fruits",
    discount: "40% OFF",
    code: "ORGANIC40",
    link: "/products",
    gradient: "from-emerald-500 to-emerald-700",
    buttonText: "Shop Now",
    buttonColor: "text-emerald-600",
  },
  {
    badge: "✨",
    label: "New Arrivals",
    title: "Exotic Vegetables",
    desc: "Discover our latest collection of premium vegetables",
    discount: "25% OFF",
    code: "FRESH25",
    link: "/products?sort=newest",
    gradient: "from-orange-400 to-rose-500",
    buttonText: "Explore Now",
    buttonColor: "text-orange-500",
  },
];

export default function DealsBanner() {
  return (
    <section className="py-10">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-6">
          {deals.map((deal, index) => (
            <div
              key={index}
              className={`relative overflow-hidden rounded-2xl bg-linear-to-br ${deal.gradient} p-8 text-white
                          transition-all duration-300 ease-out hover:scale-[1.01]`}
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm mb-4">
                  <span>{deal.badge}</span>
                  <span>{deal.label}</span>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold mb-2">
                  {deal.title}
                </h3>

                <p className="text-white/80 mb-4">{deal.desc}</p>

                <div className="flex items-center gap-4 mb-6">
                  <div className="text-3xl font-bold">{deal.discount}</div>
                  <div className="text-sm text-white/70">
                    Use code:{" "}
                    <span className="font-bold text-white">{deal.code}</span>
                  </div>
                </div>

                <Link
                  href={deal.link}
                  className={`inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full
                              font-semibold hover:bg-gray-100 transition-colors
                              ${deal.buttonColor}`}
                >
                  {deal.buttonText}
                  <FontAwesomeIcon icon={faArrowRight} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}