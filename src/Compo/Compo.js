import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);

    // If destination = banc
    if(droppableDestination.droppableId === "box_banc") {
        const [removed] = sourceClone.splice(droppableSource.index, 1);
        destClone.splice(droppableDestination.index, 0, removed);
    }
    // If destination = terrain and exist on player
    else if(destination.length===1){
        const a = sourceClone[droppableSource.index];
        sourceClone[droppableSource.index] = destClone[droppableDestination.index];
        destClone[droppableDestination.index] = a;
    }
    // If destination = terrain and no player
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
            {id: 'draggable_1', first_name: 'Joueur', last_name: '1', avatar: 'https://d1xnylx7e97tlg.cloudfront.net/static/f163579ce/themes/v1/images/common/default/avatar/small.jpg'},
            {id: 'draggable_2', first_name: 'Joueur', last_name: '2', avatar: 'https://d1xnylx7e97tlg.cloudfront.net/static/f163579ce/themes/v1/images/common/default/avatar/small.jpg'},
            {id: 'draggable_3', first_name: 'Joueur', last_name: '3', avatar: 'https://d1xnylx7e97tlg.cloudfront.net/static/f163579ce/themes/v1/images/common/default/avatar/small.jpg'},
        ],
        items_position_1: [],
        items_position_2: [],
        items_position_3: [],
        items_position_4: [],
        items_position_5: [],
        items_position_6: [],
        items_position_7: [],

    };

    id2List = {
        box_banc: 'items_banc',
        box_position_1: 'items_position_1',
        box_position_2: 'items_position_2',
        box_position_3: 'items_position_3',
        box_position_4: 'items_position_4',
        box_position_5: 'items_position_5',
        box_position_6: 'items_position_6',
        box_position_7: 'items_position_7',
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

    showState(){
        console.log(this.state);
        console.log(this.props.data.attendees[0].results);
    }

    // Create new players with Json
    createPlayers(){

        const players = this.props.data.attendees[0].results;

        let items_banc = [];

        for(var i=0; i<players.length; i++){
            console.log(players[i].profile);

            let player = {};

            player['id'] = players[i].profile.id;
            player['first_name'] = players[i].profile.first_name;
            player['last_name'] = players[i].profile.last_name;
            player['avatar_small'] = players[i].profile.avatar["small"];
            player['avatar_medium'] = players[i].profile.avatar["medium"];
            player['avatar_120x120'] = players[i].profile.avatar["120x120"];

            items_banc.push(player);

        }

        this.setState({items_banc: items_banc})

    }

    componentDidMount(){
        this.createPlayers();
    }

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    render() {
        return (

            <DragDropContext onDragEnd={this.onDragEnd}>

                {/*COMPO*/}

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
                                                    className={"draggablePositionElement"}>

                                                    <img src={item.avatar_120x120} alt={"avatar"} className={"compo_avatar"}/>
                                                    {item.first_name}

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
                                                    className={"draggablePositionElement"}>

                                                    <img src={item.avatar_120x120} alt={"avatar"} className={"compo_avatar"}/>
                                                    {item.first_name}

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
                                                    className={"draggablePositionElement"}>

                                                    <img src={item.avatar_120x120} alt={"avatar"} className={"compo_avatar"}/>
                                                    {item.first_name}

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
                                                    className={"draggablePositionElement"}>

                                                    <img src={item.avatar_120x120} alt={"avatar"} className={"compo_avatar"}/>
                                                    {item.first_name}

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


                    <div className={"box_position_5"}>

                        <Droppable droppableId="box_position_5">

                            {(provided) => (

                                <div ref={provided.innerRef} className={"boxPosition"}>

                                    {this.state.items_position_5.map((item, index) => (
                                        <Draggable
                                            key={item.id}
                                            draggableId={item.id}
                                            index={index}>

                                            {(provided) => (

                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className={"draggablePositionElement"}>

                                                    <img src={item.avatar_120x120} alt={"avatar"} className={"compo_avatar"}/>
                                                    {item.first_name}

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


                    <div className={"box_position_6"}>

                        <Droppable droppableId="box_position_6">

                            {(provided) => (

                                <div ref={provided.innerRef} className={"boxPosition"}>

                                    {this.state.items_position_6.map((item, index) => (
                                        <Draggable
                                            key={item.id}
                                            draggableId={item.id}
                                            index={index}>

                                            {(provided) => (

                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className={"draggablePositionElement"}>

                                                    <img src={item.avatar_120x120} alt={"avatar"} className={"compo_avatar"}/>
                                                    {item.first_name}

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


                    <div className={"box_position_7"}>

                        <Droppable droppableId="box_position_7">

                            {(provided) => (

                                <div ref={provided.innerRef} className={"boxPosition"}>

                                    {this.state.items_position_7.map((item, index) => (
                                        <Draggable
                                            key={item.id}
                                            draggableId={item.id}
                                            index={index}>

                                            {(provided) => (

                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className={"draggablePositionElement"}>

                                                    <img src={item.avatar_120x120} alt={"avatar"} className={"compo_avatar"}/>
                                                    {item.first_name}

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


                {/*BANC*/}

                <div id={"banc"}>

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
                                                className={"draggableBancElement"}>

                                                <img src={item.avatar_small} alt={"avatar"}/>
                                                {item.first_name} {item.last_name}

                                            </div>

                                        )}
                                    </Draggable>

                                ))}

                                {/*Permet de prolonger la liste quand on ajoute un élément*/}
                                {provided.placeholder}

                            </div>

                        )}

                    </Droppable>

                    <button onClick={() => this.showState()}>Show State</button>

                </div>

            </DragDropContext>
        );
    }
}


export default Compo;