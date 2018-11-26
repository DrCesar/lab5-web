

const socket = io();
const form = document.getElementById('form');
const mI = document.getElementById('messageInput');
const mList = document.getElementById('messageList');


form.onsubmit = function(event) {

    event.preventDefault();

    socket.emit('chat message', mI.value);

    mI.value = '';
    return false;
}

socket.on('chat message', function(msg) {
    let m = document.createTextNode(msg);
    let l = document.createElement('li');

    l.appendChild(m);

    mList.appendChild(l);
});

function getMessages() {

    fetch('http://34.210.35.174:7000')
      .then(response => response.json())
      .then(response => showMessages(response));
}


function showMessages(messages) {

    console.log(messages);
    for (let i in messages) {
        let li = document.createElement('li');
        let span = document.createElement('p');
        let nick = document.createTextNode(messages[i].nick + ":   ");
        let p = document.createElement('p');
        let text = document.createTextNode(messages[i].text);


        span.appendChild(nick);
        span.setAttribute('class', 'nick');

        p.appendChild(text);
        p.setAttribute('class', 'text');

        li.appendChild(span);
        li.appendChild(p);
        li.setAttribute('class', 'message');

        document.getElementById('messageList').appendChild(li);
    }
}

window.onload = function() {
    getMessages();
} 