import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faShieldHalved, faTruck } from '@fortawesome/free-solid-svg-icons'
import Image from "next/image";
import img from "../../../../assets/images/img.png";

export default function LoginHero() {
  return (
    <div className='login-hero flex-col items-center mt-12'>
      <div className="flex items-center justify-center mt-10">
        <Image
          src={img}
          alt="image for background login page"
          priority
          width={500}
          height={200}
          className='border border-gray-100/50 rounded-xl shadow-lg'
        />
      </div>

      <h1 className='text-3xl text-center font-extrabold text-gray-800 py-6'>
        FreshCart-Your One-Stop for Fresh Products
      </h1>

      <p className='text-gray-700 text-center'>
        Join thousands of happy customers who trust FreshCart for their daily grocery needs
      </p>

      <div className='px-8 py-6 flex items-center justify-around'>
        <div>
          <FontAwesomeIcon icon={faTruck} className='text-primary-600' />
          <span className='text-sm text-gray-600 px-2'>Free Delivery</span>
        </div>

        <div>
          <FontAwesomeIcon icon={faShieldHalved} className='text-primary-600' />
          <span className='text-sm text-gray-600 px-2'>Secure Payment</span>
        </div>

        <div>
          <FontAwesomeIcon icon={faClock} className='text-primary-600' />
          <span className='text-sm text-gray-600 px-2'>24/7 Support</span>
        </div>
      </div>
    </div>
  );
}
