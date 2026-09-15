// eo_schematic3.js

let symbol_list_request = null;
let symbol_request = null;
let checkLogin_request = null;
let save_request = null;
let NewDComponent = null;
let DemoLib = ["eo_titleA.sym","eo_gnd_chassis.sym", "eo_resistor.sym", "eo_capacitor.sym","eo_inductor.sym", "eo_npn.sym", "eo_pnp.sym", "eo_diode", "eo_power_generic.sym", "gnand2.sym","eo_offsheetin.sym", "eo_offsheetinb.sym", "eo_offsheetout.sym", "eo_offsheetoutb.sym",
  "eo_offsheetiol.sym", "eo_offsheetior.sym", "eo_input_port.sym", "eo_output_port.sym", "eo_inout_port.sym"];
let DemoLibOld = ["eo_titleA.sym","gnd.sym", "resistor.sym", "capacitor.sym","inductor.sym", "npn.sym", "pnp.sym", "eo_diode.sym", "power.sym", "gnand2.sym","eo_offsheetin.sym", "eo_offsheetinb.sym", "eo_offsheetout.sym", "eo_offsheetoutb.sym",
   "eo_offsheetiol.sym", "eo_offsheetior.sym", "eo_input_port.sym", "eo_output_port.sym", "eo_inout_port.sym"]; 

let ListType = 0;

let FailedLinks = [];

// define symbol entry info
class SymbolInfo {
    title = "";
    link = "";
    description = "";
    
    constructor(title, link, description) {
        this.title = title;
        this.link = link;
        this.description = description;
    }
}

class FindSymbol {
    static FindQueue = [];
    
    link = null;
    project = null;
    dc = null;
    
    constructor(link, project, dc) {
        this.link = link;
        this.project = project;
        this.dc = dc;
        report("2225 FindSymbol " + link);
//        this.addToFindQueue(this);
    }
    
    static addToFindQueue(fqi) {
//        FindSymbol.FindQueue.push(fqi);
        if((FindSymbol.FindQueue.length == 0) && (FileRequest == null))
        {
          FindSymbol.FindQueue.push(fqi);
          FindSymbol.nextFindItem();
        }
        else FindSymbol.FindQueue.push(fqi);
    }

    static removeFromFindQueue() {
        if(FindSymbol.FindQueue.length > 0) FindSymbol.FindQueue.splice(0,1);
        if(FindSymbol.FindQueue.length > 0) FindSymbol.nextFindItem();
        else
        {
//    report("removeFromFindQueue " + ProcessingSch + " " + LastWasSch);
          if((ProcessingSch == false) && (LastWasSch))
          {
            LastWasSch = false;
            if(SheetLoadErrors) report("Some symbols were not loaded.\nDelete sheet and then try again.");
            else if(document.getElementById("autofix").checked)
            {
	      report("All symbols were loaded.");
	      fixRefs();
	      updateNetConnections();
            }
          }
        }
        repaint();
        return(FindSymbol.FindQueue.length);
    }

    static clearFindQueue() {
        clearArray(FindSymbol.FindQueue);
        FS_symbol_request = null;
    }
    
    static nextFindItem() {
        report("nextFindItem FindQueue " + FindSymbol.FindQueue.length + " " + FindSymbol.FindQueue[0].link);
        if(FindSymbol.FindQueue.length > 0)
        {
          let fqi = FindSymbol.FindQueue[0];
          setTimeout(fqi.start(), 1000); //feeble fix for ipod
//        fqi.start();
        }
        else
        {
          SchematicMode = false;
          report("Find Items Complete");
          updateNetConnections();
          updateBuses();
        }
    }
    
    start() {
        let fp = null;
        let d = null;
        if(this.checkBuiltInLibrary()) FindSymbol.removeFromFindQueue();
        else
        {
          if(this.checkLocalStorage()) FindSymbol.removeFromFindQueue();
          else
          {
            if(this.link.indexOf("file") == 0)
            {     
              report("error: FindSymbol with file:/ protocol not supported");
            }
            else
            {
              this.checkEoLibrary().then( () => {
                  FindSymbol.removeFromFindQueue();
              }).catch( (e) => {
                  if(e == "NotFound")
                  {
                    this.checkProjectLibrary().then( () => {
                        FindSymbol.removeFromFindQueue();
                    }).catch( (e) => {
                        if(e == "NotFound")
                        {
                          report("FindSymbol failed for " + this.link);
                          addUniqueStringToArray(this.link, FailedLinks);
                          if((this.link != ".sym") && (this.link != "null.sym")) this.preload();
                          else  FindSymbol.removeFromFindQueue();
                        }
                        else report("2311 checkProjectLibrary failed " + e);
                    });
                  }
                  else report("2313 checkEoLibrary failed " + e);
              });
            }
          }
        }
    }
            
    checkLocalStorage() {
        let b = false;
        let fp = new FileParser(this.link);
        let s = localStorage.getItem(this.link);
        if(!(typeof s === 'undefined') && (s != null))
        {
          let d = fp.parse1(s);
          if(d != null)
          {
	    this.dc.addDrawingObjects(d.doj);
	    this.dc.addAttributes(d.attributes);      
	    report("found in LOCAL");
	    b = true;
          }
        }
        return(b);
    }

    checkBuiltInLibrary() {
        let k = DemoLib.length;
        let i = 0;
        let b = false;
        let lk = this.link;
        let j = this.link.lastIndexOf("/");
        if(j == -1) j = this.link.lastIndexOf("\\");
        if(j != -1)
        {
          lk = this.link.substring(j+1);
        }
  
        while( !b && (i < k))
        {
          if(DemoLib[i] == lk) b = true;
          else i += 1;
        }
        
        if(!b)
        {
          k = DemoLibOld.length;
          i = 0;
          while( !b && (i < k))
          {
            if(DemoLibOld[i] == lk) b = true;
            else i += 1;
          }
        }
        
        if(b)// if in demolib
        {
          let fp = new FileParser(DemoLib[i]);
          let d = fp.parse1(DemoLibK[i]);
          if(d != null)
          {
            if(DemoLib[i] == "eo_titleA.sym") this.dc.selectable = 0;
            else if(DemoLib[i] == "eo_titleB.sym") this.dc.selectable = 0;
            this.dc.addDrawingObjects(d.doj);
            this.dc.addAttributes(d.attributes); 
            FS_symbol_dc = this.dc;
            report("181 found in Built-in Library");
          }
        }
        else
        {
          let f = getBuiltInSymbolIndex(lk);
          if(f != -1)
          {
            b = true;
            let fp = new FileParser(BuiltIn[f].link);
            let d = fp.parse1(BuiltIn[f].data);
            if(d != null)
            {
              this.dc.addDrawingObjects(d.doj);
              this.dc.addAttributes(d.attributes); 
              FS_symbol_dc = this.dc;
              report("196 found in Built-in Library");
            }
          }
        }
        return(b);
    }
    
    checkEoLibrary() {
        let lk = this.link;
        let tdc = this.dc;
        let p = new Promise(function(resolve, reject) {
            let b = false;
            let a = getAttributeValue("src", tdc);
            if(a != null) lk = a;
            let i = lk.indexOf("eo_symbols");
            if(i == -1) i = lk.indexOf("eo_sim");
            if(i == -1) i = lk.indexOf("eo_parts");
            if(i == -1) i = lk.indexOf("geda");
//            if(i == -1) // eo server issue
            
            if(i != -1)
            {
              lk = lk.substring(i);
            }
            else
            {
              a = getAttributeValue("library", tdc);
              if((a != null) && (a.indexOf("eo_") != -1)) b = true;
              report("2419 a = " + a + " b = " + b);
            }

            let g = null;
            if((i== -1) && !b)
            {
              if(inRefArray(lk, eo_partsList)) 
              {
                lk = eo_base + "eo_parts/" + lk;
                b =true;
              }
              else if(inRefArray(lk, eo_simList)) 
              {
                lk = eo_base + "eo_sim/" + lk;
                b =true;
              }
              else if(inRefArray(lk, eo_symbolsList)) 
              {
                lk = eo_base + "eo_symbols/" + lk;
                b =true;
              }
              else if((g = getInRefArray(lk, gedaList)) != null)
              {
                lk = eo_base + "geda/sym/" + g;
                b =true;
              }
              report("2398 lk = " + lk);
            }
  
            if((i != -1) || b)
            {
              report("2416 FS checkEoLibrary " + eo_base + " " + lk);
              getTextData(lk).then( (d) => {
                  let fp = new FileParser(lk);
                  let sym = fp.parse1(d);
                  tdc = sym;
                  if(FS_symbol_dc == null) 
                  {
	            FS_symbol_dc = sym;
                  }
                  else
                  {
	            FS_symbol_dc.addDrawingObjects(sym.doj);
	            FS_symbol_dc.addAttributesPermissive(sym.attributes);
	            repaint();
                  }
                  resolve(sym);
              }).catch((e) => {
                  reject(e);
              });
              FS_symbol_dc = tdc;
            }
            else reject("NotFound");
        });
        return(p);
    }
    
    checkProjectLibrary() {
        let lk = this.link;
        let tdc = this.dc;
        let p = new Promise(function(resolve, reject) {
            if(PROJECT_LIB != "LOCAL")
            {
              let l = PROJECT_LIB;
              report("2484 " + l + " : " + lk);
              let z = l.lastIndexOf("/");
              if(z != -1)
              {
                l = l.substring(0, z) + "/" + lk;
                report("2489 checking project library for " + l);
                getTextData(l).then( (d) => {
                    let fp = new FileParser(lk);
                    let sym = fp.parse1(d);
                    tdc = sym;
                    if(FS_symbol_dc == null) 
                    {
	              FS_symbol_dc = sym;
                    }
                    else
                    {
	              FS_symbol_dc.addDrawingObjects(sym.doj);
	              FS_symbol_dc.addAttributesPermissive(sym.attributes);
	              repaint();
                    }
                    resolve(sym);
                }).catch((e) => {
                    reject(e);
                });
                FS_symbol_dc = tdc;
              }
              else
              {
                reject("NotFound");   
              }
            }
            else 
            {
              report("2515 PROJECT_LIB is LOCAL");
              reject("NotFound");
            }
        });
        return(p);
    }
    
    preload() {
        let d = this.getBuiltInSymbolComponent("eo_NULL.sym");
        if(d != null)
        {
          let n = this.link.substring(0, this.link.length - 4);
          if(n.indexOf("eo_") == 0) n = n.substring(3);
          setAttributeValue("device", d, n);
          report("2479 " + getAttributeValue("device", d) + " " + d.klass);
          FS_symbol_dc = d;  
          this.dc.addDrawingObjects(d.doj);
          this.dc.addAttributes(d.attributes);
          removeFromFindQueue();
        }
        else report("2485 preload d null");
    }


}




function ProjectServer(link)
{
    this.link = link;
}


/*

function postUploadXHR(u, callback, filename, data)
{
  request = new xhrRequest();
  request.open("POST", u, true);
  let sBoundary = "---------------------------" + Date.now().toString(16);
  let q = "Content-Disposition: form-data; name=\"UPLOAD\"; filename=\"" + filename + "\"\r\n\r\n";
  request.onreadystatechange = callback;
  request.ontimeout = function () {
    console.error("The request for " + u + " timed out.");
    request = null;
  };
  request.timeout = 2000;
  request.setRequestHeader("Content-Type", "multipart\/form-data; boundary=" + sBoundary);
//  request.setRequestHeader("Authorization", "Z3Vlc3Q6Z3Vlc3QxMjM=");
  request.setRequestHeader("Authorization", auth);
//  request.sendAsBinary("--" + sBoundary + "\r\n" + oData.segments.join("--" + sBoundary + "\r\n") + "--" + sBoundary + "--\r\n");
  request.send("--" + sBoundary + "\r\n" + q + data + "\r\n" +  "--" + sBoundary + "--\r\n");
  return(request);
}

*/


function decodeLocalSymbolList()
{
  let k = localStorage.length;
  let li = [];
  let i = 0;
  let z = 0;
  while(i < k)
  {
    let t = localStorage.key(i);
    {
      li[z] = new SymbolInfo(t, t, t);
      z += 1;
     
    }
   i += 1; 
  }
  return(li);
}

