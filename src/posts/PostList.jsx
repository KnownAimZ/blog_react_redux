import React,{ useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Button, Switch } from '@material-ui/core';
import * as postActions from './posts.actions.js';
import Post from './Post.jsx';
import './PostList.scss';

const PostList = ({withControls, title}) => {
    const dispatch = useDispatch();
    const { position, postsList } = useSelector(state => state.posts);
    const [isMultiplePosts, setIsMultiplePosts] = useState(false);
    const [firstListSize, setFirstListSize] = useState(5);

    useEffect(() => {
        if(withControls) {
            dispatch(postActions.getPostsByPosition(position));
        }
        setFirstListSize(5);
    },[position]);

    useEffect(()=> {
        return ()=> {
            dispatch(postActions.clearPosts());
        }
    },[]);

    const handleNext = () => {
        if(postsList.length === 10) {
            dispatch(postActions.setPosition(position + 10));
        }
    };

    const handlePrev = () => {
        if(position > 0) {
            dispatch(postActions.setPosition(position - 10));
        }
    };

    const reorder = (startIndex, endIndex, source, destination) => {
        startIndex = source.droppableId === 'droppableList2' ? startIndex + firstListSize : startIndex;
        endIndex = destination.droppableId === 'droppableList2' ? endIndex + firstListSize : endIndex;
        if(source.droppableId === 'droppableList2' && destination.droppableId === 'droppableList1') {
            setFirstListSize(prev=> prev+1)
        }
        else if(source.droppableId === 'droppableList1' && destination.droppableId === 'droppableList2') {
            setFirstListSize(prev=> prev-1)
            endIndex--;
        }
        const orderedPost = postsList;
        const [selected] = orderedPost.splice(startIndex, 1);
        orderedPost.splice(endIndex, 0 , selected);
        return orderedPost;
    }

    const onDragEnd = (result) => {
        // console.log(result);
        if (!result.destination) {
            return;
        }
        const newList = reorder(result.source.index, result.destination.index, result.source, result.destination);
        dispatch(postActions.reorderPosts(newList));
    }

    if (!withControls && postsList.length === 0) {
        return (
            <>
                <h2>{title}</h2>
                <p>This user has no posts...</p>
            </>
        );
    }
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="Page">
                { withControls && 
                <div className="postcount_changer">
                    <span>One List</span>
                    <Switch
                        color="default"
                        checked={isMultiplePosts}
                        onChange={()=>{setIsMultiplePosts(!isMultiplePosts)}}
                        inputProps={{ 'aria-label': 'checkbox with default color' }}
                    />
                    <span>Two Lists</span>
                </div>
                }
                <div className="PostList">
                <h2>{!isMultiplePosts ? 'Single Post List' : 'Multiple Post Lists'}</h2>
                <div className="allPostLists">
                    {!isMultiplePosts &&
                    <Droppable droppableId="droppable">
                    {(provided) => (
                    <div className="list" ref={provided.innerRef} {...provided.droppableProps}>
                        {postsList.map((post, index) => (
                            <Post 
                                key={post._id}
                                index = {index }
                                {...post} 
                            />   
                        ))}
                        {provided.placeholder}
                    </div>)}
                    </Droppable>
                    }
                    {isMultiplePosts && 
                        <>
                            <Droppable droppableId="droppableList1">
                            {(provided) => (
                            <div className="list" ref={provided.innerRef} {...provided.droppableProps}>
                            <h3>Post List 1</h3>
                            {postsList.filter((post, index) => index < firstListSize).map((post, index) => (
                                <Post 
                                    key={post._id}
                                    index = {index }
                                    {...post} 
                                />   
                            ))}
                                {provided.placeholder}
                            </div>)}
                            </Droppable>
                            <Droppable droppableId="droppableList2">
                            {(provided) => (
                            <div className="list" ref={provided.innerRef} {...provided.droppableProps}>
                            <h3>Post List 2</h3>
                            {postsList.filter((post, index) => index >= firstListSize).map((post, index) => (
                                <Post 
                                    key={post._id}
                                    index = {index }
                                    {...post} 
                                />   
                            ))}
                                {provided.placeholder}                                 
                            </div>)}
                            </Droppable>    
                        </>                                
                    }                             
                </div>
                { withControls && 
                <div className="post_controls">
                    <Button variant="contained" color="primary" onClick={handlePrev}>
                        Previous
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleNext}>
                        Next
                    </Button>              
                </div> }
                </div>
            </div>
        </DragDropContext>
       );
};

export default PostList;
