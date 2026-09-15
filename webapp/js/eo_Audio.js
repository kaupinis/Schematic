// eo_Audio.js

let synth = null;
let bFirstVoice = true;
let SNDMODE = 0;
let NCHECK = 0;
let bSndBusy = false;
let voices = [];
let bVoices = false;
let SelectedVoiceIndex = -1;
let bDontBeep = true;
let bDontOK = false;
let bafirst = true;

function initAudio()
{
//  report("7 initAudio");
  synth = window.speechSynthesis;
  initAudio1().then(function(v){
    if(v.length != 0) 
    {
      bVoices = true;
      report("20 platform supports speech synthesis");
      bafirst = true;
//      populateVoices();
    }
    else 
    {
      report("25 platform supports speech synthesis but no voices");
//      populateVoices();
//      synth.onvoiceschanged = populateVoices;
      synth.addEventListener("voiceschanged", function(evt){
        voices = synth.getVoices();
        if(voices != null) 
        {
          report("found " + voices.length + "voices c");
          bafirst = true;
          populateVoices();
        }
        else report("no voices found c");
        }, true);
    }

    }).catch(function(e){
//      report("platform does not support speech. " + e);
    });
}

 function initAudio1()
{
 let p = new Promise(function(resolve, reject){
//    synth = window.speechSynthesis;
    if((typeof synth != 'undefined') && (synth != null))
    {
      let dummy = new SpeechSynthesisUtterance();
      voices = synth.getVoices();
      if(voices.length !== 0)
      {
        bVoices = true;
        populateVoices();
        resolve(voices);
      }
      else if(typeof synth.onvoiceschanged !== 'undefined') 
      {
        synth.addEventListener("voiceschanged", function() {
          voices = synth.getVoices();
          report("voices a changed " + voices.length);
          if(voices.length != 0) 
          {
            bVoices = true;
            populateVoices();
            resolve(voices);
          }
          else
          {
            reject("10716 no voices found");
          }
          });        
      }
      else
      {
        let id;
        id = setTimeout(() => {
          if (synth.getVoices().length !== 0) {
             resolve(synth.getVoices());
//             clearInterval(id);
          }
        }, 5000);
      }      
    }
    else 
    {
      noAudio();
      reject("no speech synthesis");
    }
  });
  return(p);
}

function populateVoices()
{
//  voices = synth.getVoices();
  let vs = document.getElementById("vselect");
//  vs.multiple  = false;
  let ds = -1;
  let es = -1;
  let fs = -1;
  let gs = -1;
  let defau = -1;
  let selname = getLocal("TrainsVoiceName");
  let sellang = getLocal("TrainsVoiceLang");
//  report("11276 " + selname + " " + sellang + " " + SelectedVoiceIndex);
  if((bFirstVoice || (vs.options.length == 0)) && (voices.length > 0))
  {
  report("102 voices length = " + voices.length); 
  for(i = 0; i < voices.length ; i++) 
  {
    if((voices[i] != null) && (voices[i].lang != null))
    {
//    report(voices[i].name + " " + voices[i].lang);
      bFirstVoice = false;
      let opt = document.createElement('option');
      opt.textContent = voices[i].name + '(' + voices[i].lang + ')';
      if(SelectedVoiceIndex == -1)
      {
        if(voices[i].name == "Samantha") ds = i;
        if(voices[i].name.indexOf("Samantha") != -1) fs = i;  // apple
        if(voices[i].name.indexOf("English_(America") != -1) gs = i;
        if(voices[i].lang == "en-US") es = i;  // chrome
      }
      if(voices[i].default)
      {
        opt.textContent += ' -- DEFAULT';
        defau = i;
      }
//    report("default = " + ds);
      opt.setAttribute('data-lang', voices[i].lang);
      opt.setAttribute('data-name', voices[i].name);
      vs.appendChild(opt);
      if((selname == voices[i].name) && (sellang == voices[i].lang))
      {
        vs.selectedIndex = i;
        SelectedVoiceIndex = i;
      }
    }
  }
  if(SelectedVoiceIndex == -1)
  {
    if(fs != -1) SelectedVoiceIndex = fs;
    else if(ds != -1) SelectedVoiceIndex = ds;
    else if(gs != -1) SelectedVoiceIndex = gs;
    else if(es != -1) SelectedVoiceIndex = es;
    else if(defau != -1) SelectedVoiceIndex = defau;
    else SelectedVoiceIndex = 0;
    vs.selectedIndex = SelectedVoiceIndex;
//    selectLang();
//  report("11439 voice " + vs.selectedIndex + " " + voices[vs.selectedIndex].lang + " " + voices[vs.selectedIndex].name);
  }
  }

  if((voices.length > 0) && (synth != null)) 
  {
    bVoices = true;
    if(document.getElementById("eaudio").checked)
    {
      document.getElementById("sb3").style.visibility = "visible";
    }
    else
    {
//      document.getElementById("sb3").style.visibility = "visible";
      setTimeout(noAudio, 20000);
    }
  }
}

