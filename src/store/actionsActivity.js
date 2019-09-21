import axios from 'axios';
import store from './store';
// import Swal from "sweetalert2";
// import { getThemeProps } from "@material-ui/styles";

const actionsActivity = (store) => ({

  setMyBrew(state, value) {
    return { MyBrew: value };
  },
  setHistory(state, value) {
    return { history: value };
  },
  async getHistory(state, paramsInput) {
    const config = {
      method: 'get',
      url: `${store.getState().baseURL}/history`,
      params: paramsInput,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    };
    await axios(config)
      .then((response) => {
        store.setState({ history: response.data });
      })
      .catch((error) => {
        /* eslint-disable no-console */
        console.log('Error getHistory', error);
      });
  },
  async getMyBrew(state, paramsInput) {
    const config = {
      method: 'get',
      url: `${store.getState().baseURL}/recipes/user`,
      params: paramsInput,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    };
    await axios(config)
      .then((response) => {
        store.setState({ myBrew: response.data });
      })
      .catch((error) => {
        console.log('Error getMyBrew', error);
        /* eslint-enable no-console */
      });
  },

});

export default actionsActivity;
