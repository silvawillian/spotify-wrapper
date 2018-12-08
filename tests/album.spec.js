
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const sinonStubPromise = require('sinon-stub-promise');

const { getAlbum, getAlbums, getAlbumTracks } = require('../src/album');

const { expect } = chai;

sinonStubPromise(sinon);
chai.use(sinonChai);

global.fetch = require('node-fetch');

// getAlbum
// getAlbumTracks

describe('Album', () => {
  let stubbedFetch;

  beforeEach(() => {
    stubbedFetch = sinon.stub(global, 'fetch');
  });

  afterEach(() => {
    stubbedFetch.restore();
  });

  describe('smoke tests', () => {
    it('should have getAlbum method', () => {
      expect(getAlbum).to.exist;
    });

    it('should have getAlbumTracks method', () => {
      expect(getAlbumTracks).to.exist;
    });
  });

  describe('getAlbum', () => {
    it('should call fetch method', () => {
      getAlbum();
      expect(stubbedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      getAlbum('61NNWRxokNUQx0aYysBL76');
      expect(stubbedFetch).to.have.been
        .calledWith('https://api.spotify.com/v1/albums/61NNWRxokNUQx0aYysBL76');
    });

    it('should return the correct data from promise', async () => {
      stubbedFetch.resolves({ album: 'Permanent Vacation' });
      const album = await getAlbum('61NNWRxokNUQx0aYysBL76');

      expect(album).to.be.eql({ album: 'Permanent Vacation' });
    });
  });

  describe('getAlbums', () => {
    it('should call fetch method', () => {
      getAlbums();
      expect(stubbedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      getAlbums(['61NNWRxokNUQx0aYysBL76', '61NNWRxokNUQx0aYysBL77']);
      expect(stubbedFetch).to.have.been
        .calledWith('https://api.spotify.com/v1/albums/?ids=61NNWRxokNUQx0aYysBL76,61NNWRxokNUQx0aYysBL77');
    });

    it('should return the correct data from promise', async () => {
      stubbedFetch.resolves({ album: 'Permanent Vacation' });
      const album = await getAlbums(['61NNWRxokNUQx0aYysBL76', '61NNWRxokNUQx0aYysBL77']);

      expect(album).to.be.eql({ album: 'Permanent Vacation' });
    });
  });

  describe('getAlbumTracks', () => {
    it('should call fetch method', () => {
      getAlbumTracks();
      expect(stubbedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      getAlbumTracks('61NNWRxokNUQx0aYysBL76');
      expect(stubbedFetch).to.have.been
        .calledWith('https://api.spotify.com/v1/albums/61NNWRxokNUQx0aYysBL76/tracks');
    });

    it('should return the correct data from promise', async () => {
      stubbedFetch.resolves({ album: 'Permanent Vacation' });
      const album = await getAlbumTracks('61NNWRxokNUQx0aYysBL76');

      expect(album).to.be.eql({ album: 'Permanent Vacation' });
    });
  });
});
