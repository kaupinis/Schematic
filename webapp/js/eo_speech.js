// eo_speech.js

const Tp = 1500;
var recg = null;
var astream = null;
var MasterStream = null;
var transcript = "";
var interim = "";
var bSpeechEnabled = false;
var bSpActive = false;
var bMicUsed = null;
var mic = null;
// var SR = null;
var recognizer, recorder, callbackManager, audioContext, outputContainer;
var isRecorderReady = isRecognizerReady = false;
var bPspeech = false;
var PREC = null;
var DWORKER = null;

var Cmds = ['quiet', 'reset', 'yes', 'no', 'menu', 'back', 'quick', 'help', 'alt', 'search', 'sketch', 'monitor', 'next', 'list', 'status', 'stat', 'nearby', 'platforms', 'alerts', 'connections', 'find',
'here', 'select', 'bus', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
'zero', 'commands',
'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l','m', 'n', 'o', 'p', 'q', 'r', 's', 't',
'u', 'v', 'w', 'x', 'y', 'z', 'space'
];

var grammar = '#JSGF V1.0; grammar cmds; public <cmd> = ' + Cmds.join(' | ') + ' ;';

function hasGetUserMedia() 
{
  var b = true;
  if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  else if(navigator.getUserMedia); 
  else if(navigator.webkitGetUserMedia); 
  else if(navigator.mozGetUserMedia); 
  else if(navigator.msGetUserMedia); 
  else if(window.webkitGetUserMedia); 
  else b = false;
  return(b);
}

function getAudioContext()
{
  var ctx = null;
  if('webkitAudioContext' in window)
  {
    ctx = new webkitAudioContext();
  }
  else
  {
    ctx = new window.AudioContext();
  }
  return(ctx);   
}

function enableSpeech()
{  
CloseMenu();
try
  {
    if(audioCtx == null)
    {
      audioCtx = getAudioContext();
    }
  }
  catch(e)
  {
    report("WebAudio is not supported by this browser.");
  }

  if (hasGetUserMedia()) 
  {
    UserMediaSupported = true;
    report("platform supports Microphone");
  }
  else UserMediaSupported = false;
  
  if(!bSpeechEnabled && UserMediaSupported && document.getElementById("sprec").checked)
  {
    // configure
    navigator.mediaDevices.getUserMedia({audio: true, video: false}).then(  
      function(ostream) {
        report("gotMic");
        if(ostream != null)
        {
          MasterStream = ostream;
          astream = MasterStream.clone();
          mic = audioCtx.createMediaStreamSource(astream);
          gainNode3 = audioCtx.createGain();
          gainNode3.gain.value = getMicSetting(); // 1;
//          report("gainNode3 min = " + gainNode3.gain.minValue);
//          report("gainNode3 max = " + gainNode3.gain.maxValue);
          mic.connect(gainNode3);
          checkSpeech();
          bSpeechEnabled = true;
          bMicUsed = false
          if(SNDMODE == 2)
          {
            if((voices != null)) // && !ipod) 
            {
                say("speech recognition enabled");
                report("speech recognition enabled");
            }
          }
        }
        else
        {
          report("99 configure Speech error: stream is null!");   
        }
        }).catch(function(err) {
          report("configure Speech error: " + err);
          bSpeechEnabled = false;
          });
  }
}

