import React from 'react';
import store from "../Redux/store";
import {batchActions} from "redux-batched-actions";
import updateStack from "../Redux/batch";

export default class BatchDispatcher extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    dispatchStack() {
        store.dispatch(batchActions(updateStack.batchedActions))
        updateStack.reset = null
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.dispatchStack(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID)
    }

    render() {
        return null;
    }
}