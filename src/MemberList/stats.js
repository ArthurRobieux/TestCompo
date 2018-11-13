import React from "react";

class Stats extends React.Component {


    show_past_stats(){
        if(this.props.member_list.state.data.is_past) {
            return (
                <span className={"list_stats"}>
                    {/*Stats Buts */}
                    <div className={this.props.member_list.state.li_cell_class}>
                        B
                    </div>
                    {/*Stats Passe*/}
                    <div className={this.props.member_list.state.li_cell_class}>
                        P
                    </div>
                </span>
            );
        }
    }


    // Render Table
    render() {

        return (
            <span className={"stats"}>
                {this.show_past_stats(this.props.result_profile.profile.id)}
            </span>
        );
    }
}

export default Stats;