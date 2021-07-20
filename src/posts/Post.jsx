import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent'
import { Typography } from '@material-ui/core';

const Post = ({title,description}) => {    
    return (
        <Card variant='outlined' style={{backgroundColor:'lightblue', margin:'5px 0', borderWidth: '3px'}} >
            <CardHeader  title={title}/>
            <CardContent>
                <Typography variant="body2" component="p">
                    {description}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default Post;
