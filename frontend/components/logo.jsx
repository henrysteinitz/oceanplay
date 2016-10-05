import React from 'react';

const scale = window.devicePixelRatio;
const ground = 29;
const speed = .004;
const maxHeight = 20;
const minHeight = 12;
const width = 2;
const reqAnimFrame =  window.requestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame     ||
    window.oRequestAnimationFrame;

class Logo extends React.Component {

  constructor(props){
    super(props);
    let scaleFactor = 1
    if (this.props.type === 'signin'){
      scaleFactor = 3;
    }

    this.state = {
      heights: [18, 14, 17, 18, 16, 14,16, 14,16],
      directions: [1,1,1,-1, -1,1,1,1,1],
      lastTime: Date.now(),
      scaleFactor: window.devicePixelRatio*scaleFactor
    };
    this.update = this.update.bind(this);
  }

  componentDidMount(){
    const scale = this.state.scaleFactor;
    this.setState({
      canvas: this.refs.canvas,
    });
    const context = this.refs.canvas.getContext('2d');
    context.scale(scale, scale);
    context.fillStyle = "#ffffff";

    reqAnimFrame(this.update);
  }

  drawBars(){
    const context = this.refs.canvas.getContext('2d');
    context.clearRect(0, 0, this.state.canvas.width, this.state.canvas.height);
    for (let i = 0; i < this.state.heights.length; i++){
      const xCoordinate = i*4 + 3;
      const height = this.state.heights[i];
      context.fillRect(xCoordinate, ground - height, width, height);
    }
  }

  update(){
    const now = Date.now();
    const dt = now - this.state.lastTime;
    const newHeights = [0, 0, 0, 0];
    const newDirections = [];

    if (dt < 500){ // This conditional prevents weird behavior when window is inactive
      for (let i = 0; i < this.state.heights.length; i++){
        if (this.state.heights[i] >= maxHeight){
          newDirections.push(-1);
        } else if (this.state.heights[i] <= minHeight){
          newDirections.push(1);
        } else {
          newDirections.push(this.state.directions[i]);
        }
        newHeights[i] = this.state.heights[i] + newDirections[i] * speed * dt;
      }
      this.setState({
        heights: newHeights,
        lastTime: now,
        directions: newDirections
      });
      this.drawBars();
    } else {
      this.setState({
        lastTime: now
      });
    }
    reqAnimFrame(this.update)
  }

  render(){
    let classes = "";
    let width = 40*this.state.scaleFactor;
    if (this.props.type === 'menu'){
      classes = "logo menu-logo";
    } else {
      classes = "logo signin-logo";
    }
    return (
        <canvas ref="canvas" width={width} height={width} className={classes}></canvas>
    );
  }

}

export default Logo;
