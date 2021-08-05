import React, {Component} from "react";
import ClassCreatePost from "./ClassCreatePost";
import ClassUserList from "./ClassUserList";
import ClassTestPage from "./ClassTestPage";
import './MultipleBlock.scss';
import ClassPostList from "./ClassPostList";

class MultipleBlock extends Component {

    render() {
        return (
            <div className="MultipleBlock">
                <ClassCreatePost/>
                <ClassUserList/>
                <ClassPostList/>
                <ClassTestPage/>
            </div>
        );
    }
}

export default MultipleBlock;