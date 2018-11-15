import React from "react";

import DonutChart from './donut_chart.js';
import RatingsSlider from './ratings_slider.js';

class Note extends React.Component {

    // Show average cell
    showAvg(){

        // If past event, calculate average
        if(this.props.member_list.state.event_data.is_past) {

            const profile_id = this.props.result_profile.profile.id;
            const ratings_data = this.props.member_list.state.ratings_data;
            var avg;

            // For each player
            for(var i=0; i<ratings_data.players.length; i++){

                // If it's actual member
                if(profile_id === ratings_data.players[i].profile.id){

                    avg = ratings_data.players[i].stats[1].value;

                }
            }

            // If no average, show '-'
            if(avg===null || avg===undefined){
                return(
                    <div className={this.props.member_list.state.li_cell_class}>
                        -
                    </div>
                );
            }

            // Else, show donut with note
            return(
                <div className={this.props.member_list.state.li_cell_class}>
                    {avg}
                    <span className={"donut_chart"}>
                        <DonutChart size={25} stroke={2} percentage={100-avg*10} />
                    </span>
                </div>
            );
        }
    }

    // Show note cell
    showNote(){

        // If past event, get note
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

            // If no note, show ratings slider
            if(note===null || note ===-1 || note ===undefined){
                return(
                    <div className={this.props.member_list.state.li_cell_class}>
                        {this.showRatingsSlider()}
                    </div>
                );
            }

            // Else, show donut with note
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

    // Show ratings slider
    showRatingsSlider(){

        // If match played, show ratings slider
        if(this.props.group==="played") {
            return (
                <span>
                <span id={"show_ratings_slider"}>Noter</span>
                <RatingsSlider member_list={this.props.member_list} result_profile={this.props.result_profile}/>
            </span>
            );
        }

        // Else, show '-'
        return(
            <span> - </span>
        );
    }


    render() {
        return (
            <span className={"notes"}>
                {this.showAvg()}
                {this.showNote()}
            </span>
        );
    }
}

export default Note;