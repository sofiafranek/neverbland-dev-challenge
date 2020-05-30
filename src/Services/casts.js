import axios from 'axios';

const getCasts = (showId) =>
  new Promise((resolve, reject) => {
    axios
      .get(`https://api.tvmaze.com/shows/${showId}/cast`)
      .then((result) => {
        const casts = result.data;
        resolve(casts);
      })
      .catch(reject);
  });

export { getCasts };
