// eo_Audio1.js

let bxReport = false;
let SNDSTATE = 0;
let tix = 0;
let xx = 0;
let TRESULT = "";

function xreport(s)
{
  if(bxReport) report(s);   
}

function setSndState(n)
{
  xreport("setSndState = " + n);
  SNDSTATE = n;
}

function getSndState()
{
  return(SNDSTATE);
}

function nextSndState(x)
{
  xreport("SNDMODE = " + SNDMODE + ", setSndState " + SNDSTATE + ", x = " + x );
  report("28 State = " + SNDSTATE + " x = " + x);
  if((SNDMODE == 0) || (SNDMODE == 1))
  {
    // turn off sound
    setMonitorMode(false);
    bNumberMode = false;
//    bMonitorCnx = false;
    //    quiet();
  }
  else 
  {
    if(x == 2) 
    {
      clearReport();  
      setSndState(0); 
      quiet();
      say("OK");
      /*
      xreport("SNDMODE = " + SNDMODE + ", setSndState( " + SNDSTATE + ", x = " + x); 
      say("OK");
      beep1();
      if(bScanning)
      {
        bScanning = false;
        if(Discoveryworker != null)
        {
          BFIND.style.backgroundColor = "#cccc99";   
          Discoveryworker.postMessage([2, ""]); // abort  
        }
      }
      */
    }
    else if(x == 6)
    {
      spRec();   
    }
    switch(SNDSTATE)
    {
      case 0:  // quiescent
          if(x == 3) // announce status
          {
            setSndState(0);
            if(bafirst) 
            {
              bafirst = false;
              announceStatus(0);  
            }
            else announceStatus(0);
          }
          else if(x == 1) // status
          {
            announceStatus(0);
            setSndState(0);
            CurrentPhrase = 0;
          }
          else if(x == 5)  
          {
            SNDMODE = 2;
            setSndState(1);
            CurrentPhrase = 0;
            say("Main Menu");
            announceMenu();
          }
          xx = 0;
          break;
      case 1:
          if(x == 3) // announce menu yes
          {
            announceMenuItem();
          }
          else if(x == 1) // no
          {
            setSndState(2);
            CurrentPhrase += 1;
            announceMenu();
          }
          else if(x == 5) // quickhelp
          {
            setSndState(3);
            CurrentPhrase = 0;
            say("Quick help");
            announceQuickhelpItem();
          }
          
          break;
      case 2:
          if(x == 3) // announce menu yes
          {
            announceMenuItem();
          }
          else if(x == 1) // no
          {
            setSndState(2);
            CurrentPhrase += 1;
            announceMenu();
          }
          else if(x == 5) // back
          {
            if(CurrentPhrase > 0) CurrentPhrase -= 1;
            announceMenu();
          }
          break;
      case 3:   // announce quickhelp
          if(x == 3) // announce menu yes
          {
            announceQuickhelpItem();
          }
          else if(x == 1) // no
          {
            setSndState(3);
            CurrentPhrase += 1;
            announceHelpMenuItem();
          }
          else if(x == 5) // back
          {
            if(CurrentPhrase > 0) CurrentPhrase -= 1;
            announceHelpMenuItem();
          }
          break;
      case 4:   // frequency adjust
          let d = Number(CurrentMode.tincs[CurrentMode.tix]);
          if(x == 3) // 
          {
            finc(d);
            announceFrequency(0);
         }
          else if(x == 1) // no
          {
            finc(-d);
            announceFrequency(0);
          }
          else if(x == 5) // back
          {
            CurrentMode.tix -= 1;
            if(CurrentMode.tix < 0) CurrentMode.tix = CurrentMode.tincs.length - 1;
            d = Number(CurrentMode.tincs[CurrentMode.tix]);
            say("Yes to increase by " + d + " hertz.");
            say("No to decrease.");
//            say("Change by " + d + " hertz?");
          }
          break;
      case 5:   // modes
          if(x == 3) // announce menu yes
          {
            let newmode = Modes[CurrentPhrase];
            setRadioMode(newmode.id);
            setLocalMode(newmode.id);
            say("new mode is " + CurrentMode.voice);
            setSndState(0);
          }
          else if(x == 1) // no
          {
            CurrentPhrase += 1;
            announceModeOptions();
          }
          else if(x == 5) // back
          {
            if(CurrentPhrase > 1) CurrentPhrase -= 1;
            announceModeOptions();
          }
          break;
      case 6:  // bands
          if(x == 3) // yes
          {
            let BandNumber = Bands[CurrentPhrase].BandNumber;
            selectLocalBand(BandNumber);
            selectRadioBand(BandNumber);
            say("new band selection is " + Bands[CurrentPhrase].desc);
            setSndState(0);
          }
          else if(x == 1) // no
          {
            CurrentPhrase += 1;
            announceBandOptions();
          }
          else if(x == 5) // back
          {
            if(CurrentPhrase > 1) CurrentPhrase -= 1;
            announceBandOptions();
          }
          break;
      case 100: // status help
          if(x == 3) // yes
          {
            if(CurrentPhrase == 1) // no server
            {
              if(serverurl != "")
              {
                say("Is the server I. P. address " + serverurl + " on port " + serverport + "?");
                setSndState(101);
              }
              else
              {
                say("The server I. P. address needs to be set in the Setup Menu.");
                setSndState(102);
              }
            }
            else if(CurrentPhrase == 2) // no log in
            {
              if(callsign == "")
              {
                say("No callsign in the Setup Menu.^ Update this?");
                setSndState(110);
              }
              else 
              {
                say("The callsign in the Setup Menu is " + callsign + ".^ Update this?");
                setSndState(110);
              }
            }
          }
          else if(x == 1) // no
          {
            say("OK");
            setSndState(0);
          }
          else if(x == 5)  
          {
            SNDMODE = 2;
            setSndState(1);
            CurrentPhrase = 0;
            say("Main Menu");
            announceMenu();
          }
          break;
      case 101:
          if(x == 3) // yes
          {
            say("Be sure your browser accepts the server's secure certificate then restart this software.^");
            setSndState(0);
          }
           else if(x == 1) // no
          {
            menu("Setup");
            say("Enter the server I. P. address in the Setup Menu then restart the software.");
            setSndState(0);
          }
          else if(x == 5)  
          {
            setSndState(0);
         
          }
          break;
      case 102:  // scan or not
          if(x == 3) // yes scan
          {
            say("Be sure your browser accepts the server's secure certificate then restart this software.^");
//            findX();
            setSndState(0);
          }
           else if(x == 1) // no show setup
          {
            menu("Setup");
            say("Enter the server I. P. address in the Setup Menu then restart the software.");
            setSndState(0);
          }
          else if(x == 5)  
          {
            setSndState(0);
         
          }
          break;
      case 110:  // update callsign
          if(x == 3) // yes 
          {
            menu("Setup");
            say("Update callsign in the Setup Menu then restart the software."); 
            setSndState(0);
          }
          else if(x == 1) // enter passphrase
          {
            login();
            say("The current passphrase is " + PPHRASE.value + ".^ Click YES if OK or change it.");
            setSndState(111);
          }
          else if(x == 5)  
          {
            PPHRASED.close();
            setSndState(0);
         
          }
          break;
      case 111:  // 
          if(x == 3) // yes 
          {
            login1();
            setSndState(0);
          }
          else if(x == 1) // 
          {
            PPHRASED.close();
            setSndState(0);  
          }
          else if(x == 5)  
          {
            PPHRASED.close();
            setSndState(0);
         
          }
          break;
      case 200:
          if(x == 3) // yes 
          {
            CurrentPhrase += 1;
            announceOptions();
          }
          else if(x == 1) // no
          {
            switch(CurrentPhrase)
            {
                case 0:
                    if(SPREC.checked) SPREC.checked = false; 
                    else SPREC.checked = true;
                    break;
            }
            announceOptions();             
          }
          else if(x == 5)  
          {
            if(CurrentPhrase > 0)
            {
              CurrentPhrase -= 1;  
            }
            announceOptions();                      
          }
          break;
      case 300:  // change server settings
          switch(xx)
          {
              case 0:
                 if(x == 1) // no 
                 {
                   say("OK");
                   setSndState(0);   
                 }
                 else if(x == 3) // yes 
                 {
                    setup();
                    if(SERVERURL.value == "") say("If the server is not on this platform,^ the I.P. address must be entered into the setup menu.^");
                    else say("The current server I.P. address is " + SERVERURL.value + ".^");
                    if(SERVERPORT.value == "") say("The server port number should be set to 3001.");
                    else say("The current server port number is " + SERVERPORT.value);
                    if(bSpeechRecg)
                    {
                      say("Do you want to use speech recognition?^");
                      setSndState(301);
                    }
                 }
          }
          
          break;
      case 301:
          if(x == 1) // no 
          {
            say("OK");
            setSndState(0);   
          }
          else if(x == 3) // yes 
          {
            say("Press the southeast button and say the I.P. address as digits and the word point.");
            setSndState(302);
          }
          break;
      case 302:
          if(x == 1) // no 
          {
            say("OK.^ Try again.^");

          }
          else if(x == 3) // yes 
          {
            SERVERURL.value = TRESULT;
            setSndState(0);
          }
          break;
      case 400:
          if(x == 1) // no 
          {
            say("OK");
            setSndState(0);   
          }
          else if(x == 3) // yes 
          {
            say("Press the southeast button and say the callsign.");
            setSndState(401);
          }
          break;
      case 401:
          if(x == 1) // no 
          {
            say("OK.^ Try again.^");

          }
          else if(x == 3) // yes 
          {
            CALLSIGN.value = TRESULT;
            if(LICENSE.selectedIndex == 0) say("No license is selected in the setup menu.^ Do you wish to change it?^");
            else 
            {
              say("Selected License is " + LICENSE.value + ".^ Do you wish to change it?^");
            }
            setSndState(402);
          }
          break;
      case 402:
          if(x == 1) // no 
          {
            say("OK");
            setSndState(0);   
          }
          else if(x == 3) // yes 
          {
            say("Press the southeast button and say the License class.^");
            setSndState(403);
          }
          break;
      case 403:
          if(x == 1) // no 
          {
            say("OK.^ Try again.^");

          }
          else if(x == 3) // yes 
          {
            LICENSE.value = TRESULT;
            if(PPHRASE.value == "") say("No pass phrase is entered.^ Do you wish to change it?^");
            else say("Entered pass phrase is " + PPHRASE.value + ".^Do you wish to change it?^");
             setSndState(404);
          }
          break;
      case 404:
          if(x == 1) // no 
          {
            say("OK");
            setSndState(0);   
          }
          else if(x == 3) // yes 
          {
            say("Press the southeast button and say the pass phrase.^");
            setSndState(405);
          }
          break;
      case 405:
          if(x == 1) // no 
          {
            say("OK.^ Try again.^");

          }
          else if(x == 3) // yes 
          {
            PPHRASE.value = TRESULT;
            say("Try to log in?");
            setSndState(406);
          }
          break;
      case 406:
          if(x == 1) // no 
          {
            say("OK");
            setSndState(0);   
          }
          else if(x == 3) // yes 
          {
            login1();
            setSndState(0);
          }
          break;
    default:
          setSndState(0);
          say("OK");
          break;
    } // end of switch   
    
    
    
    
  }
}  // exd of nextSndState(x)
                      
