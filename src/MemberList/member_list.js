import React from "react";

class MemberList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { attendance_group: []};
  }

  get_attendance_group(){

    this.state.attendance_group = [];

    try {
        for (var i = 0; i < this.props.data.attendance_groups.length; i++) {
            this.state.attendance_group.push(this.props.data.attendance_groups[i].slug_name);
        }
    }
    catch(error) {
        console.error('No data for attendance group');
    }
    console.log(this.state.attendance_group);
  }


  show_logo_change_presence(profile, current_slug_name){

      return(
          <span>
          {this.state.attendance_group.map(group => (
            <img className="logo_presence" src="Yes.png" alt="yes" onClick={() => this.change_presence(profile.id, group)}/>
          ))}

          </span>
      );

  }

  change_presence(profile_id, attendance){

        this.setState({});

        const event_id = this.props.data.id;

        const API_URL = 'http://api.local.sporteasy.net:8000/v2.1/teams/' + this.props.team_id + '/events/'
            + event_id + '/profiles/' + profile_id + '/';
        const bearer = "Bearer b15dfb6dee52b68d5eafe5602ddc79afabf2717a";

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

  }

  // 3 Fonctions qui vont charger le bon CSS selon le groupe

  define_head_id(group){
      return("header_" + group + "_members");
  }

  define_head_class(group){
      return("title_" + group + "_members");
  }

  define_body_class(group){
      return(group + "_members");
  }

  // Fonction qui va afficher le tableau avec les données dans props

  show_table(){
    try {
        return (
            // Tableau général
            <table>

                {/* On boucle sur chacun des groupes */}
               {this.props.data.attendees.map(item => (
                   <div id="attendance_group">


                      <thead id={this.define_head_id(item.slug_name)}>

                          <tr className={this.define_head_class(item.slug_name)} onClick={() => this.show_hide_list("body_absent_members")}>
                              <th colSpan="5">{item.localized_name} ({item.results.length})</th>
                          </tr>

                      </thead>

                        <tbody id="body_absent_members">

                           {/* On boucle sur les joueurs du groupe */}
                           {item.results.map(result => (

                              <tr className={this.define_body_class(item.slug_name)} key={result.id} >
                                  <td>{result.profile.first_name}</td>
                                  <td>{result.profile.last_name}</td>
                                  <td>{item.results.length}</td>
                                  <td>{item.slug_name}</td>
                                  <td>{this.show_logo_change_presence(result.profile, item.slug_name)}</td>
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


  render() {

      {this.get_attendance_group()}

    return (
      <div className="member_list">

          <h3>Tableau automatique (id={this.props.data.id})</h3>

          {this.show_table()}

      </div>

    );
  }
}

export default MemberList;