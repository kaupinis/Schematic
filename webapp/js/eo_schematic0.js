// eo_schematic0.js
"use strict"

// global variables
let SchematicFileName = "";
let canvasheight = 450;
let canvas = null;
let ctx; // context
let ste;
let sheet; // current SchematicSheet
let CurrentSheetIndex = 0;
let de; // DesignEnvironment DE
let service = null; // current service
let serviceLocal = null; // local
let serviceServer = null; // eo_base server
let serviceExt = null; // external service
let serviceDrive = null;
let stack = null;
let mousePos = null;
let lastmousePos = null;
let lastzoom = 1;
let XSTAT; // x position display
let YSTAT; // y position display
let xfmX = 0;
let xfmY = 0;
//let MAXWIDTH = 11000;
//let MAXHEIGHT = 8500;
let MAXWIDTH = 18000;
let MAXHEIGHT = 12000;
let MAXZOOMFF = 2; // 5
let SHOW_PINS = true;
let SHOW_SELECT_BOXES = false;
let SELECTED_LIBRARY_INDEX = -1;
let SELECTED_SYMBOL_INDEX = 0;
let SELECTED_PROJECT_INDEX = 0;
let SELECTED_PROJECT_LINK = null;
let PROJECT_LIST = [];
let PROJECT_FILE_LIST = [];
let COMP_LIST = [];
let LIBRARY_LIST = [];
let FPLIBRARY_LIST = [];
let SymbolListDest = null;
let FPS = [];
let eo_symbol_base = "https://www.eightolives.com/docs/Schematic";
let eo_base = "https://www.eightolives.com";
let eo_base0 = null;
let PROJECT_LIB = "LOCAL";
let ServerLink = null;
let ExtServiceLink = "";
let auth = null;
let useAuth = false;
let up = null;
let selectedAttribute = null;
let selectedIndex = -1;
let ptype = 0;
let Debug = true;
let bFirst = true;
let ipod = false;
let apple = false;
let gridsize = 100;
let fixedlibraries = 2;
let bfirst = true;
let fullsymbolpath = true;
let reportfilename = "report.txt";
let wvwindow = null;
let laywindow = null;
let pmwindow = null;
let fps = [];
let FootprintObject = null;
let bsw = true;
let bMouseDownActive = false;
let bCFG = false;
let ad = "https://192.168.1.";
let port = "8081";
let fil = "eo.htm";
let number = 255;
let ok = true;
let checkCache = false;
let cacheIndex = 0;
let aflag = false;
let a = 0;
let searcharray = [];
let fm;
let file = "index.htm";
let address = "https://192.168.1.";
let addressindex = 0;
let ftimeout = 1500;
let results_connected = new Array();
let results_error = new Array();
let results_timeout = new Array();
let searchcont = true;
let searchstate = 0;
let ht = "";
let BC = null;
let Bubble = document.getElementById("bubble");
let Bubble1 = document.getElementById("bubble1");
let BTO = null;
let bBubbleTO = true;
let SPREC = document.getElementById("sprec");
let EAUDIO = document.getElementById("eaudio");
let bSpeechRecg = false;

/*let ColoredItemNames =
    ["BACKGROUND_COLOR", "PIN_COLOR", "NET_ENDPOINT_COLOR", "GRAPHIC_COLOR", "NET_COLOR",
    "ATTRIBUTE_COLOR", "LOGIC_BUBBLE_COLOR", "DOTS_GRID_COLOR",  "DETACHED_ATTRIBUTE_COLOR",
    "TEXT_COLOR", "BUS_COLOR", "SELECT_COLOR", "BOUNDINGBOX_COLOR", "ZOOM_BOX_COLOR", "STROKE_COLOR",
    "LOCK_COLOR", "OUTPUT_BACKGROUND_COLOR", "FREESTYLE1_COLOR", "FREESTYLE2_COLOR", "FREESTYLE3_COLOR",
    "FREESTYLE4_COLOR", "JUNCTION_COLOR", "MESH_GRID_MAJOR_COLOR", "MESH_GRID_MINOR_COLOR"];
    */
let menux = [];
let con = 1500; // was 500
let sofname = "";
let symname = "";
let SheetLoadErrors = false;
let gdcLoaded = false;
let OrigCanvasWidth = 0;
let OrigCanvasHeight = 0;
let authorizeButton = null;
let signoutButton = null;
let bGDfirst = true;
let bUseFetch = false;
let bOnLine = false;
let LIBRARIES_LOADED = [];
let MOVEPOINTS = [];
let ENDPOINT = null;
let zheaders = null;
let horiz = null;

if ((navigator.userAgent.indexOf("iPod") != -1) || (navigator.userAgent.indexOf("iPad") != -1) || (navigator.userAgent.indexOf("iPhone") != -1)) {
    apple = true;
    ipod = true;
    MAXZOOMFF = 10;
}
else
    MAXZOOMFF = 10; // was 5
function clearStatus() {
    document.getElementById("status").value = "";
}
/*
window.onerror = function myErrorHandler(errorMsg, url, lineNumber)
{
  report("url " + url + " line " + line  + " " + errorMsg);
}
*/
function getCurrentSheet() {
    return (sheet);
}
let Menus = ["Welcome", "Nav", "Design", "Edit", "Components", "Preferences", "Help", "Comps", "CompPopup", "DPopup", "NPopup", "PPopup", "BPopup", "PathPopup", "BusSel", "BusMem", "BusPins", "Aboutx", "NetlistOps", "NeedSymbol", "Draw",
    "Atts", "Pins", "CompSel", "NetSel", "Cedit", "NEWATT", "ConWiz", "BlockWiz", "OpenProj", "OpenFile", "UploadFile", "ProjFileSel", "PinSel", "Log", "PPPopup", "PathEdit", "BusPopup",
    "NetEnd", "BusSize", "Fomps", "NewSheet", "ProjEdit", "CompPix", "AnalysisWiz","Selen","Dummy"];
function CloseMenu() {
    let k = Menus.length;
    let i = 1;
    while (i < k) {
        //  if(document.getElementById(Menus[i]).offsetTop < con) document.getElementById(Menus[i]).style.top = con + "px";
        //  document.getElementById(Menus[i]).className = "inactivemenu";
        //  document.getElementById(Menus[i]).style.visibility = "hidden";
        //  document.getElementById(Menus[i]).style.pointerEvents = "none";
        closeMenuById(Menus[i]);
        i += 1;
    }
}
function closeMenuById(id) {
    let e = document.getElementById(id);
    //  if(e.offsetTop < con) e.style.top = con + "px";
    e.className = "inactivemenu";
    e.style.visibility = "hidden";
    e.style.pointerEvents = "none";
}
function menu(menuname) {
    let b = document.getElementById(menuname).style.visibility.toString();
    CloseMenu();
    let k = Menus.length;
    let i = 1;
    let bx = true;
    while (bx && (i < k)) {
        if (Menus[i] == menuname)
            bx = false;
        else
            i += 1;
    }
    if (b == "visible") {
        //  document.getElementById(menuname).style.top = con + "px";
        document.getElementById(menuname).className = "inactivemenu";
        document.getElementById(menuname).style.visibility = "hidden";
        document.getElementById(menuname).style.pointerEvents = "none";
    }
    else {
        //  document.getElementById(menuname).style.top = menux[i] + "px";
        document.getElementById(menuname).className = "activemenu";
        document.getElementById(menuname).style.visibility = "visible";
        document.getElementById(menuname).style.pointerEvents = "auto";
    }
}
function initializeMenus() {
    let k = Menus.length;
    let i = 1;
    while (i < k) {
        menux[menux.length] = document.getElementById(Menus[i]).offsetTop;
        //  document.getElementById(Menus[i]).style.top = con + "px";
        document.getElementById(Menus[i]).className = "inactivemenu";
        document.getElementById(Menus[i]).style.visibility = "hidden";
        i += 1;
    }
}
function displayStatus(s) {
    document.getElementById("status").value = s;
}
function backingScale(context) {
    if ('devicePixelRatio' in window) {
        if (window.devicePixelRatio > 1) {
            return window.devicePixelRatio;
        }
    }
    return 1;
}
function checkConnection() {
    /*
      if(eo_base.indexOf("file:") != -1)
      {
        bOnLine = true;
        document.getElementById("oll").innerHTML= "";
      }
      */
    if (document.getElementById("fol").checked) {
        bOnLine = false;
        document.getElementById("oll").innerHTML = "<a href='javascript:checkConnection()' style='color:red;'>Offline</a>";
    }
    else {
        if (typeof navigator.onLine !== 'undefined') {
            bOnLine = navigator.onLine;
            if (bOnLine)
                document.getElementById("oll").innerHTML = "";
            else
                document.getElementById("oll").innerHTML = "<a href='javascript:checkConnection()' style='color:red;'>Offline</a>";
        }
        if ((bOnLine) && (service != null) && (eo_base.indexOf("file") != 0)) {
            let p = service.getProjectsList();
            p.then(function (data) {
                bOnLine = true;
                document.getElementById("oll").innerHTML = "";
            }).catch(function (error) {
                bOnLine = false;
                document.getElementById("oll").innerHTML = "<a href='javascript:checkConnection()' style='color:red;'>Offline</a>";
            });
        }
    }
}
function openWelcome() {
    let d = document.getElementById("Welcome");
    d.style.top = menux[0] + "px";
    d.style.visibility = "visible";
}
function closeWelcome() {
    closeMenuById("Welcome");
    if (navigator.cookieEnabled)
        localStorage.setItem("WelcomeOKSM", true);
}
// code to prevent ios autozoom
const addMaximumScaleToMetaViewport = () => {
    const el = document.querySelector('meta[name=viewport]');
    if (el !== null) {
        let content = el.getAttribute('content');
        let re = /maximum\-scale=[0-9\.]+/g;
        if (re.test(content)) {
            content = content.replace(re, 'maximum-scale=1.0');
        }
        else {
            content = [content, 'maximum-scale=1.0'].join(', ');
        }
        el.setAttribute('content', content);
    }
};
const disableIosTextFieldZoom = addMaximumScaleToMetaViewport;
//Check if it is an iPad, iPhone or iPod
const checkIsIOS = () => /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
if (checkIsIOS()) {
    report("301 ios autozoom disabled");
    disableIosTextFieldZoom();
}
// end  code to prevent ios autozoom
window.onbeforeunload = function (evt) {
    clearReport();
    evt.preventDefault();
    if (BC != null)
        BC.close();
    evt.returnValue = "There is unsaved data.";
};
window.onload = function () {
    let url1 = "https://www.eightolives.com/docs/Schematic/SchematicM.htm";
    let z = window.location.href;
    if (z.indexOf("file:///") == 0)
        init();
    else if ((z.indexOf("http://w") == 0) || (z.indexOf("http://e") == 0)) // ||(z.indexOf("upi") !=file:///home/kaupinis/WWW/eightolives/docs/Schematic/SchematicM.htm -1))
     {
        window.location.href = url1;
        /*      else
              {
                window.location.href = "https://kaupinis.fatcow.com/docs/Schematic/SchematicM.htm";
                console.log(xhr.status);
        //        init();
              }
            */
    }
    else
        init();
};
function selectPageSize(size) {
    if (size == "A") {
        MAXWIDTH = 11000;
        MAXHEIGHT = 8500;
    }
    else if (size == "B") {
        MAXWIDTH = 18000;
        MAXHEIGHT = 12000;
    }
    let cv = document.getElementById("mc");
    cv.height = MAXHEIGHT / MAXZOOMFF;
    cv.width = MAXWIDTH / MAXZOOMFF;
    canvas = document.getElementById("mc");
    ctx = canvas.getContext("2d");
    //  de = sheet.getDrawingEnvironment();
    //  updateSheetDisplay();
    let scaleFactor = backingScale(ctx);
    if (scaleFactor > 1) {
        canvas.width = canvas.width * scaleFactor;
        canvas.height = canvas.height * scaleFactor;
    }
}
function init() {
    clearReport();
    report("Welcome to eightolives Schematic");
    console.log("Welcome to eightolives Schematic");
    SPREC.checked = false;
    EAUDIO.checked = false;
    selectPageSize("A");
    let cv = document.getElementById("mc");
    cv.height = MAXHEIGHT / MAXZOOMFF;
    cv.width = MAXWIDTH / MAXZOOMFF;
    let cvv = document.getElementById("cid");
    cvv.style.height = window.innerHeight * .8 + "px";
    //if(navigator.onLine) report("-- on line mode");
    //else report("-- off line mode");
    if (window.File && window.FileReader && window.FileList && window.Blob) {
    }
    else {
        //  alert('The File APIs are not fully supported in this browser.');
    }
    if (!('pointerEvents' in document.body.style)) {
        report("pointerEvents not supported");
    }
    authorizeButton = document.getElementById('authorize-button');
    signoutButton = document.getElementById('signout-button');
    document.getElementById("sxa").checked = true;
    document.getElementById("sxc").checked = false;
    document.getElementById("sxp").checked = true;
    document.getElementById("sxn").checked = false;
    
    document.getElementById("fol").checked = false;
    let cid = document.getElementById("cid");
    cid.scrollTop = cid.scrollHeight;
    clearArray(FindSymbol.FindQueue);
    initializeMenus();
    CloseMenu();
    bVoices = false;
    bsw = true;
    bMouseDownActive = false;
    LIBRARIES_LOADED = [];
    wvwindow = null;
    laywindow = null;
    pmwindow = null;
    bfirst = true;
    bGDfirst = true;
    bUseFetch = true;
    zheaders = null;
    document.getElementById("xb").checked = false;
    document.getElementById("selbyref").value = "";
    //openWelcome();
    if (typeof window.fetch !== 'undefined')
        bUseFetch = true;
    //report("UseFetch = " + bUseFetch);
    let z = window.location.href;
    eo_base = z.substring(0, z.lastIndexOf("/"));
    eo_base0 = eo_base.substring(0, eo_base.lastIndexOf("/"));
    eo_symbol_base = z.substring(0, z.lastIndexOf("/"));
    eo_base += "/";
    eo_base0 += "/";
    eo_symbol_base += "/";
    ServerLink = eo_base;
    report("eo_base = " + eo_base);
    report("eo_base0 = " + eo_base0);
    report("eo_symbol_base = " + eo_symbol_base);
    if (eo_base.indexOf("https") != 0)
        bsw = false;
    if (navigator.cookieEnabled) {
        let x = localStorage.getItem("WelcomeOKSM");
        if (x == null) {
            openWelcome();
        }
    }
    if (checkIsIOS() || ipod) {
        //    report("301 ios autozoom disabled");
        disableIosTextFieldZoom();
    }
    checkConnection();
    window.addEventListener('online', checkConnection);
    window.addEventListener('offline', checkConnection);
    if ('BroadcastChannel' in navigator) {
        if (BC != null)
            BC.close();
        try {
            BC = new BroadcastChannel("schematic_channel");
            BC.onmessage = processBC(evt);
        }
        catch (e) {
            report("366 " + e);
        }
    }
    if (('serviceWorker' in navigator) && bsw) {
        checkSW();
    }
    else {
        bsw = false;
        init1();
    }
}
function checkSW() { /*
    if (('serviceWorker' in navigator) && bsw) {
        report("serviceWorker is supported");
        let px = navigator.serviceWorker.register('eo_sw_SchematicMobile.js', { scope: './' });
        px.then(function (reg) {
            report('Registration succeeded. Scope is ' + reg.scope);
            reg.addEventListener('updatefound', function () {
                report("Updated sevice worker found.");
            });
            init1();
        });
        px.catch(function (error) {
            report('Registration failed with ' + error);
            if ((error.toString().indexOf("SecurityError: The operation is insecure.") != -1) && (navigator.userAgent.indexOf("Firefox") != -1)) {
                report("Note: for Firefox make sure Preferences > Privacy and Security > History\n  has Keep until 'they expire' set and \n  Clear history when Firefox closes unchecked.");
            }
            init1();
        });
    }
    else */
        init1();
}
function init1() {
    report("init1");
    XSTAT = document.getElementById("XPOS");
    YSTAT = document.getElementById("YPOS");
    XSTAT.value = "";
    YSTAT.value = "";
    auth = null;
    horiz = null;
    SchematicMode = false;
    fullsymbolpath = true;
    document.getElementById("xoffset").value = "0";
    document.getElementById("yoffset").value = "0";
    ste = new STE("New_Project");
    sheet = ste.getSchematic().newSheet();
    CurrentSheetIndex = 0;
    SELECTED_PROJECT_INDEX = 0;
    document.getElementById("lib").selectedIndex = 0;
    ExtServiceLink = localStorage.getItem("discover");
    document.getElementById("exurl").value = ExtServiceLink;
    serviceServer = getService(eo_base);
    service = serviceServer;
    canvas = document.getElementById("mc");
    ctx = canvas.getContext("2d");
    de = sheet.getDrawingEnvironment();
    updateSheetDisplay();
    updateGrid();
    canvas.addEventListener('mousedown', function (evt) {
        bMouseDownActive = true;
    }, true);
    canvas.addEventListener('mouseup', function (evt) {
        bMouseDownActive = false;
    }, true);
    canvas.addEventListener('mousemove', function (evt) {
        evt.preventDefault();
        lastmousePos = mousePos;
        mousePos = getMousePos(canvas, evt);
        let z = de.getInverseZoom();
        XSTAT.value = getCurrentSheet().de.mouseToDrawingX(mousePos.x) + xfmX * z;
        YSTAT.value = getCurrentSheet().de.mouseToDrawingY(mousePos.y) + xfmY * z;
        getCurrentSheet().mouseMoved(evt);
    }, false);
    canvas.addEventListener('click', function (evt) {
        evt.preventDefault();
        mousePos = getMousePos(canvas, evt);
        let z = de.getInverseZoom();
        XSTAT.value = getCurrentSheet().de.mouseToDrawingX(mousePos.x) + xfmX * z;
        YSTAT.value = getCurrentSheet().de.mouseToDrawingY(mousePos.y) + xfmY * z;
        getCurrentSheet().mouseClicked(evt);
    }, false);
    canvas.addEventListener('dblclick', function (evt) {
        evt.preventDefault();
        mousePos = getMousePos(canvas, evt);
        let z = de.getInverseZoom();
        XSTAT.value = getCurrentSheet().de.mouseToDrawingX(mousePos.x) + xfmX * z;
        YSTAT.value = getCurrentSheet().de.mouseToDrawingY(mousePos.y) + xfmY * z;
        getCurrentSheet().mouseDoubleClicked(evt);
    }, false);
    window.addEventListener("keydown", function (evt) {
        if (evt.keyCode == 27)
            xcape();
        return (evt);
    }, true);
    OrigCanvasWidth = canvas.width;
    OrigCanvasHeight = canvas.height;
    stack = new EditingStack();
    document.getElementById("symbolpath").checked = true;
    document.getElementById("grid").checked = true;
    document.getElementById("pr1").checked = true;
    document.getElementById("symb").selectedIndex = 0;
    document.getElementById("desc").value = "";
    //document.getElementById("logu").value = "";
    //clearReport();
    document.getElementById('files').addEventListener('change', openSelFile1, false);
    document.getElementById('symfiles').addEventListener('change', openSelFile2, false);
    openSelProj();
    let scaleFactor = backingScale(ctx);
    if (scaleFactor > 1) {
        canvas.width = canvas.width * scaleFactor;
        canvas.height = canvas.height * scaleFactor;
    }
    //report("524 " + document.getElementById("cid").clientWidth + " " + canvas.width);
    let mf = document.getElementById("cid").clientWidth / canvas.width;
    //canvas.width = canvas.width * mf;
    //canvas.height = canvas.height * mf;
    ctx = canvas.getContext("2d");
    //report("530 origw = " + OrigCanvasWidth + " origh = " + OrigCanvasHeight + " " + scaleFactor + " " + document.getElementById("cid").clientWidth);
    if (document.getElementById("ut").checked) {
        let tit = makeTitleSheetA(de, 0, 0);
        tit.x = 500;
        tit.y = 500;
        setAttributeValue("sheetnumber", tit, "SHEET 1");
        setAttributeValue("refdes", tit, "SHEET?");
        sheet.addDrawingObject(tit);
    }
    updateGrid();
    //displayStatus(window.innerWidth + " " + window.innerHeight);
    if (bFirst) {
        bFirst = false;
        let cx = document.getElementById("logp");
        cx.onkeydown = function (evt) {
            if (!evt)
                evt = window.event;
            //  alert(evt.keyCode);
            if (evt.keyCode == 13)
                logOK();
            return (evt);
        };
        let rect = new Rectangle2D();
        rect = rect.setRect(2050, 4050, 1000, 200);
        rect.paint(ctx, de.getColor(GRAPHIC_COLOR), 1);
        let arc = new Arc2D();
        arc.makeArc(1200, 7000, 400, 0, 2 * Math.PI);
        arc.paint(ctx, de.getColor(NET_COLOR), 1);
        let line = new Line2D(700, 3550, 1400, 3550);
        line.paint(ctx, "yellow");
        let fp = new FileParser("gnand2.sym");
        let gate = fp.parse1(testgate);
        gate.x = 2000;
        gate.y = 2700;
        fp = new FileParser("npn.sym");
        let tr = fp.parse1(npn);
        tr.x = 600;
        tr.y = 3500;
        sheet.paint(ctx);
        de.drawString(ctx, "eightolives", 60, 280, "30px", "30px");
        de.drawString(ctx, "Schematic", 60, 310, "30px", "30px");
        //de.drawString(ctx,"Mobile", 60, 160, "30px", "30px");
        de.drawString(ctx, "Development version", 60, 600, "12px", "12px");
        gate.paint(ctx);
        tr.paint(ctx);
        let t = document.getElementById("cid").scrollTop;
        let l = document.getElementById("cid").scrollLeft;
        //document.getElementById("cid").scrollTop = t/z;
        //document.getElementById("cid").scrollLeft = l/z;
        updateipod();
        
        initAudio();
        if((voices.length != 0) && (synth != null)) 
        {
          bVoices = true;
        }
        else report("no voices available");
       if(document.getElementById("eaudio").checked)
       {
         document.getElementById("sb3").style.visibility = "visible";
       }
       else if(bVoices)
       {
//         document.getElementById("sb3").style.visibility = "visible";
         setTimeout(noAudio, 20000);
       }
       else document.getElementById("sb3").style.visibility = "hidden";
  

        //updateFootprintsList();
        //flibChange();
        loadinit();
    }
}
function loadinit() {
    let lfn = null;
    let d = null;
    let a = null;
    let z = window.location.href;
    let ilfn = z.indexOf("?");
    if (ilfn != -1) {
        let lf = z.substring(ilfn + 1);
        ilfn = lf.indexOf("p=");
        if (ilfn != -1) {
            let jlfn = lf.indexOf("&", ilfn);
            if (jlfn != -1) {
                lfn = lf.substring(ilfn + 2, jlfn);
            }
        }
        ilfn = lf.indexOf("d=");
        if (ilfn != -1) {
            let jlfn = lf.indexOf("&", ilfn);
            if (jlfn != -1) {
                d = lf.substring(ilfn + 2, jlfn);
            }
            else {
                d = lf.substring(ilfn + 2);
            }
            report("loadinit " + d);
        }
        ilfn = lf.indexOf("a=");
        if (ilfn != -1) {
            if (jlfn != -1) {
                a = lf.substring(ilfn + 2);
            }
        }
        if (d != null) {
            Title = "";
            Notes = "";
            //    PROJECT_LIB = lfn;
            //    document.getElementById("pr2").checked = true; 
            designfilename = d.substring(d.lastIndexOf("/"));
//            service.openFile(d);
            getData(d).then( (s) => {
              processFileData(d, s);
            }).catch( (e) => {
                report("608 " + e);
            });
        }
    }
}
function updateGrid() {
    if (document.getElementById("grids").checked)
        gridsize = 50;
    else
        gridsize = 100;
    de.setGridSize(gridsize);
    CloseMenu();
    repaint();
}
function newSheet(b) {
    sheet.setState(STATE_IDLE);
    sheet.selectedObject = null;
    clearCanvas();
    //  sheet = ste.getSchematic().newSheet();
    //  de = sheet.getDrawingEnvironment();
    CurrentSheetIndex = ste.getSchematic().sheets.length - 1;
    if (document.getElementById("tbA").checked) // was ut
     {
        selectPageSize("A");
        sheet = ste.getSchematic().newSheet();
        de = sheet.getDrawingEnvironment();
        CurrentSheetIndex = ste.getSchematic().sheets.length - 1;
        if (b) {
            let tit = makeTitleSheetA(de, 0, 0);
            tit.x = 500;
            tit.y = 500;
            let sn = ste.getSchematic().sheets.length;
            setAttributeValue("sheetnumber", tit, "SHEET " + sn);
            sheet.addDrawingObject(tit);
        }
    }
    else if (document.getElementById("tbB").checked) // was ut
     {
        selectPageSize("B");
        //    let fp = new FileParser("eo_titleB.sym");
        //    let tit = fp.parse1(eo_titleB);
        sheet = ste.getSchematic().newSheet();
        de = sheet.getDrawingEnvironment();
        CurrentSheetIndex = ste.getSchematic().sheets.length - 1;
        if (b) {
            let tit = makeTitleSheetB2(de, 0, 0);
            tit.x = 500;
            tit.y = 500;
            tit.selectable = 0;
            let sn = ste.getSchematic().sheets.length;
            setAttributeValue("sheetnumber", tit, "SHEET " + sn);
            sheet.addDrawingObject(tit);
        }
    }
    if (getAttribute("gnd_plane_signal", sheet) == null) {
        setAttributeValue("gnd_plane_signal", sheet, "");
    }
    if (getAttribute("power_plane_signal", sheet) == null) {
        setAttributeValue("power_plane_signal", sheet, "");
    }
    updateSheetDisplay();
    repaint();
    CloseMenu();
}
function updateSheetDisplay() {
    let ss = document.getElementById("sheets");
    let i = ss.children.length - 1;
    while (i >= 0) {
        ss.remove(i);
        i -= 1;
    }
    let k = ste.getSchematic().sheets.length;
    i = 0;
    while (i < k) {
        let op = document.createElement("option");
        op.text = i + 1;
        ss.add(op);
        i += 1;
    }
    ss.selectedIndex = CurrentSheetIndex;
}
function getMousePos(canvas, evt) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}
function clearCanvas() {
    ctx.clearRect(0, 0, MAXWIDTH, MAXHEIGHT);
}
function zoom(n) {
    let lastzoom = de.getInverseZoom();
    let z = Math.round(de.getInverseZoom() / n);
    if (z < 2)
        z = 2.5;
    if (z > 40)
        z = 40;
    de.setInverseZoom(z);
    let c = document.getElementById("cid");
    //  let t = c.scrollTop;
    //  let l = c.scrollLeft;
    let xx = de.mouseToDrawingX(mousePos.x) + xfmX * de.getInverseZoom();
    let yy = de.mouseToDrawingY(mousePos.y) + xfmY * de.getInverseZoom();
    repaint();
    c.scrollTop *= n;
    c.scrollLeft *= n;
}
function repaint() {
    ctx.clearRect(0, 0, MAXWIDTH, MAXHEIGHT);
    sheet.paint(ctx);
}
function checkGrid() {
    if (document.getElementById("grid").checked)
        sheet.showGrid(true);
    else
        sheet.showGrid(false);
    CloseMenu();
    repaint();
}
function checkPins() {
    if (document.getElementById("spins").checked)
        SHOW_PINS = true;
    else
        SHOW_PINS = false;
    CloseMenu();
    repaint();
}
function checkAreas() {
    if (document.getElementById("xb").checked)
        SHOW_SELECT_BOXES = true;
    else
        SHOW_SELECT_BOXES = false;
    CloseMenu();
    repaint();
}
function checkPalette() {
    if (document.getElementById("pal").checked) {
        ste.getColorPalette().setBlackBackgroundDefaults();
    }
    else {
        ste.getColorPalette().setWhiteBackgroundDefaults();
    }
    CloseMenu();
    document.getElementById("mc").style.backgroundColor = de.getColor(BACKGROUND_COLOR);
    repaint();
}
function componentSelector() {
    complibChange();
    menu("Comps");
}
function place(s) {
    switch (s) {
        case 0:
            sheet.setState(STATE_NET);
            break;
        case 1:
            placeattvalue = prompt("Enter Attribute Value:");
            sheet.setState(STATE_ATTRIBUTE);
            break;
        case 2:
            let linesy = [];
            linesy[0] = prompt("Enter Text or Attribute Expression:");
            sheet.selectedObject = new DText(de, 2000, 6000, GRAPHIC_COLOR, 12, 1, 1, 0, 0, 1, linesy);
            sheet.setState(STATE_PLACING);
            break;
        case 3:
            sheet.setState(STATE_LINE);
            break;
        case 4:
            sheet.setState(STATE_RECTANGLE);
            break;
        case 5:
            sheet.setState(STATE_CIRCLE);
            break;
        case 6:
            sheet.setState(STATE_ARC);
            break;
        case 7:
            sheet.setState(STATE_PIN);
            break;
        case 8:
            sheet.setState(STATE_PICTURE);
            break;
        case 9:
            sheet.setState(STATE_BUS);
            break;
        case 10:
            if (sheet.state == STATE_PATH) {
                closePath(sheet.selectedObject);
            }
            else
                sheet.setState(STATE_PATH);
            break;
        default:
            break;
    }
}
function updateipod() {
    if (apple && document.getElementById("ipodrules").checked)
        ipod = true;
    else
        ipod = false;
    CloseMenu();
}
function updatepath() {
    fullsymbolpath = document.getElementById("symbolpath").checked;
    CloseMenu();
}
function xcape() {
    document.getElementById("ta").value = "";
    if (sheet.state == STATE_PATH) {
        closePath(sheet.selectedObject);
    }
    sheet.setState(STATE_IDLE);
    sheet.selectedObject = null;
    sheet.mc = null;
    sheet.bcopies = false;
    symbol_request = null;
    symbol_list_request = null;
    clearReport();
    sheet.selectbox = null;
    repaint();
    RssRequest = null;
    FileRequest = null;
    FileLink = null;
    SaveRequest = null;
    clearArray(FindSymbol.FindQueue);
    FS_symbol_request = null;
    SchematicMode = false;
    MOVEPOINTS = [];
    ENDPOINT = null;
    mmode = 0;
    bMouseDownActive = false;
    CloseMenu();
}
function updateCache(address) {
}
let hdr = "<!DOCTYPE html> <html lang=\"en\"><head>\n<meta charset=\"utf-8\">\n<meta name=viewport content=\"width=device-width, initial-scale=1\">\n</head><body>";
let ftr = "</body></html>";
function status2(s, ax, mode, p, t) {
    if (p.timer != null)
        clearTimeout(p.timer);
    report(s);
    if ((t == 1) && searchcont && (s.indexOf("responded.") != -1)) {
        let i0 = ax.indexOf(":");
        let i1 = ax.lastIndexOf(":");
        let s1 = "https" + ax.substring(i0, i1) + ":8081";
        ht += "<br>" + "Server found at <a href=\"javascript:parent.loadurl(\'" + s1 + "\')\">" + ax + "</a>";
        aflag = true;
    }
    document.getElementById("fm").srcdoc = hdr + "Scanned " + results_timeout.length + " addresses:<br>" + ht + ftr;
    ;
    if (checkCache)
        next();
    else if ((i < number) && searchcont)
        next();
    else if ((i >= number) && (!aflag)) {
        ht += "<br><br>No Devices found.";
        document.getElementById("fm").srcdoc = hdr + "Summary of scanning " + results_timeout.length + " addresses:<br>" + ht + ftr;
    }
}
function loadurl(u) {
    document.getElementById("exurl").value = u;
}
function exservt() {
    let u = document.getElementById("exurl").value;
    if ((u != null) && (u != "null") && (u.length > 1)) {
        CloseMenu();
        report(u.lastIndexOf("/") + " " + u.length + " " + u);
        if (u.lastIndexOf("/") != u.length - 1)
            u += "/";
        ExtServiceLink = u;
        localStorage.setItem("discover", u);
        serviceExt = getService(ExtServiceLink);
        if (document.getElementById("pr3").checked) {
            if (serviceExt != null) {
                service = serviceExt;
                menu("Log");
                report("service base is " + serviceExt.baseURL);
                //   updateProjectList();
            }
            else
                alert("No external server found.");
        }
    }
    else
        CloseMenu();
}
function fetchUrl(u) {
    let p = new Promise(function (resolve, reject) {
        let p1 = fetch(u).then(function (response) {
            if (!response.ok)
                reject("24 " + response.status);
            else if (u.indexOf(".json") != -1) {
                resolve(response.json());
            }
            else
                resolve(response.text());
        }).catch(function (error) {
            reject(error);
        });
    });
    return (p);
}
function openProject() {
    CloseMenu();
    updateProjectList();
    menu("OpenProj");
}

