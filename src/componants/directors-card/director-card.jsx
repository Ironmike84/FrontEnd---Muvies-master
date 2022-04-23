import React from 'react';
import './director-card.scss'
import {Button} from 'react-bootstrap'
class DirectorCard extends React.Component{

    render(){

        const {Director, onDirectorClick} = this.props;
        return(
            <div className='Director-Card'> 
                <div className="Director-Title">{Director.Name}</div>
                <div><img className='Director-Image' src={Director.ImagePath}></img></div>
                <hr></hr>
                <Button className="btn DirectorButton" onClick={() => onDirectorClick(Director)} variant="link">Open</Button>
            </div>)
    }
}

export default DirectorCard;