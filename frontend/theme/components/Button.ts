const Button = {
  baseStyles: {},

  variants: {
    solid: () => ({
      textTransform: "uppercase",
      maxWidth: "100%",
      width: "auto",
      // height: "40px",
      color: "black",
      borderRadius: "2px",
      background:
        "linear-gradient(94.89deg, #FF5A00 0%, #D62789 70.2%, #AD17AD 100%)",
      paddingLeft: "24px",
      paddingRight: "24px",
      _hover: {
        background:
          "linear-gradient(94.89deg, #f78040 0%, #dd459b 70.2%, #ad3bad 100%)",
      },
      _focus: {
        boxShadow: "none",
      },
    }),
    outline: () => ({
      textTransform: "uppercase",
      maxWidth: "100%",
      width: "auto",
      height: "40px",
      border: "2px solid",
      borderRadius: "3px",
      borderImageSlice: 1,
      borderImageSource:
        "linear-gradient(95.58deg, #FF3864 0%, #8B1DBA 53.65%, #4353DF 100%)",
      background:
        "linear-gradient(96.18deg, #FF3864 -44.29%, #8B1DBA 53.18%, #4353DF 150.65%);",
      color: { base: "whiteAlpha.700", md: "transparent" }, // added a media query to display RG red on mobile
      backgroundClip: "text",
      paddingLeft: "24px",
      paddingRight: "24px",
      transistion: "all .8s ease-out",
      _hover: {
        background:
          "linear-gradient(96.18deg, #e26f88 0%, #a15ebe 53.65%, #6c77db 100%)",
        backgroundClip: "text",
        color: { base: "white", md: "transparent" }, // added a media query to display RG red on mobile
      },
      _focus: {
        boxShadow: "none",
      },
    }),
    ghost: () => ({
      textTransform: "uppercase",
      maxWidth: "100%",
      width: "auto",
      height: "40px",
      color: "#8B1DBA",
      bg: "whiteAlpha.100",
      _focus: {
        boxShadow: "none",
      },
    }),
    red: () => ({
      textTransform: "uppercase",
      maxWidth: "100%",
      width: "auto",
      height: "40px",
      color: "red",
      border: "solid red 1px",
      rounded: "sm",
      bg: "whiteAlpha.100",
      _focus: {
        boxShadow: "none",
      },
    }),
  },
  sizes: {
    default: {
      height: "40px",
    },
    xxs: {
      height: "2em",
    },
  },
  defaultProps: {
    size: "default",
    variant: "solid",
    fontWeight: "400",
    fontFamily: "texturina",
  },
};

export default Button;
