import React, {Component} from 'react';
import {connect} from 'react-redux';
import {clearPosts, reorderPosts} from '../posts/posts.actions';
import {GETPOSTS_BYPOSITION_WATCHER, UPDATEPOSITION_AND_RERENDER} from '../posts/posts.actiontypes';
import {DragDropContext} from 'react-beautiful-dnd';
import {Button, Switch} from '@material-ui/core';
import List from '../posts/List.jsx';
import './ClassPostList.scss';

class ClassPostList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMultiplePosts: false,
            firstListSize: 5,
        };
        this.changeFirstListSize = this.changeFirstListSize.bind(this);
        this.toggleMultiplePosts = this.toggleMultiplePosts.bind(this);
        this.reorder = this.reorder.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.prevButtonClick = this.prevButtonClick.bind(this);
        this.nextButtonClick = this.nextButtonClick.bind(this);
    }

    componentDidMount() {
        this.props.getPostsByPosition(this.props.position);
        this.changeFirstListSize(5);
    }

    componentWillUnmount() {
        this.props.clearPosts();
    }

    changeFirstListSize(size) {
        this.setState({
            firstListSize: size
        });
    }

    toggleMultiplePosts() {
        this.setState({
            isMultiplePosts: !this.state.isMultiplePosts
        });
    }

    reorder(startIndex, endIndex, source, destination) {
        startIndex = source.droppableId === 'droppableList2' ? startIndex + this.state.firstListSize : startIndex;
        endIndex = destination.droppableId === 'droppableList2' ? endIndex + this.state.firstListSize : endIndex;
        if(source.droppableId === 'droppableList2' && destination.droppableId === 'droppableList1') {
            this.changeFirstListSize(this.state.firstListSize + 1);
        }
        else if(source.droppableId === 'droppableList1' && destination.droppableId === 'droppableList2') {
            this.changeFirstListSize(this.state.firstListSize - 1);
            endIndex--;
        }
        const orderedPost = this.props.postsList;
        const [selected] = orderedPost.splice(startIndex, 1);
        orderedPost.splice(endIndex, 0 , selected);
        return orderedPost;
    }

    onDragEnd(result) {
        if (!result.destination) {
            return;
        }
        const newList = this.reorder(result.source.index, result.destination.index, result.source, result.destination);
        this.props.reorderPosts(newList);
    }

    prevButtonClick() {
        if(this.props.position >= 10) {
            this.props.handlePrev(this.props.position);
        }
    }

    nextButtonClick() {
        if(this.props.postsList.length === 10) {
            this.props.handleNext(this.props.position);
        }
    }

    render() {
        return (
        <div className="ClassPostList">            
        <DragDropContext onDragEnd={this.onDragEnd}>
            <div className="Page">                
                <div className="postcount_changer">
                    <span>One List</span>
                    <Switch
                        color="default"
                        checked={this.state.isMultiplePosts}
                        onChange={this.toggleMultiplePosts}
                        inputProps={{ 'aria-label': 'checkbox with default color' }}
                    />
                    <span>Two Lists</span>
                </div>                
                <div className="PostList">
                <h2>{!this.state.isMultiplePosts ? 'Single Post List' : 'Multiple Post Lists'}</h2>
                <div className="allPostLists">
                    {!this.state.isMultiplePosts &&
                        <List 
                            postsList={this.props.postsList} 
                            droppableId="droppable" 
                            filterCallback={()=>true} 
                        />
                    }
                    {this.state.isMultiplePosts && 
                        <>
                            <List 
                                postsList={this.props.postsList} 
                                droppableId="droppableList1" 
                                filterCallback={(post, index) => index < this.state.firstListSize}
                                title="Post List 1" 
                            />
                            <List 
                                postsList={this.props.postsList} 
                                droppableId="droppableList2" 
                                filterCallback={(post, index) => index >= this.state.firstListSize}
                                title="Post List 2" 
                            />
                        </>                                
                    }                             
                </div>                
                <div className="post_controls">
                    <Button variant="contained" color="primary" onClick={this.prevButtonClick}>
                        Previous
                    </Button>
                    <Button variant="contained" color="primary" onClick={this.nextButtonClick}>
                        Next
                    </Button>              
                </div> 
                </div>
            </div>
        </DragDropContext>
        </div>
       );
    }
};

const mapStateToProps = (state) => {
    const {posts: {position, postsList}} = state;
    return {
        position, 
        postsList
    };
} 

const mapDispatchToProps = (dispatch) => {
    return {
        getPostsByPosition: (position)=> dispatch({
            type: GETPOSTS_BYPOSITION_WATCHER,
            payload: {position}
        }),
        clearPosts: ()=>dispatch(clearPosts()),
        handlePrev: (position)=>dispatch({
            type: UPDATEPOSITION_AND_RERENDER,
            payload: {position: +position-10}
        }),
        handleNext: (position)=>dispatch({
            type: UPDATEPOSITION_AND_RERENDER,
            payload: {position: +position+10}
        }),
        reorderPosts: (newList)=>dispatch(reorderPosts(newList)),

    };
}

export default connect (mapStateToProps, mapDispatchToProps)(ClassPostList);