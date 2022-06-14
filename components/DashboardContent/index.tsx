import React, { FC, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "../Templates/Card";
import { type } from "os";
import { GetAllAdsDocument } from "@/graphql/generated/graphql";
import { useQuery } from "@apollo/client";

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

type Props = {
  show: boolean;
};

export const DashboardContent: FC<Props> = ({ show }) => {
  const [reload, setReload] = useState(0);

  useEffect(() => {
    console.log(reload);
  }, [reload]);

  const { data, loading, error, refetch } = useQuery(GetAllAdsDocument);

  const [livraisons, setLivraisons] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [SelectedDriverFromTable, setSelectedDriverFromTable] = useState();
  const [selectedLivraisonFromTable, setSelectedLivraisonFromTable] =
    useState();
    refetch();
    const [image , setImage] = useState('');


  return (
    <div className="">
      <h1 className="title font-bold text-5xl mb-4">Ads</h1>
      <motion.ul
        variants={container}
        className="p-4 space-x-4 max-w-screen carousel carousel-center bg-gray-100 rounded-box"
        initial="hidden"
        animate="visible"
      >
        {
          //@ts-ignore
          data?.getAllAds?.map((card, index) => (
            <motion.li key={index} className="carousel-item" variants={item}>
              <Card
                setImage={setImage}
                options={{
                  ...card,
                  colors: [
                    { hex: "brown" },
                    { hex: "orange" },
                    { hex: "grey" },
                  ],
                }}
              />
            </motion.li>
          ))
        }
      </motion.ul>
      <div></div>
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal cursor-pointer w-screen h-screen z-[5000]">
        <label className="modal-box relative flex justify-center items-center w-full" htmlFor="">
          <img src={image} className="w-96 h-96  rounded-lg" />
        </label>
      </label>
    </div>
  );
};

export default DashboardContent;