function checkSpeech()
{
  report("checkSpeech " + document.getElementById("useStd").checked);
  if(document.getElementById("sprec").checked)
  {
  if('SpeechRecognition' in window) SR = SpeechRecognition;
  else if('webkitSpeechRecognition' in window) SR = webkitSpeechRecognition;
  if((SR != null) && (recg == null) && document.getElementById("useStd").checked)
  {
    report("SpeechRecognition supported");
    bSpeechRecg = true;
    recg = new SR();
    if(!ipod)
    {
      var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
      var speechRecognitionList = new SpeechGrammarList();
      speechRecognitionList.addFromString(grammar, 1);
      recg.grammars = speechRecognitionList;   
    }
    recg.lang = 'en-US';
    recg.continuous = false;
    recg.interimResults = false;
    recg.maxAlternatives = 1;

//    recg.onstart = function() { ... }
    recg.onresult = resultProc;
    recg.onerror = function(evt) {
        report("--sp error " + evt.error + " " + evt.message); 
        document.getElementById("sb4").style.backgroundColor = "var(--audio-background)";
        };
    recg.onend = decodeCmd;
   
  }
  else if(!bSpeechRecg)
  {
    if(window.Worker)
    {
      callbackManager = new CallbackManager();
      spawnWorker("js/recognizer.js", function(worker) {
            // This is the onmessage function, once the worker is fully loaded
            DWORKER = worker;
            worker.onmessage = function(e) {
                // This is the case when we have a callback id to be called
                if (e.data.hasOwnProperty('id')) {
                  var clb = callbackManager.get(e.data['id']);
                  var data = {};
                  if ( e.data.hasOwnProperty('data')) data = e.data.data;
                  if(clb) clb(data);
                }
                // This is a case when the recognizer has a new hypothesis
                if (e.data.hasOwnProperty('hyp')) {
                  var newHyp = e.data.hyp;
                  if (e.data.hasOwnProperty('final') &&  e.data.final) 
                  {
                    transcript = newHyp;
                    decodeCmd();
                    newHyp = "Final: " + newHyp;
                    updateHyp(newHyp);
                  }
                }
                // This is the case when we have an error
                if (e.data.hasOwnProperty('status') && (e.data.status == "error")) {
                  updateStatus("Error in " + e.data.command + " with code " + e.data.code);
                }
            };
            // Once the worker is fully loaded, we can call the initialize function
            // but before that we lazy-load two files for keyword spoting (key phrase
            // file plus associated dictionary.
 /*           postRecognizerJob({command: 'lazyLoad',
                               data: {folders: [], files: [["/", "kws.txt", "../kws.txt"],
                                                           ["/", "kws.dict", "../kws.dict"]]}
                              }, initRecognizer);
            */
            initRecognizer();
            bSpeechRecg = true;
        });

        // The following is to initialize Web Audio
        try {
          audioContext = audioCtx;
        } catch (e) {
          updateStatus("Error initializing Web Audio browser");
        }
        if(UserMediaSupported)
        {
          startUserMedia(astream);
        }
        
      // Wiring JavaScript to the UI
      bPspeech = true;
      report("set bPspeech = true");
   }
  }
  }
  else
  {
//    report("SpeechRecognition not supported");  
     bPspeech = false;
     bSpeechRecg = false;
     document.getElementById("sb4").style.backgroundColor = "var(--audio-background)";
     if(recg != null)
     {
       // recg.terminate();
       recg = null;
     }
  }
}

function ptt()
{
  if(voices == null) initAudio();
  else 
  {
    PREC = startSpeechRec();
    if(PREC != null)
    {
      PREC.then(function(){
        decodeCmd();
      }).catch(function(e){
        report(e);
      });
    }
  }
}

function startSpeechRec()
{
  var p = null;
  var b = document.getElementById("sprec").checked;
  if(b)
  {
  if(synth != null) synth.cancel();
  if(!bSpActive && (recg != null))
  {
    p = new Promise(function(resolve, reject){
      recg.lang = "en-US"; //select_dialect.value;
      recg.onend = function(){
        resolve();
      }
      recg.onerror = function(){
        reject();
      }
      recg.start();   
      document.getElementById("sb4").style.backgroundColor = "red";
      });
  }
  else if(bPspeech)
  {
    p = new Promise(function(resolve, reject){
       DWORKER.onmessage = function(e) {
          if (e.data.hasOwnProperty('id')) {
                  var clb = callbackManager.get(e.data['id']);
                  var data = {};
                  if ( e.data.hasOwnProperty('data')) data = e.data.data;
                  if(clb) clb(data);
          }
           if (e.data.hasOwnProperty('hyp')) {
                  var newHyp = e.data.hyp;
                  if (e.data.hasOwnProperty('final') &&  e.data.final) 
                  {
                    transcript = newHyp;
 //                   decodeCmd0();
                    newHyp = "Final: " + newHyp;
                    resolve();
//                    updateHyp(newHyp);
                  }
          }
          if (e.data.hasOwnProperty('status') && (e.data.status == "error")) {
                  updateStatus("Error in " + e.data.command + " with code " + e.data.code);
                  reject("Error in " + e.data.command + " with code " + e.data.code);
          }
          };
        startRecording();
        });
  }
  else
  {
    stopSpeechRec();
    report("stopRecording");
    stopRecording();
  }
  }
  return(p);
}

