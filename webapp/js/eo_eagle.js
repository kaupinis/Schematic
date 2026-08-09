// eo_eagle.js

class eagleParser{
    constructor(fname)
    {
        this.fname = fname;
        this.data = "";
        this.o = null;
        this.bFirstSchematicSheet = true;
        this.xoffset = 0;
        this.yoffset = 0;
        if(this.fname.indexOf(".sch") != -1)
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
        clearReport();
        report("11 eagleParser");
    }
    
    setData(data) {
        this.data = data;
        let b = true;
        try{
          this.o = xml2js(this.data, {compact: true, spaces:4});
          report("69: " + JSON.stringify(this.o, null, 4));
        }
        catch(e){b = false; report("18: parse error " + e);}
        return(b);
    }

    /*
    getnextToken() {


    makeObject(s, that)
    {

    }

    getEagleObject(env)
    {
      let that = env;

    }



    getSymbol(part)
    {
      let parts = xmlDoc.getElementsByTagName("part");
      let k = parts.length;
      let i = 0;
      let b = true;
      while(b && (i < k))
      {
        if(parts[i].getAttribute("
      }

    }
    */

    getLibraryByName(name) {
      let a = [];
      let g = this.o.eagle.drawing.schematic.libraries.library;
      if(Array.isArray(g)) a = g;
      else a.push(g);
      let k = a.length;
      let i = 0;
      let b = true;
      let d = null;
      while(b && (i < k))
      {
        if(a[i]._attributes.name == name)
        {
          b = false;
          d = a[i];
        }
        else i += 1;
      }
      return(d);
    }

    getItemFromArray(name, a) {
      let k = a.length;
      let i = 0;
      let b = true;
      let d = null;
      while(b && (i < k))
      {
        if(typeof a[i]._attributes === 'undefined')
        {
          report("85 " + name + " " + i + " " + JSON.stringify(a[i], null, 4));
          b = false;
        }
        else if(a[i]._attributes.name == name)
        {
          b = false;
          d = a[i];
        }
        else i += 1;
      }
      return(d);
    }

    getArrayOfObject(obj)
    {
      let a = [];
      if(obj == null) ;
      else if(Array.isArray(obj)) a = obj;
      else a.push(obj);
      return(a);
    }

