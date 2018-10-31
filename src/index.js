import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// App

const members = [{name: 'Arthur', age: '22',}];

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

          Add Members :
          <textarea onChange={this.handleChangeName} value={this.state.text_name} />
          <textarea onChange={this.handleChangeAge} value={this.state.text_age} />

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

  render() {
    return (
      <div class="member_list">
          <th></th>
        {this.props.members.map(item => (
          <tr>
              <td>{item.name}</td>
              <td>{item.age}</td>
          </tr>
        ))}
      </div>
    );
  }
}




//ReactDOM

ReactDOM.render(
  <TableApp/>,
  document.getElementById('root')
);
