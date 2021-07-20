import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import './User.scss'

const User = ({_id, name,avatar,email, dateCreated}) => {    
    return (
        <Link className='User' to={`/users/${_id}`}>
            <Card variant='outlined' style={{ margin:'5px 0', borderWidth: '3px'}}>
                <CardHeader
                    avatar={<Avatar alt="User avatar" src={avatar}/>}
                    title={`${name} <${email}>`}
                    subheader={dateCreated}
                />
            </Card>
        </Link>
    );
};

export default User;
