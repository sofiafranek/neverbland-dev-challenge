import axios from 'axios';

const singleShow = (showId) =>
  new Promise((resolve, reject) => {
    axios
      .get(`https://api.tvmaze.com/shows/${showId}?embed[]=seasons&embed[]=cast`)
      .then((result) => {
        const shows = result.data;
        resolve(shows);
      })
      .catch(reject);
  });

export { singleShow };
