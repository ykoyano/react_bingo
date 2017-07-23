import {Socket} from 'react-socket-io';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const uri = 'https://node-websocket-bingo.herokuapp.com/';
// const uri = 'ws://localhost:3001';
const options = {transports: ['websocket']};


function random(array, num) {
    let a = array;
    let t = [];
    let r = [];
    let l = a.length;
    let n = num < l ? num : l;
    while (n-- > 0) {
        let i = Math.random() * l | 0;
        r[n] = t[i] || a[i];
        --l;
        t[i] = t[l] || a[l];
    }
    return r;
}

const lists = [
        {id:  0, value: "A",  flag:false},
        {id:  1, value: "B",  flag:false},
        {id:  2, value: "C",  flag:false},
        {id:  3, value: "D",  flag:false},
        {id:  4, value: "E",  flag:false},
        {id:  5, value: "F",  flag:false},
        {id:  6, value: "G",  flag:false},
        {id:  7, value: "H",  flag:false},
        {id:  8, value: "I",  flag:false},
        {id:  9, value: "J",  flag:false},
        {id: 10, value: "K",  flag:false},
        {id: 11, value: "L",  flag:false},
        {id: 12, value: "M",  flag:false},
        {id: 13, value: "N",  flag:false},
        {id: 14, value: "O",  flag:false},
        {id: 15, value: "P",  flag:false},
        {id: 16, value: "Q",  flag:false},
        {id: 17, value: "R",  flag:false},
        {id: 18, value: "S",  flag:false},
        {id: 19, value: "T",  flag:false},
        {id: 20, value: "U",  flag:false},
        {id: 21, value: "V",  flag:false},
        {id: 22, value: "W",  flag:false},
        {id: 23, value: "X",  flag:false},
        {id: 24, value: "Z",  flag:false},
        {id: 25, value: "AA"  flag:false},
        {id: 26, value: "AB", flag:false},
        {id: 27, value: "AC", flag:false},
        {id: 28, value: "AD", flag:false}
];

let bingo_data = localStorage.getItem('bingo_data');
let selected_lists;

console.log(bingo_data);

if (bingo_data === null || bingo_data === "null") {
    selected_lists = random(lists, 24);
    localStorage.setItem('bingo_data', JSON.stringify(selected_lists))
} else {
    selected_lists = JSON.parse(bingo_data)
}

console.log(selected_lists);

ReactDOM.render(
    <MuiThemeProvider>
        <Socket uri={uri} options={options}>
            <App members={selected_lists}/>
        </Socket>
    </MuiThemeProvider>,
    document.getElementById('root')
);
