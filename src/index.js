import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import MemberList from './MemberList/member_list.js';

// Constants

const team_id = 6;
const event_id = 132;    //132 = future, 131 = future with treshold, 74 = past
const bearer = "Bearer b15dfb6dee52b68d5eafe5602ddc79afabf2717a";

// App

class TableApp extends React.Component {

  render() {
      return (
          <div>
              <MemberList team_id={team_id} event_id={event_id} bearer={bearer}/>
          </div>
    );
  }
}

//ReactDOM

ReactDOM.render(
  <TableApp/>,
  document.getElementById('root')
);