function sndcb(t)
{
  switch(SNDSTATE)
  {
      case 302:  // IP address
          TRESULT = t;
          say("Change the I.P. address to " + TRESULT + "?");
          break;
      case 401:  // callsign
          TRESULT = t;
          say("Change the Callsign to " + TRESULT + "?");
          break;
      case 403:  // license
          TRESULT = t;
          say("Change the License to " + TRESULT + "?");
          break;
      case 405:  // passphrase
          TRESULT = t;
          say("Change the pass phrase to " + TRESULT + "?");
          break;
  }
    
}

const AudioMenu = ["Schematic ops", "Sheet ops", "Component ops", "Net ops", "Get Server", "Log in",  "Options"]

function announceMenu()
{
  if(CurrentPhrase < AudioMenu.length)
  {
    say(AudioMenu[CurrentPhrase]);
  }
  else
  {
    CurrentPhrase = 0;
//    setSndState(0);
    say(AudioMenu[CurrentPhrase]);
  }
     
}

async function announceMenuItem()
{
  switch( CurrentPhrase)
  {
      case 0:  // status
          announceStatus(0);
          break;
      case 1:  // schematic ops
          announceFrequency(0);
          d = Number(CurrentMode.tincs[CurrentMode.tix]);
          say("Yes to increase by " + d + " hertz.");
          say("No to decrease.");
          say("Back to set step size.");
          setSndState(4);
          break;
      case 2: // set band
          let CurrentBandNo = await getRadioBand("A");
          CurrentPhrase = 0;
          if(CurrentBandNo != null)
          {
            let CurrentBand = getBandByNumber(CurrentBandNo);
            say("current band is " + CurrentBand.desc + " Change to ^" );
            announceBandOptions();
            setSndState(6);
          }
          else
          {
            say(" Change to ^");
            announceBandOptions();
            setSndState(6);
          }
          break;
      case 3:  // set mode
          say("current mode is " + CurrentMode.voice);
          CurrentPhrase = 1;
          announceModeOptions();
          setSndState(5);
          break;
      case 4:  //get server
            if(bNoServer)
            {
              say("No server was found.^ If you can, check that a server is actually running.^ Also check if a pop-up tab testing the SSL certificate, needs your acceptance.^"); 
            
              if(SERVERURL.value == "") say("The server I.P address in the setup menu is blank.^ Please update this.^");
              else say("The server I.P. address in the setup menu is " + SERVERURL.value + ".^ Verify that is correct.^");
                
            }
            else say("A server was found.^ The server I.P. address in the setup menu is " + SERVERURL.value + ".^ ");
            say("Change server settings?");
            setSndState(300);
            
          
          break;
      case 5:  // login
          if(bloggedin) 
          {
            say("Logged in OK.^");
            announceStatus(0);
          }
          else
          {
            if(bNoServer)
            {
              say("No server was found.^ If you can, check that a server is actually running.^ Also check if a pop-up tab testing the SSL certificate, needs your acceptance.^"); 
            
              if(SERVERURL.value == "") say("The server I.P address in the setup menu is blank.^ Please update this.^");
              else say("The server I.P. address in the setup menu is " + SERVERURL.value + ".^ Verify it is correct.^");
              say("Change server settings?");
              setSndState(300);
            }
            else
            {
              if(CALLSIGN.value  == "")
              {
                say("No callsign is entered in the setup menu.^ Do you wish to change it?^");   
              }
              else
              {
                say("Entered callsign is " + CALLSIGN.value + ".^ Do you wish to change it?^" );
              }
              setSndState(400);
              
              
            }
          }
          break;
      case 6:  // radio features
          
          break;
      case 7:  // options
          CurrentPhrase = 0;
          if(!bSpeechRecg) CurrentPhrase = 1; 
          announceOptions();
          setSndState(200);
          
          break;
      default:
          break;
  }
}

