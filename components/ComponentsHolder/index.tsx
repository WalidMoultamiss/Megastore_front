import React, { useEffect, useState, useRef, useCallback, FC } from "react";
import { AnimatePresence, motion, Target } from "framer-motion";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import { toJpeg, toPng } from "html-to-image";
import DeleteIcon from "@mui/icons-material/Delete";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import { IconButton, List, ListItemButton, ListItemText } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box } from "@mui/system";
import html2canvas from "html2canvas";
import { ImagesHolder } from "../ImagesHolder";
import { SingleComponent } from "../SingleComponent";
import { toPixelData } from "html-to-image";
import { PrimaryBtn } from "../PrimaryBtn";

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

export const ImageComp = ({
  imageComp,
  handleChangeImageComp,
  setPopupImages,
  constraintsRef,
}) => {
  const imgCompRef = useRef(null);

  return (
    <div
      onClick={() => {
        handleChangeImageComp(imgCompRef);
      }}
      ref={imgCompRef}
      style={{
        backgroundImage: `url("https://source.unsplash.com/random")`,
        backgroundSize: "90%",
        backgroundRepeat: "no-repeat",
      }}
      className="w-full h-full bg-cover bg-center "
    ></div>
  );
};

type Props = {
  setScale: React.Dispatch<React.SetStateAction<number>>;
  setDeleteComponent: React.Dispatch<React.SetStateAction<boolean>>;
  scale: number;
  children: React.ReactNode;
  id: number;
  Type: string;
  setPopupImages: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ComponentsHolder: FC<Props> = ({ children, setScale, scale }) => {
  const components = [
    "Text",
    "Button",
    "Icon",
    "Card",
    "List",
    "Image",
    "QrCode",
    "Html",
  ];
  const constraintsRef = useRef<React.MutableRefObject<HTMLDivElement>>(true);
  const [divElement, setDivElement] = useState<HTMLDivElement>(null);

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
  const [componentsTree , setComponentsTree] = useState([]);
  

  useEffect(() => {
    console.log(componentsTree);
  }, [componentsTree]);

  const setNewXY = (e , id) => {
    const { x, y } = e.target.getBoundingClientRect();
    const newX = e.pageX - x-5;
    const newY = e.pageY - y-13;
    
    console.log(componentsTree[0] , id);
    
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
    setComponentsTree(ComponentsTree => [...ComponentsTree, {
      id: Components.length,
      Type: Type,
      children: [],
      x: 0,
      y: 0,
      }]);
    setComponents([
      ...Components,
      //@ts-ignore
      <SingleComponent
      setNewXY={setNewXY}
        key={Components.length}
        Components={Components}
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

  const handleDownloadImage = () => {
    
    html2canvas(constraintsRef.current,{ allowTaint: true, useCORS: true, logging: true }).then((canvas) => {
      const imgData = canvas.toDataURL("image/jpeg",1.0 );
      const img = new Image();
      img.src = imgData;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0);
        const imgData = canvas.toDataURL("image/jpeg",1.0 );
        const a = document.createElement("a");
        a.href = imgData;
        a.download = "image.jpeg";
        a.click();
      };
    });
  };

  
  
  



  const handleChangeImage = (e: any) => {
    const newImage = e.target.files[0];
    const newUrl = URL.createObjectURL(newImage);
    if (!constraintsRef === null) {
      constraintsRef?.current?.style.backgroundImage = `url("${newUrl}")`;
    }
  };

  //inputRef
  const inputRef = useRef(null);
  const [dataImg , setDataImg] = useState("");

  return (
    <div className="flex gap-3 w-full pb-6">
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
      <PrimaryBtn
        className="absolute top-40 right-6 p-4 rounded-lg bg-purple-800 text-white" 
      >
        Save template
      </PrimaryBtn>

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
            constraintsRef={divElement}
            setPopupImages={setPopupImages}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
