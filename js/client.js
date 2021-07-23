const socket = io('http://localhost:8000');    //connect client.js

//get dom elements in variables
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');       
const messageContainer= document.querySelector(".container")      //incoming messages will go to the container

//to import audio
var audio = new Audio('ting.mp3');

//function to append event info to the container
const append=(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.appendChild(messageElement);
    if(position == 'right'){
        audio.play();
    }
   
}


//if form is submitted send message to the server
form.addEventListener('submit' , (e)=>{
      e.preventDefault();
      const message = messageInput.value;
      append(`You : ${message} ` , 'right');
      socket.emit('send' , message);
      messageInput.value= ''
})

//input username and send it to the server
const myname = prompt("Please enter your name to join the chat.");
socket.emit('new-user-joined', myname );

//if new user joins recieve his name from server
socket.on('user-joined' , myname=>{
          append( `${myname} joined the chat.` , 'right')
})

//if server sends message receive it
socket.on('receive' , data=>{
          append(`${data.myname} : ${data.message}` , 'left')
})

//if user leaves the chat append the info to the container
socket.on('left' , myname=>{
    append(`${myname} left the chat` , 'right')
})