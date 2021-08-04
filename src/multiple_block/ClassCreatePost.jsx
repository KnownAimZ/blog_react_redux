import React, {Component} from 'react';
import {TextField} from '@material-ui/core';

class ClassCreatePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            fullText: '',
            description: '',
        }
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleFullTextChange = this.handleFullTextChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    };

    //lifecycle methods
  
    //custom methods
    handleTitleChange(event) {
        this.setState({title: event.target.value});
    }

    handleFullTextChange(event) {
        this.setState({fullText: event.target.value});
    }

    handleDescriptionChange(event) {
        this.setState({description: event.target.value});
    }

    render() {
        return (
            <div>
                <TextField
                    required          
                    label="Title"
                    value={this.state.title}
                    onChange={this.handleTitleChange}
                    variant="outlined"
                />
                <TextField
                    required          
                    label="FullText"
                    value={this.state.fullText}
                    onChange={this.handleFullTextChange}
                    variant="outlined"
                />
                <TextField
                    required          
                    label="Description"
                    value={this.state.description}
                    onChange={this.handleDescriptionChange}
                    variant="outlined"
                />
            </div>

        );
    }
};

export default ClassCreatePost;