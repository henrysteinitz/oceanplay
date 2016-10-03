import React from 'react';

const scale = window.devicePixelRatio;
const ground = 29;
const speed = .004;
const maxHeight = 20;
const minHeight = 12;
const width = 2;

class Logo extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      heights: [18, 14, 17, 18, 16, 14,16, 14,16],
      directions: [1,1,1,-1, -1,1,1,1,1],
      lastTime: Date.now()
    };
    this.update = this.update.bind(this);
  }

  componentDidMount(){
    this.setState({
      scale: window.devicePixelRatio,
      canvas: this.refs.canvas,
    });
    const context = this.refs.canvas.getContext('2d');
    context.scale(scale, scale);
    context.fillStyle = "#ffffff";
    //this.drawBars();
    setInterval(this.update, 1000/60);
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

  }

  render(){
    return ( <canvas ref="canvas" width="80" height="80" className="logo">igikugkjh</canvas> );
  }

}

export default Logo;
