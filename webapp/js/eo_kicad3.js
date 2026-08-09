// eo_kicad3.js

const TokenCountLimit = 50000;
let debugK = false;

function mmToCmils(mm)
{
  return(Math.round(Number(mm) / 25.4 * 1000));
}

function CmilsToMm(cmils)
{
  return(Math.round(100 * 25.4 * cmils / 1000) / 100);
}

const ValidPNames = ["(kicad_symbol_lib", "(version", "(generator", "(symbol", "(in_bom", "(on_board",
"(property", "(id", "(at", "(effects", "(font", "(size", "(justify", "(rectangle", "(start",
"(end", "(stroke", "(width", "(type", "(pin", "(length", "(name", "(number", "(color", "(fill"
];

function isAValidPName(s)
{
  let b = false;
  let k = ValidPNames.length;
  let i = 0;
  while(!b && (i < k))
  {
    if(s == ValidPNames[i]) b = true;
    i += 1;
  }
  return(b);
}

class KParser {
  constructor(fname)
  {
    this.fname = fname;
    this.filetype = 0;
    this.data = null;
    this.linepointer = 0;
    this.parity = 0;
    this.token = null;
    this.lines = [];
    this.lineitems = [];
    this.itempointer = 0;
    this.detectingString = false;
    this.tokenCache = [];
    this.tokenCount = 0;
    this.tokenCountLimit = TokenCountLimit;
    this.index = 0;
    this.SymbolList = null;
    this.limit = 20;
    this.netlabels = [];
    this.yadj = (8500 - 900);
  }

  setData(data) {
    this.data = data;
    this.lines = this.data.split("\n");
    this.linepointer = 0;
    this.token = null;
    this.tokenCount = 0;
    this.tokenCountLimit = TokenCountLimit;
    this.itempointer = 0;
    this.tokenCache = [];
  }

  getSymbolList() {
    let list = [];
    report("k31 getSymbolList data " + (this.data != null));
    if(this.data != null)
    {
      this.lines = this.data.split("\n");
      let k = this.lines.length;
      this.currentline = "";
      this.linepointer = 0;
      while(this.linepointer < k)
      {
        let s = this.lines[this.linepointer];
        if(s.indexOf("DEF") == 0)
        {
          let n = s.indexOf(" ", 4);
          let m = s.substring(4, n);
//        report("added " + m);
          list.push({title: m});
        }
        else if(s.indexOf("(symbol") != -1)
        {
          let n = s.indexOf("\"");
          let m = s.indexOf("\"", n + 1);
          let t = s.substring(n+1, m);
          if(t.charAt(t.length-2) != "_")
          {
            list.push({title: t, lp: this.linepointer});
          }
        }
        this.linepointer += 1;
      }
    }
    this.SymbolList = list;
    return(list);
  }

  incLinepointer(env) {
    let that = env;
    if((that.linepointer + 1) < that.lines.length)
    {
      that.linepointer += 1;
      that.lineitems = that.lines[that.linepointer].split(/ /);
      that.itempointer = 0;
    }
  }

  tokenIs() {
    return(this.token);
  }

  getNextToken() {
    this.token = this.getNextTokenA(true);
    if((this.token.charAt(0) != '\"') && !this.detectingString)
    {
      if(this.token.indexOf("(") != -1) this.parity += 1;
      if(this.token.indexOf(")") != -1) this.parity -= 1;
      else if((this.token == ")") ) this.parity -= 1;
    }
    if(this.parity == 0)
    {
       report("138 parity zero " + this.token);
//       throw new Error("138 parity zero");
    }
    //report("103 parity = " + this.parity);
    return(this.token);
  }

  getNextTokenA(print) {
    if(debugK) report("108 getNextTokenA cache.length = " + this.tokenCache.length);
    this.tokenCount += 1;
    if(this.tokenCount > this.tokenCountLimit)
    {
      console.trace();
      if(confirm("Token Count Limit exceeded.\nIncrease limit?")) this.tokenCountLimit += TokenCountLimit;
      else throw new Error("69 tokenCount of " + this.tokenCountLimit + " exceeded.");
    }
    this.token = null;
    if(this.tokenCache.length > 0)
    {
      this.token = this.tokenCache.pop();
    }
    else
    {
      let bcont = true;
      let bsdet = false;
      while(bcont && (this.itempointer >= this.lineitems.length))
      {
        if((this.linepointer + 1) < this.lines.length)
        {
          this.incLinepointer(this);
 //         this.linepointer += 1;
 //         this.lineitems = this.lines[this.linepointer].split(/ /);
 //         this.itempointer = 0;
        }
        else  // finished
        {
          bcont = false;
          this.token = null;
        }
      }
      if(bcont)
      {
        if(debugK && (this.lineitems[this.itempointer].indexOf("symbol") != -1)) report("144 items = " + this.lineitems.length + " " + this.lines[this.linepointer]);
        this.token = this.lineitems[this.itempointer].trim();
        this.itempointer += 1;

        while(this.token.length == 0)
        {
          this.token = this.getNextTokenA(false).trim();
        }
        if(debugK) report("169 token = " + this.token + " detectingString = " + this.detectingString);
        if((this.token.indexOf("\"") == 0) && !this.detectingString)   // detecting a string
        {
          this.detectingString = true;
          if(debugK) report("148 detectingString = true lineitems = " + this.lineitems.length + " itempointer = " + this.itempointer);
          if(this.token.substring(1).indexOf("\"") == -1) // if this token has only beginning quote
          {
            let comp = this.token;
            let t = this.getNextTokenA();
            while(t.indexOf("\"") == -1)
            {
              comp += " " + t;
              t = this.getNextTokenA();
            }
            let j = t.indexOf("\"");
            if(debugK) report("158 j = " + j + " t.length = " + t.length + " " + t);
            if((j != -1) && (t.length > j + 1)) // if stuff after last quote
            {
              let t1 = t.substring(j+1);
              this.tokenCache.push(t1); // cache extra stuff
              t = t.substring(0,j);
            }
            comp += " " + t;
            this.token = comp;
//            report("157 detected string: " + comp);
            bsdet = true;
            this.detectingString = false;    //10/07/24
//            if(debugK) report("193 detectingString = false " + this.token);
          }
          else // token has both quotes
          {
            this.detectingString = false;    //10/07/24
            bsdet = true;
            if(debugK) report("163 detectingString = false " + this.token);
            let jj = this.token.lastIndexOf("\"");
            let j = this.token.indexOf(")", jj);
            if(j > this.token.lastIndexOf("\""))
            {
              let nt = this.token.substring(j);
              this.token = this.token.substring(0, j);
//              this.tokenCache.push(")");
              let jj = 0;
              while(jj < nt.length)
              {
                if(nt.charAt(jj) == ')') this.tokenCache.push(")");
                jj += 1;
              }
            }
          }
//          this.detectingString = false;
        }
      }
      if(this.token == null) console.trace();
      let n = this.token.indexOf(")");

      let m = this.token.indexOf("\"");
      if(debugK) report("185 token = " + this.token + " " + bsdet + " n = " + n + "  length = " + this.token.length + " " + this.linepointer + " m = " + m);
/*      if(m > 0)
      {
        if(m < this.token.length -1) this.tokenCache.push(this.token.substring(m+1));
        this.token = this.token.substring(0,m+1);
        this.detectingString = false;
      }
*/

      while((n > 0) && (!bsdet) && (n <= this.token.length - 1))
//      while((n > 0) && (!bsdet) && (!this.detectingString) && (n <= this.token.length - 1))
      {
        //report("186 this is bad");
        if(n != 0)
        {
          this.tokenCache.push(")");
          this.token = this.token.substring(0, this.token.length -1);
          n = this.token.indexOf(")");
        }
      }

//      if(this.token.substring(1).indexOf("\"") == -1) this.detectingString = false; // 10/07/24

    }
//    report("139 parity = " + this.parity);
    this.token = this.token.trim();
    if(debugK) report("140: " + this.token + " " + this.parity);
    return(this.token);
  }

  makeObject(s, that)
  {
//    report("195 makeObject " + s + " " + that.parity);
    let ob2 = {};
    ob2.kind = s.substring(1);
    that.limit -= 1;
    if(that.limit >=0)
    {
    let t = that.getNextToken();
    let j = 0;
    while((t != ")") && (that.parity > 0))
    {
      t = t.replaceAll("\"", "");
      if(t.charAt(0) == '(')
      {
        let o = that.makeObject(t, that);
        ob2[j] = o;
        j += 1;
      }
      else
      {
        ob2[j] = t;
        j += 1;
      }
      t = that.getNextToken();
    }
    }
    else report("271 limit exceeded " + s + " " + that.parity);
    that.limit += 1;
    return(ob2);
  }

  async getSymbolP(name, lp)
  {
    let iu = name.lastIndexOf("_");  // kicads workaround for unit number
    let slot = -1;
    if(iu == name.length -2) slot = name.substring(iu + 1);

    return(this.getSymbolP2(name, slot, lp));
  }

