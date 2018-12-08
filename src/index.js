const {
  search,
  searchArtists,
  searchAlbums,
  searchTracks,
  searchPlaylists,
} = require('./search');

const {
  getAlbum,
  getAlbums,
  getAlbumTracks,
} = require('./album');

module.exports = {
  search,
  searchArtists,
  searchAlbums,
  searchTracks,
  searchPlaylists,
  getAlbum,
  getAlbums,
  getAlbumTracks,
};
