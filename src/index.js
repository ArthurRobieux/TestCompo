import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// App

const members = [
        {name: 'Arthur', age: '22', buts: '3', pd: '2', carton: '0', presence: '1'},
        {name: 'Alice', age: '17', buts: '2', pd: '1', carton: '1', presence: '0'},
        {name: 'Guillaume', age: '48', buts: '0', pd: '4', carton: '0', presence: '1'},
        {name: 'Claire', age: '47', buts: '1', pd: '3', carton: '0', presence: '0'},
        {name: 'Thibaud', age: '18', buts: '2', pd: '2', carton: '0', presence: '1'},
        {name: 'Arnaud', age: '10', buts: '4', pd: '1', carton: '1', presence: '1'},
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
          Age : <textarea onChange={this.handleChangeAge} value={this.state.text_age} />

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
    this.state = { members_present: [], members_absent: []};
  }




  render() {

      const present_members = [];
      const absent_members = [];

      for(var i= 0; i < members.length; i++){
        if(members[i].presence === "1"){
            present_members.push(members[i]);
        }
        else{
            absent_members.push(members[i]);
        }
      }

    return (
      <div class="member_list">
          <h2>My Table</h2>
          <h3>Tableau Général</h3>

          <table>

              <tr>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Buts</th>
                  <th>PD</th>
                  <th>Cartons</th>
                  <th>Présence</th>
              </tr>

              {this.props.members.map(item => (
                  <tr>
                      <td>{item.name}</td>
                      <td>{item.age}</td>
                      <td>{item.buts}</td>
                      <td>{item.pd}</td>
                      <td>{item.carton}</td>
                      <td>{item.presence}</td>
                  </tr>
              ))}
          </table>

          <h3>Tableau trié par présence</h3>

          <table>


              <tr class="present_members">
                  Present
              </tr>

               {present_members.map(item => (
                  <tr>
                      <td>{item.name}</td>
                      <td>{item.age}</td>
                      <td>{item.buts}</td>
                      <td>{item.pd}</td>
                      <td>{item.carton}</td>
                      <td>{item.presence}</td>
                  </tr>
              ))}

              <tr class="absent_members">
                  Absent
              </tr>

               {absent_members.map(item => (
                  <tr>
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