function stopSpeechRec()
{
  if(recg != null) 
  {
    recg.abort();
    bSpActive = false;
    document.getElementById("sb4").style.backgroundColor = "var(--audio-background)";      
    stopRecording();
  }
}

function resultProc(event)
{
  for (var i = event.resultIndex; i < event.results.length; ++i) 
  {
    if (event.results[i].isFinal) 
    {
      transcript += event.results[i][0].transcript;
    }
    else
    {
      interim += event.results[i][0].transcript;   
    }
  }
}


function decodeCmd()
{
   document.getElementById("sb4").style.backgroundColor = "var(--audio-background)";
   bSpActive = false;
   var a = transcript.split(" ");
   var k = a.length;
   if(k > 0)
   {
     report("decodeCmd " + transcript + " / " + interim);
     var i = 0;
     var b = true;
     var numCmds = 0;
     var cmdIndex = -1;
     var cmdIndex2 = -1;
     var cmd1 = null;
     var cmd2 = null;
     while(b && (i < k))
     {
       if(isCmd(a[i])) 
       {
         if(numCmds == 0)
         {
           cmdIndex = i;
           numCmds += 1;
           cmd1 = a[i].toLowerCase();
         }
         else
         {
           var c2 = a[i].toLowerCase();
           if(c2 == cmd1)
           {
             cmdIndex2 = i;
             cmd2 = c2;
           }
           numCmds += 1;
         }
       }
       i += 1;
     }
     if(numCmds == 1)
     {
       decodeSpeech(cmd1);
     }
     else
     {
       report("  decoded " + numCmds + " commands");
       if(cmd2 != null)
       {
         decodeSpeech(cmd1);
       }
       else if(transcript.length >0) decodeSpeech(transcript);
     }
    
     /*
     var t = a[0];
     if(isCmd(a[0]) && (a[0].length > 1))
     {
       decodeSpeech(t.toLowerCase());
     }
     else if((k > 1) && isCmd(a[1]) && (a[1].length > 1))
     {
       decodeSpeech(a[1].toLowerCase());
     }
     else if((k > 2) && isCmd(a[2]) && (a[2].length > 1))
     {
       decodeSpeech(a[2].toLowerCase());
     }
     */
   }
   
//   var t = transcript.toLowerCase();
//   report("decodeCmd " + transcript + " / " + interim);
//   decodeSpeech(t);
   transcript = "";
   interim = "";
}

function isCmd(c)
{
  var cc = c.toUpperCase();
  var k = 24; //wordList.length;
  var b = false;
  var i = 0;
  while(!b && (i < k))
  {
    if((wordList[i])[0] == cc) b = true;
    i += 1;
  }
  return(b);  
}

function listCommands()
{
  say("Speech recognition commands are: ");
  var k = 24; //wordList.length;
  var i = 0;
  while(i < k)
  {
    say((wordList[i])[0]);
    i += 1;
  }
}


function postRecognizerJob(message, callback) 
{
  var msg = message || {};
  if (callbackManager) msg.callbackId = callbackManager.add(callback);
  if (recognizer) recognizer.postMessage(msg);
}

      // This function initializes an instance of the recorder
      // it posts a message right away and calls onReady when it
      // is ready so that onmessage can be properly set
function spawnWorker(workerURL, onReady) 
{
  recognizer = new Worker(workerURL);
  recognizer.onmessage = function(event) {
//    report("* " + event.command + " " + event.status);
    onReady(recognizer);
    }

          // As arguments, you can pass non-default path to pocketsphinx.js and pocketsphinx.wasm:
          // recognizer.postMessage({'pocketsphinx.wasm': '/path/to/pocketsphinx.wasm', 'pocketsphinx.js': '/path/to/pocketsphinx.js'});
//          recognizer.postMessage({'pocketsphinx.wasm': 'pocketsphinx.wasm','pocketsphinx.js': 'js/pocketsphinx.js'});
  recognizer.postMessage('');
}

      // To display the hypothesis sent by the recognizer
function updateHyp(hyp) 
{
 //       if (outputContainer) outputContainer.innerHTML = hyp;
  transcript = hyp;
  report("-- " + transcript);
}

      // This updates the UI when the app might get ready
      // Only when both recorder and recognizer are ready do we enable the buttons
