import React, { Component } from "react";
import './Search.css';
import SearchField from "./SearchField";
import ArtistList from "./../Artist/ArtistList";
import PlaylistList from "./../Playlist/PlaylistList";
import SpotifyWebApi from "spotify-web-api-node"

class Search extends Component {

    constructor(props) {
        super(props);

        this.state = {
            searchString: "",
            artists: [],
            playlists: [],
            albums: []
        }
        
        this.selectArtist = this.selectArtist.bind(this);


        this.spotifyApi = new SpotifyWebApi();
        this.spotifyApi.setAccessToken(this.props.accessToken);
        this.startSearch = this.startSearch.bind(this);
    }

    startSearch(searchString) {
        this.spotifyApi.searchArtists(searchString).then(
            function (data) {
                let artists = data.body.artists.items;
                this.setState({artists: artists});
            }.bind(this),
            function (err) {
                console.error(err);
            }
        );


        this.spotifyApi.searchAlbums(searchString).then(
            function (data) {
                let albums = data.body.albums.items;
                this.setState({albums: albums});
            }.bind(this),
            function (err) {
                console.error(err);
            }
        )

        this.spotifyApi.searchPlaylists(searchString).then(
            function (data) {
                let playlists = data.body.playlists.items;
                this.setState({playlists: playlists});
            }.bind(this),
            function (err) {
                console.error(err);
            }
        )
    }

    selectArtist(artistId) {
        //TODO
    }

    render() {
        return <div className="search">
            <button onClick={this.props.onCancel}>Go Back</button>
            <SearchField search={this.startSearch}/>
            <ArtistList
                artists={this.state.artists}
                selectArtist={this.selectArtist}
                addArtist={this.addArtist} />
            <PlaylistList
                    playlists={this.state.playlists}
                    selectPlaylist={this.selectPlaylist}
            />
        </div>
    }
}

export default Search;