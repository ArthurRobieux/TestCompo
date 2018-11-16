import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import MemberList from './MemberList/member_list.js';

// Constants

const team_id = 37;
const event_id = 134;    //132 = future, 131 = future with treshold, 74 = past
const bearer = "Bearer b15dfb6dee52b68d5eafe5602ddc79afabf2717a";

// App

class TableApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {tab: 'table'}
    }

    changeTab(){
        if(this.state.tab === 'table'){
            this.setState({tab: 'compo'});
        }
        else{
            this.setState({tab: 'table'});
        }
    }

    showTab(){
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
                <button onClick={() => this.changeTab()}>Change Tab </button>
                {this.showTab()}



                {/*<div className={"id_test_slider"}>*/}
                    {/*<div>*/}
                        {/*<div className={"test_slider"}>Buts</div>*/}
                        {/*<div className={"test_slider"}>Cartons J</div>*/}
                        {/*<div className={"test_slider"}>Cartons R</div>*/}
                        {/*<div className={"test_slider"}>Tacles</div>*/}
                        {/*<div className={"test_slider"}>Passe</div>*/}
                        {/*<div className={"test_slider"}>Km</div>*/}
                        {/*<div className={"test_slider"}>Temps</div>*/}
                        {/*<div className={"test_slider"}>Arbitre</div>*/}
                        {/*<div className={"test_slider"}>Sortie</div>*/}
                        {/*<div className={"test_slider"}>Arrêt</div>*/}
                        {/*<div className={"test_slider"}>Dégagement</div>*/}
                    {/*</div>*/}
                    {/*<div>*/}
                        {/*<div className={"test_slider"}>1</div>*/}
                        {/*<div className={"test_slider"}>3</div>*/}
                        {/*<div className={"test_slider"}>5</div>*/}
                        {/*<div className={"test_slider"}>2</div>*/}
                        {/*<div className={"test_slider"}>6</div>*/}
                        {/*<div className={"test_slider"}>1</div>*/}
                        {/*<div className={"test_slider"}>0</div>*/}
                        {/*<div className={"test_slider"}>4</div>*/}
                        {/*<div className={"test_slider"}>2</div>*/}
                        {/*<div className={"test_slider"}>0</div>*/}
                        {/*<div className={"test_slider"}>1</div>*/}
                    {/*</div>*/}
                    {/*<div>*/}
                        {/*<div className={"test_slider"}>2</div>*/}
                        {/*<div className={"test_slider"}>2</div>*/}
                        {/*<div className={"test_slider"}>5</div>*/}
                        {/*<div className={"test_slider"}>0</div>*/}
                        {/*<div className={"test_slider"}>6</div>*/}
                        {/*<div className={"test_slider"}>1</div>*/}
                        {/*<div className={"test_slider"}>1</div>*/}
                        {/*<div className={"test_slider"}>5</div>*/}
                        {/*<div className={"test_slider"}>2</div>*/}
                        {/*<div className={"test_slider"}>0</div>*/}
                        {/*<div className={"test_slider"}>1</div>*/}
                    {/*</div>*/}



                {/*</div>*/}

                {/*<br/>*/}

                {/*<div className="id_test_slider">*/}
                    {/*<div className="test_slider">2</div>*/}
                    {/*<div className="test_slider">-</div>*/}
                    {/*<div className="test_slider">-</div>*/}
                    {/*<div className="test_slider">-</div>*/}
                    {/*<div className="test_slider">-</div>*/}
                {/*</div>*/}


            </div>
        );
    }
}

//ReactDOM

ReactDOM.render(
  <TableApp/>,
  document.getElementById('root')
);