function updateProjectList() {
    let ss = document.getElementById("pjs");
    let i = ss.children.length - 1;
    while (i >= 0) {
        ss.remove(i);
        i -= 1;
    }
    clearList(PROJECT_LIST);
    if (document.getElementById("pr3").checked) {    // project url
        ExtServiceLink = document.getElementById("exurl").value;
        if ((ExtServiceLink == null) || (ExtServiceLink.length == 0) || (ExtServiceLink == "null")) {
        }
        else if (ExtServiceLink != null) 
        {
            serviceExt = getService(ExtServiceLink);
            if(serviceExt != null) 
            {
                PROJECT_LIB = ExtServiceLink;
                service = serviceExt;
                report("service base is " + service.baseURL);
                let p = service.getProjectsList();
                p.then(function (data) {
                    PROJECT_LIST = data.projects; 
                    showList(PROJECT_LIST, "pjs");
                }).catch(function (error) {
                    report(error);
                });
            }
        }
    }
    else if ((document.getElementById("pr1").checked)) // || !bOnLine) // LOCAL
     {
        PROJECT_LIB = "LOCAL";
        let op = document.createElement("option");
        op.text = "Local Project";
        ss.add(op);
        service = serviceServer;
        let cx = "null";
        if (service != null)
            cx = service.baseURL;
        report("service base is " + cx);
    }
    else if (document.getElementById("pr2").checked) {  // eo demo projects
        PROJECT_LIB = eo_base;
        clearList(PROJECT_LIST);
        {
            service = serviceServer;
            if (service != null) {
                let p = service.getProjectsList();
                p.then(function (data) {
                    PROJECT_LIST = data.projects;
                    showList(PROJECT_LIST, "pjs");
                    document.getElementById("pjs").selectedIndex = SELECTED_PROJECT_INDEX;
                }).catch(function (error) {
                    report(error);
                });
                report("service base is " + service.baseURL + " " + SELECTED_PROJECT_INDEX);
            }
            else
                report("service is null 1030");
        }
    }
    /*
    else if(document.getElementById("pr4").checked)
    {
      let byx = ((typeof gapi !== 'undefined') && (typeof gapi.auth2 !== 'undefined') && (typeof gapi.auth2.getAuthInstance() !== 'undefined') && (gapi.auth2.getAuthInstance().isSignedIn.get() ));
      if(byx)
      {
  //      updateSigninStatus(true);
      }
      
      report("pr4 " + gdcLoaded + " " + byx);
      if(gdcLoaded)
      {
        if(serviceDrive == null)
        {
      report("new GoogleDriveService");
      serviceDrive = new GoogleDriveService();
        }
        {
      report("set service = serviceDrive");
      service = serviceDrive;
      PROJECT_LIB = "DRIVE";
  //	let op = document.createElement("option");
  //	op.text = "Google Drive";
  //	PROJECT_LIST[0] = new SymbolInfo("Google Drive", "root", "root");
  //	ss.add(op);
      let p = service.getProjectsList();
          p.then(function(data){
            PROJECT_LIST = data;
            PROJECT_LIST[PROJECT_LIST.length] = new SymbolInfo("Google Drive", "root", "root");
            showList(PROJECT_LIST, "pjs");
            document.getElementById("pjs").selectedIndex = SELECTED_PROJECT_INDEX;
            }).catch(function(error){
          report(error);
          });
      
        }
      }
      else
      {
         if(bGDfirst)
         {
           bGDfirst = false;
           if(!confirm("Login to Google Drive?\nNote: When using Google Drive,\n you are subject to their terms and conditions.\nGoogle Drive requires you:\n  1. Not to Block Popup windows.\n  2. Accept All Cookies."))
           {
             document.getElementById("pr1").checked = true;
             return;
           }
         }
         let fileref=document.createElement('script');
         fileref.setAttribute("type","text/javascript");
         fileref.setAttribute("async", "true");
         fileref.setAttribute("defer", "true");
         fileref.onload= handleClientLoad;
         fileref.onreadystatechange= function(){if (fileref.readyState === 'complete') fileref.onload()};
         fileref.setAttribute("src", "https://apis.google.com/js/api.js");
         if((typeof fileref !== "undefined") && (fileref != null))
         document.getElementsByTagName("head")[0].appendChild(fileref);
      }
     
      
    }
    */
}
function openSelProj() {
    let i = document.getElementById("pjs").selectedIndex;
    SELECTED_PROJECT_INDEX = i;
    if ((document.getElementById("pr3").checked) && (ExtServiceLink != null) && (i != -1)) {
        useAuth = true;
        PROJECT_LIB = ExtServiceLink + PROJECT_LIST[i].link + "/";
        if (auth == null) {
            CloseMenu();
            menu("Log");
        }
        else {
            addProjectLibraries();
            updateLibrariesList();
            CloseMenu();
        }
    }
    else if (document.getElementById("pr1").checked) {
        PROJECT_LIB = "LOCAL";
        addProjectLibraries();
        updateLibrariesList();
        CloseMenu();
    }
    /*
    else if(document.getElementById("pr4").checked)
    {
      PROJECT_LIB = "DRIVE";
      if(PROJECT_LIST[i] === undefined) ;
      else if(PROJECT_LIST[i].title == "Create Directory")
      {
        let s = prompt("Enter name of new directory", "Untitled");
        if((s != null) && (s != "") && (s != " "))
        {
          let p = service.createProjectDirectory(s);
          p.then(function(d){
            report("createDirectory " + s + " - " + d);
            }).catch(function(e){
              report("createDirectory error " + s + " - " + e);
              });
        }
      }
      else
      {
          SELECTED_PROJECT_LINK = PROJECT_LIST[i].link;
          PROJECT_LIB += PROJECT_LIST[i].link;
          updateLibrariesList();
      }
  //    updateLibrariesList();
      CloseMenu();
    }
    */
    else //if(document.getElementById("pr2").checked)
     {
        useAuth = false;
        if (PROJECT_LIST[i] === undefined) {
            report("no project list found");
            addProjectLibraries();
            updateLibrariesList();
            CloseMenu();
        }
        else {
            SELECTED_PROJECT_LINK = PROJECT_LIST[i].link;
            if(PROJECT_LIST[i].link.indexOf("https") == 0) PROJECT_LIB = PROJECT_LIST[i].link + "/";
            else PROJECT_LIB = eo_base + PROJECT_LIST[i].link + "/";
            if ((auth == null) && (eo_base.indexOf("://www.eightolives.com") == -1) && (eo_base.indexOf("://eightolives.com") == -1) && (eo_base.indexOf("://kaupinis.fatcow.com") == -1) && (eo_base.indexOf("file:") != 0)) {
                CloseMenu();
                menu("Log");
            }
            else {
                addProjectLibraries();
                updateLibrariesList();
                CloseMenu();
            }
        }
    }
    report("PROJECT_LIB = " + PROJECT_LIB + " " + SELECTED_PROJECT_INDEX + " " + auth);
}
function cancelOpenProj() {
    CloseMenu();
}
function logOK() {
    zheaders = null;
    up = document.getElementById("logu").value.trim();
    if ((up != null) && (up.length > 4)) {
        let a = document.getElementById("logp").value.trim();
        if ((a != null) && (a.length > 7)) {
            auth = encodeBase64(up + ":" + a);
        }
        else {
            auth = null;
            document.getElementById("lib").selectedIndex = 0;
        }
        zheaders = {
            method: 'GET',
            headers: { 'Authorization': 'Basic ' + encodeBase64(up + ":" + a) }
        };
        exservt();
    }
    else {
        auth = null;
        document.getElementById("lib").selectedIndex = 0;
    }
    CloseMenu();
    if (auth != null)
        openSelProj();
    document.getElementById("logp").value = "";
    updateProjectList();
}
function isInArray(item, a) {
    let b = false;
    let i = 0;
    let k = a.length;
    while (!b && (i < k)) {
        if (a[i] == item)
            b = true;
        else
            i += 1;
    }
    return (b);
}
function exportSymbol() {
    CloseMenu();
    let dcomp = sheet.selectedObject;
    report("1265 " + dcomp.klass);
    if (dcomp.klass == "DComponent") {
        let s = exportKicadSymbolData(dcomp, true);
        let fn = prompt("Enter symbol file name (.kicad_sym)", getAttributeValue("device", dcomp));
        if ((fn != null) || (fn != "")) {
            if (fn.indexOf(".kicad_sym") == -1)
                fn += ".kicad_sym";
            saveFile(fn, s);
        }
    }
}
function exportSchematic() {
    CloseMenu();
    clearReport();
    let sheets = ste.getSchematic().sheets;
    let s = exportKicadSchematic(sheets);
    let n = getAttributeValue("designname", sheets[0].getTitleSheet());
    let fn = prompt("Enter design name", n);
    if (fn == null)
        report("No data saved. No design name given.");
    else {
        if (fn.indexOf(".kicad_sch") == -1)
            fn += ".kicad_sch";
        //    if(bOS)
        {
            saveFile(fn, s);
        }
        /*
        else if(PROJECT_LIB == "LOCAL")
        {
          localStorage.setItem(fn, s);
          report("Saved in LOCAL Project:" + fn);
        }
        else
        {
          service.saveProjectFile(PROJECT_LIB, fn, s);
          report("Saved in Project: " + fn);
        }
        */
    }
}
function analyze() {
    CloseMenu();
}
function makeOneFile(bOS) {
    clearReport();
    schsheets = "";
    let symbx = [];
    let sheets = ste.getSchematic().sheets;
    let dn = getAttributeValue("designname", sheets[0].getTitleSheet());
    let k = sheets.length;
    let i = 0;
    while (i < k) {
        let dojs = sheets[i].DrawingObjects;
        let kk = dojs.length;
        let ii = 0;
        while (ii < kk) {
            if (dojs[ii].klass == "DComponent") {
                let fnm = dojs[ii].filename;
                if ((fnm == null) || (fnm == ""))
                    fnm = getAttributeValue("device", dojs[ii]);
                else {
                    if (fnm.indexOf("/") != -1) {
                        fnm = fnm.substring(fnm.lastIndexOf("/") + 1);
                    }
                }
                if (fnm.indexOf(".sym") == -1)
                    fnm += ".sym";
                dojs[ii].filename = fnm;
                if (!isInArray(fnm, symbx)) {
                    schsheets += "# " + fnm + "\n";
                    schsheets += dojs[ii].saveSymbolData();
                    symbx.push(fnm);
                }
            }
            ii += 1;
        }
        schsheets += "# " + dn + "_" + (i + 1) + ".sch\n";
        schsheets += sheets[i].getData();
        i += 1;
    }
    let n = getAttributeValue("designname", sheets[0].getTitleSheet());
    let fn = prompt("Enter design name", n);
    if (fn == null)
        report("No data saved. No design name given.");
    else {
        if (fn.indexOf(".sho") == -1)
            fn += ".sho";
        if (bOS) {
            saveFile(fn, schsheets);
        }
        else if (PROJECT_LIB == "LOCAL") {
            localStorage.setItem(fn, schsheets);
            report("Saved in LOCAL Project:" + fn);
        }
        else {
            service.saveProjectFile(PROJECT_LIB, fn, schsheets);
            report("Saved in Project: " + fn);
        }
    }
    CloseMenu();
}
let bcat = false;
//TODO
function saveProject() {
    CloseMenu();
    makeOneFile(false);
    let makelocalhw = document.getElementById("makelocalhwm").checked;
    let sheets = ste.getSchematic().sheets;
    let n = getAttributeValue("designname", sheets[0].getTitleSheet());
    fn = prompt("Enter design name", n);
    if (fn == null)
        ;
    else if (((fn != null) || (fn != "")) && (fn.length > 0)) {
        let x = fn.lastIndexOf("__");
        if (document.getElementById("savecat").checked && (sheets.length > 1)) {
            if (confirm("Save schematic sheets in one concatenated file?"))
                bcat = true;
            else
                bcat = false;
        }
        else
            bcat = false;
        if (x != -1)
            fn = fn.substring(0, fn.lastIndexOf("__"));
        if ((PROJECT_LIB == "LOCAL") || (PROJECT_LIB.indexOf(eo_base) == 0)) {
            clearReport();
            schsheets = "";
            let k = sheets.length;
            let i = 0;
            while (i < k) {
                if (!bcat) {
                    let name = fn + "__" + (Number(i) + 1) + ".sch";
                    localStorage.setItem(name, sheets[i].getData());
                    report("saved local: " + name);
                }
                else
                    schsheets += sheets[i].getData();
                let dojs = sheets[i].DrawingObjects;
                let kk = dojs.length;
                report(kk);
                let ii = 0;
                while (ii < kk) {
                    if (dojs[ii].klass == "DComponent") {
                        let fnm = dojs[ii].filename;
                        report(":" + fnm);
                        if (fnm == null) {
                            fnm = prompt("Enter symbol file name (.sym) for " + getAttributeValue("refdes", dojs[ii]) + ":" + getAttributeValue("device", dojs[ii]));
                        }
                        if ((fnm != null) && (fnm != "")) {
                            if (fnm.indexOf(".sym") == -1)
                                fnm += ".sym";
                            let sym = localStorage.getItem(fnm);
                            if (sym == null) {
                                dojs[ii].filename = fnm;
                                localStorage.setItem(fnm, dojs[ii].saveSymbolData());
                                report("saved local: " + fnm);
                            }
                            let sl = getAttributeValue("model");
                            if ((sl != "simlib") || makelocalhw) {
                                fnm = fnm.substring(0, fnm.indexOf("."));
                                fnm += ".js";
                                sym = localStorage.getItem(fnm);
                                if (sym == null) {
                                    let sb = makeHardwareTemplateOfSymbol(dojs[ii]);
                                    localStorage.setItem(fnm, sb);
                                }
                            }
                        }
                    }
                    ii += 1;
                    //      report("ii = " + ii);
                }
                i += 1;
            }
            if (bcat) {
                localStorage.setItem(fn + ".sch", schsheets);
                report("saved local: " + fn + ".sch");
                schsheets = "";
            }
            bcat = false;
        }
        else {
            schsheets = "";
            clearReport();
            clearArray(SaveQueueSheets);
            clearArray(SaveQueueComponents);
            clearArray(SaveModels);
            addAll(sheets, SaveQueueSheets);
            SaveQueueSheetIndex = 0;
            SaveQueueComponentIndex = 0;
            SaveModelIndex = 0;
            let k = sheets.length;
            let i = 0;
            while (i < k) {
                let dd = sheets[i].DrawingObjects;
                let kk = dd.length;
                let ii = 0;
                while (ii < kk) {
                    if (dd[ii].klass == "DComponent") {
                        SaveQueueComponents[SaveQueueComponents.length] = dd[ii];
                        if (makelocalhw)
                            SaveModels[SaveModels.length] = dd[ii];
                    }
                    ii += 1;
                }
                i += 1;
            }
            report("SaveQueueSheets " + SaveQueueSheets.length + " SaveQueueComponents " + SaveQueueComponents.length);
            nextSaveItem();
        }
    }
    CloseMenu();
}
let SaveQueueSheets = [];
let SaveQueueComponents = [];
let SaveModels = [];
let SaveQueueSheetIndex = 0;
let SaveQueueComponentIndex = 0;
let SaveModelIndex = 0;
let fn = "";
let schsheets = null;

