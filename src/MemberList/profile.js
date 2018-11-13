import React from "react";

class Profile extends React.Component {

    render() {
        return (
            <div className="li_cell_profile">
                <a href={"http://as-rocknroll.local.sporteasy.net:8000/profile/" + this.props.profile.id + "/"}>
                    <img src={this.props.profile.avatar["medium"]} alt="avatar" className={"avatar"}/>
                    <div className={"profile_name"}>
                        {this.props.profile.first_name} {this.props.profile.last_name}
                    </div>
                </a>
            </div>
        );
    }
}

export default Profile;