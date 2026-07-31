import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageChrome";
import { ProductArt } from "@/components/store/ProductArt";
import { AddToCartPanel } from "@/components/store/ProductCard";
import {
  categoryLabel,
  getProduct,
  storeProducts,
} from "@/lib/store";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return storeProducts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const product = getProduct(params.slug);
  if (!product) return { title: "Product" };
  return {
    title: product.name,
    description: product.blurb,
  };
}

export default function ProductPage({ params }: Props) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  return (
    <>
      <PageHero
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/shop", label: "Store" },
          { label: product.name },
        ]}
        overline={categoryLabel(product.category)}
        title={product.name}
        subtitle={product.blurb}
      />
      <div className="mx-auto max-w-content section-pad">
        <div className="grid gap-10 lg:grid-cols-2">
          <ProductArt product={product} className="border border-slate-line" />
          <div>
            <p className="text-body-lg leading-relaxed text-slate-text">
              {product.description}
            </p>
            <div className="mt-8">
              <AddToCartPanel product={product} />
            </div>
            <Link
              href="/shop"
              className="mt-6 inline-block text-sm font-semibold text-navy underline-offset-2 hover:underline"
            >
              ← Back to store
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
