import React, { FC, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { CircularProgress, LinearProgress } from "@mui/material";
import { storage } from "@/firebase/index";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getBlob,
} from "@firebase/storage";
import { PrimaryBtn } from "../PrimaryBtn";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PublicIcon from "@mui/icons-material/Public";
import {
  GetAllImagesByUserDocument,
  useCreateImageMutation,
} from "@/graphql/generated/graphql";
import { useLazyQuery, useQuery } from "@apollo/client";
import { useOnClickOutside } from "@/hooks/index";

type Props = {
  setPopupImages: React.Dispatch<React.SetStateAction<boolean>>;
  constraintsRef: React.MutableRefObject<HTMLDivElement>;
};

export const ImagesHolder: FC<Props> = ({ setPopupImages, constraintsRef }) => {
  const [progress, setProgress] = useState(0);
  const [imageAsFile, setImageAsFile] = useState(null);
  const [imageIsLoading, setImageIsLoading] = useState(false);
  const [AllImages, setAllImages] = useState<Array<String>>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [primaryImage, setPrimaryImage] = useState<number>(0);
  const [primaryImageSrc, setPrimaryImageSrc] = useState<string>("");
  const [userId, setUserId] = useState("");
  const popupRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [leftOverlay, setLeftOverlay] = useState(0);
  const [topOverlay, setTopOverlay] = useState(0);

  const { data, loading, error, refetch } = useQuery(
    GetAllImagesByUserDocument,
    {
      variables: {
        user: userId,
      },
    }
  );

  refetch();

  const [createImage, { loading: CreateImageLoading }] =
    useCreateImageMutation();

  useEffect(() => {
    if (localStorage) {
      //@ts-ignore
      JSON.parse(localStorage?.getItem("user")).id
        ? //@ts-ignore

          setUserId(JSON.parse(localStorage?.getItem("user")).id)
        : setUserId("");
    }
  }, []);

  useEffect(() => {
    if (data && data.getAllImagesByUser.length > 0) {
      setAllImages(
        data.getAllImagesByUser.map(
          (image: { id: string; src: string }) => image.src
        )
      );
    }
  }, [data]);

  useOnClickOutside(popupRef, () => {
    setPopupImages(false);
  });

  const handleFireBaseUpload = () => {
    setImageIsLoading(true);

    if (!imageAsFile) {
      return alert("Please select an image");
    } else {
      // @ts-ignore
      const storageRef = ref(storage, `/files/${imageAsFile?.name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageAsFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(prog);
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            console.log(url);
            setAllImages([...AllImages, url]);
            createImage({
              variables: {
                input: { src: url, user: userId, alt: "  " },
              },
            });
            setTimeout(() => {
              setImageIsLoading(false);
            }, 1200);
          });
        }
      );
    }
  };

  const handleRemoveImage = (index: number) => {
    setAllImages((AllImages) => {
      return AllImages.filter((_, i) => i !== index);
    });
  };

  const handleChange = async (e: any) => {
    // @ts-ignore
    if (e?.target?.files[0]) {
      // @ts-ignore
      const image = e?.target?.files[0];
      setImageAsFile((imageFile) => image);
    }
  };

  useEffect(() => {
    if (imageAsFile) {
      handleFireBaseUpload();
      setImageAsFile(null);
    }
  }, [imageAsFile]);

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

  return (
    <div className="w-screen h-screen fixed flex top-0 left-0 justify-center items-center  z-[99999] bg-black bg-opacity-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        exit={{ opacity: 0, scale: 0.9 }}
        ref={popupRef}
        className="bg-white relative flex-col justify-between flex w-[90%] h-[90%] gap-3 mt-5  rounded-sm"
      >
        <div className="w-full border-solid">
          <div className="flex justify-between">
            <div className="w-full  p-6 border-b-2 border-solid border-slate-300 flex justify-between">
              <div className="flex items-center">
                <div className="flex border-b-2 border-blue-800 border-solid hover:bg-slate-100 transition-all p-2 rounded-t-md cursor-pointer items-center">
                  <CloudUploadIcon />
                  <span className="text-black ml-1 font-extrabold text-lg">
                    Uploaded Image
                  </span>
                </div>
                &nbsp;&nbsp;&nbsp;{" | "}&nbsp;&nbsp;&nbsp;
                <div className="flex border-b-2 border-transparent border-solid hover:bg-slate-100 transition-all p-2 rounded-t-md cursor-pointer items-center">
                  <PublicIcon />
                  <span className="text-black ml-1 font-extrabold text-lg">
                    Public Images
                  </span>
                </div>
                <input
                  ref={inputRef}
                  type="file"
                  onChange={handleChange}
                  className="hidden"
                />
              </div>
              <div className="flex gap-3">
                <PrimaryBtn
                  onClick={() => {
                    inputRef.current?.click();
                  }}
                >
                  Add new image
                </PrimaryBtn>

                <PrimaryBtn
                  className="ml-2 bg-blue-600 px-4 text-white hover:bg-blue-900"
                  onClick={() => {
                    setPopupImages(false);
                  }}
                >
                  Confirm
                </PrimaryBtn>
              </div>
            </div>
          </div>
        </div>

        {imageIsLoading && (
          <div className="absolute w-full h-full flex top-0 left-0 bg-white bg-opacity-50 justify-center items-center">
            <CircularProgress />
          </div>
        )}
        <div className="flex overflow-y-auto flex-wrap gap-3">
          <motion.ul
            variants={container}
            className="flex overflow-y-auto flex-wrap gap-3"
            initial="hidden"
            animate="visible"
          >
            {AllImages?.map((src, i) => (
              <motion.li
                key={i}
                className="carousel-item h-fit cursor-pointer"
                variants={item}
              >
                <div className="w-44  flex flex-col gap-4 justify-center items-center">
                  <div
                    onClick={() => {
                      setPrimaryImage(i);
                      if (src) {
                        //@ts-ignore
                        setPrimaryImageSrc(src);
                        //@ts-ignore
                        constraintsRef?.current?.style?.backgroundImage = `url(${src})`;
                      }
                    }}
                    className={`p-16 rounded relative bg-slate-300 bg-no-repeat bg-cover bg-center  cursor-pointer border-8   border-solid ${
                      i === primaryImage
                        ? "border-green-600"
                        : "border-transparent"
                    }`}
                    style={{
                      backgroundImage: `url(${src})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    {i === primaryImage && (
                      <div
                        onClick={() => {
                          setPopupImages(false);
                        }}
                        className="z-[1]  top-0 left-0 absolute w-full h-full cursor-pointer"
                      ></div>
                    )}
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      className="bg-red-500 z-[2] absolute top-2 right-2 hover:bg-red-700 text-black font-bold px-3 rounded-full focus:outline-none focus:shadow-outline"
                      type="button"
                      onClick={() => handleRemoveImage(i)}
                    >
                      ⨉
                    </motion.button>
                  </div>
                </div>
              </motion.li>
            ))}
          </motion.ul>

          {AllImages.length === 0 && !loading && (
            <div className="text-3xl text-center w-full p-20">Add images</div>
          )}
          {loading && (
            <div className="text-3xl text-center w-full p-20">
              <CircularProgress />
            </div>
          )}
        </div>
        <div className="w-full  flex-col p-6 py-3 border-t-2 border-solid border-slate-300 flex justify-between">
          <h3>Storage</h3>
          <div className="w-full flex gap-3 justify-between items-center">
            <LinearProgress
              className="w-full"
              variant="determinate"
              value={AllImages.length}
            />
            <span>({AllImages.length}%)</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
