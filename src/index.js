import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// App

const members = [
        {name: 'Arthur', age: '22', buts: '3', pd: '2', carton: '0', presence: 1},
        {name: 'Alice', age: '17', buts: '2', pd: '1', carton: '1', presence: 0},
        {name: 'Guillaume', age: '48', buts: '0', pd: '4', carton: '0', presence: 1},
        {name: 'Claire', age: '47', buts: '1', pd: '3', carton: '0', presence: 0},
        {name: 'Thibaud', age: '18', buts: '2', pd: '2', carton: '0', presence: 0},
        {name: 'Arnaud', age: '10', buts: '4', pd: '1', carton: '1', presence: 1},
    ];



class TableApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { members: members, text_name: '', text_age: '' };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeAge = this.handleChangeAge.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  render() {
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

        <MemberList members={this.state.members} />

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

class MemberList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { present_members: [], absent_members: [] };
    this.change_presence = this.change_presence.bind(this);
    this.sorting_members = this.sorting_members.bind(this);
  }

  sorting_members(){

        this.state.present_members = [];
        this.state.absent_members = [];

        /*this.setState({present_members: [], absent_members: []});*/

      for(var i= 0; i < members.length; i++){
        if(members[i].presence === 1){
            this.state.present_members.push(members[i]);
        }
        else{
            this.state.absent_members.push(members[i]);
        }
      }
  }


  change_presence(item){

      this.setState({});

      for(var i= 0; i < members.length; i++){
        if(item === members[i]){
            if(item.presence === 0){members[i].presence=1;}
            else{members[i].presence=0;}
        }
      }
  }


  render() {

    //Sorting members
    this.sorting_members()


    return (
      <div class="member_list">

          <h3>Tableau trié par présence</h3>

          <table>
              <tr class="present_members">
                  <th>Présents</th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
              </tr>

              <tr class="header_members">
                  <th>Name</th>
                  <th>Age</th>
                  <th>Buts</th>
                  <th>PD</th>
                  <th>Cartons</th>
                  <th>Présence</th>
              </tr>

               {this.state.present_members.map(item => (
                  <tr class="list_present_members" onClick={() => this.change_presence(item)}>
                      <td>{item.name}</td>
                      <td>{item.age}</td>
                      <td>{item.buts}</td>
                      <td>{item.pd}</td>
                      <td>{item.carton}</td>
                      <td>{item.presence}</td>
                  </tr>
              ))}

              <tr class="absent_members">
                  <th>Absents</th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
              </tr>

               {this.state.absent_members.map(item => (
                  <tr class="list_absent_members" onClick={() => this.change_presence(item)}>

                      <td>{item.name}</td>
                      <td>{item.age}</td>
                      <td>{item.buts}</td>
                      <td>{item.pd}</td>
                      <td>{item.carton}</td>
                      <td>{item.presence}</td>
                  </tr>
              ))}

          </table>


          <h3>Tableau des members</h3>

          <table>
              <tr className="header_members">
                  <th>Name</th>
                  <th>Age</th>
                  <th>Buts</th>
                  <th>PD</th>
                  <th>Cartons</th>
                  <th>Présence</th>
              </tr>

              {members.map(item => (
                  <tr className="list_present_members" onClick={() => this.change_presence(item)}>
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

//ReactDOM

ReactDOM.render(
  <TableApp/>,
  document.getElementById('root')
);
