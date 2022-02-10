import React from 'react';
import Heros from '../components/heros/Heros';
import Selector from '../components/selector/Selector';


const Main = () => {
    return (
        <div className="main-page container">
            <Heros/>
            <Selector/>
        </div>
    );
}

export default Main;