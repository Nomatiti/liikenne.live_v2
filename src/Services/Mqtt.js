import React from "react";
import { connect } from "mqtt";

export default class mqtt extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mqtt: connect(this.props.url, this.props.options ? this.props.options : null)
        };
    }

    componentDidMount() {
        let mqtt = this.state.mqtt;
        let props = this.props;
        let subscription = props.subscription;

        mqtt.on('connect', function () {
            if (subscription) {
                mqtt.subscribe(subscription, function (err) {
                    if (!err) {
                        console.log("subscribed to: " + subscription);
                        //TODO: Update mqtt status to redux store (errors too)
                    }
                })
            }
        })

        this.state.mqtt.on('message', function (topic, message) {
            // message is Buffer
            if (props.function) {
                props.function(message.toString(), topic, props.api);
            }
        })
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(prevProps.subscription, this.props.subscription);
        if (this.props.subscription !== prevProps.subscription) {
            this.state.mqtt.unsubscribe(prevProps.subscription, function (err) {
                if (!err) {
                    console.log("unsubscribed to: " + prevProps.subscription);
                    //TODO: Update mqtt status to redux store (errors too)
                }
            })
            let subscription = this.props.subscription;
            this.state.mqtt.subscribe(this.props.subscription, function (err) {
                if (!err) {
                    console.log("subscribed to: " + subscription);
                    //TODO: Update mqtt status to redux store (errors too)
                }
            })
        }
    }

    componentWillUnmount() {
        this.state.mqtt.end();
    }

    render() {
        return null;
    }
}
