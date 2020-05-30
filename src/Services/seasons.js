import axios from 'axios';

const getSeasons = (showId) =>
  new Promise((resolve, reject) => {
    axios
      .get(`https://api.tvmaze.com/shows/${showId}/seasons`)
      .then((result) => {
        const seasons = result.data;
        resolve(seasons);
      })
      .catch(reject);
  });

export { getSeasons };
