import React, {Component} from 'react';
import {connect} from 'react-redux';
import './ClassTestPage.scss';

class ClassTestPage extends Component {
    render() {
        return (
            <div className="ClassTestPage">
                <h2>Hello, {this.props.myUser.name}!</h2>
            </div>
        );        
    }
}

const mapStateToProps = (state) => {
    const {users: {myUser}} = state;
    return {myUser};
}

export default connect(mapStateToProps, null)(ClassTestPage);