function announceBandOptions()
{
  let k = Bands.length;
  let i = 0;
  if(CurrentPhrase > k) CurrentPhrase = 0;
  say(Bands[CurrentPhrase].desc + "?");
}

function announceModeOptions()
{
  let k = Modes.length;
  if(CurrentPhrase >= k) CurrentPhrase = 1;
  say("Change to " + Modes[CurrentPhrase].voice + "?"); 
}

const UIoptions = ["Speech Recognition"];

function announceOptions()
{
  let k = UIoptions.length;
  if(CurrentPhrase >= k) CurrentPhrase = 0;
  switch(CurrentPhrase)
  {
      case 0:
          if(SPREC.checked) say("Speech recognition enabled. OK?");
          else say("Speech recognition disabled. OK?");
          setSndState(200);
          break;
  }
}


const quickhelpItems = ["Overview", "Using the Main Menu", "Top Operations", "Sheet Operations", "Component Operations", "Net Operations"];

function announceHelpMenuItem()
{
  if(CurrentPhrase >= quickhelpItems.length) CurrentPhrase = 0;
  say(quickhelpItems[CurrentPhrase]);   
}


const Overview = "eight olives Schematic is a graphical design entry tool.^ With Schematic in audio assist mode, you select functions from audio menu lists by pressing five buttons along the edges of your screen.^  Click the southwest corner button to reset everything to the quiet state.^  Use the top two corner buttons to navigate a list.^  The northeast corner button answers yes to select a menu list option.^  The northwest corner button advances to the next audio menu list option, or answers no.^   The menu button at the east or center of the right edge of the screen starts listing the main menu options, or starts the Help menu, or goes back one list item.^  Press the multi-function southeast corner button to enable voice commands^   Now, click the southwest quiet reset button for normal operation, or use the top two buttons to navigate for more help topics.^  Shall I repeat this?";