function decodeSymbolList(s, elink)
{
  let li = [];
  clearArray(li);
  if((elink != null) && (elink.indexOf(".json") != -1))
  {
    try {
        let keys = Object.keys(s);
//        report("425 " + keys[0]);
        if(keys.length == 1)
        {
          li = s[keys[0]];   
//          report("429 " + JSON.stringify(li));
        }
        
    }
    catch {
      report("182 decodeSymbolList error for " + elink);
    }
  }
  else if((elink != null) && (elink.indexOf(".dcm") != -1))
  {
    let elib = elink.substring(0, elink.indexOf(".dcm")) + ".lib";
    let st = "";
    let sl = "";
    let sd = "";
    let k = s.length;
    let i = s.indexOf("$CMP");
    let j = s.indexOf("$ENDCMP");
    while((i != -1) && (i < j))
    {
      sd = "";
      sl = "";
      let k = s.indexOf("\r", i);
      if(k == -1) k = s.indexOf("\n", i);
      st = s.substring(i + 5, k);
      sd = s.substring(k, j);
      k = s.indexOf("\nD ", i);
      sl = elib + "?" + st;
      li[li.length] = new SymbolInfo(st, sl, sd);
      i = s.indexOf("$CMP", j);
      j = s.indexOf("$ENDCMP", i);
    }
  // showSymbolList();
  }
  else if(s.indexOf("<?xml") == 0)
  {
  let st = "";
  let sl = "";
  let sd = "";
  let k = s.length;
  let i = s.indexOf("<title>");
  let j = s.indexOf("</title>");
  while((i != -1) && (i < j))
  {
    sd = "";
    sl = "";
    st = s.substring(i + 7, j);
    i = s.indexOf("<link>", j);
    j = s.indexOf("</link>", i);
    if((i != -1) && (i < j))
    {
      sl = s.substring(i + 6, j);
      i = s.indexOf("<description>", j);
      j = s.indexOf("</description>", i);
      if((i != -1) && (i < j))
      {
	sd = s.substring(i + 13, j);
      }
    }
    li[li.length] = new SymbolInfo(st, sl, sd);
    i = s.indexOf("<title>", j);
    j = s.indexOf("</title>", i);
//    report("222 " + i + " " + j);
  }
  //showSymbolList();
  }
  else 
  {  
    li = decodeFileList(s);
  }
  return(li);
}

function decodeFileList(s)
{
//  alert(s);
  let li = [];
  let st = "";
  let sl = "";
  let sd = "";
  let k = s.length;
  let i = s.indexOf("<a href");
  let j = s.indexOf("\">");
  while((i != -1) && (i < j))
  {
    sd = "";
    st = "";
    sl = s.substring(i + 9, j);
    i = s.indexOf("</a>", j);
    st = s.substring(j + 2, i);
    sd = st;
    li[li.length] = new SymbolInfo(st, sl, sd);
    i = s.indexOf("<a href",j);
    j = s.indexOf("\">",i);
  }
  return(li);
  /*
    if(ListType == 2) // a list of symbols
    {
      SymbolListDest = "symb";
      ListType = 0;
    }
    else SymbolListDest = "pfilelist"; // a list of projects
    showSymbolList();
    */
 }

let testrss ="<?xml version=\"1.0\"?>\
<rss version=\"2.0\">\
<channel>\
<item>\
<title>Ground</title>\
<link>gnd</link>\
<description>A chassis ground symbol.</description>\
</item>\
<item>\
<title>Resistor</title>\
<link>resistor</link>\
<description>A generic resistor symbol.</description>\
</item>\
<item>\
<title>Capacitor</title>\
<link>capacitor</link>\
<description>A generic capacitor symbol.</description>\
</item>\
<item>\
<title>Inductor</title>\
<link>inductor</link>\
<description>A generic inductor symbol.</description>\
</item>\
<item>\
<title>NPN Transistor</title>\
<link>npn</link>\
<description>A generic NPN transistor symbol.</description>\
</item>\
<item>\
<title>PNP Transistor</title>\
<link>pnp</link>\
<description>A generic PNP transistor symbol.</description>\
</item>\
<item>\
<title>Diode</title>\
<link>eo_diode</link>\
<description>A generic diode.</description>\
</item>\
<item>\
<title>Power / Voltage Bus</title>\
<link>pwr</link>\
<description>A generic power symbol.</description>\
</item>\
<item>\
<title>Nand Gate - 2 input</title>\
<link>testgate</link>\
<description>A generic 2 input NAND gate.</description>\
</item>\
<item>\
<title>Net Stub Input Left</title>\
<link>eo_offsheet_in</link>\
<description>A net stub for a left side input</description>\
</item>\
<item>\
<title>Net Stub Input Right</title>\
<link>eo_offsheetinb</link>\
<description>A net stub for a right side input.</description>\
</item>\
<item>\
<title>Net Stub Output Right</title>\
<link>eo_offsheetout</link>\
<description>A net stub for a right side output.</description>\
</item>\
<item>\
<title>Net Stub Output Left</title>\
<link>eo_offsheetoutb</link>\
<description>A net stub for a left side output.</description>\
</item>\
<item>\
<title>Net Stub InOut Left</title>\
<link>eo_offsheetiol</link>\
<description>A net stub for a left side inout.</description>\
</item>\
<item>\
<title>Net Stub InOut Right</title>\
<link>eo_offsheetior</link>\
<description>A net stub for a right side inout.</description>\
</item>\
<item>\
<title>Input Port</title>\
<link>eo_input_port</link>\
<description>A VHDL input port.</description>\
</item>\
<item>\
<title>Output Port</title>\
<link>eo_output_port</link>\
<description>A VHDL output port.</description>\
</item>\
<item>\
<title>Inout Port</title>\
<link>eo_inoput_port</link>\
<description>A VHDL input/output port.</description>\
</item>\
";

let fprss ="<?xml version=\"1.0\"?>\
<rss version=\"2.0\">\
<channel>\
<item>\
<title>Via 31_14</title>\
<link>via31_14</link>\
<description>Via 31 mil ring, 14 mil hole, may be filled</description>\
</item>\
<item>\
<title>Via 56_29</title>\
<link>via56_29</link>\
<description>Via 56 mil ring, 29 mil hole</description>\
</item>\
<item>\
<title>Hole 240 141</title>\
<link>via240_141</link>\
<description>Hole 240 mil ring, 141 mil hole</description>\
</item>\
<item>\
<title>0201</title>\
<link>eo0201</link>\
<description>eo0201 2 pin</description>\
</item>\
<item>\
<title>0402</title>\
<link>eo0402</link>\
<description>eo0402 2 pin</description>\
</item>\
<item>\
<title>0603</title>\
<link>eo0603</link>\
<description>eo0603 2 pin</description>\
</item>\
<item>\
<title>0805</title>\
<link>eo0805</link>\
<description>eo0805 2 pin</description>\
</item>\
<item>\
<title>1206</title>\
<link>eo1206</link>\
<description>eo1206 2 pin</description>\
</item>\
<item>\
<title>2 pin 300 mils</title>\
<link>eo2pin300</link>\
<description>through hole, 2 pins 300 mils apart</description>\
</item>\
<item>\
<title>SOT23</title>\
<link>fpsot23</link>\
<description>SOT23 3 pin transistor</description>\
</item>\
<item>\
<title>SOT223</title>\
<link>fpsot223</link>\
<description>SOT223 4 pin transistor</description>\
</item>\
<item>\
<title>T0-92 in-line</title>\
<link>eoTO92a</link>\
<description>T0-92 transistor in-line 0.1 inch; form 2 leads</description>\
</item>\
<item>\
<title>T0-18</title>\
<link>eoT018</link>\
<description>T0-18 transistor; can be used with T0-92 with 1 formed lead</description>\
</item>\
<item>\
<title>T0-220 with hole</title>\
<link>eoT0220wH</link>\
<description>T0-220 transistor with hole</description>\
</item>\
</channel>\
";

