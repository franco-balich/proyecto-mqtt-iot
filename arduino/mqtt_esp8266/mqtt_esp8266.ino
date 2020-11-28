
#include <ESP8266WiFi.h>            
#include <PubSubClient.h>   
#include <Servo.h>     

int LedRojo=5;                      
int LedAzul=4;

Servo servo1;
Servo servo2;
Servo servo3;
Servo servo4;

int trigPin=14;
int echoPin=12;

long duration;
int distance;
int timer=0;

const char* ssid = "InnovativaLab";          
const char* password = "franco131098";      
const char* mqtt_server = "192.168.100.109";   

WiFiClient espClient;
PubSubClient client(espClient);
unsigned long lastMsg = 0;
#define MSG_BUFFER_SIZE  (50)
char msg[MSG_BUFFER_SIZE];
char msg2[MSG_BUFFER_SIZE];
int value = 0;
int testVal=0;


void setup_wifi() {

  delay(10);
  Serial.println();
  Serial.print("Conectando a  ");
  Serial.println(ssid);

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  randomSeed(micros());

  Serial.println("");
  Serial.println("WiFi conectado");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
}

void callback(char* topic, byte* payload, unsigned int length) {
  String sTopic=topic;
  
  char buffer[128];
  memcpy(buffer, payload, length);
  buffer[length] = '\0';
  char *end = nullptr;
  int value = strtol(buffer, &end, 10);
  
  
  
  Serial.print("Nuevo msj [");
  Serial.print(topic);
  Serial.print("] ");
  for (int i = 0; i < length; i++)
    {
    Serial.print((char)payload[i]);
    }
  Serial.println();

  
  if (sTopic=="Servo1")
  {
    servo1.write(value);
    Serial.println("Servo1 moviendose... ");
    }
   else if(sTopic=="Servo2")
   {
    servo2.write(value);
    Serial.println("Servo2 moviendose... ");
   }
   else if(sTopic=="Servo3")
   {
    servo3.write(value);
    Serial.println("Servo3 moviendose... ");
   }
   else if(sTopic=="Servo4")
   {
    servo4.write(value);
    Serial.println("Servo4 moviendose... ");
   }
   else if(sTopic=="LedRojo")
   {
    if((char)payload[0] == '1')
    {           
      digitalWrite(LedRojo, HIGH);
      Serial.println("Led Rojo: Encendido");
    }
    else if ((char)payload[0] == '2')
    {
      digitalWrite(LedRojo, LOW);
      Serial.println("Led Rojo: Apagado");
    }
   }
   else if(sTopic=="LedAzul")
   {
    if((char)payload[0] == '1')
    {           
      digitalWrite(LedAzul, HIGH);
      Serial.println("Led Azul: Encendido");
    }
    else if ((char)payload[0] == '2')
    {
      digitalWrite(LedAzul, LOW);
      Serial.println("Led Azul: Apagado");
    }
   }
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("Intentando conexión mqtt...");
    String clientId = "ESP8266Client-";
    clientId += String(random(0xffff), HEX);
    if (client.connect(clientId.c_str())) {
      Serial.println("Conectado");
      client.publish("test", "Funcionando :D");
      client.subscribe("test");   
      client.subscribe("Servo1");
      client.subscribe("Servo2");
      client.subscribe("Servo3");
      client.subscribe("Servo4");
      client.subscribe("LedRojo");
      client.subscribe("LedAzul");
      
    } 
    else {
      Serial.print("Error, rc=");
      Serial.print(client.state());
      Serial.println("Intentando nuevamente");
      delay(5000);
    }
  }
}

void setup() {
  Serial.begin(115200);
  setup_wifi();
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);

  pinMode(LedRojo, OUTPUT); 
  pinMode(LedAzul, OUTPUT);  

  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);

  servo1.attach(13);
  servo4.attach(15);

  servo1.write(0);
}

void loop() {

  if (!client.connected()) {
    reconnect();
  }
  client.loop();
  if(timer>10){
    digitalWrite(trigPin, LOW);
    delayMicroseconds(2);
    digitalWrite(trigPin, HIGH);
    delayMicroseconds(10);
    digitalWrite(trigPin, LOW);
    duration=pulseIn(echoPin, HIGH);
    distance=duration*0.034/2;
    Serial.print("Distancia: ");
    Serial.println(distance);
    snprintf (msg, MSG_BUFFER_SIZE, "Distancia: %ld cm", distance);
    client.publish("Sensor", msg);
    timer=0;
  }
  timer++;
  delay(50);
  }

//LedRojo     -->D1 --> 5
//LedAmarillo -->D2 --> 4

//Trig-->D5-->GPIO 14
//Echo-->D6-->GPIO 12

//Servo3-->D7-->GPIO 13
//Servo4-->D8-->GPIO 15

//Topics usados

//Test --> Tira el hello world en booteo

//Sensor --> coso que parece ojitos

//LedRojo     --> payload[1]==Prendido // payload[2]==Apagado
//LedAmarillo --> payload[1]==Prendido // payload[2]==Apagado