const MainMenu = "Functions are selected by audio menus.^  From the quiet state, pressing the east, menu button starts the Main Menu.^  Clicking the northwest or no button advances to the next menu item.^  Clicking the east, menu button goes back one menu item.^  Clicking the northeast, yes button selects that menu item and initiates the selected action.^  The main menu has options to perform schematic, sheet, component or net operations.^ Shall I repeat this?";

const TopMenu = "Top Operations let you start a project or open a file or save the project.^  Shall I repeat this?"; 

const SheetMenu = "Sheet Operations The Changing Bands menu option has a list of bands which you can navigate using the nothwest and northeast buttons.^ The Amateur bands list directly affect the radio.^ The other receive-only radio bands indirectly change the radio band if needed.^ Changing frequency will automatically change radio band settings if needed.^ Changing bands can change operating mode.^ Shall I repeat this?";

const ChangeModes = "The Changing Modes menu option has a list of operating modes which you can navigate using the nothwest and northeast buttons.^ Changing modes may change other settings appropriate to that mode.^ Shall I repeat this?"; 

const ConnectServer = "Connecting to the Radio Remote server is needed when a remote platform such as a phone is to be used or when control of the serial link needs to be externally supported.^ The program tries to connect to a server on the same platform or to one on the platform with I.P. address and port address specified in the setup menu.^ The server's SSL certificate must also be accepted by the browser.^ A popup tab in the browser tries to open a test link to the server.^ If the browser displays a security warning instead,^ you must click the offered advanced options until the SSL certificate is accepted.^  Shall I repeat this?"; 

