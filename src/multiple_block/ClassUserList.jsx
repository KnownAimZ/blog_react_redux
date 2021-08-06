import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import {AutoSizer, List } from 'react-virtualized';
import User from '../users/User';
import {FETCHUSERS_WATCHER} from '../users/users.actiontypes';
import './ClassUserList.scss';

class ClassUserList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            userSearch: '',
            allUsers: [],
        };
        this.handleUserSearch = this.handleUserSearch.bind(this);
        this.filterUsers = this.filterUsers.bind(this);
    }

    componentDidMount() {
        this.props.loadUsers();
        this.filterUsers();
    }

    handleUserSearch(event) { 
        this.setState({userSearch: event.target.value});
        this.filterUsers();
    }

    filterUsers() {
        this.setState({
            allUsers: this.props.allUsers.filter(user =>{ return user.email.includes(this.state.userSearch)})
        });
    }

    render() {
        return (
            <div className="ClassUserList">
                <h2>User List</h2>
                <TextField          
                label="Email"
                value={this.state.userSearch}
                onChange={this.handleUserSearch}
                variant="outlined"
                />
                {this.state.allUsers &&
                <AutoSizer>
                    {({width, height}) => (
                        <List 
                        rowCount={this.state.allUsers.length} 
                        width={width - 10} 
                        height={height- 170} 
                        rowHeight={82} 
                        rowRenderer={({key, index, style})=>{
                            const user = this.state.allUsers[index];
                            return (
                                <div key={key} style={style}>
                                    <User {...user}/>
                                </div>
                            );
                        }} 
                        />
                    )}                    
                </AutoSizer>
                }
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