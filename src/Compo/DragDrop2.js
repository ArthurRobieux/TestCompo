import React, { Component } from 'react';
import { DragDropContainer, DropTarget } from 'react-drag-drop-container';

class DragDrop2 extends Component {

    showMessage(){
        console.log("Hello");
    }

    render() {
        return (
            <div>

                {/*A draggable*/}
                <DragDropContainer targetKey="foo"
                    onDragEnd={this.showMessage()} >

                    <div className={"draggableElement"}>Drag Me!</div>

                </DragDropContainer>

                <br/>


                {/*A droppable*/}
                <DropTarget targetKey="foo"
                    onHit={this.showMessage()}
                    onDragEnter={this.showMessage()}
                    onDragLeave={this.showMessage()} >

                    <div className={"droppableBox"}>I'm a drop target</div>


                                    {/*A draggable*/}
                <DragDropContainer targetKey="foo"
                    onDragEnd={this.showMessage()} >

                    <div className={"draggableElement"}>Drag Me!</div>

                </DragDropContainer>

                </DropTarget>

            </div>
        );
    }
}


export default DragDrop2;
