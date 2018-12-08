require('dotenv').load();
global.fetch = require('node-fetch');

const {
  SPOTIFY_API_URL,
  SPOTIFY_BEARER_TOKEN,
} = process.env;

const headers = {
  Authorization: `Bearer ${SPOTIFY_BEARER_TOKEN}`,
};

const getAlbum = id => global.fetch(
  `${SPOTIFY_API_URL}/albums/${id}`,
  { headers },
);

const getAlbums = ids => global.fetch(
  `${SPOTIFY_API_URL}/albums/?ids=${ids}`,
  { headers },
);

const getAlbumTracks = albumId => global.fetch(
  `${SPOTIFY_API_URL}/albums/${albumId}/tracks`,
  { headers },
);

module.exports = {
  getAlbum,
  getAlbums,
  getAlbumTracks,
};

