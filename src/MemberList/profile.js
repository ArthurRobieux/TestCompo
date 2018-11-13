import React from "react";

class Profile extends React.Component {

    render() {
        return (
            <div className="li_cell_profile">
                <a href={"http://as-rocknroll.local.sporteasy.net:8000/profile/" + this.props.profile.id + "/"}>
                    <span><img src={this.props.profile.avatar["small"]} alt="avatar"/></span>
                    <span> {this.props.profile.first_name} </span>
                    <span>{this.props.profile.last_name} </span>
                    <span>{this.props.profile.id} </span>
                </a>
            </div>
        );
    }
}

export default Profile;