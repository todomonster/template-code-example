// https://github.com/mqttjs/MQTT.js/#qos
const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://test.mosquitto.org");

client.on("connect", () => {
  client.subscribe("presence", (err) => {
    if (!err) {
      client.publish("presence", "Hello mqtt");
    }
  });
});
let counter = 0;
client.on("message", (topic, message) => {
  // message is Buffer
  console.log(message.toString());
  counter++;
  setTimeout(() => {
    client.publish("presence", `Hello mqtt ${counter}`);
  }, 2000);
  if (counter > 10) {
    client.end();
  }
});
