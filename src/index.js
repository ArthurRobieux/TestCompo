import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import PastMemberList from './MemberList/past_member_list.js';
import FutureMemberList from './MemberList/future_member_list.js';
import FutureMemberListWithTreshold from './MemberList/future_member_list_treshold.js';


// Load data from API
//103 = past, 131 = past with waiting, 74 = future
const event_id = 131;
const API_URL = 'http://api.local.sporteasy.net:8000/v2.1/teams/6/events/' + event_id + '/';
const bearer = "Bearer b15dfb6dee52b68d5eafe5602ddc79afabf2717a";


// App

class TableApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: {}, text_name: '', text_age: '' };
  }

    //Show members list Past or Future
    show_members_list(){

      if(this.state.data.is_past) {
              return (<PastMemberList data={this.state.data}/>);
      }
      else{
          if(this.state.data.available_threshold_reached) {
              return (<FutureMemberListWithTreshold data={this.state.data}/>);
          }
          else{
              return (<FutureMemberList data={this.state.data}/>);
          }
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
        //console.log(this.state.data);
        //console.log(this.state.data.id);
    }

  render() {

      this.get_api_data();

      return (
          <div>
              {this.show_members_list()}
          </div>
    );
  }
}

//ReactDOM

ReactDOM.render(
  <TableApp/>,
  document.getElementById('root')
);
