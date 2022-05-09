const axios = require('axios').default;

const site = "https://jsonplaceholder.typicode.com";

const getPosts = async function () {
  return await axios.get(site + '/posts');
/*
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
*/
}
/*
*/

const getUser = async function (id) {
  // Make a request for a user with a given ID
  return await axios.get(site + '/users/' + id);
  /*
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
  */
}

const getUsersData = async function (users) {
  console.log(users)
  let newUsers = [];
  for (let i = 1; i < users.length; i++) {
    newUsers[i] = (await getUser(users[i].userId)).data;
  }
  return newUsers;
}

const getCombinedData = async function () {

  let users = [];
  const posts = await getPosts();
  posts.data.map(function(ev, index, myArr) {
    const userId = ev.userId;
    if (!users[userId]) {
      users[userId] = { userId };
    }
    return ev;
  });

  users = await getUsersData(users);

  let userPosts = [];
  for (let i = 0; i < posts.data.length; i++) {
    posts.data[i].userInfo = users[posts.data[i].userId];
    userPosts[i] = posts.data[i];
  }
  return userPosts;
}

module.exports = {
  getCombinedData,
  getPosts,
  getUser,
}
