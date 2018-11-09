import React from "react";

class Profile extends React.Component {

    render() {

        console.log(this.props.profile);
        return (
            <div className="li_cell_profile">
                <span><img src={this.props.profile.avatar["small"]} alt="avatar"/></span>
                <span> {this.props.profile.first_name} </span>
                <span>{this.props.profile.last_name} </span>
            </div>
        );
    }
}

export default Profile;