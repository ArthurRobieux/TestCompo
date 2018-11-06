import React from "react";

class FutureMemberList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { present_members: [], rsvp_members: [], not_selected_members: [], absent_members: []};
  }

  sorting_members(){

      this.state.present_members = [];
      this.state.rsvp_members = [];
      this.state.not_selected_members = [];
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
                      presence: i,
                  };

                  //Add the member in the right list
                  if (i === 0) {
                      this.state.present_members.push(newMember);
                  }
                  else if (i === 1) {
                      this.state.rsvp_members.push(newMember);
                  }
                  else if (i === 2) {
                      this.state.not_selected_members.push(newMember);
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

  change_presence(item, action){

      this.setState({});

      for(var i= 0; i < this.props.members.length; i++){
        if(item === this.props.members[i]){

            this.props.members[i].presence=action;

        }
      }
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

          <h3>Tableau d'un match futur (id={this.props.data.id})</h3>

          <table>

              {/* PRESENT MEMBERS */}

              <thead id="header_present_members" >
              <tr className="title_present_members" onClick={() => this.show_hide_list("body_present_members")}>
                  <th>Présents ({this.state.present_members.length})</th>
                  <th></th>
                  <th></th>
              </tr>

              <tr className="header_members">
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Présence</th>
              </tr>
              </thead>

              <tbody id="body_present_members">
               {this.state.present_members.map(item => (
                  <tr className="present_members" >
                      <td>{item.first_name}</td>
                      <td>{item.last_name}</td>
                      <td><img className="logo_presence" src="Waiting.png" onClick={() => this.change_presence(item, 2)}/> <img className="logo_presence" src="No.png" onClick={() => this.change_presence(item, 0)}/></td>
                  </tr>
              ))}
              </tbody>


              {/* RSVP MEMBERS */}

              <thead id="header_rsvp_members" >
              <tr className="title_rsvp_members" onClick={() => this.show_hide_list("body_rsvp_members")}>
                  <th>En attente de réponse ({this.state.rsvp_members.length})</th>
                  <th></th>
                  <th></th>
              </tr>
              </thead>

              <tbody id="body_rsvp_members">
               {this.state.rsvp_members.map(item => (
                  <tr className="rsvp_members">
                      <td>{item.first_name}</td>
                      <td>{item.last_name}</td>
                      <td><img className="logo_presence" src="Yes.png" onClick={() => this.change_presence(item, 1)}/> <img className="logo_presence" src="No.png" onClick={() => this.change_presence(item, 0)}/></td>
                  </tr>
              ))}
              </tbody>


              {/* NOT SELECTED MEMBERS */}

              <thead id="header_not_selected_members">
              <tr className="title_not_selected_members" onClick={() => this.show_hide_list("body_not_selected_members")}>
                  <th>Non séléctionnés ({this.state.not_selected_members.length})</th>
                  <th></th>
                  <th></th>
              </tr>
              </thead>

               <tbody id="body_not_selected_members">
               {this.state.not_selected_members.map(item => (
                  <tr className="not_selected_members" >

                      <td>{item.first_name}</td>
                      <td>{item.last_name}</td>
                      <td><img className="logo_presence" src="Waiting.png" onClick={() => this.change_presence(item, 2)}/> <img className="logo_presence" src="Yes.png" onClick={() => this.change_presence(item, 1)}/></td>
                  </tr>
              ))}
              </tbody>

              {/* ABSENT MEMBERS */}

              <thead id="header_absent_members">
              <tr className="title_absent_members" onClick={() => this.show_hide_list("body_absent_members")}>
                  <th>Absents ({this.state.absent_members.length})</th>
                  <th></th>
                  <th></th>
              </tr>
              </thead>

               <tbody id="body_absent_members">
               {this.state.absent_members.map(item => (
                  <tr className="absent_members" >

                      <td>{item.first_name}</td>
                      <td>{item.last_name}</td>
                      <td><img className="logo_presence" src="Waiting.png" onClick={() => this.change_presence(item, 2)}/> <img className="logo_presence" src="Yes.png" onClick={() => this.change_presence(item, 1)}/></td>
                  </tr>
              ))}
              </tbody>
          </table>

      </div>

    );
  }
}


export default FutureMemberList;