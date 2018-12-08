const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const sinonStubPromise = require('sinon-stub-promise');

global.fetch = require('node-fetch');

const { expect } = chai;
const {
  search,
  searchAlbums,
  searchArtists,
  searchTracks,
  searchPlaylists,
} = require('../src/search');

chai.use(sinonChai);
sinonStubPromise(sinon);

describe('Spotify Wrapper', () => {
  let fetchedStub;

  beforeEach(() => {
    fetchedStub = sinon.stub(global, 'fetch');
  });

  afterEach(() => {
    fetchedStub.restore();
  })

  describe('smoke tests', () => {
    it('should exist the search method', () => {
      expect(search).to.exist;
    });

    it('should exist the searchAlbums method', () => {
      expect(searchAlbums).to.exist;
    });

    it('should exist the searchArtists method', () => {
      expect(searchArtists).to.exist;
    });

    it('should exist the searchTracks method', () => {
      expect(searchTracks).to.exist;
    });

    it('should exist the searchPlaylists method', () => {
      expect(searchPlaylists).to.exist;
    });
  });

  describe('Generic Search', () => {
    it('should call fetch function', () => {
      search();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should receive the correct url to fetch', () => {
      context('passing one type', () => {
        search('Metallica', 'artist');
        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=Metallica&type=artist');
      });

      context('passing multiple types', () => {
        search('Aerosmith', ['artist', 'album']);
        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=Aerosmith&type=artist,album');
      })
    });

    it('should return the JSON data from the promise', async () => {
      fetchedStub.resolves({ body: 'json' });

      const artists = await search('Incubus', 'artist');
      expect(artists).to.be.eql({ body: 'json' });
    });
  });

  describe('searchArtists', () => {
    it('should call fetch function', () => {
      const artists = searchArtists('Arctic Monkeys');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct url', () => {
      searchArtists('Arctic Monkeys');
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/search?q=Arctic Monkeys&type=artist');
    });
  });

  describe('searchAlbums', () => {
    it('should call fetch function', () => {
      searchAlbums('Tranquility Base Hotel & Casino');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct url', () => {
      searchAlbums('AM');
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/search?q=AM&type=album');
    });
  });

  describe('searchTracks', () => {
    it('should call fetch function', () => {
      searchTracks('Cornerstone');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct url', () => {
      searchTracks('505');
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/search?q=505&type=track');
    });
  });

  describe('searchPlaylists', () => {
    it('should call fetch function', () => {
      searchPlaylists('Top Brasil');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct url', () => {
      searchPlaylists('Downloads');
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/search?q=Downloads&type=playlist');
    });
  });
});
