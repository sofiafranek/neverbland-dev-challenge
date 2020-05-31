import axios from 'axios';

const getPerson = (personID) =>
  new Promise((resolve, reject) => {
    axios
      .get(`https://api.tvmaze.com/people/${personID}`)
      .then((result) => {
        const person = result.data;
        resolve(person);
      })
      .catch(reject);
  });

export { getPerson };
