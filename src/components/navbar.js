// import React from "react";
// import { Link } from "react-router-dom";
// // import navbar image
// import navbarProfile from "../assets/images/navbarProfile.png";
// import navbarSearch from "../assets/images/navbarSearch.png";
// import navbarBeans from "../assets/images/navbarBeans.png";
// import navbarBrew from "../assets/images/navbarBrew.png";
// import navbarActivity from "../assets/images/navbarActivity.png";

// function navbar(props) {
//   return (
//     <div
//       className="container-fluid navbar py-2 px-3 fixed-bottom"
//       style={{ maxWidth: "480px" }}
//     >
//       <div className="row d-flex justify-content-around">
//         <div className="col-2 text-center px-0">
//           <Link to="/">
//             <img src={navbarBrew} className="navbarIcon w-50 py-1" />
//             <h6>Seduh</h6>
//           </Link>
//         </div>
//         <div className="col-2 text-center px-0">
//           <Link to="/login">
//             <img
//               src={navbarBeans}
//               className="navbarIcon w-50 py-1"
//               alt="alt tag"
//             />
//             <h6>Biji</h6>
//           </Link>
//         </div>
//         <div className="col-2 text-center px-0">
//           <Link to="/">
//             <img
//               src={navbarSearch}
//               className="navbarIcon w-50 py-1"
//               alt="alt tag"
//             />
//             <h6>Cari</h6>
//           </Link>
//         </div>
//         <div className="col-2 text-center px-0">
//           <Link to="/activity">
//             <img
//               src={navbarActivity}
//               className="navbarIcon w-50 py-1"
//               alt="alt tag"
//             />
//             <h6>Aktivitas</h6>
//           </Link>
//         </div>
//         <div className="col-2 text-center px-0">
//           <Link
//             onClick={e => {
//               sessionStorage.removeItem("token");
//             }}
//           >
//             <img
//               src={navbarProfile}
//               className="navbarIcon  w-50 py-1"
//               alt="alt tag"
//             />
//             <h6>Profile</h6>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default navbar;

import React from "react";
import { connect } from "unistore/react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import {
  CoffeeMaker,
  Seed,
  SeedOutline,
  Magnify,
  StarCircle,
  Flag,
  FlagVariant,
  FontAwesome,
  HumanGreeting,
  Face,
  HumanHandsup,
  Login
} from "mdi-material-ui";
import { Link } from "react-router-dom";
import actionsUsers from "../store/actionUsers";

const useStyles = makeStyles({
  root: {
    color: "green",
    "&$selected": {
      color: "red"
    },
    activeColor: "blue",
    inactiveColor: "white",
    width: "100%",
    maxWidth: "480px",
    position: "fixed",
    bottom: "0",
    textSlign: "center",
    marginLeft: "-15px",
    backgroundColor: "#f2f2f2",
    zIndex: "999",
    height: "60px",
    boxShadow: "0 -.2rem .3rem rgba(0,0,0,.15)"
  }
});

const SimpleBottomNavigation = props => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {}, [props.login]);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        component={Link}
        to="/"
        className={classes.content}
        label="Seduh"
        icon={<CoffeeMaker />}
      />
      <BottomNavigationAction
        component={Link}
        to="/beans"
        label="Biji"
        icon={<Seed />}
      />
      <BottomNavigationAction
        component={Link}
        to="/search"
        label="Cari"
        icon={<Magnify />}
      />
      <BottomNavigationAction
        component={Link}
        to="/activity"
        label="Aktifitas"
        icon={<StarCircle />}
      />
      {sessionStorage.getItem("token") !== null ? (
        <BottomNavigationAction
          component={Link}
          to="/profile/me"
          label="Profile"
          icon={<HumanGreeting />}
        />
      ) : (
        <BottomNavigationAction
          component={Link}
          to="/login"
          label="Masuk"
          icon={<Login />}
        />
      )}
    </BottomNavigation>
  );
};

export default connect(
  "login",
  actionsUsers
)(SimpleBottomNavigation);
