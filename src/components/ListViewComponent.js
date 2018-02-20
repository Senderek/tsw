import React from 'react';
import {List, ListItem} from 'material-ui/List';
import {Card, CardText, CardTitle} from 'material-ui/Card';

export default class TableListItem extends React.Component {
    handleClick = () => {
        this.props.onHeaderClick(this.props.value);
    }

    render() {
        return (
            <ListItem key={this.props.value} primaryText={this.props.text} onClick={this.handleClick}></ListItem>
        );
    }
}