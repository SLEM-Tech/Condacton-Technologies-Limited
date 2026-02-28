"use client";
import React, { useEffect, useRef, useState } from "react";

import Picture from "../picture/Picture";
import { useCategories, WooCommerce } from "../lib/woocommerce";
import ProductCard from "../Cards/ProductCard";
import HomeCard from "../Cards/HomeCard";
import Carousel from "../Reusables/Carousel";
import Link from "next/link";
import { convertToSlug, convertToSlug2 } from "@constants";
import { useEncryptionHelper } from "../EncryptedData";
import { useDispatch } from "react-redux";
import { updateCategorySlugId } from "../config/features/subCategoryId";
import { useRouter } from "next/navigation";
import { heroBg, heroImage, heroImage2, heroImage3 } from "@public/images";
import HeroCarousel from "../Cards/HeroCarousel";
import { FormatMoney2 } from "../Reusables/FormatMoney";
import { useCart } from "react-use-cart";
import TrustBadges from "./TrustBadges";
import BuyAccessories from "./BuyAccessories";

const AllCategorySection = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [maxScrollTotal, setMaxScrollTotal] = useState(0);
  const [scrollLeftTotal, setScrollLeftTotal] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [latestProducts, setLatestProducts] = useState<ProductType[]>([]);
  const dispatch = useDispatch();
  const router = useRouter();
  const { addItem, getItem } = useCart();

  // State to hold products by category
  const [categoryProductsMap, setCategoryProductsMap] = useState<{
    [key: string]: ProductType[];
  }>({});
  // WooCommerce API Category
  const {
    data: categories,
    isLoading: categoryWpIsLoading,
    isError: categoryIsError,
  } = useCategories("");

  const Categories: CategoryType[] = categories;
  const TotalCatgory = Categories?.length - 1;

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setIsLoading(true);

        const filteredCategories = categories
          ?.filter((category: CategoryType) => category?.count > 0)
          ?.slice(0, 5);

        if (filteredCategories) {
          const productsPromises = filteredCategories.map(
            async (category: CategoryType) => {
              const response = await WooCommerce.get(
                `products?category=${category?.id}`,
              );

              // Check if there is at least one product in the category
              const firstProductImage =
                response?.data.length > 0 ?
                  response?.data[0]?.images[0]?.src
                : null;

              return {
                categoryId: category?.id,
                firstProductImage: firstProductImage, // Store the first product's image
              };
            },
          );

          const productsResults = await Promise.all(productsPromises);

          // Update the state with the first product images mapped by category
          const productsMap = productsResults.reduce(
            (acc: any, result: any) => ({
              ...acc,
              [result.categoryId]: result.firstProductImage,
            }),
            {},
          );

          setCategoryProductsMap(productsMap);
        }
      } catch (error) {
        console.error("Error fetching category products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (categories?.length) {
      fetchCategoryProducts();
    }
  }, [categories]);

  // Fetch latest products for New Arrivals
  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        const response = await WooCommerce.get(
          "products?orderby=date&order=desc&per_page=8",
        );
        if (response?.data) {
          setLatestProducts(response.data);
        }
      } catch (error) {
        console.error("Error fetching latest products:", error);
      }
    };
    fetchLatestProducts();
  }, []);

  const handleNext = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      const maxScroll = scrollWidth - clientWidth;
      setScrollLeftTotal(scrollLeft);
      setMaxScrollTotal(maxScroll);

      sliderRef.current.scrollLeft += 600; // Adjust the scroll distance as needed
      setCurrentIndex((prevIndex) =>
        prevIndex < TotalCatgory - 1 ? prevIndex + 1 : prevIndex,
      );
    }
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      const maxScroll = scrollWidth - clientWidth;
      setScrollLeftTotal(scrollLeft);
      setMaxScrollTotal(maxScroll);
      // console.log(scrollLeft);
      if (scrollLeft > 0) {
        sliderRef.current.scrollLeft -= 600; // Adjust the scroll distance as needed
        setCurrentIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : prevIndex,
        );
      }
    }
  };

  return (
    <>
      {/* Hero Concept inspired by the image */}
      <div className="relative w-full h-screen overflow-hidden">
        {/* The Background Image */}
        <Picture
          src={heroBg}
          alt="Brand New Collection"
          className="w-full h-full object-cover scale-105"
        />

        {/* Content Overlay — Centered */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight">
            Computer Delivery
          </h1>
          <p className="mt-6 text-sm md:text-base text-white/70 max-w-xl leading-relaxed">
            We deal in COMPUTERS, SOFTWARE, ACCESSORIES, AND RELATED HARDWARE
          </p>
          <Link
            href="/category"
            className="mt-8 inline-block bg-primary-100 hover:bg-primary-100/80 text-white text-xs md:text-sm font-bold uppercase tracking-[0.2em] px-8 py-3.5 rounded transition-colors">
            Start Now
          </Link>
        </div>
      </div>

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
          {latestProducts.length > 0 ?
            latestProducts.slice(0, 8).map((product: ProductType) => {
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
          : /* Loading Skeleton */
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/3] bg-[#F9F9F9] mb-6" />
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-2 mx-auto" />
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4 mx-auto" />
                <div className="h-5 bg-gray-200 rounded w-1/3 mb-4 mx-auto" />
                <div className="h-10 bg-gray-200 rounded w-full mx-auto" />
              </div>
            ))
          }
        </div>
      </div>
      <BuyAccessories />
    </>
  );
};

export default AllCategorySection;
