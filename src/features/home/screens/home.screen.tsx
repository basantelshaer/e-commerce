import OurCategories from "../components/OurCategories";
import PromoBanner from "../components/Promo.Banner";
import Slider from "../components/Slider";
import DealsBanner from "../components/Deals.Banner";
import FeaturedProductes from "../components/featured.Productes";
import Newsletter from "../components/Newsletter";
export default function HomeScreen() {
    return <>
       <Slider/>
       <PromoBanner/>
       <OurCategories/>
       <DealsBanner/>
       <FeaturedProductes/>
       <Newsletter/>
    </>}