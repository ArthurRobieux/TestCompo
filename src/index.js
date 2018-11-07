import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import MemberList from './MemberList/member_list.js';

// Constants

const team_id = 6;
const event_id = 74;    //132 = future, 131 = future with treshold, 74 = past

const API_URL = 'http://api.local.sporteasy.net:8000/v2.1/teams/' + team_id +'/events/' + event_id + '/';
const bearer = "Bearer b15dfb6dee52b68d5eafe5602ddc79afabf2717a";


// App

class TableApp extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
      return (
          <div>
              <MemberList team_id={team_id} bearer={bearer} API_URL={API_URL}/>
          </div>
    );
  }
}

//ReactDOM

ReactDOM.render(
  <TableApp/>,
  document.getElementById('root')
);