function say(txt)
{
  let p = new Promise(function(resolve, reject){
    if((synth == null) || (voices.length == 0))
    {
      report("synth null, say redefine");
      synth = window.speechSynthesis; 
    }
    if(typeof txt === 'undefined') report("10145 say(txt) txt undefined");
    else if(typeof txt.split === 'undefined') report("10146 txt is " + txt);
    else if((synth != null) && (voices.length > 0))
    {
      if(synth.paused) synth.resume();
      let sentences = txt.split("^");
      let j = 0;
      for(j = 0; j < sentences.length; j++)
      {
        let sentence = sentences[j];
        let phrase = new SpeechSynthesisUtterance(sentence); // was txt
        let i = document.getElementById("vselect").selectedIndex;
        SelectedVoiceIndex = i;
        phrase.voice = voices[i];
        phrase.pitch = 1.0;
        phrase.rate = 1.0;
        phrase.lang = phrase.voice.lang;
        phrase.onerror = function(event) {
          reject("Speech error sentence " + j + " " + event.error);
          };
        if(j == sentences.length - 1) phrase.onend = resolve(sentence);
        synth.speak(phrase);
        reportBubble(sentence);
      }
    }
    else if(synth == null)reject("Speech error synth is null");
    else reject("11421 no voices");
    });
  p.then(function(d){
    report(d);
    }).catch(function(e){
 //     report(e);
      });
}

function enaudio()
{
  CloseMenu();
//  if(typeof synth !== 'undefined')
  {
  if(document.getElementById("eaudio").checked)
  {
    document.getElementById("sb3").style.visibility = "visible";
    if(voices.length > 0)
    {
      populateVoices();
    }
    else 
    {
      initAudio().then( function(v){
        voices = v;
        if(v.length > 0)
        {
          populateVoices();
        }
      }).catch(function(e){
          reject(e);
        })
    }
  }
  else
  {
    SNDMODE = 0;
    document.getElementById("sb3").style.visibility = "hidden";
    hideSnd();
  }
  beep1();
  }
  /*
  else
  {
    report("No speech synthesis available.");
  }
  */
}

function noAudio()
{
  if(SNDMODE == 0)
  {
    document.getElementById("sb3").style.visibility = "hidden";
    hideSnd();
  }
}


