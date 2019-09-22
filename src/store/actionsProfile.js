import axios from 'axios';
import Swal from 'sweetalert2';

// eslint-disable-next-line
import store from './store';

const Toast = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 2000,
});

const actionsProfile = (store) => ({
  // setter login state
  setLogin(state) {
    return { login: store.getState().login + 1 };
  },
  // for page other user
  setDataUser(state, value) {
    return { user: value };
  },
  // setter dataUserBrew state
  setDataUserBrew(state, value) {
    return { userBrew: value };
  },
  // user me or profile
  setDataUserMe(state, value) {
    return { userMe: value };
  },
  // setter profileView state
  setProfileView(state, value) {
    return { profileView: value };
  },
  // setter to reset changePasswordStatus state
  resetChangePasswordStatus(state) {
    return { changePasswordStatus: false };
  },
  // setter to reset editProfileStatus state
  resetEditProfileStatus(state) {
    return { editProfileStatus: false };
  },
  // make request with axios to get user data
  async getProfile(state) {
    const config = {
      method: 'get',
      url: `${store.getState().baseURL}/users/me`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    };
    await axios(config)
      .then((response) => {
        store.setState({ userMe: response.data.data });
      })
      .catch((error) => {
        store.setState({ userMe: false });
        console.log(error);
      });
  },
  // make request with axios to put user data
  async editProfile(state, data) {
    const config = {
      method: 'put',
      url: `${store.getState().baseURL}/users`,
      data,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    };
    await axios(config)
      .then((response) => {
        store.setState({ userMe: response.data.data });
        store.setState({ editProfileStatus: true });
        Toast.fire({
          type: 'success',
          title: 'Profil Berhasil Diperbarui',
        });
      })
      .catch((error) => {
        Toast.fire({
          type: 'error',
          title: `${error.response.data.message}`,
        });
      });
  },
  // make request with axios to put user password data
  async editPassword(state, data) {
    const config = {
      method: 'put',
      url: `${store.getState().baseURL}/users`,
      data,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    };
    await axios(config)
      .then((response) => {
        store.setState({ changePasswordStatus: true });
        Toast.fire({
          type: 'success',
          title: 'Password Telah Diperbarui',
        });
      })
      .catch((error) => {
        Toast.fire({
          type: 'error',
          title: `${error.response.data.message}`,
        });
      });
  },
  // make request with axios to get token for login
  async login(state, data) {
    const config = {
      method: 'post',
      url: `${store.getState().baseURL}/token`,
      data,
    };
    await axios(config)
      .then((response) => {
        sessionStorage.setItem('token', response.data.token);
      })
      .catch((error) => {
        Toast.fire({
          type: 'error',
          title: error.response.data.message,
        });
      });
  },
  // make request with axios to get user data, for user profile
  async getProfileByID(state, data) {
    const config = {
      method: 'get',
      url: `${store.getState().baseURL}/users/${data}`,
    };
    await axios(config)
      .then((response) => {
        store.setState({ user: response.data.data });
      })
      .catch((error) => {
        store.setState({ user: false });
        console.log(error);
      });
  },
  // make request with axios to get recipe of user by userID
  async getUserBrew(state, data) {
    const config = {
      method: 'get',
      url: `${store.getState().baseURL}/recipes?userID=${data}`,
    };
    await axios(config)
      .then((response) => {
        /* eslint-disable no-console */
        store.setState({ userBrew: response.data.recipes });
      })
      .catch((error) => {
        console.log('Error getMyBrew', error);
        /* eslint-enable no-console */
      });
  },
});

export default actionsProfile;
