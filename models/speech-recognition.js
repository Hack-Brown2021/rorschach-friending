
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var grammar = '#JSGF V1.0; grammar colors; public <color> = aqua | azure '

const sr = new SpeechRecognition();

var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
sr.grammars = speechRecognitionList;
sr.continuous = true;
sr.lang = 'en-US';
sr.interimResults = false;
sr.maxAlternatives = 1;


//instantiate speech recognition object



function startSR(){
    /* Starts SpeechRecognition stream. */
    sr.start();
    console.log('Speech recognition started...');
}


sr.onresult = function(event){
    const res = event.results;
    const trans = res.map(function(elt){return elt[0]});
    console.log('Result produced.');
}


sr.onaudiostart = function(event){
    console.log('Capturing audio...');
}


function stopSR(){
    /* Stops SpeechRecognition stream. */
    sr.stop();

    console.log('Speech recognition stopped.');
}


var recording = false;

document.getElementById("recButton").onclick = function() {
    if (recording) {
        stopSR();
    } else {
        startSR();
    }
    recording = !recording;
};



sr.onnomatch = function(event) {
    console.log('No match.');
  }
  
sr.onerror = function(event) {
    console.log('Error: ' + event.error);
}

