import axios from 'axios';

const getEpisodes = (showId) =>
  new Promise((resolve, reject) => {
    axios
      .get(`http://api.tvmaze.com/shows/${showId}/episodes`)
      .then((result) => {
        const episodes = result.data;
        resolve(episodes);
      })
      .catch(reject);
  });

export { getEpisodes };
