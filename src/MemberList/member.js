import React from "react";

import Profile from './profile.js';
import Chores from './chores.js';
import Stats from './stats.js';
import Note from './note.js';
import Presence from './presence.js';

class Member extends React.Component {
    constructor(props) {
        super(props);
        this.state = {chores: {}};
    }

    defineBodyRowId(group, profile_id) {
        return (group + "_member_" + profile_id);
    }

    defineBodyClass(group) {
        return (group + "_members");
    }

    // Render Table
    render() {

        return (
            <li id={this.defineBodyRowId(this.props.group.slug_name, this.props.result_profile.profile.id)}
                className={this.defineBodyClass(this.props.group.slug_name)}>

                {/*Profile*/}
                <Profile member_list={this.props.member_list} result_profile={this.props.result_profile}/>
                {/*Notes*/}
                <Note member_list={this.props.member_list} result_profile={this.props.result_profile}
                      group={this.props.group.slug_name}/>
                {/*Chores*/}
                <Chores member_list={this.props.member_list} result_profile={this.props.result_profile}/>
                {/*Presence*/}
                <Presence member_list={this.props.member_list} result_profile={this.props.result_profile}
                    group={this.props.group}/>
                {/*Stats*/}
                <Stats member_list={this.props.member_list} result_profile={this.props.result_profile}
                    group={this.props.group}/>

            </li>
        );
    }
}

export default Member;