import React, { Component } from 'react';

class CompoVanilla extends Component {

      constructor(props) {
          super(props);
          this.state = {
              actual_box: '',
          };
      }

    componentDidMount(){

        const fill = document.querySelector('.fill2');
        const empties = document.querySelectorAll('.empty2');

        fill.addEventListener('dragstart', dragStart);
        fill.addEventListener('dragend', dragEnd);

        for(const empty of empties) {
            empty.addEventListener('dragover', dragOver);
            empty.addEventListener('dragenter', dragEnter);
            empty.addEventListener('dragleave', dragLeave);
            empty.addEventListener('drop', dragDrop);
        }

        function dragStart() {
            console.log('start');

            this.className += ' hold';
            // setTimeout(() => this.className = 'invisible', 0);
        }

        function dragEnd() {
            console.log('end');

            this.className = 'fill2';
        }

        function dragOver(e) {
            e.preventDefault();
            console.log('over');
        }

        function dragEnter(e) {
            e.preventDefault();
            console.log('enter');
            console.log(this);

            this.className += ' hovered';
        }

        function dragLeave() {
            console.log('leave');
            console.log(this);

            this.className = 'empty2';
        }

        function dragDrop() {
            console.log('drop');
            this.className = 'empty2';
            this.append(fill);
        }

    }

    render() {
        return (
            <span>

                <div id={"compo"}>

                    <div id="box1" className="empty2"></div>
                    <div id="box2" className="empty2"></div>
                    <div id="box3" className="empty2"></div>
                    <div id="box4" className="empty2"></div>
                    <div id="box5" className="empty2"></div>

                </div>

                <div className="fill2" draggable="true"></div>

            </span>
        );
    }
}


export default CompoVanilla;
