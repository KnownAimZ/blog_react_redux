import { Draggable } from 'react-beautiful-dnd';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent'
import './Post.scss';

const Post = ({_id, title,description, fullText, index}) => {    
    return (
        <Draggable key={_id} draggableId={_id} index={index}>
            {(provided, snapshot) => (
                <div 
                    ref={provided.innerRef} 
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <Link className="Post" to={`/posts/${_id}`} style={{textDecoration:'none'}}>
                        <Card variant='outlined' style={{backgroundColor: snapshot.isDragging ? 'lightgreen' : 'lightblue', margin:'5px 0', borderWidth: '3px'}} >
                            <CardHeader  title={title}/>
                            <CardContent>
                                <Typography variant="subtitle1" component="p">
                                    {description}
                                </Typography>
                                <Typography variant="body2" component="p">
                                    {fullText}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Link>
                    {provided.placeholder}
                </div>
            )}
        </Draggable>
    );
};

export default Post;
