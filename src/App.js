import React, {Component} from 'react';
import './App.css';

import AppBar from 'material-ui/AppBar';
import Panel from './Panel';
import {Event} from 'react-socket-io';

const div = {
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
    },
};

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            members: this.props.members
        };
        this.onMessage = this.onMessage.bind(this);
        this.onReset = this.onReset.bind(this);
        this.onSuperReset = this.onSuperReset.bind(this);
    }

    onMessage(data) {
        let selected_ids = JSON.parse(data).selected_ids;
        var new_lists = this.state.members.slice(0);
        this.state.members.forEach(function (hash, i) {
            selected_ids.forEach(function (id) {
                if (hash.id === id) new_lists[i].flag = true
            });
        });
        this.setState({members: new_lists});
    }

    onReset() {
        var new_lists = this.state.members.slice(0);
        new_lists.forEach(function (member) {
            member.flag = false
        });
        this.setState({members: new_lists});
        localStorage.setItem('bingo_data', JSON.stringify(new_lists))
    }

    onSuperReset() {
        localStorage.setItem('bingo_data', null)
    }

    render() {
        return (
            <div>
                <div className="AppBar">
                    <AppBar
                        title="BINGO"
                        iconClassNameRight="muidocs-icon-navigation-expand-more"
                    />
                </div>
                <div style={div.wrapper}>
                    <ul className="table-ul">
                        {
                            this.state.members.slice(0, 5).map(function (hash) {
                                return <li><Panel name={hash.value} flag={hash.flag}/></li>
                            })
                        }
                    </ul>
                    <ul className="table-ul">
                        {
                            this.state.members.slice(5, 10).map(function (hash) {
                                return <li><Panel name={hash.value} flag={hash.flag}/></li>
                            })
                        }
                    </ul>
                    <ul className="table-ul">
                        {
                            this.state.members.slice(10, 12).map(function (hash) {
                                return <li><Panel name={hash.value} flag={hash.flag}/></li>
                            })
                        }
                        <li><Panel name="☆" flag={true}/></li>
                        {
                            this.state.members.slice(12, 14).map(function (hash) {
                                return <li><Panel name={hash.value} flag={hash.flag}/></li>
                            })
                        }
                    </ul>
                    <ul className="table-ul">
                        {
                            this.state.members.slice(14, 19).map(function (hash) {
                                return <li><Panel name={hash.value} flag={hash.flag}/></li>
                            })
                        }
                    </ul>
                    <ul className="table-ul">
                        {
                            this.state.members.slice(19, 24).map(function (hash) {
                                return <li><Panel name={hash.value} flag={hash.flag}/></li>
                            })
                        }
                    </ul>
                    <Event event='bingo' handler={this.onMessage}/>
                    <Event event='reset' handler={this.onReset}/>
                    <Event event='null' handler={this.onSuperReset}/>
                </div>
            </div>
        );
    }
}

export default App;
