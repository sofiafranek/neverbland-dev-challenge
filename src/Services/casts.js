import axios from 'axios';

const getCasts = (showId) =>
  new Promise((resolve, reject) => {
    axios
      .get(`http://api.tvmaze.com/shows/${showId}/cast`)
      .then((result) => {
        const beers = result.data;
        resolve(beers);
      })
      .catch(reject);
  });

export { getCasts };
