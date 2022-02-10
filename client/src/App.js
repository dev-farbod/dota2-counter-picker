import React, { Fragment, useContext } from 'react';
import { Route, HashRouter } from "react-router-dom"
import {Context} from './container/Context';
import Main from './layots/Main';
const App = () => {

  const context=useContext(Context)
  return (
    <Fragment>
      <HashRouter>
        <Route path="/" exact component={Main}/>
      </HashRouter>
    </Fragment>
  );
}

export default App;