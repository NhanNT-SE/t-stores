import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  fromContainer: {
    display: "grid",
    backgroundColor: "#fff",
    padding: theme.spacing(2, 4),
    width: "60%",
    height: "70%",
    gridTemplateRows: "1fr auto",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateAreas: '"image form" "login register"',
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
  },
  login: {
    gridArea: "login",
  },
}));
export { useStyles as loginStyle };
