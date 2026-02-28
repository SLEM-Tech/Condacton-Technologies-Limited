import React from "react";
import Picture from "../picture/Picture";
import { monitorImg, mostPopularBg } from "@public/images";
import { FormatMoney2 } from "../Reusables/FormatMoney";

const BuyAccessories = () => {
  return (
    <div className="w-full h-auto min-h-[600px] bg-white grid grid-cols-1 md:grid-cols-2 font-[sans-serif] max-w-7xl mx-auto">
      {/* Left Column - Product Details */}
      <div className="flex flex-col justify-center items-center p-8 md:p-16 text-center">
        <h4 className="text-[#252B42] font-bold text-xl md:text-2xl tracking-[0.1px] mb-4 uppercase">
          Most Popular
        </h4>
        <p className="text-[#737373] text-sm md:text-base mb-8 max-w-sm tracking-[0.2px] leading-relaxed">
          We focus on ergonomics and meeting you where you work. It's only a
          keystroke away.
        </p>

        <div className="w-full max-w-[400px] mb-6 aspect-video flex items-center justify-center">
          <Picture
            src={monitorImg}
            alt="Monitor Setup"
            className="w-full h-full object-contain"
          />
        </div>

        <h5 className="text-[#252B42] font-bold text-base mb-4 tracking-[0.1px]">
          Complete Setup
        </h5>

        <div className="flex items-center gap-2 text-[#737373] text-sm font-bold mb-4 tracking-[0.2px]">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          15 Sales
        </div>

        <div className="flex items-center gap-2 mb-6">
          <span className="text-[#BDBDBD] font-bold text-base line-through tracking-[0.1px]">
            <FormatMoney2 value={16.48} />
          </span>
          <span className="text-[#23856D] font-bold text-base tracking-[0.1px]">
            <FormatMoney2 value={6.48} />
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-full bg-[#23A6F0] cursor-pointer hover:scale-110 transition-transform"></span>
          <span className="w-4 h-4 rounded-full bg-[#2DC071] cursor-pointer hover:scale-110 transition-transform"></span>
          <span className="w-4 h-4 rounded-full bg-[#E77C40] cursor-pointer hover:scale-110 transition-transform"></span>
          <span className="w-4 h-4 rounded-full bg-[#252B42] cursor-pointer hover:scale-110 transition-transform"></span>
        </div>
      </div>

      {/* Right Column - Background Image */}
      <div className="w-full h-full min-h-[400px] md:min-h-full bg-black">
        <Picture
          src={mostPopularBg}
          alt="Workspace Background"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default BuyAccessories;