  async getSymbolP2(name, slot, lp)
  {
    let that = this;
    return(new Promise(async function(resolve, reject) {
//    clearReport();
    report("\n\n154 getSymbol " + name + " " + lp);
    let dcomp = null;
    let pinseq = 0;
    let numslots = 0;
    let numstate = 1;
    let slotdefs = [];
    let ShowPinNum = 1;
    let ShowPname = 1;
    that.parity = 0;
    let jx = 0;
    if(that.data == null) reject("159 data is null");
    that.lines = that.data.split("\n");
    let k = that.lines.length;
    that.currentline = "";
    that.linepointer = 0;
    that.itempointer = 0;
    that.tokenCache = [];
    that.tokenCount = 0;
    let b = true;
    if(debugK) report("181 " + that.lines.length + " " + that.linepointer);
    let bgg = true;
    while(b && (that.linepointer < k))
    {
      let s = that.lines[that.linepointer];
      if(s.indexOf("DEF") == 0)
      {
        that.filetype = 0;
        let n = s.indexOf(" ", 4);
        let m = s.substring(4, n);
        if(m == name)
        {
            b = false;
            report("188 found " + m);
        }
        else that.linepointer += 1;
      }
      else if((jx = s.indexOf("(symbol")) != -1)
      {
        that.filetype = 1;
        let s1 = s.substring(jx + 7).trim();
        let n = s1.indexOf(" ", jx + 9);
        if(n == -1) n = s.length;
//        let m = s.substring(jx+8, n).replace(/\"/g, "");
        let m = s1.replace(/\"/g, "");
//        report("201 " + m + " " + name + " " + n + " " + s);
        if(m == name)
        {
            b = false;
            report("199 found " + m + " " + that.linepointer);
            that.tokenCount = 0;
        }
        else that.incLinepointer(that); //linepointer += 1;
      }
      else that.incLinepointer(that); //linepointer += 1;
    }
    if(b) reject("202 " + name + " not found.");
    else if(debugK) report("272 that.filetype = " + that.filetype + " " + that.parity);

    if(that.filetype == 0)  // old symbol file
    {
      dcomp = that.getOldSymbol();
      if(dcomp == null) reject("206 old symbol null");
      else resolve(dcomp);
    }
    if(that.filetype == 1)  // new symbol file
    {
      let obj = null;
      try{
      obj = that.getKicadObject(that);
      if(debugK) report("232 " + JSON.stringify(obj, null, 4));
      if(obj != null)
      {
        let dcomp = null;
        dcomp = await that.makeSymbolFromKicadObject(obj, slot, that);
        resolve(dcomp);
      }
      else reject("298 Kicad object is null");
      }
      catch(e) {
        report("359 " + e);
      }
    }
    }));
  } // end of getSymbolP

  // this translates a KiCad format file segment to a javascript object
  getKicadObject(env)
  {
    let that = env;
    let obj = null;
    try {
      let t = null;
      let devicename = "";
      this.limit = 20;
      let state = 0;
      let pcount = 0;
      let bfirst = true;
      if(debugK) report("344 " + bfirst + " parity = " + that.parity);
//      while((limit > 0) && (that.parity > 0) && (t = that.getNextToken()) != null)
      while((this.limit > 0)  && ((t = that.getNextToken()) != null) && ((that.parity != 1) || bfirst))
      {
        if(bfirst)
        {
          if(debugK) report("273 " + t + " " + that.parity);
          bfirst = false;
        }
        if(t.charAt(0) == "(")
        {
          obj = that.makeObject(t, that);
        }
      }
    }
    catch(e) {
      report("351 " + e);
    }
    return(obj);
  }

  async makeSymbolFromKicadObject(obj, slot, env)
  {
    let that = env;
    let dcomp = null;
    let unitobjects = [];
    unitobjects[0] = [];
    let keys = Object.keys(obj);
    if(obj.kind == "symbol")
    {
      let filename = obj[0].replace(/\"/g, "");
      let v = [];
      // DComponent(de, x, y, selectable, angle, mirror, filename)
      dcomp = new DComponent(de, 0, 0, 1, 0, 0, filename);
      setAttributeValue("device", dcomp, filename).setVisible(true);
      let pinseq = 1;
      let pinoffset = 0;
      let k0 = keys.length -1;
      let i0 = 1;
      for(i0 = 1; i0 < k0; i0++)
      {
         let o = obj[i0];
         let k1 = Object.keys(o).length -1;
         let i1 = 1;
         let ang = 0;
         let vis = 1;
         if(o.kind == "extends")
         {
           let d = o[0];
           let list = that.SymbolList;
           let k = list.length;
           let b = true;
           let i = 0;
           let lp = 0;
           while(b && (i<k))
           {
             if(list[i].title == d)
             {
               lp = list[i].lp;
               b = false;
             }
             else i += 1;
           }
           report("399 extends " + d + " b = " + b + " i = " +i + "list.length = " + k + " lp = " + lp);

           if(!b && (lp != 0))
           {
             let ps2 = new KParser(d);
             ps2.setData(that.data);
             dcomp = await ps2.getSymbolP(d, lp);
             let fn = filename;
             if(!isNaN(fn.charAt(0))) fn = "$" + fn;
             setAttributeValue("device", dcomp, fn).setVisible(true);
             getAttribute("value", dcomp).setVisible(false);
             dcomp.makeSelectBox();
           }

         }
         else if(o.kind == "property")
         {
          let a = null;
          let d = o[1].toUpperCase();
          if(o[0] == "Reference")
          {
            if(isNaN(d.charAt(d.length - 1))) d = d + "?";
            a = setAttributeValue("refdes", dcomp, d);
            a.setVisible(true);
          }
          else if(o[0] == "Value")
          {
            a = setAttributeValue("value", dcomp, d);
            a.setVisible(true);
          }
          else if(o[0] == "Footprint")
          {
            a = setAttributeValue("footprint", dcomp, d);
            a.setVisible(false);
          }
          else if(o[0] == "Description")
          {
            a = setAttributeValue("description", dcomp, d);
            a.setVisible(false);
          }
          else if(o[0] == "Datasheet")
          {
            a = setAttributeValue("datasheet", dcomp, d);
            a.setVisible(false);
          }
          else
          {
            a = setAttributeValue(o[0], dcomp, d);
            a.setVisible(false);
          }

          if(a != null)
          {
          for(i1 = 2; i1 < k1; i1++)
          {
            if(o[i1].kind == "at")
            {
              let x = mmToCmils(o[i1][0]);
              let y = mmToCmils(o[i1][1]);
              let z = mmToCmils(o[i1][2]);
              if(a == null) report("380 i0 = " + i0 + " i1 = " + i1 + " " + o[0]);
              a.setX(x);
              a.setY(y);
            }
            else if(o[i1].kind == "effects")
            {
              let ox = o[i1];
              let k2 = Object.keys(ox).length -1;
              let i2 = 0;
              for(i2 = 0; i2 < k2; i2++)
              {
                if(typeof ox[i2] === 'undefined') report("390 i0 = " + i0 + " i1 = " + i1 + " i2 = " + i2);
                if(ox[i2].kind == "hide")
                {
                   if(ox[i2][0] == "yes")
                   {
//                     report("526 hide");
                     a.setVisible(false);
                   }
                   else setVisible(true);
                }
              }
            }
          }
          }
         }
         else if(o.kind == "pin_names")
         {
           if(o[0].kind == "offset")
           {
             pinoffset = mmToCmils(o[0][0]);
           }
         }
         else if(o.kind == "symbol")
         {
          let jn = o[0].lastIndexOf("_");
          let un = 0;
          if(jn == o[0].length -2)
          {
            un = o[0].substring(o[0].indexOf("_") + 1, o[0].lastIndexOf("_"));
            jn = un.lastIndexOf("_");
            if(jn != -1) un = un.substring(jn+1);
//          else un = 0;
          }
          report("404 decoding " + o[0] + " unitnumber = " + un);
          let v = [];
          if(un == 0)
          {
            v = v.concat(unitobjects[0]);
          }
          unitobjects[un] = v;
          let kt = Object.keys(o).length -1;
          let it = 0;
          for(it=1; it < kt; it++)
          {
            if(o[it].kind == "rectangle")
            {
              let ox = o[it];
              let k2 = Object.keys(ox).length -1;
              let i2 = 0;
              let pt1 = null;
              let pt2 = null;
              for(i2 = 0; i2 < k2; i2++)
              {
                if(ox[i2].kind == "start")
                {
                  pt1 = {x: mmToCmils(ox[i2][0]), y: mmToCmils(ox[i2][1])};
                }
                else if(ox[i2].kind == "end")
                {
                  pt2 = {x: mmToCmils(ox[i2][0]), y: mmToCmils(ox[i2][1])};
                }
                else if(ox[i2].kind == "stroke")
                {

                }
                else if(ox[i2].kind == "fill")
                {

                }
              }
              let width = pt2.x - pt1.x;
              let height = pt2.y - pt1.y;
              // DBox(de, x, y, width, height, GRAPHIC_COLOR, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
              let db = new DBox(de, pt1.x, pt1.y, width, height, GRAPHIC_COLOR, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
              v.push(db);
            }
            else if(o[it].kind == "circle")
            {
              let ox = o[it];
              let k2 = Object.keys(ox).length -1;
              let i2 = 0;
              let pt1 = null;
              let radius = null;
              for(i2 = 0; i2 < k2; i2++)
              {
                if(ox[i2].kind == "center")
                {
                  pt1 = {x: mmToCmils(ox[i2][0]), y: mmToCmils(ox[i2][1])};
                }
                else if(ox[i2].kind == "radius")
                {
                  radius = mmToCmils(ox[i2][0]);
                }
                else if(ox[i2].kind == "stroke")
                {
                }
                else if(ox[i2].kind == "fill")
                {
                }
              }
              // DCircle(de, posx, posy, radius, GRAPHIC_COLOR, 0, 0, 0, 0,0, 0, 0, 0,0, 0, 0);
              let db = new DCircle(de, pt1.x, pt1.y, radius, GRAPHIC_COLOR, 0, 0, 0, 0,0, 0, 0, 0,0, 0, 0);
              v.push(db);
            }
            else if(o[it].kind == "arc")
            {
              let ox = o[it];
              let k2 = Object.keys(ox).length -1;
              let i2 = 0;
              let pt1 = null;
              let pt2 = null;
              let pt3 = null;
              let radius = null;
              for(i2 = 0; i2 < k2; i2++)
              {
                if(ox[i2].kind == "start")
                {
                  pt1 = {x: mmToCmils(ox[i2][0]), y: mmToCmils(ox[i2][1])};
                }
                if(ox[i2].kind == "mid")
                {
                  pt2 = {x: mmToCmils(ox[i2][0]), y: mmToCmils(ox[i2][1])};
                }
                if(ox[i2].kind == "end")
                {
                  pt3 = {x: mmToCmils(ox[i2][0]), y: mmToCmils(ox[i2][1])};
                }
                else if(ox[i2].kind == "stroke")
                {
                }
                else if(ox[i2].kind == "fill")
                {
                }
              }
              // DArc(de, x, y, radius, startangle, sweepangle, colorindex, width,capstyle, dashstyle, dashlength, dashspace)

              let arco = that.getArcInfo(pt1, pt2, pt3)

              let db = new DArc(de, arco.c.x, arco.c.y, arco.radius, arco.startangle, arco.sweepangle, GRAPHIC_COLOR, 0, 0, 0, 0, 0);

              // DCircle(de, posx, posy, radius, GRAPHIC_COLOR, 0, 0, 0, 0,0, 0, 0, 0,0, 0, 0);
//              let db = new DCircle(de, pt1.x, pt1.y, radius, GRAPHIC_COLOR, 0, 0, 0, 0,0, 0, 0, 0,0, 0, 0);
              v.push(db);
            }
            else if(o[it].kind == "polyline")
            {
              let ox = o[it];
              let k2 = Object.keys(ox).length -1;
              let i2 = 0;
              let vp = [];
              let radius = null;
              for(i2 = 0; i2 < k2; i2++)
              {
                if(ox[i2].kind == "pts")
                {
                  let oz = ox[i2];
                  let k3 = Object.keys(oz).length -1;
                  let i3 = 0;
                  for(i3 = 0; i3 < k3; i3++)
                  {
                    if(oz[i3].kind == "xy")
                    {
                      let pt = {x: mmToCmils(oz[i3][0]), y: mmToCmils(oz[i3][1])};
                      vp.push(pt);
                    }
                  }
                }
                if(ox[i2].kind == "stroke")
                {
                }
                if(ox[i2].kind == "fill")
                {
                }
              }
              if(vp.length > 1)
              {
                //DPath(de, colorindex, width, capstyle, dashstyle, dashlength, dashspace, filltype, fillwidth, angle1, pitch1, angle2, pitch2, numlines)
                let db = new DPath(this.de, GRAPHIC_COLOR, 2, 0, 0, 0, 0,0,0,0,0,0,0,0);
                db.setX(vp[0].x);
                db.setY(vp[0].y);
                let kd = vp.length;
//                report("507 vp.length = " + vp.length);
                let id = 1;
                for(id = 1; id < kd; id++)
                {
//                if(isNaN(vp[id].x)) report("508 id = " + id + " " + vp.length + " " + vp[id].x + " " + vp[id].y);
                  db.addLineSegment( vp[id].x, vp[id].y);
                }
                v.push(db);
              }
            }
            else if(o[it].kind == "pin")
            {
              let ox = o[it];
              let k2 = Object.keys(ox).length -1;
              let i2 = 0;
              let pintype = ox[0];
              let pindraw = ox[1];
              let pt = null;
              let angle = 0;
              let length = 0;
              let vp = [];
              let pinname = "NC";
              let pinnumber = "";
              let ShowPname = 1;
              let ShowPinNum = 1;
              for(i2 = 2; i2 < k2; i2++)
              {
                if(ox[i2].kind == "at")
                {
                  pt = {x: mmToCmils(ox[i2][0]), y: mmToCmils(ox[i2][1])};
                  angle = ox[i2][2];
                }
                else if(ox[i2].kind == "length")
                {
                  length = mmToCmils(ox[i2][0]);
                  if(length == 0)
                  {
                    length =mmToCmils(2.54);
                  }
                }
                else if(ox[i2].kind == "name")
                {
                  pinname = ox[i2][0];
                  let oz = ox[i2];
                  let k3 = Object.keys(oz).length -1;
                  let i3 = 0;
                  for(i3 = 1; i3 < k3; i3++)
                  {
                    if(oz[i3].kind == "effects")
                    {

                    }
                  }
                }
                else if(ox[i2].kind == "number")
                {
                  pinnumber = ox[i2][0];
                  let oz = ox[i2];
                  let k3 = Object.keys(oz).length -1;
                  let i3 = 0;
                  for(i3 = 1; i3 < k3; i3++)
                  {
                    if(oz[i3].kind == "effects")
                    {

                    }
                  }
                }
              }

              // DPin(de, x1, y1, x2, y2, colorindex, pintype, whichend, textsize)
              let x2 = pt.x + length;
              let y2 = pt.y;
              let we = 0;
              let ang = angle;
              let align = 7;
              let balign = 0;
              if(angle == 0) // left
              {
                x2 = pt.x + length;
                y2 = pt.y;
                we = 0;
                align = 1;
                balign = 6;
              }
              else if(angle == 180) // right
              {
                x2 = pt.x - length;
                y2 = pt.y
                we = 0;
                align = 7;
                balign = 0;
              }
              else if(angle == 90)  // down
              {
                x2 = pt.x;
                y2 = pt.y + length;
                we = 0;
                align = 3;
                balign = 2;
                ang = 90;
              }
              else if(angle == 270)  // up
              {
                x2 = pt.x;
                y2 = pt.y - length;
                we = 0;
                align = 5;
                balign = 0;
                ang = 90;
              }
              let t = "";
              if(pintype == "power_in") t = "pwr";
              else if(pintype == "bidirectional") t = "io";
              else if(pintype == "passive") t = "pas";
              else if(pintype == "output") t = "out";
              else if(pintype == "input") t = "in";
              else if(pintype == "open_collector") t = "oc";
              else if(pintype == "open_emitter") t = "oe";
              else if(pintype == "no_connect") t = "pas";
              else if(pintype == "tri_state") t = "io";
              else if(pintype == "power_out") t = "out";
              else t = pintype;
              let dp = new DPin(de, pt.x, pt.y, x2, y2, PIN_COLOR, 0, we, 8);
              dp.setAngle(angle);
              setAttributeValue("pintype", dp, t);
              setAttributeValue("pinseq", dp, pinseq);
              if(pinname == "~") pinname = "P" + pinseq;
              pinseq += 1;
//          setAttributeValue("pinlabel", dp, label);
              let newt = new DText(de, x2, y2,ATTRIBUTE_COLOR, 6, ShowPname, 1, ang, align, 1, [pinname]);
              newt.name = "pinlabel";
              newt.value = pinname;
              dp.addAttribute(newt);
//          setAttributeValue("pinnumber",dp, pn);
              newt = new DText(de, x2, y2,ATTRIBUTE_COLOR, 6, ShowPinNum, 1, ang, balign, 1, [pinnumber]);
              newt.name = "pinnumber";
              newt.value = pinnumber;
              dp.addAttribute(newt);
              v.push(dp);
            }
         }
         }
      }
      if(typeof unitobjects[0] !== 'undefined')
      {
      dcomp.addDrawingObjects(unitobjects[0]);
      }
      else report("781 unitobjects[0] is undefined " + unitobjects.length)
      report("766 unitobjects.length = " + unitobjects.length + " slot = " + slot);
      if(unitobjects.length == 2) dcomp.addDrawingObjects(unitobjects[1]);
      else if((slot != -1) && (slot > 0) && (slot < unitobjects.length))
      {
        dcomp.addDrawingObjects(unitobjects[slot]);
      }
      else if(unitobjects.length > 1)
      {
        let sx = prompt("Enter the unit or slot number for this symbol (1 to " +  (unitobjects.length - 1) + ")", 1);
        if(!isNaN(sx) && (sx > 0) && (sx < unitobjects.length)) dcomp.addDrawingObjects(unitobjects[sx]);
        else report("765 Illegal unit or slot number specified.");
      }
      if(unitobjects.length > 2)
      {
        dcomp.addAttribute(createAttribute(de, 0, 0, ATTRIBUTE_COLOR, 10, VISIBILITY_INVISIBLE, SHOW_VALUE, 0, 1, "numslots", unitobjects.length));
        dcomp.addAttribute(createAttribute(de, 0, 0, ATTRIBUTE_COLOR, 10, VISIBILITY_INVISIBLE, SHOW_VALUE, 0, 1, "slot", slot));
      }
//      else  dcomp.addDrawingObjects(v);

    }
    return(dcomp);
  }  // end of makeSymbolFromKicadObject

  getArcInfo(pt1, pt2, pt3) {
    // lines ax +by = c1  dx + ey = c2
    let dx1 = pt2.x - pt1.x;
    let dy1 = pt2.y - pt1.y;
    let dx2 = pt3.x - pt2.x;
    let dy2 = pt3.y - pt2.y;
    let dx3 = pt3.x - pt1.x;
    let dy3 = pt3.y - pt1.y;
    let startangle = 0;
    let stopangle = 0;
    let sweepangle = 0;
    let p1 = null;  // half way points
    let p2 = null;
    let theta1 = 0;
    let theta2 = 0;
    let phi1 = 0;
    let phi2 = 0;

    if(dx1 != 0)
    {
      theta1 = Math.atan(dy1/dx1);
      if(dx1 < 0)
      {
        if(dy1 <0) theta1 = -Math.PI + theta1;
        else theta1 = Math.PI - theta1;
      }
      p1 = {x: (pt1.x + pt2.x) / 2, y: (pt1.y + pt2.y) / 2};
      if(dx2 != 0)
      {
        theta2 = Math.atan(dy2/dx2);
        if(dx2 < 0)
        {
          if(dy2 <0) theta2 = -Math.PI + theta2;
          else theta2 = Math.PI + theta2;
        }
        p2 = {x: (pt2.x + pt3.x) / 2, y: (pt2.y + pt3.y) / 2};
      }
      else
      {
        theta2 = Math.atan(dy3/dx3);
        if(dx3 < 0)
        {
          if(dy3 <0) theta2 = -Math.PI + theta2;
          else theta2 = Math.PI + theta2;
        }
        p2 = {x: (pt1.x + pt3.x) / 2, y: (pt1.y + pt3.y) / 2};
      }
    }
    else if(dx2 != 0)
    {
      theta1 = Math.atan(dy2/dx2);
      if(dx2 < 0)
      {
        if(dy2 <0) theta1 = -Math.PI + theta1;
        else theta1 = Math.PI + theta1;
      }
      p1 = {x: (pt2.x + pt3.x) / 2, y: (pt2.y + pt3.y) / 2};
      theta2 = Math.atan(dy3/dx3);
        if(dx3 < 0)
        {
          if(dy3 <0) theta2 = -Math.PI + theta2;
          else theta2 = Math.PI + theta2;
        }
      p2 = {x: (pt1.x + pt3.x) / 2, y: (pt1.y + pt3.y) / 2};
    }

    phi1 = this.getPhi(theta1);
    phi2 = this.getPhi(theta2);

//    report("871 p1 = " +p1.x + ", " + p1.y + " p2 = " + p2.x + ", " + p2.y + " theta1 = " + theta1 + " theta2 = " + theta2 + " phi1 = " + phi1 + " phi2 = " + phi2);

    // orthogonal lines at half way points
    // x + tan(phi) y = c

    let c1 = p1.x + Math.tan(phi1) * p1.y;
    let c2 = p2.x + Math.tan(phi2) * p2.y;

    // orthogonal lines at the half way points
    // b = tan(phi)
    let b1 = Math.tan(phi1);
    let b2 = Math.tan(phi2);
    // x + b y = c
    // the intersection of the 2 lines is the arc center
    let c = {
        x: (c1 * b2 - c2 * b1) / (b2 - b1),
        y: (c2 - c1) / (b2 - b1)
    };

//    let radius = Math.sqrt((pt1.x - c.x)**2 + (pt1.y - c.y)**2);
    stopangle = 180 / Math.PI * Math.atan((pt1.y - c.y) / (pt1.x - c.x));
    startangle = 180 / Math.PI * Math.atan((pt3.y - c.y) / (pt3.x - c.x));
    sweepangle = stopangle - startangle;
    let r = {
      c: c,
      radius: Math.sqrt((pt1.x - c.x)**2 + (pt1.y - c.y)**2),
      startangle: startangle,
      stopangle:  stopangle,
      sweepangle: sweepangle
    };
    report("\n860 pt1: " + pt1.x + ", " + pt1.y + " pt2: " + pt2.x + ", " + pt2.y + " pt3: " + pt3.x + ", "  + pt3.y + "\n dx1 =  " + dx1 + " dy1 = " + dy1 + "\n dx2 = " + dx2 + " dy2 = " + dy2 + "\n dx3 = " + dx3 + " dy3 = " + dy3 + "\n p1 = " +p1.x + ", " + p1.y + " p2 = " + p2.x + ", " + p2.y + " theta1 = " + theta1 + " theta2 = " + theta2 + " phi1 = " + phi1 + " phi2 = " + phi2 + "\n arc x: " + r.c.x + " y: " + r.c.y + " radius: " + r.radius + " start: " + r.startangle + " stop: " + r.stopangle + " sweep: " + r.sweepangle + "\n");
    return(r);
  }

  getPhi(theta) {
    let phi = theta;
    if(theta >= 0)
    {
      phi = theta + Math.PI / 2;
    }
    else
    {
      phi = theta - Math.PI / 2;
    }
    if(phi >= Math.PI) phi = phi - Math.PI * 2;
    else if(phi < -Math.PI) phi = phi + Math.PI * 2;
    return(phi);
  }

  getSchematic() {
    let that = this;
    let p = new Promise(async function(resolve, reject) {
      clearReport();
      let obj = null;
      let d = "(obj \n (sch\n" + that.data + "\n))\n";
      that.setData(d);
      let k = that.lines.length;
      that.currentline = "";
      that.linepointer = 0;
      that.itempointer = 0;
      that.tokenCache = [];
      that.tokenCount = 0;
      obj = that.getKicadObject(that);
      if(debugK) report("961 " + JSON.stringify(obj, null, 4));
      if(obj != null)
      {
        let dcomp = null;
        dcomp = await that.makeSchematicFromKicadObject(obj, that);
        resolve(dcomp);
      }
     else reject("958 Kicad object is null");
     });
     return(p);
  }

  ky(y,env) {
    return(env.yadj - y);
  }


  async getSymbolFromKLib(path, lib_symbols, unit, env)
  {
    let that = env;
    let dcomp = null;
    let k1 = Object.keys(lib_symbols).length;
    report("1014 getSymbolFromKLib " + path + " unit = " + unit + " k1 = " + k1);
    let i1 = 0;
    let b1 = true;
    while(b1 && (i1 < k1))
    {
      if(lib_symbols[i1].kind == "symbol")
      {
        if(lib_symbols[i1][0] == path)
        {
          b1 = false;
          let o = lib_symbols[i1];
          dcomp = await that.makeSymbolFromKicadObject(o, unit, that);
          report("1027 " + dcomp.klass);

        }
      }
      i1 += 1;
    }
    return(dcomp);
  }

  async makeSchematicFromKicadObject(obj, env) {
    let that = env;
    let keys = Object.keys(obj);
    let sheetsize = "A";
    let sheetref = 100;
    that.yadj = (8500 - 100);
    let lib_symbols = null;
    let dcomp = new DComponent(de, 0, 0, 1, 0, 0, that.fname);
    dcomp.ncs = [];
    report("979 keys.length = " + keys.length);
    if(obj.kind == "sch")
    {
      if(obj[0].kind ==  "kicad_sch")
      {
        let oz = obj[0];
        let k0 = Object.keys(oz).length-1;
        report("986 kicad keys = " + k0);
        let i0 = 1;
        for(i0 = 1; i0 < k0; i0++)
        {
          let o = oz[i0];
//          report("1020 o.kind = " + o.kind);
          if(o.kind == "paper")
          {
            sheetsize = o[0];
            let a = setAttributeValue("paper", dcomp, sheetsize);
            a.setVisible(false);
//            report("1023 paper size = " + sheetsize);
            if((sheetsize == "B") || (sheetsize == "A3"))
            {
              document.getElementById("tbB").checked = true;
            }
            else if((sheetsize == "A") || (sheetsize == "A4"))
            {
              document.getElementById("tbA").checked = true;
            }
          }
          else if(o.kind == "title_block")
          {
              let k1 = Object.keys(o).length -1;
              let i1 = 0;
              for(i1 = 0; i1 < k1; i1++)
              {
                if(o[i1].kind == "title")
                {
                  report("1034 set Designname = " + o[i1][0]);
                  setAttributeValue("designname", dcomp, o[i1][0]);
                  report("1038 get " + getAttributeValue("designname", dcomp));
                }
                else if(o[i1].kind == "date")
                {
                  report("1042 set date = " + o[i1][0]);
                  setAttributeValue("date", dcomp, o[i1][0]);
                  report("1044 get " + getAttributeValue("date", dcomp));
                }
                else if(o[i1].kind == "rev")
                {
                  report("1047 set revision = " + o[i1][0]);
                  setAttributeValue("revision", dcomp, o[i1][0]);
                  report("1050 get " + getAttributeValue("revision", dcomp));
                }
                else if(o[i1].kind == "company")
                {
                  report("1052 set company = " + o[i1][0]);
                  setAttributeValue("company", dcomp, o[i1][0]);
                  report("1056 get " + getAttributeValue("company", dcomp));
                }
                else
                {
                  setAttributeValue(o[i1].kind, dcomp, o[i1][0]);
                }
              }
          }
          else if(o.kind == "lib_symbols")
          {
            lib_symbols = o;
          }
          else if(o.kind == "junction")
          {
              let k1 = Object.keys(o).length -1;
              let i1 = 0;
              let x = 0;
              let y = 0;
              let dia = 10;
              let col = "blue";
              let uuid = "";
              for(i1 = 0; i1 < k1; i1++)
              {
                if(o[i1].kind == "at")
                {
                  x = mmToCmils(o[i1][0]);
                  y = that.ky(mmToCmils(o[i1][1]), that);
                }
                else if(o[i1].kind == "diameter")
                {
                  dia = mmToCmils(o[i1][0]);
                }
                else if(o[i1].kind == "color")
                {
                  col = o[i1][0];
                }
                else if(o[i1].kind == "uuid")
                {
                  uuid = o[i1][0];
                }
              }
              let dj = new DJunction(de,x, y, JUNCTION_COLOR)
              setAttributeValue("uuid", dj, uuid);
              dcomp.doj.push(dj);
          }
          else if(o.kind == "no_connect")
          {
            let k1 = Object.keys(o).length -1;
            let i1 = 0;
            for(i1 = 0; i1 < k1; i1++)
            {
              if(o[i1].kind == "at")
              {
                let x = mmToCmils(o[i1][0]);
                let y = mmToCmils(o[i1][1]);
                dcomp.ncs.push({x: x, y: y});
              }
            }
          }
          else if(o.kind == "wire")
          {
              let k1 = Object.keys(o).length -1;
              let i1 = 0;
              let net = new DNet(de, 0, 0, 1, 1,NET_COLOR);
              let name = ste.schematic.getNewNetName();
              setAttributeValue("netname", net, name);
              for(i1 = 0; i1 < k1; i1++)
              {
                if(o[i1].kind == "pts")
                {
                  let oz = o[i1];
                  let k2 = Object.keys(oz).length - 1;
//                  report("1084 k2 = " + k2);
                  let a = [];
                  let i2 = 0;
                  for(i2 = 0; i2 < k2; i2++)
                  {
                    if(oz[i2].kind == "xy")
                    {
//                      report("1091 " + oz[i2][0] + " " + oz[i2][1]);
                      a[i2] = {x: mmToCmils(oz[i2][0]), y: that.ky(mmToCmils(oz[i2][1]), that) };
                    }
                  }
//                  report("1095 " + a.length);
                  if(a.length == 2)
                  {
                    net.setX(a[0].x);
                    net.setY(a[0].y);
                    net.setX2(a[1].x);
                    net.setY2(a[1].y);
                  }
                  dcomp.doj.push(net);
                }
                else if(o[i1].kind == "stroke")
                {
                }
                if(o[i1].kind == "uuid")
                {
                  setAttributeValue("uuid", net, o[i1][0]);
                }
              }
          }
          else if(o.kind == "polyline")
          {
            report("1217 polyline");
            let k1 = Object.keys(o).length -1;
            let i1 = 0;
            let dline = null;
            for(i1 = 0; i1 < k1; i1++)
            {
              let ox = o[i1];
              report("1224 " + ox.kind);
              if(ox.kind == "pts")
              {
                  let k2 = Object.keys(ox).length -1;
                  let a = [];
                  let i2 = 0;
                  for(i2 = 0; i2 < k2; i2 ++)
                  {
                    let oz = ox[i2];
                    report("1233 " + oz.kind);
                    if(oz.kind == "xy")
                    {
                      report("1235 " + oz[0] + " " + oz[1]);
                      a.push({x: mmToCmils(oz[0]), y: that.ky(mmToCmils(oz[1]), that) });
                    }
                  }
                  report("1236 a.length = " + a.length);
                  if(a.length == 2)
                  {
                    dline = new DLine(de, a[0].x, a[0].y, a[1].x, a[1].y, GRAPHIC_COLOR, 3, 0, 0, 0, 0);
                  }
                  if(dline != null) dcomp.doj.push(dline);
              }
              else if(ox.kind == "stroke")
              {
                  let oz = ox[i1];
                  let k2 = Object.keys(oz).length - 1;
                  let a = [];
                  let i2 = 0;
                  for(i2 = 0; i2 < k2; i2++)
                  {
                    if(oz[i2].kind == "width")
                    {
                      let width = oz[i2][0];
                    }
                    else if(oz[i2].kind == "type")
                    {
                      let type = oz[i2][0];
                    }
                  }
              }
              else if(ox.kind == "uuid")
              {
              }
            }
          }
          else if(o.kind == "text")
          {
            let txt = [];
            txt[0] = o[0];
            let a =  new DText(de, 0, 0, GRAPHIC_COLOR, 12, 1, 1, 0, 0, 1, txt);
            let k1 = Object.keys(o).length -2;
            let i1 = 0;
            for(i1 = 1; i1 < k1; i1++)
            {
              let ox = o[i1];
              if(ox.kind == "at")
              {
                let x = mmToCmils(ox[0]);
                let y = that.ky(mmToCmils(ox[1]), that);
                let angle = ox[2];
                if(a != null)
                {
                  a.setX(x);
                  a.setY(y);
                  a.setAngle(angle);
                }
              }
            }
            if(a != null)
            {
              dcomp.doj.push(a);
            }
          }
          else if(o.kind == "label")
          {
            let txt = o[0];
            let x = 0;
            let y = 0;
            let angle = 0;
            let k1 = Object.keys(o).length -2;
            let i1 = 0;
            for(i1 = 1; i1 < k1; i1++)
            {
              let ox = o[i1];
              if(ox.kind == "at")
              {
                x = mmToCmils(ox[0]);
                y = that.ky(mmToCmils(ox[1]), that) - 100; // 100 compensates for pin offset
                angle = ox[2];
              }
            }
            that.netlabels.push({netname: txt, x: x, y: y, angle: angle});
          }
          else if(o.kind == "global_label")
          {
            let txt = o[0];
            let a = null;
            let pt = "in";
            let k1 = Object.keys(o).length -2;
            let i1 = 0;
            for(i1 = 1; i1 < k1; i1++)
            {
              let ox = o[i1];
              if(ox.kind == "shape")
              {
                let tpe = ox[0];
                let link = "";
                if(tpe == "output") {link = "eo_output_port.sym"; pt = "out";}
                else if(tpe == "input") link = "eo_input_port.sym";
                else if(tpe == "bidirectional") {link = "eo_inout_port.sym"; pt="inout";}
                else if(tpe == "tri_state") {link = "eo_inout_port.sym"; pt="inout";}
                else if(tpe == "passive") {link = "eo_input_port.sym"; pt="inout";}
                if(link != "")
                {
                  a = getBuiltInSymbol(link);
                  sheet.setState(STATE_IDLE);
                }
              }
              if(ox.kind == "at")
              {
                let x = mmToCmils(ox[0]);
                let y = that.ky(mmToCmils(ox[1]), that) - 100; // 100 compensates for pin offset
                let angle = ox[2];
                if(a != null)
                {
                  a.setX(x);
                  a.setY(y);
                  a.setAngle(angle);
                }
              }
            }
            if(a != null)
            {
              let pin = a.getPinByNumber(1);
              setAttributeValue("pinlabel", pin, txt);
              setAttributeValue("pintype", pin, pt);
              let ff = getAttributeValue("labelissignal", a);
              report("1277 ff = " + ff);
              if(ff == true) pin.connectedSignal = txt;
              dcomp.doj.push(a);
            }
          }
          else if(o.kind == "sheet")
          {
            let k1 = Object.keys(o).length -1;
            let i1 = 0;
            let path = "";
            let x = 0;
            let y = 0;
            let width = 10;
            let height = 10;
            let unit = 1;
            let dj = new DComponent(de, 0, 0, 1, 0, 0, null);
            setAttributeValue("refdes", dj, "SHEET_" + sheetref);
            sheetref += 1;
            let db = null;
            for(i1 = 0; i1 < k1; i1++)
            {
              if(o[i1].kind == "at")
              {
                x = mmToCmils(o[i1][0]);
                y = that.ky(mmToCmils(o[i1][1]), that);
                report("1330 " + x + " " + y);
                if(dj != null)
                {
                  dj.setX(x);
                  dj.setY(y);
                }
              }
              if(o[i1].kind == "size")
              {
                width =  mmToCmils(o[i1][0]);
                let h = o[i1][1] / 25.4 * 1000;
//                report("1347 " + h);
                let height1 = that.ky(mmToCmils(o[i1][1]), that);
                report("1348 width = " + width + " height = " + h + " " + o[i1][1] + " x = " + x + " y = " + y);
                db = new DBox(de, 0, 0, width, -h, GRAPHIC_COLOR, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
                dj.addDrawingObject(db);
              }
              if(o[i1].kind == "property")
              {
                let ox = o[i1];
                let a = null;
                let d = ox[0];
                  a = setAttributeValue(d, dj, ox[1]);
                  a.setVisible(false);
              }
              if(o[i1].kind == "pin")
              {
                let ox = o[i1];
                let pinlabel = ox[0];
                let pintype = ox[1];
                let pinseq = 1;
                let angle = 0;
                let x2 = 0;
                let y2 = 0;
                let k2 = Object.keys(ox).length -2;
                let i2 = 0;
                for(i2 = 2; i2 < k2; i2++)
                {
                  if(ox[i2].kind == "at")
                  {
                    x2 = mmToCmils(ox[i2][0]);
                    y2 = that.ky(mmToCmils(ox[i2][1]), that);
                    angle = ox[i2][2];
                    report("1370 x2 = " + x2 + " y2 = " + mmToCmils(ox[i2][1]) + " " + y2);
                  }
                }
                let we = 0;
                let dp = new DPin(de, x2, y2, x2, y2, PIN_COLOR, 0, we, 8);
                dp.setAngle(angle);
                setAttributeValue("pintype", dp, pintype);
                setAttributeValue("pinseq", dp, pinseq);
                setAttributeValue("pinnumber", dp, pinseq);
                setAttributeValue("pinlabel", dp, pinlabel);
                pinseq += 1;
                dj.addDrawingObject(dp);
              }
            }
            dcomp.doj.push(dj);

          }
          else if(o.kind == "symbol")
          {
            let k1 = Object.keys(o).length -1;
            let i1 = 0;
            let path = "";
            let x = 0;
            let y = 0;
            let unit = 1;
            let dj = null;
            let mirror = "";
            for(i1 = 0; i1 < k1; i1++)
            {
              if(o[i1].kind == "lib_id")
              {
                path = o[i1][0];
              }
              if(o[i1].kind == "unit")
              {
                unit = o[i1][0];
              }
              if(o[i1].kind == "mirror")
              {
                mirror = o[i1][0];
              }
            }
            if(path != "")
            {
              dj = await that.getSymbolFromKLib(path, lib_symbols, unit, that);
              let a = setAttributeValue("path", dj, path);
              a.setVisible(false);
              let j = path.lastIndexOf(":");
              if(j != -1)
              {
                let nm = path.substring(j+1);
                if(!isNaN(nm.charAt(0))) nm = "$" + nm;
  /*              if((unit != null) && (unit != 1))
                {
                  nm =
                }
                */
                setAttributeValue("device", dj, nm);
              }
            }
            for(i1 = 0; i1 < k1; i1++)
            {
              if(o[i1].kind == "at")
              {
                x = mmToCmils(o[i1][0]);
                y = that.ky(mmToCmils(o[i1][1]), that);
                let angle = o[i1][2];
                report("1250 " + mmToCmils(o[i1][1]) + " " + y);
                if(dj != null)
                {
                  dj.setX(x);
                  dj.setY(y);
                  if(angle == 90) angle = 270;
                  else if(angle == 270) angle = 90;
                  dj.setAngle(angle);
                }
              }
              if(o[i1].kind == "property")
              {
                let ox = o[i1];
                let a = null;
                let d = ox[0];
                {
                try{
                  d = ox[1].toUpperCase();
                }
                catch(e){report("1232 error " + o[1]);};
                }
                if(ox[0] == "Reference")
                {
                  if(isNaN(d.charAt(d.length - 1))) d = d + "?";
                  a = setAttributeValue("refdes", dj, d);
                  a.setVisible(true);
                }
                else if(ox[0] == "Value")
                {
                  a =  setAttributeValue("value", dj, d);
                  a.setVisible(true);
                }
                else if(ox[0] == "Footprint")
                {
                  a = setAttributeValue("footprint", dj, d);
                  a.setVisible(false);
                }
                else if(ox[0] == "Description")
                {
                  a = setAttributeValue("description", dj, d);
                  a.setVisible(false);
                }
                else if(ox[0] == "Datasheet")
                {
                  a = setAttributeValue("datasheet", dj, d);
                  a.setVisible(false);
                }
                /*
                else
                {
                  report("1260 " + o[0] + " " + d);
                  a = setAttributeValue(o[0], dj, d);
                  a.setVisible(false);
                }
                */
                let k2 = Object.keys(o).length -2;
                let i2 = 2;
                for(i2 = 2; i2 < k2; i2++)
                {
                  let ox = o[i2];
                  if(ox.kind == "at")
                  {
                    x = mmToCmils(ox[i2][0]);
                    y = that.ky(mmToCmils(ox[i2][1]), that);
                    let angle = ox[i2][2];
                    if(a != null)
                    {
                      a.setX(x);
                      a.setY(y);
                      a.setAngle(angle);
                    }
                  }
                  if(ox.kind == "effects")
                  {
                    let k3 = Object.keys(ox).length -1;
                    let i3 = 0;
                    for(i3 = 0; i3 < k3; i3++)
                    {
                      let oz = ox[i3];
                      if((oz.kind == "hide") && (a != null))
                      {
                        if(oz[0] == "yes")
                        {
                          a.setVisible(false);
                        }
                        else
                          a.setVisible(true);
                      }
                    }
                  }
                }
              }
            }
            if(mirror == "y")
            {
//              dj.setAngle(dj.angle);
              dj.mirror = 1;
            }
            else if(mirror == "x")
            {
              let a = (Number(dj.angle) + 180) % 360;
//              report("1605 " + a + " " + dj.angle);
              dj.setAngle(a);
              dj.mirror = 1;

            }
            dcomp.doj.push(dj);

          }


        }
      }
    }

    // fixups
    dcomp.doj.forEach((obj) => {
      let av = getAttributeValue("refdes", obj);
      if((av != null) && (av.indexOf("#PWR") == 0))
      {
        if(getAttributeValue("value", obj) == "GND")
        {
          setAttributeValue("net", obj, "GND:1");
          obj.getPinByNumber(1).setWhichEnd(1);
          obj.setY(obj.getY() - 100);  // fudge for kicad's GND symbol
        }
        else
        {
          let pwrnet = getAttributeValue("value", obj);
          setAttributeValue("net", obj, pwrnet + ":1");
        }
        getAttribute("refdes",obj).setVisible(false);
        getAttribute("device",obj).setVisible(false);
        getAttribute("value",obj).setVisible(false);
      }
      else if(av != null)
      {
        getAttribute("device",obj).setVisible(false);
      }

    });

    return(dcomp);
  }

  fixKicadnetnames(sh) {
    let k1 = this.netlabels.length;
    let i1 = 0;
    for(i1 = 0; i1 < k1; i1++)
    {
      let label = this.netlabels[i1];
      let curname = sh.getNetNameAt(label.x, label.y);
      if(curname != null)
      {
        renameNet(curname, label.netname);
      }
      else
      {
        report("1451 no net at " + label.x + ", " + label.y + " " + label.netname);
//        {netname: txt, x: x, y: y, angle: angle}
        let txt = [];
        txt[0] = label.netname;
        let a =  new DText(de, 0, 0, GRAPHIC_COLOR, 12, 1, 1, 0, 0, 1, txt);
        a.setX(label.x);
        a.setY(label.y);
        a.setAngle(label.angle);
        if(a != null)
        {
          a.setVisible(true);
          sh.DrawingObjects.push(a);
        }
      }
    }
  }

  updateNets() {
    report("1651 updateNets");
    let Comps = ste.schematic.getComponents();
    this.parity = 1;
    let obj = this.getKicadObject(this);
//    report("1662 " + Object.keys(obj).length);
//    report("1663 " + JSON.stringify(obj, null, 4));
    let k1 = Object.keys(obj).length -1;
    let i1 = 0;
    for(i1 = 0; i1 < k1; i1++)
    {
      if(obj[i1].kind == "nets")
      {
        let o = obj[i1];
        let code = "";
        let netname = "";
        let k2 = Object.keys(o).length -1;
        let i2 = 0;
        for(i2 = 0; i2<k2; i2++)
        {
          if(o[i2].kind == "net")
          {
            let o3 = o[i2];
            let k3 = Object.keys(o3).length -1;
            let i3 = 0;
            for(i3=0; i3<k3; i3++)
            {
              if(o3[i3].kind == "code")
              {
                code = o3[i3][0];
              }
              else if(o3[i3].kind == "name")
              {
                netname = o3[i3][0];
              }
              else if(o3[i3].kind == "node")
              {
                let o4 = o3[i3];
                let k4 = Object.keys(o4).length -1;
                let ref = "";
                let pinnumber = "";
                let pinfunction = "";
                let pintype = "";
                let i4 = 0;
                for(i4=0; i4<k4; i4++)
                {
                  if(o4[i4].kind == "ref")
                  {
                    ref =  o4[i4][0];
                  }
                  else if(o4[i4].kind == "pin")
                  {
                    pinnumber = o4[i4][0];
                  }
                  else if(o4[i4].kind == "pinfunction")
                  {
                    pinfunction = o4[i4][0];
                  }
                  else if(o4[i4].kind == "pintype")
                  {
                    pintype = o4[i4][0];
                  }
                }
                report("1705 " + netname + " " + ref + "-" + pinnumber);
                let comp = getComponentByRef(ref, Comps);
                if(comp != null)
                {
                   let dpin = comp.getPinByNumber(pinnumber);
                   if(dpin != null) dpin.connectedSignal = netname;
                   else report("1710 unable to find pin " + ref + "-" + pinnumber);
                }
                else report("1711 unable to find " + ref);
              }
            }


          }
        }
      }
    }


  }

} // end of KParser

function addTabs(n)
{
  let i = 0;
  let s = "";
  for(i=0; i<n; i++) s += "\t";
  return(s);
}

function exportKicadSymbolData(dcomp, bLib)
{
  let s = "";
  let tabs = 2;
  if(bLib)
  {
    s += "(kicad_symbol_lib\n\t(version 20231120)\n\t(generator \"eightolives_Schematic\")\n\t(generator_version \"1.0\")\n";
    tabs = 1;
  }
  let sname = getAttributeValue("device", dcomp);
  s += addTabs(tabs) + "(symbol \"" + sname + "\"\n\t\t(pin_names\n\t\t\t(offset 0.254) hide)\n";
  s += "\t\t(exclude_from_sim no)\n\t\t(in_bom yes)\n\t\t(on_board yes)\n";
  // attributes
  let a = dcomp.attributes;
  let k = a.length;
  let i = 0;
  tabs = 2;
  for(i=0; i<k; i++)
  {
    s += addTabs(tabs) + "(property \"" + a[i].name + "\" \"" + a[i].value + "\"\n";
    s += addTabs(tabs+1) + "(at " + CmilsToMm(a[i].x) + " " + CmilsToMm(a[i].y) + " 0)\n";
    s += addTabs(tabs+1) + "(effects\n" + addTabs(tabs+2) + "(font\n" + addTabs(tabs+3) + "(size 1.27 1.27)\n";
    s += addTabs(tabs+2) + ")\n" + addTabs(tabs+1) + ")\n" + addTabs(tabs) + ")\n";
  }

  // dojs
  s += addTabs(tabs) + "(symbol \"" + sname + "_0_1\"\n";
  let objs = dcomp.doj;
  k = objs.length;
  i = 0;
  for(i=0; i<k; i++)
  {
    report("1502 " + objs[i].klass);
    let d = objs[i];
    switch(d.klass)
    {
      case "DCircle":
        s += addTabs(tabs+1) + "(circle\n";
        s += addTabs(tabs+2) + "(center " + CmilsToMm(d.getX()) + " " + CmilsToMm(d.getY()) + ")\n";
        s += addTabs(tabs+2) + "(radius " + CmilsToMm(d.getRadius()) + ")\n";
        s += addTabs(tabs+2) + "(stroke \n" + addTabs(tabs+3) + "(width 0.254)\n" + addTabs(tabs+3) + "(type default)\n" + addTabs(tabs+2) + ")\n";
        s += addTabs(tabs+2) + "(fill \n" + addTabs(tabs+3) + "(type none)\n" + addTabs(tabs+2) + ")\n";
        s += addTabs(tabs+1) + ")\n";
        break;
      case "DArc":
        let start = {x: d.x + d.radius * Math.cos(Math.PI * d.startangle /180), y: d.y + d.radius * Math.cos(Math.PI * d.startangle /180)};
        let a = d.startangle + d.sweepangle;
        let end = {x: d.x + d.radius * Math.cos(Math.PI * a /180), y: d.y + d.radius * Math.cos(Math.PI * a /180)};
        a = d.startangle + d.sweepangle / 2;
        let mid = {x: d.x + d.radius * Math.cos(Math.PI * a /180), y: d.y + d.radius * Math.cos(Math.PI * a /180)};
        s += addTabs(tabs+1) + "(arc\n";
        s += addTabs(tabs+2) + "(start " + CmilsToMm(start.x) + " " + CmilsToMm(start.y) + ")\n";
        s += addTabs(tabs+2) + "(mid " + CmilsToMm(mid.x) + " " + CmilsToMm(mid.y) + ")\n";
        s += addTabs(tabs+2) + "(end " + CmilsToMm(end.x) + " " + CmilsToMm(end.y) + ")\n";
        s += addTabs(tabs+2) + "(stroke \n" + addTabs(tabs+3) + "(width 0.254)\n" + addTabs(tabs+3) + "(type default)\n" + addTabs(tabs+2) + ")\n";
        s += addTabs(tabs+2) + "(fill \n" + addTabs(tabs+3) + "(type none)\n" + addTabs(tabs+2) + ")\n";
        s += addTabs(tabs+1) + ")\n";
        break;
      case "DLine":
        s += addTabs(tabs+1) + "(polyline\n";
        s += addTabs(tabs+2) + "(pts\n";
        s += addTabs(tabs+3) + "(xy " + CmilsToMm(d.getX()) + " " + CmilsToMm(d.getY()) + ") " + "(xy " + CmilsToMm(d.getX2()) + " " + CmilsToMm(d.getY2()) + ")\n";
        s += addTabs(tabs+2) + ")\n";
        s += addTabs(tabs+2) + "(stroke \n" + addTabs(tabs+3) + "(width 0)\n" + addTabs(tabs+3) + "(type default)\n" + addTabs(tabs+2) + ")\n";
        s += addTabs(tabs+2) + "(fill \n" + addTabs(tabs+3) + "(type none)\n" + addTabs(tabs+2) + ")\n";
        s += addTabs(tabs+1) + ")\n";
        break;
      case "DPath":
        s += addTabs(tabs+1) + "(polyline\n";
        s += addTabs(tabs+2) + "(pts\n";
        let dd = d.segments;
        let k = dd.length;
        let i2 = 0;
        s += addTabs(tabs+3) + "(xy " +  CmilsToMm(dd[i2].x1) + " " + CmilsToMm(dd[i2].y1) + ") ";
        for(i2=0; i2<k; i2++)
        {
          s += " (xy " +  CmilsToMm(dd[i2].x2) + " " + CmilsToMm(dd[i2].y2) + ") ";
        }
        s += "\n" + addTabs(tabs+2) + ")\n";
        s += addTabs(tabs+2) + "(stroke \n" + addTabs(tabs+3) + "(width 0)\n" + addTabs(tabs+3) + "(type default)\n" + addTabs(tabs+2) + ")\n";
        s += addTabs(tabs+2) + "(fill \n" + addTabs(tabs+3) + "(type none)\n" + addTabs(tabs+2) + ")\n";
        s += addTabs(tabs+1) + ")\n";
        break;
      case "DBox":
        s += addTabs(tabs+1) + "(rectangle\n";
        s += addTabs(tabs+2) + "(start " + CmilsToMm(d.getX()) + " " + CmilsToMm(d.getY()) + ")\n";
        s += addTabs(tabs+2) + "(end " + CmilsToMm(d.getX2()) + " " + CmilsToMm(d.getY2()) + ")\n";
        s += addTabs(tabs+2) + "(stroke \n" + addTabs(tabs+3) + "(width 0)\n" + addTabs(tabs+3) + "(type default)\n" + addTabs(tabs+2) + ")\n";
        s += addTabs(tabs+2) + "(fill \n" + addTabs(tabs+3) + "(type none)\n" + addTabs(tabs+2) + ")\n";
        s += addTabs(tabs+1) + ")\n";
        break;
      case "DPin":
        // no graphic required
        break;
      default:
        report("1519 unsupported: " + objs[i].klass);
        break;
    }
  }


  s += addTabs(tabs) + ")\n";
  // pins
  s += addTabs(tabs) + "(symbol \"" + sname + "_1_1\"\n";
  a = dcomp.getPins();
  k = a.length;
  i = 0;
  for(i=0; i<k; i++)
  {
    let pin = a[i];
    let kpin = "passive";
    let t = getAttributeValue("pintype", pin);
    if(t == "pwr") kpin = "power_in";
    else if(t == "io") kpin = "bidirectional";
    else if(t == "pas") kpin = "passive";
    else if(t == "out") kpin = "output";
    else if(t == "in") kpin = "input";
    else if(t == "oc") kpin = "open_collector";
    else if(t == "oe") kpin = "open_emitter";
 //   else if(pintype == "no_connect") t = "pas";
    s += addTabs(tabs+1) + "(pin " + kpin + " line\n";
    let ang = Number(a[i].getAngle());
    let deltax = a[i].x1 - a[i].x2;
    let deltay = a[i].y1 - a[i].y2;
//    report("1591 pin " + getAttributeValue("pinnumber", pin) + " deltax = " + deltax + " deltay = " + deltay + " we = " + a[i].whichend + " ang = " + ang);
    let adel = 180;
    if(deltax == 0) adel = 90;
    if(deltay < 0) adel = 270;
    if(a[i].whichend == 1)
    {
      ang += adel;
      if(ang > 359) ang -= 180;
    }
//    s += addTabs(tabs+2) + "(at " + CmilsToMm(a[i].getX()) + " " + CmilsToMm(a[i].getY()) + " " + a[i].getAngle() + ")\n";
    s += addTabs(tabs+2) + "(at " + CmilsToMm(a[i].xw) + " " + CmilsToMm(a[i].yw) + " " + ang + ")\n";
    let length = Math.abs(CmilsToMm(a[i].getX() - a[i].getX2() + a[i].getY() - a[i].getY2()));
    s += addTabs(tabs+2) + "(length " + length + ")\n";
    s += addTabs(tabs+2) + "(name \"" + getAttributeValue("pinlabel", pin) + "\"\n";
    s += addTabs(tabs+3) + "(effects" + "\n" + addTabs(tabs+4) + "(font\n" +  addTabs(tabs+5) + "(size 1.27 1.27)\n";
    s += addTabs(tabs+4) + ")\n" + addTabs(tabs+3) + ")\n" + addTabs(tabs+2) + ")\n";
    s += addTabs(tabs+2) + "(number \"" + getAttributeValue("pinnumber", pin) + "\"\n";
    s += addTabs(tabs+3) + "(effects" + "\n" + addTabs(tabs+4) + "(font\n" + addTabs(tabs+5) + "(size 1.27 1.27)\n";
    s += addTabs(tabs+4) + ")\n" + addTabs(tabs+3) + ")\n" + addTabs(tabs+2) + ")\n";
    s += addTabs(tabs+1) + ")\n"
  }
  s += addTabs(tabs) + ")\n";

  if(bLib) s += "\t)\n)\n\n";
  else s += addTabs(tabs) + ")\n\n";
  return(s);
}

function cy(y)
{
  return(8500 - y);
}

function exportKicadSchematic(sheets)
{
  let s = "";
  let sm = ste.getSchematic();
  let project = getAttributeValue("designname", sheets[0].getTitleSheet());
  //let sheets = sm.sheets;
  let tabs = 1;
  s += "(kicad_sch\n\t(version 20231120)\n\t(generator \"eightolives_Schematic\")\n\t(generator_version \"8.0\")\n";
  let mark = Number( Date.now().toString().substring(1));
  let index = 1;
  let uuid = "00000000-0000-0000-0000-" + mark;
  report("1628 uuid = " + uuid);
  s += addTabs(1) + "(uuid \"" + uuid + "\")\n";
  s += addTabs(1) +	"(paper \"A4\")\n";
  let path = "00000000-0000-0000-0000-" + (Number(mark) + index);
  index += 1;

  let title = getAttributeValue("designname", sheets[0]);
  let date = (new Date()).toDateString();
  let rev = getAttributeValue("revision", sheets[0]);
  let company = getAttributeValue("company", sheets[0]);
  let copyright = getAttributeValue("copyright", sheets[0]);
  s += addTabs(1) +	"(title_block\n";
  s += addTabs(2) +	"(title \"" + title + "\")\n";
  s += addTabs(2) +	"(date \"" + date + "\")\n";
  s += addTabs(2) +	"(rev \"" + rev + "\")\n";
  s += addTabs(2) +	"(company \"" + company + "\")\n";
//  s += addTabs(2) +	"(copyright \"" + copyright + "\")\n";
  s += addTabs(1) + ")\n\n";

  // lib symbols
  s += addTabs(1) + "(lib_symbols\n";
  let dojs = null;
  let symbs = [];
  let vdj = sm.getComponents();
  vdj.forEach((comp) => {
    report("1650 " + comp.klass + " " + getAttributeValue("refdes", comp) + " " + getAttributeValue("device", comp));
    if(addUniqueStringToArray(getAttributeValue("device", comp), symbs))
    {
       s += exportKicadSymbolData(comp, false) + "\n\n";
    }
  });
  s += addTabs(1) + ")\n\n";

  // for each junction
  let x = 0;
  let y = 0;
  s += addTabs(1) + "(junction\n\t\t(at " + x + " " + y + ")\n\t\t(diameter 1.016)\n\t\t(color 0 0 0 0)\n";
  uuid = "00000000-0000-0000-0000-" + (Number(mark) + index);
  index += 1;
  s += addTabs(2) + "(uuid \"" + uuid + "\")\n\t)\n";

  //no connects

  // bus entry

  // wire and bus
  dojs = sheets[0].DrawingObjects;
  dojs.forEach((doj) => {
    if(doj.klass == "DNet")
    {
      s += addTabs(1) +	"(wire\n";
      x = CmilsToMm(doj.getX());
      y = CmilsToMm(cy(doj.getY()));
      let x2 = CmilsToMm(doj.getX2());
      let y2 = CmilsToMm(cy(doj.getY2()));
      s += addTabs(2) +	"(pts\n" + addTabs(3) + "(xy " + x + " " + y + ") (xy " + x2 + " " + y2 + ")\n" + addTabs(2) + ")\n";
      s += addTabs(2) +	"(stroke\n" + addTabs(3) + "(width 0)\n" + addTabs(3) + "(type solid)\n" + addTabs(2) + ")\n";
      uuid = "00000000-0000-0000-0000-" + (Number(mark) + index);
      index += 1;
      s += addTabs(2) + "(uuid \"" + uuid + "\")\n\t)\n\n";
    }
  });

  // images

  // graphical lines

  // graphical text

  // label

  // global labels

  // hierarchal labels

  // symbols
  dojs = sheets[0].DrawingObjects;
  dojs.forEach((doj) => {
    if(doj.klass == "DComponent")
    {
      s += addTabs(1) +	"(symbol\n";
      x = CmilsToMm(doj.getX());
      y = CmilsToMm(cy(doj.getY()));
      let angle = doj.getAngle();
      s += addTabs(2) +	"(lib_id \"" + getAttributeValue("device", doj) +"\")\n";
      s += addTabs(2) +	"(at " + x + " " + y + " " + angle + ")\n";
	  s += addTabs(2) +	"(exclude_from_sim no)\n";
	  s += addTabs(2) +	"(in_bom yes)\n";
	  s += addTabs(2) +	"(on_board yes)\n";
	  s += addTabs(2) +	"(dnp no)\n";
      uuid = "00000000-0000-0000-0000-" + (Number(mark) + index);
      index += 1;
      s += addTabs(2) + "(uuid \"" + uuid + "\")\n";
      let atts = doj.attributes;
      atts.forEach((att) => {
        let nm = att.name;
        let nz = "";
        if(nm == "refdes") nz = "Reference";
        else if(nm == "description") nz = "Description";
        else if(nm == "datasheet") nz = "Datasheet";
        else if(nm == "footprint") nz = "Footprint";
        else if(nm == "value") nz = "Value";
        else nz = nm;

        s += addTabs(2) + "(property \"" + nz + "\" \"" + att.value + "\"\n";
        s += addTabs(3) + "(at " + CmilsToMm(att.getX()) + " " + CmilsToMm(cy(att.getY())) + " " + att.getAngle() + ")\n";
        s += addTabs(3) + "(effects\n";
		s += addTabs(4) + "(font\n";
		s += addTabs(5) + "(size 1.524 1.524)\n";
		s += addTabs(4) + ")\n";
		s += addTabs(4) + "(hide yes)\n";
		s += addTabs(3) + ")\n";
		s += addTabs(2) + ")\n";

      });
      let pins = doj.getPins();
      pins.forEach((pin) => {
        s += addTabs(2) + "(pin \"" + getAttributeValue("pinnumber", pin) + "\"\n";
        uuid = "00000000-0000-0000-0000-" + (Number(mark) + index);
        index += 1;
        s += addTabs(3) + "(uuid \"" + uuid + "\")\n";
        s += addTabs(2) + ")\n";
      });
      s += addTabs(2) + "(instances\n";
      s += addTabs(3) + "(project \"" + project + "\"\n";
      s += addTabs(4) + "(path \"" + path + "\"\n";
      let rd = getAttributeValue("refdes", doj);
      let unit = 1;
      let lc = rd.charAt(rd.length -1);
      if(isNaN(lc))
      {
        if(lc == 'b') unit = 2;
        else if(lc == 'c') unit = 3;
        else if(lc == 'd') unit = 4;
        else if(lc == 'e') unit = 5;
        else if(lc == 'f') unit = 6;
        else if(lc == 'g') unit = 7;
        else if(lc == 'h') unit = 8;
        else if(lc == 'i') unit = 9;
        else if(lc == 'j') unit = 10;
        else if(lc == 'k') unit = 11;
      }
      s += addTabs(5) + "(reference \"" + rd + "\")\n";
      s += addTabs(5) + "(unit " + unit + ")\n";
      s += addTabs(4) + ")\n";
      s += addTabs(3) + ")\n";
      s += addTabs(2) + ")\n";
      s += addTabs(1) + ")\n";
    }
  });

  // hierarchal sheets

  // hierarchal sheet pin definition

  // root sheet instance



  s += ")\n\n";
  return(s);
}


