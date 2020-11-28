const   btnArriba = document.getElementById('btnArriba'),
        btnAbajo = document.getElementById('btnAbajo'),
        btnIzquierda = document.getElementById('btnIzquierda'),
        btnDerecha = document.getElementById('btnDerecha'),
        btnSuscribirse = document.getElementById('btnSuscribirse'),
        btnEnviar = document.getElementById('btnEnviar'),
        btnA = document.getElementById('botonA'),
        btnB = document.getElementById('botonB'),
        listaMensajes = document.getElementById('listaDeMensajes'),
        txtTopic= document.getElementById('txtTopic'),
        txtMensaje= document.getElementById('txtMensaje'),
        scrollBar1 = document.getElementById('ContenedorScrollBar1'),
        scrollBar2 = document.getElementById('ContenedorScrollBar2'),
        scrollBar3 = document.getElementById('ContenedorScrollBar3'),
        scrollBar4 = document.getElementById('ContenedorScrollBar4'),
        scrollBar5 = document.getElementById('ContenedorScrollBar5'),
        scrollBar6 = document.getElementById('ContenedorScrollBar6');

var mensaje="";
var topic ="";

var botonAState=2;
var botonBState=2;

function EnviarMensaje(etiqueta,mensaje){
    socket.emit(etiqueta,mensaje);
}
const socket = io("http://localhost:3000/");

socket.on('respuesta', (data)=>{
    console.log("Mensaje MQTT: ",data);
    listaMensajes.innerHTML = "<option>"+data+"</option>"+ listaMensajes.innerHTML;
});

btnEnviar.addEventListener('click', () => {
    mensaje="Enviado";
    //btnEnviar.innerHTML="prueba";
    comando = txtMensaje.value;
    if(comando!=""){
        console.log(mensaje)
        EnviarMensaje('mensaje',comando)
    }
    else{
        alert("Por favor ingrese un mensaje");
    }
});

btnSuscribirse.addEventListener('click', () => {
    mensaje="Suscrito";
    comando = txtTopic.value;
    if(comando!=""){
        console.log(mensaje)
        EnviarMensaje('topic',comando)
    }
    else{
        alert("Por favor ingrese un topic");
    }
});
scrollBar1.onscroll = function() {
    var ContDiv = scrollBar1;
    var div = document.getElementById('scrollBar1');
    var yPosContendor = ContDiv.getBoundingClientRect().top;
    var yPos = div.getBoundingClientRect().top;

    mensaje=yPosContendor-yPos;
    if(mensaje%10==0){
        //console.log("Servo1:",mensaje)
        EnviarMensaje('Servo1',mensaje)
    }
  };

  scrollBar2.onscroll = function() {
    var ContDiv = scrollBar2;
    var div = document.getElementById('scrollBar2');
    var yPosContendor = ContDiv.getBoundingClientRect().top;
    var yPos = div.getBoundingClientRect().top;
    mensaje=yPosContendor-yPos;
    if(mensaje%10==0){
        //console.log("Servo2:",mensaje)
        EnviarMensaje('Servo2',mensaje)
    }
  };

  scrollBar3.onscroll = function() {
    var ContDiv = scrollBar3;
    var div = document.getElementById('scrollBar3');
    var yPosContendor = ContDiv.getBoundingClientRect().top;
    var yPos = div.getBoundingClientRect().top;
    mensaje=yPosContendor-yPos;
    if(mensaje%10==0){
        //console.log("Servo3:",mensaje)
        EnviarMensaje('Servo3',mensaje)
    }
  };

  scrollBar4.onscroll = function() {
    var ContDiv = scrollBar4;
    var div = document.getElementById('scrollBar4');
    var yPosContendor = ContDiv.getBoundingClientRect().top;
    var yPos = div.getBoundingClientRect().top;
    mensaje=yPosContendor-yPos;
    if(mensaje%10==0){
        //console.log("Servo4:",mensaje)
        EnviarMensaje('Servo4',mensaje)
    }
  };

  scrollBar5.onscroll = function() {
    var ContDiv = scrollBar5;
    var div = document.getElementById('scrollBar5');
    var yPosContendor = ContDiv.getBoundingClientRect().top;
    var yPos = div.getBoundingClientRect().top;
    mensaje=yPosContendor-yPos;
    if(mensaje%10==0){
        //console.log("Servo5:",mensaje)
        EnviarMensaje('Servo5',mensaje)
    }
  };

  scrollBar6.onscroll = function() {
    var ContDiv = scrollBar6;
    var div = document.getElementById('scrollBar6');
    var yPosContendor = ContDiv.getBoundingClientRect().top;
    var yPos = div.getBoundingClientRect().top;
    mensaje=yPosContendor-yPos;
    if(mensaje%10==0){
        //console.log("Servo6:",mensaje)
        EnviarMensaje('Servo6',mensaje)
    }
  };

btnA.addEventListener('click', () => {
    if(botonAState==1){
        botonAState=2;
    }
    else{
        botonAState=1;
    }
    console.log(botonAState)
    EnviarMensaje('LedRojo',botonAState)
   // listaMensajes.innerHTML += "<option>"+mensaje+"</option>";
});
btnB.addEventListener('click', () => {
    if(botonBState==1){
        botonBState=2;
    }
    else{
        botonBState=1;
    }
    console.log(botonBState)
    EnviarMensaje('LedAzul',botonBState)
   // listaMensajes.innerHTML += "<option>"+mensaje+"</option>";
});