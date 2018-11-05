import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Constantes

const members = [
        {name: 'Arthur', age: '22', buts: '3', pd: '2', carton: '0', presence: 1},
        {name: 'Alice', age: '17', buts: '2', pd: '1', carton: '1', presence: 0},
        {name: 'Guillaume', age: '48', buts: '0', pd: '4', carton: '0', presence: 1},
        {name: 'Claire', age: '47', buts: '1', pd: '3', carton: '0', presence: 0},
        {name: 'Thibaud', age: '18', buts: '2', pd: '2', carton: '0', presence: 0},
        {name: 'Arnaud', age: '10', buts: '4', pd: '1', carton: '1', presence: 2},
    ];

// Load data from API

const event_id = 131;
const API_URL = 'http://api.local.sporteasy.net:8000/v2.1/teams/6/events/' + event_id + '/';
const bearer = "Bearer b15dfb6dee52b68d5eafe5602ddc79afabf2717a";


// App

class TableApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: {}, members: members, text_name: '', text_age: '' };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeAge = this.handleChangeAge.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

    //Show members list Past or Future
    show_members_list(){

      if(this.state.data.is_past) {
          return (<PastMemberList members={this.state.members} data={this.state.data}/>);
      }
      else{
          return (<FutureMemberList members={this.state.members} data={this.state.data}/>);
      }

    }

    //Get data from API and stock them in TableApp.state.data
    get_api_data(){
        fetch(API_URL, {
            method: "GET",
            headers: {
                "Authorization": bearer,
                "Content-Type": "application/json",
            }
        })
        .then(response =>
            response.json()
        )
        .then(json_response =>
            this.setState({ data: json_response}),
        );
        console.log(this.state.data)
    }


  render() {
      this.get_api_data();
      return (

      <div>
        <form onSubmit={this.handleSubmit}>

          Add Members :<br/><br/>
          Name : <textarea onChange={this.handleChangeName} value={this.state.text_name} />
          Age : <textarea onChange={this.handleChangeAge} value={this.state.text_age} /><br/><br/>

          <button>
            Add #{this.state.members.length + 1}
          </button>

        </form>

          {this.show_members_list()}

      </div>

    );
  }


  handleChangeName(e) {
    this.setState({ text_name: e.target.value });
  }

  handleChangeAge(e) {
    this.setState({ text_age: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    const newMember = {
        name: this.state.text_name,
        age: this.state.text_age,
    };

    this.setState(prevState => ({
      members: prevState.members.concat(newMember),
      text_name: '',
      text_age: '',
    }));

  }
}

// MemberList

class PastMemberList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { present_members: [], absent_members: [] };
  }

  sorting_members(){

        this.state.present_members = [];
        this.state.absent_members = [];

        /*this.setState({present_members: [], absent_members: []});*/

      for(var i= 0; i < this.props.members.length; i++){
        if(this.props.members[i].presence === 1){
            this.state.present_members.push(this.props.members[i]);
        }
        else{
            this.state.absent_members.push(this.props.members[i]);
        }
      }
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

    //Sorting members
    this.sorting_members();


    return (
      <div className="member_list">

          <h3>Tableau d'un match passé</h3>

          <table>

              {/* PRESENT MEMBERS */}

              <thead id="header_present_members" >
              <tr className="title_present_members" onClick={() => this.show_hide_list("body_present_members")}>
                  <th>Ont participé ({this.state.present_members.length})</th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
              </tr>

              <tr className="header_members">
                  <th>Name</th>
                  <th>Age</th>
                  <th>Buts</th>
                  <th>PD</th>
                  <th>Cartons</th>
                  <th>Présence</th>
              </tr>
              </thead>

              <tbody id="body_present_members">
               {this.state.present_members.map(item => (
                  <tr className="present_members" >
                      <td>{item.name}</td>
                      <td>{item.age}</td>
                      <td>{item.buts}</td>
                      <td>{item.pd}</td>
                      <td>{item.carton}</td>
                      <td><img className="logo_presence" src="No.png" onClick={() => this.change_presence(item, 0)}/></td>
                  </tr>
              ))}
              </tbody>

              {/* ABSENT MEMBERS */}

              <thead id="header_absent_members">
              <tr className="title_absent_members" onClick={() => this.show_hide_list("body_absent_members")}>
                  <th>N'ont pas participé ({this.state.absent_members.length})</th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
              </tr>
              </thead>

               <tbody id="body_absent_members">
               {this.state.absent_members.map(item => (
                  <tr className="absent_members" >

                      <td>{item.name}</td>
                      <td>{item.age}</td>
                      <td>{item.buts}</td>
                      <td>{item.pd}</td>
                      <td>{item.carton}</td>
                      <td><img className="logo_presence" src="Yes.png" onClick={() => this.change_presence(item, 1)}/></td>
                  </tr>
              ))}
              </tbody>
          </table>

          {/*GENERAL*/}

          <h3>Tableau des membres</h3>

          <table>
              <tr className="header_members">
                  <th>Name</th>
                  <th>Age</th>
                  <th>Buts</th>
                  <th>PD</th>
                  <th>Cartons</th>
                  <th>Présence</th>
              </tr>

              {this.props.members.map(item => (
                  <tr className="present_members" >
                      <td>{item.name}</td>
                      <td>{item.age}</td>
                      <td>{item.buts}</td>
                      <td>{item.pd}</td>
                      <td>{item.carton}</td>
                      <td>{item.presence}</td>
                  </tr>
              ))}
          </table>

      </div>

    );
  }
}



