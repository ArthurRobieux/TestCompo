import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Compo from './Compo/Compo.js';
import DragDrop2 from './Compo/DragDrop2.js';
import VanillaDnD from './Compo/VanillaDnD.js';
import CompoVanilla from './Compo/CompoVanilla.js';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <body>
                <h1>Compo</h1>
                <Compo/>
                <h1>Vanilla DnD</h1>
                <VanillaDnD/>
                <h1>Compo Vanilla</h1>
                <CompoVanilla/>
            </body>
        );
    }
}

//ReactDOM

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
