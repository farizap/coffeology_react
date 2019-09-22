import React from 'react';
import { Link } from 'react-router-dom';
//

// import store
import { connect } from 'unistore/react';

// import material-ui
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Tune';
import SearchIcon from '@material-ui/icons/Search';

import Pagination from 'react-bootstrap/Pagination';
import actionsRecipes from '../store/actionsRecipes';
import RecipeCard from '../components/RecipeCard';
import Filter from '../components/Filter';
import loading from '../assets/images/loading.gif';

const _ = require('lodash');

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
    maxWidth: '480px',
  },
});

const useStylesSearch = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const Search = (props) => {
  const classes = useStyles();
  const classesSearch = useStylesSearch();

  const [state, setState] = React.useState({
    bottom: false,
    pagination: 1,
  });

  // function that toogle visibility status of drawer that contain filter
  const toggleDrawer = (side, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ bottom: open });
  };

  // return drawer that contain filter
  const fullList = (side) => (
    <div className={classes.fullList} role="presentation">
      <Filter onClick={toggleDrawer('bottom', false)} />
    </div>
  );

  // run when search form submitted
  const onSubmitSearch = (event) => {
    event.preventDefault();
    // get recipes with params from search preferences
    props.searchRecipes(
      props.searchParams,
      props.searchKeyword,
      state.pagination,
    );
  };

  // handle on change search form
  const onChangeSearch = (event) => {
    event.preventDefault();
    props.setSearchKeyword(event.target.value);
  };

  // searchRecipes if searchParams or pagination change
  React.useEffect(() => {
    props.searchRecipes(
      props.searchParams,
      props.searchKeyword,
      state.pagination,
    );

    // willUnmount, reset props from store
    return () => {
      props.setRecipesSearch(null);
    };
  }, [props.searchParams, state.pagination]);

  // convert input in seconds to string with format 'minute:seconds
  const convertSeconds = (secondsInput) => {
    let minutes = Math.floor(parseInt(secondsInput) / 60);
    let seconds = parseInt(secondsInput) - minutes * 60;
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    return `${minutes}:${seconds}`;
  };

  // handle change page button
  const handlePreviousPageButton = (event) => {
    event.preventDefault();
    setState({ pagination: state.pagination - 1 });
  };
  const handleNextPageButton = (event) => {
    event.preventDefault();
    setState({ ...state, pagination: state.pagination + 1 });
  };

  return (
    <div>
      <form onSubmit={onSubmitSearch}>
        <Paper className={classesSearch.root}>
          <IconButton className={classesSearch.iconButton} aria-label="menu">
            <MenuIcon onClick={toggleDrawer('bottom', true)} />
          </IconButton>
          <Divider className={classesSearch.divider} orientation="vertical" />
          <InputBase
            className={classesSearch.input}
            placeholder="Cari Nama Guides atau Nama Biji Kopi"
            inputProps={{ 'aria-label': 'search google maps' }}
            onChange={onChangeSearch}
          />
          <IconButton
            className={classesSearch.iconButton}
            aria-label="search"
            type="submit"
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </form>
      {props.recipesSearch === null ? (
        <img src={loading} alt="loading" />
      ) : _.isEmpty(props.recipesSearch.recipes) ? (
        <h5>Maaf, Resep yang anda cari tidak ada</h5>
      ) : (
        props.recipesSearch.recipes.map((value) => (
          <div className="col-12">
            <Link to={`/recipe/${value.id}`}>
              <RecipeCard
                data={value}
                method={props.methods[value.methodID - 1]}
                time={convertSeconds(value.time)}
              />
            </Link>
          </div>
        ))
      )}
      <br />
      {!_.isEmpty(props.recipesSearch) ? (
        <Pagination size="lg" className="justify-content-between">
          {props.recipesSearch.pageNow === 1 ? (
            <span />
          ) : (
            <div className="text-center">
              <Pagination.First onClick={handlePreviousPageButton} />
            </div>
          )}
          {props.recipesSearch.pageNow === props.recipesSearch.pageTotal ? (
            <span />
          ) : (
            <div className="text-center">
              <Pagination.Last onClick={handleNextPageButton} />
            </div>
          )}
        </Pagination>
      ) : (
        <div />
      )}

      <SwipeableDrawer
        anchor="bottom"
        open={state.bottom}
        onClose={toggleDrawer('bottom', false)}
        onOpen={toggleDrawer('bottom', true)}
      >
        {fullList('bottom')}
      </SwipeableDrawer>
    </div>
  );
};

export default connect(
  'searchParams,searchKeyword,recipesSearch,methods',
  actionsRecipes,
)(Search);
