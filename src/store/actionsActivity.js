import axios from 'axios';
// eslint-disable-next-line
import store from './store';

const actionsActivity = (store) => ({
  // setter mybrew
  setMyBrew(state, value) {
    return { MyBrew: value };
  },
  // setter history
  setHistory(state, value) {
    return { history: value };
  },
  // make request with axios to get history data
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
  // make request with axios to get myBrew data
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
