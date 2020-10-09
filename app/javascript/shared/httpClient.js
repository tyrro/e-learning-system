import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';

let csrfToken;
const csrfTokenElement = document.getElementsByName('csrf-token')[0];
if (csrfTokenElement) {
  csrfToken = csrfTokenElement.content;
}

const myAxios = axios.create({
  withCredentials: false,
  headers: {
    'X-CSRF-Token': csrfToken,
  },
});

myAxios.defaults.transformResponse.push(data => {
  if (typeof data !== 'object' || data === null) {
    return data;
  }
  return camelcaseKeys(data, { deep: true });
});

export default myAxios;
