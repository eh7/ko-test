const axios = require('axios').default;

const site = "https://jsonplaceholder.typicode.com";

// Make a request for a user with a given ID
axios.get(site + '/posts')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
/*
*/

axios.get(site + '/users/1')
  .then(function (response) {
    // handle success
//    console.log(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
