import { makeStyles } from "@material-ui/core/styles";
import { deepPurple, lightBlue } from "@material-ui/core/colors";

export default makeStyles((theme) => ({
  appBar: {
    "& .MuiAppBar-root": {
      flexDirection: "row",
    },
    borderRadius: 15,
    margin: "30px 0",
    display: "flex",
    flexDirection: "row" + "!important",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 50px",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  heading: {
    color: "rgba(0,0,0)",
    textDecoration: "none",
    fontWeight: "Bold",
    transition: "0.5s ease",
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
  image: {
    marginLeft: "15px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "flex-end",
    width: "400px",
    [theme.breakpoints.down("sm")]: {
      width: "auto",
    },
  },
  profile: {
    display: "flex",
    justifyContent: "space-between",
    width: "400px",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      width: "auto",
      marginTop: 20,
      justifyContent: "center",
    },
  },
  logout: {
    marginLeft: "20px",
  },
  userName: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
  },
  brandContainer: {
    display: "flex",
    alignItems: "center",
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));