function nextSaveItem() {
    report("nextSaveItem SaveQueueSheets " + SaveQueueSheetIndex + " SaveQueueComponents " + SaveQueueComponentIndex);
    if (SaveQueueSheetIndex < SaveQueueSheets.length) {
        if (!bcat) {
            let name = fn + "_" + (Number(SaveQueueSheetIndex) + 1) + ".sch";
            report("saving: " + PROJECT_LIB + name);
            if (inProjectsFiles(name) != null) {
                service.saveProjectFile(PROJECT_LIB, name, SaveQueueSheets[SaveQueueSheetIndex].getData());
            }
            else {
                service.saveProjectFile(PROJECT_LIB, name, SaveQueueSheets[SaveQueueSheetIndex].getData());
            }
        }
        else {
            schsheets += SaveQueueSheets[SaveQueueSheetIndex].getData();
        }
        SaveQueueSheetIndex += 1;
    }
    else if (SaveQueueComponentIndex < SaveQueueComponents.length) {
        fn = SaveQueueComponents[SaveQueueComponentIndex].filename;
        if (fn == null)
            fn = prompt("Enter symbol file name (.sym)", ss.filename);
        if ((fn != null) || (fn != "")) {
            if (fn.indexOf(".sym") == -1)
                fn += ".sym";
            SaveQueueComponents[SaveQueueComponentIndex].filename = fn;
            report("saving: " + PROJECT_LIB + fn);
            service.saveProjectFile(PROJECT_LIB, fn, SaveQueueComponents[SaveQueueComponentIndex].saveSymbolData());
        }
        SaveQueueComponentIndex += 1;
    }
    else if (SaveModelIndex < SaveModels.length) {
        fn = getAttributeValue("device", SaveModels[SaveModelIndex]);
        //   fn = SaveModels[SaveModelIndex].filename;
        if (fn == null)
            fn = prompt("Enter model file name (.js)", ss.filename);
        if ((fn != null) || (fn != "")) {
            let ii = fn.indexOf(".sym");
            if (ii != -1)
                fn = fn.substring(0, ii);
            if (fn.indexOf(".js") == -1)
                fn += ".js";
            //      SaveModels[SaveModelIndex].filename = fn;
            report("saving: " + PROJECT_LIB + fn);
            service.saveProjectFile(PROJECT_LIB, fn, makeHardwareTemplateOfSymbol(SaveModels[SaveModelIndex]));
        }
        SaveModelIndex += 1;
    }
    else {
        if (bcat) {
            service.saveProjectFile(PROJECT_LIB, fn + ".sch", schsheets);
            report("saving: " + PROJECT_LIB + fn + ".sch");
            schsheets = "";
        }
        bcat = false;
        report("Save Project Complete");
    }
}
function saveModelProject() {
    CloseMenu();
    let sheets = ste.getSchematic().sheets;
    let n = getAttributeValue("designname", sheets[0].getTitleSheet()) + ".js";
    fn = prompt("Save model as", n);
    if (((fn != null) || (fn != "")) && (fn.length > 0)) {
        n = fn;
        //  if(PROJECT_LIB == "LOCAL")
        {
            localStorage.setItem(fn, makeHardwareModelofSchematic());
            if (document.getElementById("makelocalhwm").checked)
                makeEmptyModels();
        }
        //  else
        if ((PROJECT_LIB != "LOCAL") && (PROJECT_LIB.indexOf(eo_base) != 0)) {
            report("1460 " + PROJECT_LIB + " " + eo_base);
            //    service.saveProjectFile(PROJECT_LIB + "/upload/", fn, makeHardwareModelofSchematic());
            let data= makeHardwareModelofSchematic();
//            service.saveProjectFile(PROJECT_LIB, fn, data);
            postUploadP(PROJECT_LIB, fn, data).catch( (e) => { report("1464 " + e); });
        }
    }
    return (n);
}

function saveSchematic()
{
  let n = SchematicFileName;
  if(n == "") n = getAttributeValue("designname", ste.getSchematic().sheets[0].getTitleSheet()) + ".json";
  fn = prompt("Enter file name", n);
  if (fn != null)
  {
    clearReport();
    let data = "";
    try {
      data = JSON.stringify(ste.getSchematic().getDataJ(), null, 4);
    }
    catch(e) { report("1489 saveSchematic error " + e); }
    saveFile(fn, data);
    CloseMenu();
  }
}

function saveFile(filename, data) {
    let textFileAsBlob = new Blob([data], { type: 'text/plain' });
    let downloadLink = document.createElement("a");
    downloadLink.download = filename;
    downloadLink.innerHTML = "Download File";
    if (window.webkitURL != null) {
        // Chrome allows the link to be clicked
        // without actually adding it to the DOM.
        downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    }
    else {
        // Firefox requires the link to be added to the DOM
        // before it can be clicked.
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
    }
    downloadLink.click();
}
function destroyClickedElement(event) {
    document.body.removeChild(event.target);
}
function openProjectFilesList() {
    CloseMenu();
    clearList(PROJECT_FILE_LIST);
    let ss = document.getElementById("pfilelist");
    let i = ss.children.length - 1;
    while (i >= 0) {
        ss.remove(i);
        i -= 1;
    }
    if (PROJECT_LIB == "LOCAL") {
        let k = localStorage.length;
        let i = 0;
        let z = 0;
        while (i < k) {
            let t = localStorage.key(i);
            let op = document.createElement("option");
            op.text = t;
            ss.add(op);
            report("added " + k + " items to pfilelist " + t);
            i += 1;
        }
    }
    else {
        SymbolListDest = "pfilelist";
        let p = service.getProjectFilesList(PROJECT_LIB);
        p.then(function (data) {
//            let d = decodeSymbolList(data, "a.rss");
            PROJECT_FILE_LIST = data.files;
            showList(PROJECT_FILE_LIST, "pfilelist");
        }).catch(function (error) {
            report(error);
        });
    }
    menu("ProjFileSel");
}
function designMenu(n) {
    switch (n) {
        case 2: // new sheet
            menu("NewSheet");
            /*
            if(confirm("Are you sure you want to start a new sheet?"))
            {
              sheet.selectedObject = null;
              sheet.setState(STATE_IDLE);
              newSheet(true);
              repaint();
              }
            CloseMenu();
            */
            break;
        case 5:
            updateNetConnections1();
            repaint();
            CloseMenu();
            break;
        case 4:
            fixRefs();
            CloseMenu();
            repaint();
            break;
        default:
            CloseMenu();
            break;
    }
}
function upload() {
    CloseMenu();
    // menu("UploadFile");
    document.getElementById("UPLOAD").click();
}
function openProjectFile() {
    FindSymbol.clearFindQueue();
    let ss = document.getElementById("pfilelist");
    let n = ss.selectedIndex;
    let name = null;
    let fp = null;
    let s = null;
    let b = false;
    if (PROJECT_LIB == "LOCAL") {
        name = localStorage.key(n);
        report("openProjectFile " + n + " " + name);
        if (name.indexOf(".sch") != -1) {
            SheetLoadErrors = false;
            FailedLinks = [];
        }
        fp = new FileParser(name);
        s = localStorage.getItem(name);
        if (s != null) {
            if (name.indexOf(".xml") != -1) {
                let xmlDoc = null;
                if (window.DOMParser) {
                    let parser = new DOMParser();
                    xmlDoc = parser.parseFromString(s, "text/xml");
                }
                else {
                    xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
                    xmlDoc.async = false;
                    xmlDoc.loadXML(s);
                }
                if (xmlDoc != null) {
                    let sym = xmlSymbolParser(xmlDoc, ofname);
                    if (sym != null) {
                        sheet.selectedObject = sym;
                        sheet.setState(STATE_PLACING);
                    }
                }
            }
            else if ((name.indexOf(".sym") != -1) || (name.indexOf(".sch") != -1)) {
                let d = null;
                if (name.indexOf(".sym") != -1) {
                    d = fp.parse1(s);
                    if (d != null) {
                        sheet.selectedObject = d;
                        sheet.setState(STATE_PLACING);
                    }
                }
                else if (name.indexOf(".sch") != -1) {
                    clearReport();
                    FailedLinks = [];
                    SheetLoadErrors = false;
                    if (s.indexOf("<eagle") != -1) {
                        fp = new eagleParser(name);
                        fp.setData(s);
                        fp.getSchematic();
                    }
                    else {
                        d = fp.parse1(s);
                        if (d != null) {
                            if (ste.getSchematic().sheets.length == 1) {
                                if (confirm("Do you want to delete the existing sheet 1?")) {
                                    b = true;
                                }
                            }
                            openSheet(d);
                            if (b)
                                deleteSheet1();
                        }
                    }
                    repaint();
                }
            }
            else if (name.indexOf(".sho") != -1) {
                FailedLinks = [];
                decodeOneFile(s).then(function () {
                    fixRefs();
                    updateNetConnections1();
                    updateNetConnections1();
                    repaint();
                }).catch(function (e) {
                    report(e);
                });
            }
            else if (name.indexOf(".kicad_sym") != -1) {
                document.getElementById("grids").checked = true;
                updateGrid();
                let fp = new KParser(name);
                fp.setData(s);
                LIBRARIES_LOADED.push({
                    name: name,
                    title: name,
                    parser: fp,
                    description: name
                });
                updateLibrariesList();
                report("loaded " + name + " " + LIBRARIES_LOADED.length);
            }
            else if (name.indexOf(".kicad_sch") != -1) {
                clearReport();
                FailedLinks = [];
                //        document.getElementById("grids").checked = true;
                //        updateGrid();
                let fp = new KParser(name);
                fp.setData(s);
                fp.getSchematic().then(function (d) {
                    newSheet(true);
                    deleteSheet1();
                    document.getElementById("grids").checked = true;
                    updateGrid();
                    repaint();
                    sheet.addDrawingObjects(d.doj);
                    let k2 = d.attributes.length;
                    report("1808 k2 = " + k2);
                    let i2 = 0;
                    let f = sheet.getTitleSheet();
                    for (i2 = 0; i2 < k2; i2++) {
                        let a = setAttributeValue(d.attributes[i2].name, f, d.attributes[i2].value);
                        a.setVisible(d.attributes[i2].getVisible());
                    }
                    if ((typeof d.ncs !== 'undefined') && (d.ncs.length > 0)) {
                        let k1 = d.ncs.length;
                        let i1 = 0;
                        for (i1 = 0; i1 < k1; i1++) {
                            let objs = sheet.getObjectsAt(d.ncs[i1].x, d.ncs[i1].y);
                            if ((objs.length == 1) && (objs[0].klass == "DPin")) {
                                setAttributeValue("ncok", objs[0], true);
                            }
                            else
                                report("127 unable to set ncok " + i1);
                        }
                    }
                    fixRefs();
                    updateNetConnections1();
                    fp.fixKicadnetnames(sheet);
                    repaint();
                });
            }
            else if (name.indexOf(".net") != -1) {
                clearReport();
                if (s.indexOf("(export (") == 0) {
                    let fp = new KParser(name);
                    s = "(obj \n (netlist \n" + s.substring(s.indexOf("(nets")) + "))";
                    fp.setData(s);
                    fp.updateNets();
                }
            }
            else if (name.indexOf(".fp") != -1) {
                saveFile(name, s);
            }
        }
        CloseMenu();
    }
    else if (PROJECT_FILE_LIST[n].link == "uploads") {
        SymbolListDest = "pfilelist";
        let p = service.getProjectFilesList(PROJECT_LIB + "uploads/");
        p.then(function (data) {
            let d = decodeSymbolList(data, "uploads");
            PROJECT_FILE_LIST = d;
            showList(d, "pfilelist");
        }).catch(function (error) {
            report(error);
        });
    }
    else if (PROJECT_FILE_LIST[n].link == "..") {
        SymbolListDest = "pfilelist";
        let p = service.getProjectFilesList(PROJECT_LIB);
        p.then(function (data) {
            let d = decodeSymbolList(data, "");
            PROJECT_FILE_LIST = d;
            showList(d, "pfilelist");
        }).catch(function (error) {
            report(error);
        });
    }
    else {
        let lk = PROJECT_FILE_LIST[n].link;
        report("1965 openProjectFile a " + lk);
        if (lk.indexOf(".pdf") != -1)
            window.open(lk);
        else {
            let b = false;
            if (lk.indexOf(".sch") != -1) {
                SheetLoadErrors = false;
            }
 //           service.openFile(lk).then( (s) => {
            getData(lk).then( (s) => {
              processFileData(lk, s);
            }).catch( (e) => {
                report("1751 " + e);
            });
            CloseMenu();
        }
    }
}

function processFileData(name, s)
{
  if (s != null) 
  {
    if (name.indexOf(".xml") != -1) 
    {
      let xmlDoc = null;
      if (window.DOMParser) {
        let parser = new DOMParser();
        xmlDoc = parser.parseFromString(s, "text/xml");
      }
      else {
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = false;
        xmlDoc.loadXML(s);
      }
      if (xmlDoc != null) {
        let sym = xmlSymbolParser(xmlDoc, ofname);
        if (sym != null) {
          sheet.selectedObject = sym;
          sheet.setState(STATE_PLACING);
        }
      }
    }
    else if ((name.indexOf(".sym") != -1) || (name.indexOf(".sch") != -1)) {
      let d = null;
      let fp = new FileParser(name);
      if (name.indexOf(".sym") != -1) {
        d = fp.parse1(s);
        if (d != null) {
          sheet.selectedObject = d;
          sheet.setState(STATE_PLACING);
        }
      }
      else if (name.indexOf(".sch") != -1) {
        clearReport();
        FailedLinks = [];
        SheetLoadErrors = false;
        if (s.indexOf("<eagle") != -1) {
          let fp = new eagleParser(name);
          fp.setData(s);
          fp.getSchematic();
        }
        else {
          let fp = new FileParser(name);
          let b = false;
          d = fp.parse1(s);
          if (d != null) {
            if (ste.getSchematic().sheets.length == 1) {
              if (confirm("Do you want to delete the existing sheet 1?")) {
                b = true;
              }
            }
            openSheet(d);
            if (b) deleteSheet1();
          }
        }
        repaint();
      }
    }
    else if (name.indexOf(".sho") != -1) {
      FailedLinks = [];
      decodeOneFile(s).then(function () {
        fixRefs();
        updateNetConnections1();
        updateNetConnections1();
        repaint();
        }).catch(function (e) {
            report(e);
        });
    }
    else if (name.indexOf(".kicad_sym") != -1) {
      document.getElementById("grids").checked = true;
      updateGrid();
      let fp = new KParser(name);
      fp.setData(s);
      LIBRARIES_LOADED.push({
        name: name,
        title: name,
        parser: fp,
        description: name
        });
      updateLibrariesList();
      report("loaded " + name + " " + LIBRARIES_LOADED.length);
    }
    else if (name.indexOf(".kicad_sch") != -1) {
      clearReport();
      FailedLinks = [];
                //        document.getElementById("grids").checked = true;
                //        updateGrid();
      let fp = new KParser(name);
      fp.setData(s);
      fp.getSchematic().then(function (d) {
         newSheet(true);
         deleteSheet1();
         document.getElementById("grids").checked = true;
         updateGrid();
         repaint();
         sheet.addDrawingObjects(d.doj);
         let k2 = d.attributes.length;
         report("1808 k2 = " + k2);
         let i2 = 0;
         let f = sheet.getTitleSheet();
         for (i2 = 0; i2 < k2; i2++) {
           let a = setAttributeValue(d.attributes[i2].name, f, d.attributes[i2].value);
           a.setVisible(d.attributes[i2].getVisible());
         }
         if ((typeof d.ncs !== 'undefined') && (d.ncs.length > 0)) {
           let k1 = d.ncs.length;
           let i1 = 0;
           for (i1 = 0; i1 < k1; i1++) {
             let objs = sheet.getObjectsAt(d.ncs[i1].x, d.ncs[i1].y);
             if ((objs.length == 1) && (objs[0].klass == "DPin")) {
               setAttributeValue("ncok", objs[0], true);
             }
             else report("127 unable to set ncok " + i1);
           }
         }
         fixRefs();
         updateNetConnections1();
         fp.fixKicadnetnames(sheet);
         repaint();
      });
    }
    else if (name.indexOf(".net") != -1) {
      clearReport();
      if (s.indexOf("(export (") == 0) {
        let fp = new KParser(name);
        s = "(obj \n (netlist \n" + s.substring(s.indexOf("(nets")) + "))";
        fp.setData(s);
        fp.updateNets();
      }
    }
    /*
    else if (name.indexOf(".lib") != -1) {
            let fp = new FileParser( + "?" + name);
            let sym = fp.parsekicad(s, name);
            sheet.selectedObject = sym;
            sheet.setState(STATE_PLACING);
        }
        */
    else if (name.indexOf(".fp") != -1) {
        saveFile(name, s);
    }
    else if ((name.indexOf(".js") != -1) || (FileLink.indexOf(".vcd") != -1)) {
      clearReport();
      report(FileRequest.responseText);
      window.open(FileLink, "_blank", "status=1,toolbar=1,menubar=1,scrollbars=yes,height=480,width=360");
    }
 }
 CloseMenu();
}

