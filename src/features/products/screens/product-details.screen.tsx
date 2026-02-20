import { getProductById } from '../server/products.actions';
import ProductInfo from '../components/ProductDetails/ProductInfo';
export default async function ProductDetailsScreen({productId}:{productId:string}) {
const response=await getProductById({id:productId});
  return <>
  <ProductInfo product={response.data}/>
  </>
}

