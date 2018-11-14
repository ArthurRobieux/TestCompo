import React from "react";

class Note extends React.Component {

    show_moy(){
        if(this.props.member_list.state.event_data.is_past) {

            console.log('RATINGS DATA');
            console.log(this.props.member_list.state.ratings_data);

            return(
                <div className={this.props.member_list.state.li_cell_class}>
                    7
                </div>
            );
        }
    }

    show_note(){
        if(this.props.member_list.state.event_data.is_past) {
            return(
                <div className={this.props.member_list.state.li_cell_class}>
                    9.5
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