require('dotenv').load();
global.fetch = require('node-fetch');

const headers = {
  Authorization: `Bearer ${process.env.SPOTIFY_BEARER_TOKEN}`,
};

const search = async (query, type) =>
  global.fetch(
    `https://api.spotify.com/v1/search?q=${query}&type=${type}`,
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
