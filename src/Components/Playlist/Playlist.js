import React from "react";
import "./Playlist.css";
import {TrackList} from "../TrackList/Tracklist";

export class Playlist extends React.Component{
    constructor(props){
        super(props)
        this.handleNameChange = this.handleNameChange.bind(this)
    }
    handleNameChange(event){
        this.props.updateName(event.target.value);
    }
    render(){
        return(
            <div className="Playlist">
                <input defaultValue={this.props.playListName} onChange= {this.handleNameChange}/>
                <TrackList tracks= {this.props.playListTracks} onRemove= {this.props.onRemove} isRemoval = {true} />
                <button className= "Playlist-save" onClick= {this.props.onSave}>SAVE TO SPOTIFY</button>
            </div>
        )
    }
};
