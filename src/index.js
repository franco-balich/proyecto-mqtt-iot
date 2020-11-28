// Se cargan los modulos necesarios.
const express = require('express');
const aedes = require('aedes')()
const path = require('path');
const PUERTO =3000;
const portMQTT = 1883
// Crea una Express app.
var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://localhost:1883');
var TopicMQTT ="";

function SuscribirServosMQTT(){
  client.subscribe('Servo1');
  client.subscribe('Servo2');
  client.subscribe('Servo3');
  client.subscribe('Servo4');
  client.subscribe('Servo5');
  client.subscribe('Servo6');
  
  console.log('Se suscribieron los topic de los servos');
}
function MandarMensajeMQTT(mensaje){
  console.log('Topic actual:',TopicMQTT);
  if(TopicMQTT!=""){
      client.publish(TopicMQTT,mensaje);
      console.log('Mensaje enviado:',mensaje);
  }
}
function EnviarMensajeMQTTEspecifico(topicDestino,mensaje){
  if(topicDestino!=""){
      client.publish(topicDestino,String(mensaje));
      console.log('Mensaje:'+mensaje+' enviado a '+ topicDestino);
  }
}
function SuscribirMQTT(topic){
    client.subscribe(topic);
    console.log('Suscrito a:',topic);
    
    TopicMQTT=topic;
}

function IniciarServer(){
  var app = express();

  // obtiene la ruta del directorio publico donde se encuentran los elementos estaticos (css, js).
  var publicPath = path.resolve(__dirname, 'public'); 

  // Para que los archivos estaticos queden disponibles.
  app.use(express.static(publicPath));

  app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/index.html');
  });

  const serverMQTT = require('net').createServer(aedes.handle)
  const serverIO = require('http').createServer(app);
  const io = require('socket.io')(serverIO);

  serverIO.listen(PUERTO,()=>{
    console.log("El programa se esta ejecutando en el puerto:"+ PUERTO)
  });

  serverMQTT.listen(portMQTT, function () {
    console.log('El broker MQTT se esta ejecutando en el puerto:', portMQTT)
   // SuscribirServosMQTT();
   client.subscribe('Sensor');
  })
  client.on('message',(topic,message)=>{
    message= message.toString();
    io.emit('respuesta', message);
  });
  io.on('connection', (socketIO)=> {
    console.log('Alguien se conecto con Sockets');
    socketIO.on('mensaje', (data)=>{
      MandarMensajeMQTT(data)
    });
    socketIO.on('topic', (data)=>{
      SuscribirMQTT(data);
    });
    socketIO.on('Servo1', (data)=>{
      EnviarMensajeMQTTEspecifico('Servo1',data);
    });
    socketIO.on('Servo2', (data)=>{
      EnviarMensajeMQTTEspecifico('Servo2',data);
    });
    socketIO.on('Servo3', (data)=>{
      EnviarMensajeMQTTEspecifico('Servo3',data);
    });
    socketIO.on('Servo4', (data)=>{
      EnviarMensajeMQTTEspecifico('Servo4',data);
    });
    socketIO.on('Servo5', (data)=>{
      EnviarMensajeMQTTEspecifico('Servo5',data);
    });
    socketIO.on('Servo6', (data)=>{
      EnviarMensajeMQTTEspecifico('Servo6',data);
    });
    socketIO.on('LedRojo', (data)=>{
      EnviarMensajeMQTTEspecifico('LedRojo',data);
    });
    socketIO.on('LedAmarillo', (data)=>{
      EnviarMensajeMQTTEspecifico('LedAmarillo',data);
    });
    socketIO.on('LedAzul', (data)=>{
      EnviarMensajeMQTTEspecifico('LedAzul',data);
    });
  });
  
}
IniciarServer();