function updateUI() {
//        if (isRecorderReady && isRecognizerReady) startBtn.disabled = stopBtn.disabled = false;
}

      // This is just a logging window where we display the status
function updateStatus(newStatus) {
   report(newStatus);
 //       document.getElementById('current-status').innerHTML += "<br/>" + newStatus;
}

function displayRecording(display) {
  if(display)
  {
     document.getElementById("sb4").style.backgroundColor = "red";
  }
  else 
  {
     document.getElementById("sb4").style.backgroundColor = "var(--audio-background)";
  }
}

      // Callback function once the user authorises access to the microphone
      // in it, we instanciate the recorder
function startUserMedia(stream) {
//        var input = audioContext.createMediaStreamSource(stream);
//  mic = audioCtx.createMediaStreamSource(stream);
  var input = gainNode3; //gainNode3;
        // Firefox hack https://support.mozilla.org/en-US/questions/984179
//        window.firefox_audio_hack = input; 
  var audioRecorderConfig = {errorCallback: function(x) {updateStatus("Error from recorder: " + x);}};
  recorder = new AudioRecorder(input, audioRecorderConfig);
  // If a recognizer is ready, we pass it to the recorder
  if (recognizer) 
  {
    recorder.consumers = [recognizer];
    report("set recorder.consumers = [recognizer]");
  }
  isRecorderReady = true;
  updateUI();
  updateStatus("Audio recorder ready");
}

function stopMic()
{
  if(mic != null)
  {
    mic.disconnect();
    if(astream != null)
    {
      var a = astream.getAudioTracks();
      var k = a.length;
      var i = 0;
      for(i=0; i<k; i++)
      {
 //       a[i].stop();
        a[i].enabled = false;
      }
    }
//  bMicUsed = false;
    mic = null;
    report("stop mic ");
  }
//  reportAudioStatus("stop mic");
}

function reportAudioStatus()
{
  if(astream == null) report("astream == null");
  else
  {
    var a = astream.getAudioTracks();
    var k = a.length;
    var s = "";
    var i = 0;
    for(i=0; i<k; i++)
    {
      var bEnabled = a[i].enabled;
      var bmute = a[i].muted;
      var readyState = a[i].readyState;
      var settings = a[i].getSettings();
      report("  track " + i + " enabled = " + bEnabled + " muted = " + bmute + " " + readyState + " vol = " + settings.volume );
      
    }
  }
}

function unlockAudioContex(ctx)
{
  var p = new Promise(function(resolve, reject) {
//  report("ctx.state = " + ctx.state);
  if(ctx.state === 'interrupted')
  {
      /*
    var events = ['touchstart', 'touchend', 'mousedown', 'keydown'];
 
    var clean = function clean() {
        var k = events.length;
        var i = 0;
        for(i = 0; i < k; i++)
        {
           document.body.removeEventListener(events[i], unlock);
        } 
    };

    var unlock = function unlock() {
        ctx.resume().then(clean());
        }
    
    var k = events.length;
    var i = 0;
    for(i = 0; i < k; i++)
    {
        document.body.addEventListener(events[i], unlock, false);
    }
    */
     
    ctx.resume().then(function() {
        resolve();
    }).catch(function(e) {
        reject(e);
    });
  }
  else resolve();
  });
  return(p);
}

function isAudioMuted()
{
  var bmute = false;
  var a = astream.getAudioTracks();
  var k = a.length;
  var i = 0;
  for(i=0; i<k; i++)
  {
    bmute = a[i].muted;
  }
  return(bmute);
}

      // This starts recording. We first need to get the id of the grammar to use
function startRecording()
{
    if(synth != null) 
    {
      synth.cancel();
    }
    var p = unlockAudioContex(audioCtx);
    p.then(function() {
        startRecording2();
    }).catch(function(e){
        report(e);
    });
}

