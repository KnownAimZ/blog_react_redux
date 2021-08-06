import React, {Component} from "react";
import {connect} from "react-redux";
import ClassCreatePost from "./ClassCreatePost";
import ClassUserList from "./ClassUserList";
import ClassTestPage from "./ClassTestPage";
import ClassPostList from "./ClassPostList";
import './MultipleBlock.scss';

class MultipleBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMoving: false
        };
        this.setIsMoving = this.setIsMoving.bind(this);
        this.moveControl = this.moveControl.bind(this);        
    }

    setIsMoving(value) {
        this.setState({
            isMoving: value
        });
    }

    moveControl(event) {
        if(this.state.isMoving) {
            console.log();
            const {clientX, clientY} = event;
            this.setVars(`${clientX}px`, `${clientY-64}px`);
            
        }         
    }

    setVars(x, y) {
        document.documentElement.style.setProperty('--x-position', x);
        document.documentElement.style.setProperty('--y-position', y);
    }    

    render() {
        if(!this.props.token) {
            return <h2>Login please</h2>
        }        
        return (
            <div 
                className="MultipleBlock"
                onMouseDown={(event)=>{
                if(event.target.className==="control_point"){
                    this.setIsMoving(true)
                }
                }} 
                onMouseUp={()=>{
                    if(this.state.isMoving) {
                        this.setIsMoving(false)
                    }                    
                }} 
                onMouseMove={this.moveControl}
            >
                <ClassCreatePost/>
                <ClassUserList/>
                <ClassPostList/>
                <ClassTestPage/>
                <div className="control_point"></div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { auth:{token} } = state;
    return {token};
}

export default connect(mapStateToProps)(MultipleBlock);