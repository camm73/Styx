import StarRating from 'react-native-star-rating';
import React,  {Component} from 'react';
import {Ionicons} from 'react-native-vector-icons';

class StarComponent extends Component{

    constructor(props){
        super(props);
        this.state = {
            starCount: 3.5
        };
    }

    onStarRatingPress(rating) {
        this.setState({
          starCount: rating
        });
      }

    render() {
        return (
            <StarRating
            disabled={false}
            maxStars={5}
            fullStarColor = "#009eb3"
            halfStarEnabled = {true}
            iconSet = {Ionicons}
            starSize = {60}
            rating={this.state.starCount}
            selectedStar={(rating) => this.onStarRatingPress(rating)}
            />
        );
    }
}

export default StarComponent;