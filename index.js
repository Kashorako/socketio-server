const {Socket} = require("socket.io");
const app = require('express')();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
    cors: {origin : '*'}
});

const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
    console.log('Nuevo usuario conectado');

    socket.on('message', (message) => {
        console.log(message);
        io.emit('message', `${socket.id.substr(0, 4)} escribió ${message}`);
    });

    socket.on('disconnect', () => {
        console.log('Usuario desconectado!');
    });

    //Para el grafico
    socket.on('new-data', (new_value) => {
        console.log('Este es el nuevo valor');
        console.log(new_value);
        io.emit('new-data', new_value);
    });

    socket.on('data1', (new_value) => {
        console.log('Este es el nuevo valor recibido');
        console.log(new_value);
        io.emit('data1', Array.from({length: 8}, () => Math.floor(Math.random() * 590)+ 10));
    });

    // sendData(io)

});

function sendData(socket){
    socket.emit('data1', Array.from({length: 8}, () => Math.floor(Math.random() * 590)+ 10));
    setTimeout(() => {
        sendData(socket)
    }, 5000)
}
httpServer.listen(port, () => console.log(`Escuchando al puerto ${port}`));