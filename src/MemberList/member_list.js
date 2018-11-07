import React from "react";

class MemberList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { attendance_group: [], data: {} }
    }

    // Get attendance groups in state.data
    get_attendance_group(){

        this.state.attendance_group = [];

        try {
            for (var i = 0; i < this.state.data.attendance_groups.length; i++) {
                this.state.attendance_group.push(this.state.data.attendance_groups[i].slug_name);
            }
        }
        catch(error) {
            console.error('No data for attendance group');
        }
        //console.log(this.state.data);
    }

    // Show change_presence logo in the table
    show_change_presence(profile){

        return(
            <span>
                {this.state.attendance_group.map(group => (
                <img className="logo_presence" src={this.get_group_image(group)} alt="yes" onClick={() => this.change_presence(profile.id, group)}/>
                ))}
            </span>
        );
    }

    // Get the right image for each group
    get_group_image(group){
        if(group==='played' || group==='available' || group==='present' || group==='waiting_list' || group==='participant'){
            return("Yes.png")
        }
        else if(group==='rsvp'){
            return("Waiting.png")
        }
        else if(group==='not_selected'){
            return("Not_Selected.png")
        }
        else{
            return("No.png")
        }
    }

    // Call the API in order to change profile attendance
    change_presence(profile_id, attendance){

        this.setState({});

        const event_id = this.state.data.id;

        const API_URL = 'http://api.local.sporteasy.net:8000/v2.1/teams/' + this.props.team_id + '/events/'
        + event_id + '/profiles/' + profile_id + '/';
        const bearer = this.props.bearer;

        // Requête pour modifier le groupe
        // A la fin de la requête on recharge les données de l'API
        fetch(API_URL, {
            method: "PUT",
            headers: {
                "Authorization": bearer,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "attendance_group": attendance,
            })
        })
        .then(response =>
        this.get_api_data(),
        )
    }

    // Show or hide body of a group
    show_hide_list(group_slug_name){
        this.setState({});

        const id = 'body_' + group_slug_name + '_members';

        if(document.getElementById(id).style.display === 'table-row-group') {
            document.getElementById(id).style.display = 'none';
        }
        else{
            document.getElementById(id).style.display = 'table-row-group';
        }
    }

    // Functions which define right CSS for groups

    define_head_id(group){
        return("header_" + group + "_members");
    }

    define_head_class(group){
        return("title_" + group + "_members");
    }

    define_body_id(group){
        return('body_' + group + "_members");
    }

    define_body_class(group){
        return(group + "_members");
    }

    // Show and create the table
    show_table(){
        try {
            return (
                // Table
                <table>

                    {/* On boucle sur chacun des groupes */}
                    {this.state.data.attendees.map(item => (
                    <div id="attendance_group">
                        
                        <thead id={this.define_head_id(item.slug_name)}>

                            <tr className={this.define_head_class(item.slug_name)} onClick={() => this.show_hide_list(item.slug_name)}>
                                <th colSpan="5">{item.localized_name} ({item.results.length})</th>
                            </tr>

                        </thead>

                        <tbody id={this.define_body_id(item.slug_name)}>

                            {/* On boucle sur les joueurs du groupe */}
                            {item.results.map(result => (

                            <tr className={this.define_body_class(item.slug_name)} key={result.id} >
                                <td>{result.profile.first_name}</td>
                                <td>{result.profile.last_name}</td>
                                <td>{item.results.length}</td>
                                <td>{item.slug_name}</td>
                                <td>{this.show_change_presence(result.profile, item.slug_name)}</td>
                            </tr>
                            ))}
                        </tbody>


                    </div>
                    ))}

                </table>

            );
        }
        catch(error) {
            console.error('No data for the table');
            return("Loading..")
        }

    }

    //Get data from API and stock them in state.data
    get_api_data(){
        fetch(this.props.API_URL, {
            method: "GET",
            headers: {
                "Authorization": this.props.bearer,
                "Content-Type": "application/json",
            }
        })
        .then(response =>
            response.json()
        )
        .then(json_response =>
            this.setState({ data: json_response}),
        );
        console.log(this.state.data);
    }

    // Call this function at the beginning
    componentDidMount() {
        this.get_api_data();
    }

    // Render Table
    render() {

        this.get_attendance_group();

        return (
            <div className="member_list">
                <h3>Table with API data (id={this.state.data.id})</h3>
                {this.show_table()}
            </div>
        );
    }
}

export default MemberList;