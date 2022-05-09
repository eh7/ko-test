const express = require('express');
const app = express();

const {
  getCombinedData,
  getPosts,
  getUser
} = require('./services/getData');

app.get('/', function (req, res) {
   const endpoints = "<br>\
     <a href='/'>/</a><br>\
     <a href='/posts'>/posts</a><br>\
     <a href='/user/1'>/user</a><br>\
     <a href='/user/2'>/user</a><br>\
     <a href='/combined'>/combined</a><br>\
     <a href='/user/posts/1'>/user/posts/1</a></br>\
     <a href='/user/posts/2'>/user/posts/2</a></br>\
   ";
   res.send('Hello World :: ' + endpoints);
})

app.get('/posts', async function (req, res) {
  const posts = await getPosts();
  const userPosts = posts.data.map(function(ev, index, myArr) {
    let li = "<li>";
    li += "<b>User: " + ev.userId + "</b><br/>";
    li += "Title: " + ev.title + "<br/>";
    li += "Body:" + ev.body;
    li += "</li>";
    // console.log(index, ev, li);
    return li;
  });
  res.send('posts' + "<ul>" + userPosts + "</ul>");
})

app.get('/user/:id', async function (req, res) {
  // res.send(res);
  const id = req.params.id;
  const user = await getUser(id);
  console.log(user);
  console.log(user.data.address.geo);
  // console.log(res);
  res.send(`userId passed in: ${id}<br/>\
    id: ${user.data.id}<br/>\
    name: ${user.data.name}<br/>\
    username: ${user.data.username}<br/>\
    email: ${user.data.email}<br/>\
    phone: ${user.data.phone}<br/>\
    website: ${user.data.website}<br/>\
    address: ${user.data.address.street}<br/>\
    ${user.data.address.suite}<br/>\
    ${user.data.address.city}<br/>\
    ${user.data.address.zipcode}<br/>\
    geo: ${user.data.address.geo.lat} \
    ${user.data.address.geo.lng}<br/>\
    company: ${user.data.company.name}<br/>\
    ${user.data.company.catchPhrase}<br/>\
    ${user.data.company.bs}<br/>\
  `);
})

app.get('/combined', async function (req, res) {
  const data = await getCombinedData();
  // res.send(`combined data :: ${data}`);
  res.setHeader('Content-Type', 'application/json');
  res.json(data);
})

app.get('/user/posts/:id', async function (req, res) {
  const data = await getCombinedData();
  const id = req.params.id;
  let outData = [];
  for (let i = 0; i < data.length ; i++) {
    if (data[i].userId == id) {
      outData.push(data[i]);
    }
  }
  res.setHeader('Content-Type', 'application/json');
  res.json(outData);
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})
