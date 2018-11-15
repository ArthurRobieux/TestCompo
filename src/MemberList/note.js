import React from "react";

import DonutChart from './donut_chart.js';

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
                    <span className={"donut_chart"}>
                        <DonutChart size={25} stroke={2} percentage={100-moy*10} />
                    </span>
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

            if(note===null || note ===-1){
                return(
                    <div className={this.props.member_list.state.li_cell_class}
                         onClick={() => this.rate_event_profile()}>
                        Noter
                    </div>
                );
            }

            return(
                <div className={this.props.member_list.state.li_cell_class}>
                    {note}
                    <span className={"donut_chart"}>
                        <DonutChart size={25} stroke={2} percentage={100-note*10} />
                    </span>
                </div>
            );
        }
    }

    rate_event_profile() {

        this.props.member_list.setState({});

        const profile_id = 154;
        const note = 7;

        var body_data = {};
        body_data[profile_id] = note;
        body_data = JSON.stringify(body_data);

        const API_URL = 'http://api.local.sporteasy.net:8000/v2.1/teams/' + this.props.member_list.props.team_id +
            '/events/' + this.props.member_list.props.event_id + '/profiles-ratings/';
        const bearer = this.props.member_list.props.bearer;

        // Request to change attendance
        fetch(API_URL, {
            method: "POST",
            headers: {
                "Authorization": bearer,
                "Content-Type": "application/json",
            },
            body: body_data,
        })
        .then(response =>
            this.props.member_list.setState({}),
            console.log("notation done")
        );


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