function snd(n)
{
if(typeof synth !== 'undefined')
{
  if(n == 3)
  {
//    report("262 snd3 " + SNDMODE);
    if(SNDMODE == 0)
    {
//      document.getElementById("eaudio").checked = true;
      if(SPREC.checked && !bSpeechEnabled) enableSpeech();
 //     if(!bWelcomeClosed)
      {
//        closeMenuById("Welcome");
//        bWelcomeClosed = true;
        closeWelcome();
      }
//      setScalable(false);
    }
    if((SNDMODE == 0) || (SNDMODE == 1))
    {
//      if((voices.length > 0) &&(SNDMODE == 0))  say("eight olives trains");
      if((synth != null) &&(SNDMODE == 0))  say("eight olives Schematic");
      SNDMODE = 2;
      document.getElementById("sb1").style.visibility = "visible";
      document.getElementById("sb2").style.visibility = "visible";
      document.getElementById("sb3").style.visibility = "visible";
      document.getElementById("sb4").style.visibility = "visible";
      document.getElementById("sb5").style.visibility = "visible";
 //     beep1();
 //     if(!bOnLine) sayPhrase("EOP1"); //say("Offline schedule mode.");
 //     if(locfirst) say("Geolocation not enabled.");
 //     sayPhrase("EOP2"); //
      say("Use the lower left corner quiet button to reset.");
//      sayPhrase("EOP3"); //
      say("Click the right side center Menu button twice for help.");
      NCHECK = n;
 //     announceStatus(0);
//      setTimeout(gCheck, 5000);
    }
    else if(SNDMODE == 3)
    {
      SNDMODE = 1;
      hideSnd();
//      nextSndState(n);
    }
  }
  
  else if(n == 2)
  {
    bSndBusy = false;
  }
  
  if(!bSndBusy)
  {
    if(synth.paused)
    {
      report("SpeechSynthesis is paused!");
      synth.resume();
    }
//    if((n == 4) && (bSpeechRecg || bPspeech)) startSpeechRec();
    
    bSndBusy = true;
    nextSndState(n);
    bSndBusy = false;
  }
}
}

function snd2(n)
{
  if(bSpeechRecg || bPspeech) snd(6);
  else snd(4);
}

function hideSnd()
{
 /*     document.getElementById("sb1").style.display = "none";
      document.getElementById("sb2").style.display = "none";
      document.getElementById("sb4").style.display = "none";
      document.getElementById("sb5").style.display = "none"; */
      document.getElementById("sb1").style.visibility = "hidden";
      document.getElementById("sb2").style.visibility = "hidden";
      document.getElementById("sb4").style.visibility = "hidden";
      document.getElementById("sb5").style.visibility = "hidden";
}

function beep1()
{
  setTimeout(beep3, 400);   
}

let biOS = false;

function beep3() {
  var bq =false;
  if((typeof synth !== 'undefined') && (synth != null) && (document.getElementById("eaudio").checked))
  {
    if(synth.speaking) ;
    else if(biOS || bDontBeep)
    {
      if(!bDontOK) say("Ok.");
    }
  }
  if(!bDontBeep && !ipod) 
  {
  (new
	Audio(
	"data:audio/wav;base64,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 /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU="
	)).play();
  }
}

function beep2() {
  (new
	Audio(
	"data:audio/wav;base64,/+MYxAAEaAIEeUAQAgBgNgP/////KQQ/////Lvrg+lcWYHgtjadzsbTq+yREu495tq9c6v/7vt/of7mna9v6/btUnU17Jun9/+MYxCkT26KW+YGBAj9v6vUh+zab//v/96C3/pu6H+pv//r/ycIIP4pcWWTRBBBAMXgNdbRaABQAAABRWKwgjQVX0ECmrb///+MYxBQSM0sWWYI4A++Z/////////////0rOZ3MP//7H44QEgxgdvRVMXHZseL//540B4JAvMPEgaA4/0nHjxLhRgAoAYAgA/+MYxAYIAAJfGYEQAMAJAIAQMAwX936/q/tWtv/2f/+v//6v/+7qTEFNRTMuOTkuNVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV"
	)).play();
}

function quiet()
{
  if(synth != null) 
  {
    synth.cancel();   
  }
  stopSpeechRec();
//  CurrentPhrase = 0;
  CloseMenu();
}

function spause()
{
  if(synth != null) synth.pause();   
}

function sresume()
{
  if(synth != null) synth.resume();   
}
