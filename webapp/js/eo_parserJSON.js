// eo_parserJSON.js

class ParserJSON {
    
    constructor() {
    }
    
    static parse(o) {
        let schem = ste.getSchematic();
        report("10 " + o.type);
        let p = new Promise(function(resolve, reject) {
            if(o.type == "DComponent")
            {
              let dc = ParserJSON.makeDOJFromJData(o);
              resolve(dc);
            }
            else if(o.type == "schematic") 
            {
              report("17 " + o.sheets.length + " sheets");
              o.sheets.forEach((sha) => {
 //                 schem.sheets = [];
 //                 let sh = schem.newSheet();
                  sheet = ste.getSchematic().newSheet();
                  de = sheet.getDrawingEnvironment();
                  CurrentSheetIndex = ste.getSchematic().sheets.length - 1;
//                  let attrs = [];
                  sha.attributes.forEach((a) => {
                      let att = ParserJSON.makeAttributeFromJData(a);
                      sheet.addAttribute(att);
                  });
                  sha.doj.forEach( (d) => {
                      let dc = ParserJSON.makeDOJFromJData(d);
                      if(dc != null) sheet.addDrawingObject(dc);
                  });
                  sheet.grid = sha.grid;
                  sheet.state = sha.state;
                  sheet.substate = sha.substate;
                  sheet.mc = sha.mc;
                  sheet.dj = sha.dj;
                  sheet.bcopies = sha.bcopies;
                      
              });
              
              o.nets.forEach( (n) => {
                  let nn = new Net(n.netname, n.comment);
                  nn.tag = n.tag;
                  ste.getSchematic().addNet(nn);
              });
              
              o.buses.forEach( (b) => {
                  let bb = new Bus(b.busname);
                  Object.assign(bb, b);
                  ste.getSchematic().addDbus(bb);
              });
            updateSheetDisplay();
            resolve(ste.getSchematic());
            }
            else reject("not an eo design file");
            
        });
        return(p);
    }
    
    static makeAttributeFromJData(a) {
        let att = new Attribute(de, a.x, a.y, a.colorindex, a.size, a.visibility, a.show_name_value, a.angle, a.alignment, a.num_lines, a.lines);
        att.selectBox = new Rectangle2D();
        Object.assign(att.selectBox, a.selectBox);
        att.selectable = a.selectable;
        att.name = a.name;
        att.value = a.value;
        att.flip = a.flip;
        return(att);
    }
    
    static makeDOJFromJData(a) {
        let o = null;
        if(a.type == "DComponent")
        {
          o = new DComponent(de, a.x, a.y, a.selectable, a.angle, a.mirror, a.filename);
          a.attributes.forEach((aa) => {
              let att = ParserJSON.makeAttributeFromJData(aa);
              o.addAttribute(att);
          });
          a.pins.forEach((pin) => {
              let pp = new DPin(de, pin.x1, pin.y1, pin.x2, pin.y2, pin.colorindex, pin.pintype, pin.whichend, pin.textsize);
              pp.angle = pin.angle;
              pp.visible = pin.visible;
              pp.connectedSignal = pin.connectedSignal;
              pin.attributes.forEach((pa) => {
                  let att = ParserJSON.makeAttributeFromJData(pa);
                  pp.addAttribute(att);
              });
              o.addDrawingObject(pp);
          });
          a.dojs.forEach((d) => {
              let dc = ParserJSON.makeDOJFromJData(d);
              if(dc != null) o.addDrawingObject(dc);
          });
        }
        else if(a.type == "DNet")
        {
          let dn = new DNet(de, a.x1, a.y1, a.x2, a.y2, a.colorindex);
          Object.assign(dn, a);
          dn.line = new Line2D(a.line.x1, a.line.y1, a.line.x2, a.line.y2);
          a.attributes.forEach((aa) => {
              let att = ParserJSON.makeAttributeFromJData(aa);
              dn.addAttribute(att);
          });
//          o.addDrawingObject(dn); 
          o = dn;
        }
        else if(a.type == "DBox")
        {
          let db = new DBox(de, a.x, a.y, a.boxwidth, a.boxheight, a.colorindex, a.width,
		a.capstyle, a.dashstyle, a.dashlength, a.dashspace, a.filltype,
		a.fillwidth, a.angle1, a.pitch1, a.angle2,a. pitch2);  
          db.selectable = a.selectable;
//          o.addDrawingObject(db);
          o = db;
        }
        else if(a.type == "DLine")
        {
          let dl = new DLine(de, a.x1, a.y1, a.x2, a.y2, a.colorindex, a.width, a.capstyle, a.dashstyle, a.dashlength,a.dashspace);
          a.attributes.forEach((aa) => {
              let att = ParserJSON.makeAttributeFromJData(aa);
              dl.addAttribute(att);
          });
          o = dl;
        }
        else if(a.type == "DCircle")
        {
          let c = new DCircle(de, a.x, a.y, a.radius, a.colorindex, a.width, a.capstyle, a.dashstyle, a.dashlength, a.dashspace, a.filltype, a.fillwidth, a.angle1, a.pitch1, a.angle2, a.pitch2);
          o = c;
        }
        else if(a.type == "DArc")
        {
          let da = new DArc(de, a.x, a.y, a.radius, a.startangle, a.sweepangle, a.colorindex, a.width,
				a.capstyle, a.dashstyle, a.dashlength, a.dashspace);
          o = da;
        }
        else if(a.type == "DJunction")
        {
          let j = new DJunction(de, a.x, a.y, a.colorindex);
          o = j;
        }
        else report("60 did not convert " + a.type);
        return(o);
    }

}
