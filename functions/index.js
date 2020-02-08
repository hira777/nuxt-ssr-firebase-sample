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

app.use(nuxt.render);
exports.ssr = functions.https.onRequest(app);
