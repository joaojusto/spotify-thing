import _ from 'lodash';
import React, { Component } from 'react';
import Spotify from 'spotify-web-api-js';

const spotifyApi = new Spotify();

const getToken = () => localStorage.getItem('accessToken');

const saveToken = accessToken =>
  localStorage.setItem('accessToken', accessToken);

const fetchToken = () => {
  const params = new URL(document.location).searchParams;

  const savedToken = getToken();
  const accessToken = params.get('access_token');

  if (accessToken) saveToken(accessToken);
  else if (!savedToken) window.location = 'http://localhost:5000/login';
};

class App extends Component {
  constructor() {
    super();
    this.state = { artists: [], playlist: [], albums: [] };

    fetchToken();
    spotifyApi.setAccessToken(getToken());
  }

  onArtists = data => {
    this.setState({ artists: data.artists.items });
  };

  onAlbums = data => {
    const albums = _.uniqBy([ ...this.state.albums, ...data.items ], 'id');
    console.log(albums);
    this.setState({ albums });
  };

  addToPlaylist = id => () => {
    const playlist = _.uniq([ ...this.state.playlist, id ]);
    spotifyApi.getArtistAlbums(id).then(this.onAlbums);
    this.setState({ playlist });
  };

  search = event => {
    const text = event.target.value;

    spotifyApi
      .searchArtists(text)
      .then(this.onArtists)
      .catch(err => {
        if (err.status === 401)
          return (window.location = 'http://localhost:5000/login');

        console.error(err);
      });
  };

  renderArtists() {
    return this.state.artists.map(({ id, name }) => (
      <li key={id}>
        {name} <button onClick={this.addToPlaylist(id)}>Add to playlist</button>
      </li>
    ));
  }

  renderPlayList() {
    return this.state.playlist.map(id => <li key={id}>{id}</li>);
  }

  renderAlbums() {
    return this.state.albums.map(album => <li key={album.id}>{album.name}</li>);
  }

  render() {
    return (
      <div className="App">
        <input type="text" placeholder="search" onChange={this.search} />
        <div style={{ display: 'flex' }}>
          <ul>{this.renderArtists()}</ul>
          <ul>{this.renderPlayList()}</ul>
          <ul>{this.renderAlbums()}</ul>
        </div>
      </div>
    );
  }
}

export default App;
