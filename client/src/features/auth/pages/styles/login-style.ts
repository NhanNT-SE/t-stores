import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  fromContainer: {
    overflow: "auto",
    display: "grid",
    backgroundColor: "#fff",
    padding: theme.spacing(2, 4),
    width: "60%",
    height: "70%",
    gridTemplateRows: "1fr auto",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateAreas: '"image form" "register login"',
  },
  form: {
    gridArea: "form",
  },
  image: {
    gridArea: "image",
    overflow: "hidden",
    "& img": {
      objectFit: "contain",
      width: "100%",
      height: "100%",
    },
  },
  register: {
    gridArea: "register",
    display: "flex",
    alignItems: "center",
    justifyContent:"center",
   
  },
  login: {
    display:"flex",
    alignItems:'center',
    gridArea: "login",
  },
  button: {
    minWidth: "fit-content",
    padding: theme.spacing(1),
    margin: theme.spacing(0, 1),
    "&.facebook": {
      backgroundColor: "#3b5998",
    },
    "&.twitter": {
      backgroundColor: "#1da0f2",
    },
    "&.linkedIn": {
      backgroundColor: "#0a66c2",
    },
    "& span": {
      color: "white",
    },
  },
}));
export { useStyles as loginStyle };