function startRecording2()
{
    var bMuted = isAudioMuted();
    if(ipod && bMuted)
    {
//      navigator.mediaDevices.getUserMedia({audio: true, video: false}).then(  
//       function(stream) {
        document.getElementById("sb4").style.backgroundColor = "red";
//        report("startRecording gotMic2 ");
//        reportAudioStatus();
        bMicUsed = false;
        if(bMuted) 
        {
          astream = MasterStream.clone();
//          report("  made new astream, muted =  " +  isAudioMuted());
        }
        if(mic != null) mic.disconnect();
        mic = audioCtx.createMediaStreamSource(astream);
//        report("  made new mic");
         /*
          gainNode3 = audioCtx.createGain();
          gainNode3.gain.value = 1;
          mic.connect(gainNode3);
          gainNode3.connect(recorder.node); 
          mic.connect(recorder.node); //
          */
          mic.connect(gainNode3); //
//          recorder.node.connect(recorder.context.createAnalyser()); //
//          checkSpeech();
          bSpeechEnabled = true;
//          reportAudioStatus();
          var id = document.getElementById('grammars').value;
          if (recorder && recorder.start(id)) displayRecording(true);
          setTimeout(stopRecording, Tp);
        /*
        else
        {
          report("461 startRecording error: stream is null!");   
        }
        }).catch(function(err) {
          report("startRecording error: " + err);
          bSpeechEnabled = false;
          });
        */
    }
    else if(ipod)
    {
      if(astream != null)
      {
        var a = astream.getAudioTracks();
        var k = a.length;
        var i = 0;
        for(i=0; i<k; i++)
        {
          a[i].enabled = true;
        }
        reportAudioStatus("startRecording");
        var id = document.getElementById('grammars').value;
        if (recorder && recorder.start(id)) displayRecording(true);
        setTimeout(stopRecording, Tp);
      }
      else 
      {
        report("astream == null; stopMic");
        stopMic();   
      }
    }
    else
    {
      var id = document.getElementById('grammars').value;
      if (recorder && recorder.start(id)) displayRecording(true);
      setTimeout(stopRecording, Tp);
    }
}

      // Stops recording
function stopRecording() {
  recorder && recorder.stop();
  displayRecording(false);
  document.getElementById("sb4").style.backgroundColor = "var(--audio-background)"; 
//  if(ipod) stopMic();
}

      // Called once the recognizer is ready
      // We then add the grammars to the input select tag and update the UI
function recognizerReady() {
  updateGrammars();
  isRecognizerReady = true;
  updateUI();
  updateStatus("Recognizer ready");
}

      // We get the grammars defined below and fill in the input select tag
function updateGrammars() 
{
  var selectTag = document.getElementById('grammars');
  if(selectTag.children.length == 0)
  {
    for (var i = 0 ; i < grammarIds.length ; i++) 
    {
      var newElt = document.createElement('option');
      newElt.value=grammarIds[i].id;
      newElt.innerHTML = grammarIds[i].title;
      selectTag.appendChild(newElt);
    }
  }                          
}

      // This adds a grammar from the grammars array
      // We add them one by one and call it again as
      // a callback.
      // Once we are done adding all grammars, we can call
      // recognizerReady()
 function feedGrammar(g, index, id) 
 {
   report("feedGrammer");
   if (id && (grammarIds.length > 0)) grammarIds[0].id = id.id;
   if (index < g.length) 
   {
     grammarIds.unshift({title: g[index].title});
     postRecognizerJob({command: 'addGrammar', data: g[index].g},
            function(id) {feedGrammar(grammars, index + 1, {id:id});});
//          postRecognizerJob({command: 'addGrammar', data: grammarCmds},
   } 
   else 
   {
          // We are adding keyword spotting which has id 0
//          grammarIds.push({"id":0, "title": "Keyword spotting"});
     recognizerReady();
   }
        
  //        postRecognizerJob({command: 'addGrammar', data: grammarCmds}, recognizerReady());
}

      // This adds words to the recognizer. When it calls back, we add grammars
function feedWords(words) 
{
  report("feedWords");
  postRecognizerJob({command: 'addWords', data: words},
      function() {feedGrammar(grammars, 0);});
}

      // This initializes the recognizer. When it calls back, we add words
function initRecognizer() 
{
  report("initRecognizer");
          // You can pass parameters to the recognizer, such as : {command: 'initialize', data: [["-hmm", "my_model"], ["-fwdflat", "no"]]}
 /*         postRecognizerJob({command: 'initialize', data: [["-kws", "kws.txt"], ["-dict","kws.dict"]]},
                            function() {
                                        if (recorder) recorder.consumers = [recognizer];
                                        feedWords(wordList);});
          */
  postRecognizerJob({command: 'initialize'},
         function() {
         if (recorder) recorder.consumers = [recognizer];
                                        feedWords(wordList);});
}

