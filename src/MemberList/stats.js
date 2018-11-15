import React from "react";

class Stats extends React.Component {
    constructor(props) {
        super(props);
        this.state = {player_stats_values: []}
    }

    showPastStats(){

        // Ici on dispose de la liste des stats ainsi que du profile du joueur.
        // Grâce à ces ID on va chercher la valeur de chacun de ces stats.
        if(this.props.member_list.state.event_data.is_past) {

            const profile_id = this.props.result_profile.profile.id;
            var player_stats_values = [];

            // For each player in stats
            for(var i=0; i<this.props.member_list.state.stats_data.players.length; i++){

                // If stats correspond to the actual player
                if(this.props.member_list.state.stats_data.players[i].profile.id === profile_id){

                    // Push each stat value in a list
                    for(var j=0; j<this.props.member_list.state.stats_data.players[i].stats.length; j++){
                        player_stats_values.push(this.props.member_list.state.stats_data.players[i].stats[j].value);
                    }

                    //player_stats_values.replace("0", "-");
                    for(var k=0; k<player_stats_values.length; k++) {
                        if(player_stats_values[k] === 0 || player_stats_values[k] === null){
                            player_stats_values[k] = '-';
                        }
                    }

                    this.state.player_stats_values = player_stats_values;

                }
            }

            return (
                <span className={"list_stats"}>

                    {this.state.player_stats_values.map(stat_value => (
                        <div className={"li_stats"}>
                            {stat_value}
                        </div>
                    ))}

                </span>
            );
        }

    }


    // Adapt li_stats width according to number of columns (stats)
    // Nb columns = nb stats
    adaptColumnSize() {
        if (this.props.member_list.state.event_data.is_past) {

            const elements = document.getElementsByClassName("li_stats");
            const width = 34 / (this.props.member_list.state.stats_data.categories[0].stats.length);
            const new_width = width.toString() + '%';

            for (var i = 0; i < elements.length; i++) {
                elements[i].style.width = new_width;
            }
            this.props.member_list.setState({});
        }
    }

    componentDidMount() {
        this.adaptColumnSize();
    }

    // Render Table
    render() {

        return (
            <span className={"stats"}>
                {this.showPastStats(this.props.result_profile.profile.id)}
            </span>
        );
    }
}

export default Stats;