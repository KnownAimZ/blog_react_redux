import React from "react";
import {Droppable} from "react-beautiful-dnd";
import Post from "./Post";

const List = ({postsList, droppableId,title,filterCallback} ) => {
    return (
        <Droppable droppableId={droppableId}>
            {(provided) => (
                <div 
                    className="list" 
                    ref={provided.innerRef} 
                    {...provided.droppableProps}
                >
                {title && <h3>{title}</h3>}
                {postsList.filter(filterCallback).map((post, index) => (
                    <Post 
                        key={post._id}
                        index = {index }
                        {...post} 
                    />   
                ))}
                {provided.placeholder}                                 
                </div>
            )}
        </Droppable>
    );
}

export default List;