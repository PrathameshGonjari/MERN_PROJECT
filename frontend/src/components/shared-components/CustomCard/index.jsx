import React from "react";
import Rating from "../Rating";
import ImagePlaceHolder from "@images/imageplaceholder.png";
import { Link } from "react-router-dom";

function CustomCard({ id, image, title, rating, reviewCount, price }) {
  return (
    <Link to={`/product/${id}`} className="max-w-md rounded overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300 cursor-pointer">
      <img
        className="w-full"
        src={image ?? ImagePlaceHolder}
        height={100}
        width={100}
        alt="Product"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
      </div>
      <div className="px-6 py-4">
        <div className="flex items-center">
          <Rating rating={rating ?? 0} />
          <div className="text-sm ml-2">({reviewCount ?? 0} Reviews)</div>
        </div>
      </div>
      <div className="px-6 mb-4">
        <div className="text-lg text-palette-orange">₹{price ?? 0}</div>
      </div>
    </Link>
  );
}

export default CustomCard;