let eo_input_port = "v 20110115 2\r\n\
T 0 300 5 10 0 0 0 0 1\r\n\
device=VHDL_INPUT_PORT\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
refdes=JPORT?\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
labelissignal=true\r\n\
P 600 100 800 100 1 0 1\r\n\
{\r\n\
T 50 100 5 10 1 1 0 0 1\r\n\
pinlabel=\r\n\
T 600 100 5 10 0 1 0 0 1\r\n\
pintype=out\r\n\
T 450 50 5 6 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 450 50 5 6 0 0 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
L 0 200 0 0 3 0 0 0 -1 -1\r\n\
L 0 200 500 200 3 0 0 0 -1 -1\r\n\
L 500 200 600 100 3 0 0 0 -1 -1\r\n\
L 600 100 500 0 3 0 0 0 -1 -1\r\n\
L 500 0 0 0 3 0 0 0 -1 -1\r\n\
";

let eo_output_port = "v 20110115 2\r\n\
T 100 300 5 10 0 0 0 0 1\r\n\
device=VHDL_OUTPUT_PORT\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
refdes=JPORT?\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
labelissignal=true\r\n\
P 0 100 200 100 1 0 0\r\n\
{\r\n\
T 230 100 5 10 1 1 0 0 1\r\n\
pinlabel=\r\n\
T 0 100 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 250 50 5 6 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 250 50 5 6 0 0 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
L 200 200 200 0 3 0 0 0 -1 -1\r\n\
L 200 200 700 200 3 0 0 0 -1 -1\r\n\
L 700 200 800 100 3 0 0 0 -1 -1\r\n\
L 800 100 700 0 3 0 0 0 -1 -1\r\n\
L 700 0 200 0 3 0 0 0 -1 -1\r\n\
";

let eo_inout_port = "v 20110115 2\r\n\
T 200 600 5 10 0 0 0 0 1\r\n\
device=VHDL_INOUT_PORT\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
refdes=JPORT?\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
labelissignal=true\r\n\
P 0 100 200 100 1 0 0\r\n\
{\r\n\
T 150 150 5 10 0 1 0 6 1\r\n\
pinnumber=1\r\n\
T 300 100 9 10 1 1 0 0 1\r\n\
pinlabel=\r\n\
T 250 450 5 10 0 0 0 0 1\r\n\
pinseq=1\r\n\
T 250 350 5 10 0 0 0 0 1\r\n\
pintype=io\r\n\
}\r\n\
L 700 200 800 100 3 0 0 0 -1 -1\r\n\
L 800 100 700 0 3 0 0 0 -1 -1\r\n\
L 200 100 300 0 3 0 0 0 -1 -1\r\n\
L 300 200 200 100 3 0 0 0 -1 -1\r\n\
L 300 200 700 200 3 0 0 0 -1 -1\r\n\
L 300 0 700 0 3 0 0 0 -1 -1\r\n\
";

let pwr ="v 20031231 1\r\n\
P 200 0 200 200 1 0 0\r\n\
{\r\n\
T 250 50 5 6 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 250 50 5 6 0 0 0 0 1\r\n\
pinseq=1\r\n\
T 250 50 5 6 0 1 0 0 1\r\n\
pinlabel=PWR\r\n\
T 250 50 5 6 0 1 0 0 1\r\n\
pintype=pwr\r\n\
}\r\n\
L 50 200 350 200 3 0 0 0 -1 -1\r\n\
T 300 0 8 8 0 0 0 0 1\r\n\
net=PWR:1\r\n\
T 75 250 9 8 1 1 0 0 1\r\n\
name=PWR\r\n\
";

let gnd = "v 20031231 1\r\n\
P 200 300 200 100 1 0 0\r\n\
{\r\n\
T 500 850 5 6 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 500 850 5 6 0 0 0 0 1\r\n\
pinseq=1\r\n\
T 500 850 5 6 0 1 0 0 1\r\n\
pintype=pwr\r\n\
}\r\n\
L 50 100 350 100 3 0 0 0 -1 -1\r\n\
L 350 100 300 0 3 0 0 0 -1 -1\r\n\
L 200 100 150 0 3 0 0 0 -1 -1\r\n\
L 50 100 0 0 3 0 0 0 -1 -1\r\n\
T 300 200 5 8 0 1 0 0 1\r\n\
net=GND:1\r\n\
T 300 200 5 8 0 1 0 0 1\r\n\
device=GND\r\n\
";

let capacitor = "v 20080706 1\r\n\
P 200 0 200 200 1 0 0\r\n\
{\r\n\
T 150 100 5 8 0 1 90 0 1\r\n\
pinnumber=2\r\n\
T 150 100 5 8 0 1 90 0 1\r\n\
pinlabel=n\r\n\
T 150 100 5 8 0 0 90 0 1\r\n\
pinseq=2\r\n\
T 150 100 5 8 0 0 90 0 1\r\n\
pintype=pas\r\n\
}\r\n\
P 200 500 200 300 1 0 0\r\n\
{\r\n\
T 150 400 5 8 0 1 90 0 1\r\n\
pinnumber=1\r\n\
T 150 500 5 8 0 1 90 0 1\r\n\
pinlabel=p\r\n\
T 150 500 5 8 0 0 90 0 1\r\n\
pinseq=1\r\n\
T 150 500 5 8 0 0 90 0 1\r\n\
pintype=pas\r\n\
T 300 350 9 10 0 1 0 0 1\r\n\
altlabel=+\r\n\
}\r\n\
L 100 200 300 200 3 0 0 0 -1 -1\r\n\
L 100 270 300 270 3 0 0 0 -1 -1\r\n\
L 200 500 200 270 3 0 0 0 -1 -1\r\n\
L 200 0 200 200 3 0 0 0 -1 -1\r\n\
T -400 500 5 10 0 0 0 0 1\r\n\
spicetype=C\r\n\
T -100 0 8 10 1 1 0 0 1\r\n\
refdes=C?\r\n\
T -100 -150 8 10 1 1 0 0 1\r\n\
value=1uF\r\n\
T 500 200 8 10 0 1 0 0 1\r\n\
device=CAPACITOR\r\n\
";

let pnp = "v 20110115 2\r\n\
T 50 0 5 10 1 1 0 0 1\r\n\
device=PNP\r\n\
T 50 150 8 10 1 1 0 0 1\r\n\
refdes=Q?\r\n\
T 600 1100 8 10 0 0 0 0 1\r\n\
description=PNP transistor\r\n\
T 600 1500 8 10 0 0 0 0 1\r\n\
numslots=0\r\n\
P 600 1000 600 700 1 0 0\r\n\
{\r\n\
T 527 856 5 6 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 641 843 5 6 0 0 0 0 1\r\n\
pinseq=1\r\n\
T 659 938 5 10 0 1 0 0 1\r\n\
pintype=pas\r\n\
T 335 841 5 10 0 1 0 0 1\r\n\
pinlabel=C\r\n\
}\r\n\
P 600 300 600 0 1 0 1\r\n\
{\r\n\
T 500 50 5 6 0 1 0 0 1\r\n\
pinnumber=3\r\n\
T 635 58 5 6 0 0 0 0 1\r\n\
pinseq=3\r\n\
T 693 143 5 10 0 1 0 0 1\r\n\
pintype=pas\r\n\
T 387 18 5 10 0 1 0 0 1\r\n\
pinlabel=E\r\n\
}\r\n\
V 500 501 316 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
L 600 300 400 400 3 0 0 0 -1 -1\r\n\
L 600 700 400 600 3 0 0 0 -1 -1\r\n\
L 400 700 400 300 3 0 0 0 -1 -1\r\n\
P 0 500 184 500 1 0 0\r\n\
{\r\n\
T 100 550 5 6 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 71 545 5 6 0 0 90 0 1\r\n\
pinseq=2\r\n\
T 83 168 5 10 0 1 90 0 1\r\n\
pintype=pas\r\n\
T 124 667 5 10 0 1 0 0 1\r\n\
pinlabel=B\r\n\
}\r\n\
L 400 500 184 500 3 0 0 0 -1 -1\r\n\
L 400 400 470 300 3 0 0 0 -1 -1\r\n\
L 400 400 500 400 3 0 0 0 -1 -1\r\n\
";

let npn = "v 20110115 2\r\n\
T 50 0 5 10 1 1 0 0 1\r\n\
device=NPN\r\n\
T 50 150 8 10 1 1 0 0 1\r\n\
refdes=Q?\r\n\
T 600 1100 8 10 0 0 0 0 1\r\n\
description=NPN transistor\r\n\
P 600 1000 600 700 1 0 0\r\n\
{\r\n\
T 500 850 5 6 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 500 850 5 6 0 0 0 0 1\r\n\
pinseq=1\r\n\
T 500 850 5 6 0 1 0 0 1\r\n\
pinlabel=C\r\n\
T 500 850 5 6 0 1 0 0 1\r\n\
pintype=pas\r\n\
}\r\n\
P 600 300 600 0 1 0 1\r\n\
{\r\n\
T 500 50 5 6 0 1 0 0 1\r\n\
pinnumber=3\r\n\
T 500 50 5 6 0 0 0 0 1\r\n\
pinseq=3\r\n\
T 500 50 5 6 0 1 0 0 1\r\n\
pinlabel=E\r\n\
T 500 50 5 6 0 1 0 0 1\r\n\
pintype=pas\r\n\
}\r\n\
V 500 500 300 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
L 600 300 400 400 3 0 0 0 -1 -1\r\n\
L 600 700 400 600 3 0 0 0 -1 -1\r\n\
L 400 700 400 300 3 0 0 0 -1 -1\r\n\
P 0 500 184 500 1 0 0\r\n\
{\r\n\
T 100 550 5 6 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 100 550 5 6 0 0 0 0 1\r\n\
pinseq=2\r\n\
T 100 550 5 6 0 1 0 0 1\r\n\
pinlabel=B\r\n\
T 100 550 5 6 0 1 0 0 1\r\n\
pintype=pas\r\n\
}\r\n\
L 400 500 184 500 3 0 0 0 -1 -1\r\n\
L 600 300 564 400 3 0 0 0 -1 -1\r\n\
L 600 300 500 300 3 0 0 0 -1 -1\r\n\
";


let eo_offsheetin = "v 20110115 2\r\n\
T 0 -150 5 10 0 1 0 0 1\r\n\
device=offsheetin\r\n\
P 100 0 300 0 1 0 1\r\n\
{\r\n\
T 250 200 5 10 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T -250 0 5 10 1 1 0 6 1\r\n\
pinlabel= NC\r\n\
T 0 200 5 10 0 1 0 0 1\r\n\
pintype=io\r\n\
T 0 200 5 10 0 1 0 0 1\r\n\
pinseq=1\r\n\
T 0 200 5 10 0 1 0 0 1\r\n\
labelissignal=true\r\n\
}\r\n\
L 0 40 100 0 3 3 0 0 0 0\r\n\
L 100 0 0 -40 3 3 0 0 0 0\r\n\
T -250 150 5 10 0 1 0 6 1\r\n\
net=OPEN:1\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
description=Offsheet signal pin right, arrow in.\r\n\
";

let inductor = "v 20110115 2\r\n\
T 100 -175 5 10 0 1 0 0 1\r\n\
device=INDUCTOR\r\n\
T -200 -50 5 10 1 1 0 0 1\r\n\
refdes=L?\r\n\
T -200 -175 5 10 1 1 0 0 1\r\n\
value=1 uH\r\n\
A 137 100 37 0 180 3 0 0 0 -1 -1\r\n\
A 213 100 38 0 180 3 0 0 0 -1 -1\r\n\
A 289 100 37 0 180 3 0 0 0 -1 -1\r\n\
A 365 100 38 0 180 3 0 0 0 -1 -1\r\n\
P 0 100 100 100 1 0 0\r\n\
{\r\n\
T 50 100 5 10 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 250 100 5 10 0 1 0 0 1\r\n\
pinlabel=P_1\r\n\
T 0 100 5 10 0 1 0 0 1\r\n\
pintype=pas\r\n\
T 0 100 5 10 0 1 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
P 400 100 500 100 1 0 1\r\n\
{\r\n\
T 350 100 5 10 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 50 100 5 10 0 1 0 0 1\r\n\
pinlabel=P_2\r\n\
T 0 100 5 10 0 1 0 0 1\r\n\
pintype=pas\r\n\
T 0 100 5 10 0 1 0 0 1\r\n\
pinseq=2\r\n\
}\r\n\
";

let eo_offsheetoutb = "v 20110115 2\r\n\
T 0 -150 5 10 0 1 0 0 1\r\n\
device=offsheetoutb\r\n\
P 0 0 300 0 1 0 1\r\n\
{\r\n\
T 250 200 5 10 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T -250 0 5 10 1 1 0 6 1\r\n\
pinlabel=NC\r\n\
T 0 200 5 10 0 1 0 0 1\r\n\
pintype=io\r\n\
T 0 200 5 10 0 1 0 0 1\r\n\
pinseq=1\r\n\
T 0 200 5 10 0 1 0 0 1\r\n\
labelissignal=true\r\n\
}\r\n\
L 0 0 100 40 3 3 0 0 0 0\r\n\
L 100 -40 0 0 3 3 0 0 0 0\r\n\
T -250 150 5 10 0 1 0 6 1\r\n\
net=OPEN:1\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
description=Offsheet signal pin right, arrow out.\r\n\
";

let eo_offsheetout = "v 20110115 2\r\n\
T 0 -150 5 10 0 1 0 0 1\r\n\
device=offsheetout\r\n\
P 0 0 300 0 1 0 0\r\n\
{\r\n\
T 50 200 5 10 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 450 0 5 10 1 1 0 0 1\r\n\
pinlabel=NC\r\n\
T 0 200 5 10 0 1 0 0 1\r\n\
pintype=io\r\n\
T 0 200 5 10 0 1 0 0 1\r\n\
pinseq=1\r\n\
T 0 200 5 10 0 1 0 0 1\r\n\
labelissignal=true\r\n\
}\r\n\
L 300 0 200 40 3 3 0 0 0 0\r\n\
L 300 0 200 -40 3 3 0 0 0 0\r\n\
T 450 50 5 10 0 1 0 0 1\r\n\
net=OPEN:1\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
description=Offsheet signal arrow pin left, arrow out.\r\n\
";

let eo_offsheetinb = "v 20110115 2\r\n\
T 0 -150 5 10 0 1 0 0 1\r\n\
device=offsheetinb\r\n\
P 0 0 200 0 1 0 0\r\n\
{\r\n\
T 50 200 5 10 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 450 0 5 10 1 1 0 0 1\r\n\
pinlabel=NC\r\n\
T 0 200 5 10 0 1 0 0 1\r\n\
pintype=io\r\n\
T 0 200 5 10 0 1 0 0 1\r\n\
pinseq=1\r\n\
T 0 200 5 10 0 1 0 0 1\r\n\
labelissignal=true\r\n\
}\r\n\
L 300 40 200 0 3 3 0 0 0 0\r\n\
L 300 -40 200 0 3 3 0 0 0 0\r\n\
T 450 150 5 10 0 1 0 0 1\r\n\
net=OPEN:1\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
description=Offsheet signal arrow pin left, arrow in.\r\n\
";

let eo_offsheetior = "v 20110115 2\r\n\
T 0 -150 5 10 0 1 0 0 1\r\n\
device=offsheetior\r\n\
P 0 0 100 0 1 0 0\r\n\
{\r\n\
T 50 200 5 10 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 450 0 5 10 1 1 0 0 1\r\n\
pinlabel=NC\r\n\
T 0 200 5 10 0 1 0 0 1\r\n\
pintype=io\r\n\
T 0 200 5 10 0 1 0 0 1\r\n\
pinseq=1\r\n\
T 0 200 5 10 0 1 0 0 1\r\n\
labelissignal=true\r\n\
}\r\n\
L 300 0 200 40 3 3 0 0 0 0\r\n\
L 300 0 200 -40 3 3 0 0 0 0\r\n\
L 100 0 200 40 3 3 0 0 0 0\r\n\
L 100 0 200 -40 3 3 0 0 0 0\r\n\
T 450 50 5 10 0 1 0 0 1\r\n\
net=OPEN:1\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
description=Offsheet inout signal arrow pin left.\r\n\
";

let eo_offsheetiol = "v 20110115 2\r\n\
T 0 -150 5 10 0 1 0 0 1\r\n\
device=offsheetiol\r\n\
P 200 0 300 0 1 0 1\r\n\
{\r\n\
T 250 200 5 10 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T -250 0 5 10 1 1 0 6 1\r\n\
pinlabel=NC\r\n\
T 0 200 5 10 0 1 0 0 1\r\n\
pintype=io\r\n\
T 0 200 5 10 0 1 0 0 1\r\n\
pinseq=1\r\n\
T 0 200 5 10 0 1 0 0 1\r\n\
labelissignal=true\r\n\
}\r\n\
L 0 0 100 40 3 3 0 0 0 0\r\n\
L 100 -40 0 0 3 3 0 0 0 0\r\n\
L 200 0 100 40 3 3 0 0 0 0\r\n\
L 100 -40 200 0 3 3 0 0 0 0\r\n\
T -250 150 5 10 0 1 0 6 1\r\n\
net=OPEN:1\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
description=Offsheet inout signal pin right.\r\n\
";

let eo_diode ="v 20031231 1\r\n\
L 200 200 200 0 3 0 0 0 -1 -1\r\n\
L 200 200 400 100 3 0 0 0 -1 -1\r\n\
T 500 300 5 10 1 1 0 0 1\r\n\
device=DIODE\r\n\
L 200 0 400 100 3 0 0 0 -1 -1\r\n\
L 400 200 400 0 3 0 0 0 -1 -1\r\n\
P 0 100 200 100 1 0 0\r\n\
{\r\n\
T 50 250 5 8 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 50 250 5 8 0 0 0 0 1\r\n\
pinseq=1\r\n\
T 50 250 5 8 0 1 0 0 1\r\n\
pinlabel=A\r\n\
T 50 250 5 8 0 1 0 0 1\r\n\
pintype=pas\r\n\
}\r\n\
P 400 100 600 100 1 0 1\r\n\
{\r\n\
T 450 250 5 8 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 450 250 5 8 0 0 0 0 1\r\n\
pinseq=2\r\n\
T 450 250 5 8 0 1 0 0 1 \r\n\
pinlabel=K\r\n\
T 450 250 5 8 0 1 0 0 1\r\n\
pintype=pas\r\n\
}\r\n\
L 0 100 200 100 3 0 0 0 -1 -1\r\n\
L 400 100 600 100 3 0 0 0 -1 -1\r\n\
T 200 300 8 10 1 1 0 0 1\r\n\
refdes=D?\r\n\
";


let testgate ="v 20110115 2\r\n\
T 500 700 5 10 1 1 0 0 1\r\n\
refdes=U?\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
logicfunction=NAND_2\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
device=gnand2\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
primitive=true\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
model=simlib\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
Td=3 ns\r\n\
V 1050 300 50 6 0 0 0 -1 -1 0 0 -1 -1 -1 -1\r\n\
L 300 0 700 0 3 0 0 0 -1 -1\r\n\
L 300 0 300 600 3 0 0 0 -1 -1\r\n\
L 300 600 700 600 3 0 0 0 -1 -1\r\n\
A 700 300 300 270 180 3 0 0 0 -1 -1\r\n\
P 1100 300 1300 300 1 0 1\r\n\
{\r\n\
T 1100 300 5 10 0 1 0 0 1\r\n\
pinnumber=3\r\n\
T 1100 300 5 10 0 1 0 0 1\r\n\
pinlabel=Y\r\n\
T 1100 300 5 10 0 1 0 0 1\r\n\
pintype=out\r\n\
T 1100 300 5 10 0 1 0 0 1\r\n\
pinseq=3\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
comment=\r\n\
}\r\n\
P 0 500 300 500 1 0 0\r\n\
{\r\n\
T 0 500 5 10 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 0 500 5 10 0 1 0 0 1\r\n\
pinlabel=A\r\n\
T 0 500 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 500 5 10 0 1 0 0 1\r\n\
pinseq=1\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
comment=\r\n\
}\r\n\
P 0 100 300 100 1 0 0\r\n\
{\r\n\
T 0 100 5 10 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 0 100 5 10 0 1 0 0 1\r\n\
pinlabel=B\r\n\
T 0 100 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 100 5 10 0 1 0 0 1\r\n\
pinseq=2\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
comment=\r\n\
}\r\n\
";

let resistor = "v 20110115 2\r\n\
T 300 -175 5 10 0 1 0 0 1\r\n\
device=RES\r\n\
T -200 -50 5 10 1 1 0 0 1\r\n\
refdes=R?\r\n\
T -200 -175 5 10 1 1 0 0 1\r\n\
value=1K\r\n\
L 100 100 125 150 3 0 0 0 -1 -1\r\n\
L 175 50 125 150 3 0 0 0 -1 -1\r\n\
L 175 50 225 150 3 0 0 0 -1 -1\r\n\
L 275 50 225 150 3 0 0 0 -1 -1\r\n\
L 275 50 325 150 3 0 0 0 -1 -1\r\n\
L 375 50 325 150 3 0 0 0 -1 -1\r\n\
L 375 50 400 100 3 0 0 0 -1 -1\r\n\
P 0 100 100 100 1 0 0\r\n\
{\r\n\
T 50 100 5 10 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 250 100 5 10 0 1 0 0 1\r\n\
pinlabel=P_1\r\n\
T 0 100 5 10 0 1 0 0 1\r\n\
pintype=pas\r\n\
T 0 100 5 10 0 1 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
P 400 100 500 100 1 0 1\r\n\
{\r\n\
T 400 100 5 10 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 100 100 5 10 0 1 0 0 1\r\n\
pinlabel=P_2\r\n\
T 0 100 5 10 0 1 0 0 1\r\n\
pintype=pas\r\n\
T 0 100 5 10 0 1 0 0 1\r\n\
pinseq=2\r\n\
}\r\n\
";

let eo_titleA = "v 20110115 2\r\n\
T 10100 1500 5 10 0 0 0 0 1\r\n\
graphical=1\r\n\
T 500 300 5 10 1 1 0 0 1\r\n\
device=eo_title\r\n\
T 7650 250 15 8 1 1 0 0 1\r\n\
revision=REV:\r\n\
T 6450 250 15 8 1 1 0 0 1\r\n\
author=DRAWN BY:\r\n\
T 8850 250 15 8 1 1 0 0 1\r\n\
sheetnumber=SHEET 1 OF 2\r\n\
T 7650 100 15 8 1 1 0 0 1\r\n\
date=1/1/2020\r\n\
T 8175 500 15 16 1 1 0 4 1\r\n\
designname=Design_Name\r\n\
T 8175 800 15 16 1 1 0 4 1\r\n\
company=eightolives\r\n\
T 8175 1000 15 16 0 0 0 4 1\r\n\
copyright=copyright (c) 2026 eightolives\r\n\
B 0 0 10000 7500 15 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
B 6400 50 3550 950 15 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
L 6400 350 9950 350 15 0 0 0 -1 -1\r\n\
L 6400 650 9950 650 15 0 0 0 -1 -1\r\n\
L 7600 50 7600 350 15 0 0 0 -1 -1\r\n\
L 8800 50 8800 350 15 0 0 0 -1 -1\r\n\
L 7600 200 8800 200 15 0 0 0 -1 -1\r\n\
";
/*
//gnd_plane_signal=GND\r\n\
//T 8175 1200 15 16 0 0 0 4 1\r\n\
//power_plane_signal=P3R3V\r\n\
//T 900 100 8 10 1 1 0 0 1\r\n\
*/


let ProcessingSch = false;
let LastWasSch = false;

function FileParser(name)
{
  this.State = 0;
  this.tokens = [];
  this.tokensI = [];
  this.doj = [];
  this.attributes = [];
  this.lines = [];
  this.currentline = "";
  this.linepointer = 0;
  this.name = name;
  this.sym = null;
  this.objstack = [];
  this.offsetOff = false;
  this.xoffset = 0;
  this.yoffset = 0;
  if(this.name === undefined) this.name = "";
  else if((this.name.indexOf(".sch") != -1) || (this.name.indexOf(".sho") != -1))
  {
    ProcessingSch = true; 
    LastWasSch = true;
    SheetLoadErrors = false;
    if(!document.getElementById("autooffset").checked)
    {
      this.xoffset = Number(document.getElementById("xoffset").value);
      this.yoffset = Number(document.getElementById("yoffset").value);
    }
  }
  wobject = null;
//  report("objstack initial length = " + this.objstack.length);
}

FileParser.prototype.parse1 = function(s)
{
  let g = null;
  if(s.indexOf("EESchema Schematic") == 0)
  {
    report("Note: file is an EESchema Schematic ");
  }
  else   if(s.indexOf("EESchema-LIBRARY") == 0)
  {
    report("Note: file is an EESchema Library ");    
  }
  else
  {
    g = this.parsegeda(s);
  }
  
  return(g);
}
  
FileParser.prototype.parsegeda = function(s)
{
//  report("FP parse1");
  this.sym = null;
  if(this.name.indexOf(".sch") != -1) 
  {
      ProcessingSch = true;
  }
  else
  {
    this.sym = new DComponent(de, 0, 0, 1, 0, 0, this.name);
    this.objstack.push(this.sym);
  }
  this.lines = s.split("\n");
  let k = this.lines.length;
  this.currentline = "";
  this.linepointer = 0;
  while(this.linepointer < k)
  {
    let z = this.tokens.length;
    let j = 0;
    if(z > 0)
    {
      for(j = z-1; j >= 0; j --)
      {
	
      }
    }
    
    let re = /[ ,]/;
    this.tokens = this.lines[this.linepointer].split(re);
    this.tokens[this.tokens.length - 1] = this.tokens[this.tokens.length - 1].trim();
    this.tokensI = this.tokens;
    this.currentline = this.lines[this.linepointer];
    this.nextState2();
    this.linepointer +=1;
  }
  if(this.name.indexOf(".sch") != -1)
  {
    ProcessingSch = false;
    if(SheetLoadErrors) report("FileParser parse1 detected some symbols not automatically found");
  }
  return(this.sym);
}

FileParser.prototype.parsekicad = function(s, elink)
{
  report("FP parsekicad " + elink);
  this.elink = elink;
  this.sym = new DComponent(de, 0, 0, 1, 0, 0, elink);
  this.objstack.push(this.sym);
  this.lines = s.split("\n");
  let k = this.lines.length;
  this.currentline = "";
  this.linepointer = 0;
  while((this.linepointer < k) && (this.State != -1))
  {
    let z = this.tokens.length;
    let j = 0;
    if(z > 0)
    {
      for(j = z-1; j >= 0; j --)
      {
	
      }
    }
    
    let re = /[ ,]/;
    this.tokens = this.lines[this.linepointer].split(re);
    this.tokens[this.tokens.length - 1] = this.tokens[this.tokens.length - 1].trim();
    this.tokensI = this.tokens;
    this.currentline = this.lines[this.linepointer];
    this.nextState20();
    this.linepointer +=1;
   }
  return(this.sym);
}
	
FileParser.prototype.tokenIs = function(i, s)
{
let b = false;
if(i < this.tokens.length)
{
  if(this.tokens[i] == s)
  {
    b = true;
  }
}
return(b);
}


FileParser.prototype.addObject = function(o)
{
  if((o != null) && (this.objstack.length > 0))
  {
    if((o.klass == "DText") &&(o.isAttribute()))
    {
//      report("length before = " + this.objstack.length);
      let y = this.objstack.pop();
//      report("length after pop = " + this.objstack.length + " " + y.klass + " " + o.klass);
      y.addAttribute(o);
      this.objstack.push(y);
//      report("length after = " + this.objstack.length);
//     report("added attribute " + o.klass + " to " + y.klass);
//      this.objstack[this.objstack.length - 1].addAttribute(o);
//      report("added attribute " + o.klass + " to " + this.objstack[this.objstack.length - 1].klass);
    }
    else
    {
      let y = this.objstack.pop();
//      report("FP addObject " + o.klass + " to " + y.klass);
      y.addDrawingObject(o);
      this.objstack.push(y);
//      report("added " + o.klass + " to " + y.klass);
//     this.objstack[this.objstack.length - 1].addDrawingObject(o);
//      report("added " + o.klass + " to " + this.objstack[this.objstack.length - 1].klass);
    }
  }
  else report("error: " + this.currentline);
}

let workingobject = null;
let wobject = null;
let embedded = false;

// this processes one line
FileParser.prototype.nextState2 = function()
{
let x = null;
let i = 0;
//if(Debug) report("State = " + this.State);
switch(this.State)
{
case 0:
if(this.tokenIs(0, "#")) 
{
//  this.State = 0;
  this.name =  this.tokensI[1]; 
  if(this.name.indexOf(".sch") != -1) // is a schematic
  {
    ProcessingSch = true;
    LastWasSch = true;
    SheetLoadErrors = false;
  }
  else
  {
    if(ProcessingSch) 
    {
      report("1246 symbol after schematic");
//      this.sym = null;
//      this.objstack = [];
    }
    ProcessingSch = false;
//    LastWasSch = false;
  }
}
else if(this.tokenIs(0,"v"))
{
  // version
  if(this.name.indexOf(".sch") != -1) 
  {
    ProcessingSch = true;
    if(this.sym != null) // a concatenated sheet
    {
      report("1237 " + this.name + " " + this.sym.klass);
      let df = this.sym;
 //     openSheet1(df);
      return(df);
    }
    else
    {
    this.sym = new DComponent(de, 0, 0, 1, 0, 0, this.name);
    this.objstack.push(this.sym);
    }
  }
  else if(this.sym == null)
  {
    report("1269 this.sym == null " + this.name);
    this.sym = new DComponent(de, 0, 0, 1, 0, 0, this.name);
    this.objstack.push(this.sym);
      
  }
  else
  {
//    report("1281 " + this.name);
//    this.objstack.push(this.sym);  
    this.sym = new DComponent(de, 0, 0, 1, 0, 0, this.name);
    this.objstack.push(this.sym);
 }
  
}
else if(this.tokenIs(0,"A"))
{
  // arc
  this.State = 100;
//  if(makeTokensI(1, 11))
  {
    this.nextState2();
  }
}
else if(this.tokenIs(0,"B"))
{
  // box
  this.State = 200;
//  if(makeTokensI(1, 16))
  {
    this.nextState2();
  }
}
else if(this.tokenIs(0,"U"))
{
  // bus
  this.State = 300;
//  if(makeTokensI(1, 6))
  {
    this.nextState2();
  }
}
else if(this.tokenIs(0,"V"))
{
  //circle
  this.State = 400;
//  if(makeTokensI(1, 15))
  {
    this.nextState2();
  }
}
else if(this.tokenIs(0,"C"))
{
  // component
  this.State = 500;
//  if(makeTokensI(1, 5))
  {
    this.nextState2();
  }
}
else if(this.tokenIs(0,"L"))
{
  // line
  this.State = 600;
//  if(makeTokensI(1, 10))
  {
    this.nextState2();
  }
}
else if(this.tokenIs(0,"N"))
{
  // net
  this.State = 700;
//  if(makeTokensI(1, 5))
  {
    this.nextState2();
  }
}
else if(this.tokenIs(0,"H"))
{
  // path
  this.State = 800;
//  if(makeTokensI(1, 13))
  {
    this.nextState2();
  }
}
else if(this.tokenIs(0,"T"))
{
  // text
  this.State = 900;
//  if(makeTokensI(1, 9))
//    report("900 tokens length = " + this.tokens.length);
  {
    this.nextState2();
  }
}
else if(this.tokenIs(0,"P"))
{
  // pin
  this.State = 1000;
//  if(makeTokensI(1, 7))
//    report("1000 tokens length = " + this.tokens.length);
  {
    this.nextState2();
  }
}
else if(this.tokenIs(0,"G"))
{
  // picture
  this.State = 1100;
//  if(makeTokensI(1, 5))
     report("1100 tokens length = " + this.tokens.length);
 {
    this.nextState2();
  }
}
else if(this.tokenIs(0,"{"))
{
  this.offsetOff = true;
  this.objstack.push(this.doj[this.doj.length - 1]);
//  report("pushed onto stack " + this.doj[this.doj.length - 1].klass + " " + this.objstack.length);
  // attribute
//  this.State = 1200;
  this.State = 0;
}
else if(this.tokenIs(0,"}"))
{
  this.offsetOff = false;
  let y = this.objstack.pop();
  y.update();
//  report("poped from stack " + y.klass + " " + this.objstack.length);
  this.State = 0;
}
break;

	case 100: // arc
		let gl = Number(this.tokensI[4]) + Number(this.tokensI[5]);
		if(gl >= 360) gl -= 360;
		x = new DArc(de, Number(this.tokensI[1]) - this.xoffset, Number(this.tokensI[2]) - this.yoffset, this.tokensI[3],this.tokensI[4],this.tokensI[5],this.tokensI[6],this.tokensI[7],this.tokensI[8],this.tokensI[9],this.tokensI[10],this.tokensI[11]);
		this.doj[this.doj.length] = x;
		this.addObject(x);
		this.State = 0;
		break;
	case 200: // box
		x = new DBox(de, Number(this.tokensI[1]) - this.xoffset, Number(this.tokensI[2]) - this.yoffset,this.tokensI[3],this.tokensI[4],this.tokensI[5],this.tokensI[6],this.tokensI[7],this.tokensI[8],this.tokensI[9],this.tokensI[10],this.tokensI[11],this.tokensI[12],this.tokensI[13],this.tokensI[14],this.tokensI[15],this.tokensI[16]);
		this.doj[this.doj.length] = x;
		this.addObject(x);
		this.State = 0;
		break;
	case 300: // bus
		x = new DBus(de, Number(this.tokensI[1]) - this.xoffset, Number(this.tokensI[2]) - this.yoffset, Number(this.tokensI[3]) - this.xoffset, Number(this.tokensI[4]) - this.yoffset,this.tokensI[5],this.tokensI[6]);
		this.doj[this.doj.length] = x;
		this.addObject(x);
		this.State = 0;
		break;
	case 400: // circle
		x = new DCircle(de, Number(this.tokensI[1]) - this.xoffset, Number(this.tokensI[2]) - this.yoffset,this.tokensI[3],this.tokensI[4],this.tokensI[5],this.tokensI[6],this.tokensI[7],this.tokensI[8],this.tokensI[9],this.tokensI[10],this.tokensI[11],this.tokensI[12],this.tokensI[13],this.tokensI[14],this.tokensI[15]);
		this.doj[this.doj.length] = x;
		this.addObject(x);
		this.State = 0;
		break;
	case 500: // component 
		if(this.tokensI[6].indexOf("title") != -1)
		{
		  if(document.getElementById("autooffset").checked)
		  {
		    this.xoffset = Number(this.tokensI[1]) - 500;
		    this.yoffset = Number(this.tokensI[2]) - 500;
		  }
		}
		let ddc = new DComponent(de, Number(this.tokensI[1]) - this.xoffset, Number(this.tokensI[2]) - this.yoffset,this.tokensI[3],this.tokensI[4],this.tokensI[5], this.tokensI[6]);
		let fs = new FindSymbol(this.tokensI[6], PROJECT_LIB, ddc);
                FindSymbol.addToFindQueue(fs);
//		fs.start();
		this.doj[this.doj.length] = ddc;
		this.addObject(ddc);
		this.State = 0;
		break;
	case 600: // line
		x = new DLine(de, Number(this.tokensI[1]) - this.xoffset, Number(this.tokensI[2]) - this.yoffset, Number(this.tokensI[3]) - this.xoffset, Number(this.tokensI[4]) - this.yoffset,this.tokensI[5],this.tokensI[6],this.tokensI[7],this.tokensI[8],this.tokensI[9],this.tokensI[10]);
		this.doj[this.doj.length] = x;
		this.addObject(x);
		this.State = 0;
		break;
	case 700: // net
		x = new DNet(de, Number(this.tokensI[1]) - this.xoffset, Number(this.tokensI[2]) - this.yoffset, Number(this.tokensI[3]) - this.xoffset, Number(this.tokensI[4]) - this.yoffset,this.tokensI[5]);
		this.doj[this.doj.length] = x;
		this.addObject(x);
		this.State = 0;
		break;
	case 800: // path 
		x = new DPath(de, this.tokensI[1],this.tokensI[2],this.tokensI[3],this.tokensI[4],this.tokensI[5],this.tokensI[6],this.tokensI[7],this.tokensI[8],this.tokensI[9],this.tokensI[10],this.tokensI[11],this.tokensI[12],this.tokensI[13],this.tokensI[14],this.tokensI[15]);
		wobject = x;
		this.State = 801;
		break;
	case 801: // lines of path
		if((this.tokens[0] == "z") || (this.tokens[0] == "Z") )
		{
		  x = wobject;
		  x.addLineSegment(x.getX(), x.getY());
		  report("801 closePath");
		  x.closePath();
		  this.doj[this.doj.length] = x;
		  this.addObject(x);
		  this.State = 0;
		}
		else if((this.tokens[0] == "M") || (this.tokens[0] == "m"))
		{
		  x = wobject;
		  x.setX(Number(this.tokens[1]) - this.xoffset);
		  x.setY(Number(this.tokens[2]) - this.yoffset);
		}
		else if((this.tokens[0] == "L") || (this.tokens[0] == "l"))
		{
		  x = wobject;
		  x.addLineSegment(Number(this.tokens[1]) - this.xoffset, Number(this.tokens[2]) - this.yoffset);			
		}
		else if((this.tokens[0] == "A") || (this.tokens[0] == "a"))
		{
		  report("FP error 801 " + this.tokens[0]);
		  x = wobject;
//TODO						
		}
		else if((this.tokens[0] == "B") || (this.tokens[0] == "b"))
		{
		  report("FP error 801 " + this.tokens[0]);
		  x = wobject;
//TODO						
		}
		else 
		{
		  report("FP error 801 " + this.tokens[0]);
			this.State = 0;
		}
		break;
	case 900: // text
//		report("case 900");
		let vs = [];
		let num_lines = this.tokensI[9];
		let t = null;
		let km = 0;
		let att = false;
		for(i = 0; i < num_lines; i++)
		{
		  this.linepointer += 1;
		  t = this.lines[this.linepointer];
		  if((km = t.indexOf("=")) != -1)
		  {
		    att = true;
		  }
		  vs[vs.length] = t;
		}
		let xo = this.xoffset;
		let yo = this.yoffset;
		if(this.offsetOff)
		{
		  xo = 0;
		  yo = 0;
		}
		if(att)
		{
		  let name = t.substring(0,km).trim();
		  let value = t.substring(km+1).trim();
		  let tt = -1;
		  if(this.attributes.length != 0) 
		  {
		    tt = getAttributeIndex(name, this);
		  }
//		  report("eo_s3 parser 900 defines attribute " + name + "=" + value);
		  let newt = new DText(de, Number(this.tokensI[1]) - xo, Number(this.tokensI[2]) - yo,this.tokensI[3],this.tokensI[4],this.tokensI[5],this.tokensI[6],this.tokensI[7],this.tokensI[8],this.tokensI[9], vs);
		  newt.name = name;
		  newt.value = value;
		  
		  this.addObject(newt);
		  if( tt == -1)
		  {
		  this.attributes[this.attributes.length] = newt;
		  }
		  else
		  {
		   this.attributes[tt] = newt;
		  }
		  if(workingobject != null) workingobject.update();
		}
		else
		{
		  report("1561 DText text = " + vs[0]);
		  x = new DText(de, Number(this.tokensI[1]) - xo, Number(this.tokensI[2]) - yo,this.tokensI[3],this.tokensI[4],this.tokensI[5],this.tokensI[6],this.tokensI[7],this.tokensI[8],this.tokensI[9],vs);
		  this.doj[this.doj.length] = x;
		  this.addObject(x);
		}
		this.State = 0;
		break;
	case 1000: // pin
//		alert("e3 pin " + this.tokensI[1] + " " + this.tokensI[2] + " " + this.tokensI[3] + " " + this.tokensI[4] + " " + this.tokensI[5] + " " + this.tokensI[6] + " " + this.tokensI[7]);
		workingobject = new DPin(de, Number(this.tokensI[1]) - this.xoffset, Number(this.tokensI[2]) - this.yoffset, Number(this.tokensI[3]) - this.xoffset, Number(this.tokensI[4]) - this.yoffset,this.tokensI[5],this.tokensI[6],this.tokensI[7], 10);
		this.doj[this.doj.length] = workingobject;
		this.addObject(workingobject);
		this.State = 0;
		break;
	case 1100: // picture 
		x = new DPicture(de, Number(this.tokensI[1]) - this.xoffset, Number(this.tokensI[2]) - this.yoffset,this.tokensI[3],this.tokensI[4],this.tokensI[5],this.tokensI[6],this.tokensI[7]);
		wobject = x;
		if(this.tokensI[7] == "1") 
		{
		  embedded = true;
		  this.State = 1110;
		}
		else 
		{
		  embedded = false;
		  this.State = 1101;
		}
		break;
	case 1101:
		wobject.load(this.tokensI[0]);
		this.doj[this.doj.length] = wobject;
		this.addObject(wobject);
		this.State = 0;
		break;
	case 1110:
		wobject.src = this.tokensI[0];
		wobject.startData();
		this.State = 1111;
		break;
	case 1111:
		if(this.tokensI[0] == ".") 
		{
		  wobject.endData();
		  this.doj[this.doj.length] = x;
		  this.addObject(x);
		  this.State = 0;
		}
		else
		{
		  wobject.addBase64Data(this.tokensI[0]);
		}
		break;
	case 1200: // attribute
		if(this.tokenIs(0,"T"))
		{
		  num_lines = 1;
//		  if(makeTokensI(1, 9))
		  {
				
		  }
		  let xo = this.xoffset;
		  let yo = this.yoffset;
		  if(this.offsetOff)
		  {
		    xo = 0;
		    yo = 0;
		  }
		  let vs = [];
		  this.linepointer += 1;
		  this.currentline = this.lines[this.linepointer];
//		  report("->" + this.lines[this.linepointer]);
		  let k = this.currentline.indexOf("=");
		  let name = "";
		  let value = "";
		  if(k != -1)
		  {
		    name = this.currentline.substring(0,k).trim();
		    value = this.currentline.substring(k+1).trim();
		    vs[vs.length] = this.currentline;
		  }
			/*
			int i = 1; 
			while(i < num_lines)
			{
				vs.add(fs.readLine());
				i += 1;
			}
			*/
//		    this.doj[this.doj.length - 1] = new DText(de, this.tokensI[1],this.tokensI[2],this.tokensI[3],this.tokensI[4],this.tokensI[5],this.tokensI[6],this.tokensI[7],this.tokensI[8],this.tokensI[9], name, value, vs);
		  let tt = getAttributeIndex(name, workingobject);
		  report("eo_s3 parser 1200 defines attribute " + name + "=" + value);
		  let newt = new DText(de, Number(this.tokensI[1]) - xo, Number(this.tokensI[2]) - yo,this.tokensI[3],this.tokensI[4],this.tokensI[5],this.tokensI[6],this.tokensI[7],this.tokensI[8],this.tokensI[9], vs);
		  newt.name = name;
		  newt.value = value;
		  this.addObject(newt);
		  addAttribute(newt, workingobject);
		  workingobject.update();
		  /*
		  if( tt == -1)
		  {
		  workingobject.attributes[workingobject.attributes.length] = newt;
		  }
		  else
		  {
		   workingobject.attributes[tt] = newt;
		  }
		  */
		  this.State = 0;
		}
		if(this.tokenIs(0,"}"))
		{
		    this.offsetOff = false;
			this.State = 0;
		}
		break;
	default:
		this.State = 0;
		break;
	}
}
	
FileParser.prototype.nextState20 = function()
{
let x = null;
let i = 0;
//if(Debug) report("State = " + this.State + " " + this.tokensI[0]);
switch(this.State)
{
case 0:
    let b = true;
//    while(b)
    {
      if(this.tokenIs(0,"DEF"))
      {
	report("DEF found " + this.tokensI[1] + " " + this.tokensI[0]);
	  if(this.tokensI[1] == this.elink)
	  {
	    report("DEF match found");
	    b = false;
	    if(this.tokensI[1].indexOf("~") == 0)
	    {
	      visible = false;
	    }
	    else visible = true;
	    if(this.tokensI[1].equalsIgnoreCase(alias)) 
	    {
	      b = false;
	//	dcomp = new DComponent(de, 0, 0, DComponent.SELECTABLE, 0, DComponent.NOT_MIRRORED, "NULL");
	      this.sym.setFilenameWithoutLoading(alias);
	      this.sym.setAttributeValue("device", name1);
	      if((this.tokensI[1].indexOf("~") == 0) || (this.tokensI[2].indexOf("~") == 0))
	      {
		this.sym.getAttribute("device").setVisibility(DrawingObject.VISIBILITY_INVISIBLE);
	      }
	      else
	      {
		this.sym.getAttribute("device").setVisibility(DrawingObject.VISIBILITY_VISIBLE);
	      }
	      let refdes = this.tokensI[2]; // ref
	      if(this.tokensI[2].equals("~")) ; // no refdes
	      else
	      {
		if(this.tokensI[2].indexOf("~") == 0)
		{
		  refdes = this.tokensI[2].substring(1);
		}
		if(refdes.length() == 1) refdes = refdes + "?";
		if(this.tokensI[7] > 1) refdes = refdes + "a";
		this.sym.setAttributeValue("refdes", refdes);
		this.sym.getAttribute("refdes").setVisibility(DrawingObject.VISIBILITY_VISIBLE);
	      }
	      if(!this.tokensI[3].equals("0")) report("DEF this.tokensI[3] not 0");
	      pinnameoffset = this.tokensI[4];
	      pinnumberssvisible = this.tokensI[5];
	      pinnamessvisible = this.tokensI[6];
	      numberofparts = this.tokensI[7];
	      usepart = 1;
	      if((!this.tokensIsa[7].equals("1")) && (!this.tokensI[7].equals("0")))
	      {
		this.sym.setAttributeValue("numslots", this.tokensI[7]);
		this.sym.setAttributeValue("slot", "1");
		useparts = prompt("Enter slot option 1 to " + this.tokensI[7] + ":", "1");
		if((useparts != null) && (!useparts.equals("")))
		{
		  usepart = useparts;
		}
	      }
	    }
	  }
	}

	
	
	
      }
      
/*
    
if(this.tokenIs(0,"v"))
{
  // version
}
else if(this.tokenIs(0,"A"))
{
  // arc
  this.State = 100;
//  if(makeTokensI(1, 11))
  {
    this.nextState2();
  }
}
else if(this.tokenIs(0,"B"))
{
  // box
  this.State = 200;
//  if(makeTokensI(1, 16))
  {
    this.nextState2();
  }
}
else if(this.tokenIs(0,"U"))
{
  // bus
  this.State = 300;
//  if(makeTokensI(1, 6))
  {
    this.nextState2();
  }
}
else if(this.tokenIs(0,"V"))
{
  //circle
  this.State = 400;
//  if(makeTokensI(1, 15))
  {
    this.nextState2();
  }
}
else if(this.tokenIs(0,"C"))
{
  // component
  this.State = 500;
//  if(makeTokensI(1, 5))
  {
    this.nextState2();
  }
}
else if(this.tokenIs(0,"L"))
{
  // line
  this.State = 600;
//  if(makeTokensI(1, 10))
  {
    this.nextState2();
  }
}
else if(this.tokenIs(0,"N"))
{
  // net
  this.State = 700;
//  if(makeTokensI(1, 5))
  {
    this.nextState2();
  }
}
else if(this.tokenIs(0,"H"))
{
  // path
  this.State = 800;
//  if(makeTokensI(1, 13))
  {
    this.nextState2();
  }
}
else if(this.tokenIs(0,"T"))
{
  // text
  this.State = 900;
//  if(makeTokensI(1, 9))
//    report("900 tokens length = " + this.tokens.length);
  {
    this.nextState2();
  }
}
else if(this.tokenIs(0,"P"))
{
  // pin
  this.State = 1000;
//  if(makeTokensI(1, 7))
//    report("1000 tokens length = " + this.tokens.length);
  {
    this.nextState2();
  }
}
else if(this.tokenIs(0,"G"))
{
  // picture
  this.State = 1100;
//  if(makeTokensI(1, 5))
     report("1100 tokens length = " + this.tokens.length);
 {
    this.nextState2();
  }
}
else if(this.tokenIs(0,"{"))
{
  this.offsetOff = true;
  this.objstack.push(this.doj[this.doj.length - 1]);
//  report("pushed onto stack " + this.doj[this.doj.length - 1].klass + " " + this.objstack.length);
  // attribute
//  this.State = 1200;
  this.State = 0;
}
else if(this.tokenIs(0,"}"))
{
  this.offsetOff = false;
  let y = this.objstack.pop();
  y.update();
//  report("poped from stack " + y.klass + " " + this.objstack.length);
  this.State = 0;
}
*/
break;

	case 100: // arc
		let gl = Number(this.tokensI[4]) + Number(this.tokensI[5]);
		if(gl >= 360) gl -= 360;
		x = new DArc(de, Number(this.tokensI[1]) - this.xoffset, Number(this.tokensI[2]) - this.yoffset, this.tokensI[3],this.tokensI[4],this.tokensI[5],this.tokensI[6],this.tokensI[7],this.tokensI[8],this.tokensI[9],this.tokensI[10],this.tokensI[11]);
		this.doj[this.doj.length] = x;
		this.addObject(x);
		this.State = 0;
		break;
	case 200: // box
		x = new DBox(de, Number(this.tokensI[1]) - this.xoffset, Number(this.tokensI[2]) - this.yoffset,this.tokensI[3],this.tokensI[4],this.tokensI[5],this.tokensI[6],this.tokensI[7],this.tokensI[8],this.tokensI[9],this.tokensI[10],this.tokensI[11],this.tokensI[12],this.tokensI[13],this.tokensI[14],this.tokensI[15],this.tokensI[16]);
		this.doj[this.doj.length] = x;
		this.addObject(x);
		this.State = 0;
		break;
	case 300: // bus
		x = new DBus(de, Number(this.tokensI[1]) - this.xoffset, Number(this.tokensI[2]) - this.yoffset, Number(this.tokensI[3]) - this.xoffset, Number(this.tokensI[4]) - this.yoffset,this.tokensI[5],this.tokensI[6]);
		this.doj[this.doj.length] = x;
		this.addObject(x);
		this.State = 0;
		break;
	case 400: // circle
		x = new DCircle(de, Number(this.tokensI[1]) - this.xoffset, Number(this.tokensI[2]) - this.yoffset,this.tokensI[3],this.tokensI[4],this.tokensI[5],this.tokensI[6],this.tokensI[7],this.tokensI[8],this.tokensI[9],this.tokensI[10],this.tokensI[11],this.tokensI[12],this.tokensI[13],this.tokensI[14],this.tokensI[15]);
		this.doj[this.doj.length] = x;
		this.addObject(x);
		this.State = 0;
		break;
	case 500: // component 
		if(this.tokensI[6].indexOf("title") != -1)
		{
		  if(document.getElementById("autooffset").checked)
		  {
		    this.xoffset = Number(this.tokensI[1]) - 500;
		    this.yoffset = Number(this.tokensI[2]) - 500;
		  }
		}
		let ddc = new DComponent(de, Number(this.tokensI[1]) - this.xoffset, Number(this.tokensI[2]) - this.yoffset,this.tokensI[3],this.tokensI[4],this.tokensI[5], this.tokensI[6]);
		let fs = new FindSymbol(this.tokensI[6], PROJECT_LIB, ddc);
                FindSymbol.addToFindQueue(fs);
//		fs.start();
		this.doj[this.doj.length] = ddc;
		this.addObject(ddc);
		this.State = 0;
		break;
	case 600: // line
		x = new DLine(de, Number(this.tokensI[1]) - this.xoffset, Number(this.tokensI[2]) - this.yoffset, Number(this.tokensI[3]) - this.xoffset, Number(this.tokensI[4]) - this.yoffset,this.tokensI[5],this.tokensI[6],this.tokensI[7],this.tokensI[8],this.tokensI[9],this.tokensI[10]);
		this.doj[this.doj.length] = x;
		this.addObject(x);
		this.State = 0;
		break;
	case 700: // net
		x = new DNet(de, Number(this.tokensI[1]) - this.xoffset, Number(this.tokensI[2]) - this.yoffset, Number(this.tokensI[3]) - this.xoffset, Number(this.tokensI[4]) - this.yoffset,this.tokensI[5]);
		this.doj[this.doj.length] = x;
		this.addObject(x);
		this.State = 0;
		break;
	case 800: // path 
		x = new DPath(de, this.tokensI[1],this.tokensI[2],this.tokensI[3],this.tokensI[4],this.tokensI[5],this.tokensI[6],this.tokensI[7],this.tokensI[8],this.tokensI[9],this.tokensI[10],this.tokensI[11],this.tokensI[12],this.tokensI[13],this.tokensI[14],this.tokensI[15]);
		wobject = x;
		this.State = 801;
		break;
	case 801: // lines of path
		if((this.tokens[0] == "z") || (this.tokens[0] == "Z") )
		{
		  x = wobject;
		  x.addLineSegment(x.getX(), x.getY());
		  report("801 closePath");
		  x.closePath();
		  this.doj[this.doj.length] = x;
		  this.addObject(x);
		  this.State = 0;
		}
		else if((this.tokens[0] == "M") || (this.tokens[0] == "m"))
		{
		  x = wobject;
		  x.setX(Number(this.tokens[1]) - this.xoffset);
		  x.setY(Number(this.tokens[2]) - this.yoffset);
		}
		else if((this.tokens[0] == "L") || (this.tokens[0] == "l"))
		{
		  x = wobject;
		  x.addLineSegment(Number(this.tokens[1]) - this.xoffset, Number(this.tokens[2]) - this.yoffset);			
		}
		else if((this.tokens[0] == "A") || (this.tokens[0] == "a"))
		{
		  report("FP error 801 " + this.tokens[0]);
		  x = wobject;
//TODO						
		}
		else if((this.tokens[0] == "B") || (this.tokens[0] == "b"))
		{
		  report("FP error 801 " + this.tokens[0]);
		  x = wobject;
//TODO						
		}
		else 
		{
		  report("FP error 801 " + this.tokens[0]);
			this.State = 0;
		}
		break;
	case 900: // text
//		report("case 900");
		let vs = [];
		let num_lines = this.tokensI[9];
		let t = null;
		let km = 0;
		let att = false;
		for(i = 0; i < num_lines; i++)
		{
		  this.linepointer += 1;
		  t = this.lines[this.linepointer];
		  if((km = t.indexOf("=")) != -1)
		  {
		    att = true;
		  }
		  vs[vs.length] = t;
		}
		let xo = this.xoffset;
		let yo = this.yoffset;
		if(this.offsetOff)
		{
		  xo = 0;
		  yo = 0;
		}
		if(att)
		{
		  let name = t.substring(0,km).trim();
		  let value = t.substring(km+1).trim();
		  let tt = -1;
		  if(this.attributes.length != 0) 
		  {
		    tt = getAttributeIndex(name, this);
		  }
		  let newt = new DText(de, Number(this.tokensI[1]) - xo, Number(this.tokensI[2]) - yo,this.tokensI[3],this.tokensI[4],this.tokensI[5],this.tokensI[6],this.tokensI[7],this.tokensI[8],this.tokensI[9], vs);
		  newt.name = name;
		  newt.value = value;
		  
		  this.addObject(newt);
		  if( tt == -1)
		  {
		  this.attributes[this.attributes.length] = newt;
		  }
		  else
		  {
		   this.attributes[tt] = newt;
		  }
		  if(workingobject != null) workingobject.update();
		}
		else
		{
//		  report("DText text = " + vs[0]);
		x = new DText(de, Number(this.tokensI[1]) - xo, Number(this.tokensI[2]) - yo,this.tokensI[3],this.tokensI[4],this.tokensI[5],this.tokensI[6],this.tokensI[7],this.tokensI[8],this.tokensI[9],vs);
		this.doj[this.doj.length] = x;
		this.addObject(x);
		}
		this.State = 0;
		break;
	case 1000: // pin
//		alert("e3 pin " + this.tokensI[1] + " " + this.tokensI[2] + " " + this.tokensI[3] + " " + this.tokensI[4] + " " + this.tokensI[5] + " " + this.tokensI[6] + " " + this.tokensI[7]);
		workingobject = new DPin(de, Number(this.tokensI[1]) - this.xoffset, Number(this.tokensI[2]) - this.yoffset, Number(this.tokensI[3]) - this.xoffset, Number(this.tokensI[4]) - this.yoffset,this.tokensI[5],this.tokensI[6],this.tokensI[7], 10);
		this.doj[this.doj.length] = workingobject;
		this.addObject(workingobject);
		this.State = 0;
		break;
	case 1100: // picture 
		x = new DPicture(de, Number(this.tokensI[1]) - this.xoffset, Number(this.tokensI[2]) - this.yoffset,this.tokensI[3],this.tokensI[4],this.tokensI[5],this.tokensI[6],this.tokensI[7]);
		wobject = x;
		if(this.tokensI[7] == "1") 
		{
		  embedded = true;
		  this.State = 1110;
		}
		else 
		{
		  embedded = false;
		  this.State = 1101;
		}
		break;
	case 1101:
		wobject.load(this.tokensI[0]);
		this.doj[this.doj.length] = wobject;
		this.addObject(wobject);
		this.State = 0;
		break;
	case 1110:
		wobject.src = this.tokensI[0];
		wobject.startData();
		this.State = 1111;
		break;
	case 1111:
		if(this.tokensI[0] == ".") 
		{
		  wobject.endData();
		  this.doj[this.doj.length] = x;
		  this.addObject(x);
		  this.State = 0;
		}
		else
		{
		  wobject.addBase64Data(this.tokensI[0]);
		}
		break;
	case 1200: // attribute
		if(this.tokenIs(0,"T"))
		{
		  num_lines = 1;
//		  if(makeTokensI(1, 9))
		  {
				
		  }
		  let xo = this.xoffset;
		  let yo = this.yoffset;
		  if(this.offsetOff)
		  {
		    xo = 0;
		    yo = 0;
		  }
		  let vs = [];
		  this.linepointer += 1;
		  this.currentline = this.lines[this.linepointer];
//		  report("->" + this.lines[this.linepointer]);
		  let k = this.currentline.indexOf("=");
		  let name = "";
		  let value = "";
		  if(k != -1)
		  {
		    name = this.currentline.substring(0,k).trim();
		    value = this.currentline.substring(k+1).trim();
		    vs[vs.length] = this.currentline;
		  }
			/*
			int i = 1; 
			while(i < num_lines)
			{
				vs.add(fs.readLine());
				i += 1;
			}
			*/
//		    this.doj[this.doj.length - 1] = new DText(de, this.tokensI[1],this.tokensI[2],this.tokensI[3],this.tokensI[4],this.tokensI[5],this.tokensI[6],this.tokensI[7],this.tokensI[8],this.tokensI[9], name, value, vs);
		  let tt = getAttributeIndex(name, workingobject);
		  let newt = new DText(de, Number(this.tokensI[1]) - xo, Number(this.tokensI[2]) - yo,this.tokensI[3],this.tokensI[4],this.tokensI[5],this.tokensI[6],this.tokensI[7],this.tokensI[8],this.tokensI[9], vs);
		  newt.name = name;
		  newt.value = value;
		  this.addObject(newt);
		  addAttribute(newt, workingobject);
		  workingobject.update();
		  /*
		  if( tt == -1)
		  {
		  workingobject.attributes[workingobject.attributes.length] = newt;
		  }
		  else
		  {
		   workingobject.attributes[tt] = newt;
		  }
		  */
		  this.State = 0;
		}
		if(this.tokenIs(0,"}"))
		{
		    this.offsetOff = false;
			this.State = 0;
		}
		break;
	default:
		this.State = 0;
		break;
	}
}
	
	


// API for external interface

function getLocalSymbol(name)
{
let fp = new FileParser(name);
let s = localStorage.getItem(name);
if(s != null)
{
  let d = fp.parse1(s);
  if(d != null) 
  {
    sheet.selectedObject = d;
    sheet.setState(STATE_PLACING);
   
  }
}
}

function inProjectsFiles(name)
{
    let b = null;
    let bx = true;
    let k = ProjectsFileList.length;
    let i = 0;
    while(bx && (i < k))
    {
        if(ProjectsFileList[i].title.indexOf(name) != -1) 
        {
            b = ProjectsFileList[i].link;
            bx = false;
        }
        i += 1;
    }
    return(b);
}

let DFS = null;

let FS_symbol_request = null;
let FS_symbol_dc = null;
let DemoLibK = [eo_titleA, gnd, resistor, capacitor, inductor, npn, pnp, eo_diode, pwr, testgate, eo_offsheetin, eo_offsheetinb, eo_offsheetout, eo_offsheetoutb,
  eo_offsheetiol, eo_offsheetior, eo_input_port, eo_output_port, eo_inout_port];
let slink = null;



/*
FindSymbol.prototype.checkWebLibrary = function()
{
  let b = false;
  let lk = this.link;
  let a = getAttributeValue("src", this.dc);
  if(a != null) lk = a;
  if(lk.indexOf("http") == 0)
  {
    if(FS_symbol_request == null)
    {
      report("checking web library for " + lk);
      FS_symbol_dc = this.dc;
      FS_symbol_request = getXHR(lk, this.symbol_callback);
      b = true;
     }
    else
    {
      report("unable to check web library as FS_symbol_request is busy.");
    }
  }
  return(b);
}


*/
                  
function getInRefArray(s, a)
{
  let b = false;
  let k = a.length;
  let r = null;
  let i = 0;
  while(!b && (i < k))
  {
    let ai = a[i]
    if(a[i].indexOf(s) != -1)
    {
      b = true;
      r = a[i];
    }
    i += 1;
  }
  return(r);
}



function Npad(name, surface, plated, isvia, nopaste, nomask, complex, holesize)
{
  this.name = name;
  this.surface = surface;
  this.plated = plated;
  this.isvia = isvia;
  this.nopaste = nopaste;
  this.nomask = nomask;
  this.complex = complex;
  this.holesize = holesize;
}

function getPad(name, parray)
{
//  report("getPad " + name + " " + parray.length);
  let b = true;
  let x = null;
  let k = parray.length;
  let i = 0;
  while(b && (i < k))
  {
    if(name == parray[i].name)
    {
      b = false;
      x = parray[i];
    }
    i += 1;
  }
  return(x);
}

function getPadShape(layer, parray)
{
  let b = true;
  let x = null;
  let k = parray.length;
  let i = 0;
  while(b && (i < k))
  {
    if(layer == parray[i].getAttribute("layer"))
    {
      b = false;
      x = parray[i];
    }
    i += 1;
  }
  return(x);
}

//let Thickness = 6000;
//let Clearance = 6000;
let Mask = 6000;
let DEFAULT_MASK_DELTA = 1100;
let YFOFFSET = 0;

function xmlFootprintParser(xmlDoc, fname)
{
//  report("xmlFootprintParser ");
  let sb = "";
  let sblist = "";
  let fnam = fname;
  let pads = [];
  let z = fname.indexOf(".xml");
  if(z != -1) fnam = fnam.substring(0, z);
  let sym = null;
  if(xmlDoc != null)
  {
  let padstyles = xmlDoc.getElementsByTagName("padstyle");
  let k = padstyles.length;
  let i = 0;
  while(i < k)
  {
    let padstyle = padstyles[i];
    let apad = new Npad(padstyle.getAttribute("name"), padstyle.getAttribute("surface"), padstyle.getAttribute("plated"), padstyle.getAttribute("isvia"), padstyle.getAttribute("nopaste"), padstyle.getAttribute("nomask"), padstyle.getAttribute("complex"), padstyle.getAttribute("holesize"));
    let padshapes = padstyle.getElementsByTagName("padshape");
    apad.padshapes = padshapes;
    pads[pads.length] = apad;
    i += 1;
  }
  
  let footprints = xmlDoc.getElementsByTagName("footprint");
  if(footprints != null)
  {
    let k = footprints.length;
    let i = 0;
    while(i < k)
    {
      let footprint = footprints[i];
      let fpname = footprint.getAttribute("name");
      let value = "";
      let refdes = "U?";
      let date = new Date();
      sb = "# " + fpname + ".fp " + (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear().toString().substr(2,2) + "\n\n";
      sb += "# gEDA PCB footprint generated by Schematic Mobile from " + fname + "\n#dimensions in 1/100 mil\n\n";
      //Element [SFlags "Desc" "Name" "Value" MX MY TX TY TDir TScale TSFlags] (
      sb += "Element [ \"\" \"" + fpname +"\" \"\" \"" + value + "\" 1000 1000 -1000 -1000 0 60 \"\"]\n(\n";
      let pcbpins = footprint.getElementsByTagName("pcbpin");
      let kk = pcbpins.length;
      let ii = 0;
      while(ii < kk)
      {
	let tpad = getPad(pcbpins[ii].getAttribute("style"), pads);
//	report("tpad " + tpad.name + " " + tpad.surface);
	if(tpad != null)
	{
	  if(tpad.surface == "false")
	  {
//	  Pin [rX rY Thickness Clearance Mask Drill "Name" "Number" SFlags]
	    let rX = Math.round(100 * pcbpins[ii].getAttribute("originx"));
	    let rY = Math.round(100 * pcbpins[ii].getAttribute("originy"));
	    rY = YFOFFSET - rY;
	    let pinname = pcbpins[ii].getAttribute("name");
	    let pinnumber = pcbpins[ii].getAttribute("number");
	    let Drill = 100 * tpad.holesize;
	    let tshape = getPadShape("TOP", tpad.padshapes);
	    let Thickness = 100 * tshape.getAttribute("width");
	    let tmask = getPadShape("TOP_SOLDER_MASK", tpad.padshapes);
	    let Mask = Thickness + DEFAULT_MASK_DELTA;
	    if(tmask != null) Mask = 100 * tmask.getAttribute("width");
	    let Clearance = 1000;
	    let SFlags = "";
	    if(tshape.getAttribute("shape") == "square") SFlags = "square";
	    sb += "\tPin [" + rX + " " + rY + " " + Thickness + " " + Clearance + " " +  Mask + " " + Drill + " \"" + pinname + "\" \"" +  pinnumber + "\" \"" + SFlags + "\"]\n";
	  }
	  else if(tpad.surface == "true")
	  {
//	 Pad [rX1 rY1 rX2 rY2 Thickness Clearance Mask "Name" "Number" SFlags] 
	    let rX = Math.round(100 * pcbpins[ii].getAttribute("originx"));
	    let rY = Math.round(100 * pcbpins[ii].getAttribute("originy"));
	    rY = YFOFFSET - rY;
	    let rotation = pcbpins[ii].getAttribute("rotation");
	    let pinname = pcbpins[ii].getAttribute("name");
	    let pinnumber = pcbpins[ii].getAttribute("number");
	    let tshape = getPadShape("TOP", tpad.padshapes);
	    let width = tshape.getAttribute("width");
	    let height = tshape.getAttribute("height");
	    let Thickness = 100 * width;
	    let flags = "0x00000100";
	    let y = 100 * height;
	    let d = Math.round((y - Thickness) /2);
	    
	    let rX1 = rX;
	    let rY1 = rY -d;
	    let rX2 = rX;
	    let rY2 = rY + d;
	    if(width < height)
	    {
	      if(rotation == "0")
	      {
		
	      }
	      else if(rotation == "90")
	      {
		
	      }
	      else if(rotation == "180")
	      {
		
	      }
	      else // 270
	      {
//	      y = 100 * width;
	      rX1 = rX -d;
	      rY1 = rY;
	      rX2 = rX + d;
	      rY2 = rY;		
	      }
	    }
	    else
	    {
	      Thickness = y;
	      y = 100 * width;
	      rX1 = rX -d;
	      rY1 = rY;
	      rX2 = rX + d;
	      rY2 = rY;
	    }
	    let tmask = getPadShape("TOP_SOLDER_MASK", tpad.padshapes);
	    let Mask = Thickness + DEFAULT_MASK_DELTA;
	    if(tmask != null) Mask = 100 * tmask.getAttribute("width");
	    let Clearance = 1000;
	    let SFlags = "";
	    if(tshape.getAttribute("shape") == "square") SFlags = "square";
	    sb += "\tPad [" + rX1 + " " + rY1 + " " + rX2 + " " + rY2 + " " + Thickness + " " + Clearance + " " + Mask + " \"" + pinname + "\" \"" + pinnumber + "\" " + flags + " ]\n";
	    
	  }
	}
	ii += 1;
      }
      let fplines = footprint.getElementsByTagName("line");
      kk = fplines.length;
      ii = 0;
      while(ii < kk)
      {
	let fplayer = fplines[ii].getAttribute("layer");
	if(fplayer == "TOP_SILKSCREEN")
	{
	  let originx = Math.round(100 * fplines[ii].getAttribute("originx"));
	  let originy = Math.round(-100 * fplines[ii].getAttribute("originy"));
	  let endx = Math.round(100 * fplines[ii].getAttribute("endx"));
	  let endy = Math.round(-100 * fplines[ii].getAttribute("endy"));
	  let ewidth = 100 * fplines[ii].getAttribute("width");
	  sb += "\tElementLine [" + originx + " " + originy + " " + endx + " " + endy + " " + ewidth + "]\n";
	}
	ii += 1;
      }
      let fparcs = footprint.getElementsByTagName("arc");
      kk = fparcs.length;
      ii = 0;
      while(ii < kk)
      {
	let fplayer = fparcs[ii].getAttribute("layer");
	if(fplayer == "TOP_SILKSCREEN")
	{
	  let originx = Math.round(100 * fparcs[ii].getAttribute("originx"));
	  let originy = Math.round(-100 * fparcs[ii].getAttribute("originy"));
	  let startangle = Math.round(fparcs[ii].getAttribute("startangle"));
	  let sweepangle = -Math.round(fparcs[ii].getAttribute("sweepangle"));
	  let radius = 100 * fparcs[ii].getAttribute("radius");
	  let ewidth = 100 * fparcs[ii].getAttribute("width");
	  sb += "\tElementArc [" + originx + " " + originy + " " + radius + " " + radius + " " + startangle + " " + sweepangle + " " + ewidth + "]\n";
	}
	ii += 1;
      }
      /*
      let texts = footprint.getElementsByTagName("arc");
      kk = texts.length;
      ii = 0;
      while(ii < kk)
      {
	let ftext = texts[ii].getAttribute("layer");
	if(ftext == "TOP_SILKSCREEN")
	{
	  let originx = Math.round(100 * texts[ii].getAttribute("originx"));
	  let originy = Math.round(-100 * texts[ii].getAttribute("originy"));
	  let style = texts[ii].getAttribute("style");
	  let rotation = Math.round(texts[ii].getAttribute("rotation"));
	  let justify = 100 * texts[ii].getAttribute("justify");
	  let flipped = 100 * fplines[ii].getAttribute("width");
	  let hidden = texts[ii].getAttribute("hidden");
	  let data = texts[ii].getAttribute("data");
	}
	ii += 1;
      }
*/
      sb += ")\n\n";    
      localStorage.setItem(fpname + ".fp", sb);
      report("saved local file " + fpname + ".fp\n");
      i += 1;
    }
  }
  }
}

function xmlSymbolParser(xmlDoc, fname)
{
  report("xmlSymbolParser ");
  xmlFootprintParser(xmlDoc, fname);
  let fnam = fname;
  let z = fname.indexOf(".xml");
  if(z != -1) fnam = fnam.substring(0, z);
  let sym = null;
  if(xmlDoc != null)
  {
  let symbols = xmlDoc.getElementsByTagName("symbol");
  if((symbols != null) && (symbols.length == 1))
  {
    let symbol = symbols[0];
    let device = symbol.getAttribute("name");
    let sympins = symbol.getElementsByTagName("sympin");
    report("xmlSymbolParser " + device + " " + sympins.length + " pins");
    let comp = new DComponent(de, symbol.getAttribute("originx"), symbol.getAttribute("originy"), true, 0, false, fnam);
    let lines = symbol.getElementsByTagName("line");
    report("number of lines = " + lines.length);
    let k = lines.length;
    let i = 0;
    while(i < k)
    {
      let line = lines[i];
      report(line.getAttribute("originx") + " " + line.getAttribute("originy") + " " + line.getAttribute("endx") + " " + line.getAttribute("endy"));
      let dl = new DLine(de, line.getAttribute("originx"), line.getAttribute("originy"), line.getAttribute("endx"), line.getAttribute("endy"), GRAPHIC_COLOR, line.getAttribute("width"), 0, 0, 0,0);
      comp.addDrawingObject(dl);
      i += 1;
    }
    let atts = symbol.getElementsByTagName("text");
    k = atts.length;
    i = 0;
    while(i < k)
    {
      let att = atts[i];
      let style = att.getAttribute("style");
      let size = 10;
      let angle = att.getAttribute("rotation");
      let justify = att.getAttribute("justify");
      let alignment = 4;
      let flipped = att.getAttribute("flipped");
      let hidden = att.getAttribute("hidden");
      let visibility = 1;
      if(hidden == "true") visibility = 0;
      let data = att.getAttribute("data");
      let lines = [];
      let name = att.getAttribute("name");
      if((name == "pindes") || (name == "pinname")) ; // skip
      else
      {
	if(name == "RefDes") name = "refdes";
	else if(name == "Value") name = "value";
	else if(name == "Type") name = "device";
	lines[0] = name + "=" + data;
	
	let da = new DText(de, att.getAttribute("originx"), att.getAttribute("originy"), ATTRIBUTE_COLOR, size, visibility, 1, angle, alignment, 1, lines);
	da.name = name;
	da.value = data;
	comp.addAttribute(da);
      }
      i+= 1;
    }
    sympins = symbol.getElementsByTagName("sympin");
    k = sympins.length;
    i = 0;
    while(i < k)
    {
      let sympin = sympins[i];
      let style = sympin.getAttribute("style");
//      let whichend = 0;
      let textsize = 8;
      let x1 = sympin.getAttribute("originx");
      let y1 = sympin.getAttribute("originy");
      let len = Number(sympin.getAttribute("length"));
      let x2 = Number(x1) + len;
      let y2 = y1;
      let whichend = 1;
      if(sympin.getAttribute("rotation") == 180)
      {
	    whichend = 0;
	    x1 -= len;
	    x2 -= len;
      }
      if(sympin.getAttribute("flipped") == true) whichend = 1;
      let pin = new DPin(de, x1, y1, x2, y2, PIN_COLOR, 0, whichend, textsize);
      let num = sympin.getAttribute("number");
      setAttributeValue("pinseq", pin, num); 
      let infs = sympin.getElementsByTagName("text");
      let kk = infs.length;
      let ii = 0;
      while(ii < kk)
      {
	let inf = infs[ii];
	x1 = inf.getAttribute("originx");
	y1 = inf.getAttribute("originy");
	let data = inf.getAttribute("data");
	if(inf.getAttribute("name") == "pindes")
	{
	  setAttributeValue("pinnumber", pin, data);
	  let aa = getAttribute("pinnumber", pin);
	  aa.setX(Number(aa.getX()) + 50);
	}
	else if(inf.getAttribute("name") == "pinname")
	{
	  let w = setAttributeValue("pinlabel", pin, fixVhdlName(data, "P"));
	  if(pin.whichend == 0)
	  {
	    w.setX(x1);
	    w.setY(y1);
	  }
	  else
	  {
	    w.setX(x1 - len);
	    w.setY(y1);
	  }
	}
	ii += 1;
      }
    
      comp.addDrawingObject(pin);
      i += 1;
    }
    
    let comps = xmlDoc.getElementsByTagName("component");
    setAttributeValue("device", comp, comps[0].getAttribute("name"));
    setAttributeValue("refdes", comp, comps[0].getAttribute("designatorprefix") + "?");
    setAttributeValue("footprint", comp, comps[0].getAttribute("footprint"));
   
    let comppins = comps[0].getElementsByTagName("comppin");
    k = comppins.length;
    i = 0;
    while(i < k)
    {
      let comppin = comppins[i];
      let pin = comp.getPinBySeq(comppin.getAttribute("sympin"));
      if(pin != null)
      {
	let tp = comppin.getAttribute("type");
	if(tp == "Input") setAttributeValue("pintype", pin, "in");
	else if(tp == "Output") setAttributeValue("pintype", pin, "out");
 	else if(tp == "Passive") setAttributeValue("pintype", pin, "pas");
 	else if(tp == "Power") setAttributeValue("pintype", pin, "pwr");
 	else if(tp == "BiDirectional") setAttributeValue("pintype", pin, "io");
      }
      else report("cant get pin for comppin " +  comppin.getAttribute("sympin"));
      i += 1;
    }
    sym = comp;
  }
  }
  return(sym);
}
