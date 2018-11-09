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

    // Render Table
    render() {

        return (
            <li className="attendance_group">

                <div id={this.define_head_id(this.props.group.slug_name)}>
                    <div className={this.define_head_class(this.props.group.slug_name)}
                         onClick={() => this.show_hide_group(this.props.group.slug_name)}>
                        {this.props.group.localized_name} ({this.props.group.results.length})
                    </div>
                </div>

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