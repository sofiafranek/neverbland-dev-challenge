import axios from 'axios';

const getShows = () =>
  new Promise((resolve, reject) => {
    axios
      .get('https://api.tvmaze.com/shows')
      .then((result) => {
        const shows = result.data;
        resolve(shows);
      })
      .catch(reject);
  });

export { getShows };
