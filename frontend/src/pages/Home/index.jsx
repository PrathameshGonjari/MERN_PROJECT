import CustomCard from "@shared-components/CustomCard";
import Loader from "@shared-layouts/Loader";
import MetaData from "@shared-layouts/MetaData";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "@redux/features/product-slice";
import "./style.css";
import { showErrorToast } from "@redux/features/toast-slice";

function Home() {
  const dispatch = useDispatch();

  const { error, isLoading, product } = useSelector(
    (state) => state.productappreducer
  );

  const productArray = product?.length ? product : Array(8)?.fill("");

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  if (!isLoading && error) {
    dispatch(showErrorToast(error));
  }

  return (
    <>
      <MetaData title="ECOMMERCE" />
      <div className="banner mt-11 min-h-screen flex flex-col text-center items-center justify-center bg-palette-lighter after:bg-palette-light">
        <p className="font-light text-2xl">Welcome to Ecommerce</p>
        <h1 className="font-semibold text-4xl my-5">
          FIND AMAZING PRODUCTS BELOW
        </h1>
        <a
          href="#container"
          className="bg-palette-light text-palette-dark pl-4 rounded-full flex items-center"
        >
          <span className="mr-5">Scroll</span>
          <span className="bg-palette-light hover:bg-palette-primary  w-16 h-16 flex items-center justify-center rounded-full">
            🖱️
          </span>
        </a>
      </div>
      <h2 className="text-center text-2xl border-b-2 border-b-palette-primary border-solid max-w-lg my-10 mx-auto">
        Featured Products
      </h2>
      <div
        id="container"
        className="md:flex gap-4 mx-8 my-4 flex-wrap justify-center max-w-full"
      >
        {productArray?.map((item, index) => {
          return (
            <CustomCard
              key={index}
              id={item?._id}
              image={item?.images?.[0]?.url}
              title={item?.name}
              rating={item?.rating}
              reviewCount={item?.numOfReviews}
              price={item?.price}
            />
          );
        })}
      </div>
    </>
  );
}

export default Home;
