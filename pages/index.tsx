import type { NextPage, GetServerSideProps } from "next";
import {
  GetAllCategoriesDocument,
  GetAllBrandsDocument,
  GetAllProductsDocument,
} from "@/graphql/generated/graphql";
import { HomeComp } from "@/components/Home";
import { LoginPopup } from "@/components/Login";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { SubscriptionComp } from "@/components/Subscription";
import { AnimatePresence } from "framer-motion";

export type Props = {};

const Home: NextPage<Props> = () => {
  const [loginPopup, setLoginPopup] = useState(false);
  const allInputs = { imgUrl: "" };
  const [imageAsFile, setImageAsFile] = useState(null);
  const [imageAsUrl, setImageAsUrl] = useState(allInputs);
  const [progress, setProgress] = useState(0);
  const {
    data: products,
    loading,
    error,
  } = useQuery(GetAllProductsDocument, {
    fetchPolicy: "cache-and-network",
  });
  const { data: brands } = useQuery(GetAllBrandsDocument);
  const { data: categories } = useQuery(GetAllCategoriesDocument);

  const { isReady } = useRouter();

  return (
    <>
      {/* <Banner /> */}
      <Header setLoginPopup={setLoginPopup} />
      <SubscriptionComp />
      <HomeComp
        // @ts-ignore
        products={products?.getAllProducts}
        // @ts-ignore
        categories={categories?.getAllCategories}
        // @ts-ignore
        brands={brands?.getAllBrands}
      />
      <AnimatePresence>
        {loginPopup && <LoginPopup setLoginPopup={setLoginPopup} />}
      </AnimatePresence>
    </>
  );
};
export default Home;
