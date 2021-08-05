import React, {Component} from "react";
import ClassCreatePost from "./ClassCreatePost";
import ClassUserList from "./ClassUserList";
import ClassTestPage from "./ClassTestPage";
import ClassPostList from "./ClassPostList";
import ControlPoint from "./ControlPoint";
import './MultipleBlock.scss';

class MultipleBlock extends Component {
    render() {
        return (
            <div className="MultipleBlock">
                <ClassCreatePost/>
                <ClassUserList/>
                <ClassPostList/>
                <ClassTestPage/>
                <ControlPoint/>
            </div>
        );
    }
}

export default MultipleBlock;