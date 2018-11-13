import React from "react";

import Profile from './profile.js';

class Member extends React.Component {
    constructor(props) {
        super(props);
        this.state = {chores: {}};
    }

    // Show change_presence logo in the table
    show_change_presence_logo(result_profile, group_slug_name) {

        return (
            <div className={this.props.member_list.state.li_cell_class}>

                <div id={"show_logo_group"}>
                    <img className={"logo_presence"} src={"Images/Plus.png"} alt={"show_logo_group"} />
                </div>

                <span className={"logo_group"} >
                    {this.props.member_list.state.attendance_group.map(logo_group_slug_name => (
                        <img className="logo_presence" src={this.get_group_image(logo_group_slug_name)} alt="logo_presence"
                             onClick={() => this.change_presence(result_profile, logo_group_slug_name, group_slug_name)}/>
                    ))}
                </span>

            </div>
        );
    }

    // Get the right image for each group
    get_group_image(group) {
        if (group === 'played' || group === 'available' || group === 'present' || group === 'waiting_list' || group === 'participant') {
            return ("Images/Yes.png")
        }
        else if (group === 'rsvp') {
            return ("Images/Waiting.png")
        }
        else if (group === 'not_selected') {
            return ("Images/Not_Selected.png")
        }
        else {
            return ("Images/No.png")
        }
    }

    // Call the API in order to change profile attendance
    change_presence(result_profile, new_group, previous_group) {

        this.props.member_list.setState({});

        const API_URL = 'http://api.local.sporteasy.net:8000/v2.1/teams/' + this.props.member_list.props.team_id + '/events/'
            + this.props.member_list.props.event_id + '/profiles/' + result_profile.profile.id + '/';
        const bearer = this.props.member_list.props.bearer;

        // Request to change attendance
        fetch(API_URL, {
            method: "PUT",
            headers: {
                "Authorization": bearer,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "attendance_group": new_group,
            })
        })
        .then(response =>
            console.log(result_profile.profile.first_name + " update done."),
            this.props.member_list.state.notifications_list.push(result_profile.profile.first_name + " "
                + result_profile.profile.last_name + " update done."),
        );

        // OnClick, to avoid loading, profile is moved from group list to new group list

        // Get the position of the groups
        const new_group_pos = this.props.member_list.state.attendance_group.indexOf(new_group);
        const previous_group_pos = this.props.member_list.state.attendance_group.indexOf(previous_group);

        // Get the profile position in the previous group
        const profile_pos = this.props.member_list.state.data.attendees[previous_group_pos].results.indexOf(result_profile);

        // Add profile to the new group and delete from the previous
        this.props.member_list.state.data.attendees[previous_group_pos].results.splice(profile_pos, 1);
        this.props.member_list.state.data.attendees[new_group_pos].results.push(result_profile);
    }

    define_body_row_id(group, profile_id) {
        return (group + "_member_" + profile_id);
    }

    define_body_class(group) {
        return (group + "_members");
    }


    // Get profiles chores
    get_profile_chores(profile_id){

        const chores = [];

        // For each chores
        for(var i=0; i<this.props.member_list.state.data.chores.length; i++){

            // If the player has this chore
            if(this.props.member_list.state.data.chores[i].profile.id === profile_id){

                // For each profile chore
                for(var j=0; j<this.props.member_list.state.data.chores[i].chores.length; j++){

                    //console.log(this.props.member_list.state.data.chores[i].chores[j]);
                    chores.push(this.props.member_list.state.data.chores[i].chores[j]);
                }
            }
        }

        // Show chores in a column

        // No chore
        if(chores.length === 0){
            return(
                <div id="chores_icons" className={this.props.member_list.state.li_cell_class}>
                </div>)
        }

        // One chore
        else if(chores.length === 1){
            return(
                <div id="chores_icons" className={this.props.member_list.state.li_cell_class}>

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
            <div id="chores_icons" className={this.props.member_list.state.li_cell_class}>

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
            this.props.member_list.get_api_data(),
        );
    }

    show_past_stats(){
        if(this.props.member_list.state.data.is_past) {
            return (
                <div className={this.props.member_list.state.li_cell_class}>
                    -
                </div>
            );
        }
    }



    // Render Table
    render() {

        return (
            <li id={this.define_body_row_id(this.props.group.slug_name, this.props.result_profile.profile.id)}
                className={this.define_body_class(this.props.group.slug_name)}>

                {/*Profile*/}
                <Profile profile={this.props.result_profile.profile}/>
                {/*Chores*/}
                {this.get_profile_chores(this.props.result_profile.profile.id)}
                {/*Stats*/}
                {this.show_past_stats()}
                {/*Other*/}
                {this.show_change_presence_logo(this.props.result_profile, this.props.group.slug_name)}

            </li>
        );
    }
}

export default Member;