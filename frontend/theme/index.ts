import { extendTheme } from "@chakra-ui/react";
import HStack from "./components/HStack";
import Button from "./components/Button";
import Progress from "./components/Progress";
import Modal from "./components/Modal";

export const theme = extendTheme({
  components: {
    HStack,
    Button,
    Progress,
    Modal,
  },
  colors: {
    transparent: "transparent",
    blackDark: "rgba(10, 10, 10, 0.960784)",
    blackLight: "#2b2c34",
    blackLighter: "#16161a",
    greyLight: "#a7a9be",
    greyDark: "#4a4a4a",
    white: "#fffffe",
    purple: "#822EA6",
    purpleLight: "#B66AD6",
    red: "#ff3864",
    "red.50": "#FFF5F5",
    "red.100": "#FED7D7",
    "red.200": "#FEB2B2",
    "red.300": "#FC8181",
    "red.400": "#F56565",
    "red.500": "#E53E3E",
    "red.600": "#C53030",
    "red.700": "#9B2C2C",
    "red.800": "#822727",
    "red.900": "#63171B",
    yellow: "#F2E857",
    yellowDark: "#DCCF11",
    gradient1:
      "linear-gradient(94.89deg, #f78040 0%, #dd459b 70.2%, #ad3bad 100%)",
    gradientSBTPrev:
      "linear-gradient(90deg, #290009 -0.56%, #060606 82.19%, #25003A 100%)",
  },
  fonts: {
    texturina: `'Texturina', serif`,
    jetbrains: `'JetBrains Mono', monospace`,
    rubik: `'Rubik Mono One', sans-serif`,
    uncial: `'Uncial Antiqua', cursive`,
    spaceMono: `'Space Mono', monospace;`,
  },
  styles: {
    global: {
      html: {
        scrollBehavior: "smooth",
      },
      body: {
        m: 0,
        p: 0,
        boxSizing: "border-box",
        overflowY: "overlay",
      },
      "&::-webkit-scrollbar": {
        width: "10px",
        bg: "transparent",
      },
      "&::-webkit-scrollbar-thumb": {
        background: "#ff3864",
        borderRadius: "5px",
      },
      "&::-webkit-scrollbar-thumb:hover": {
        background: "#e4728b",
      },
    },
  },
});
