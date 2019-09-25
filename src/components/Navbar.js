import React from 'react';
import { connect } from 'unistore/react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import {
  CoffeeMaker,
  Seed,
  Magnify,
  StarCircle,
  HumanGreeting,
  Login,
} from 'mdi-material-ui';
import { Link } from 'react-router-dom';
import actionsUsers from '../store/actionUsers';

const useStyles = makeStyles({
  root: {
    color: 'green',
    '&$selected': {
      color: 'red',
    },
    activeColor: 'blue',
    inactiveColor: 'white',
    width: '100%',
    maxWidth: '480px',
    position: 'fixed',
    bottom: '0',
    textSlign: 'center',
    marginLeft: '-15px',
    backgroundColor: '#f2f2f2',
    zIndex: '999',
    height: '60px',
    boxShadow: '0 -.2rem .3rem rgba(0,0,0,.15)',
  },
});

const Navbar = (props) => {
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
      {sessionStorage.getItem('token') !== null ? (
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
  'login',
  actionsUsers,
)(Navbar);
