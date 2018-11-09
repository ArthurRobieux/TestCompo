import React from "react";

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
    }

    // Show and create the table
    show_table() {
        try {
            return (

                // Table
                <ul id="member_list">
                    {/* Loop on each groups */}
                    {this.state.data.attendees.map(group => (
                        //this.show_group(group)
                        <Group group={group} member_list={this}/>
                    ))}
                </ul>
            );
        }
        catch (error) {
            console.error('No data for the table');
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

    //Get data from API and stock them in state.data
    get_api_data() {

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