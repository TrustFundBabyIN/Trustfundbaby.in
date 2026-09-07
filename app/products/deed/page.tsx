import type { Metadata } from "next";

import { SiteFooter } from "@/components/landing/site-footer";
import { SiteNav } from "@/components/landing/site-nav";
import { ProductDetail } from "@/components/products/product-detail";
import { getProduct } from "@/lib/products";

const product = getProduct("deed")!;

export const metadata: Metadata = {
  title: product.tagline,
  description: product.description,
};

export default function DeedPage() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <ProductDetail product={product} />
      </main>
      <SiteFooter />
    </>
  );
}
