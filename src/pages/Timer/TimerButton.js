import React from 'react';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';

import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles((theme) => ({
  start: {
    // margin: theme.spacing(1)
    backgroundColor: '#53686B',
    '&:hover': {
      backgroundColor: '#53686B',
    },
  },

  pause: {
    backgroundColor: '#ff0015',
    '&:hover': {
      backgroundColor: '#ff0015',
    },
  },

  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

function TimerButton(props) {
  // component that contain play/pause button that can stop timer

  const classes = useStyles();
  return !props.isRunning ? (
    <Fab
      color="primary"
      aria-label="add"
      className={classes.start}
      onClick={props.onClick}
    >
      <PlayArrowIcon />
    </Fab>
  ) : (
    <Fab
      color="primary"
      aria-label="add"
      className={classes.pause}
      onClick={props.onClick}
    >
      <PauseIcon />
    </Fab>
  );
}

export default TimerButton;
