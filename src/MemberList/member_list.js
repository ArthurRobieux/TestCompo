import React from "react";

import Group from './group.js';

class MemberList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {attendance_group: [], event_data: {}, stats_data: {}, ratings_data: {}, notifications_list: []}
    }

    // Get attendance groups in state.event_data
    getAttendanceGroup() {

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
    showTable() {
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
    showNotificationsList() {
        return(
            <div id="notifications_list">
                {this.state.notifications_list.map(notification => (
                    this.showNotification(notification)
                ))}
            </div>
        );
    }

    showNotification(notification) {
        return(
            <div className={"notification"}>
                {notification}<br/>
            </div>
        );
    }

    //Get event_data from API and stock them in state.event_data
    getApiEventData() {

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
    getApiStatsData() {

        const API_URL = 'http://api.local.sporteasy.net:8000/v2.1/teams/'
            + this.props.team_id +'/events/' + this.props.event_id + '/stats/players/';

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

    //Get ratings_data from API and stock them in state.event_data
    getApiRatingsData() {

        const API_URL = 'http://api.local.sporteasy.net:8000/v2.1/teams/'
            + this.props.team_id +'/events/' + this.props.event_id + '/stats/players/ranking/';

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
            this.setState({ratings_data: json_response}),
        );
    }

    // Call this function at the beginning
    componentDidMount() {
        this.getApiEventData();
        this.getApiStatsData();
        this.getApiRatingsData();
    }

    // Render Table
    render() {

        this.getAttendanceGroup();

        return (
            <div>
                <h3>Table with API event_data (id={this.state.event_data.id})</h3>
                {this.showTable()}
                {this.showNotificationsList()}
            </div>
        );
    }
}

export default MemberList;