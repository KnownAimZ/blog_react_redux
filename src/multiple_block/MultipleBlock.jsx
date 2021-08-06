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
        this.resizeWindow = this.resizeWindow.bind(this);        
    }

    componentDidMount() {
        window.addEventListener('resize', this.resizeWindow);
        this.setVars('50%','50%');
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeWindow);
    }

    resizeWindow(event) {
       if(!this.compareWidth(event.target.innerWidth)) {
           this.setVars(`${event.target.innerWidth-100}px`, null);
       }
       if(!this.compareHeight(event.target.innerHeight)) {
           this.setVars(null, `${event.target.innerHeight-100}px`);
       }
    }

    compareWidth(width) {
        const x = getComputedStyle(document.documentElement).getPropertyValue('--x-position');
        return width > parseInt(x) + 100;
    }

    compareHeight(height) {
        const y = getComputedStyle(document.documentElement).getPropertyValue('--y-position');
        return height > parseInt(y) + 100;
    }

    setIsMoving(value) {
        this.setState({
            isMoving: value
        });
    }

    moveControl(event) {
        if(this.state.isMoving) {
            const {clientX, clientY} = event;
            if
            (clientX + 100 <= window.innerWidth  &&
             clientX >= 100 &&
             clientY + 100 <= window.innerHeight  &&
             clientY >= 164) {
                this.setVars(`${clientX}px`, `${clientY-64}px`);
            }         
        }         
    }

    setVars(x, y) {
        if(x) {
            document.documentElement.style.setProperty('--x-position', x);
        }
        if(y) {
            document.documentElement.style.setProperty('--y-position', y);
        }       
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