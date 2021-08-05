import React, {Component} from 'react';
import './ControlPoint.scss';

class ControlPoint extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMoving: false
        };
        this.setIsMoving = this.setIsMoving.bind(this);
        this.moveControl = this.moveControl.bind(this);        
    }

    componentDidMount() {
        this.getVars();
    }

    setIsMoving(value) {
        this.setState({
            isMoving: value
        });
    }

    moveControl(event) {
        if(this.state.isMoving) {
            const {clientX, clientY} = event;
            this.setVars(`${clientX}px`, `${clientY-64}px`);
            
        }         
    }

    getVars() {
        const xpos = getComputedStyle(document.documentElement).getPropertyValue('--x-position'); 
        const ypos = getComputedStyle(document.documentElement).getPropertyValue('--y-position');
        this.setState({
            positionX: xpos,
            positionY: ypos,
        }); 
    }

    setVars(x, y) {
        // console.log(`setVars: ${x},${y}`);
        document.documentElement.style.setProperty('--x-position', x);
        document.documentElement.style.setProperty('--y-position', y);
    }    

    render(){
        return (
            <div 
                className="control_point" 
                onMouseDown={()=>{this.setIsMoving(true)}} 
                onMouseUp={()=>{this.setIsMoving(false)}} 
                onMouseMove={this.moveControl} 
            ></div>
        );
    }
};

export default ControlPoint;