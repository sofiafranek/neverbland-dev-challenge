import axios from 'axios';

const getImages = (showId) =>
  new Promise((resolve, reject) => {
    axios
      .get(`http://api.tvmaze.com/shows/${showId}/images`)
      .then((result) => {
        const images = result.data;
        resolve(images);
      })
      .catch(reject);
  });

export { getImages };
