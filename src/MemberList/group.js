import React from "react";

import Member from './member.js';

class Group extends React.Component {

    defineHeadId(group) {
        return ("header_" + group + "_members");
    }

    defineHeadClass(group) {
        return ("title_" + group + "_members");
    }

    defineBodyId(group) {
        return ('body_' + group + "_members");
    }

    // Show or hide body of a group
    showHideGroup(group_slug_name) {
        this.setState({});

        const id = 'body_' + group_slug_name + '_members';

        if (document.getElementById(id).style.display === 'none') {
            document.getElementById(id).style.display = 'block';
        }
        else {
            document.getElementById(id).style.display = 'none';
        }
    }

    showMembersHeader(){
        const group_name = this.props.group.slug_name;
        // Future event
        if(group_name === 'available' || group_name === 'participant'){
            return(
                <div className="members_header">
                    <div className="li_profile">Profile</div>
                    <div className="li_chore">Chores</div>
                    <div className="li_presence">Pres</div>
                </div>
            );
        }
        // Past event (future + stats + note)
        else if(group_name === 'played'){

            const list_stats = [];
            for(var i=0; i<this.props.member_list.state.stats_data.categories[0].stats.length; i++){
                list_stats.push(this.props.member_list.state.stats_data.categories[0].stats[i].localized_name_short);
            }

            return(
                <div className="members_header">
                    <div className={"li_profile"}>Profile</div>
                    <div className={"li_ratings"}>Moy</div>
                    <div className={"li_ratings"}>Note</div>
                    <div className={"li_chore"}>Chores</div>
                    <div id={"stats"}>
                        {list_stats.map(stat => (
                            <div className={"li_stats"}>{stat}</div>
                        ))}
                    </div>
                    <div className="li_presence">Pres</div>
                </div>
            );
        }
    }

    // Render Table
    render() {

        return (
            <li className="attendance_group">

                <div id={this.defineHeadId(this.props.group.slug_name)}>
                    <div className={this.defineHeadClass(this.props.group.slug_name)}
                         onClick={() => this.showHideGroup(this.props.group.slug_name)}>
                        {this.props.group.localized_name} ({this.props.group.results.length})
                    </div>
                </div>

                {this.showMembersHeader()}

                <ul id={this.defineBodyId(this.props.group.slug_name)}>
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