var wordList = [ ["YES", "Y EH S"], ["NO", "N OW"], ["QUIET", "K W AY AH T"],
        ["RESET", "R IY S EH T"], ["MENU", "M EH N Y UW"], ["BACK", "B AE K"], ["QUICK", "K W IH K"],
        ["HELP", "HH EH L P"], ["ALT", "AA L T"], ["SEARCH", "S ER CH"], ["SKETCH", "S K EH CH"],
        ["MONITOR", "M AA N AH T ER"], ["NEXT", "N EH K S T"], ["LIST", "L IH S T"],
        ["STATUS", "S T AE T AH S"], ["STAT", "S T AE T"], ["NEARBY", "N IH R B AY"],
        ["PLATFORMS", "P L AE T F AO R M Z"], ["ALERTS", "AH L ER T S"], 
        ["CONNECTIONS", "K AH N EH K SH AH N Z"], ["HERE", "HH IY R"], ["SELECT", "S AH L EH K T"],
        ["BUS", "B AH S"], ["COMMANDS", "K AH M AE N D Z"], ["FIND", "F AY N D"] /*, 
        ["ONE", "W AH N"], ["TWO", "T UW"], ["THREE", "TH R IY"], 
        ["FOUR", "F AO R"], ["FIVE", "F AY V"], ["SIX", "S IH K S"], ["SEVEN", "S EH V AH N"], 
        ["EIGHT", "EY T"], ["NINE", "N AY N"], ["ZERO", "Z IH R OW"], 
        ["A", "EY"], ["B", "B IY"], ["C", "S IY"], ["D", "D IY"], ["E", "IY"], ["F", "EH F"],
        ["G", "JH IY"], ["H", "EY CH"], ["I", "AY"], ["J", "JH EY"], ["K", "K EY"], ["L", "EH L"],
        ["M", "EH M"], ["N", "EH N"], ["O", "OW"], ["P", "P IY"], ["Q", "K Y UW"], ["R", "AA R"],
        ["S", "EH S"], ["T", "T IY"], ["U", "Y UW"], ["V", "V IY"], ["W", "D AH B AH L Y UW"],
        ["X", "EH K S"], ["Y", "W AY"], ["Z", "Z IY"], ["SPACE", "S P EY S"] */
               ];

var numberList = [ ["ONE", "W AH N"], ["TWO", "T UW"], ["THREE", "TH R IY"], 
        ["FOUR", "F AO R"], ["FIVE", "F AY V"], ["SIX", "S IH K S"], ["SEVEN", "S EH V AH N"], 
        ["EIGHT", "EY T"], ["NINE", "N AY N"], ["ZERO", "Z IH R OW"]
               ];
var lettersList = [ ["A", "EY"], ["B", "B IY"], ["C", "S IY"], ["D", "D IY"], ["E", "IY"], 
        ["F", "EH F"],
        ["G", "JH IY"], ["H", "EY CH"], ["I", "AY"], ["J", "JH EY"], ["K", "K EY"], ["L", "EH L"],
        ["M", "EH M"], ["N", "EH N"], ["O", "OW"], ["P", "P IY"], ["Q", "K Y UW"], ["R", "AA R"],
        ["S", "EH S"], ["T", "T IY"], ["U", "Y UW"], ["V", "V IY"], ["W", "D AH B AH L Y UW"],
        ["X", "EH K S"], ["Y", "W AY"], ["Z", "Z IY"], ["SPACE", "S P EY S"] 
               ];

        
