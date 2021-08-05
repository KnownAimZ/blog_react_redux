import React, {Component} from 'react';
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import List from 'react-virtualized/dist/commonjs/List';
import User from '../users/User';
import {FETCHUSERS_WATCHER} from '../users/users.actiontypes';
import './ClassUserList.scss';

class ClassUserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userSearch: ''
        };
        this.handleUserSearch = this.handleUserSearch.bind(this);
    }

    componentDidMount() {
        this.props.loadUsers();
    }

    handleUserSearch(event) { 
        this.setState({userSearch: event.target.value});
    }

    render() {
        console.count();
        return (
            <div className="ClassUserList">
                <h2>User List</h2>
                <TextField          
                label="Email"
                value={this.state.userSearch}
                onChange={this.handleUserSearch}
                variant="outlined"
                />
                {/* <List rowCount={this.props.allUsers.length} height={7} rowHeight={20} width={100} rowRenderer={()=>{}} > */}
                {this.props.allUsers.filter(user =>{ return user['email'].includes(this.state.userSearch)}).map(user => (<User key={user._id} {...user} />)) }
                {/* </List> */}
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    const { users:{allUsers} } = state;
    return { allUsers };
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadUsers: () => dispatch({type:FETCHUSERS_WATCHER})
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassUserList);