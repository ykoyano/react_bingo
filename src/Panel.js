import React, {Component} from 'react';
import './Panel.css';

import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress';

const paperStyle = {
    height: 60,
    width: 60,
    margin: 0,
    textAlign: 'center',
    display: 'inline-block',
    position: 'relative',
    zIndex: 0,
};

const progressStyle = {
    position: 'absolute',
    zIndex: 1,
    marginLeft: -60,
};

class Panel extends Component {
    render() {
        return (
            <div>
                <Paper style={paperStyle} zDepth={1} circle={true}>
                    <p>{this.props.name}</p>
                </Paper>
                {(() => {
                    if (this.props.flag) return <CircularProgress style={progressStyle} size={60} thickness={5}/>;
                })()}
            </div>
        );
    }
}

export default Panel;