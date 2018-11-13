import React from "react";

class Chores extends React.Component {



    // Get profiles chores
    get_profile_chores(profile_id){

        const chores = [];

        // For each chores
        for(var i=0; i<this.props.member_list.state.event_data.chores.length; i++){

            // If the player has this chore
            if(this.props.member_list.state.event_data.chores[i].profile.id === profile_id){

                // For each profile chore
                for(var j=0; j<this.props.member_list.state.event_data.chores[i].chores.length; j++){

                    //console.log(this.props.member_list.state.event_data.chores[i].chores[j]);
                    chores.push(this.props.member_list.state.event_data.chores[i].chores[j]);
                }
            }
        }

        // Show chores in a column

        // No chore
        if(chores.length === 0){
            return(
                <div className={this.props.member_list.state.li_cell_class}>
                </div>)
        }

        // One chore
        else if(chores.length === 1){
            return(
                <div className={this.props.member_list.state.li_cell_class}>

                    <img className="icon_task" src={this.create_chore_icon_name(chores[0].icon_name)} alt="icon-task"/>

                    <div className="chore_name">
                        <img className="icon_delete_chore" src="Images/No.png" alt="delete_chore"
                             onClick={() => this.unassign_chore(chores[0], profile_id)}/>
                        {chores[0].name}
                    </div>

                </div>)
        }

        // > 1 chores
        else{
            return(
            <div className={this.props.member_list.state.li_cell_class}>

                <img className="icon_task" src="Images/icons_tasks/icon_box.svg" alt="icon-task"/>
                {chores.length}

                <div className="chore_name">

                    {chores.map(chore => (
                        this.add_chore_name(chore, profile_id)
                    ))}

                </div>
            </div>)
        }

    }

    create_chore_icon_name(icon_name){
        return("Images/icons_tasks/" + icon_name + ".svg");
    }

    add_chore_name(chore, profile_id){
        return(
            <span>
                <img className="icon_delete_chore" src="Images/No.png" alt="delete_chore"
                     onClick={() => this.unassign_chore(chore, profile_id)}/>
                {chore.name}
                <br/>
            </span>
        );
    }


    unassign_chore(chore, profile_id){

        this.props.member_list.setState({});

        const API_URL = 'http://api.local.sporteasy.net:8000/v2.1/teams/' + this.props.member_list.props.team_id + '/events/'
            + this.props.member_list.props.event_id + '/chores/' + profile_id + '/' + chore.id + '/';
        const bearer = this.props.member_list.props.bearer;

        // Request to change attendance
        fetch(API_URL, {
            method: "DELETE",
            headers: {
                "Authorization": bearer,
                "Content-Type": "application/json",
            },
        })
        .then(response =>
            console.log("Chore " + chore.name + " (" + chore.id + ") deleted of player " + profile_id + "."),
            this.props.member_list.get_api_event_data(),
        );
    }


    // Render Table
    render() {

        return (
            <span className={"chores"}>
                {this.get_profile_chores(this.props.result_profile.profile.id)}
            </span>
        );
    }
}

export default Chores;