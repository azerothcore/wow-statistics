import React, {useState, useEffect} from 'react';
import './BracketGroup.css';

const options = {
    "0": "All levels",
    "1": "1-19",
    "2": "20-29",
    "3": "30-39",
    "4": "40-49",
    "5": "50-59",
    "6": "60-69",
    "7": "70-80"
};

const BracketGroup = (props) => {

    const handleClick = (id) => {
        props.parentCallback(id);
    }

    return (
        <div id="bracketGroup" className="bracketGroup">
            {Object.keys(options)
                .map(key =>
                    (<button key={key}
                             name={options[key]}
                             onClick={() => handleClick(key)}
                             className="bracketButton"
                    >{options[key]}</button>))}
        </div>
    );
};

export default BracketGroup;