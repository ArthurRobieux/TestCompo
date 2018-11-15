import React from "react";


class RatingsSlider extends React.Component {


    rateEventProfile(note) {

        this.props.member_list.setState({});

        const profile_id = this.props.result_profile.profile.id;

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
            this.props.member_list.getApiEventData(),
            this.props.member_list.getApiStatsData(),
            this.props.member_list.getApiRatingsData(),
            console.log("Notation Done : Player " + profile_id + " / Note " + note),
        );


    }


    render() {
        return (
            <span className={"ratings_slider"}>
                <div>
                    <div className={"rate"} onClick={() => this.rateEventProfile(1)}>1 </div>
                    <div className={"rate"} onClick={() => this.rateEventProfile(2)}>2 </div>
                    <div className={"rate"} onClick={() => this.rateEventProfile(3)}>3 </div>
                    <div className={"rate"} onClick={() => this.rateEventProfile(4)}>4 </div>
                    <div className={"rate"} onClick={() => this.rateEventProfile(5)}>5 </div>
                    <div className={"rate"} onClick={() => this.rateEventProfile(6)}>6 </div>
                    <div className={"rate"} onClick={() => this.rateEventProfile(7)}>7 </div>
                    <div className={"rate"} onClick={() => this.rateEventProfile(8)}>8 </div>
                    <div className={"rate"} onClick={() => this.rateEventProfile(9)}>9 </div>
                    <div className={"rate"} onClick={() => this.rateEventProfile(10)}>10</div>
                </div>

            </span>
        );
    }
}

export default RatingsSlider;