    getSymbolByRef(refdes, gate) {
      let dc = null;
      let parts = this.getArrayOfObject(this.o.eagle.drawing.schematic.parts.part);
//      report("104 a = " + a + " refdes = " + refdes + " " + JSON.stringify(a[0], null, 4));
      let d = this.getItemFromArray(refdes, parts);
      if(d != null)
      {
          let library = d._attributes.library;
          let deviceset = d._attributes.deviceset;
          let symbolname = deviceset;
          let device = d._attributes.device;
          let value = "";
          if(typeof d._attributes.value !== 'undefined') value = d._attributes.value;
          dc = new DComponent(de, 0, 0, 1, 0, 0, library + "_" + deviceset + "_" + device + " " + value);
          setAttributeValue("refdes", dc, refdes);
          if(value != "") setAttributeValue("value", dc, value);
          let libraries = this.getArrayOfObject(this.o.eagle.drawing.schematic.libraries.library);
          let lib = this.getItemFromArray(library, libraries);
          if(lib != null)
          {
            let devicesets = this.getArrayOfObject(lib.devicesets.deviceset);
            let ds = this.getItemFromArray(deviceset, devicesets);
            if(ds != null)
            {
              let gates = this.getArrayOfObject(ds.gates.gate);
              let g = this.getItemFromArray(gate, gates);
              if(g != null)
              {
                symbolname = g._attributes.symbol;   
              }
            }
            let symbols = this.getArrayOfObject(lib.symbols.symbol);
            let symbol = this.getItemFromArray(symbolname, symbols);
            if(symbol != null)
            {
              let wires = this.getArrayOfObject(symbol.wire);
              wires.forEach((wire) => {
                let x1 = mmToCmils(wire._attributes.x1);
                let y1 = mmToCmils(wire._attributes.y1);
                let x2 = mmToCmils(wire._attributes.x2);
                let y2 = mmToCmils(wire._attributes.y2);
                let dline = new DLine(de, x1, y1, x2, y2, GRAPHIC_COLOR, 3, 0, 0, 0, 0);
                dc.addDrawingObject(dline);
//                dc.doj.push(dline);
              });

              let boxes = this.getArrayOfObject(symbol.rectangle);
//              report("140 " + JSON.stringify(boxes, null, 4));
              boxes.forEach((rectangle) => {
                let x1 = mmToCmils(rectangle._attributes.x1);
                let y1 = mmToCmils(rectangle._attributes.y1);
                let x2 = mmToCmils(rectangle._attributes.x2);
                let y2 = mmToCmils(rectangle._attributes.y2);
                let dbox = new DBox(de, x1, y1, x2 - x1, y1 - y2, GRAPHIC_COLOR, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
                dc.addDrawingObject(dbox);
//                dc.doj.push(dbox);
              });

              let circles = this.getArrayOfObject(symbol.circle);
              circles.forEach((circle) => {
                let x = mmToCmils(circle._attributes.x);
                let y = mmToCmils(circle._attributes.y);
                let radius = mmToCmils(circle._attributes.radius);
                let db = new DCircle(de, x, y, radius, GRAPHIC_COLOR, 0, 0, 0, 0,0, 0, 0, 0,0, 0, 0);
                dc.addDrawingObject(db);
//                dc.doj.push(db);
              });

              let polygons = this.getArrayOfObject(symbol.polygon);
              polygons.forEach((poly) => {
                let db = new DPath(this.de, GRAPHIC_COLOR, 2, 0, 0, 0, 0,0,0,0,0,0,0,0);
                let vertices = this.getArrayOfObject(poly.vertex);
                let bFirst = true;
                vertices.forEach((vertex) => {
                  if(bFirst)
                  {
                    bFirst = false;
                    db.setX(mmToCmils(vertex._attributes.x));
                    db.setY(mmToCmils(vertex._attributes.y));
                  }
                  else
                  {
                    db.addLineSegment(mmToCmils(vertex._attributes.x), mmToCmils(vertex._attributes.y));
                  }
                });
                dc.addDrawingObject(db);
//                dc.doj.push(db);
              });

              let pins = this.getArrayOfObject(symbol.pin);
              let pinseq = 1;
              pins.forEach((pin) => {
                let x = mmToCmils(pin._attributes.x);
                let y = mmToCmils(pin._attributes.y);
                let name = pin._attributes.name;
                let length = 100;
                let x2 = x + length;
                let y2 = y;
                let angle = 0;
                let we = 0;
                let align = 1;
                let balign = 6;
                if(typeof pin._attributes.rot !== 'undefined')
                {
                  let rot = pin._attributes.rot;
                  if(rot == "R90") angle = 270;
                  else if(rot == "R180") angle = 180;
                  else if(rot == "R270") angle = 90;
                }

                let pintype = "io";
                if(typeof pin._attributes.direction !== 'undefined')
                {
                  let dir = pin._attributes.direction;

                  if(dir == "sup") pintype = "pwr";
                  else if(dir == "pwr") pintype = "pwr";
                  else if(dir == "pas") pintype = "pas";

                }

                let dp = new DPin(de, x, y, x2, y2, PIN_COLOR, 0, we, 8);
                dp.setAngle(angle);
                // setAttributeValue("pintype", dp, t);
                setAttributeValue("pinseq", dp, pinseq);
//                if(pinname == "~") pinname = "P" + pinseq;
                pinseq += 1;
//              setAttributeValue("pinlabel", dp, label);
                let ShowPname = true;
                let newt = new DText(de, x2, y2,ATTRIBUTE_COLOR, 6, ShowPname, 1, angle, align, 1, [name]);
                newt.name = "pinlabel";
                newt.value = name;
                dp.addAttribute(newt);
                setAttributeValue("pintype", dp, pintype);
                /*
//              setAttributeValue("pinnumber",dp, pn);
                newt = new DText(de, x2, y2,ATTRIBUTE_COLOR, 6, ShowPinNum, 1, ang, balign, 1, [pinnumber]);
                newt.name = "pinnumber";
                newt.value = pinnumber;
                dp.addAttribute(newt);
                */
                dc.addDrawingObject(dp);
//                dc.doj.push(dp);

              });

            }

            let dsets = this.getArrayOfObject(lib.devicesets.deviceset);
            let dset = this.getItemFromArray(deviceset, dsets);
            if(dset != null)
            {
              let devices = this.getArrayOfObject(dset.devices.device);
              let d = null;
              if((device == "") && (devices.length == 1))
              {
                d = devices[0];
              }
              else
              {
                d = this.getItemFromArray(device, devices);
              }
              if((d != null) && (typeof d._attributes !== 'undefined'))
              {
                let pack = d._attributes.package;
                if((typeof pack !== 'undefined') && (pack != ""))
                {
                  setAttributeValue("package", dc, pack);
                }

                if(typeof d.connects !== 'undefined')
                {
                  let connects = this.getArrayOfObject(d.connects.connect);
                  connects.forEach((connect) => {
                    let pinlabel = connect._attributes.pin;
                    let pinnumber = connect._attributes.pad;
                    let pin = dc.getPinByName(pinlabel);
                    if(pin != null)
                    {
                      setAttributeValue("pinnumber", pin, pinnumber);
                    }
                  });
                }

              }
            }
            this.getItemFromArray(deviceset, symbols);
          }


      }
      return(dc);
    }
    
    getSchematic() {
        let that = this;
        let bDeleteSheet1 = false;
        let p = new Promise(async function(resolve, reject) {
          let dcomp = null;
          let sheets = that.getArrayOfObject(that.o.eagle.drawing.schematic.sheets.sheet);
          if(that.bFirstSchematicSheet)
          {
            that.bFirstSchematicSheet = false;
            if((sheets.length > 0) && (ste.getSchematic().sheets.length == 1))
            {
              if(confirm("Do you want to delete the existing sheet 1?"))
              {
                bDeleteSheet1 = true;
              }
            }
            else bDeleteSheet1 = false;
          }
          let sheetno = 1;
          sheets.forEach((sheet) => {
            dcomp =  new DComponent(de, 0, 0, 1, 0, 0, that.fname + "_" + sheetno);
            dcomp.ncs = [];
            sheetno += 1;
            let instances = that.getArrayOfObject(sheet.instances.instance);
            instances.forEach((instance) => {
              let refdes = instance._attributes.part;
              let x = mmToCmils(instance._attributes.x);
              let y = mmToCmils(instance._attributes.y);
              let gate = instance._attributes.gate;
              report("318 refdes = " + refdes);
              let symb = that.getSymbolByRef(refdes, gate);
              setAttributeValue("refdes", symb, refdes);
              symb.setX(x + that.xoffset);
              symb.setY(y + that.yoffset);
              let angle = 0;
              let rot = 0;
              if(typeof instance._attributes.rot !== 'undefined')
              {
                rot = instance._attributes.rot;
              }

              if(rot == "MR0") angle = 0;
              else if(rot == "MR90") angle = 90;
              else if(rot == "MR180") angle = 180;
              else if(rot == "MR270") angle = 270;
              else if(rot == "R0") angle = 0;
              else if(rot == "R90") angle = 90;
              else if(rot == "R180") angle = 180;
              else if(rot == "R270") angle = 270;
              if(rot != 0) symb.setAngle(angle);
              if(isNaN(rot) && (rot.indexOf("M") == 0)) symb.mirror = 1;
              dcomp.doj.push(symb);
            });
            
            let textfields = that.getArrayOfObject(sheet.plain.text);
            textfields.forEach((tf) => {
              let x = mmToCmils(tf._attributes.x) + that.xoffset;  
              let y = mmToCmils(tf._attributes.y) + that.yoffset;  
              let size = mmToCmils(tf._attributes.size); 
              let fontsize = Math.round(12 * tf._attributes.size / 2.54);
              let t = tf._text;
              if(typeof t == 'undefined') report("373 "+ JSON.stringify(tf, null, 4));
              else
              {
              let txt = t.split("\n");
              let dt = new DText(de, x, y, GRAPHIC_COLOR, fontsize, 1, 1, 0, 0, txt.length, txt);
              dcomp.doj.push(dt);
              }
            });

//            let comps = ste.schematic.getComponents();
            let comps = dcomp.doj;

            let nets = that.getArrayOfObject(sheet.nets.net);
            nets.forEach((net) => {
              let netname = net._attributes.name;
              let segments = that.getArrayOfObject(net.segment);
              segments.forEach((segment) => {
                let pinrefs = that.getArrayOfObject(segment.pinref);
                pinrefs.forEach((pinref) => {
                  let ref = pinref._attributes.part;
                  let gate = pinref._attributes.gate;
                  let pinlabel = pinref._attributes.pin;
                  let c = getComponentByRef(ref, comps);
                  if(c == null) report("393 did not find refdes = " + ref + ", gate = " + gate + ", pinlable = " + pinlabel);
                  if(c != null)
                  {
                    let pin = c.getPinByName(pinlabel);
                    if(pin == null) report("397 did not find pinlabel " + ref + "-" + pinlabel);
                    if(pin != null) pin.setConnectedSignal(netname);
                  }
                });

                let junctions = that.getArrayOfObject(segment.junction);
                junctions.forEach((junction) => {
                  let x = mmToCmils(junction._attributes.x) + that.xoffset;
                  let y = mmToCmils(junction._attributes.y) + that.yoffset;
                  let dj = new DJunction(de,x, y, JUNCTION_COLOR)
                  dcomp.doj.push(dj);
                });

                let wires = that.getArrayOfObject(segment.wire);
                wires.forEach((wire) => {
                  let dnet = new DNet(de, 0, 0, 1, 1,NET_COLOR);
                  setAttributeValue("netname", dnet, netname);
                  dnet.setX(mmToCmils(wire._attributes.x1) + that.xoffset);
                  dnet.setY(mmToCmils(wire._attributes.y1) + that.yoffset);
                  dnet.setX2(mmToCmils(wire._attributes.x2) + that.xoffset);
                  dnet.setY2(mmToCmils(wire._attributes.y2) + that.yoffset);
                  dcomp.doj.push(dnet);
                });
              });
            });


            openSheet(dcomp);
            if(bDeleteSheet1) deleteSheet1();
          });
          resolve();
        });
        return(p);
    }
} // endeagleParser
