import React, {Component} from 'react';
import {connect} from 'react-redux';
import './ClassPostList.scss';

class ClassPostList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="ClassPostList">
                <h1>Posts here</h1>
            </div>
        );
    }
};

const mapStateToProps = (state) => {

} 

const mapDispatchToProps = (dispatch) => {

}

export default connect (null, null)(ClassPostList);