import React from "react";

import Member from './member.js';

class Group extends React.Component {

    define_head_id(group) {
        return ("header_" + group + "_members");
    }

    define_head_class(group) {
        return ("title_" + group + "_members");
    }

    define_body_id(group) {
        return ('body_' + group + "_members");
    }

    // Show or hide body of a group
    show_hide_group(group_slug_name) {
        this.setState({});

        const id = 'body_' + group_slug_name + '_members';

        if (document.getElementById(id).style.display === 'none') {
            document.getElementById(id).style.display = 'block';
        }
        else {
            document.getElementById(id).style.display = 'none';
        }
    }

    show_members_header(){
        const group_name = this.props.group.slug_name;
        // Future event
        if(group_name === 'available' || group_name === 'participant'){
            return(
                <div className="members_header">
                    <div className="li_cell_profile">Profile</div>
                    <div className="li_cell_chore">Chores</div>
                    <div className="li_cell_presence">Pres</div>
                </div>
            );
        }
        // Past event
        else if(group_name === 'played'){
            return(
                <div className="members_header">
                    <div className="li_cell_profile">Profile</div>
                    <div className="li_cell_chore">Chores</div>
                    <div className={this.props.member_list.state.li_cell_class}>Buts</div>
                    <div className={this.props.member_list.state.li_cell_class}>PD</div>
                    <div className={this.props.member_list.state.li_cell_class}>la</div>
                    <div className={this.props.member_list.state.li_cell_class}>li</div>
                    <div className={this.props.member_list.state.li_cell_class}>lo</div>
                    <div className="li_cell_presence">Pres</div>
                </div>
            );
        }
    }

    // Define class of cells in the table
    define_li_cell_class(){
        if(this.props.member_list.state.event_data.is_past){
            this.props.member_list.state.li_cell_class = 'li_cell_past';
        }
        else{
            this.props.member_list.state.li_cell_class = 'li_cell_future';
        }
    }

    // Render Table
    render() {

        this.define_li_cell_class();

        return (
            <li className="attendance_group">

                <div id={this.define_head_id(this.props.group.slug_name)}>
                    <div className={this.define_head_class(this.props.group.slug_name)}
                         onClick={() => this.show_hide_group(this.props.group.slug_name)}>
                        {this.props.group.localized_name} ({this.props.group.results.length})
                    </div>
                </div>

                {this.show_members_header()}

                <ul id={this.define_body_id(this.props.group.slug_name)}>
                    {/* Loop on each members of the group */}
                    {this.props.group.results.map(result_profile => (
                        <Member group={this.props.group} result_profile={result_profile}
                                member_list={this.props.member_list}/>
                    ))}
                </ul>

            </li>
        );
    }
}

export default Group;