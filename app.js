const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

// @route GET /
// @desc Get current comic
// @access Public
app.get('/comics', async function (req, res) {
  try {
    const comic = await axios.get('https://xkcd.com/info.0.json');
    res.status(200).json(comic.data);
  } catch (error) {
    res
      .status(500)
      .send({ msg: 'Unable to retrieve the current comic, please try again' });
  }
});

// @route GET /comics/comic_number
// @desc Get a specific comic number
// @access Public
app.get('/comics/:comicsNum', async function (req, res) {
  const comicNumber = req.params.comicsNum;
  try {
    const comic = await axios.get(
      `https://xkcd.com/${comicNumber}/info.0.json`
    );
    res.status(200).json(comic.data);
  } catch (error) {
    res.status(500).send({
      msg: 'Unable to retrieve your specified comic, please try again',
    });
  }
});

// @route GET /comics/random
// @desc Get a random comic number
// @access Public
app.get('/comics/comicsNum/random', async function (req, res) {
  try {
    const comic = await axios.get(`https://xkcd.com/info.0.json`);
    const comicNumber = Math.floor(Math.random() * comic.data.num) + 1;
    const randomComic = await axios.get(
      `https://xkcd.com/${comicNumber}/info.0.json`
    );
    res.status(200).json(randomComic.data);
  } catch (error) {
    res
      .status(500)
      .send({ msg: 'Unable to retrieve a random comic, please try again' });
  }
});

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production') {
  // static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
