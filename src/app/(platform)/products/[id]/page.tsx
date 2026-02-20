import ProductDetailsScreen from '@/features/products/screens/product-details.screen';
type ProductsDetailsPageProps = {
params: {
    id: string;
  };
};

export default async function ProductsDetailsPage({
  params,
}: ProductsDetailsPageProps) {

  const { id } = await params;

  return (
    <>
      <ProductDetailsScreen productId={id} />
    </>
  );
}