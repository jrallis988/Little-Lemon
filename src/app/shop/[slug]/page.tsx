import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductDetail } from "@/components/shop/product-detail";
import {
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/products";
import { PRODUCTS } from "@/lib/data/catalog";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) {
    return { title: "Product not found" };
  }
  return {
    title: `${product.brand} ${product.name}`,
    description: `${product.brand} ${product.name} at Walgreens RX.`,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <ProductDetail product={product} related={getRelatedProducts(product)} />
    </div>
  );
}
