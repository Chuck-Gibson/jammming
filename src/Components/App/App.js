import './App.css';
import React from 'react';

import {SearchBar} from "../Searchbar/SearchBar";
import {SearchResults} from "../SearchResults/SearchResults";
import {Playlist} from "../Playlist/Playlist";
import Spotify from "../../util/Spotify"; 


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playListName: "",
      playListTracks: [],
      searchResults : []
          
    }
    this.addTrack = this.addTrack.bind(this)
    this.removeTrack = this.removeTrack.bind(this)
    this.updatePlaylistName = this.updatePlaylistName.bind(this)
    this.savePlaylist = this.savePlaylist.bind(this)
    this.search = this.search.bind(this)
  }

  updatePlaylistName(name){
     return this.setState({playListName: name})
  }

  addTrack(track){
    let tracks = this.state.playListTracks;
    if(tracks.find(savedTrack => savedTrack.id === track.id)){
      return;
    } else {
      tracks.push(track)
      return this.setState({ playListTracks: tracks})
      }
    }
  
    removeTrack(track){
      let tracks = this.state.playListTracks;
      if(tracks.find(savedTrack => savedTrack.id === track.id)){
        let newTracks = tracks.filter(songs => songs !== track);
        this.setState({playListTracks: newTracks});
      } else {}
        
    }

  render(){
  return (
    <div>
  <h1>Ja<span class="highlight">mmm</span>ing</h1>
  <div className="App">
      <SearchBar onSearch = {this.search}/>
    <div className="App-playlist">
      <SearchResults searchResults = {this.state.searchResults} onAdd= {this.addTrack} />
      <Playlist onSave = {this.savePlaylist} playListName={this.state.playListName} playListTracks={this.state.playListTracks} onRemove ={this.removeTrack} updateName = {this.updatePlaylistName}/>
    </div>
  </div>
</div>
  );
}

search(term){
  Spotify.search(term).then(results => {
      this.setState({
      searchResults: results
    })
    
  });
  
}

savePlaylist(){
 let trackURIs = this.state.playListTracks.map(track => track.uri);
  Spotify.savePlaylist(this.state.playListName ,trackURIs)
  .then(() => {
  this.setState({
    playListName: "New playlist",
    playListTracks: []
    })
  })
}

}


export default App;
