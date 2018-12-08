require('dotenv').load();

global.fetch = require('node-fetch');

const {
  SPOTIFY_API_URL,
  SPOTIFY_BEARER_TOKEN,
} = process.env;

const headers = {
  Authorization: `Bearer ${SPOTIFY_BEARER_TOKEN}`,
};

const search = async (query, type) =>
  global.fetch(
    `${SPOTIFY_API_URL}/search?q=${query}&type=${type}`,
    { headers },
  );

const searchArtists = query => search(query, 'artist');
const searchAlbums = query => search(query, 'album');
const searchTracks = query => search(query, 'track');
const searchPlaylists = query => search(query, 'playlist');

module.exports = {
  search,
  searchAlbums,
  searchTracks,
  searchPlaylists,
  searchArtists,
};
