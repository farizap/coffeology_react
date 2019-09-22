import { makeStyles } from '@material-ui/core/styles';

/* Store styling variable for material-ui */
const useStyles = makeStyles((theme) => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },

  // sign in and register page
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  // icon at sign in anda register
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },

  // sign in and register form
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },

  // sign in and register submit
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default useStyles;
