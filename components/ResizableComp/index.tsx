import React, { useState, FC } from "react";
import { Resizable } from "re-resizable";

type Props = {
  children: React.ReactNode;
  setDraggable: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ResizableComp: FC<Props> = ({ children, setDraggable }) => {
  const [state, setState] = useState({ width: 320, height: 200 });
  const [isHover  , setIsHover] = useState(false);
  return (
    <Resizable
      className="hover:shadow-lg hover:border-black border-2 border-transparent border-solid mask-square"
      size={{ width: state.width, height: state.height }}
      onResizeStart={() => {
        setDraggable(false);
      }}
      snapGap={10}
      onResizeStop={(e, direction, ref, d) => {
        setState({
          width: state.width + d.width,
          height: state.height + d.height,
        });
        setDraggable(true);
      }}
    >
      {children}
    </Resizable>
  );
};
