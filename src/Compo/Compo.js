import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);

    console.log(source);
    console.log(destination);
    console.log(droppableSource);
    console.log(droppableDestination);

    // If destination = banc
    if(droppableDestination.droppableId === "box_banc") {
        const [removed] = sourceClone.splice(droppableSource.index, 1);
        destClone.splice(droppableDestination.index, 0, removed);
    }
    // If destination = terrain
    else if(destination.length===1){
        console.log("position = 1");

        // Add and delete draggable element
        // const [removed] = sourceClone.splice(droppableSource.index, 1);
        // destClone.splice(droppableDestination.index, 0, removed);

        const a = sourceClone[droppableSource.index];
        sourceClone[droppableSource.index] = destClone[droppableDestination.index];
        destClone[droppableDestination.index] = a;


    }
    else{
        const [removed] = sourceClone.splice(droppableSource.index, 1);
        destClone.splice(droppableDestination.index, 0, removed);
    }

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;

};


class Compo extends Component {
    state = {
        items_banc: [
            {id: 'draggable_1', content: 'J1', name: 'Joueur 1', avatar: 'https://d1xnylx7e97tlg.cloudfront.net/static/f163579ce/themes/v1/images/common/default/avatar/small.jpg'},
            {id: 'draggable_2', content: 'J2', name: 'Joueur 2', avatar: 'https://d1xnylx7e97tlg.cloudfront.net/static/f163579ce/themes/v1/images/common/default/avatar/small.jpg'},
            {id: 'draggable_3', content: 'J3', name: 'Joueur 3', avatar: 'https://d1xnylx7e97tlg.cloudfront.net/static/f163579ce/themes/v1/images/common/default/avatar/small.jpg'},
            {id: 'draggable_4', content: 'J4', name: 'Joueur 4', avatar: 'https://d1xnylx7e97tlg.cloudfront.net/static/f163579ce/themes/v1/images/common/default/avatar/small.jpg'},
            {id: 'draggable_5', content: 'J5', name: 'Joueur 5', avatar: 'https://d1xnylx7e97tlg.cloudfront.net/static/f163579ce/themes/v1/images/common/default/avatar/small.jpg'},
        ],
        items_position_1: [],
        items_position_2: [],
        items_position_3: [],
        items_position_4: [],

    };

    id2List = {
        box_banc: 'items_banc',
        box_position_1: 'items_position_1',
        box_position_2: 'items_position_2',
        box_position_3: 'items_position_3',
        box_position_4: 'items_position_4',
    };

    getList = id => this.state[this.id2List[id]];

    onDragEnd = result => {
        const { source, destination } = result;

        // this.showConsoleMessage(result);

        // dropped outside the list
        if (!destination) {
            return;
        }

        // Same source/destination
        if (source.droppableId === destination.droppableId) {
            console.log("Source and destination are the same.");
            this.setState();
        }
        // Move element from source to destination
        else{
            const result = move(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination
            );

            // console.log(result);

            // Destination
            // console.log(Object.keys(result)[1]);

            // if(Object.keys(result)[1] !== "box_banc"){
            //
            //     console.log("destination not banc");
            // }

            console.log(this.id2List[source.droppableId]);
            console.log(result[source.droppableId]);

            // Update the 2 modified steps
            this.setState({
                [this.id2List[source.droppableId]]: result[source.droppableId],
                [this.id2List[destination.droppableId]]: result[destination.droppableId],
            })

        }
    };

    showConsoleMessage(result){
        console.log("DRAG N DROP");
        console.log("Element id : " + result.draggableId);
        console.log("Source box id : " + result.source.droppableId);
        console.log("Destination box id : " + result.destination.droppableId);
    }

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    render() {
        return (

            <DragDropContext onDragEnd={this.onDragEnd}>

                <div id={"banc"}>

                    <h3>Banc</h3>

                    <Droppable droppableId="box_banc">

                        {(provided) => (

                            <div ref={provided.innerRef} className={"boxBanc"}>

                                {this.state.items_banc.map((item, index) => (
                                    <Draggable
                                        key={item.id}
                                        draggableId={item.id}
                                        index={index}>

                                        {(provided) => (

                                            <div ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className={"draggableElement"}>

                                                <img src={item.avatar} alt={"avatar"}/> {item.name}

                                            </div>

                                        )}
                                    </Draggable>

                                ))}




                                {/*Permet de prolonger la liste quand on ajoute un élément*/}
                                {/*{provided.placeholder}*/}

                            </div>

                        )}

                    </Droppable>

                </div>


                <div id={"compo"}>

                    <div className={"box_position_1"}>

                        <Droppable droppableId="box_position_1">

                            {(provided) => (

                                <div ref={provided.innerRef} className={"boxPosition"}>

                                    {this.state.items_position_1.map((item, index) => (
                                        <Draggable
                                            key={item.id}
                                            draggableId={item.id}
                                            index={index}>

                                            {(provided) => (

                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className={"draggableElement"}>

                                                    <img src={item.avatar} alt={"avatar"}/> {item.content}

                                                </div>

                                            )}
                                        </Draggable>

                                    ))}

                                    {/*Permet de prolonger la liste quand on ajoute un élément*/}
                                    {/*{provided.placeholder}*/}

                                </div>

                            )}

                        </Droppable>

                    </div>

                    <div className={"box_position_2"}>

                        <Droppable droppableId="box_position_2">

                            {(provided) => (

                                <div ref={provided.innerRef} className={"boxPosition"}>

                                    {this.state.items_position_2.map((item, index) => (
                                        <Draggable
                                            key={item.id}
                                            draggableId={item.id}
                                            index={index}>

                                            {(provided) => (

                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className={"draggableElement"}>

                                                    <img src={item.avatar} alt={"avatar"}/> {item.content}

                                                </div>

                                            )}
                                        </Draggable>

                                    ))}


                                    {/*Permet de prolonger la liste quand on ajoute un élément*/}
                                    {/*{provided.placeholder}*/}

                                </div>

                            )}

                        </Droppable>

                    </div>


                    <div className={"box_position_3"}>

                        <Droppable droppableId="box_position_3">

                            {(provided) => (

                                <div ref={provided.innerRef} className={"boxPosition"}>

                                    {this.state.items_position_3.map((item, index) => (
                                        <Draggable
                                            key={item.id}
                                            draggableId={item.id}
                                            index={index}>

                                            {(provided) => (

                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className={"draggableElement"}>

                                                    <img src={item.avatar} alt={"avatar"}/> {item.content}

                                                </div>

                                            )}
                                        </Draggable>

                                    ))}


                                    {/*Permet de prolonger la liste quand on ajoute un élément*/}
                                    {provided.placeholder}

                                </div>

                            )}

                        </Droppable>

                    </div>


                    <div className={"box_position_4"}>

                        <Droppable droppableId="box_position_4">

                            {(provided) => (

                                <div ref={provided.innerRef} className={"boxPosition"}>

                                    {this.state.items_position_4.map((item, index) => (
                                        <Draggable
                                            key={item.id}
                                            draggableId={item.id}
                                            index={index}>

                                            {(provided) => (

                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className={"draggableElement"}>

                                                    <img src={item.avatar} alt={"avatar"}/> {item.content}

                                                </div>

                                            )}
                                        </Draggable>

                                    ))}


                                    {/*Permet de prolonger la liste quand on ajoute un élément*/}
                                    {provided.placeholder}

                                </div>

                            )}

                        </Droppable>

                    </div>

                </div>

            </DragDropContext>
        );
    }
}


export default Compo;