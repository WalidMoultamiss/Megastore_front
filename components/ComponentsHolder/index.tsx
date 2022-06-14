import React, { useEffect, useState, useRef, useCallback, FC } from "react";
import { AnimatePresence, motion } from "framer-motion";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import { IconButton, List, ListItemButton, ListItemText } from "@mui/material";
import { Box } from "@mui/system";
import html2canvas from "html2canvas";
import { ImagesHolder } from "../ImagesHolder";
import { SingleComponent } from "../SingleComponent";
import { PrimaryBtn } from "../PrimaryBtn";
import {
  getDownloadURL,
  uploadBytesResumable,
  ref as fireRef,
} from "@firebase/storage";
import { storage } from "@/firebase/index";
import { useCreateAdMutation } from "@/graphql/generated/graphql";

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

type ImageComp = {
  imageComp: HTMLImageElement;
  handleChangeImageComp: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setPopupImages: (popupImages: boolean) => void;
  //@ts-ignore
  constraintsRef: React.MutableRefObject<Constraints>;
  customTW: string;
};

export const ImageComp: FC<ImageComp> = ({
  imageComp,
  handleChangeImageComp,
  setPopupImages,
  constraintsRef,
  customTW
}) => {
  const imgCompRef = useRef(null);

  return (
    <div
      onClick={() => {
        //@ts-ignore
        handleChangeImageComp(imgCompRef);
      }}
      ref={imgCompRef}
      style={{
        backgroundImage: `url("https://source.unsplash.com/random")`,
        backgroundSize: "100%",
        backgroundRepeat: "no-repeat",
      }}
      className={`w-full h-full bg-cover bg-center ${customTW}`}
    ></div>
  );
};

type Props = {
};

