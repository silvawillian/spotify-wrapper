const { searchAlbums } = require('../src/search');

searchAlbums('Aerosmith')
  .then(res => res.json())
  .then((res) => {
    res.albums.items.map(i => console.log(i.name));
  });
