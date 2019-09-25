import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';

// import material-ui
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { HumanHandsup } from 'mdi-material-ui';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

// import store
import { connect } from 'unistore/react';
import Swal from 'sweetalert2';
import actionsUsers from '../store/actionUsers';
import useStyles from '../store/style';

// Sign in form component
const SignInForm = (props) => {
	const classes = useStyles();

	// create state
	const [values, setValues] = React.useState({
		showPassword: false
	});

	// defining props
	const {
		values: { email, password },
		errors,
		touched,
		handleSubmit,
		handleChange,
		isValid,
		setFieldTouched
	} = props;

	// handle change in input form
	const change = (name, e) => {
		e.persist();
		handleChange(e);
		setFieldTouched(name, true, false);
	};

	// handle show/hide password form
	const handleClickShowPassword = () => {
		setValues({ ...values, showPassword: !values.showPassword });
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	return (
		<form className={classes.form} onSubmit={handleSubmit}>
			<TextField
				required
				variant="outlined"
				margin="normal"
				fullWidth
				id="email"
				label="Email Address"
				name="email"
				value={email}
				autoComplete="email"
				onChange={change.bind(null, 'email')}
				helperText={touched.email ? errors.email : ''}
				error={touched.email && Boolean(errors.email)}
				autoFocus
			/>{' '}
			<TextField
				required
				variant="outlined"
				margin="normal"
				fullWidth
				name="password"
				value={password}
				label="Password"
				id="password"
				type={values.showPassword ? 'text' : 'password'}
				onChange={change.bind(null, 'password')}
				error={touched.password && Boolean(errors.password)}
				helperText={touched.password ? errors.password : ''}
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							<IconButton
								aria-label="toggle password visibility"
								onClick={handleClickShowPassword}
								onMouseDown={handleMouseDownPassword}
							>
								{values.showPassword ? <Visibility /> : <VisibilityOff />}
							</IconButton>
						</InputAdornment>
					)
				}}
			/>
			<Button
				fullWidth
				variant="contained"
				color="primary"
				className={classes.submit}
				type="submit"
				disable={!isValid}
			>
				Sign In
			</Button>
			<Grid container className="justify-content-center">
				<Grid item>
					------------ ATAU ------------
					<br />
					{/* <Link to="/register">Don't have an account? Sign Up</Link> */}
				</Grid>
			</Grid>
		</form>
	);
};

// schema validation created with yup
const validationSchema = Yup.object({
	email: Yup.string('Masukan Email Anda')
		.email('Email tidak valid')
		.required('Email tidak boleh kosong'),
	password: Yup.string('')
		.min(6, 'Gunakan huruf besar, huruf kecil dan angka. Minimal 6 karakter.')
		.matches(
			/^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])[\w\d]{6,30}$/,
			'Gunakan huruf besar, huruf kecil dan angka. Minimal 6 karakter.'
		)
		.required('Password tidak boleh kosong')
});

const SignIn = (props) => {
	const classes = useStyles();

	// store data from email and password
	const dataSignIn = {
		email: '',
		password: ''
	};

	// create alert
	const Toast = Swal.mixin({
		toast: true,
		position: 'center',
		showConfirmButton: false,
		timer: 2000
	});

	// handle submit form, if data is valid, post to get token
	const handleOnSubmit = async (dataSignIn) => {
		await props.login(dataSignIn);

		// check login success, if true redirect to home
		setTimeout(() => {
			if (sessionStorage.getItem('token')) {
				Toast.fire({
					type: 'success',
					title: 'Sukses Login!'
				});
				setTimeout(() => {
					props.history.goBack();
				}, 200);
			}
		}, 500);
	};

	return (
		<div>
			{sessionStorage.getItem('token') ? <Redirect to="/" /> : <div />}
			<img
				className="backbutton "
				src={props.backButton}
				onClick={(event) => props.history.goBack()}
				alt="backButton"
			/>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<HumanHandsup />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign in
					</Typography>
					<Formik
						initialValues={dataSignIn}
						onSubmit={handleOnSubmit}
						validationSchema={validationSchema}
						render={(props) => <SignInForm {...props} />}
					/>

					<Link to="/register">
						<Button fullWidth variant="contained" color="primary" className={classes.submit}>
							Sign Up
						</Button>
					</Link>
				</div>
			</Container>
		</div>
	);
};

export default connect(
	'backButton',
	actionsUsers
)(SignIn);