export const ComponentsHolder: FC<Props> = () => {
  const components = [
    "Text",
    "Button",
    "Icon",
    "Card",
    "List",
    "Image",
    "QrCode",
    "Html",
    "Rect",
  ];
  //@ts-ignore
  const constraintsRef = useRef<React.MutableRefObject<HTMLDivElement>>(true);
  //@ts-ignore
  const [divElement, setDivElement] = useState<HTMLDivElement>(null);
  //@ts-ignore
  const handleChangeImageComp = (ref) => {
    setPopupImages(true);
    setDivElement(ref);
  };

  const [isDrag, setIsDrag] = useState(true);
  const [deleteComponent, setDeleteComponent] = useState(0);
  const [Components, setComponents] = useState([]);
  const [image, setImage] = useState(null);
  const [menuImage, setMenuImage] = useState(false);
  const [containerHeight, setContainerHeight] = useState(500);
  const [containerWidth, setContainerWidth] = useState(500);
  const [popupImages, setPopupImages] = useState(false);
  const [componentsTree, setComponentsTree] = useState([]);

  useEffect(() => {
    console.log(componentsTree);
  }, [componentsTree]);
  //@ts-ignore
  const setNewXY = (e, id) => {
    const { x, y } = e.target.getBoundingClientRect();
    const newX = e.pageX - x - 5;
    const newY = e.pageY - y - 13;

    console.log(componentsTree[0], id);

    // setComponentsTree(newComponents);
  };

  useEffect(() => {
    if (deleteComponent) {
      setComponents(
        Components.filter((item, index) => index !== deleteComponent)
      );
    }
  }, [deleteComponent]);

  const AddComponent = (Type: string) => {
    setComponents([
      //@ts-ignore
      ...Components,
      //@ts-ignore
      <SingleComponent
      //@ts-ignore
        setNewXY={setNewXY}
        key={Components.length}
        Components={Components || []}
        setDeleteComponent={setDeleteComponent}
        id={Components.length}
        Type={Type}
        setPopupImages={setPopupImages}
        handleChangeImageComp={handleChangeImageComp}
        constraintsRef={constraintsRef}
      />,
    ]);
  };

  //div to png so we can say that i completed the task
  const ref = useRef(null);
  const [createAd, { loading }] = useCreateAdMutation();

  const handleDownloadImage = () => {
    //@ts-ignore
    html2canvas(constraintsRef.current, {
      allowTaint: true,
      useCORS: true,
      logging: true,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const img = new Image();
      img.src = imgData;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0);
        const imgData = canvas.toDataURL("image/jpeg", 1.0);
        const a = document.createElement("a");
        a.href = imgData;
        a.download = "image.jpeg";
        a.click();
        const userId = JSON.parse(localStorage.getItem("user") || "").id;
        console.log(imgData);

        createAd({
          variables: {
            input: {
              title: "title",
              user: userId,
              width: 500,
              height: 500,
              viewCount: 0,
              isPremium: false,
              json: "   ",
              adImage: imgData,
            },
          },
        });

        // setImageAsFile(img);
        // handleFireBaseUpload();
      };
    });
  };

  const handleChangeImage = (e: any) => {
    const newImage = e.target.files[0];
    const newUrl = URL.createObjectURL(newImage);
    if (!constraintsRef === null) {
      //@ts-ignore
      constraintsRef?.current?.style.backgroundImage = `url("${newUrl}")`;
    }
  };

  //inputRef
  const inputRef = useRef(null);
  const [dataImg, setDataImg] = useState("");
  const [imageAsFile, setImageAsFile] = useState(null);
  const [imageIsLoading, setImageIsLoading] = useState(false);
  const [hikes , setHikes] = useState([]);


  useEffect(() => {
    var myHeaders = new Headers();
myHeaders.append("Authorization", "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNmY1MTBhMDUyMTE0MDAxNmQ0Y2EzOSIsImVtYWlsIjoid2FsaWRtb3VsdGFtaXNAZ21haWwuY29tIiwiaWF0IjoxNjU1MjI1MTY4LCJleHAiOjE2ODY3NjExNjh9.qLOJ6JQoelmljTZ_3DMj_deeoSmBJreR2x1Bd-I0iO8");
myHeaders.append("Content-Type", "application/json");

var graphql = JSON.stringify({
  query: "query Hikes {\r\n  hikes {\r\n    id\r\n    name\r\n    image {\r\n      src\r\n    }\r\n  }\r\n}",
  variables: {}
})
var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: graphql,
};

fetch("https://atlastrip-backend.herokuapp.com/allo", requestOptions)
  .then(response => response.json())
  .then(result => setHikes(result.data.hikes))
  .catch(error => console.log('error', error));
  }, []);


  const handleFireBaseUpload = () => {
    setImageIsLoading(true);

    if (!imageAsFile) {
      return alert("await image");
    } else {
      // @ts-ignore
      const storageRef = fireRef(
        storage,
        `/templates/${Math.floor(Math.random() * 100)}`
      );
      const uploadTask = uploadBytesResumable(storageRef, imageAsFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          return console.log(snapshot);
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            console.log(url);
            setTimeout(() => {
              setImageIsLoading(false);
            }, 1200);
          });
        }
      );
    }
  };

  return (
    <div className="flex gap-3 w-full pb-6">
       <div></div>
      <input type="checkbox" id="my-modal-5" className="modal-toggle" />
      <label htmlFor="my-modal-5" className="modal cursor-pointer w-screen h-screen z-50">
        <label className="modal-box relative max-h-[80vh]" htmlFor="">
          <h3 className="text-lg font-bold">
            Pick A hike to add to your ad
          </h3>
          <div className="py-4">
            {
              (hikes || []).map((hike , idx) => {
                return (
                  <div key={idx} className="flex bg-white rounded-lg items-center shadow-lg my-3 p-2 gap-4">
                    <input type="radio" name="radio-4" className="radio radio-accent shadow-md" />
                    <img src={`https://atlastrip-backend.herokuapp.com/media/${hike?.image[0]?.src}`} className="w-10 h-10 outline-none rounded-full " />
                    <p className="text-center text-lg font-bold">{hike?.name || ''}</p>
                  </div>
                )
              })
            }
            
          </div>
        </label>
      </label>
      <motion.ul
        variants={container}
        className="p-4 gap-4 overflow-y-scroll max-h-[90vh] w-60 flex flex-wrap carousel carousel-center bg-gray-50 rounded-box"
        initial="hidden"
        animate="visible"
      >
        <h1 className="title font-bold text-2xl mb-4">Components</h1>
        <div className="flex gap-3">
          <input
            value={containerWidth}
            type="number"
            className="shadow w-1/2  appearance-none border rounded  py-0 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setContainerWidth(+e.target.value)}
          />
          <input
            type="number"
            className="shadow w-1/2  appearance-none border rounded  py-0 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={containerHeight}
            onChange={(e) => setContainerHeight(+e.target.value)}
          />
        </div>
        <div className="flex gap-3 w-full">
          {[
            {
              width: 500,
              height: 500,
            },
            {
              width: 837,
              height: 500,
            },
            {
              width: 380,
              height: 505,
            },
          ].map((_, i) => (
            <div
              onClick={() => {
                setContainerWidth(_.width);
                setContainerHeight(_.height);
              }}
              key={i}
              className="p-3 w-full flex justify-center items-center rounded hover:bg-blue-500 hover:text-white transition-all cursor-pointer bg-blue-200"
            >
              {+i + 1}
            </div>
          ))}
        </div>
        {components.map((component, index) => (
          <motion.li
            key={index}
            className="carousel-item h-fit cursor-pointer"
            variants={item}
          >
            <motion.div
              onClick={() => AddComponent(component)}
              className="w-24 h-24 rounded-lg bg-white shadow-md flex flex-col justify-center items-center hover:scale-105 transition-all"
            >
              {component}
            </motion.div>
          </motion.li>
        ))}
      </motion.ul>

      <button
        className="absolute top-24 right-6 p-4 rounded-lg bg-blue-800 text-white"
        onClick={() => handleDownloadImage()}
      >
        Export
      </button>
      <label htmlFor="my-modal-5" className="absolute cursor-pointer top-40 right-6 p-4 rounded-lg bg-purple-800 text-white">
        Save template
      </label>

      <motion.div
        ref={ref}
        className="p-5 flex-1 flex justify-center items-center h-full"
      >
        <div className="p-3 bg-slate-50 shadow-2xl rounded-md">
          <div className="flex mb-3 gap-3">
            <div className="p-5 rounded bg-slate-300"></div>
            <div className="">
              <div className="p-1 w-20 mb-2 rounded bg-slate-500"></div>
              <div className="p-1 w-18 mb-2 rounded bg-slate-300"></div>
              <div className="p-1 w-14 rounded bg-slate-300"></div>
            </div>
          </div>
          <div className="w-full mb-2 flex gap-3 justify-start">
            {Array(8)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: Math.floor(Math.random() * (50 - 10 + 1)) + 10,
                  }}
                  className="p-1 mb-2 rounded bg-slate-500"
                />
              ))}
          </div>

          <motion.div
            transition={{ duration: 0.5 }}
            style={{
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: containerWidth,
              height: containerHeight,
            }}
            className="container transition-all relative item mask-square bg-white bg-center bg-cover"
            //@ts-ignore
            ref={constraintsRef}
          >
            {Components.map((component, index) => [component])}
          </motion.div>
        </div>
        <div className="px-1 h-full">
          <div className="relative">
            <IconButton
              onMouseEnter={() => {
                setMenuImage(true);
              }}
            >
              <WallpaperIcon />
            </IconButton>
            {menuImage && (
              <Box
                onMouseLeave={() => {
                  setMenuImage(false);
                }}
                className="absolute top-7 right-0 bg-slate-50 w-fit"
              >
                <List component="nav" aria-label="secondary mailbox folder">
                  <ListItemButton>
                    <ListItemText primary="Select color" />
                  </ListItemButton>
                  <ListItemButton
                    onClick={() => {
                      handleChangeImageComp(constraintsRef);
                    }}
                  >
                    <ListItemText primary="Upload image" />
                  </ListItemButton>
                  <ListItemButton
                    onClick={() => {
                      //@ts-ignore
                      constraintsRef?.current?.style?.backgroundImage = "";
                    }}
                  >
                    <ListItemText primary="Remove image" />
                  </ListItemButton>
                </List>
              </Box>
            )}
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleChangeImage}
          />
        </div>
      </motion.div>
      <AnimatePresence>
        {popupImages && (
          <ImagesHolder
            //@ts-ignore
            constraintsRef={divElement}
            setPopupImages={setPopupImages}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
