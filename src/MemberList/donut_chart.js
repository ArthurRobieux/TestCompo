import React from "react";

class DonutChart extends React.Component{
    constructor(props) {
        super(props);
        const {size, percentage, stroke} = this.props;
        const {circumference, progress, radius} = this.calculatePaths();
        this.state = {
            size,
            percentage,
            stroke,
            circumference,
            progress,
            radius
        }
    }
    
  calculatePaths() {
      const {size, stroke ,percentage } = this.props;
      const radius = size/2;
      const circumference = 2 * Math.PI * radius;
      const progress = circumference - ((circumference * percentage) / 100);
      return {circumference, progress, radius}
  }
  
  tick(circle) {
      return (progress) => {
        circle.strokeDashoffset = progress
      } 
  }

  get_stroke_color(){

        if(this.state.percentage <= 10) {
            return ("#1b5e20");
        }
        else if(this.state.percentage <= 20){
            return("#388e3c");
        }
        else if(this.state.percentage <= 30){
            return("#4caf50");
        }
        else if(this.state.percentage <= 40){
            return("#689f38");
        }
        else if(this.state.percentage <= 50){
            return("#8bc34a");
        }
        else if(this.state.percentage <= 60){
            return("#f57c00");
        }
        else if(this.state.percentage <= 70){
            return("#f44336");
        }
        else if(this.state.percentage <= 80){
            return("#d32f2f");
        }
        else if(this.state.percentage <= 90){
            return("#b71c1c");
        }
        else if(this.state.percentage <= 100){
            return("#d50000");
        }
  }
  
    
    render() {
       const {size, stroke ,percentage, circumference, progress, radius } = this.state;
        const canvasSize = size+stroke;
         return (
           
           <svg width={canvasSize} height={canvasSize}> 
              <g>
                <circle transform = {`rotate(-90 ${canvasSize/2} ${canvasSize/2})`} fill="transparent" stroke={this.get_stroke_color()} strokeWidth={stroke-0.5}  cx={canvasSize/2} cy={canvasSize/2}  r={radius} />
                <circle  ref={(circle) => this.circle = circle} transform = {`rotate(-90 ${canvasSize/2} ${canvasSize/2})`} fill="transparent" stroke="white" strokeWidth={stroke}  cy={canvasSize/2} cx={canvasSize/2} r={radius}  strokeDasharray={circumference} strokeDashoffset={progress} />
            </g>
          </svg>
         )
    }
}

export default DonutChart;