function decodeOneFile(s) {
    let p = new Promise(function (resolve, reject) {
        let i1 = s.indexOf("#");
        let name = s.substring(i1 + 2, s.indexOf("\n", i1)).trim();
        let i2 = s.indexOf("v ", i1);
        let i3 = s.indexOf("#", i1 + 1);
        let b = true;
        let blast = true;
        let bfirsttime = true;
        while (blast) {
            report("1846 i1 = " + i1 + " i2 = " + i2 + " i3 = " + i3 + " " + name);
            if (i3 <= 0)
                blast = false;
            if (name.indexOf(".sym") != -1) {
                let sx = localStorage.getItem(name);
                if (sx == null) {
                    localStorage.setItem(name, s.substring(i2, i3));
                    report("  saved " + name + " in LOCAL");
                }
                else
                    report("  " + name + " already in LOCAL");
                i1 = i3;
                name = s.substring(i1 + 2, s.indexOf("\n", i1)).trim();
                i2 = s.indexOf("v ", i1);
                i3 = s.indexOf("#", i1 + 1);
            }
            else if (name.indexOf(".sch") != -1) {
                if ((ste.getSchematic().sheets.length == 1) && bfirsttime) {
                    bfirsttime = false;
                    if (confirm("Do you want to delete the existing sheet 1?")) {
                        b = true;
                    }
                    else
                        b = false;
                }
                report("1869 parsing " + name);
                FileRequest = null;
                let fp = new FileParser(name);
                let s1 = "";
                if (i3 > 0)
                    s1 = s.substring(i2, i3);
                else
                    s1 = s.substring(i2);
                let d = fp.parse1(s1);
                if (d != null) {
                    openSheet(d);
                }
                else
                    reject("decodeOneFile: parsing error for " + name);
                //      blast = false;
                i1 = i3;
                name = s.substring(i1 + 2, s.indexOf("\n", i1)).trim();
                i2 = s.indexOf("v ", i1);
                i3 = s.indexOf("#", i1 + 1);
            }
            //    if(blast)
            //    {
            //      report("1882 i3 = "+ i3);
            //      if(i3 <= 0)  blast = false;
            //      i1 = i3;
            //     name = s.substring(i1 + 2, s.indexOf("\n", i1)).trim();
            //      i2 = s.indexOf("v 2", i1);
            //      i3 = s.indexOf("#", i1 + 1);
            //      report("i2 = " + i2 + " i1 = " + i1 + " i3 = " + i3);
            //      report("last name = " + name);
            //      report("end of last name");
            //      if(b && !blast) deleteSheet1();
            //      if(i3 == -1) 
            //      {
            //        i3 = s.length;
            //        b = false;
            //      }
            //    }
        }
        if (b && !blast)
            deleteSheet1();
        resolve();
    });
    return (p);
}
function openSheet1(d) {
    newSheet(false);
    repaint();
    sheet.addDrawingObjects(d.doj);
    sheet.addAttributes(d.attributes);
    repaint();
}
//TODO
function openSheet(d) {
    newSheet(false);
    repaint();
    sheet.addDrawingObjects(d.doj);
    sheet.addAttributes(d.attributes);
    repaint();
}
function deleteSheet() {
    if (confirm("Are you sure you want to delete this sheet?")) {
        let sm = ste.getSchematic();
        sm.removeSheet(sheet);
        let k = sm.sheets.length;
        if (k == 0)
            newSheet(true);
        else
            sheet = sm.sheets[0];
        CurrentSheetIndex = 0;
        de = sheet.getDrawingEnvironment();
        updateSheetDisplay();
        repaint();
    }
    CloseMenu();
}
function deleteSheet1() {
    let sm = ste.getSchematic();
    if (sm.sheets.length > 1) {
        //  if(confirm("Are you sure you want to delete sheet 1?"))
        {
            let sm = ste.getSchematic();
            sheet = sm.sheets[0];
            sm.removeSheet(sheet);
            let k = sm.sheets.length;
            if (k == 0)
                newSheet(true);
            else
                sheet = sm.sheets[0];
            CurrentSheetIndex = 0;
            de = sheet.getDrawingEnvironment();
            updateSheetDisplay();
            repaint();
        }
    }
    CloseMenu();
}
function selSheet() {
    let ss = document.getElementById("sheets");
    let n = ss.selectedIndex;
    if (n != CurrentSheetIndex) {
        CurrentSheetIndex = n;
        sheet = ste.getSchematic().sheets[n];
        de = sheet.getDrawingEnvironment();
        repaint();
    }
    CloseMenu();
    repaint();
}

let ofname = null;
let reader = null;
function openSelFile1(evt) {
    let files = evt.target.files;
    ofname = files[0].name;
    report("2137 " + ofname);
    if (ofname.indexOf(".sch") != -1) {
        FailedLinks = [];
        reader = new FileReader();
        reader.onload = function (evt) {
            let b = false;
            clearReport();
            SheetLoadErrors = false;
            let etr = evt.target.result;
            report(etr);
            let d = null;
            let fp = null;
            if (etr.indexOf("<eagle") != -1) {
                fp = new eagleParser(ofname);
                fp.setData(etr);
                fp.getSchematic();
            }
            else {
                fp = new FileParser(ofname);
                d = fp.parse1(etr);
                if (ste.getSchematic().sheets.length == 1) {
                    if (confirm("Do you want to delete the existing sheet 1?")) {
                        b = true;
                    }
                    openSheet(d);
                    if (b)
                        deleteSheet1();
                }
            }
            repaint();
        };
        reader.readAsText(files[0]);
    }
    else if (ofname.indexOf(".sym") != -1) {
        reader = new FileReader();
        reader.onload = function (evt) {
            clearReport();
            report(evt.target.result);
            let fp = new FileParser(ofname);
            let d = fp.parse1(evt.target.result);
            sheet.selectedObject = d;
            sheet.setState(STATE_PLACING);
        };
        reader.readAsText(files[0]);
    }
    else if (ofname.indexOf(".sho") != -1) {
        FailedLinks = [];
        reader = new FileReader();
        reader.onload = function (evt) {
            clearReport();
            report(evt.target.result);
            //      let fp = new FileParser(ofname);
            decodeOneFile(evt.target.result).then(function () {
                fixRefs();
                updateNetConnections1();
                updateNetConnections1();
                repaint();
            }).catch(function (e) {
                report(e);
            });
        };
        reader.readAsText(files[0]);
    }
    else if (ofname.indexOf(".kicad_sch") != -1) {
        FailedLinks = [];
        document.getElementById("grids").checked = true;
        updateGrid();
        reader = new FileReader();
        reader.onload = function (evt) {
            clearReport();
            let fp = new KParser(ofname);
            fp.setData(evt.target.result);
            fp.getSchematic().then(function (d) {
                newSheet(true);
                deleteSheet1();
                repaint();
                sheet.addDrawingObjects(d.doj);
                let k2 = d.attributes.length;
                report("2013 k2 = " + k2);
                let i2 = 0;
                let f = sheet.getTitleSheet();
                for (i2 = 0; i2 < k2; i2++) {
                    let a = setAttributeValue(d.attributes[i2].name, f, d.attributes[i2].value);
                    a.setVisible(d.attributes[i2].getVisible());
                }
                if ((typeof d.ncs !== 'undefined') && (d.ncs.length > 0)) {
                    let k1 = d.ncs.length;
                    let i1 = 0;
                    for (i1 = 0; i1 < k1; i1++) {
                        let objs = sheet.getObjectsAt(d.ncs[i1].x, d.ncs[i1].y);
                        if ((objs.length == 1) && (objs[0].klass == "DPin")) {
                            setAttributeValue("ncok", objs[0], true);
                        }
                        else
                            report("2024 unable to set ncok " + i1);
                    }
                }
                fixRefs();
                updateNetConnections1();
                fp.fixKicadnetnames(sheet);
                repaint();
            });
        };
        reader.readAsText(files[0]);
    }
    else if ((ofname.indexOf(".lib") != -1) || (ofname.indexOf(".kicad_sym") != -1)) {
        document.getElementById("grids").checked = true;
        updateGrid();
        reader = new FileReader();
        reader.onload = function (evt) {
            clearReport();
            //      report(evt.target.result);
            let fp = new KParser(ofname);
            fp.setData(evt.target.result);
            LIBRARIES_LOADED.push({
                name: ofname,
                title: ofname,
                parser: fp,
                description: ofname
            });
            updateLibrariesList();
            report("loaded " + ofname + " " + LIBRARIES_LOADED.length);
        };
        reader.readAsText(files[0]);
    }
    else if (ofname.indexOf(".net") != -1) {
        reader = new FileReader();
        reader.onload = function (evt) {
            clearReport();
            report("2264 open " + ofname);
            let s = evt.target.result;
            if (s.indexOf("(export (") == 0) {
                s = "(obj \n (netlist \n" + s.substring(s.indexOf("(nets")) + "))";
                let fp = new KParser(ofname);
                fp.setData(s);
                //        debugK = true;
                fp.updateNets();
                debugK = false;
            }
        };
        reader.readAsText(files[0]);
    }
    else if (ofname.indexOf(".xml") != -1) {
        reader = new FileReader();
        reader.onload = function (evt) {
            let xmlDoc = null;
            if (window.DOMParser) {
                let parser = new DOMParser();
                xmlDoc = parser.parseFromString(evt.target.result, "text/xml");
            }
            else {
                xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
                xmlDoc.async = false;
                xmlDoc.loadXML(evt.target.result);
            }
            if (xmlDoc != null) {
                let sym = xmlSymbolParser(xmlDoc, ofname);
                if (sym != null) {
                    sheet.selectedObject = sym;
                    sheet.setState(STATE_PLACING);
                }
            }
            else
                report("xmlDoc is null");
        };
        reader.readAsText(files[0]);
    }
    else if (ofname.indexOf(".json") != -1) {
        reader = new FileReader();
        reader.onload = function (evt) {
            clearReport();
//           try{
            let o = JSON.parse(evt.target.result);
            if(o.type == "schematic")
            {
              ParserJSON.parse(o).then((d) => {
                  report("2291 " + d.klass);
//                  ste.setSchematic(d);
                  sheet = ste.getSchematic().sheets[0];
//                  report("2300 " + sheet.klass + "  " + sheet.type + " " + ste.getSchematic().sheets.length + " " );
//                sheet.selectedObject = d;
//                sheet.setState(STATE_PLACING);
                  updateSheetDisplay();
                  repaint();
                  
              }); /*.catch( (e) => {
                  report("2293 " + e);
              }); */
            }
            else if(o.type == "DComponent")
            {
              ParserJSON.parse(o).then((d) => {
                  sheet.selectedObject = d;
                  sheet.setState(STATE_PLACING);
              });
            }
            else if((o.type == "symbol") || (o.type == "part") || (o.type == "unit") || (o.type == "entity"))
            {
              if(horiz == null) horiz = new Horizon(); 
              let sym = horiz.parse(o);
              if (sym != null) {
                sheet.selectedObject = sym;
                sheet.setState(STATE_PLACING);
              }
            }
            else report("2242 " + o.type + " is not supported");
//            }
//            catch(e) {
//                report("2246 "+ e);
//            }
        };
        reader.readAsText(files[0]);
   
    }
    else {
        clearReport();
        report(evt.target.result);
    }
    CloseMenu();
    repaint();
}

function openFile() 
{
  CloseMenu();
  //menu("OpenFile");
  document.getElementById("files").click();
}

function needSymbol(name) {
    CloseMenu();
    if ((!ipod) && (name != "null.sym")) {
        menu("NeedSymbol");
        symname = name;
        SheetLoadErrors = true;
        document.getElementById("findsymb").innerHTML = "Manually Find Symbol: " + name;
    }
}
function cancelNeedSym() {
    CloseMenu();
    repaint();
    FindSymbol.removeFromFindQueue();
    report("-> Symbol " + symname + " not loaded.");
}
function openSelFile2(evt) {
    let files = evt.target.files;
    sofname = files[0].name;
    if (sofname.indexOf(".sym") != -1) {
        reader = new FileReader();
        reader.onload = function (evt) {
            report(evt.target.result);
            localStorage.setItem(sofname, evt.target.result);
            report("- saved " + sofname + " to LOCAL " + sofname);
            FindSymbol.removeFromFindQueue();
        };
        reader.readAsText(files[0]);
    }
    CloseMenu();
    repaint();
}
function saveSelFile() {
    CloseMenu();
}
function saveSelFile1(evt) {
    let files = evt.target.files;
    document.getElementById("sfn").value = files[0].name;
}
function redo() {
    stack.redo();
    CloseMenu();
    repaint();
}
function undo() {
    stack.undo();
    CloseMenu();
    repaint();
}
function editMenu(n) {
    CloseMenu();
}
function prefMenu(n) {
    CloseMenu();
}

let mmode = 0;

