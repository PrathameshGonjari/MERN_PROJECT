import { getProductDetails } from "@redux/features/product-details-slice";
import { showErrorToast } from "@redux/features/toast-slice";
import ProductDetailViewCard from "@shared-components/ProductDetailViewCard";
import UserReviewCard from "@shared-components/UserReviewCard";
import Loader from "@shared-layouts/Loader";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function ProductDetail() {
  const params = useParams();

  const productId = params?.id;

  const dispatch = useDispatch();

  const { error, isLoading, product } = useSelector(
    (state) => state.productdetailappreducer
  );

  useEffect(() => {
    dispatch(getProductDetails(productId));
  }, [dispatch, productId]);

  if (isLoading) {
    return <Loader />;
  }

  if (!isLoading && error) {
    dispatch(showErrorToast(error));
  }

  return (
    <>
      <ProductDetailViewCard
        images={product?.images}
        stock={product?.Stock}
        name={product?.name}
        productId={product?._id}
        ratings={product?.ratings}
        numOfReviews={product?.numOfReviews}
        price={product?.price}
        description={product?.description}
      />
      <section className="m-8 text-neutral-700 dark:text-neutral-300">
        <div className="mx-auto text-center md:max-w-xl lg:max-w-3xl">
          <h3 className="mb-6 text-3xl font-bold">REVIEWS</h3>
        </div>
        <div className="p-6 flex justify-center">
          <div className="overflow-x-auto flex gap-6 p-4">
            <UserReviewCard />
            <UserReviewCard />
            {/* <UserReviewCard />
            <UserReviewCard />
            <UserReviewCard />
            <UserReviewCard />
            <UserReviewCard /> */}
          </div>
        </div>
      </section>
    </>
  );
}

export default ProductDetail;
