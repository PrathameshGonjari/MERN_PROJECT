import React, { useState } from "react";
import Rating from "../Rating";
import ImagePlaceHolder from "@images/imageplaceholder.png";

function ProductDetailViewCard({
  images,
  stock,
  name,
  productId,
  ratings,
  numOfReviews,
  price,
  description,
}) {
  const initialImageId = images?.[0]?._id;

  const [activeImageId, setActiveImageId] = useState(initialImageId);

  const activeImage = images?.filter((item) => activeImageId === item?._id);

  const getProductStatus = () => {
    if (stock < 1) return { color: "text-palette-error", text: "OutOfStock" };
    return { color: "text-palette-success", text: "InStock" };
  };

  const productStatus = getProductStatus();

  return (
    <div className="mt-24 mb-10 max-w-5xl mx-auto">
      <div className="flex  flex-col bg-white rounded-lg shadow-lg items-center md:flex-row md:content-normal md:items-start	">
        <div className="md:w-1/2">
          <div className="overflow-hidden">
            <div className="flex">
              <img
                src={activeImage?.[0]?.url || ImagePlaceHolder}
                alt="shoe"
                className="w-full"
              />
            </div>
          </div>
          {images?.length > 1 && (
            <div className="w-full flex justify-center mt-4 space-x-2 h-1/3">
              {images?.map((image) => {
                return (
                  <div
                    onClick={() => setActiveImageId(image?._id)}
                    className="p-1"
                  >
                    <img
                      width={80}
                      height={80}
                      src={image?.url}
                      alt="product images"
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className="md:w-1/2 p-6 max-sm:flex max-sm:flex-col max-sm:items-center">
          <h2 className="text-3xl font-semibold text-gray-800">{name}</h2>
          <p>Product # {productId}</p>
          <div className="flex items-cenxpter mt-2">
            <Rating rating={ratings} />
            <span className="text-gray-700 ml-2">
              {ratings}({numOfReviews})
            </span>
          </div>
          <div className="mt-4">
            <p className="text-lg">
              Price: <span className="text-red-500">{price}</span>
            </p>
          </div>

          <div className="mt-4">
            <div className="flex flex-col items-center sm:flex-row">
              <div className="flex items-center mb-2">
                <button className="min-w-fit p-3 bg-palette-primary text-palette-light rounded-full flex items-center">
                  +
                </button>
                <input
                  type="number"
                  min="0"
                  value="1"
                  className="border border-gray-300 rounded-md px-3 py-2 mx-2 sm:mb-0 w-full"
                />
                <button className="min-w-fit p-3 bg-palette-primary text-palette-light rounded-full flex items-center">
                  -
                </button>
              </div>
              <button className="min-w-fit mb-2 ml-2 p-3 bg-palette-light text-palette-dark rounded-full flex items-center">
                Add to Cart <i className="fas fa-shopping-cart"></i>
              </button>
            </div>
          </div>

          <div className="mt-4">
            <div className="mt-2">
              <div className="text-sm text-gray-700">
                Status:
                <span className={`font-semibold ${productStatus?.color}`}>
                  {productStatus?.text}
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-600">{description}</p>
          </div>

          <button
            type="button"
            className="min-w-fit mt-4 p-3 bg-palette-primary text-palette-light rounded-full flex items-center"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailViewCard;
