import React, { useEffect, useState, useRef, useCallback, FC } from "react";
import { AnimatePresence, motion, Target } from "framer-motion";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, List, ListItemButton, ListItemText } from "@mui/material";
import { ImageComp } from "../ComponentsHolder";
import { QRCodeSVG } from "qrcode.react";
import { ResizableComp } from "../ResizableComp";

export const SingleComponent = ({
  // @ts-ignore
  setDeleteComponent,
  // @ts-ignore
  id,
  // @ts-ignore
  setNewXY,
  // @ts-ignore
  Type,
  // @ts-ignore
  setPopupImages,
  // @ts-ignore
  handleChangeImageComp,
  // @ts-ignore
  constraintsRef,
  // @ts-ignore
  Components,
}) => {
  const [componentHover, setComponentHover] = useState(false);
  const [scaleComp, setScaleComp] = useState(1);
  const [optionsScale, setOptionsScale] = useState(1);
  const [leftComp, setLeftComp] = useState(0);
  const [topComp, setTopComp] = useState(0);

  const [customTW, setCustomTW] = useState("tailwind here");

  const [open, setOpen] = React.useState(true);
  const [draggable, setDraggable] = useState(true);

  const options = [
    {
      title: "Resize",
      onClick: () => {},
    },
    {
      title: "Custom tailwind",
      onClick: () => {},
    },
  ];

  const imageComp = useRef(null);
  const currentCompRef = useRef();

  return (
    <motion.div
      //@ts-ignore
      ref={currentCompRef}
      style={{
        position: "absolute",
      }}
      key={Components.length}
      className={`item cursor-move w-fit `}
      drag={draggable}
      // onDrag={(e) => {
      //   setNewXY(e, id);
      // }}

      onDragEnd={(e) => {
        //@ts-ignore
        setNewXY(e, id);
      }}
      dragConstraints={constraintsRef}
      onHoverStart={() => setComponentHover(true)}
      onHoverEnd={() => setComponentHover(false)}
    >
      <ResizableComp setDraggable={setDraggable}>
        {Type === "Text" ? (
          <motion.div
            animate={{
              scale: scaleComp,
              rotate: 0,
            }}
            className={` ${customTW}`}
            contentEditable={true}
          >
            hello again we are here
          </motion.div>
        ) : Type === "Button" ? (
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            <span contentEditable={true}>Best button ever</span>
          </button>
        ) : Type === "Icon" ? (
          <IconButton>
            <SettingsSuggestIcon />
          </IconButton>
        ) : Type === "Card" ? (
          <div className="bg-white shadow-md rounded-lg p-4">
            <h1 className="text-2xl font-bold">Card</h1>
            <p className="text-gray-700 text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptates, quisquam.
            </p>
          </div>
        ) : Type === "List" ? (
          <List>
            <ListItemButton>
              <ListItemText primary="List Item" />
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="List Item" />
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="List Item" />
            </ListItemButton>
          </List>
        ) : Type === "Image" ? (
          <ImageComp
            handleChangeImageComp={handleChangeImageComp}
            //@ts-ignore
            imageComp={imageComp}
            setPopupImages={setPopupImages}
            customTW = {customTW}
          />
        ) : Type === "QrCode" ? (
          <div className={`object-cover object-center ${customTW}`}>
            <QRCodeSVG
              //@ts-ignore
              imageSettings={{
                src: "https://www.w3schools.com/w3images/avatar2.png",
                width: 20,
                height: 20,
              }}
              style={{
                width: "100%",
                height: "100%",
              }}
              value="https://reactjs.org/"
              size={100}
            />
          </div>
        ) :Type === "Rect" ? (
          <div className={`w-full h-full bg-black ${customTW}`} />
        ) : null}
      </ResizableComp>

      {componentHover ? (
        <div className="w-fit">
          <input
            type="text"
            id="tw"
            value={customTW}
            className="absolute w-fit rounded bg-cyan-50"
            onChange={(e) => {
              setCustomTW(e.target.value);
            }}
          />
          <label htmlFor="tw" className="w-fit">
            <SettingsSuggestIcon className="cursor-pointer absolute -top-4 -right-4 p-1 rounded-full bg-cyan-100 shadow-lg" />
          </label>
          <DeleteIcon
            onClick={() => {
              //@ts-ignore
              setDeleteComponent(id);
            }}
            sx={{ color: "red" }}
            className="cursor-pointer absolute -bottom-4 -left-4 p-1 rounded-full bg-cyan-100 shadow-lg"
          />
          {/* <div className="w-2 h-2 bg-red-600 rounded-full absolute right-5 top-[50%] bottom-[50%]"></div> */}
        </div>
      ) : null}
    </motion.div>
  );
};
