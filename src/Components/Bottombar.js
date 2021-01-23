import './Bottombar.css';
import React from 'react';

export default function Bottombar(props) {
    return (
        <div className="Bottombar">
            { props.children }
        </div>
    );
}

