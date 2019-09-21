import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
// import { DisplayFormikState } from './formikHelper';

const contactFormEndpoint = process.env.REACT_APP_CONTACT_ENDPOINT;
const userSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required('Required'),
  name: Yup.string().required('Required'),
  comment: Yup.string().required('Required'),
});
function Contact(props) {
  return <div />;
}
export default Contact;
