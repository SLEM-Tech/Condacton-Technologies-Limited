"use client";
import { convertToSlug } from "@constants";
import Picture from "@src/components/picture/Picture";
import { FormatMoney2 } from "@src/components/Reusables/FormatMoney";
import { useCategories, WooCommerce } from "@src/components/lib/woocommerce";
import GlobalLoader from "@src/components/modal/GlobalLoader";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";
import { useCart } from "react-use-cart";

export const Loader = () => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="animate-pulse">
        <div className="aspect-square bg-gray-200 rounded-lg mb-4" />
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-3" />
        <div className="h-9 bg-gray-200 rounded w-full" />
      </div>
    ))}
  </div>
);

const SortedProducts = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [saleProducts, setSaleProducts] = useState<ProductType[]>([]);
  const [popularProducts, setPopularProducts] = useState<ProductType[]>([]);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { addItem, getItem } = useCart();

  // Fetch sale products (on_sale) and popular products (by popularity)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const [saleRes, popularRes] = await Promise.all([
          WooCommerce.get(
            "products?on_sale=true&per_page=6&orderby=date&order=desc",
          ),
          WooCommerce.get("products?orderby=popularity&per_page=8&order=desc"),
        ]);
        if (saleRes?.data) setSaleProducts(saleRes.data);
        if (popularRes?.data) setPopularProducts(popularRes.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      {/* Bestseller Products Section */}
      <div className="max-w-[1440px] px-8 mx-auto py-10 sm:py-16 font-[sans-serif]">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 pb-6 border-b border-[#ECECEC]">
          <div className="flex flex-col md:flex-row items-center gap-8 mb-4 md:mb-0">
            <h2 className="text-2xl font-bold text-[#252B42] tracking-[0.1px] uppercase">
              Bestseller Products
            </h2>
            <div className="flex items-center gap-6">
              <button className="text-sm font-bold text-[#23A6F0] tracking-[0.2px] hover:text-[#23A6F0]/80 transition">
                All
              </button>
              <button className="text-sm font-bold text-[#737373] tracking-[0.2px] hover:text-[#23A6F0] transition">
                Software
              </button>
              <button className="text-sm font-bold text-[#737373] tracking-[0.2px] hover:text-[#23A6F0] transition">
                Accessories
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="w-12 h-12 rounded-full border border-[#ECECEC] flex items-center justify-center text-[#252B42] hover:bg-gray-50 transition">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button className="w-12 h-12 rounded-full border border-[#ECECEC] flex items-center justify-center text-[#252B42] hover:bg-gray-50 transition">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {isLoading ?
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/3] bg-[#F9F9F9] mb-6" />
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-2 mx-auto" />
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4 mx-auto" />
                <div className="h-5 bg-gray-200 rounded w-1/3 mb-4 mx-auto" />
                <div className="h-10 bg-gray-200 rounded w-full mx-auto" />
              </div>
            ))
          : popularProducts.slice(0, 8).map((product: ProductType) => {
              const price = parseInt(product?.price || "0");
              const oldPrice =
                product?.regular_price ? parseInt(product.regular_price) : null;
              const slugDesc = convertToSlug(product?.name);
              const ID = product?.id?.toString();
              const cartItem = getItem(ID);
              const { updateItemQuantity, removeItem, addItem } = useCart();

              return (
                <div key={product.id} className="group flex flex-col bg-white">
                  {/* Image Container */}
                  <Link
                    href={`/home-item/product/${slugDesc}-${product.id}`}
                    className="relative aspect-[4/3] bg-[#F9F9F9] overflow-hidden flex items-center justify-center mb-6">
                    <Picture
                      src={product?.images?.[0]?.src}
                      alt={product?.name}
                      className="object-contain w-full h-full p-4 group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>

                  <div className="flex flex-col items-center text-center px-4">
                    {/* Product Info */}
                    <Link
                      href={`/home-item/product/${slugDesc}-${product.id}`}
                      className="text-base font-bold text-[#252B42] line-clamp-1 mb-2 hover:text-[#23856D] transition-colors tracking-[0.1px]"
                      dangerouslySetInnerHTML={{ __html: product?.name }}
                    />

                    {/* Category Label */}
                    <p className="text-sm font-bold text-[#737373] mb-4 tracking-[0.2px]">
                      {product?.categories?.[0]?.name || "Accessories"}
                    </p>

                    {/* Price */}
                    <div className="flex items-center justify-center gap-2 mb-4">
                      {oldPrice && oldPrice > price ?
                        <>
                          <span className="text-base font-bold text-[#BDBDBD] line-through tracking-[0.1px]">
                            <FormatMoney2 value={oldPrice} />
                          </span>
                          <span className="text-base font-bold text-[#23856D] tracking-[0.1px]">
                            <FormatMoney2 value={price} />
                          </span>
                        </>
                      : <span className="text-base font-bold text-[#23856D] tracking-[0.1px]">
                          {price ?
                            <FormatMoney2 value={price} />
                          : "N/A"}
                        </span>
                      }
                    </div>

                    {/* Add to Cart Button */}
                    {price > 0 && (
                      <div className="w-full mt-2">
                        {cartItem ?
                          <div className="flex items-center justify-between border border-[#23856D] rounded text-[#23856D] h-10 px-3">
                            <button
                              onClick={() => {
                                if (
                                  cartItem.quantity &&
                                  cartItem.quantity > 1
                                ) {
                                  updateItemQuantity(ID, cartItem.quantity - 1);
                                } else {
                                  removeItem(ID);
                                }
                              }}
                              className="text-xl px-2 hover:text-[#252B42] transition">
                              -
                            </button>
                            <span className="font-bold text-sm select-none">
                              {cartItem.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateItemQuantity(
                                  ID,
                                  (cartItem.quantity || 1) + 1,
                                )
                              }
                              className="text-xl px-2 hover:text-[#252B42] transition">
                              +
                            </button>
                          </div>
                        : <button
                            onClick={() =>
                              addItem({
                                id: ID,
                                name: product?.name,
                                price,
                                quantity: 1,
                                image: product?.images?.[0]?.src,
                              })
                            }
                            className="w-full h-10 border border-[#23856D] text-[#23856D] hover:bg-[#23856D] hover:text-white text-sm font-bold rounded transition-colors cursor-pointer tracking-[0.2px]">
                            Add to cart
                          </button>
                        }
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
      {/* ─── Sale Section — Purple Background ─── */}

      <GlobalLoader isPending={isPending} />
    </>
  );
};

export default SortedProducts;
