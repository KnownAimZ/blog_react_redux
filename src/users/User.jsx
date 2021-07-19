import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';

const User = ({name,avatar,email, dateCreated}) => {    
    return (
        <Card variant='outlined'>
            <CardHeader
                avatar={<Avatar alt="User avatar" src={avatar}/>}
                title={`${name} <${email}>`}
                subheader={dateCreated}
            />
        </Card>
    );
};

export default User;
