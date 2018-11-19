import React from "react";

class Profile extends React.Component {


    show_presence() {

        if(this.props.member_list.state.event_data.is_past) {

            const presence = this.props.result_profile.presence.slug_name;

            if (presence === 'on_time') {
                return (
                    <img className={"logo_presence"} src={"Images/Yes.png"} alt={"show_logo_group"}/>
                );
            }
            else if (presence === 'late') {
                return (
                    <img className={"logo_presence"} src={"Images/Late.png"} alt={"show_logo_group"}/>
                );
            }
            else if (presence === 'not_excused') {
                return (
                    <img className={"logo_presence"} src={"Images/NotExcused.png"} alt={"show_logo_group"}/>
                );
            }
            else {
                return (
                    <img className={"logo_presence"} src={"Images/No.png"} alt={"show_logo_group"}/>
                );
            }
        }

    }

    render() {
        return (
            <div className="li_profile">
                <a href={"http://as-rocknroll.local.sporteasy.net:8000/profile/" + this.props.result_profile.profile.id + "/"}>
                    <img src={this.props.result_profile.profile.avatar["medium"]} alt="avatar" className={"avatar"}/>
                    {/*{this.show_presence()}*/}
                    <div className={"profile_name"}>
                        {this.props.result_profile.profile.first_name} {this.props.result_profile.profile.last_name}
                    </div>
                </a>
            </div>
        );
    }
}

export default Profile;