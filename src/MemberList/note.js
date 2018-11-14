import React from "react";

class Note extends React.Component {

    show_moy(){

        // If past event
        if(this.props.member_list.state.event_data.is_past) {

            const profile_id = this.props.result_profile.profile.id;
            const ratings_data = this.props.member_list.state.ratings_data;
            var moy;

            // For each player
            for(var i=0; i<ratings_data.players.length; i++){

                // If it's actual member
                if(profile_id === ratings_data.players[i].profile.id){

                    moy = ratings_data.players[i].stats[1].value;

                }
            }

            if(moy===null){
                return(
                    <div className={this.props.member_list.state.li_cell_class}>
                        -
                    </div>
                );
            }

            return(
                <div className={this.props.member_list.state.li_cell_class}>
                    {moy}
                </div>
            );
        }
    }

    show_note(){
        // If past event
        if(this.props.member_list.state.event_data.is_past) {

            const profile_id = this.props.result_profile.profile.id;
            const ratings_data = this.props.member_list.state.ratings_data;
            var note;

            // For each player
            for(var i=0; i<ratings_data.players.length; i++){

                // If it's actual member
                if(profile_id === ratings_data.players[i].profile.id){

                    note = ratings_data.players[i].stats[2].value;

                }
            }

            if(note===null){
                return(
                    <div className={this.props.member_list.state.li_cell_class}>
                        Noter
                    </div>
                );
            }

            return(
                <div className={this.props.member_list.state.li_cell_class}>
                    {note}
                </div>
            );
        }
    }

    render() {
        return (
            <span className={"note"}>

                {this.show_moy()}
                {this.show_note()}

            </span>
        );
    }
}

export default Note;