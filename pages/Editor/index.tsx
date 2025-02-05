import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DraftsIcon from "@mui/icons-material/Drafts";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import BuildIcon from "@mui/icons-material/Build";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import MapIcon from "@mui/icons-material/Map";
import HomeIcon from "@mui/icons-material/Home";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import { motion } from "framer-motion";
import { ComponentsHolder } from "@/components/index";

const drawerWidth = 240;
//@ts-ignore
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

//@ts-ignore
const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
  //@ts-ignore
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

//@ts-ignore
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
  //@ts-ignore
})(({ theme, open }: { open: boolean; theme: any }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Editor = () => {
  const theme = useTheme();
  const [show, setShow] = React.useState("livraison");
  const [userName, setUserName] = React.useState("");

  React.useEffect(() => {
    //@ts-ignore
    setUserName(JSON?.parse(localStorage?.getItem("user")).firstName || "");
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [scale, setScale] = React.useState(1);
  React.useEffect(() => {
    console.log(scale);
  }, [scale]);

  return (
    <Box sx={{ display: "flex" }}>
      {process.env.NODE_ENV !== "development" && (
        <div className="fixed top-0 left-0 w-screen h-screen z-[10000000] bg-white flex flex-col justify-center items-center text-3xl p-10 font-extrabold md:hidden">
          <span>Sorry this page is not available on mobile devices.</span>
          {/* back to home */}
          <Link passHref href="/">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="mt-6 bg-blue-500 text-white p-3 px-5 rounded-md"
            >
              Back to home
            </motion.div>
          </Link>
        </div>
      )}
      <CssBaseline />
      {/* //@ts-ignore */}
      <AppBar position="fixed" 
      //@ts-ignore - this is a hack to make the appbar not to be hidden by the drawer
      open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <div className="w-full px-3 flex justify-between">
            <Typography variant="h6" noWrap component="div">
              Atlastrip Ads Editor
            </Typography>
            <div className="bg-white text-blue-700 rounded-full w-10 h-10 flex justify-center items-center font-bold ">
              {userName[0]?.toUpperCase()}
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? null : <KeyboardArrowLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["dashboard", "Magic search", "Options"].map((text, index) => (
            <Link key={index} passHref href={`/${text}`}>
              <ListItem
                onClick={() => {
                  handleDrawerClose();
                  setShow(text);
                }}
                button
                key={text}
              >
                <ListItemIcon>
                  {index == 1 ? (
                    <AutoFixHighIcon />
                  ) : index == 2 ? (
                    <BuildIcon />
                  ) : (
                    <HomeIcon />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <List>
          {["Premium", "Draft"].map((text, index) => (
            <Link key={text} passHref href={`/${text}`}>
              <ListItem
                onClick={() => {
                  handleDrawerClose();
                  setShow(text);
                }}
                button
              >
                <ListItemIcon>
                  {index % 2 === 0 ? <WorkspacePremiumIcon /> : <DraftsIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <div className="max-w-[90vw] overflow-hidden hidden md:block">
          {/* //@ts-ignore */}
          <ComponentsHolder  />
        </div>
      </Box>
    </Box>
  );
};

export default Editor;