const LogIn = "Three entries are used to log in.^ The setup menu lets you specify callsign and license class.^ At login time, a dialog box opens for a pass phrase entry.^ A server file, permissions dot J. S., defines what entries are acceptable for user roles of control op, operator, or guest.^  Shall I repeat this?";

const SpeechR = "Speech recognition is supported by some browsers.^ If enabled, this feature lets you enter data or commands by speaking.^ It can be enabled from the Options menu or the hamburger menu.^ Capability can vary between browsers, online vs offline, and your voice or pronunciation.^ Press the southeast button for a 5 second window to speak your command.^  This is experimental.^ Shall I repeat this?"; 

const quickhelpText = [Overview, MainMenu, TopMenu, SheetMenu, ChangeModes, ConnectServer, LogIn, SpeechR];

function announceQuickhelpItem()
{
  if(CurrentPhrase >= quickhelpItems.length) CurrentPhrase = 0;
  say(quickhelpItems[CurrentPhrase]);
  say(quickhelpText[CurrentPhrase]);
//  say("Shall I repeat this?");
}

let PR1 = document.getElementById("pr1");
let PR2 = document.getElementById("pr2");

function announceStatus(n)
{
  if(n == 0)
  {
    if(PR1.checked) say("Local project");
    else if(PR2.checked) 
    {
      say("Demo project");
      let i = document.getElementById("pjs").selectedIndex;
      if(i != -1)
      {
        report("723 i = " + i);
        say(PROJECT_LIST[i].id);
      }
      else say("No demo project selected.");
    }
  }
  
  /*
  report("465 " + getCurrentMode().voice);
  say(getCurrentMode().voice);
  if(bNoServer) 
  {
    say("No server found.");
    say("Need help?");
    CurrentPhrase = 1;
    setSndState(100);
  }
  else
  {
    CurrentPhrase = 0;
    report("122 bloggedin = " + bloggedin);
    if(!bloggedin)
    {
      say("Not logged in.^ Need help?^");
      CurrentPhrase = 2;
      setSndState(100);
    }
    else
    {
      say("Logged in to server OK");
      if(bThisIsPrimary) say("This is the Primary user interface.");
      if(!bSocketSerial && !bWebSerial) say("No serial link");
      if(!bRigOK) say("No Radio found");
      if(bSpeechRecg && document.getElementById("sprec").checked)
      {
        say("Speech recognition enabled.");   
      }
      setSndState(0);
    }
  }
  */
  if(bSpeechRecg && document.getElementById("sprec").checked)
  {
    say("Speech recognition enabled.");   
  }
  setSndState(0);

}

function announceTime(n)
{
  let d = new Date();
  let pm = false;
  let s = "";
  let ss = " A. M. ";
  if(n == 0)  // local time
  {
    let hrs = d.getHours();
    let mins = d.getMinutes();
    if(hrs >= 12)
    {
      hrs -= 12;
      pm = true;
      ss = " P. M. ";
    }
    if(mins < 10) mins = " oh " + mins;
    if(hrs == 0) hrs = 12;
    say(hrs + " " + mins + ss + " local time");
  }
  else if(n == 1)
  {
    let hrs = d.getUTCHours();
    let mins = d.getUTCMinutes();
    say(hrs + " hours " + mins + " minutes UTC");
    
  }
    
}









