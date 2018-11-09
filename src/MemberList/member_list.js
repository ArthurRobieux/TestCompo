import React from "react";

import Member from './member.js';
import Group from './group.js';

class MemberList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {attendance_group: [], data: {}, notifications_list: []}
    }

    // Get attendance groups in state.data
    get_attendance_group() {


        this.state.attendance_group = [];

        try {
            for (var i = 0; i < this.state.data.attendance_groups.length; i++) {
                this.state.attendance_group.push(this.state.data.attendance_groups[i].slug_name);
            }
        }
        catch (error) {
            console.error('No data for attendance group');
        }
        //console.log(this.state.data);
    }

    // Show and create the table
    show_table() {
        try {
            return (
                // Table
                <ul id="member_list">
                    {/* Loop on each groups */}
                    {this.state.data.attendees.map(group => (
                        this.show_group(group)
                        // <Group group={group}/>
                    ))}
                </ul>
            );
        }
        catch (error) {
            console.error('No data for the table');
            return ("Loading..")
        }
    }

    // Show a group in the table
    show_group(group){
    /*  if(group.slug_name==="available"){
            return(
                <li className="attendance_group">
                    <div id={this.define_head_id(group.slug_name)}>
                        <div className={this.define_head_class(group.slug_name)}
                             onClick={() => this.show_hide_list(group.slug_name)}>
                            {group.localized_name} ({group.results.length})
                        </div>
                    </div>

                    <ul>
                        <li id="header_categories">
                            <div className="li_cell">First</div>
                            <div className="li_cell">Last</div>
                            <div className="li_cell">Nb</div>
                            <div className="li_cell">Group</div>
                            <div className="li_cell">Attendance</div>
                        </li>
                    </ul>

                    <ul id={this.define_body_id(group.slug_name)}>
                        {/!* Loop on each members of the group *!/}
                        {group.results.map(result_profile => (
                            this.show_member(group, result_profile)
                        ))}
                    </ul>
                </li>
            );
        }
        else {*/
        return (
            <li className="attendance_group">

                <div id={this.define_head_id(group.slug_name)}>
                    <div className={this.define_head_class(group.slug_name)}
                         onClick={() => this.show_hide_list(group.slug_name)}>
                        {group.localized_name} ({group.results.length})
                    </div>
                </div>

                <ul id={this.define_body_id(group.slug_name)}>
                    {/* Loop on each members of the group */}
                    {group.results.map(result_profile => (
                        this.show_member(group, result_profile)
                    ))}
                </ul>

            </li>
        );
        //}
    }

    // Show a member in a group
    show_member(group, result_profile){
        return(
            <li id={this.define_body_row_id(group.slug_name, result_profile.profile.id)}
                className={this.define_body_class(group.slug_name)}>
                <div className="li_cell">{result_profile.profile.first_name}</div>
                <div className="li_cell">{result_profile.profile.last_name}</div>
                <div className="li_cell">{group.results.length}</div>
                <div className="li_cell">{group.slug_name}</div>
                <div className="li_cell">{this.show_change_presence_logo(result_profile, group.slug_name)}</div>
            </li>
        );
    }

    // Show change_presence logo in the table
    show_change_presence_logo(result_profile, group_slug_name) {

        return (
            <span>
                {this.state.attendance_group.map(logo_group_slug_name => (
                    <img className="logo_presence" src={this.get_group_image(logo_group_slug_name)} alt="yes"
                         onClick={() => this.change_presence(result_profile, logo_group_slug_name, group_slug_name)}/>
                ))}
            </span>
        );
    }

    // Get the right image for each group
    get_group_image(group) {
        if (group === 'played' || group === 'available' || group === 'present' || group === 'waiting_list' || group === 'participant') {
            return ("Yes.png")
        }
        else if (group === 'rsvp') {
            return ("Waiting.png")
        }
        else if (group === 'not_selected') {
            return ("Not_Selected.png")
        }
        else {
            return ("No.png")
        }
    }

    // Call the API in order to change profile attendance
    change_presence(result_profile, new_group, previous_group) {

        this.setState({});

        const event_id = this.state.data.id;

        const API_URL = 'http://api.local.sporteasy.net:8000/v2.1/teams/' + this.props.team_id + '/events/'
            + event_id + '/profiles/' + result_profile.profile.id + '/';
        const bearer = this.props.bearer;

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
            this.state.notifications_list.push(result_profile.profile.first_name + " "
                + result_profile.profile.last_name + " update done."),
        );

        // OnClick, to avoid loading, profile is moved from group list to new group list

        // Get the position of the groups
        const new_group_pos = this.state.attendance_group.indexOf(new_group);
        const previous_group_pos = this.state.attendance_group.indexOf(previous_group);

        // Get the profile position in the previous group
        const profile_pos = this.state.data.attendees[previous_group_pos].results.indexOf(result_profile);

        // Add profile to the new group and delete from the previous
        this.state.data.attendees[previous_group_pos].results.splice(profile_pos, 1);
        this.state.data.attendees[new_group_pos].results.push(result_profile);
    }

    show_notifications_list() {
        return(
            <div id="notifications_list">
                {this.state.notifications_list.map(notification => (
                    this.show_notification(notification)
                ))}
            </div>
        );
    }

    show_notification(notification) {
        return(
            <div class="notification">
                {notification}<br/>
            </div>
        );
    }

    // Show or hide body of a group
    show_hide_list(group_slug_name) {
        this.setState({});

        const id = 'body_' + group_slug_name + '_members';

        if (document.getElementById(id).style.display === 'none') {
            document.getElementById(id).style.display = 'block';
        }
        else {
            document.getElementById(id).style.display = 'none';
        }
    }

    // Functions which define right CSS for groups

    define_head_id(group) {
        return ("header_" + group + "_members");
    }

    define_head_class(group) {
        return ("title_" + group + "_members");
    }

    define_body_id(group) {
        return ('body_' + group + "_members");
    }

    define_body_row_id(group, profile_id) {
        return (group + "_member_" + profile_id);
    }

    define_body_class(group) {
        return (group + "_members");
    }

    //Get data from API and stock them in state.data
    get_api_data() {
        fetch(this.props.API_URL, {
            method: "GET",
            headers: {
                "Authorization": this.props.bearer,
                "Content-Type": "application/json",
            }
        })
        .then(response =>
            response.json()
        )
        .then(json_response =>
            this.setState({data: json_response}),
        );
        console.log(this.state.data);
    }

    // Call this function at the beginning
    componentDidMount() {
        this.get_api_data();
    }

    // Render Table
    render() {

        this.get_attendance_group();

        return (
            <div className="member_list">
                <h3>Table with API data (id={this.state.data.id})</h3>
                {this.show_table()}
                {this.show_notifications_list()}
            </div>
        );
    }
}

export default MemberList;