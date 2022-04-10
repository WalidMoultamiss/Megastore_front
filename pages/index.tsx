import type { NextPage, GetServerSideProps } from "next";
import {
  GetAllCategoriesDocument,
  GetAllBrandsDocument,
  GetAllStoresDocument,
  GetAllStoresQuery,
  GetAllBrandsQuery,
  GetAllCategoriesQuery,
  GetAllProductsDocument,
  useProductViewedSubscription,
} from "@/graphql/generated/graphql";
import apolloClient from "@/graphql/apollo";
import { HomeComp } from "@/components/Home";
import { LoginPopup } from "@/components/Login";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { useQuery } from "@apollo/client";
import { SubscriptionClient } from "subscriptions-transport-ws";
import ws from "ws";
import { useRouter } from "next/router";
import { SubscriptionComp } from "@/components/Subscription";

export type Props = {
  categories: GetAllCategoriesQuery;
  brands: GetAllBrandsQuery;
  stores: GetAllStoresQuery;
};

const Home: NextPage<Props> = ({ categories, brands, stores }) => {
  const [loginPopup, setLoginPopup] = useState(false);
  const allInputs = { imgUrl: "" };
  const [imageAsFile, setImageAsFile] = useState(null);
  const [imageAsUrl, setImageAsUrl] = useState(allInputs);
  const [progress, setProgress] = useState(0);
  const { data: products, loading, error } = useQuery(GetAllProductsDocument);

  const { isReady } = useRouter();


  return (
    <>
      {/* <Banner /> */}
      <Header setLoginPopup={setLoginPopup} />
      <SubscriptionComp />
      {/* @ts-ignore */}
      <HomeComp
        // @ts-ignore
        products={products?.getAllProducts}
        // @ts-ignore
        categories={categories?.getAllCategories}
        // @ts-ignore
        brands={brands?.getAllBrands}
      />
      {loginPopup && <LoginPopup setLoginPopup={setLoginPopup} />}
      {stores?.getAllStores?.map((store) => (
        <div key={store?.id}>
          <h1>{store?.name}</h1>
          <p>{store?.description}</p>
        </div>
      ))}
    </>
  );
};
export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const { data: StoresData } = await apolloClient.query({
    query: GetAllStoresDocument,
  });

  const { data: CategoryData } = await apolloClient.query({
    query: GetAllCategoriesDocument,
  });

  const { data: BrandData } = await apolloClient.query({
    query: GetAllBrandsDocument,
  });

  return {
    props: {
      categories: CategoryData,
      brands: BrandData,
    },
  };
};
