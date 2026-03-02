"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiLogoFacebook, BiLogoInstagram, BiLogoTwitter } from "react-icons/bi";
import { FiPhone, FiMapPin, FiMail } from "react-icons/fi";

const footerLinks = [
  {
    title: "Company Info",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Products", href: "/category" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact Us", href: "/contact-us" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Use", href: "/terms-of-use" },
      { label: "Privacy Policy", href: "/terms-of-use" },
    ],
  },
  {
    title: "Customer Service",
    links: [
      { label: "My Account", href: "/user/dashboard" },
      { label: "My Orders", href: "/user/my-orders" },
      { label: "Cart", href: "/cart" },
      { label: "Checkout", href: "/checkout" },
    ],
  },
];

const socialIcons = [
  {
    id: 1,
    icon: <BiLogoFacebook className="text-2xl text-[#23A6F0]" />,
    link: "#",
  },
  {
    id: 2,
    icon: <BiLogoInstagram className="text-2xl text-[#23A6F0]" />,
    link: "#",
  },
  {
    id: 3,
    icon: <BiLogoTwitter className="text-2xl text-[#23A6F0]" />,
    link: "#",
  },
];

const Footer = () => {
  const pathname = usePathname();

  return (
    <footer className="bg-[#252B42] w-full pt-10 pb-6 font-[sans-serif]">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
        {/* Top Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between pb-10 border-b border-[#E6E6E6]/20">
          <Link
            href="/"
            className="text-2xl font-bold tracking-[0.2em] text-white uppercase mb-4 sm:mb-0">
            LOGO
          </Link>
          <Link
            href="/contact-us"
            className="bg-[#23A6F0] text-white px-6 py-3 rounded text-sm font-bold hover:bg-[#23A6F0]/90 transition">
            Contact Us
          </Link>
        </div>

        {/* Middle Columns */}
        <div className="py-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {footerLinks.map((section, index) => (
            <div key={index} className="flex flex-col gap-5">
              <h5 className="text-white font-bold text-base tracking-[0.1px]">
                {section.title}
              </h5>
              <div className="flex flex-col gap-3">
                {section.links.map((link, idx) => (
                  <Link
                    key={idx}
                    href={link.href}
                    className="text-white/80 text-sm font-semibold tracking-[0.2px] hover:text-[#23A6F0] transition">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {/* Get In Touch */}
          <div className="flex flex-col gap-5">
            <h5 className="text-white font-bold text-base tracking-[0.1px]">
              Get In Touch
            </h5>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 text-white/80 group cursor-pointer hover:text-[#23A6F0] transition">
                <FiPhone className="text-xl text-[#23A6F0] shrink-0" />
                <span className="text-sm font-semibold tracking-[0.2px]">
                  (480) 555-0103
                </span>
              </div>
              <div className="flex items-start gap-3 text-white/80 group cursor-pointer hover:text-[#23A6F0] transition">
                <FiMapPin className="text-xl text-[#23A6F0] shrink-0 mt-0.5" />
                <span className="text-sm font-semibold tracking-[0.2px] flex-1 leading-relaxed">
                  4517 Washington Ave.
                </span>
              </div>
              <div className="flex items-center gap-3 text-white/80 group cursor-pointer hover:text-[#23A6F0] transition">
                <FiMail className="text-xl text-[#23A6F0] shrink-0" />
                <span className="text-sm font-semibold tracking-[0.2px]">
                  debra.holt@example.com
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/80 text-sm font-semibold tracking-[0.2px] text-center md:text-left">
            Made With Love By Finland All Right Reserved
          </p>
          <div className="flex items-center gap-4">
            {socialIcons.map((item) => (
              <a
                key={item.id}
                href={item.link}
                className="hover:opacity-80 transition">
                {item.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
