import React from "react";

class FutureMemberListWithTreshold extends React.Component {
  constructor(props) {
    super(props);
    this.state = { present_members: [], rsvp_members: [], waiting_members: [], absent_members: []};
  }

  sorting_members(){

      this.state.present_members = [];
      this.state.rsvp_members = [];
      this.state.waiting_members = [];
      this.state.absent_members = [];

      //For each member, get data and create a newMember object and assign to a list
      try {
          //Present members
          for (var i = 0; i < this.props.data.attendees.length; i++) {
              for (var j = 0; j < this.props.data.attendees[i].results.length; j++) {

                  //Create new member
                  const newMember = {
                      first_name: this.props.data.attendees[i].results[j].profile.first_name,
                      last_name: this.props.data.attendees[i].results[j].profile.last_name,
                      id: this.props.data.attendees[i].results[j].profile.id,
                  };

                  //Add the member in the right list
                  if (i === 0) {
                      this.state.present_members.push(newMember);
                  }
                  else if (i === 1) {
                      this.state.waiting_members.push(newMember);
                  }
                  else if (i === 2) {
                      this.state.rsvp_members.push(newMember);
                  }
                  else {
                      this.state.absent_members.push(newMember);
                  }
              }
          }
      }
      catch(error) {
        console.error('error');
      }
      console.log(this.props.data);
  }

  change_presence(item, attendance){

        this.setState({});

        const event_id = this.props.data.id;
        const profile_id = item.id;

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

  show_hide_list(id){
      this.setState({});
      if(document.getElementById(id).style.display === 'table-row-group') {
          document.getElementById(id).style.display = 'none';
      }
      else{
          document.getElementById(id).style.display = 'table-row-group';
      }
  }

  render() {

    //Sorting members in lists
    this.sorting_members();

    return (
      <div className="member_list">

          <h3>Tableau d'un match futur (avec seuil) (id={this.props.data.id})</h3>

          <table>

              {/* PRESENT MEMBERS */}

              <thead id="header_present_members" >
              <tr className="title_present_members" onClick={() => this.show_hide_list("body_present_members")}>
                  <th colSpan="3">Présents ({this.state.present_members.length})</th>
              </tr>

              <tr className="header_members">
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Présence</th>
              </tr>
              </thead>

              <tbody id="body_present_members">
               {this.state.present_members.map(item => (
                  <tr className="present_members" key={item.id}>
                      <td>{item.first_name}</td>
                      <td>{item.last_name}</td>
                      <td><img className="logo_presence" src="Waiting.png" alt="wait" onClick={() => this.change_presence(item, 'rsvp')}/> <img className="logo_presence" src="No.png" alt="no" onClick={() => this.change_presence(item, 'unavailable')}/></td>
                  </tr>
              ))}
              </tbody>

              {/* WAITING MEMBERS */}

              <thead id="header_waiting_members">
              <tr className="title_waiting_members" onClick={() => this.show_hide_list("body_waiting_members")}>
                  <th colSpan="3">Liste d'attente ({this.state.waiting_members.length})</th>
              </tr>
              </thead>

               <tbody id="body_waiting_members">
               {this.state.waiting_members.map(item => (
                  <tr className="waiting_members" key={item.id}>

                      <td>{item.first_name}</td>
                      <td>{item.last_name}</td>
                      <td><img className="logo_presence" src="Waiting.png" alt="wait" onClick={() => this.change_presence(item, 'rsvp')}/> <img className="logo_presence" src="Yes.png" alt="yes" onClick={() => this.change_presence(item, 'participant')}/></td>
                  </tr>
              ))}
              </tbody>

              {/* RSVP MEMBERS */}

              <thead id="header_rsvp_members" >
              <tr className="title_rsvp_members" onClick={() => this.show_hide_list("body_rsvp_members")}>
                  <th colSpan="3">En attente de réponse ({this.state.rsvp_members.length})</th>
              </tr>
              </thead>

              <tbody id="body_rsvp_members">
               {this.state.rsvp_members.map(item => (
                  <tr className="rsvp_members" key={item.id}>
                      <td>{item.first_name}</td>
                      <td>{item.last_name}</td>
                      <td><img className="logo_presence" src="Yes.png" alt="yes" onClick={() => this.change_presence(item, 'participant')}/> <img className="logo_presence" src="No.png" alt="no" onClick={() => this.change_presence(item, 'unavailable')}/></td>
                  </tr>
              ))}
              </tbody>

              {/* ABSENT MEMBERS */}

              <thead id="header_absent_members">
              <tr className="title_absent_members" onClick={() => this.show_hide_list("body_absent_members")}>
                  <th colSpan="3">Absents ({this.state.absent_members.length})</th>
              </tr>
              </thead>

               <tbody id="body_absent_members">
               {this.state.absent_members.map(item => (
                  <tr className="absent_members" key={item.id}>

                      <td>{item.first_name}</td>
                      <td>{item.last_name}</td>
                      <td><img className="logo_presence" src="Waiting.png" alt="wait" onClick={() => this.change_presence(item, 'rsvp')}/> <img className="logo_presence" src="Yes.png" alt="yes" onClick={() => this.change_presence(item, 'participant')}/></td>
                  </tr>
              ))}
              </tbody>
          </table>

      </div>

    );
  }
}



export default FutureMemberListWithTreshold;