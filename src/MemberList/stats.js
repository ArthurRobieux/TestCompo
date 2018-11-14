import React from "react";

class Stats extends React.Component {
    constructor(props) {
        super(props);
        this.state = {goals: '', passes: ''}
    }

    get_stats(){

        const profile_id = this.props.result_profile.profile.id;

        // For each player in stats
        for(var i=0; i<this.props.member_list.state.stats_data.players.length; i++){
            //console.log(this.props.member_list.state.stats_data.players[i]);

            // If stats correspond to the actual player
            if(this.props.member_list.state.stats_data.players[i].id === profile_id){
                try {
                    this.state.goals = this.props.member_list.state.stats_data.players[i].stats[0].stats[4].value;
                }
                catch (error) {
                    console.error('No stats goals');
                }

                try {
                    this.state.passes = this.props.member_list.state.stats_data.players[i].stats[0].stats[3].value;
                }
                catch (error) {
                    console.error('No stats passes');
                }
            }


        }
        console.log(this.props.member_list.state.stats_data.players);

    }

    show_past_stats(){

        this.get_stats();

        // Ici on dispose de la liste des stats ainsi que du profile du joueur.
        // Grâce à ces ID on va chercher la valeur de chacun de ces stats.
        if(this.props.member_list.state.event_data.is_past) {
            return (
                <span className={"list_stats"}>
                    {/*Stats Buts */}
                    {this.show_goals_data()}
                    {/*Stats Passe*/}
                    {this.show_passes_data()}
                </span>
            );
        }
    }

    show_goals_data(){
        return(
            <div className={this.props.member_list.state.li_cell_class}>
                {this.state.goals}
            </div>
        );
    }

    show_passes_data(){
        return(
            <div className={this.props.member_list.state.li_cell_class}>
                {this.state.passes}
            </div>
        );
    }


    // Render Table
    render() {

        return (
            <span className={"stats"}>
                {this.show_past_stats(this.props.result_profile.profile.id)}
            </span>
        );
    }
}

export default Stats;