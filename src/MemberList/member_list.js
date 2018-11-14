import React from "react";

import Group from './group.js';

class MemberList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {attendance_group: [], event_data: {}, stats_data: {}, notifications_list: [], li_cell_class:''}
    }

    // Get attendance groups in state.event_data
    get_attendance_group() {

        this.state.attendance_group = [];

        try {
            for (var i = 0; i < this.state.event_data.attendance_groups.length; i++) {
                this.state.attendance_group.push(this.state.event_data.attendance_groups[i].slug_name);
            }
        }
        catch (error) {
            console.error('No event_data for attendance group');
        }
    }

    // Show and create the table
    show_table() {
        try {
            return (

                // Table
                <ul id="member_list">
                    {/* Loop on each groups */}
                    {this.state.event_data.attendees.map(group => (
                        //this.show_group(group)
                        <Group group={group} member_list={this}/>
                    ))}
                </ul>
            );
        }
        catch (error) {
            console.error('No event_data for the table');
            return ("Loading..")
        }
    }

    // Show notifications
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

    //Get event_data from API and stock them in state.event_data
    get_api_event_data() {

        const API_URL = 'http://api.local.sporteasy.net:8000/v2.1/teams/'
            + this.props.team_id +'/events/' + this.props.event_id + '/';

        fetch(API_URL, {
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
            this.setState({event_data: json_response}),
        );
        console.log(this.state.event_data);
    }

        //Get event_data from API and stock them in state.event_data
    get_api_stats_data() {

        const API_URL = 'http://api.local.sporteasy.net:8000/v2.1/teams/'
            + this.props.team_id +'/events/' + this.props.event_id + '/stats/';

        fetch(API_URL, {
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
            this.setState({stats_data: json_response}),
        );
        //console.log(this.state.stats_data);
        console.log(this.state.stats_data);
    }

    // Call this function at the beginning
    componentDidMount() {
        this.get_api_event_data();
        this.get_api_stats_data();
    }

    // Render Table
    render() {

        this.get_attendance_group();

        return (
            <div>
                <h3>Table with API event_data (id={this.state.event_data.id})</h3>
                {this.show_table()}
                {this.show_notifications_list()}
            </div>
        );
    }
}

export default MemberList;