

let dataServer;
let pubKey = "pub-c-5a04c952-fab4-49cc-a35f-da33b0716cbe";
let subKey = "sub-c-0b161a9d-451e-4516-af83-02d114ab0661";
let secretKey = "sec-c-ZDVjYTg3OTktM2UxMi00YzRjLWE2ZDUtYzgwYjQ2ZjNiYTJh";

let channelName = "messageHistory";

let you;

function preload() { 

  // logic to create a random UUID
    you = random(0,1000000); 
    console.log(you);
    you = int(you);
    console.log(you);
    you = you.toString();
  
}


function setup() {

    createCanvas(windowWidth, windowHeight);

    dataServer = new PubNub({
      subscribeKey: subKey,
      publishKey: pubKey,
      uuid: you,
      secretKey: secretKey,
      heartbeatInterval: 0,
    });

     // listen for messages coming through the subcription feed on this specific channel. 

    dataServer.subscribe({ channels: [channelName] });
    dataServer.addListener({ message: readIncoming });
   
  
    textAlign(CENTER);

    sendTheMessage();
    fetchMessages();

}

function fetchMessages() {
console.log("fetching");

  dataServer.fetchMessages(
    {
        channels: [channelName],
        end: '15343325004275466',
        count: 100
    },
    (status, response) => {
      drawMessages(response.channels.messageHistory);
    }
  );
   
}

function drawMessages(messageHistory) {

  console.log("in draw messages");
  background(255);
  textSize(80);
  text(messageHistory.length + " messages retrieved", windowWidth/2 , windowHeight/2);

}
  // PubNub logic below
function sendTheMessage() {
  // Send Data to the server to draw it in all other canvases
  dataServer.publish({
    channel: channelName,
    message: {
      messageText: "Entering the page"
    },
  });

}

function readIncoming(inMessage) {
  console.log(inMessage);
  fetchMessages();

}
