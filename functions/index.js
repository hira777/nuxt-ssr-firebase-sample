const functions = require('firebase-functions');
const { Nuxt } = require('nuxt');
const express = require('express');
const app = express();

const config = {
  dev: false,
  buildDir: '.nuxt',
  build: {
    publicPath: '/assets/'
  }
};
const nuxt = new Nuxt(config);

app.use((_, res, next) => {
  // https://firebase.google.com/docs/hosting/manage-cache?hl=ja
  res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
  next();
});
app.use(nuxt.render);
exports.ssr = functions.https.onRequest(app);
