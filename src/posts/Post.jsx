import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent'

const Post = ({_id, title,description, fullText}) => {    
    return (
        <Link to={`/posts/${_id}`} style={{textDecoration:'none'}}>
            <Card variant='outlined' style={{backgroundColor:'lightblue', margin:'5px 0', borderWidth: '3px'}} >
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
        
    );
};

export default Post;