var grammarCmds = {numStates: 1, start: 0, end: 0, transitions: [
    {from: 0, to: 0, word : "YES"},
    {from: 0, to: 0, word : "NO"},
    {from: 0, to: 0, word : "QUIET"},
    {from: 0, to: 0, word : "RESET"},
    {from: 0, to: 0, word : "MENU"},
    {from: 0, to: 0, word : "BACK"},
    {from: 0, to: 0, word : "QUICK"},
    {from: 0, to: 0, word : "HELP"},
    {from: 0, to: 0, word : "ALT"},
    {from: 0, to: 0, word : "SEARCH"},
    {from: 0, to: 0, word : "SKETCH"},
    {from: 0, to: 0, word : "MONITOR"},
    {from: 0, to: 0, word : "NEXT"},
    {from: 0, to: 0, word : "LIST"},
    {from: 0, to: 0, word : "STATUS"},
    {from: 0, to: 0, word : "STAT"},
    {from: 0, to: 0, word : "NEARBY"},
    {from: 0, to: 0, word : "PLATFORMS"},
    {from: 0, to: 0, word : "ALERTS"},
    {from: 0, to: 0, word : "CONNECTIONS"},
    {from: 0, to: 0, word : "HERE"},
    {from: 0, to: 0, word : "SELECT"},
    {from: 0, to: 0, word : "BUS"},
    {from: 0, to: 0, word : "COMMANDS"},
    {from: 0, to: 0, word : "FIND"} /*,
    {from: 0, to: 0, word : "ONE"},
    {from: 0, to: 0, word : "TWO"},
    {from: 0, to: 0, word : "THREE"},
    {from: 0, to: 0, word : "FOUR"},
    {from: 0, to: 0, word : "FIVE"},
    {from: 0, to: 0, word : "SIX"},
    {from: 0, to: 0, word : "SEVEN"},
    {from: 0, to: 0, word : "EIGHT"},
    {from: 0, to: 0, word : "NINE"},
    {from: 0, to: 0, word : "ZERO"},
    {from: 0, to: 0, word : "A"},
    {from: 0, to: 0, word : "B"},
    {from: 0, to: 0, word : "C"},
    {from: 0, to: 0, word : "D"},
    {from: 0, to: 0, word : "E"},
    {from: 0, to: 0, word : "F"},
    {from: 0, to: 0, word : "G"},
    {from: 0, to: 0, word : "H"},
    {from: 0, to: 0, word : "I"},
    {from: 0, to: 0, word : "J"},
    {from: 0, to: 0, word : "K"},
    {from: 0, to: 0, word : "L"},
    {from: 0, to: 0, word : "M"},
    {from: 0, to: 0, word : "N"},
    {from: 0, to: 0, word : "O"},
    {from: 0, to: 0, word : "P"},
    {from: 0, to: 0, word : "Q"},
    {from: 0, to: 0, word : "R"},
    {from: 0, to: 0, word : "S"},
    {from: 0, to: 0, word : "T"},
    {from: 0, to: 0, word : "U"},
    {from: 0, to: 0, word : "V"},
    {from: 0, to: 0, word : "W"},
    {from: 0, to: 0, word : "X"},
    {from: 0, to: 0, word : "Y"},
    {from: 0, to: 0, word : "Z"},
    {from: 0, to: 0, word : "SPACE"} */
    ]};
    
var spellingCmds = {numStates: 1, start: 0, end: 0, transitions: [
    {from: 0, to: 0, word : "A"},
    {from: 0, to: 0, word : "B"},
    {from: 0, to: 0, word : "C"},
    {from: 0, to: 0, word : "D"},
    {from: 0, to: 0, word : "E"},
    {from: 0, to: 0, word : "F"},
    {from: 0, to: 0, word : "G"},
    {from: 0, to: 0, word : "H"},
    {from: 0, to: 0, word : "I"},
    {from: 0, to: 0, word : "J"},
    {from: 0, to: 0, word : "K"},
    {from: 0, to: 0, word : "L"},
    {from: 0, to: 0, word : "M"},
    {from: 0, to: 0, word : "N"},
    {from: 0, to: 0, word : "O"},
    {from: 0, to: 0, word : "P"},
    {from: 0, to: 0, word : "Q"},
    {from: 0, to: 0, word : "R"},
    {from: 0, to: 0, word : "S"},
    {from: 0, to: 0, word : "T"},
    {from: 0, to: 0, word : "U"},
    {from: 0, to: 0, word : "V"},
    {from: 0, to: 0, word : "W"},
    {from: 0, to: 0, word : "X"},
    {from: 0, to: 0, word : "Y"},
    {from: 0, to: 0, word : "Z"},
    {from: 0, to: 0, word : "SPACE"} 
    ]};
    
//var grammars = [{title: "Cmds", g: grammarCmds}, {title: "Cmds", g: spellingCmds}];
var grammars = [{title: "Cmds", g: grammarCmds}];
var grammarIds = [];
    

