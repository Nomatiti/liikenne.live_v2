import React from "react";
import './ApiSelector.css';
import RoundButton from "./RoundButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBusAlt, faShip, faTrain } from "@fortawesome/free-solid-svg-icons";
import {Databox} from "./";
import { Link, useLocation} from "react-router-dom";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function selectedApi(query) {
    if (!query) {
        return []
    }
    let arr = query.split("+")
    return arr
}

function toggleApi(query, api) {
    let selected = selectedApi(query)

    const index = selected.indexOf(api)
    if (index !== -1) {
        selected.splice(index, 1)
    } else {
        selected.push(api)
    }
    return selected;
}

export default class ApiSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            HSL: false,
            Sea: false,
            Train: false
        }
        this.updateInput = this.updateInput.bind(this)
    }

    updateInput = input => {
        console.log(input.target.id);
        this.setState(state => ({
            [input.target.id]: !state[input.target.id]
        }))
    }

    render() {
        return (
            <Databox>
                <div className={"ApiSelector"}>
                    <div style={{fontWeight: "600"}}>Valitse näytettävät kulkuneuvot:</div>
                    <div className={"Buttons"}>
                        <RoundButton click={this.updateInput} apiName={"Sea"} selected={this.state.Sea}>
                            <FontAwesomeIcon style={{fontSize: "1.25rem", marginRight: "0.25rem"}} icon={faShip}/> Meriliikenne
                        </RoundButton>
                        <RoundButton click={this.updateInput} apiName={"Train"} selected={this.state.Train}>
                            <FontAwesomeIcon style={{fontSize: "1.25rem", marginRight: "0.25rem"}} icon={faTrain}/> Raideliikenne
                        </RoundButton>
                        <RoundButton click={this.updateInput} selected={this.state.HSL}>
                            <FontAwesomeIcon style={{fontSize: "1.25rem", marginRight: "0.25rem"}} icon={faBusAlt}/> Lähiliikenne
                        </RoundButton>
                    </div>
                </div>
            </Databox>
        )
    }
}