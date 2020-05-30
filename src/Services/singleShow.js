import axios from 'axios';

const singleShow = (showId) =>
  new Promise((resolve, reject) => {
    axios
      .get(`https://api.tvmaze.com/shows/${showId}?embed[]=seasons&embed[]=cast`)
      .then((result) => {
        const beers = result.data;
        resolve(beers);
      })
      .catch(reject);
  });

export { singleShow };
