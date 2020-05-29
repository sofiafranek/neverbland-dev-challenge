import axios from 'axios';

const getScheduledShow = () =>
  new Promise((resolve, reject) => {
    axios
      .get('http://api.tvmaze.com/schedule?country=US&date=2017-12-01')
      .then((result) => {
        const shows = result.data;
        resolve(shows);
      })
      .catch(reject);
  });

export { getScheduledShow };
