import axios from 'axios';
import Swal from 'sweetalert2';
// eslint-disable-next-line
import store from './store';

const Toast = Swal.mixin({
  toast: true,
  position: 'center',
  showConfirmButton: false,
  timer: 2000,
});

const ToastTop = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 2000,
});

const actionsUsers = (store) => ({
  // setter data
  // set user status
  setStatusRegister(state, value) {
    return { statusRegister: value };
  },

  // axios
  // login user
  login(state, data) {
    const config = {
      method: 'post',
      url: `${store.getState().baseURL}/token`,
      data,
    };
    axios(config)
      .then((response) => {
        sessionStorage.setItem('token', response.data.token);
        store.setState({ login: store.getState().login + 1 });
      })
      .catch((error) => {
        Toast.fire({
          type: 'error',
          title: error.response.data.message,
        });
      });
  },

  // register user
  registerUser(state, data) {
    data.photo = '';
    const config = {
      method: 'post',
      url: `${store.getState().baseURL}/users`,
      data,
    };
    axios(config)
      .then(async (response) => {
        const config = {
          method: 'post',
          url: `${store.getState().baseURL}/token`,
          data,
        };
        await axios(config)
          .then((response) => {
            sessionStorage.setItem('token', response.data.token);
            store.setState({ login: store.getState().login + 1 });
            store.setState({ statusRegister: true });
            /* eslint-disable no-console */
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        /* eslint-enable no-console */
        ToastTop.fire({
          type: 'error',
          title: error.response.data.message,
        });
      });
  },

  // logout user
  logout(state) {
    sessionStorage.removeItem('token');
  },
});

export default actionsUsers;
