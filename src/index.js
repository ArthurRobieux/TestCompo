import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import MemberList from './MemberList/member_list.js';

// Constants

const team_id = 6;
const event_id = 74;    //132 = future, 131 = future with treshold, 74 = past
const bearer = "Bearer b15dfb6dee52b68d5eafe5602ddc79afabf2717a";

// App

class TableApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {tab: 'table'}
    }

    change_tab(){
        if(this.state.tab === 'table'){
            this.setState({tab: 'compo'});
        }
        else{
            this.setState({tab: 'table'});
        }
    }

    show_tab(){
        if(this.state.tab === 'table'){
            return(<MemberList team_id={team_id} event_id={event_id} bearer={bearer}/>);
        }
        else{
            return(
                <div>
                    <h3>Compo</h3>
                    <img className="compo" src="Images/Compo.png" alt="compo"/>
                </div>
            );
        }


    }

    render() {
        return (
            <div id="global_content">
                <button onClick={() => this.change_tab()}>Change Tab </button>
                {this.show_tab()}

            </div>
        );
    }
}

//ReactDOM

ReactDOM.render(
  <TableApp/>,
  document.getElementById('root')
);