function addNetVertex() {
    let o = sheet.selectedObject;
    if (o.klass == "DNet") {
        let z = de.getInverseZoom();
        let xx = de.mouseToDrawingX(NetPos.x) + xfmX * z;
        let yy = de.mouseToDrawingY(NetPos.y) - xfmY * z;
        let name = getAttributeValue("netname", o);
        report("xx = " + xx + ", yy = " + yy);
        let x3 = o.getX2();
        let y3 = o.getY2();
        o.setX2(xx);
        o.setY2(yy);
        let n = new DNet(de, xx, yy, x3, y3, NET_COLOR);
        setAttributeValue("netname", n, name);
        sheet.selectedObject = n;
        sheet.addDrawingObject(n);
        MOVEPOINTS = [];
        ENDPOINT = null;
        CloseMenu();
        repaint();
    }
}
function groupMove(dx, dy) {
    let b = false;
    if (sheet.selectbox != null) {
        b = true;
        mmode = 0;
        let vd = sheet.getObjectsInArea(sheet.selectbox);
        let k = vd.length;
        let i = 0;
        let o = null;
        while (i < k) {
            o = vd[i];
            o.setX(o.getX() + dx);
            o.setY(o.getY() + dy);
            o.update();
            i += 1;
        }
        o = sheet.selectbox;
        o.setX(o.getX() + dx);
        o.setY(o.getY() + dy);
        o.update();
    }
    else if (MOVEPOINTS.length > 0) {
        b = true;
        mmode = 0;
        let vd = MOVEPOINTS;
        let k = vd.length;
        let i = 0;
        while (i < k) {
            let o = vd[i];
            {
                o.setX(o.getX() + dx);
                o.setY(o.getY() + dy);
                o.update();
            }
            i += 1;
        }
    }
    return (b);
}
function move() {
    if (mmode != 3)
        mmode = 0;
    CloseMenu();
    if (sheet.selectedObject != null)
        sheet.setState(STATE_MOVE);
}
function moveRefdes() {
    mmode = 0;
    CloseMenu();
    let ref = getAttribute("refdes", sheet.selectedObject);
    if ((ref != null) && (ref != "")) {
        ref.parent = sheet.selectedObject;
        sheet.selectedObject = ref;
        sheet.setState(STATE_MOVE);
    }
}
function moveValue() {
    mmode = 0;
    CloseMenu();
    let ref = getAttribute("value", sheet.selectedObject);
    if ((ref != null) && (ref != "")) {
        ref.parent = sheet.selectedObject;
        sheet.selectedObject = ref;
        sheet.setState(STATE_MOVE);
    }
}
function adjustNet() {
    mmode = 1;
    CloseMenu();
}
function selectEnd() {
    CloseMenu();
    let o = sheet.selectedObject;
    if (o.klass == "DNet") {
        sheet.selectedObject = getNearEnd(o);
        menu("NetEnd");
        repaint();
    }
}
function moveBanding() {
    CloseMenu();
    mmode = 3;
    let objs = [];
    let pin = sheet.selectedObject;
    if (pin.klass == "DEnd") {
        objs = sheet.getObjectsAt(pin.x, pin.y);
    }
    if (objs.length > 0)
        objs.push(pin);
    MOVEPOINTS = objs;
    ENDPOINT = new DEnd(pin.x, pin.y);
    sheet.selectbox = null;
}
function movePoint() {
    CloseMenu();
    let objs = [];
    let pin = sheet.selectedObject;
    if (pin.klass == "DEnd") {
        objs = sheet.getObjectsAt(pin.x, pin.y);
    }
    if (objs.length > 0)
        objs.push(pin);
    //  report("movePoint has " + objs.length + " objects to move.");
    MOVEPOINTS = objs;
    sheet.selectbox = null;
}
function moveLeft() {
    let o = sheet.selectedObject;
    if ((mmode != 3) && (groupMove(-gridsize, 0)))
        ;
    else if (o != null) {
        if ((mmode == 1) && (o.klass == "DNet")) {
            let n = getFreeEnd(o);
            switch (n) {
                case 1:
                    o.x1 = o.x1 - gridsize;
                    o.update();
                    break;
                case 3:
                    o.x2 = o.x2 - gridsize;
                    o.update();
                    break;
            }
        }
        else if ((mmode == 3) && (ENDPOINT != null)) {
            let i = 0;
            let ver = null;
            if (ENDPOINT.klass == "DEnd") {
                let x0 = ENDPOINT.x;
                let y0 = ENDPOINT.y;
                let b = false;
                for (i = 0; i < MOVEPOINTS.length; i++) {
                    let a = MOVEPOINTS[i];
                    if (a.klass == "DNet") {
                        if ((a.getX() == x0) && (a.getY() == y0)) {
                            a.x1 -= gridsize;
                            b = true;
                        }
                        else if ((a.getX2() == x0) && (a.getY2() == y0)) {
                            a.x2 -= gridsize;
                            b = true;
                        }
                        a.update();
                    }
                }
                if (b) {
                    ENDPOINT.x -= gridsize;
                }
            }
        }
        else {
            mmode = 0;
            o.setX(Number(o.getX()) - gridsize);
            o.update();
            repaint();
        }
    }
    else {
        ctx.clearRect(0, 0, MAXWIDTH, MAXHEIGHT);
        ctx.translate(-gridsize, 0);
        let z = de.getInverseZoom();
        xfmX += gridsize;
    }
    repaint();
}
function moveRight() {
    let o = sheet.selectedObject;
    if ((mmode != 3) && (groupMove(gridsize, 0)))
        ;
    else if (o != null) {
        if ((mmode == 1) && (o.klass == "DNet")) {
            let n = getFreeEnd(o);
            switch (n) {
                case 1:
                    o.x1 = o.x1 + gridsize;
                    o.update();
                    break;
                case 3:
                    o.x2 = o.x2 + gridsize;
                    o.update();
                    break;
            }
        }
        else if ((mmode == 3) && (ENDPOINT != null)) {
            let i = 0;
            let ver = null;
            if (ENDPOINT.klass == "DEnd") {
                let x0 = ENDPOINT.x;
                let y0 = ENDPOINT.y;
                let b = false;
                for (i = 0; i < MOVEPOINTS.length; i++) {
                    let a = MOVEPOINTS[i];
                    if (a.klass == "DNet") {
                        if ((a.getX() == x0) && (a.getY() == y0)) {
                            a.x1 += gridsize;
                            b = true;
                        }
                        else if ((a.getX2() == x0) && (a.getY2() == y0)) {
                            a.x2 += gridsize;
                            b = true;
                        }
                        a.update();
                    }
                }
                if (b) {
                    ENDPOINT.x += gridsize;
                }
            }
        }
        else {
            mmode = 0;
            o.setX(Number(o.getX()) + gridsize);
            o.update();
            repaint();
        }
    }
    else {
        ctx.clearRect(0, 0, MAXWIDTH, MAXHEIGHT);
        ctx.translate(gridsize, 0);
        let z = de.getInverseZoom();
        xfmX -= gridsize;
    }
    repaint();
}
function moveUp() {
    let o = sheet.selectedObject;
    if ((mmode != 3) && (groupMove(0, gridsize)))
        ;
    else if (o != null) {
        if ((mmode == 1) && (o.klass == "DNet")) {
            let n = getFreeEnd(o);
            switch (n) {
                case 2:
                    o.y1 = o.y1 + gridsize;
                    o.update();
                    break;
                case 4:
                    o.y2 = o.y2 + gridsize;
                    o.update();
                    break;
            }
        }
        else if ((mmode == 3) && (ENDPOINT != null)) {
            let i = 0;
            let ver = null;
            if (ENDPOINT.klass == "DEnd") {
                let x0 = ENDPOINT.x;
                let y0 = ENDPOINT.y;
                let b = false;
                for (i = 0; i < MOVEPOINTS.length; i++) {
                    let a = MOVEPOINTS[i];
                    if (a.klass == "DNet") {
                        if ((a.getX() == x0) && (a.getY() == y0)) {
                            a.y1 += gridsize;
                            b = true;
                        }
                        else if ((a.getX2() == x0) && (a.getY2() == y0)) {
                            a.y2 += gridsize;
                            b = true;
                        }
                        a.update();
                    }
                }
                if (b) {
                    ENDPOINT.y += gridsize;
                }
            }
        }
        else {
            mmode = 0;
            o.setY(Number(o.getY()) + gridsize);
            o.update();
            repaint();
        }
    }
    else {
        ctx.clearRect(0, 0, MAXWIDTH, MAXHEIGHT);
        ctx.translate(0, -gridsize);
        let z = de.getInverseZoom();
        xfmY += gridsize;
    }
    repaint();
}
function moveDown() {
    let o = sheet.selectedObject;
    if ((mmode != 3) && (groupMove(0, -gridsize)))
        ;
    else if (o != null) {
        if ((mmode == 1) && (o.klass == "DNet")) {
            let n = getFreeEnd(o);
            switch (n) {
                case 2:
                    o.y1 = o.y1 - gridsize;
                    o.update();
                    break;
                case 4:
                    o.y2 = o.y2 - gridsize;
                    o.update();
                    break;
            }
        }
        else if ((mmode == 3) && (ENDPOINT != null)) {
            let i = 0;
            let ver = null;
            if (ENDPOINT.klass == "DEnd") {
                let x0 = ENDPOINT.x;
                let y0 = ENDPOINT.y;
                let b = false;
                for (i = 0; i < MOVEPOINTS.length; i++) {
                    let a = MOVEPOINTS[i];
                    if (a.klass == "DNet") {
                        if ((a.getX() == x0) && (a.getY() == y0)) {
                            a.y1 -= gridsize;
                            b = true;
                        }
                        else if ((a.getX2() == x0) && (a.getY2() == y0)) {
                            a.y2 -= gridsize;
                            b = true;
                        }
                        a.update();
                    }
                }
                if (b) {
                    ENDPOINT.y -= gridsize;
                }
            }
        }
        else {
            mmode = 0;
            o.setY(Number(o.getY()) - gridsize);
            o.update();
            repaint();
        }
    }
    else {
        ctx.clearRect(0, 0, MAXWIDTH, MAXHEIGHT);
        ctx.translate(0, gridsize);
        let z = de.getInverseZoom();
        xfmY -= gridsize;
    }
    repaint();
}
function copy() {
    let o = sheet.selectedObject;
    if (o != null) {
        if (o.klass == "DComponent") {
            let fn = o.filename;
            if ((fn != null) && (fn.indexOf(".sym") != -1)) {
                report("copy " + fn);
                sheet.bcopies = true;
                let ddc = new DComponent(de, 0, 0, 1, 0, 0, fn);
                let fs = new FindSymbol(fn, PROJECT_LIB, ddc);
                FindSymbol.addToFindQueue(fs);
                sheet.selectedObject = ddc;
                sheet.setState(STATE_PLACING);
            }
        }
        CloseMenu();
    }
}
function rotate() {
    let o = sheet.selectedObject;
    if (o != null) {
        let r = new RotateCommand(o);
        stack.add(r);
        r.execute();
    }
    repaint();
    CloseMenu();
}
function flip() {
    CloseMenu();
    if ((sheet.selectedObject.klass == "DComponent") || (sheet.selectedObject.klass == "DPin")) {
        let f = new FlipCommand(sheet.selectedObject);
        stack.add(f);
        f.execute();
        repaint();
    }
}
function busToggle() {
    CloseMenu();
    if (sheet.selectedObject.klass == "DPin") {
        let f = sheet.selectedObject.pintype;
        if (f == 0)
            sheet.selectedObject.pintype = 1;
        else
            sheet.selectedObject.pintype = 0;
        repaint();
    }
}
let selsel = null;
function editAttributes() {
    CloseMenu();
    menu("Atts");
    document.getElementById("attx").value = "";
    document.getElementById("atty").value = "";
    document.getElementById("attfontsize").value = "";
    document.getElementById("attindex").getElementsByTagName('option')[ATTRIBUTE_COLOR].selected = true;
    document.getElementById("attangle").getElementsByTagName('option')[0].selected = true;
    document.getElementById("attalign").getElementsByTagName('option')[0].selected = true;
    document.getElementById("attvisible").checked = false;
    document.getElementById("showatt").checked = false;
    document.getElementById("showvalue").checked = false;
    let t = sheet.selectedObject;
    if (t == null)
        t = sheet.getTitleSheet();
    //report("2669 " + t.klass + " " + t.attributes.length);
    selsel = t;
    if (t != null)
        t = t.attributes;
    let k = t.length;
    let i = 0;
    let tbl = document.createElement("table");
    let tblBody = document.createElement("tbody");
    while (i < k) {
        let row = document.createElement("tr");
        let cell = document.createElement("td");
        let cellText = document.createTextNode(t[i].name);
        cell.appendChild(cellText);
        row.appendChild(cell);
        cell = document.createElement("td");
        row.addEventListener("click", function () { showAttribute(tblBody, this.rowIndex); });
        let cellTextbox = document.createElement("input");
        cellTextbox.setAttribute("type", "text");
        cellTextbox.setAttribute("id", "tbv" + i);
        cellTextbox.setAttribute("value", t[i].value);
        cell.appendChild(cellTextbox);
        row.appendChild(cell);
        tblBody.appendChild(row);
        i += 1;
    }
    tbl.appendChild(tblBody);
    tbl.setAttribute("border", "1");
    let iff = document.getElementById("attt");
    while (iff.firstChild) {
        iff.removeChild(iff.firstChild);
    }
    iff.appendChild(tbl);
}
function showAttribute(tblBody, a) {
    let selat = selsel.attributes[a];
    selectedAttribute = selat;
    selectedIndex = a;
    document.getElementById("attx").value = selat.x;
    document.getElementById("atty").value = selat.y;
    document.getElementById("attfontsize").value = selat.size;
    let b = false;
    if (selat.visibility == 1)
        b = true;
    document.getElementById("attvisible").checked = b;
    b = false;
    if (selat.show_name_value != 1)
        b = true;
    document.getElementById("showatt").checked = b;
    b = false;
    if (selat.show_name_value != 2)
        b = true;
    document.getElementById("showvalue").checked = b;
    document.getElementById("attindex").getElementsByTagName('option')[selat.colorindex].selected = true;
    document.getElementById("attalign").getElementsByTagName('option')[selat.alignment].selected = true;
    let i = selat.angle;
    if (i == 90)
        i = 1;
    else if (i == 180)
        i = 2;
    else if (i == 270)
        i = 3;
    else
        i = 0;
    document.getElementById("attangle").getElementsByTagName('option')[i].selected = true;
    let rows = tblBody.getElementsByTagName("tr");
    let k = rows.length;
    i = 0;
    while (i < k) {
        rows[i].style = "background : lightyellow";
        i += 1;
    }
    rows[a].style = "background : blue";
}
//TODO
function editAttOK() {
    let selat = selectedAttribute;
    if (selat != null) {
        updateAttribute(selat, document.getElementById("tbv" + selectedIndex).value);
        selat.x = document.getElementById("attx").value;
        selat.y = document.getElementById("atty").value;
        selat.size = document.getElementById("attfontsize").value;
        let b = 0;
        if (document.getElementById("attvisible").checked)
            b = 1;
        selat.visibility = b;
        b = 1;
        if (document.getElementById("showatt").checked) {
            if (document.getElementById("showvalue").checked)
                b = 0;
            else
                b = 2;
        }
        selat.show_name_value = b;
        selat.colorindex = document.getElementById("attindex").selectedIndex;
        selat.alignment = document.getElementById("attalign").selectedIndex;
        b = document.getElementById("attangle").selectedIndex;
        if (b == 1)
            b = 90;
        else if (b == 2)
            b = 180;
        else if (b == 3)
            b = 270;
        else
            b = 0;
        selat.angle = b;
        if (selat.name == "net") {
            sheet.selectedObject.update();
        }
        else if (selat.name == "slot") {
            sheet.selectedObject.update();
        }
        else if (selat.name == "pintype") {
            sheet.selectedObject.update();
        }
    }
    CloseMenu();
    selectedAttribute = null;
    selectedIndex = -1;
    repaint();
}
function editAttCancel() {
    CloseMenu();
    selectedAttribute = null;
    selectedIndex = -1;
}
function makeNewAtt() {
    CloseMenu();
    menu("NEWATT");
    document.getElementById("nattname").value = "";
    document.getElementById("nattvalue").value = "";
    let k = AllAttributes.length;
    let i = 0;
    let ss = document.getElementById("alist");
    i = ss.children.length - 1;
    while (i >= 0) {
        ss.remove(i);
        i -= 1;
    }
    i = 0;
    while (i < k) {
        let p = AllAttributes[i];
        let op = document.createElement("option");
        op.text = p;
        ss.add(op);
        i += 1;
    }
    repaint();
}
function addNewAttribute() {
    let o = sheet.selectedObject;
    if (o != null) {
        setAttributeValue(document.getElementById("nattname").value, o, document.getElementById("nattvalue").value);
    }
    CloseMenu();
}
function useStd() {
    let z = document.getElementById("alist");
    let i = z.selectedIndex;
    if (i != -1)
        document.getElementById("nattname").value = AllAttributes[i];
}
function editPath() {
    CloseMenu();
    menu("PathEdit");
    let t = sheet.selectedObject.segments;
    let k = t.length;
    let i = 0;
    let j = 0;
    let cols = ["Node", "x", "y"];
    let cw = [5, 5, 5];
    let tbl = document.createElement("table");
    let tblBody = document.createElement("tbody");
    let row = document.createElement("tr");
    let cell = null;
    let cellText = null;
    for (j = 0; j < cols.length; j++) {
        cell = document.createElement("th");
        cellText = document.createTextNode(cols[j]);
        cell.appendChild(cellText);
        row.appendChild(cell);
    }
    tblBody.appendChild(row);
    while (i < k) {
        let row = document.createElement("tr");
        //let cell = document.createElement("td");
        //let cellText = document.createTextNode(getAttributeValue("pinlabel", t[i]));
        //cell.appendChild(cellText);
        //row.appendChild(cell);
        row.addEventListener("click", function () { highlightPin(tblBody, this.rowIndex); });
        for (j = 0; j < cols.length; j++) {
            cell = document.createElement("td");
            let cellTextbox = document.createElement("input");
            cellTextbox.setAttribute("type", "text");
            cellTextbox.setAttribute("size", cw[j]);
            cellTextbox.setAttribute("id", "ph" + i + "_" + j);
            if (j == 0)
                cellTextbox.setAttribute("value", i);
            else if (j == 1)
                cellTextbox.setAttribute("value", t[i].x1);
            else if (j == 2)
                cellTextbox.setAttribute("value", de.correctY(t[i].y1));
            cell.appendChild(cellTextbox);
            row.appendChild(cell);
        }
        tblBody.appendChild(row);
        i += 1;
    }
    tbl.appendChild(tblBody);
    tbl.setAttribute("border", "1");
    let iff = document.getElementById("pathz");
    while (iff.firstChild) {
        iff.removeChild(iff.firstChild);
    }
    iff.appendChild(tbl);
}
function editPathsOK() {
    let i = 0;
    let x0 = document.getElementById("ph0_1").value;
    let y0 = de.correctY(document.getElementById("ph0_2").value);
    let lines = sheet.selectedObject.segments;
    let k = lines.length;
    lines[0].x1 = x0;
    lines[0].y1 = y0;
    i += 1;
    while (i < k) {
        let xx = document.getElementById("ph" + i + "_1").value;
        lines[i - 1].x2 = xx;
        lines[i].x1 = xx;
        let yy = de.correctY(document.getElementById("ph" + i + "_2").value);
        lines[i - 1].y2 = yy;
        lines[i].y1 = yy;
        i += 1;
    }
    lines[i - 1].x2 = x0;
    lines[i - 1].y2 = y0;
    CloseMenu();
    repaint();
}
function editPins() {
    CloseMenu();
    if(sheet.selectedObject.klass == "DComponent")
    {
    menu("Pins");
    let t = sheet.selectedObject.getPins();
    let k = t.length;
    let i = 0;
    let j = 0;
    let cols = ["pinlabel", "pinnumber", "pintype", "pinseq", "connectedSignal"];
    let cw = [10, 2, 3, 3, 10];
    let tbl = document.createElement("table");
    let tblBody = document.createElement("tbody");
    let row = document.createElement("tr");
    let cell = null;
    let cellText = null;
    for (j = 0; j < cols.length; j++) {
        cell = document.createElement("th");
        cellText = document.createTextNode(cols[j]);
        cell.appendChild(cellText);
        row.appendChild(cell);
    }
    tblBody.appendChild(row);
    while (i < k) {
        let row = document.createElement("tr");
        //let cell = document.createElement("td");
        //let cellText = document.createTextNode(getAttributeValue("pinlabel", t[i]));
        //cell.appendChild(cellText);
        //row.appendChild(cell);
        row.addEventListener("click", function () { highlightPin(tblBody, this.rowIndex); });
        for (j = 0; j < cols.length; j++) {
            cell = document.createElement("td");
            let cellTextbox = document.createElement("input");
            cellTextbox.setAttribute("type", "text");
            cellTextbox.setAttribute("size", cw[j]);
            cellTextbox.setAttribute("id", "p" + i + "_" + j);
            if (j != 4)
                cellTextbox.setAttribute("value", getAttributeValue(cols[j], t[i]));
            else {
                let cs = t[i].connectedSignal;
                if (cs == null)
                    cs = "";
                cellTextbox.setAttribute("value", cs);
            }
            cell.appendChild(cellTextbox);
            row.appendChild(cell);
        }
        tblBody.appendChild(row);
        i += 1;
    }
    tbl.appendChild(tblBody);
    tbl.setAttribute("border", "1");
    let iff = document.getElementById("pinz");
    while (iff.firstChild) {
        iff.removeChild(iff.firstChild);
    }
    iff.appendChild(tbl);
    }
}
function highlightPin(tblBody, a) {
    let rows = tblBody.children;
    let k = rows.length;
    let i = 0;
    while (i < k) {
        rows[i].style = "background : lightyellow";
        i += 1;
    }
    rows[a].style = "background : blue";
}
function editPinsCancel() {
    CloseMenu();
}
function editPinsOK() {
    let i = 0;
    let pins = sheet.selectedObject.getPins();
    let k = pins.length;
    while (i < k) {
        setAttributeValue("pinlabel", pins[i], document.getElementById("p" + i + "_0").value);
        setAttributeValue("pinnumber", pins[i], document.getElementById("p" + i + "_1").value);
        let bt = document.getElementById("p" + i + "_2").value;
        setAttributeValue("pintype", pins[i], bt);
        if ((bt == "bus") || (bt == "BUS")) {
            pins[i].pintype = 1;
            setAttributeValue("pinnumber", pins[i], "0");
        }
        else
            pins[i].pintype = 0;
        setAttributeValue("pinseq", pins[i], document.getElementById("p" + i + "_3").value);
        let sig = document.getElementById("p" + i + "_4").value;
        pins[i].connectedSignal = sig;
        if ((sig != null) && (sig.length > 0)) {
            let p1 = new PointI(pins[i].xw, pins[i].yw);
            let p2 = pins[i].parent.morph2(p1);
            let ojs = sheet.getObjectsAt(pins[i].parent.x + p2.x, pins[i].parent.y + p2.y);
            let kk = ojs.length;
            //    report(document.getElementById("p" + i + "_0").value + " " + kk);
            let ii = 0;
            while (ii < kk) {
                if (ojs[ii].klass == "DNet") {
                    let nn = getAttributeValue("netname", ojs[ii]);
                    if (sig != nn) {
                        let b = true;
                        if ((nn.indexOf("N_") != 0) && (nn.length > 0)) {
                            b = confirm("Rename net " + nn + " to be " + sig + "?");
                        }
                        if (b) {
                            renameNetSegment(ojs[ii], nn, sig);
                        }
                    }
                }
                else {
                    if ((ojs[ii].klass == "DPin") && (getAttributeValue("device", ojs[ii].parent).indexOf("offsheet") != -1)) {
                        setAttributeValue("net", ojs[ii].parent, sig + ":1");
                        setAttributeValue("pinlabel", ojs[ii], sig);
                    }
                }
                ii += 1;
            }
        }
        i += 1;
    }
    CloseMenu();
    repaint();
}
function togglePinNumbers() {
    CloseMenu();
    let c = sheet.selectedObject;
    let pins = [];
    pins = c.getPins();
    let k = pins.length;
    let i = 0;
    let b = 1;
    while (i < k) {
        let p = pins[i];
        let pna = getAttribute("pinnumber", p);
        if (pna != null) {
            if (i == 0) {
                b = pna.visibility;
                if (b == 0)
                    b = 1;
                else
                    b = 0;
            }
            pna.visibility = b;
        }
        i += 1;
    }
    repaint();
}
let wxxx = null;
function generateBOM() {
    CloseMenu();
    let bm = null;
    if (!ipod) {
        wxxx = window.open("about:blank", "BOM", "status=1,toolbar=1,menubar=1,directories=1,resizable=yes,scrollbars=yes,height=480,width=360", "replace");
        if (wxxx != null) {
            wxxx.document.close();
            wxxx.document.open("text/plain");
            wxxx.document.title = "BOM";
            wxxx.document.write("<pre>\n");
            clearArray(BOMArray);
            bm = makeBOM();
            wxxx.document.write(bm);
            wxxx.document.write("</pre>\n");
            wxxx.document.close();
        }
    }
    else {
        clearArray(BOMArray);
        bm = makeBOM();
    }
    clearReport();
    report(bm);
    if (document.getElementById("epm").checked)
        viewPM();
}
function generateNetlist() {
    menu("NetlistOps");
}
function genNetlist() {
    if (document.getElementById("nl1").checked)
        generateGEDANetlist();
    else if (document.getElementById("nl2").checked)
        generateVHDL();
    else if (document.getElementById("nl3").checked)
        generatePADSNetlist();
    else if (document.getElementById("nl4").checked)
        generateKiCadNetlist();
    else if (document.getElementById("nl5").checked)
        generateSchematicHWModel();
    else if (document.getElementById("nl6").checked)
        saveSchematic();
    CloseMenu();
}

