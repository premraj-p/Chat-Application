//Node server handling socket io connections

const io = require('socket.io')(8000, {
    cors: {
      origin: '*', }

  });   //listen incoming events

const users={};


//socket.io instance will listen different events
io.on('connection' , socket=>{
     
    //new user joins it is broadcasted to everyone
    socket.on('new-user-joined' , myname=>{
            // console.log("New user" , myname);
            users[socket.id]=myname;                  //give id and assign name
            socket.broadcast.emit('user-joined' , myname);    //if a user joins
    });
    

    //user sends a message it is broadcasted to everyone
    socket.on('send', message=>{
        socket.broadcast.emit('receive' , {message:message , myname: users[socket.id]})
    });
    
    //if a user disconnects broadcast to others 
    socket.on('disconnect' , message=>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    })
});