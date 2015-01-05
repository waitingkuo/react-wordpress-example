var fs = require('fs');
var koa = require('koa');
var json = require('koa-json');
var _ = require('koa-route');
var request = require('koa-request');
var serve = require('koa-static');

var app = koa();
var prefix = 'http://192.168.59.103:8080/wp-json';


app.use(_.get('/', function *() {
  this.body = '<html> \
    <head><title>ReactPress</title> \
    <link rel="stylesheet" href="/css/bootstrap.css" /> \
    <link rel="stylesheet" href="/css/clean-blog.css" /> \
    <link rel="stylesheet" href="/css/main.css" /> \
    </head> \
    <body><div id="app"></div></body> \
    <script src="/build/bundle.js"></script> \
  </html>';
}));

app.use(serve('.'));


app.use(json());
app.use(_.get('/posts', function *() {

  var page = this.request.query.page;

  var options = {
    url: prefix + '/posts?filter[posts_per_page]=3&page=' + page,
    headers: { 'User-Agent': 'request' }
  };
  var response = yield request(options);
  this.body = JSON.parse(response.body);

}));

app.listen(3000);
