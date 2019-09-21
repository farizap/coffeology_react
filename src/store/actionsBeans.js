import axios from 'axios';
import store from './store';

const actionsBeans = (store) => ({
  async getBeans(state) {
    const config = {
      method: 'get',
      url: `${store.getState().baseURL}/beans`,
    };
    await axios(config)
      .then((response) => {
        /* eslint-disable no-console */
        store.setState({ beans: response.data.data });
      })
      .catch((error) => console.log('Error getBeans', error));
  },
  async getBeanById(state, data) {
    const config = {
      method: 'get',
      url: `${store.getState().baseURL}/beans/${data}`,
    };
    await axios(config)
      .then((response) => {
        store.setState({ bean: response.data.data });
      })
      .catch((error) => {
        console.log('Error getBeanById', error);
        /* eslint-enable no-console */
      });
  },
});

export default actionsBeans;