function generateKiCadNetlist() {
    CloseMenu();
    if (!ipod) {
        wxxx = window.open("about:blank", "Netlist", "status=1,toolbar=1,menubar=1,directories=1,resizable=yes,scrollbars=yes,height=480,width=360", "replace");
        if (wxxx != null) {
            wxxx.document.close();
            wxxx.document.open("text/plain");
            wxxx.document.title = "KiCad Netlist";
            wxxx.document.write("<pre>\n");
            wxxx.document.write(generateEESchemaNetList(ste.schematic.sheets));
            wxxx.document.write("</pre>\n");
            wxxx.document.close();
        }
    }
    clearReport();
    report(generateEESchemaNetList(ste.schematic.sheets));
}
function generatePADSNetlist() {
    CloseMenu();
    if (!ipod) {
        wxxx = window.open("about:blank", "Netlist", "status=1,toolbar=1,menubar=1,directories=1,resizable=yes,scrollbars=yes,height=480,width=360", "replace");
        if (wxxx != null) {
            wxxx.document.close();
            wxxx.document.open("text/plain");
            wxxx.document.title = "PADS Netlist";
            wxxx.document.write("<pre>\n");
            wxxx.document.write(generatePADSList(ste.schematic.sheets));
            wxxx.document.write("</pre>\n");
            wxxx.document.close();
        }
    }
    clearReport();
    report(generatePADSList(ste.schematic.sheets));
}
function generateGEDANetlist() {
    CloseMenu();
    if (!ipod) {
        wxxx = window.open("about:blank", "Netlist", "status=1,toolbar=1,menubar=1,directories=1,resizable=yes,scrollbars=yes,height=480,width=360", "replace");
        if (wxxx != null) {
            wxxx.document.close();
            wxxx.document.open("text/plain");
            wxxx.document.title = "gEDA Netlist";
            wxxx.document.write("<pre>\n");
            wxxx.document.write(generateGEDANetList(ste.schematic.sheets));
            wxxx.document.write("</pre>\n");
            wxxx.document.close();
        }
    }
    clearReport();
    report(generateGEDANetList(ste.schematic.sheets));
}
function generateVHDL() {
    CloseMenu();
    let compdefs = false;
    if (document.getElementById("vhdlcomps").checked)
        compdefs = true;
    let vhdl = new VHDL();
    if (!ipod) {
        wxxx = window.open("about:blank", "VHDL", "status=1,toolbar=1,menubar=1,directories=1,resizable=yes,scrollbars=yes,height=480,width=360", "replace");
        if (wxxx != null) {
            wxxx.document.close();
            wxxx.document.open("text/plain");
            wxxx.document.title = "VHDL";
            wxxx.document.write("<pre>\n");
            wxxx.document.write(vhdl.generateVHDL(ste, ste.schematic, compdefs));
            wxxx.document.write("</pre>\n");
            wxxx.document.close();
        }
    }
    clearReport();
    report(vhdl.generateVHDL(ste, ste.schematic, compdefs));
}
function generateSchematicHWModel() {
    CloseMenu();
    if (!ipod) {
        wxxx = window.open("about:blank", "HW Model", "status=1,toolbar=1,menubar=1,directories=1,resizable=yes,scrollbars=yes,height=480,width=360", "replace");
        if (wxxx != null) {
            wxxx.document.close();
            wxxx.document.open("text/javascript");
            wxxx.document.title = "HW Model";
            wxxx.document.write("<pre>\n");
            wxxx.document.write(makeHardwareModelofSchematic());
            wxxx.document.write("</pre>\n");
            wxxx.document.close();
        }
    }
    clearReport();
    let ss = sheet.selectedObject;
    let n = getAttributeValue("designname", sheet.getTitleSheet());
    reportfilename = n + ".js";
    report(makeHardwareModelofSchematic());
}
function viewWave() {
    CloseMenu();
    let n = saveModelProject();
    let u = eo_base0 + "WaveformViewer/WaveformViewer.htm?p=" + PROJECT_LIB + "&d=" + n + "&a=" + auth;
    //  let w = window.open(u, "Viewer", "status=1,toolbar=1,menubar=1,directories=1,resizable=yes,scrollbars=yes", "replace");
    wvwindow = window.open(u, "Viewer");
}
function viewLayout() {
    CloseMenu();
    let n = saveModelProject();
    //  alert(n);
    let u = eo_base0 + "Layout/Layout.htm?p=" + PROJECT_LIB + "&d=" + n + "&a=" + auth;
    report(u);
    laywindow = window.open(u, "Layout");
}
function viewPM() {
    CloseMenu();
    let n = getAttributeValue("partsserver", sheet.getTitleSheet());
    let u = eo_base0 + "Inventory/pm.htm?p=" + PROJECT_LIB + "&d=" + n + "&a=" + auth;
    pmwindow = window.open(u, "Parts");
    if (pmwindow != null) {
        setTimeout(viewPM2, 5000);
    }
}
function viewPM2() {
    if (pmwindow.initLoaded === undefined)
        report("PM initLoaded undefined");
    else if (pmwindow.initLoaded) {
        //  pmwindow.drawTable(pmwindow.BOMColumns, BOMArray, pmwindow.BOMWidths);
        pmwindow.SchematicWindow = window;
        pmwindow.SchematicBOM = BOMArray;
        pmwindow.Caption = getAttributeValue("designname", sheet.getTitleSheet());
        pmwindow.showSchematicBOM();
    }
}
function setNetPriority() {
    CloseMenu();
    let ss = sheet.selectedObject;
    let nn = getAttributeValue("netname", ss);
    let b = sheet.getPriorityRoute(nn);
    if (b) {
        if (confirm("Remove this net priority. " + nn))
            sheet.setPriorityRoute(nn, false);
    }
    else {
        if (confirm("Set this net priority. " + nn))
            sheet.setPriorityRoute(nn, true);
    }
}
function addWaveform() {
    CloseMenu();
    let n = sheet.selectedObject;
    if ((wvwindow != null) && (n.klass == "DNet")) {
        let name = getAttributeValue("netname", n);
        let wm = wvwindow.wm;
        if ((wm != null) && (name != null)) {
            let sg = wm.parent.getSignal(name);
            if (sg != null) {
                if (!wvwindow.isSignalDisplayed(sg))
                    wm.addSignal(sg);
                wvwindow.updateDisplay();
            }
        }
    }
}
function checkDesign() {
    let c = updateNetConnections();
    updateBuses();
    generateGEDANetList(ste.schematic.sheets);
    clearReport();
    let date = new Date();
    let sb = "Check Design    " + (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear().toString().substr(2, 2) + "\n\n";
    if ((typeof FailedLinks !== 'undefined') && (FailedLinks.length > 0)) {
        sb += "Failed to find and load the following symbols:\n";
        FailedLinks.forEach((link) => {
            sb += "\t" + link + "\n";
        });
        sb += "\n";
    }
    sb += "Net Checks:\n" + c + "\n";
    sb += nerr;
    neterrors += nerrcount;
    let bc = checkBus();
    sb += bc;
    if (neterrors == 0) {
        if (netwarnings == 0)
            sb += "Nets OK\n";
        else
            sb += "Nets have " + netwarnings + " warnings.\n";
    }
    else {
        sb += "Nets have " + neterrors + " errors.\n";
        if (netwarnings != 0)
            sb += "Nets have " + netwarnings + " warnings.\n";
    }
    let shts = ste.getSchematic().sheets;
    if (!ipod) {
        wxxx = window.open("about:blank", "_blank", "status=1,toolbar=1,menubar=1,scrollbars=yes,height=480,width=360");
        if (wxxx != null) {
            wxxx.document.close();
            wxxx.document.open("text/plain");
            wxxx.document.title = "Check Design";
            wxxx.document.write("<pre>\n");
            wxxx.document.write(sb);
            wxxx.document.write(doCheckSheet(shts));
            wxxx.document.write("</pre>\n");
            wxxx.document.close();
        }
    }
    repaint();
    clearReport();
    report(sb + doCheckSheet(shts));
    CloseMenu();
}
function openDocumentation() {
    CloseMenu();
    let ss = sheet.selectedObject;
    if ((ss != null) && (ss.klass == "DComponent")) {
        let u = getAttributeValue("documentation", ss);
        if (u != null)
            window.open(u, "Doc", "status=1,toolbar=1,menubar=1,resizable=yes,scrollbars=yes");
    }
}
function saveSheetPreview() {
    CloseMenu();
    if (!ipod) {
        wxxx = window.open("about:blank", "Save Preview", "status=1,toolbar=1,menubar=1,resizable=yes,scrollbars=yes,height=480,width=360");
        if (wxxx != null) {
            wxxx.document.close();
            wxxx.document.open("text/plain");
            wxxx.document.write("<pre>\n");
            wxxx.document.write(sheet.getData());
            wxxx.document.write("</pre>\n");
            wxxx.document.close();
        }
    }
    clearReport();
    report(sheet.getData());
}
//TODO
function saveSelectedSymbol() {
    CloseMenu();
    let ss = sheet.selectedObject;
    if ((ss != null) && (ss.klass == "DComponent")) {
        if (!ipod) {
            wxxx = window.open("about:blank", "Save Preview", "status=1,toolbar=1,menubar=1,directories=1,resizable=yes,scrollbars=yes,height=480,width=360");
            if (wxxx != null) {
                wxxx.document.close();
                wxxx.document.open("text/plain");
                wxxx.document.write("<pre>\n");
                wxxx.document.write(ss.saveSymbolData());
                wxxx.document.write("</pre>\n");
                wxxx.document.close();
            }
        }
        clearReport();
        report(ss.saveSymbolData());
    }
}
function saveSymbol() {
    CloseMenu();
    let ss = sheet.selectedObject;
    if ((ss != null) && (ss.klass == "DComponent")) {
        let name = ss.filename;
        if (name == null)
            name = getAttributeValue("device", ss);
        let n = name.lastIndexOf("/");
        if (n != -1)
            name = name.substring(n + 1);
        let fn = prompt("Enter symbol file name (.sym or .json)", name);
        if ((fn != null) || (fn != "")) {
            if(fn.indexOf(".json") != -1)
            {
              let d = ss.getDataJ();
              saveFile(fn, JSON.stringify(d, null, 4));
            }
            else
            {
              if (fn.indexOf(".sym") == -1)
                fn += ".sym";
              ss.filename = fn;
              if (fn.indexOf(".sym") != -1)
              {
                saveFile(fn, ss.saveSymbolData());
              }
            }
        }
    }
}
function saveSelectedSymbolLocal() {
    CloseMenu();
    let ss = sheet.selectedObject;
    if ((ss != null) && (ss.klass == "DComponent")) {
        let name = ss.filename;
        if (name == null)
            name = getAttributeValue("device", ss);
        let n = name.lastIndexOf("/");
        if (n != -1)
            name = name.substring(n + 1);
        let fn = prompt("Enter symbol file name (.sym)", name);
        if ((fn != null) && (fn != "")) {
            if (fn.indexOf(".sym") == -1)
                fn += ".sym";
            ss.filename = fn;
            localStorage.setItem(fn, ss.saveSymbolData());
        }
    }
}
function saveSheetLocal() {
    CloseMenu();
    let x = document.getElementById("sheets").selectedIndex + 1;
    let n = getAttributeValue("designname", sheet.getTitleSheet()) + "_" + x + ".sch";
    let fn = prompt("Enter schematic file name (.sch)", n);
    if ((fn != null) || (fn != "")) {
        if (fn.indexOf(".sch") == -1)
            fn += ".sch";
        localStorage.setItem(fn, sheet.getData());
    }
}
function saveSheet() {
    CloseMenu();
    let x = document.getElementById("sheets").selectedIndex + 1;
    let n = getAttributeValue("designname", sheet.getTitleSheet()) + "_" + x + ".sch";
    let fn = prompt("Enter schematic file name (.sch)", n);
    if ((fn != null) || (fn != "")) {
        if (fn.indexOf(".sch") == -1)
            fn += ".sch";
        saveFile(fn, sheet.getData());
    }
}
function emailSymbol() {
    CloseMenu();
    let ss = sheet.selectedObject;
    if (ss != null) {
        let fn = prompt("Enter symbol file name", ss.filename);
        if ((fn != null) || (fn != "")) {
            ss.filename = fn;
            let email = ('me@myemail');
            let subject = ('Schematic Symbol = ' + fn);
            let cc = ('');
            let bcc = ('');
            let body = encodeURI(ss.saveSymbolData());
            window.location = "mailto:" + email + '?subject=' + subject + '&cc=' + cc + '&bcc=' + bcc + '&body=' + body;
        }
    }
}
function emailSheet() {
    CloseMenu();
    let n = getAttributeValue("designname", sheet.getTitleSheet()) + "_1.sch";
    let fn = prompt("Enter sheet file name", n);
    if ((fn != null) || (fn != "")) {
        let email = ('me@myemail');
        let subject = ('Schematic Sheet = ' + fn);
        let cc = ('');
        let bcc = ('');
        let body = encodeURI(sheet.getData());
        window.location = "mailto:" + email + '?subject=' + subject + '&cc=' + cc + '&bcc=' + bcc + '&body=' + body;
    }
}
function saveSelectedSymbolProject() {
    let ss = sheet.selectedObject;
    if (ss != null) {
        let fnm = ss.filename;
        report(":" + fnm);
        if (fnm == null) {
            fnm = prompt("Enter symbol file name (.sym) for " + getAttributeValue("refdes", dojs[ii]) + ":" + getAttributeValue("device", dojs[ii]));
        }
        if ((fnm != null) && (fnm != "")) {
            if (fnm.indexOf(".sym") == -1)
                fn += ".sym";
            if (PROJECT_LIB == "LOCAL") {
                let sym = localStorage.getItem(fnm);
                if (sym == null) {
                    localStorage.setItem(fnm, ss.saveSymbolData());
                    report("saved local: " + fnm);
                }
            }
            else {
                clearReport();
                clearArray(SaveQueueSheets);
                clearArray(SaveQueueComponents);
                clearArray(SaveModels);
                SaveQueueSheetIndex = 0;
                SaveQueueComponentIndex = 0;
                SaveModelIndex = 0;
                SaveQueueComponents[SaveQueueComponents.length] = ss;
                nextSaveItem();
            }
        }
    }
    CloseMenu();
}
function deleteItem() {
    let b = false;
    if (sheet.selectbox != null) {
        let vd = sheet.getObjectsInArea(sheet.selectbox);
        let k = vd.length;
        let s = confirm("Are you sure you want to delete the group of \n" + k + " items?");
        if (s) {
            b = true;
            let dc = new DeleteGroupCommand(vd);
            stack.add(dc);
            dc.execute();
            repaint();
        }
    }
    else if (sheet.selectedObject != null) {
        let s = confirm("Are you sure you want to delete this\n" + sheet.selectedObject.klass + "?");
        if (s) {
            let dc = new DeleteCommand(sheet.selectedObject);
            stack.add(dc);
            dc.execute();
            repaint();
        }
    }
    CloseMenu();
}
function editComponent() {
    CloseMenu();
    let x = 0;
    let o = sheet.selectedObject;
    if (o != null) {
        menu("Cedit");
        document.getElementById("ceditx").value = o.getX();
        document.getElementById("cedity").value = o.getY();
        if ((o.klass == "DLine") || (o.klass == "DNet") || (o.klass == "DBus")) {
            document.getElementById("ceditx2").value = o.x2;
            document.getElementById("cedity2").value = o.y2;
        }
        else if (o.klass == "DCircle") {
            document.getElementById("ceditx2").value = o.radius;
            document.getElementById("cedity2").value = "";
            if (o.filltype == 1)
                x = 1;
        }
        else if (o.klass == "DBox") {
            document.getElementById("ceditx2").value = o.boxwidth;
            document.getElementById("cedity2").value = o.boxheight;
            if (o.filltype == 1)
                x = 1;
        }
        else if (o.klass == "DPath") {
            if (o.filltype == 1)
                x = 1;
        }
        else if (o.klass == "DText") {
            //document.getElementById("ceditx2").value = o.show_name_value;
            document.getElementById("ceditx2").value = o.size;
            document.getElementById("cedity2").value = o.lines[0];
        }
        else if (o.klass == "DPin") {
            document.getElementById("ceditx2").value = o.whichend;
            document.getElementById("cedity2").value = o.pintype;
        }
        else if (o.klass == "DPicture") {
            document.getElementById("ceditx2").value = o.width;
            document.getElementById("cedity2").value = o.height;
            document.getElementById("ceditf").value = o.src;
        }
        else {
            document.getElementById("ceditx2").value = "";
            document.getElementById("cedity2").value = "";
        }
        if (o.klass == "DComponent") {
            document.getElementById("ceditf").value = o.filename;
//            let a = getAttribute("device", o);
//            report("3650 " + o.x + " " + a.x + " " + a.parent.x);
        }
        document.getElementById("fillselect").selectedIndex = x;
    }
    else {
        if (sheet.state == STATE_IDLE) {
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            xfmX = 0;
            xfmY = 0;
            de.setInverseZoom(10);
            repaint();
        }
    }
}
function ceditOK() {
    let o = sheet.selectedObject;
    let k = document.getElementById("fillselect").selectedIndex;
    if (o != null) {
        menu("Cedit");
        o.setX(Number(document.getElementById("ceditx").value));
        o.setY(Number(document.getElementById("cedity").value));
        if ((o.klass == "DLine") || (o.klass == "DNet") || (o.klass == "DBus")) {
            o.setX2(Number(document.getElementById("ceditx2").value));
            o.setY2(Number(document.getElementById("cedity2").value));
            o.update();
        }
        else if (o.klass == "DCircle") {
            o.radius = Number(document.getElementById("ceditx2").value);
            o.filltype = k;
            o.update();
        }
        else if (o.klass == "DBox") {
            o.boxwidth = Number(document.getElementById("ceditx2").value);
            o.boxheight = Number(document.getElementById("cedity2").value);
            o.filltype = k;
            o.update();
        }
        else if (o.klass == "DPath") {
            o.filltype = k;
            o.update();
        }
        else if (o.klass == "DText") {
            //o.show_name_value = document.getElementById("ceditx2").value;
            o.size = document.getElementById("ceditx2").value;
            o.lines[0] = document.getElementById("cedity2").value;
        }
        else if (o.klass == "DPin") {
            o.whichend = document.getElementById("ceditx2").value;
            o.pintype = document.getElementById("cedity2").value;
            if (o.pintype == 1)
                setAttributeValue("pintype", o, "bus");
        }
        else if (o.klass == "DPicture") {
            o.width = Number(document.getElementById("ceditx2").value);
            o.height = Number(document.getElementById("cedity2").value);
            o.src = document.getElementById("ceditf").value;
        }
        if (o.klass == "DComponent") {
            o.filename = document.getElementById("ceditf").value;
        }
        else {
        }
    }
    CloseMenu();
    repaint();
}
function compMenu(n) {
    CloseMenu();
    if (n == 4) {
        menu("CompSel");
        let k = sheet.DrawingObjects.length;
        let i = 0;
        let ss = document.getElementById("objs");
        i = ss.children.length - 1;
        while (i >= 0) {
            ss.remove(i);
            i -= 1;
        }
        i = 0;
        while (i < k) {
            let p = sheet.DrawingObjects[i];
            if (p.klass != "DNet") {
                let op = document.createElement("option");
                if (p.klass == "DComponent")
                    op.text = getAttributeValue("refdes", p) + ": " + getAttributeValue("device", p) + " " + p.getX() + " " + p.getY();
                else
                    op.text = p.klass + " " + p.getX() + " " + p.getY();
                ss.add(op);
            }
            i += 1;
        }
        repaint();
    }
    else if (n == 5) {
        menu("NetSel");
        let k = sheet.DrawingObjects.length;
        let i = 0;
        let ss = document.getElementById("netobjs");
        i = ss.children.length - 1;
        while (i >= 0) {
            ss.remove(i);
            i -= 1;
        }
        i = 0;
        while (i < k) {
            let p = sheet.DrawingObjects[i];
            if (p.klass == "DNet") {
                let op = document.createElement("option");
                op.text = getAttributeValue("netname", p) + ": " + p.x1 + " " + p.y1 + "; " + p.x2 + " " + p.y2;
                ss.add(op);
            }
            else if (p.klass == "DBus") {
                let op = document.createElement("option");
                op.text = "Bus " + getAttributeValue("busname", p) + ": " + p.x1 + " " + p.y1 + "; " + p.x2 + " " + p.y2;
                ss.add(op);
            }
            i += 1;
        }
        repaint();
    }
}
function selByRef() {
    let s = document.getElementById("selbyref").value;
    if (s != "") {
        let b = true;
        let k = sheet.DrawingObjects.length;
        let i = 0;
        while (b && (i < k)) {
            let o = sheet.DrawingObjects[i];
            if (o.klass == "DComponent") {
                if (s == getAttributeValue("refdes", o)) {
                    b = false;
                    sheet.selectedObject = o;
                }
            }
            i += 1;
        }
    }
    CloseMenu();
    repaint();
    menu("CompPopup");
}
function selObject() {
    let ss = document.getElementById("objs");
    let s = ss.selectedIndex;
    let k = sheet.DrawingObjects.length;
    let i = 0;
    let j = -1;
    while ((j != s) && (i < k)) {
        if (sheet.DrawingObjects[i].klass != "DNet") {
            j += 1;
        }
        i += 1;
    }
    if (j == s)
        sheet.selectedObject = sheet.DrawingObjects[i - 1];
    let z = sheet.selectedObject;
    CloseMenu();
    repaint();
}
function highlightNet() {
    let ss = document.getElementById("NetHigh");
    if (ss.value != "") {
        highlightNetByName(ss.value);
    }
    CloseMenu();
}
function highligtSelectedNet() {
    let z = sheet.selectedObject;
    let s = getAttributeValue("netname", z);
    highlightNetByName(s);
    CloseMenu();
}
function highlightNetByName(s) {
    sheet.DrawingObjects.forEach((n) => {
        if ((n.klass == "DNet") && (s == getAttributeValue("netname", n))) {
            n.selectBox = n.makeSelectBox();
            n.selectBox.paint(ctx, de.getColor(BOUNDINGBOX_COLOR), de.getInverseZoom());
        }
    });
}
function selNet() {
    let ss = document.getElementById("netobjs");
    let s = ss.selectedIndex;
    let k = sheet.DrawingObjects.length;
    let i = 0;
    let j = -1;
    while ((j != s) && (i < k)) {
        if ((sheet.DrawingObjects[i].klass == "DNet") || (sheet.DrawingObjects[i].klass == "DBus")) {
            j += 1;
        }
        i += 1;
    }
    if (j == s)
        sheet.selectedObject = sheet.DrawingObjects[i - 1];
    CloseMenu();
    repaint();
}
function updateLibrariesList() {
    clearList(LIBRARY_LIST);
    let i = 0;
    let ss = document.getElementById("lib");
    i = ss.children.length - 1;
    while (i >= 0) {
        ss.remove(i);
        i -= 1;
    }
    let op = document.createElement("option");
    op.text = "Built-in Generic Symbols";
    ss.add(op);
    op = document.createElement("option");
    op.text = "Built-in Connector Symbols";
    ss.add(op);
    op = document.createElement("option");
    op.text = "Built-in Logic/Sim Symbols";
    ss.add(op);
    op = document.createElement("option");
    op.text = "Local";
    ss.add(op);
    /*
    op = document.createElement("option");
    op.text = "eightolives Symbols";
    ss.add(op);
    op = document.createElement("option");
    op.text = "eightolives Simulation";
    ss.add(op);
    op = document.createElement("option");
    op.text = "eightolives Parts";
    ss.add(op);
    */
    let k = LIBRARIES_LOADED.length;
    //  report("3903 " + JSON.stringify(LIBRARIES_LOADED, null, 4));
    i = 0;
    for (i = 0; i < k; i++) {
        let e = LIBRARIES_LOADED[i];
        op = document.createElement("option");
        op.text = e.description;
        ss.add(op);
    }
    fixedlibraries = 4;
    /*
     if(PROJECT_LIB == "LOCAL")
     {
       SymbolListDest = "lib";
       if(service != null) service.getLibrariesList(eo_base);
    
     }
     */
    /*
     if(service != null)
     {
   //    SymbolListDest = "lib";
       let p = service.getLibrariesList(PROJECT_LIB);
       p.then(function(data){
           let d = decodeSymbolList(data, "a.rss");
           LIBRARY_LIST = d;
   //        showList(d, "lib");
           let k = d.length;
           i = 0;
           for(i = 0; i < k; i++)
           {
             let op = document.createElement("option");
             op.text = lis[i].title;
             ss.add(op);
           }
         }).catch(function(error){
           report("getLibrariesList " + PROJECT_LIB + " " + error);
           let p2 = service.getLibrariesList(eo_base);
           p2.then(function(data){
             let d = decodeSymbolList(data, "a.rss");
             LIBRARY_LIST = d;
             showList(d, "lib");
             }).catch(function(error){
             report("getLibrariesList " + PROJECT_LIB + " " + error);
             });
         });
     }
     */
}

function addProjectLibraries() {
    if (service != null) {
        let p = service.getProjectLibrariesList(PROJECT_LIB);
        p.then(function (data) {
            LIBRARIES_LOADED = [];
            let d = data.libraries; //decodeSymbolList(data, "a.rss");
            let k = d.length;
            let i = 0;
            for (i = 0; i < k; i++) {
                LIBRARIES_LOADED.push(d[i]);
                //          report("3966 " + JSON.stringify(d[i], null, 4));
            }
            updateLibrariesList();
        }).catch(function (error) {
            report("addProjectLibraries " + PROJECT_LIB + " " + error);
        });
    }
}

function initializeLIBRARIES() {
}

function complibChange() {
    document.getElementById("desc").value = "";
    //SymbolListDest = "symb";
    let i = 0;
    let ss = document.getElementById("objs");
    i = ss.children.length - 1;
    while (i >= 0) {
        ss.remove(i);
        i -= 1;
    }
    let sl = document.getElementById("lib");
    let s = sl.selectedIndex;
    {
        SELECTED_LIBRARY_INDEX = s;
        let bk = false;
        if (s - fixedlibraries >= 0)
            bk = (typeof LIBRARIES_LOADED[s - fixedlibraries].parser !== 'undefined');
        let link = null;
        if ((s >= fixedlibraries) && !bk) {
            let ql = LIBRARIES_LOADED[s - fixedlibraries].link;
            if (typeof ql === 'undefined')
                ql = "";
            if (ql.indexOf("http") != -1) {
                report("complibchange case 1");
                link = ql;
            }
            else if (ql == "PROJECT_LIB") {
                report("complibchange case 2 " + s + " " + ql + " " + PROJECT_LIB);
                if (PROJECT_LIB == "LOCAL")
                    s = 1;
                //      else link = PROJECT_LIB;
                else
                    link = ql;
            }
            else if (ql.indexOf("PROJECT_LIB") == 0) {
                report("complibchange case 3");
                link = PROJECT_LIB + ql;
            }
            else if (((LIBRARIES_LOADED[s - fixedlibraries].title.indexOf("eightolives") != -1) && (s != -1)) || (PROJECT_LIB == "LOCAL")) {
                report("complibchange case 4");
                //       link = eo_symbol_base + ql;
                link = serviceServer.baseURL + ql;
            }
            else if (document.getElementById("pr3").checked) {
                report("complibchange case 5");
                link = service.baseURL + ql;
                //      link = PROJECT_LIB + ql;
            }
            else {
                report("complibchange case 6");
                link = eo_symbol_base + ql;
                //     link = PROJECT_LIB + ql;
            }
        }
        clearList(COMP_LIST);
        report("3998 " + s + " " + link);
        if (s == 3) {
            let d = decodeLocalSymbolList();
            COMP_LIST = d;
            showList(d, "symb");
        }
        else if (s == 1) {
            link = null;
            let d = decodeSymbolList(eo_connectors, link);
            COMP_LIST = d;
            showList(d, "symb");
        }
        else if (s == 0) {
            link = null;
            let d = decodeSymbolList(eo_symbols, link);
            COMP_LIST = d;
            showList(d, "symb");
        }
        else if (s == 2) {
            link = null;
            let d = decodeSymbolList(eo_sim, link);
            COMP_LIST = d;
            showList(d, "symb");
        }
        else if (link != null) {
            report("3983 link = " + link);
            let p = getData(link); //getLibraryList(link, PROJECT_LIB, s);
            p.then(function (data) {
                let d = decodeSymbolList(data, link);
                COMP_LIST = d;
                showList(d, "symb");
            }).catch(function (error) {
                report(error);
            });
        }
        else {
            let i = s - fixedlibraries;
            report("4078 i = " + i + ", " + LIBRARIES_LOADED.length);
            COMP_LIST = LIBRARIES_LOADED[i].parser.getSymbolList();
            showList(COMP_LIST, "symb");
        }
    }
}
function deleteLocal() {
    if (document.getElementById("lib").selectedIndex == 1) // localStorage
     {
        let x = document.getElementById("symb").selectedIndex;
        if (x != -1) {
            if (confirm("Do you want to delete the selected item from local storage?")) {
                localStorage.removeItem(localStorage.key(x));
                clearList(PROJECT_FILE_LIST);
                CloseMenu();
            }
        }
    }
}
function deleteLocal2() {
    if (document.getElementById("pr1").checked) {
        let x = document.getElementById("pfilelist").selectedIndex;
        if (x != -1) {
            if (confirm("Do you want to delete the selected item from local storage?")) {
                localStorage.removeItem(localStorage.key(x));
                clearList(PROJECT_FILE_LIST);
                CloseMenu();
            }
        }
    }
}
function clearList(lis) {
    let k = lis.length;
    if (k > 0) {
        lis.splice(0, k);
    }
}
function showList(lis, wher) {
    sheet.selectedObject = null;
    sheet.mc = null;
    clearOptions(wher);
    let k = lis.length;
    report("showList length = " + k);
    let i = 0;
    let ss = document.getElementById(wher);
    if (wher == "lib") {
        let op = document.createElement("option");
        op.text = "Built-in Generic Symbols";
        ss.add(op);
        op = document.createElement("option");
        op.text = "Built-in Connector Symbols";
        ss.add(op);
        op = document.createElement("option");
        op.text = "Built-in Logic/Sim Symbols";
        ss.add(op);
        op = document.createElement("option");
        op.text = "Local";
        ss.add(op);
    }
    for (i = 0; i < k; i++) {
        let op = document.createElement("option");
        op.text = lis[i].title;
        ss.add(op);
    }
}
function clearOptions(id) {
    let ss = document.getElementById(id);
    let i = ss.children.length - 1;
    while (i >= 0) {
        ss.remove(i);
        i -= 1;
    }
}
function group() {
    CloseMenu();
    sheet.setState(STATE_GROUP);
}
function makeSymbolGroup() {
    CloseMenu();
    let vd = sheet.getObjectsInArea(sheet.selectbox);
    displayStatus("Group contains " + vd.length + " objects");
    report("SchematicSheet objects in area = " + vd.length);
    sheet.substate = 0;
    if (vd.length > 0) {
        let refdes = prompt("Enter refdes:", "U?");
        if ((refdes != null) && (!(refdes == ""))) {
            let device = prompt("Enter device:", "New_Device_Name");
            if ((device != null) && (!(device == ""))) {
                let dcomp = makeSymbolFromGroup(sheet.de, vd, sheet.selectbox.getX(), sheet.selectbox.getY(), device, refdes);
                if (dcomp != null) {
                    let ad = new AddDrawingObjectCommand(sheet, dcomp);
                    ad.execute();
                    stack.add(ad);
                }
            }
        }
    }
    sheet.selectbox = null;
    repaint();
}
function ungroupSelected() {
    let d = sheet.selectedObject;
    if ((d != null) && (d.klass == "DComponent")) {
        if (confirm("Ungroup the selected component:\n" + getAttributeValue("refdes", d) + ":" + getAttributeValue("device", d))) {
            ungroup(sheet, d);
        }
    }
    CloseMenu();
}
function compSelect() {
    let ss = document.getElementById("symb");
    let d = document.getElementById("desc");
    let s = ss.selectedIndex;
    if (typeof COMP_LIST[s].description !== 'undefined') {
        d.value = COMP_LIST[s].description;
    }
}
function symbSearch() {
    let phrase = document.getElementById("symbsearch").value;
    if ((phrase != "") && (phrase.length > 2)) {
        let r = [];
        let b = false;
        let i = 0;
        let k = COMP_LIST.length;
        for (i = 0; i < k; i++) {
            let j = COMP_LIST[i].title.indexOf(phrase);
            if (j != -1)
                r.push(COMP_LIST[i]);
            else {
                j = COMP_LIST[i].description.indexOf(phrase);
                if (j != -1)
                    r.push(COMP_LIST[i]);
            }
        }
        if (r.length > 0) {
            showList(r, "symb");
            COMP_LIST = r;
        }
    }
}
function getSymb() {
    let ss = document.getElementById("symb");
    let s = ss.selectedIndex;
    let c = document.getElementById("lib").selectedIndex;
    report("4244 c = " + c + " fixedlibraries = " + fixedlibraries);
    CloseMenu();
    if (s != -1) {
        if (c == 3) {
            if (PROJECT_LIB == "LOCAL") // localStorage
             {
                getLocalSymbol(COMP_LIST[s].title);
            }
            else {
            }
        }
        if (c == 3) // localStorage
         {
            getLocalSymbol(COMP_LIST[s].title);
        }
        else if (c == 0) {
            getBuiltInSymbol(COMP_LIST[s].link);
        }
        else if (c == 1) {
            getBuiltInSymbol(COMP_LIST[s].link);
        }
        else if (c == 2) {
            getBuiltInSymbol(COMP_LIST[s].link);
        }
        else if ((c >= fixedlibraries) && (typeof COMP_LIST[s].lp != 'undefined')) {
            let name = COMP_LIST[s].title;
            let lp = COMP_LIST[s].lp;
            if (typeof LIBRARIES_LOADED[c - fixedlibraries].parser.getSymbolP !== 'undefined') {
                clearReport();
                LIBRARIES_LOADED[c - fixedlibraries].parser.getSymbolP(name, lp).then(function (d) {
                    sheet.selectedObject = d;
                    sheet.setState(STATE_PLACING);
                }); /*.catch(function(e) {
                    report("4284 " + e);
                }); */
            }
            else {
                let d = LIBRARIES_LOADED[c - fixedlibraries].parser.getSymbol(name, lp);
                sheet.selectedObject = d;
                sheet.setState(STATE_PLACING);
            }
        }
        else {
            report("4292 c = " + c + " s = " + s + " " + fixedlibraries + " " + LIBRARIES_LOADED.length);
            let link = COMP_LIST[s].link;
            report("4294 " + COMP_LIST[s].title + " " + COMP_LIST[s].link + " " + JSON.stringify(COMP_LIST[s], null, 4));
            let ll = LIBRARIES_LOADED[c - fixedlibraries].link;
            if (ll.indexOf("PROJECT_LIB") != -1) {
                link = PROJECT_LIB + link;
            }
            else if (link.indexOf("https") == 0)
                ;
            else //if(link.indexOf("http") != 0) 
             {
                ll = ll.substring(0, ll.lastIndexOf("/"));
                let g = link.substring(link.lastIndexOf("/"));
                report("-" + eo_symbol_base + " " + ll + " " + g);
                link = eo_symbol_base + ll + g;
            }
//            service.getSymbol(link);
            getData(link).then( (s) => {
              processFileData(link, s);
            }).catch( (e) => {
                report("4208 " + e);
            });
        }
    }
}
function connSymbol() {
    let pins = document.getElementById("cpins").value;
    let ref = document.getElementById("crefdes").value;
    let d = 0;
    if (document.getElementById("p1").checked)
        d = 0;
    else if (document.getElementById("p2").checked)
        d = 1;
    else
        d = 2;
    if (document.getElementById("chead").checked) {
        let s = makeDualRowHeader(sheet.de, pins, d, ref);
        sheet.selectedObject = s;
        sheet.setState(STATE_PLACING);
    }
    else {
        let s = makeConnector(sheet.de, pins, d, ref);
        sheet.selectedObject = s;
        sheet.setState(STATE_PLACING);
    }
    CloseMenu();
    document.getElementById("crefdes").value = "J?";
}
function blockSymbol() {
    let refdes = document.getElementById("brefdes").value;
    let device = document.getElementById("bname").value;
    let NumPinsLeft = Number(document.getElementById("bleft").value);
    let NumPinsRight = Number(document.getElementById("bright").value);
    let NumPinsTop = Number(document.getElementById("btop").value);
    let NumPinsBottom = Number(document.getElementById("bbottom").value);
    let start = Number(document.getElementById("bstart").value);
    let minWidth = Number(document.getElementById("bwidth").value);
    let minHeight = Number(document.getElementById("bheight").value);
    let spacing = 200;
    if (document.getElementById("halfsize").checked)
        spacing = 100;
    let Reverse = true;
    let s = makeBlockSymbol(sheet.de, NumPinsLeft, NumPinsRight, Reverse, NumPinsTop, NumPinsBottom, minWidth, minHeight, refdes, device, spacing, start);
    sheet.selectedObject = s;
    sheet.setState(STATE_PLACING);
    CloseMenu();
}
function addNetToPin() {
    ptype = 0;
    getPinDisplay();
}
function getPinDisplay() {
    CloseMenu();
    menu("PinSel");
    let pins = sheet.selectedObject.getPins();
    let k = pins.length;
    let i = 0;
    let ss = document.getElementById("pinzsel");
    i = ss.children.length - 1;
    while (i >= 0) {
        ss.remove(i);
        i -= 1;
    }
    i = 0;
    while (i < k) {
        let p = pins[i];
        let op = document.createElement("option");
        op.text = getAttributeValue("pinnumber", p) + ": " + getAttributeValue("pinlabel", p);
        ss.add(op);
        i += 1;
    }
    repaint();
}
function movePinLabel() {
    CloseMenu();
    let p = sheet.selectedObject;
    let lbl = getAttribute("pinlabel", p);
    lbl.parent = p.parent;
    sheet.selectedObject = lbl;
    sheet.setState(STATE_MOVE);
}
function movePinNumber() {
    CloseMenu();
    let p = sheet.selectedObject;
    let lbl = getAttribute("pinnumber", p);
    lbl.parent = p.parent;
    sheet.selectedObject = lbl;
    sheet.setState(STATE_MOVE);
}
function movePin() {
    CloseMenu();
    let p = sheet.selectedObject;
    //  let lbl = getAttribute("pinnumber", p);
    //  lbl.parent = p.parent;
    //  sheet.selectedObject = lbl;
    report("4755 " + p.getX() + " " + p.getY() + ",  " + p.parent.getX() + " " + p.parent.getY());
    sheet.setState(STATE_MOVE);
}
function moveDevice() {
    CloseMenu();
    let p = sheet.selectedObject;
    let lbl = getAttribute("device", p);
    lbl.parent = p;
    sheet.selectedObject = lbl;
    sheet.setState(STATE_MOVE);
}
function selPin() {
    let ss = document.getElementById("pinzsel");
    let s = ss.selectedIndex;
    let pins = sheet.selectedObject.getPins();
    let p = pins[s];
    sheet.selectedObject = p;
    CloseMenu();
    if (ptype == 0) {
        sheet.setState(STATE_NET);
        addNetPin(p);
    }
    else if (ptype == 1) {
        addNetStub();
    }
    else if (ptype == 2) {
        menu("PPopup");
    }
    repaint();
}
function addStubToPin() {
    ptype = 1;
    getPinDisplay();
}
function selectPin() {
    ptype = 2;
    getPinDisplay();
}
function addStubsAll() {
    if (confirm("Add Net Stubs to all pins of the selected component?")) {
        let pins = sheet.selectedObject.getPins();
        let k = pins.length;
        report("4406 addStubsAll on " + k + "pins");
        let i = 0;
        while (i < k) {
            sheet.selectedObject = pins[i];
            let oj = sheet.getObjectsAt(Number(pins[i].parent.x) + Number(pins[i].xw), Number(pins[i].parent.y) + Number(pins[i].yw));
            //  report("stubs " + oj.length + " " + Number(pins[i].parent.x) + Number(pins[i].xw) + " " +  Number(pins[i].parent.y) + Number(pins[i].yw));
            if (oj.length == 1)
                addNetStub();
            else
                report("4414 pin has oj.length = " + oj.length);
            i += 1;
        }
    }
    CloseMenu();
    repaint();
}
function addNetStub() {
    CloseMenu();
    let pin = sheet.selectedObject;
    let sig = pin.connectedSignal;
    let pt = getAttributeValue("pintype", pin);
    let s = 0;
    let sg = 0;
    let idx = 0; //
    let tb = false;
    let top = false;
    let oo = 0; // 0=left, 2=right; 4= top; 6 = bottom
    let flipped = pin.parent.mirror;
    let ang = pin.parent.angle;
    let inpoint = true;
    if ((pt != "in") && (pt != "pas") && (pt != "pwr") && (pt != "clk"))
        inpoint = false;
    if (pin.y1 == pin.y2) {
        if (pin.x1 == pin.xw)
            oo = 0; // left side
        else
            oo = 2; // right side
    }
    else {
        if ((pin.yw > pin.y1) || (pin.yw > pin.y2))
            top = true;
        if (top)
            oo = 4; // top side
        else
            oo = 6; // bottom
    }
    if (ang == 90)
        oo += 8;
    else if (ang == 180)
        oo += 16;
    else if (ang == 270)
        oo += 24;
    if (!inpoint)
        oo += 1;
    if (flipped)
        oo += 32;
    // flipped(32), ang, side, i/o
    let symbol = [
        0, 3, 1, 2, 1, 2, 1, 2, // 0
        1, 2, 1, 2, 1, 2, 0, 3, // 90
        1, 2, 0, 3, 1, 2, 1, 2, // 180
        1, 2, 1, 2, 0, 3, 1, 2, //270
        1, 2, 0, 3, 1, 2, 1, 2, // flipped 0
        1, 2, 1, 2, 1, 2, 0, 3, // flipped 90
        0, 3, 1, 2, 1, 2, 1, 2, // flipped 180
        1, 2, 1, 2, 0, 3, 1, 2
    ]; // flipped 270
    let a = [
        0, 0, 0, 0, 270, 270, 90, 90,
        270, 270, 90, 90, 0, 0, 0, 0,
        0, 0, 0, 0, 90, 90, 270, 270,
        90, 90, 270, 270, 0, 0, 0, 0,
        0, 0, 0, 0, 270, 270, 90, 90,
        90, 90, 270, 270, 0, 0, 0, 0,
        0, 0, 0, 0, 90, 90, 270, 270,
        270, 270, 90, 90, 0, 0, 0, 0
    ];
    s = symbol[oo];
    let sb = ["eo_offsheetin", "eo_offsheetinb", "eo_offsheetout", "eo_offsheetoutb"];
    let sr = [eo_offsheetin, eo_offsheetinb, eo_offsheetout, eo_offsheetoutb];
    let fp = new FileParser(sb[s] + ".sym");
    let d = fp.parse1(sr[s]);
    //  report(sg + " " + sb[oo] + " " + tb);
    if (a[oo] == 0) {
        if ((s == 0) || (s == 3))
            d.x = +Number(pin.xw) + Number(pin.parent.x) - 300;
        else
            d.x = Number(pin.xw) + Number(pin.parent.x);
        d.y = Number(pin.yw) + Number(pin.parent.y);
        p1 = new PointI(Number(pin.xw), Number(pin.yw));
        p2 = pin.parent.morph2(p1); // OK
        d.x = p2.x + Number(pin.parent.x);
        if ((s == 0) || (s == 3))
            d.x -= 300;
        d.y = p2.y + Number(pin.parent.y);
    }
    else {
        if ((s == 0) || (s == 3))
            d.x = Number(pin.xw) + Number(pin.parent.x);
        else
            d.x = +Number(pin.xw) + Number(pin.parent.x);
        d.y = Number(pin.yw) + Number(pin.parent.y);
        p1 = new PointI(Number(pin.xw), Number(pin.yw));
        p2 = pin.parent.morph2(p1); // OK
        d.x = p2.x + Number(pin.parent.x);
        d.y = p2.y + Number(pin.parent.y);
    }
    d.setAngle(a[oo]);
    //  report(pin.parent.x + " " + pin.parent.y + " " + p2.x + " " + p2.y + " " + pin.xw + " " + pin.yw + " s" + s + " a" + a + " " + tb + " ang=" + ang);
    if ((sig != null) && (sig.length > 0)) {
        setAttributeValue("net", d, sig + ":1");
        let ps = d.getPins();
        setAttributeValue("pinlabel", ps[0], sig);
    }
    let ad = new AddDrawingObjectCommand(sheet, d);
    ad.execute();
    stack.add(ad);
    repaint();
}
function editBusSize() {
    CloseMenu();
    let dbus = sheet.selectedObject;
    let bname = getAttributeValue("busname", dbus);
    let bus = ste.schematic.getBus(bname);
    if (bus != null) {
        let L1 = getAttributeValue("L1", bus);
        if (L1 != null) {
            document.getElementById("BL1").value = L1;
        }
        else
            document.getElementById("BL1").value = 0;
        let L2 = getAttributeValue("L2", bus);
        if (L2 != null) {
            document.getElementById("BL2").value = L2;
        }
        else
            document.getElementById("BL2").value = 0;
        menu("BusSize");
    }
    else
        report("editBusSize no bus found " + bname);
}
function editBusSizeOK() {
    let L1 = document.getElementById("BL1").value;
    let L2 = document.getElementById("BL2").value;
    let dbus = sheet.selectedObject;
    let bname = getAttributeValue("busname", dbus);
    let bus = ste.schematic.getBus(bname);
    if (bus != null) {
        setAttributeValue("L1", dbus, L1);
        setAttributeValue("L2", dbus, L2);
        setAttributeValue("L1", bus, L1);
        setAttributeValue("L2", bus, L2);
    }
    else
        report("editBusSizeOK no bus found " + bname);
    CloseMenu();
}
function editMembers() {
    CloseMenu();
    let dbus = sheet.selectedObject;
    let bname = getAttributeValue("busname", dbus);
    let bus = ste.schematic.getBus(bname);
    let sz = getAttributeValue("size", bus);
    report("5069 editMembers " + bname + " bus size = " + sz + " " + bus.members.length);
    if (sz == null)
        document.getElementById("bsize").value = "";
    else
        document.getElementById("bsize").value = sz;
    if (bus != null) {
        menu("BusMem");
        let t = bus.members;
        let k = t.length;
        let i = 0;
        let ss = document.getElementById("busmemz");
        i = ss.children.length - 1;
        while (i >= 0) {
            ss.remove(i);
            i -= 1;
        }
        i = 0;
        while (i < k) {
            let p = t[i];
            let op = document.createElement("option");
            op.text = p.netname;
            ss.add(op);
            i += 1;
        }
    }
    repaint();
}
function editComponentRecordDefinition() {
    CloseMenu();
    let dpin = sheet.selectedObject;
    if (dpin.klass == "DPin") {
        menu("BusMem");
        let t = dpin.membernames;
        let k = t.length;
        let i = 0;
        let ss = document.getElementById("busmemz");
        i = ss.children.length - 1;
        while (i >= 0) {
            ss.remove(i);
            i -= 1;
        }
        i = 0;
        while (i < k) {
            let op = document.createElement("option");
            op.text = t[i];
            ss.add(op);
            i += 1;
        }
    }
    repaint();
}
function changeSize() {
    CloseMenu();
    let dbus = sheet.selectedObject;
    let bname = getAttributeValue("busname", dbus);
    let bus = ste.schematic.getBus(bname);
    let sz = Number(document.getElementById("bsize").value);
    setAttributeValue("size", bus, sz);
}
function addMember() {
    CloseMenu();
    let dbus = sheet.selectedObject;
    if (dbus.klass == "DBus") {
        let bname = getAttributeValue("busname", dbus);
        let bus = ste.schematic.getBus(bname);
        if (bus != null) {
            let s = prompt("Add net name:");
            if ((s != null) && (s != "")) {
                let y = ste.schematic.getNet(s);
                if (y == null) {
                    y = new Net(s, "");
                    ste.schematic.nets.push(y);
                }
                bus.addMember(y);
            }
        }
    }
    else if (dbus.klass == "DPin") {
        let s = prompt("Add net name:");
        if ((s != null) && (s != "")) {
            dbus.membernames.push(s);
        }
    }
}
function deleteMember() {
    CloseMenu();
    let dbus = sheet.selectedObject;
    let t = [];
    let i = -1;
    if (dbus.klass == "DBus") {
        let bname = getAttributeValue("busname", dbus);
        let bus = ste.schematic.getBus(bname);
        let t = bus.members;
        let ss = document.getElementById("busmemz");
        i = ss.selectedIndex;
    }
    else if (dbus.klass == "DPin") {
        t = dbus.membernames;
        let ss = document.getElementById("busmemz");
        i = ss.selectedIndex;
    }
    if (i != -1) {
        if (confirm("Delete Bus Member " + t[i].netname + "?")) {
            removeItemFromArray(t[i], t);
        }
    }
}
//TODO
function editBusConnections() {
    let pin = sheet.selectedObject;
    let pr = sheet.selectedObject.parent;
    let busname = pin.connectedSignal;
    report("editBusConnections busname = " + busname);
    let bus = null;
    if ((busname != null) && (busname != "")) {
        bus = ste.schematic.getBus(busname);
    }
    //  report("bus " + bus);
    if (bus != null) {
        CloseMenu();
        menu("BusPins");
        let t = bus.members;
        let k = t.length;
        let i = 0;
        let j = 0;
        let cols = ["bus member", "pinnumber"];
        let cw = [10, 2, 3, 3, 10];
        let tbl = document.createElement("table");
        let tblBody = document.createElement("tbody");
        let row = document.createElement("tr");
        let cell = null;
        let cellText = null;
        for (j = 0; j < cols.length; j++) {
            cell = document.createElement("th");
            cellText = document.createTextNode(cols[j]);
            cell.appendChild(cellText);
            row.appendChild(cell);
        }
        tblBody.appendChild(row);
        while (i < k) {
            let row = document.createElement("tr");
            //let cell = document.createElement("td");
            //let cellText = document.createTextNode(getAttributeValue("pinlabel", t[i]));
            //cell.appendChild(cellText);
            //row.appendChild(cell);
            row.addEventListener("click", function () { highlightPin(tblBody, this.rowIndex); });
            for (j = 0; j < cols.length; j++) {
                cell = document.createElement("td");
                let cellTextbox = document.createElement("input");
                cellTextbox.setAttribute("type", "text");
                cellTextbox.setAttribute("size", cw[j]);
                cellTextbox.setAttribute("id", "pb" + i + "_" + j);
                if (j == 0)
                    cellTextbox.setAttribute("value", t[i].netname);
                if (j == 1) {
                    let rpin = pr.getPinByName(t[i].netname);
                    let v = "";
                    if (rpin != null)
                        v = getAttributeValue("pinnumber", rpin);
                    cellTextbox.setAttribute("value", v);
                } /*
                if(j != 4) cellTextbox.setAttribute("value", getAttributeValue(cols[j], t[i]));
                else
                {
                  let cs = t[i].connectedSignal;
                  if(cs == null) cs = "";
                cellTextbox.setAttribute("value", cs);
                }
                */
                cell.appendChild(cellTextbox);
                row.appendChild(cell);
            }
            tblBody.appendChild(row);
            i += 1;
        }
        tbl.appendChild(tblBody);
        tbl.setAttribute("border", "1");
        let iff = document.getElementById("buspinz");
        while (iff.firstChild) {
            iff.removeChild(iff.firstChild);
        }
        iff.appendChild(tbl);
    }
}
function editBusPinsOK() {
    let i = 0;
    let o = sheet.selectedObject;
    let pins = sheet.selectedObject.parent.getPins();
    let k = pins.length;
    let pn = null;
    //while(i < k)
    while (document.getElementById("pb" + i + "_1") != null) {
        pn = document.getElementById("pb" + i + "_1").value;
        if ((pn != null) && (pn != "")) {
            let pp = sheet.selectedObject.parent.getPinByNumber(pn);
            if (pp == null) {
                let newPin = new DPin(o.de, o.x1, o.y1, o.x2, o.y2, o.colorindex, 0, 0, o.textsize);
                newPin.parent = o.parent;
                newPin.visible = 0;
                newPin.connectedSignal = document.getElementById("pb" + i + "_0").value;
                setAttributeValue("pinlabel", newPin, document.getElementById("pb" + i + "_0").value);
                setAttributeValue("pinnumber", newPin, pn);
                setAttributeValue("pintype", newPin, "io");
                setAttributeValue("pinseq", newPin, o.parent.getPins().length + 1);
                o.parent.addDrawingObject(newPin);
            }
            else {
                pp.connectedSignal = document.getElementById("pb" + i + "_0").value;
                let sig = document.getElementById("pb" + i + "_0").value;
                if (pp.visible == 1) {
                    let p1 = new PointI(pp.xw, pp.yw);
                    let p2 = pins[i].parent.morph2(p1);
                    let ojs = sheet.getObjectsAt(pp.parent.x + p2.x, pp.parent.y + p2.y);
                    let kk = ojs.length;
                    let ii = 0;
                    while (ii < kk) {
                        if (ojs[ii].klass == "DNet") {
                            let nn = getAttributeValue("netname", ojs[ii]);
                            if (sig != nn) {
                                let b = true;
                                if ((nn.indexOf("N_") != 0) && (nn.length > 0)) {
                                    b = confirm("Rename net " + nn + " to be " + sig + "?");
                                }
                                if (b) {
                                    renameNetSegment(ojs[ii], nn, sig);
                                }
                            }
                        }
                        else {
                            if ((ojs[ii].klass == "DPin") && (getAttributeValue("device", ojs[ii].parent).indexOf("offsheet") != -1)) {
                                setAttributeValue("net", ojs[ii].parent, sig + ":1");
                                setAttributeValue("pinlabel", ojs[ii], sig);
                            }
                        }
                        ii += 1;
                    }
                }
            }
        }
        i += 1;
    }
    CloseMenu();
    repaint();
}
function connectBus() {
    CloseMenu();
    menu("BusSel");
    let i = 0;
    let ss = document.getElementById("busobjs");
    i = ss.children.length - 1;
    while (i >= 0) {
        ss.remove(i);
        i -= 1;
    }
    let k = ste.schematic.buses.length;
    i = 0;
    while (i < k) {
        let p = ste.schematic.buses[i];
        let op = document.createElement("option");
        op.text = p.busname;
        ss.add(op);
        i += 1;
    }
    repaint();
}
//TODO
function selBus() {
    let ss = document.getElementById("busobjs");
    let s = ss.selectedIndex;
    if (s != -1) {
        let pin = sheet.selectedObject;
        if (pin != null) {
            let p1 = new PointI(pin.xw, pin.yw);
            //      report("5401 pin.xw = " + pin.xw + " pin.yw = " + pin.yw);
            let pr = pin.parent;
            let p2 = pr.morph2(p1);
            let ojs = sheet.getObjectsAt(p2.x + pr.x, p2.y + pr.y);
            //      report("5405 x.length=" + ojs.length + " p2.x = " + p2.x + " pr.x = " + pr.x + " p2.y = " + p2.y + " pr.y = " + pr.y + " " + pr.mirror + " " + pr.angle);
            if (ojs.length == 1) {
                addNetStub();
            }
            let busname = ste.schematic.buses[s].busname;
            let bus = ste.schematic.buses[s];
            pin.connectedSignal = busname;
            pin.update();
            ojs = sheet.getObjectsAt(p2.x + pr.x, p2.y + pr.y);
            let kk = ojs.length;
            let ii = 0;
            while (ii < kk) {
                if ((ojs[ii].klass == "DPin") && (getAttributeValue("device", ojs[ii].parent).indexOf("offsheet") != -1)) {
                    setAttributeValue("net", ojs[ii].parent, busname + ":1");
                    setAttributeValue("pinlabel", ojs[ii], busname);
                }
                ii += 1;
            }
            //      sheet.selectedObject = pin;
            report("5422 bus.members.length = " + bus.members.length);
            bus.members.forEach((member) => {
                let mn = member.netname; //getAttributeValue("netname", member);
                let pn = busname + "_" + mn;
                report("5426 pn = " + pn + " " + member + " " + member.klass);
                let px = pr.getPinByName(pn);
                if (px == null) {
                    let newPin = new DPin(pr.de, pr.x1, pr.y1, pr.x2, pr.y2, pr.colorindex, 0, 0, pr.textsize);
                    newPin.parent = pr;
                    newPin.visible = 0;
                    pin.membernames.push(mn);
                    newPin.connectedSignal = mn;
                    setAttributeValue("pinlabel", newPin, pn);
                    setAttributeValue("pinnumber", newPin, pr.getPins().length + 1);
                    setAttributeValue("pintype", newPin, "io");
                    setAttributeValue("pinseq", newPin, pr.getPins().length + 1);
                    pr.addDrawingObject(newPin);
                }
                else {
                    px.connectedSignal = mn;
                }
            });
        }
    }
    CloseMenu();
    repaint();
}
//TODO
function removeBus() {
    CloseMenu();
}
function addNet() {
    CloseMenu();
    let pin = sheet.selectedObject;
    sheet.setState(STATE_NET);
    // alert(pin.parent.getX() + " " + pin.parent.getY() + " " + pin.xw + " " +  pin.yw);
    if (pin != null) {
        if (pin.klass == "DPin")
            addNetPin(pin);
        else if (pin.klass == "DEnd") {
            let x = pin.getX();
            let y = pin.getY();
            sheet.selectedObject = new DNet(sheet.de, x, y, x + 1, y + 1, NET_COLOR);
            //      sheet.setNodeNetName(CurrentNetName, xxe, yye);
            sheet.substate = 1;
        }
    }
}
function addNetPin(pin) {
    let p1 = new PointI(Number(pin.xw), Number(pin.yw));
    let p2 = pin.parent.morph2(p1);
    let xxe = Number(pin.parent.getX()) + p2.x;
    let yye = Number(pin.parent.getY()) + p2.y;
    let n = sheet.getNetNameAt(xxe, yye);
    if (n == null)
        n = CurrentNetName;
    else
        CurrentNetName = n;
    sheet.selectedObject = new DNet(sheet.de, xxe, yye, xxe + 1, yye + 1, NET_COLOR);
    sheet.setNodeNetName(CurrentNetName, xxe, yye);
    sheet.substate = 1;
    repaint();
}
function editNetName() {
    CloseMenu();
    updateNetConnections();
    let s = sheet.selectedObject;
    if (s.klass == "DNet") {
        let a = getAttributeValue("netname", s);
        let n = ste.schematic.getNet(a);
        let ss = prompt("Edit Net Name", a);
        if (ss != null) {
            report("renameNet from " + a + " to " + ss + "\n");
            if (n != null) {
                n.netname = ss;
            }
            renameNetSegment(s, a, ss);
            ste.schematic.addNet(s);
            updateNetConnections();
        }
    }
    repaint();
}
function editNetComment() {
    CloseMenu();
    let s = sheet.selectedObject;
    if (s.klass == "DNet") {
        let a = getAttributeValue("netname", s);
        let n = ste.schematic.getNet(a);
        let ss = prompt("Edit Net Comment", n.comment);
        if (ss != null) {
            report("edit net comment from " + n.comment + " to " + ss + "\n");
            n.comment = ss;
        }
    }
}
function printReportPreview() {
    CloseMenu();
    let wxxx = window.open("about:blank", "Print Preview", "status=1,toolbar=1,menubar=1,directories=1,resizable=yes,scrollbars=yes,height=480,width=360");
    wxxx.document.open();
    wxxx.document.write("<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n");
    wxxx.document.write("<meta name=viewport content=\"width=device-width, initial-scale=1\">\n");
    wxxx.document.write("</head>\n<body>\n<pre>\n");
    let ta = document.getElementById("ta");
    wxxx.document.write(ta.value);
    wxxx.document.write("\n</pre></body>\n");
    wxxx.document.close();
}
function printPreview() {
    CloseMenu();
    let oldgrid = sheet.grid;
    let oldcolors = dcolors.bk;
    if (sheet.grid)
        sheet.grid = false;
    let z = de.getInverseZoom();
    de.setInverseZoom(10);
    dcolors.setPrintDefaults();
    repaint();
    wxxx = window.open("about:blank", "Print Preview", "status=1,toolbar=1,menubar=1,directories=1,resizable=yes,scrollbars=yes,height=480,width=360");
    wxxx.document.open();
    wxxx.document.write("<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n");
    wxxx.document.write("<meta name=viewport content=\"width=device-width, initial-scale=1\">\n");
    wxxx.document.write("</head>\n<body>\n");
    wxxx.document.write("<img id=\"pp\" alt=\"schematic\" src=\"" + canvas.toDataURL() + "\">\n");
    wxxx.document.write("</body>\n");
    wxxx.document.close();
    //wxxx.document.getElementById("pp").src = canvas.toDataURL();
    sheet.grid = oldgrid;
    if (oldcolors == 0)
        dcolors.setBlackBackgroundDefaults();
    else
        dcolors.setWhiteBackgroundDefaults();
    de.setInverseZoom(z);
    repaint();
}
function makeSimModelTemplate() {
    CloseMenu();
    let s = sheet.selectedObject;
    let sb = makeHardwareTemplateOfSymbol(s);
    clearReport();
    let n = getAttributeValue("device", s);
    reportfilename = n + ".js";
    report(sb);
}
function makeComponentSchematic() {
    CloseMenu();
    let s = sheet.selectedObject;
    makeSchematicForSymbol(s);
}
function report(s) {
    if (Debug) {
        let ta = document.getElementById("ta");
        if (ta != null)
            ta.value = ta.value + s + "\n";
        else
            alert("report: " + s);
    }
}
function saveReport() {
    if (!ipod)
        saveFile(reportfilename, document.getElementById("ta").value);
    else {
        let email = ('me@myemail');
        let subject = ('eightolives Schematic file');
        let cc = ('');
        let bcc = ('');
        let body = encodeURI(document.getElementById("ta").value);
        window.location = "mailto:" + email + '?subject=' + subject + '&cc=' + cc + '&bcc=' + bcc + '&body=' + body;
    }
}
function saveReportLocal() {
    let fn = prompt("Enter report file name", reportfilename);
    if ((fn != null) && (fn != "")) {
        localStorage.setItem(fn, document.getElementById("ta").value);
    }
}
function clearReport() {
    if (Debug)
        document.getElementById("ta").value = "";
    reportfilename = "report.txt";
}
function gapiInitialized() {
}
/*
function initClient()
{
  report("initClient");
  gapi.client.init({
  apiKey: API_KEY,
  clientId: CLIENT_ID,
  discoveryDocs: DISCOVERY_DOCS,
  scope: SCOPES
  }).then(function () {
  report("Listen for sign-in state changes.");
  gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

  // Handle the initial sign-in state.
  updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
  });
}

function updateSigninStatus(isSignedIn)
{
 report("signedIn = " + isSignedIn);
  if (isSignedIn) {
          authorizeButton.style.display = 'none';
          signoutButton.style.display = 'block';
   gdcLoaded = true;
   accessOK = true;
  updateProjectList();
//         listFiles();
        } else {
          authorizeButton.style.display = 'block';
          signoutButton.style.display = 'none';
        }
}

function handleAuthClick(event) {
        gapi.auth2.getAuthInstance().signIn();
        CloseMenu();
}

function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
  CloseMenu();
  PROJECT_LIB = "LOCAL";
  SELECTED_PROJECT_INDEX = 0;
  document.getElementById("pr1").checked = true;
}

function handleClientLoad()
{
  report("handleClientLoad");
  gapi.load('client:auth2', initClient);

//  gapi.auth.init(gapiInitialized);
//  updateProjectList();
}

*/
function loadextfile(filename) {
    let fileref = null;
    if (filename.indexOf(".json") != -1) {
    }
    else if (filename.indexOf(".js") != -1) {
        fileref = document.createElement('script');
        fileref.setAttribute("type", "text/javascript");
        fileref.setAttribute("src", filename);
    }
    else if (filetype == "css") {
        fileref = document.createElement("link");
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", filename);
    }
    if ((typeof fileref !== "undefined") && (fileref != null))
        document.getElementsByTagName("head")[0].appendChild(fileref);
    return (fileref);
}
function setPlacenear() {
    CloseMenu();
    let s = sheet.selectedObject;
//    PlacenearObject = s;
    if (s != null) {
        let fp = getAttributeValue("placenear", s);
        if (fp == null) {
            fp = "";
        }
        let pn = prompt("Enter placenear ref-pinno (e.g. U2-5)", fp);
        if(pn.indexOf("-") == -1) alert("Warning: " + pn + " does not specify a pin number.");
        if (pn != null) {
            report("setting placenear to " + pn);
            setAttributeValue("placenear", s, pn);
        }
        else
            report("no placenear");
    }
}
function setFootprint() {
    CloseMenu();
    let s = sheet.selectedObject;
    FootprintObject = s;
    if (s != null) {
        let fp = getAttributeValue("footprint", s);
        if (fp != null) {
            document.getElementById("footp").value = fp;
        }
        else {
            document.getElementById("footp").value = "";
        }
        updateFootprintsList();
        //    flibChange();
        document.getElementById("fpdesc").value = "";
        document.getElementById("fpid").value = getAttributeValue("device", s);
        menu("Fomps");
    }
}
function updateFootprintsList() {
    clearOptions("flib");
    let ss = document.getElementById("flib");
    let op = document.createElement("option");
    op.text = "Built-in Footprints";
    ss.add(op);
    op = document.createElement("option");
    op.text = "Local";
    ss.add(op);
    if (PROJECT_LIB == "LOCAL") {
        SymbolListDest = "flib";
        if (service != null) {
            let p = service.getFootprintsList(eo_base);
            p.then(function (data) {
                let d = data.fplibraries; //decodeSymbolList(data, "a.rss");
                FPLIBRARY_LIST = d;
                report("FPLIBRARY_LIST.length = " + FPLIBRARY_LIST.length);
                showList(d, "flib");
                flibChange();
            }).catch(function (error) {
                report(error);
            });
        }
    }
    else {
        let p = service.getFootprintsList(PROJECT_LIB);
        p.then(function (data) {
            let d = data.fplibraries; //decodeSymbolList(data, "a.rss");
            FPLIBRARY_LIST = d;
            report("FPLIBRARY_LIST.length = " + FPLIBRARY_LIST.length);
            showList(d, "flib");
            flibChange();
        }).catch(function (error) {
            report(error);
        });
    }
}
function flibChange() {
    clearOptions("foot");
    let ss = document.getElementById("foot");
    let s = document.getElementById("flib").selectedIndex;
    let fixedlibraries = 0;
    SELECTED_LIBRARY_INDEX = s;
    //  SymbolListDest = "foot";
    let link = null;
    if (s > 1) {
        let ql = FPLIBRARY_LIST[s - fixedlibraries].link;
        report("ql = " + ql + ", s = " + s);
        if (ql.indexOf("http") != -1) {
            report("flibchange case 1");
            link = ql;
        }
        else if (ql == "PROJECT_LIB") {
            report("flibchange case 2 " + s + " " + ql + " " + PROJECT_LIB);
            if (PROJECT_LIB == "LOCAL")
                s = 1;
            //      else link = PROJECT_LIB;
            else
                link = ql;
        }
        else if (ql.indexOf("PROJECT_LIB") == 0) {
            report("flibchange case 3");
            link = PROJECT_LIB + ql;
        }
        else if (((FPLIBRARY_LIST[s - fixedlibraries].title.indexOf("eightolives") != -1) && (s != -1)) || (PROJECT_LIB == "LOCAL")) {
            report("flibchange case 4");
            //       link = eo_symbol_base + ql;
            link = service.baseURL + ql;
        }
        else if (document.getElementById("pr3").checked) {
            report("flibchange case 5");
            link = service.baseURL + ql;
            //      link = PROJECT_LIB + ql;
        }
        else {
            report("flibchange case 6");
            link = eo_symbol_base + ql;
            //     link = PROJECT_LIB + ql;
        }
    }
    clearList(FPS);
    report(s + " " + link);
    if (s == 1) {
        let d = decodeLocalSymbolList();
        FPS = d;
        showList(d, "foot");
    }
    else if (s == 0) {
        link = null;
        let d = decodeSymbolList(fprss, link);
        FPS = d;
        showList(d, "foot");
    }
    else if (link != null) {
        report("5221 link = " + link);
        let p = getData(link); //service.getLibraryList(link, PROJECT_LIB, s);
        p.then(function (data) {
            let d = decodeSymbolList(data, link);
            FPS = d;
            showList(d, "foot");
        }).catch(function (error) {
            report(error);
        });
    }
}
function footChange() {
    let ss = document.getElementById("foot").selectedIndex;
    let d = document.getElementById("fpdesc");
    d.value = FPS[ss].description;
}
function setFPAttribute() {
    CloseMenu();
    report("setFPAttribute 1");
    let s = FootprintObject; //sheet.selectedObject;
    if (s != null) {
        let z = document.getElementById("footp").value;
        report("setFPAttribute 2 " + z);
        if ((z != null) && (z.length > 3)) {
            let x = z.lastIndexOf("\t");
            if (x == -1)
                x = z.lastIndexOf(" ");
            if (x != -1) {
                z = z.substring(x + 1);
            }
            report("setFPAttribute " + z);
            setAttributeValue("footprint", s, z);
        }
    }
}
function setFPAllDevice() {
    CloseMenu();
    //  let s = sheet.selectedObject;
    let dn = document.getElementById("fpid").value;
    let sb = "Setting footprints for device " + dn + "\n";
    if (dn != null) {
        let z = document.getElementById("footp").value;
        if ((z != null) && (z.length > 3)) {
            /*
              let x = z.lastIndexOf("\t");
              if(x == -1) x = z.lastIndexOf(" ");
              if(x != -1)
              {
            z = z.substring(x+1);
              }
              */
            let sheets = ste.getSchematic().sheets;
            let kk = sheets.length;
            let ii = 0;
            while (ii < kk) {
                let sh = sheets[ii];
                let doj = sh.getDrawingObjects();
                let k = doj.length;
                let i = 0;
                while (i < k) {
                    let d = doj[i];
                    if (d.klass == "DComponent") {
                        let ref = getAttributeValue("refdes", d);
                        let dev = getAttributeValue("device", d);
                        if ((dev != null) && (dev == dn) && (ref != null) && (ref != "")) {
                            sb += " " + ref + ",";
                            setAttributeValue("footprint", d, z);
                        }
                    }
                    i += 1;
                }
                ii += 1;
            }
            clearReport();
            report(sb);
        }
    }
}
function useFoot() {
    let slib = document.getElementById("flib").selectedIndex;
    let ss = document.getElementById("foot").selectedIndex;
    if (ss != -1) {
        let z = FPS[ss].link;
        if ((z != null) && (z.length > 3)) {
            let x = z.lastIndexOf("\t");
            if (x == -1)
                x = z.lastIndexOf(" ");
            if (x != -1) {
                z = z.substring(x + 1);
            }
        }
        document.getElementById("footp").value = z;
    }
}
function checkFixDupeNames() {
    CloseMenu();
    let sb = checkCompDupeNames(sheet.selectedObject, false);
    clearReport();
    report("Check Component Duplicate Names\n");
    report(sb);
    if (sb == "") {
        report("No dupes found.");
        alert("No dupes found.");
    }
    else {
        if (confirm("Fix Dupes?")) {
            sb = checkCompDupeNames(sheet.selectedObject, true);
            clearReport();
            report("Check Component Duplicate Names\n");
            report(sb);
            if (sb == "") {
                report("No dupes found.");
                alert("No dupes found.");
            }
            repaint();
        }
    }
}
function showReport() {
    CloseMenu();
    document.getElementById("rpt").scrollIntoView();
}
function addDraw(n) {
    CloseMenu();
    switch (n) {
        case 0:
            place(2);
            break;
        case 1:
            place(3);
            break;
        case 2:
            place(4);
            break;
        case 3:
            place(5);
            break;
        case 4:
            place(6);
            break;
        case 5:
            place(10);
            break;
        case 6:
            place(8);
            break;
        case 7:
            place(7);
            break;
        default: break;
    }
}
function processBC(evt) {
    let msg = evt.data;
}
function visit() {
    let u = document.getElementById("exurl").value;
    let j = u.indexOf(":8081");
    if (u.indexOf("https") == 0)
        u = "http" + u.substring(u.indexOf(":"));
    if (j != -1) {
        u = u.substring(0, j) + "8080/eo.htm";
        report("visit: " + u);
        let w2 = window.open(u, "g2");
    }
}

function commandLine()
{
}

function saveLocal(fname, data)
{
  if(navigator.cookieEnabled) localStorage.setItem(fname, data);
}

function getLocal(fname)
{
  var x = null;
  if(navigator.cookieEnabled) x = localStorage.getItem(fname);
  return(x);   
}

function removeLocal(fname)
{
  if(navigator.cookieEnabled) localStorage.removeItem(fname);   
}

function reportBubble(s)
{
  if(s.length < 100)
  {
    if(BTO != null) 
    {
//      {clearTimeout(BTO); BTO = null;}
      Bubble1.innerHTML += "<br>" + s;
    }
    else
    {
      let h = '<span style="float:right;font-size:10pt"><a href="javascript:CloseBubble()">X</a></span><br>';
      h += s;
      Bubble1.innerHTML = h;
      Bubble.style.visibility = "visible";
    }
    if(bBubbleTO) BTO = setTimeout(CloseBubble, 10000);
  }
}

function CloseBubble()
{
  Bubble.style.visibility = "hidden";  
  BTO = null;
}

function changedBubble()
{
  bBubbleTO = document.getElementById("bVoiceBubble").checked;  
}