//Present Member List

class FutureMemberList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { present_members: [], absent_members: [], waiting_members: [] };
  }

  sorting_members(){

        this.state.present_members = [];
        this.state.waiting_members = [];
        this.state.absent_members = [];

        /*this.setState({present_members: [], absent_members: []});*/

      for(var i= 0; i < this.props.members.length; i++){
        if(this.props.members[i].presence === 1){
            this.state.present_members.push(this.props.members[i]);
        }
        else if(this.props.members[i].presence === 0){
            this.state.absent_members.push(this.props.members[i]);
        }
        else{
            this.state.waiting_members.push(this.props.members[i]);
        }
      }
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

    //Sorting members
    this.sorting_members();


    return (
      <div className="member_list">

          <h3>Tableau d'un match futur</h3>
          
          ID de l'event : {this.props.data.id}

          <table>

              {/* PRESENT MEMBERS */}

              <thead id="header_present_members" >
              <tr className="title_present_members" onClick={() => this.show_hide_list("body_present_members")}>
                  <th>Présents ({this.state.present_members.length})</th>
                  <th></th>
                  <th></th>
              </tr>

              <tr className="header_members">
                  <th>Name</th>
                  <th>Age</th>
                  <th>Présence</th>
              </tr>
              </thead>

              <tbody id="body_present_members">
               {this.state.present_members.map(item => (
                  <tr className="present_members" >
                      <td>{item.name}</td>
                      <td>{item.age}</td>
                      <td><img className="logo_presence" src="Waiting.png" onClick={() => this.change_presence(item, 2)}/> <img className="logo_presence" src="No.png" onClick={() => this.change_presence(item, 0)}/></td>
                  </tr>
              ))}
              </tbody>


              {/* WAITING MEMBERS */}

              <thead id="header_waiting_members" >
              <tr className="title_waiting_members" onClick={() => this.show_hide_list("body_waiting_members")}>
                  <th>En attente ({this.state.waiting_members.length})</th>
                  <th></th>
                  <th></th>
              </tr>
              </thead>

              <tbody id="body_waiting_members">
               {this.state.waiting_members.map(item => (
                  <tr className="waiting_members">
                      <td>{item.name}</td>
                      <td>{item.age}</td>
                      <td><img className="logo_presence" src="Yes.png" onClick={() => this.change_presence(item, 1)}/> <img className="logo_presence" src="No.png" onClick={() => this.change_presence(item, 0)}/></td>
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

                      <td>{item.name}</td>
                      <td>{item.age}</td>
                      <td><img className="logo_presence" src="Waiting.png" onClick={() => this.change_presence(item, 2)}/> <img className="logo_presence" src="Yes.png" onClick={() => this.change_presence(item, 1)}/></td>
                  </tr>
              ))}
              </tbody>
          </table>

      </div>

    );
  }
}

//ReactDOM

ReactDOM.render(
  <TableApp/>,
  document.getElementById('root')
);
