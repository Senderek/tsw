import React from 'react';
import {List, ListItem} from 'material-ui/List';
import {Card, CardText, CardTitle} from 'material-ui/Card';

class ProfileViewStateful extends React.Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
        this.startAction = this.startAction.bind(this);
    }

    handleClick() {
        this.props.onClick();
        this.startAction();
    }

    startAction() {
        console.log('Function 2: Click received in Child');
    }

    render() {
        return (
            <div onClick={this.handleClick}>
                Child - click me too
            </div>
        );
    }
}