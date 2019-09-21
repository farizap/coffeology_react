import axios from 'axios';
import Swal from 'sweetalert2';
import store from './store';

const Toast = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 2000,
});

const actionsProfile = (store) => ({
  setLogin(state) {
    return { login: store.getState().login + 1 };
  },
  // for page other user
  setDataUser(state, value) {
    return { user: value };
  },
  setDataUserBrew(state, value) {
    return { userBrew: value };
  },
  // user me or profile
  setDataUserMe(state, value) {
    return { userMe: value };
  },
  setProfileView(state, value) {
    return { profileView: value };
  },
  resetChangePasswordStatus(state) {
    return { changePasswordStatus: false };
  },
  resetEditProfileStatus(state) {
    return { editProfileStatus: false };
  },


  // axios for profile me
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
      });
  },
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

  // other user
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
      });
  },
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
