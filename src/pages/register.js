import React, { useState, useEffect, useRef } from 'react';

import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { HumanHandsup } from 'mdi-material-ui';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { Formik } from 'formik';
import * as Yup from 'yup';

// import store
import { connect } from 'unistore/react';
import Swal from 'sweetalert2';
import actionsUsers from '../store/actionUsers';
import useStyles from '../store/style';

import RegisterForm from '../components/RegisterForm';

// import alert

// validation schema with Yup module
const validationSchema = Yup.object({
  name: Yup.string('Masukan nama anda')
    .matches(/^[A-Za-z\s]+$/, 'Nama hanya boleh huruf')
    .required('Nama tidak boleh kosong'),
  email: Yup.string('Masukan Email Anda')
    .email('Email tidak valid')
    .required('Email tidak boleh kosong'),
  password: Yup.string('')
    .min(
      6,
      'Gunakan huruf besar, huruf kecil dan angka. Minimal 6 karakter.',
    )
    .matches(
      /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])[\w\d]{6,30}$/,
      'Gunakan huruf besar, huruf kecil dan angka. Minimal 6 karakter.',
    )
    .required('Password tidak boleh kosong'),
});

const Register = (props) => {
  const classes = useStyles();

  // store data from form
  const dataRegister = {
    email: '',
    password: '',
    name: '',
  };

  // handle on submit form
  const handleOnSubmit = async (dataRegister) => {
    // POST dataRegister to register endpoint
    await props.registerUser(dataRegister);
  };

  useEffect(() => {
    if (props.statusRegister !== null) {
      Toast.fire({
        type: 'success',
        title: 'Sukses Registrasi!',
      });
      setTimeout(() => {
        props.history.push('/');
      }, 500);

      return () => {
        props.setStatusRegister(null);
      };
    }
  }, props.statusRegister);

  // create alert
  const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 2000,
  });

  return (
    <div>
      <img
        className="backbutton "
        src={props.backButton}
        onClick={(event) => props.history.push('/login')}
      />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <HumanHandsup />
          </Avatar>
          <Typography component="h1" variant="h5">
                        Register
          </Typography>
          <Formik
            initialValues={dataRegister}
            onSubmit={handleOnSubmit}
            validationSchema={validationSchema}
            render={(props) => <RegisterForm {...props} />}
          />
        </div>
      </Container>
    </div>
  );
};

export default connect(
  'statusRegister, backButton',
  actionsUsers,
)(Register);
