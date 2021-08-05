import React, {Component} from 'react';
import {connect} from 'react-redux';
import {TextField, Tooltip} from '@material-ui/core';
import './ClassCreatePost.scss';
import {CREATEPOST_WATCHER} from '../posts/posts.actiontypes';

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
        this.handlePostCreate = this.handlePostCreate.bind(this);
    };

    handleTitleChange(event) {
        this.setState({title: event.target.value});
    }

    handleFullTextChange(event) {
        this.setState({fullText: event.target.value});
    }

    handleDescriptionChange(event) {
        this.setState({description: event.target.value});
    }

    handlePostCreate() {
        const {title, fullText, description} = this.state;
        const token = this.props.token;
        if(title !== '' && fullText !== '' && description !== '' && fullText.length >= 20 && title.length >= 5) {
            this.props.createPost(token, title, fullText, description);        
            this.setState({
                title: '',
                fullText: '',
                description: ''
            });
            alert('Post created');
        }
        else {
            alert('Error! Something went wrong');
        }
    }

    render() {
        return (
            <div className="ClassCreatePost">
                <h2>Create new Post</h2>
                <Tooltip title="Title length must be greater than 4" arrow>
                    <TextField
                        required          
                        label="Title"
                        value={this.state.title}
                        onChange={this.handleTitleChange}
                        variant="outlined"
                    />
                </Tooltip>
                <Tooltip title="FullText length must be greater than 20" arrow>
                    <TextField
                        required          
                        label="FullText"
                        value={this.state.fullText}
                        onChange={this.handleFullTextChange}
                        variant="outlined"
                    />
                </Tooltip>
                <Tooltip title="Description must be not empty" arrow>
                    <TextField
                        required          
                        label="Description"
                        value={this.state.description}
                        onChange={this.handleDescriptionChange}
                        variant="outlined"
                    />
                </Tooltip>                
                <button onClick={this.handlePostCreate}>Create</button>
            </div>

        );
    }
};

const mapStateToProps = (state) => {
    const {auth: {token}} = state;
    return { token };
}

const mapDispatchToProps = (dispatch) => {
    return {
        createPost: (token, title, fullText, description) => dispatch({
            type: CREATEPOST_WATCHER,
            payload: {
                token,
                title,
                fullText,
                description,
            }
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassCreatePost);