// eo_schematic1.js

let MAJOR_COLOR = "#666666";
let MINOR_COLOR = "#333333";
let dcolors;

const BACKGROUND_COLOR = 0;
const PIN_COLOR = 1;
const NET_ENDPOINT_COLOR = 2;
const GRAPHIC_COLOR = 3;
const NET_COLOR = 4;
const ATTRIBUTE_COLOR = 5;
const LOGIC_BUBBLE_COLOR = 6;
const DOTS_GRID_COLOR = 7;
const DETACHED_ATTRIBUTE_COLOR = 8;
const TEXT_COLOR = 9;
const BUS_COLOR = 10;
const SELECT_COLOR = 11;
const BOUNDINGBOX_COLOR = 12;
const ZOOM_BOX_COLOR = 13;
const STROKE_COLOR = 14;
const LOCK_COLOR = 15;
const OUTPUT_BACKGROUND_COLOR = 16;
const FREESTYLE1_COLOR = 17;
const FREESTYLE2_COLOR = 18;
const FREESTYLE3_COLOR = 19;
const FREESTYLE4_COLOR = 20;
const JUNCTION_COLOR = 21;
const MESH_GRID_MAJOR_COLOR = 22;
const MESH_GRID_MINOR_COLOR = 23;

const SELECT_MODE_SINGLE = 0;
const SELECT_MODE_MULTI = 1;
const WHICHEND_FIRST = 0;
const WHICHEND_SECOND = 1;
const VISIBILITY_INVISIBLE = 0;
const VISIBILITY_VISIBLE = 1;
const SHOW_NAME_VALUE = 0;
const SHOW_VALUE = 1;
const SHOW_NAME = 2;
	
const STATE_IDLE = 0;
const STATE_PLACING = 1;
const STATE_NET = 2;
const STATE_LINE = 3;
const STATE_MOVE = 4;
const STATE_RECTANGLE = 5;
const STATE_CIRCLE = 6;
const STATE_ARC = 7;
const STATE_PIN = 8;
const STATE_PICTURE = 9;
const STATE_FLIP = 10;
const STATE_ROTATE = 11;
const STATE_DELETE = 12;
const STATE_COPY = 13;
const STATE_TEXT = 14;
const STATE_GROUP = 15;
const STATE_UNGROUP = 16;
const STATE_BUS = 17;
const STATE_ATTRIBUTE = 18;
const STATE_ZERO = 19;
const STATE_PATH = 20;

const BlackPalette = 0;
const WhitePalette = 1;
const PrintPalette = 2;


let CurrentNetName = null;
let MinNetSpacing = 150;
let clicker = false;
let bn = "";

const states = ["STATE_IDLE", "STATE_PLACING", "STATE_NET", "STATE_LINE", "STATE_MOVE", "STATE_RECTANGLE",
  "STATE_CIRCLE", "STATE_ARC", "STATE_PIN", "STATE_PICTURE", "STATE_FLIP", "STATE_ROTATE", "STATE_DELETE",
  "STATE_COPY", "STATE_TEXT", "STATE_GROUP", "STATE_UNGROUP", "STATE_BUS", "STATE_ATTRIBUTE", "STATE_ZERO", "STATE_PATH"];

const padding = ["N_00000000", "N_0000000", "N_000000", "N_00000", "N_0000", "N_000", "N_00", "N_0"];

const AllAttributes =["netname", "source", "refdes", "slot", "net", "value", "symversion",
  "dist-license", "use-license", "device", "graphical", "description", "author",
  "comment", "pinseq", "pinnumber", "pintype", "pinlabel", "numslots", "slotdef",
  "documentation", "model", "primitive", "partid", "padsdevice",
  "sheetnumber", "netcomment", "labelissignal", "ncok", "busname", "src", "gnd_plane_signal",
  "power_plane_signal", "footprint", "placenear"];

function R(n)
{
  return(Math.round(n));  
}

function removeItemFromArray(item, arr)
{
  let k = arr.length;
  let i = 0;
  let b = true;
  while(b && (i < k))
  {
   if(item == arr[i]) b = false;
   else i += 1;
  }
  if(!b)
  {
    arr.splice(i, 1);
  }
  return(!b);
}

// DColors
class DColors
{
  static BlackPalette = 0;
  static WhitePalette = 1;
  static PrintPalette = 2;

  static bk = 0;
  static ColoredItemNames =
    ["BACKGROUND_COLOR", "PIN_COLOR", "NET_ENDPOINT_COLOR", "GRAPHIC_COLOR", "NET_COLOR",
    "ATTRIBUTE_COLOR", "LOGIC_BUBBLE_COLOR", "DOTS_GRID_COLOR",  "DETACHED_ATTRIBUTE_COLOR",
    "TEXT_COLOR", "BUS_COLOR", "SELECT_COLOR", "BOUNDINGBOX_COLOR", "ZOOM_BOX_COLOR", "STROKE_COLOR",
    "LOCK_COLOR", "OUTPUT_BACKGROUND_COLOR", "FREESTYLE1_COLOR", "FREESTYLE2_COLOR", "FREESTYLE3_COLOR",
    "FREESTYLE4_COLOR", "JUNCTION_COLOR", "MESH_GRID_MAJOR_COLOR", "MESH_GRID_MINOR_COLOR"];

  static colors = ["#000000", "#ffffff", "#ff0000", "#00ff00", "#ffff00", "#ffffff", "#ffffff", "#ffffff",
    "#ffffff", "#ffffff", "#0099ff", "#ff00ff", "#ff0000", "#ffffff", "#ffffff", "#ffffff",
    "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#666666", "#333333"];

  static #BLACK_PALETTE = ["#000000", "#ffffff", "#ff0000", "#00ff00", "#ffff00", "#ffffff", "#ffffff", "#ffffff",
    "#ffffff", "#ffffff", "#0099ff", "#ff00ff", "#ff0000", "#ffffff", "#ffffff", "#ffffff",
    "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#666666", "#333333"];
  static #WHITE_PALETTE = ["#ffffff", "#000000", "#ff0000", "#006600", "#0000ff", "#000000", "#000000", "#000000",
    "#000000", "#000000", "#0000ff", "#cc6600", "#ff0000", "#000000", "#000000", "#000000",
    "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#999999", "#cccccc"];
  static #PRINT_PALETTE = ["#ffffff", "#000000", "#ff0000", "#000000", "#0000ff", "#000000", "#000000", "#000000",
    "#000000", "#000000", "#000000", "#cc6600", "#ff0000", "#000000", "#000000", "#000000",
    "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#999999", "#cccccc"];

  static setBlackBackgroundDefaults() {
    DColors.bk = 0;
    DColors.colors = DColors.#BLACK_PALETTE;
  }

  static setWhiteBackgroundDefaults() {
    DColors.bk = 1;
    DColors.colors = DColors.#WHITE_PALETTE;
  }

  static setPrintDefaults() {
    DColors.bk = 2;
    DColors.colors = DColors.#PRINT_PALETTE;
  }

  static setPalette(n) {
    DColors.bk = n;
    let p = null;
    switch(n)
    {
      case 0: p = DColors.#BLACK_PALETTE; break;
      case 1: p = DColors.#WHITE_PALETTE; break;
      case 2: p = DColors.#PRINT_PALETTE; break;
      default: break;
    }
    if(p != null)
    {
      DColors.colors = p;
    }
  }

  static getColor(n) {
    let c = "#000000";
    if((n >= 0) && (n < DColors.colors.length)) c = DColors.colors[n];
    return(c);
  }


}

// SchematicToolEnvironment
class STE {
  dcolors = DColors;
  projectName = "";
  schematic = null;
  
  constructor(projectName) {
    dcolors = DColors;
    this.projectName = projectName;
    this.schematic = new Schematic(this, this.projectName);
  }

  getColorPalette() {
    return(this.dcolors);
  }

  getSchematic() {
    return(this.schematic);
  }
  
  setSchematic(s) {
      this.schematic = s;
      this.schematic.ste = this;
      if((typeof s.pathname !== 'undefined') && (s.pathname != ""))
      {
        this.projectName = s.pathname;   
      }
  }
}

// DesignEnvironment

class DE {
  constructor()
  {
//    this.sheet = sheet;
    this.inverse_zoom = 10;
    this.grid_size = gridsize;
    this.MAX_X = MAXWIDTH; // mils
    this.MAX_Y = MAXHEIGHT; // mils
  }

  getSchematicSheet() {
    return(this.sheet);
  }

  getInverseZoom() {
    return(this.inverse_zoom);
  }

  getGridSize() {
    return(this.grid_size);
  }

  setInverseZoom(n) {
    this.inverse_zoom = n;
  }

  setGridSize(n) {
    this.grid_size = n;
  }

  mouseToDrawingX(x) {
    let i = (x * this.inverse_zoom) - this.grid_size/2;
    i = Math.round(i / this.grid_size);
    i = i * this.grid_size;
    return(i);
  }

  mouseToDrawingY(y) {
    let i = (this.MAX_Y - ((y  + 2 * xfmY) * this.inverse_zoom)) - this.grid_size/2;
    i = Math.round(i / this.grid_size);
    i = i * this.grid_size;
    return(i);
  }

  correctY(y) {
    return(this.MAX_Y - y);
  }

  drawString(ctx, s, x, y, height, size) {
    ctx.strokeStyle = "#ffff00";
    ctx.moveTo(x, y);
    ctx.fillStyle = "red";
    ctx.textAlign = "left";
    ctx.font = size + " sans-serif"; //TODO
    ctx.fillText(s, x, y, 500);  //TODO
  }

  getColor(index) {
    return(DColors.colors[index]);
  }

  setLine(line, x1, y1, x2, y2) {
    return(line.setLine(x1, this.correctY(y1), x2, this.correctY(y2)));
  }

  setRect(box, x, y, boxwidth, boxheight) {
    box.setRect(x, this.correctY(y + boxwidth), boxwidth, boxheight);
  }

  setFrame(circle, x, y, radius) {
    /*
		 * x - the X coordinate of the upper-left corner of the framing rectangle
		 * y - the Y coordinate of the upper-left corner of the framing rectangle
		 * w - the width of the framing rectangle
		 * h - the height of the framing rectangle
		 */
    circle.setFrame(x - radius, this.correctY(y + radius), 2 * radius, 2 * radius);
  }

  makeArc(arc, x, y, radius, startangle, sweepangle) {

		/*
		 * x - The X coordinate of the upper-left corner of the arc.
		 * y - The Y coordinate of the upper-left corner of the arc.
		 * w - The overall width of the full ellipse of which this arc is a partial section.
		 * h - The overall height of the full ellipse of which this arc is a partial section.
		 * angSt - The starting angle of the arc in degrees.
  		 * angExt - The angular extent of the arc in degrees.
		 * closure - The closure type for the arc: Arc2D.OPEN, Arc2D.CHORD, or Arc2D.PIE.
		 */
    arc.setArc(x - radius, de.correctY(y + radius), 2 * radius, 2 * radius, startangle, sweepangle);
  }
}

// DText

class DText {
    
    constructor(de, x, y, colorindex, size, visibility, show_name_value, angle, alignment, num_lines, lines) {
        this.klass = "DText";
//        // de = de;
        this.x = x;
        this.y = y;
        this.colorindex = colorindex;
 // this.color = de.getColor(this.colorindex);
        this.size = size;
        this.offset = 0;
        this.visibility = visibility;
        this.show_name_value = show_name_value;
        this.angle = angle;
        this.alignment = alignment;
        this.num_lines = num_lines;
        this.textwidth = 80;
        this.lines = lines;
        if(typeof lines === 'undefined') this.lines = "";
        this.selectBox = this.makeSelectBox();
        this.selectable = 1;
        this.name = "";
        this.value = "";
        this.attributes = [];
        this.flip = 0;  // 0 = normal, 1 = horizontal, 2 = vertical
        this.parent = null;
    }
    
    getDataJ() {
        let o = {
            klass: "DText",
            x: this.x,
            y: this.y,
            colorindex: this.colorindex,
            size: this.size,
            offset: this.offset,
            visibility: this.visibility,
            show_name_value: this.show_name_value,
            angle: this.angle,
            alignment: this.alignment,
            num_lines: this.num_lines,
            textwidth: this.textwidth,
            lines: this.lines,
            selectable: this.selectable,
            name: this.name,
            value: this.value,
            attributes: [],
            flip: this.flip,
            parent: null
        };
        
        this.attributes.forEach( (att) => {
           let pnt = att.parent;
           att.parent = null;
           o.attributes.push(att.getDataJ());
           att.parent = pnt;
        });
        return(o);
    }

    getTextWidth() {
        return(Math.round(this.value.length * this.size));
    }

    getX() {
        return(this.x); 
    }

    getY() {
        return(this.y); 
    }
	
    setX(x) {
        this.x = Math.round(x);
    }

    setY(y) {
        this.y = Math.round(y);
    }

    getVisible() {
        let b = false;
        if(this.visibility = 1) b = true;
        return(b);
    }

    setVisible(b) {
        if(b) this.visibility = 1;
        else this.visibility = 0;
    }

    setAngle(d) {
        this.angle = d;
    }

    setOffset(n) {
        this.offset = n;
    }

    update() {
    }

    isAttribute() {
        return((this.name != null) && (this.name != "")); 
    }

    getData() {
        let sb = "";
        sb += "T " + R(this.x)  + " " + R(this.y)  + " " + this.colorindex + " " + R(this.size) + " " + this.visibility + " " + this.show_name_value + " " + this.angle + " " + this.alignment + " " + this.num_lines + "\n";
        let k = this.lines.length;
        let i = 0;
        if(this.lines.length != this.num_lines) 
        {
//  alert("DText " + this.lines.length + " " + this.num_lines + " " + lines[0]);
          k = this.num_lines;
        }
        if(this.name != "")
        {
          sb += this.name + "=" + this.value + "\n";
        }
        else
        {
          while(i < k)
          {
            sb += this.lines[i] + "\n";
            i += 1;
          }
        }
        // attributes
        if(this.attributes.length != 0)
        {
          sb += "{\n";
          let k = this.attributes.length;
          let i = 0;
          while(i < k)
          {
            sb += this.attributes[i].getData();
            i += 1;
          }
          sb += "}\n";
        }
        return sb;
    }

    inRange(xx, yy) { 
        let b = false;
        let oc = this.selectBox.outcode(xx, de.correctY(yy));
        if(oc == 0) b = true;
        return(b);	
    }

    makeSelectBox() {
        this.selectBox = new Rectangle2D();
        let j = this.size * 10;
        this.selectBox = this.selectBox.setRect(this.x  , Math.round(de.correctY(this.y))  ,  this.textwidth, j );
        return(this.selectBox);
    }

    paint(ctx) {
        this.dPaint(ctx); 
    }

    dPaint(ctx) {
        if(this.visibility == 1)
        {
          let z = de.getInverseZoom();
          this.lines.forEach((s, index) => {
          ctx.save();
          ctx.fillStyle = de.getColor(this.colorindex);
//  ctx.textAlign = "left";
          if(this.alignment <= 2)  ctx.textAlign = "left";
          else if(this.alignment <= 5)  ctx.textAlign = "center";
          else ctx.textAlign = "right";
          if((this.alignment == 0) || (this.alignment == 3) || (this.alignment == 6)) ctx.textBaseline = "bottom";
          else if((this.alignment == 1) || (this.alignment == 4) || (this.alignment == 7)) ctx.textBaseline = "middle";
          else ctx.textBaseline = "top";
//  alert(this.size);
          ctx.font = this.size + "px sans-serif"; 
//  let s = this.lines[0];
//  this.lines.forEach((s, index) => {
          if(s != null)
          {
            s = s.toString();
            let i = s.indexOf("=");
            if(i != -1)
            {
              if(this.show_name_value == 1) s = s.substring(i+1);
              else if(this.show_name_value == 2) s = s.substring(0, i);
            }
            let tm = ctx.measureText(s);
            this.textwidth = Math.round(10 * tm.width);
            let lineheight = tm.fontBoundingBoxAscent + tm.fontBoundingBoxDescent;
            let yy = this.y - 10 * index * lineheight;
//      report("3371 " + index + " " + this.x + ", " + this.y + " " + yy + " " + s);
            let za = 10/z;
            let zb = 10/z;
            if(this.flip == 1) za = -za;
            else if(this.flip == 2) zb = -zb;
            ctx.scale( za, zb);
//      ctx.scale( 10/z, 10/z);
//            if(typeof this.parent !== 'undefined') report("464 " + this.parent.klass + " " + this.parent.x);
            if((this.angle != 0)) // && (typeof this.parent !== 'undefined'))
            {
//              ctx.translate(-( this.x), -( this.y));
//              ctx.rotate(Math.PI / 180 * this.angle);
//              ctx.translate((this.parent.x + this.x), (this.parent.y + this.y));
            }
            ctx.fillText(s, this.x / 10, de.correctY(yy) / 10);
//      ctx.restore();
            if(this.selectable == 1)
            {
              this.selectBox = this.makeSelectBox();
              if(sheet.getSelectedObject() == this)
              {
                this.selectBox.paint(ctx, de.getColor(BOUNDINGBOX_COLOR), de.getInverseZoom());
              }
            }
          }
          ctx.restore();
          });
//  ctx.restore();
        }
    }
}
   
class Attribute {
    att = null;
    
    constructor(de, x, y, colorindex, size, visibility, show_name_value, angle, alignment, num_lines, lines) {
        this.att = new DText(de, x, y, colorindex, size, visibility, show_name_value, angle, alignment, num_lines, lines);
        return(this.att);
    }
    
    static createAttribute(name, value) {
        let a = new Attribute(sheet.de,0,0,ATTRIBUTE_COLOR, false,false,0,0,1,[name + "=" + value]);
        a.name = name;
        a.value = value;
        return(a);
    }
    
    getDataJ() {
        return(this.att.getDataJ());
    }
    
}


class Net {
    constructor(netname, comment) {
        this.klass = "Net";
        this.netname = netname;
        this.comment = comment;
        this.tag = 0;
    }
}

class Bus {
    constructor(busname) {
        this.klass = "Bus";
        this.busname = busname;
        this.members = []; // am array of Net
        this.attributes = [];
        this.comment = "";
        this.vector = false;
        this.limit1 = -1;
        this.limit2 = -1;
        let i = busname.indexOf("(");
        if(i != -1)
        {
          let k = busname.indexOf(")");
          if(k != -1)
          {
            let j = busname.indexOf(":");
            if(j != -1)
            {
	      this.limit1 = busname.substring(i+1, j);
	      this.limit2 = busname.substring(j+1, k);
	      this.vector = true;
            }
          }
        }
    }
    
    getDataJ() {
        let o = {
            type: "bus",
            busname: this.busname,
            limit1: this.limit1,
            limit2: this.limit2,
            vector: this.vector,
            comment: this.comment,
            members: this.members,
            attributes: this.attributes
        };
        return(o);
        
    }

    addMember(net) {
        let s = net.netname;
        let k = this.members.length;
        let i = 0;
        let b = true;
        while(b && (i < k))
        {
          if(s == this.members[i].netname)
          {
            b = false;
          }
          i += 1;
        }
  
        if(b)
        {
          this.members[this.members.length] = net;
        }
    }

    getL1() {
        let L1 = getAttributeValue("L1", this);
        if(L1 == null)
        {
          L1 = -1;
        }
        return(L1);
    }

    getL2() {
        let L2 = getAttributeValue("L2", this);
        if(L2 == null)
        {
          L2 = -1;
        }
        return(L2);
    }
}

class Schematic {
  constructor(ste, projectpath) {
    this.klass = "Schematic";
    this.ste = ste;
    this.projectpath = projectpath;
    this.nets = []; // an array of Net
    this.netnumber = 0;
    this.nets.splice(0, this.nets.length);
    this.buses = [];
    this.busnumber = 0;
    this.buses.splice(0, this.buses.length);
    this.sheets = [];
  }

  getDataJ() {
      let o = {
          type: "schematic",
          sheets: [],
          nets: this.nets,
          buses: this.buses
      };
      
      this.sheets.forEach( (sheet) => {
          o.sheets.push(sheet.getDataJ());
      });
      /*
      this.nets.forEach( (net) => {
          o.nets.push(net.getDataJ());
      });
      
      this.buses.forEach( (bus) => {
          o.buses.push(bus.getDataJ());
      });
      */
      return(o);
          
  }
  
  newSheet() {
    let sh = new SchematicSheet(this.ste);
    this.sheets.push(sh);
    return(sh);
  }

  removeSheet(rsheet) {
    removeItemFromArray(rsheet, this.sheets);
  }

  getNextNetName() {
    let name = "N" + this.netnumber;
    let k = name.length -1;
    this.netnumber += 1;
    let s = padding[k] + name.substring(1);
    return(s);
  }

  getNewNetName() {
    let name = null;
    while(this.netExists(name = this.getNextNetName(), this.nets)) ;
    this.nets.push(new Net(name, ""));
    return(name);
  }

  netExists(n, vn) {
    let b = true;
    let k = vn.length;
    let i = 0;
    if(n != null)
    {
      while((i < k) && b)
      {
        if(vn[i].netname == n) b = false;
        i += 1;
      }
    }
    return(!b);
  }

  addNet(dnet) {
    let s = getAttributeValue("netname", dnet);
    if((s != null) && (!this.netExists(s, this.nets)))
    {
      let sc = getAttributeValue("netcomment", dnet);
      let n = new Net(s, sc);
      this.nets.push(n);
    }
  }

  getNet(netname) {
    let b = true;
    let n = null;
    let k = this.nets.length;
    let i = 0;
    while((i < k) && b)
    {
      let s = this.nets[i];
      if(s.netname == netname)
      {
        b = false;
        n = s;
      }
      i += 1;
    }
    return(n);
  }

  findNetIn(netname, narray) {
    let b = true;
    let n = null;
    let k = narray.length;
    let i = 0;
    while((i < k) && b)
    {
      let s = narray[i];
      if(s.netname == netname)
      {
        b = false;
        n = s;
      }
      i += 1;
    }
    return(n);
  }

  clearNets() {
    clearArray(this.nets);
  }

  getBus(busname) {
    let b = true;
    let n = null;
    let k = this.buses.length;
    let i = 0;
    while((i < k) && b)
    {
      let s = this.buses[i];
      if(s.busname == busname)
      {
        b = false;
        n = s;
      }
      i += 1;
    }
    return(n);
  }

  getNetFromBus(netname, bus) {
    let b = true;
    let k = bus.members.length;
    let i = 0;
    let n = null;
    while(b && (i < k))
    {
      if(netname == bus.members[i].netname)
      {
        b = false;
        n = bus.members[i];
      }
      i += 1;
    }
    return(n);
  }

  addDBus(dbus) {
    let s = getAttributeValue("busname", dbus);
    let bus = this.getBus(s);
    let ok = true;
    if(bus == null)
    {
      bus = new Bus(s);
      this.buses[this.buses.length] = bus;
      report("added bus " + s + " " + this.buses.length);
    }
    let x = getAttributeValue("L1", dbus);
    let y = getAttributeValue("L1", bus);
    if(x != null)
    {
      if((y == null) || (x > y)) setAttributeValue("L1", bus, x);
    }
    x = getAttributeValue("L2", dbus);
    y = getAttributeValue("L2", bus);
    if(x != null)
    {
      if((y == null) || (x > y)) setAttributeValue("L2", bus, x);
    }
  
    let kk = dbus.members.length;
    let ii = 0;
    while(ii < kk)
    {
      let netname = getAttributeValue("netname", dbus.members[ii]);
      report("addDBus netname = " + netname);
      let n = this.getNet(netname);
      if(n != null)
      {
        let nn = this.getNetFromBus(netname, bus);
//      if(nn == null) bus.members[bus.members.length] = nn;
        if(nn == null) bus.addMember(n);
      }
      else
      {
        report("Net " + netname + " does not exist.");
        let nu = new Net(netname, "");
        ste.schematic.addNet(nu);
        bus.addMember(nu);
        ok = false;
      }
      ii += 1;
    }
    return(bus);
  }


  getConsolidatedComponents() {
    let Comps = [];
    let hoj = [];
    let kk = this.sheets.length;
    let ii = 0;
    while(ii < kk)
    {
      let sh = this.sheets[ii];
      let vdj = sh.DrawingObjects;
      let k = vdj.length;
      let i = 0;
      while(i < k)
      {
        let o = vdj[i];
        if(o.klass == "DComponent")
        {
          let dc = o;
          let refdes = getAttributeValue("refdes", dc);
          let device = getAttributeValue("device", dc);
          if( (refdes != null) && (device != null))
	      {
	        refdes = fixRefdes(refdes);
	        device = fixVhdlName(device, refdes + "_" );
	        if(addString(refdes, hoj))
	        {
//		sb += "\"" + refdes + "\" \"" + device + "\" \"\"\n"); // refdes, device, footprint not used
	        }
	        parttableindex = getStringIndex(refdes, hoj) + 1;
	        let vdp2 = dc.getPins();
            let vdp = consolidatePins(refdes, vdp2);

	        let kk = vdp.length;
	        let ii = 0;
	        while(ii < kk)
	        {
	          let dp = vdp[ii];
	          let netname = dp.connectedSignal;
	          if(netname != null)
	          {
	            addString(netname, nets);
	            let pn = getAttributeValue("pinnumber", dp);
	            let pp = pn;
	            addSpecialStringObjectPair(new StringObjectPair(refdes + " " + device + "{" + device + "}",  dp), vop);
	          }
	          ii += 1;
	        }
	      }
        }
      i += 1;
      }
    ii += 1;
    }
    return(Comps);
  }

  getComponents() {
    let Comps = [];
    let kk = this.sheets.length;
    let ii = 0;
    while(ii < kk)
    {
      let sh = this.sheets[ii];
      let vdj = sh.DrawingObjects;
      let k = vdj.length;
      let i = 0;
      while(i < k)
      {
        let o = vdj[i];
        if(o.klass == "DComponent")
        {
          let dc = o;
          let refdes = getAttributeValue("refdes", dc);
          let device = getAttributeValue("device", dc);
          if( (refdes != null) && (device != null))
          {
	        Comps.push(dc);
          }
        }
        i += 1;
      }
      ii += 1;
    }

    Comps.sort(function(a, b) {
      let r = -1;
      let ar = getAttributeValue("refdes", a);
      let br = getAttributeValue("refdes", b);
      if((ar != null) && (br != null))
      {
        r = ar.localeCompare(br);
      }
      return(r);
      });
    return(Comps);
  }
  
  
  
}

function getComponentByRef(ref, comps)
  {
    let r = null;
    let b = true;
    let k = comps.length;
    let i = 0;
    while(b && (i<k))
    {
      let ref1 = getAttributeValue("refdes", comps[i]);
      if(ref1 == ref)
      {
        r = comps[i];
        b = false;
      }
      else i += 1;
    }
    return(r);
  }



// SchematicSheet

function SchematicSheet(ste)
{
 this.ste = ste; 
 this.de = new DE();
 this.klass = "SchematicSheet";
// // de = de;
 this.DrawingObjects = [];
 this.attributes = [];
 this.grid = true;
 this.state = STATE_IDLE;
 this.substate = 0;
 this.selectedObject = null;
 this.selectbox = null;
 this.mc = null;
 this.dj = null;
 this.bcopies = false;
 this.DrawingObjects.splice(0, this.DrawingObjects.length); 
 this.attributes.splice(0, this.attributes.length); 
}

SchematicSheet.prototype.getDataJ = function()
{
  let o = {
      type: "sheet",
      doj: [],
      attributes: [],
      grid: this.grid,
      state: this.state,
      substate: this.substate,
      mc: this.mc,
      dj: this.dj,
      bcopies: this.bcopies
  }
  
  this.DrawingObjects.forEach((oj) => {
      if(oj.klass == "DComponent") o.doj.push(oj.getDataJ());
      else if(oj.klass == "DJunction") o.doj.push(oj.getDataJ());
      else if(oj.klass == "DNet") o.doj.push(oj.getDataJ());
      else report("929 " + oj.klass);
  });
  
  this.attributes.forEach( (att) => {
      let pnt = att.parent;
      att.parent = null;
      o.attributes.push(att.getDataJ());
      att.parent = pnt;
  });
  
  return(o);
}

SchematicSheet.prototype.getData = function()
{
  let sb = "v 20110115 2\n";
  if(this.attributes.length > 0) // top level attributes
  {
    let k = this.attributes.length;
    let i = 0;
    while(i < k)
    {
      sb += this.attributes[i].getData();
      i += 1;
    }
  }
		
  k = this.DrawingObjects.length;
  i = 0;
  while(i < k)
  {
 //   report("drawobj = " + this.DrawingObjects[i].klass);
    sb += this.DrawingObjects[i].getData();
    i += 1;
  }	
return(sb); 
}

SchematicSheet.prototype.getDrawingEnvironment = function()
{
 return(this.de); 
}

SchematicSheet.prototype.getDrawingObjects = function()
{
  return(this.DrawingObjects);
}

SchematicSheet.prototype.getSelectedObject = function()
{
  return(this.selectedObject);
}

SchematicSheet.prototype.deleteSelectedObject = function()
{
  removeItemFromArray(this.selectedObject, this.DrawingObjects);
}

SchematicSheet.prototype.addDrawingObject = function(o)
{
  if(o != null)
  {
 o.parent = this;
 o.update();
 this.DrawingObjects.push(o); 
  }
// displayStatus("Added DrawingObject " + this.DrawingObjects.length);
}

SchematicSheet.prototype.removeDrawingObject = function(o)
{
  removeItemFromArray(o, this.DrawingObjects);
}

SchematicSheet.prototype.addDrawingObjects = function(darray)
{
  let k = darray.length;
  let i = 0;
  while(i < k)
  {
   this.addDrawingObject(darray[i]);
   i += 1;   
  }
}

SchematicSheet.prototype.getPriorityRoute = function(netname)
{
  let st = false;
  let pr = getAttributeValue("priority_route", this);
  if((pr != null) && (pr != ""))
  {
    let i = pr.indexOf(netname);
    if(i != -1) st = true;
  }
  return(st);
}

SchematicSheet.prototype.setPriorityRoute = function(netname, b)
{
  let pr = getAttributeValue("priority_route", this);
//  report("setPriorityRoute b " + b + " " + pr);
  if((pr != null) && (pr != ""))
  {
    let i = pr.indexOf(netname);
    if(b)
    {
      if(i == -1) 
      {
	pr = pr + " " + netname;
	pr = pr.trim();
	setAttributeValue("priority_route", this, pr);
//	report("setPriorityRoute a " + pr);
      }
    }
    else
    {
      if(i != -1) 
      {
	if(i == 0) pr = pr.substring(netname.length);
	else pr = pr.substring(0, i) + pr.substring(i + netname.length);
	pr = pr.trim();
//	pr = pr.splice(i, netname.length);
	setAttributeValue("priority_route", this, pr);
      }
    }
  }
  else if(b)
  {
    let a = (new createAttribute(de, sheet.selectedObject.x1, sheet.selectedObject.y1, ATTRIBUTE_COLOR, 12, VISIBILITY_INVISIBLE, SHOW_VALUE, 0, 1, "priority_route", netname));
    this.addAttribute(a);
//    report("setPriorityRoute c " + netname + " " + a.value);
  }
}

SchematicSheet.prototype.addAttribute = function(a)
{
  let tt = getAttributeIndex(a.name, this);
  if(tt == -1) this.attributes[this.attributes.length] = a;
  else 
  {
    if((a.name == "net") || (a.name == "slotdef"))
    {
      this.attributes[this.attributes.length] = a;
    } 
    else if(a.name == "priority_route")
    {
      let pr = getAttributeValue("priority_route", this);
//      report("addAtt " + pr + " " + a.value);
      if((pr = null) || (pr = ""))
      {
	this.attributes[this.attributes.length] = a;
      }
      else if(pr.indexOf(a.value) == -1)
      {
	pr = pr + " " + a.value;
	pr = pr.trim();
	setAttributeValue("priority_route", this, pr);
      }
    }
    else
    {
      this.attributes.splice(tt,1);
      this.attributes.splice(tt, 0, a);
    }
  }
}

SchematicSheet.prototype.addAttributes = function(darray)
{
  let k = darray.length;
  let i = 0;
  while(i < k)
  {
     this.addAttribute(darray[i]);
    i += 1;
  }
}


SchematicSheet.prototype.getTitleSheet = function()
{
  let b = true;
  let k = this.DrawingObjects.length;
  let i = 0;
  let t = null;
  while( b && (i < k))
  {
   let a = getAttribute("designname", this.DrawingObjects[i]);
   if(a != null)
   {
    t = this.DrawingObjects[i];
    b = false;
   }
   i += 1;
  }
  return(t);
}

SchematicSheet.prototype.setState = function(n)
{
 this.state = n; 
 this.substate = 0;
 this.mc = null;
 this.dj = null;
 switch(n)
 {
   case STATE_IDLE:
     this.selectedObject = null;
     displayStatus(states[n]);
     break;
   case STATE_MOVE:
      displayStatus("Move");
      if(this.selectedObject != null) 
      {
	this.mc = new MoveCommand(this.selectedObject);
	this.state = STATE_PLACING;
      }
      else report("SchematicSheet dj null");
      break;
   case STATE_NET:
     CurrentNetName = ste.schematic.getNewNetName();
     displayStatus("Placing net: " + CurrentNetName);
     break;
   case STATE_BUS:
 //    CurrentNetName = ste.schematic.getNewNetName();
     displayStatus("Placing bus: "); // + CurrentNetName);
     break;
   case STATE_PIN:
      displayStatus("Drawing Pin");
      this.selectedObject = new DPin(de, 0, 0, 200, 0, PIN_COLOR, 0, 0, 8);
      break;
   case STATE_PICTURE:
     displayStatus("STATE_PICTURE");
     let ps = prompt("Enter URL of picture file:");
     if((ps != null) && (ps != ""))
     {
       this.selectedObject = new DPicture(de, 0, 0, 100, 100, 0,0,0);
       this.selectedObject.load(ps);
       this.state = STATE_PLACING;
     }
     else this.setState(STATE_IDLE);
   default:
     displayStatus(states[n]);
     break;
 }
}

SchematicSheet.prototype.showGrid = function(b)
{
  this.grid = b;
}

SchematicSheet.prototype.paint = function(ctx)
{
  if(this.grid) this.paintGrid(ctx);
  let i = 0;
  let k = this.DrawingObjects.length;
  while(i < k)
  {
    let x = this.DrawingObjects[i];
    if(x.klass == "DBus") x.paint(ctx); 
    i += 1;
  }
  i = 0;
  while(i < k)
  {
    let x = this.DrawingObjects[i];
    if(x.klass != "DBus") x.paint(ctx); 
    i += 1;
  }
  i = 0;
  k = this.attributes.length;
  while(i < k)
  {
    this.attributes[i].paint(ctx); 
    i += 1;
  }
  if((this.selectedObject != null) && (this.selectedObject.parent == null))
  {
    this.selectedObject.paint(ctx);
  }
  if(this.selectbox != null)
  {
   this.selectbox.paint(ctx); 
  }
  
}

SchematicSheet.prototype.paintGrid = function(ctx)
{
 ctx.save();
 let z = de.getInverseZoom();
 let i = 0;
 let j = 0;
 let gridsize = de.getGridSize();
 let q = 5;
 let c = 0;
 if(gridsize == 50) q = 10;
 while(i < MAXHEIGHT)
 {
  if(j == q)
  {
    c = dcolors.colors[MESH_GRID_MAJOR_COLOR]; //MAJOR_COLOR;
    j = 0;
  }
  else
  {
    c = dcolors.colors[MESH_GRID_MINOR_COLOR]; //MINOR_COLOR;
  }
  j += 1;
  let line = new Line2D(0,i,MAXWIDTH ,i);
 //line = de.setLine(line, 0, i, MAXWIDTH, i);
   line.paint(ctx, c, z);
  i += gridsize;
 }
 i = 0;
 j = 0;
 while(i < MAXWIDTH )
 {
 let line = new Line2D(i,0,i,MAXHEIGHT);
 de.setLine(line, i, 0, i, MAXHEIGHT);
 if(j == q)
 {
  c = dcolors.colors[MESH_GRID_MAJOR_COLOR]; //MAJOR_COLOR;
  j = 0;
  }
 else
 {
  c =dcolors.colors[MESH_GRID_MINOR_COLOR]; // MINOR_COLOR;
 }
 j += 1;
 line.paint(ctx, c, z);
 i += gridsize;
 }
 ctx.restore();
}

let lastDPin = null;
let NetPos = null;

SchematicSheet.prototype.mouseClicked = function(evt)
{
clicker = true;
mousePos = getMousePos(canvas, evt);
let xx = de.mouseToDrawingX(mousePos.x) + xfmX * de.getInverseZoom();
let yy = de.mouseToDrawingY(mousePos.y) + xfmY * de.getInverseZoom();
let b = false;
if(this.state == STATE_IDLE)
{
 let v1 = this.getObjectsAt(de.mouseToDrawingX(mousePos.x), de.mouseToDrawingY(mousePos.y));
 let v = [];
 /*
 let bcall = document.getElementById("conall").checked;
 let bcomp = document.getElementById("concomp").checked;
 let bcpin = document.getElementById("conpins").checked;
 let bcnet = document.getElementById("connets").checked;
*/
 let bcall = document.getElementById("sxa").checked;
 let bcomp = document.getElementById("sxc").checked;
 let bcpin = document.getElementById("sxp").checked;
 let bcnet = document.getElementById("sxn").checked;
 v1.forEach((e) => {
   let f = e.klass;
   if(bcall) v.push(e);
   else if(bcomp && (f == "DComponent")) v.push(e);
   else if(bcpin && (f == "DPin")) v.push(e);
   else if(bcnet && (f == "DNet")) v.push(e);
 });

 //report("1030 v length = " + v.length);
 if(v.length == 1) 
 {
   if(v[0].klass == "DNet") 
   {
     NetPos = mousePos;
     let zs = "";
     if(wvwindow != null)
     {
       let e = wvwindow.sim.TopElement;
       if(e != null)
       {
	 let gss = e.getSignal(getAttributeValue("netname", v[0]));
	 if(gss != null)
	 {
	  zs = " = " + gss.value; 
	 }
       }
     }
     displayStatus(getAttributeValue("netname", v[0]) +  zs);
   }
   else if(v[0].klass == "DComponent") displayStatus(getAttributeValue("refdes", v[0]) + ": " + getAttributeValue("device", v[0]));
   else if(v[0].klass == "DPin") displayStatus(getAttributeValue("pinlabel", v[0]) + ": pin " + getAttributeValue("pinnumber", v[0]) + " " + getAttributeValue("pintype", v[0]));
   else if(v[0].klass == "DBus") displayStatus("DBus " + getAttributeValue("busname", v[0]) + " selected. " );
   else displayStatus(v[0].klass + " selected");
 }
 else if(v.length > 1) 
 {
   let k = v.length;
   report("1059 objects = " + k);
   let i = 0;
   while(!b && (i < k))
   {
    if(v[i].klass == "DPin") 
    {
     this.selectedObject = v[i];
     lastDpin = this.selectedObject;
     b = true;
     if((lastDpin.pintype == 1) || (lastDpin.pintype == "bus")) menu("BPopup");
     else menu("PPopup");
    }
    i += 1;
   }
   if(!b && (k == 2))
   {
      if((v[0].klass == "DNet") && (v[1].klass == "DNet"))
      {
	this.selectedObject = v[0]; // not the best choice
	displayStatus(getAttributeValue("netname", v[0]));
	b = true;
      }
   }
 }
 if((v.length == 0) && (this.substate != 6))
 {
   this.selectedObject = null;
   displayStatus("STATE IDLE");
   MOVEPOINTS = [];
   ENDPOINT = null;
   mmode = 0;
   CloseMenu();
   repaint();
 }
 else if(v.length == 1)
 {
//   this.selectedObject = v[0];
   if(this.selectedObject == v[0])
   {
     if(this.selectedObject.klass == "DNet") 
     {
 //     displayStatus(v[0].klass + " " + getAttributeValue("netname", v[0]));
       menu("NPopup");
     }
     else
     {
//     displayStatus(v[0].klass );
     if(this.selectedObject.klass == "DComponent") menu("CompPopup");
     else if(this.selectedObject.klass == "DPath") menu("PathPopup");
     else if(this.selectedObject.klass == "DPicture") menu("DPopup");
     else if(this.selectedObject.klass == "DBus") menu("BusPopup");
     else if((this.selectedObject.klass == "DPin") && (this.selectedObject.parent != null))
     {
       if(this.selectedObject.parent.klass === undefined)
       {
	menu("PPPopup"); 
       }
       else if((this.selectedObject.pintype == 1) || (this.selectedObject.pintype == "bus"))
       {
//	lastDPin = this.selectedObject;
	menu("BPopup");
       }
       else if(this.selectedObject.parent.klass === "SchematicSheet")
       {
	menu("PPPopup"); 
       }
       else
       {
	lastDPin = this.selectedObject;
	menu("PPopup");
       }
     }
     else menu("DPopup");
     }
   }
   else 
   {
     this.selectedObject = v[0];
 //    this.selectedObject.update();
 //    report("this.selectedObject = " + this.selectedObject.klass);
   }
   if((this.selectedObject.klass == "DPin") && (this.selectedObject.pintype == 0) && (this.selectedObject.parent != null) && !(this.selectedObject.parent.klass === undefined) && (this.selectedObject.parent == "DComponent") )
     {
      this.state = STATE_NET;
      lastDPin = this.selectedObject;
      CurrentNetName = ste.schematic.getNewNetName();
      displayStatus("Placing net: " + CurrentNetName);
      let n = this.getNetNameAt(xx, yy);
      if(n == null) n = CurrentNetName;
      else CurrentNetName = n;
      let xxxx = xx; // p2.x;
      let yyyy = yy; // p2.y;
      this.selectedObject = new DNet(de, xxxx, yyyy, xxxx + 1, yyyy + 1, NET_COLOR);
      this.setNodeNetName(CurrentNetName, xxxx, yyyy);
      this.substate = 6;
     }
  repaint();
 }
 else if(!b)
 {
   let k = v.length;
   report("Multiple objects selected " + k);
   let i = 0;
   while(i < k)
   {
     if(i == 0)
     {
       this.selectedObject = v[0];
     if(this.selectedObject.klass == "DComponent") menu("CompPopup");
     else menu("DPopup");
     }
      report("Multiple objects selected, " + i + " " + v[i].klass + " " + v[i].getX() + " " + v[i].getY());
      i += 1;
   }
   
 }
}
else if(this.state == STATE_PLACING)
{
  if((this.substate == 0) && (this.selectedObject != null))    // push
  {
     {
      if((this.selectedObject.klass == "DText") && ((this.selectedObject.name == "refdes") || (this.selectedObject.name == "value") || (this.selectedObject.name == "pinlabel") ||(this.selectedObject.klass == "DPin") || (this.selectedObject.name == "device")|| (this.selectedObject.name == "pinnumber")) && (this.selectedObject.parent != null))
      {
	let p = this.selectedObject.parent;
	let xc = Number(p.x) - xx;
	let yc = Number(p.y) - yy;
	xx = -xc;
	yy = -yc;
      }
      else
      {
        let g = this.selectedObject.parent;
        if(typeof g === 'undefined') g = "";
        else g = g.klass;
	report("1190 placing 1 " + this.selectedObject.klass + " " + g);
	/*
	if(FetchRef != null)
	{
	  setAttributeValue("refdes", this.selectedObject, FetchRef);
	  FetchRef = null;
	}
	*/
	this.selectedObject.setX(xx);
	this.selectedObject.setY(yy);
      }
    }
   
    if (this.mc != null)
    {
	this.mc.new_x = xx;
	this.mc.new_y = yy;
	this.mc.execute();
	stack.add(this.mc);
	this.selectedObject = null;
	this.setState(STATE_IDLE);
    }
    else
    {
	if(this.selectedObject.klass == "DPin") this.selectedObject.updateAttributeLocations();
	let ad = new AddDrawingObjectCommand(this, this.selectedObject);
	ad.execute();
	stack.add(ad);
        if(this.bcopies) copy();
        else
        {
	  this.selectedObject = null;
	  this.setState(STATE_IDLE);
        }
    }
    report("1505 mc " + this.mc);
    repaint();
  }
else if(this.substate == 2)
  {
  if(this.selectedObject != null)
  {
//	this.selectedObject.releaseResources();
	this.selectedObject = null;
  }
 // setSelectedObject(null);
  this.mc = null;
  dod = null;
  this.substate = 0;
  unselectAll();
  this.setSchematicState(STATE_IDLE);
  repaint();
  }
}
else if((this.state == STATE_NET) || (this.state == STATE_LINE) || (this.state == STATE_PATH))
{
if((this.substate == 0) || (this.substate == 5))
{
  if((this.state == STATE_NET))
  {
    let n = this.getNetNameAt(xx, yy);
//    alert("got here " + n);
    if(n == null) n = CurrentNetName;
    else CurrentNetName = n;
    this.selectedObject = new DNet(de, xx, yy, xx + 1, yy + 1, NET_COLOR);
    this.setNodeNetName(CurrentNetName, xx, yy);
  }
  else if((this.state == STATE_PATH))
  {
    this.selectedObject = new DPath(de, GRAPHIC_COLOR, 2, 0, 0, 0, 0,0,0,0,0,0,0,0);
    this.selectedObject.setX(xx);
    this.selectedObject.setY(yy);
  }
  else this.selectedObject = new DLine(de, xx, yy, xx + 1, yy +1, GRAPHIC_COLOR, 0, 0, 0, 0, 0);
  this.substate += 1;
}
else if((this.substate == 1) || (this.substate == 6))
{
  if(this.state == STATE_NET) 
  {
    let cont = true;
    let bb = false;
    let o = this.selectedObject;
    let xxx = 0;
    let yyy = 0;
    let dx = o.x1 - xx;
    if(dx < 0) dx = -dx;
    let dy = o.y1 - yy;
    if(dy < 0) dy = -dy;
    if((dx > 1000) && (dy > 1000))
    {
      if(this.substate == 6)
      {
//      this.substate = 0;
//      this.setState(STATE_IDLE);
      this.state = STATE_IDLE;
      this.selectedObject = lastDPin;
      displayStatus(getAttributeValue("pinlabel", this.selectedObject) + ": pin " + getAttributeValue("pinnumber", this.selectedObject) + " " + getAttributeValue("pintype", this.selectedObject));
      cont = false;
      menu("PPopup");
      }
      else
      {
//      this.substate = 0;
      this.setState(STATE_IDLE);
      cont = false;
      }
    }
    else if((dx < MinNetSpacing) && (dy < MinNetSpacing))
    {
      this.selectedObject = lastDPin;
      displayStatus(getAttributeValue("pinlabel", this.selectedObject) + ": pin " + getAttributeValue("pinnumber", this.selectedObject) + " " + getAttributeValue("pintype", this.selectedObject));
      cont = false;
      menu("PPopup");
      this.state = STATE_IDLE;
    }
    else
    {
      let v = this.getObjectsAt(de.mouseToDrawingX(mousePos.x), de.mouseToDrawingY(mousePos.y));
      let kk = v.length;
      let ii = 0;
       while(!bb && (ii < kk))
      {
	if(v[ii].klass == "DPin")
	{
	  bb = true;
	}
	else ii += 1;
      }
      xxx = xx;
      yyy = yy;
      if(b)
      {
	    xxx = Number(v[ii].x) + Number(v[ii].xw);
	    yyy = Number(v[ii].y) + Number(v[ii].yw);
      }
      if(dx >= dy) 
      {
	    o.setX2(xxx);
	    o.y2 = o.y1;
      }
      else 
      {
	    o.setY2(yyy);
	    o.x2 = o.x1;
      }
    }
    let n = this.getNetNameAt(xxx, yyy);
//    report("got here2 " + n + " " + xxx + " " + yyy);
    if((this.selectedObject != null) && (this.selectedObject.klass == "DNet"))
    {
    if((n != null) && cont)
    {
      if(n != CurrentNetName)
      {
	{
	CurrentNetName = n;
	setAttributeValue("netname",this.selectedObject, n);
	renameNet(CurrentNetName, n);
	}
	this.setNodeNetName(CurrentNetName, xx, yy);
      }
      else
      {
	CurrentNetName = n;
	setAttributeValue("netname",this.selectedObject, n);									
      }
    }
    else 
    {
      setAttributeValue("netname", this.selectedObject, CurrentNetName);
      this.setNodeNetName(CurrentNetName, xx, yy);
    }
    }
  if(cont)
  {
    this.substate = 1;
    let o = this.selectedObject;
    let ad = new AddDrawingObjectCommand(this, o);
    ad.execute();
    stack.add(ad);
    if(bb)  
    {
      this.substate = 0;
      this.setState(STATE_IDLE);
    }
    else this.selectedObject = new DNet(de, o.x2, o.y2, o.x2 + 1, o.y2 + 1, NET_COLOR);
  }
  else if(this.substate != 6)
  {
   this.selectedObject = null;
   this.substate = 0;
  }
  else
  {
//    alert(this.selectedObject.klass + " " + this.substate);
   this.substate = 0; 
  }
  repaint();
  }
else if(this.state == STATE_PATH)
{
  this.selectedObject.addLineSegment(xx, yy);
  
}
else
{
  this.selectedObject.setX2(xx);
  this.selectedObject.setY2(yy);							
  let ad = new AddDrawingObjectCommand(this, this.selectedObject);
  ad.execute();
  stack.add(ad);
//  this.selectedObject = new DLine(de, xx, yy, xx + 1, yy +1, GRAPHIC_COLOR, 3, 0, 0, 0, 0);
  this.substate = 0;
  this.setState(STATE_IDLE);
}
//this.substate = 0;
//this.setState(STATE_IDLE);
}
}
else if(this.state == STATE_RECTANGLE)
{
  if(this.substate == 0)
  {
	this.selectedObject = new DBox(de, xx, yy, xx + 400, yy + 400, GRAPHIC_COLOR, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
//	this.selectedObject.setX(xx);
//	this.selectedObject.setY(yy);
	this.substate = 1;
	this.selectedObject.update();
  }
  else if(this.selectedObject != null)
  {
      this.selectedObject.setX2(xx);
      this.selectedObject.setY2(yy);
      this.substate = 0;
      this.selectedObject.update();
      let ad = new AddDrawingObjectCommand(this, this.selectedObject);
      ad.execute();
      stack.add(ad);
      repaint();
      this.setState(STATE_IDLE);
  }
  else this.setState(STATE_IDLE);
}
else if(this.state == STATE_CIRCLE)
{
  if(this.substate == 0)
  {
  this.substate = 1;
  this.selectedObject = new DCircle(de, xx, yy, 100, GRAPHIC_COLOR, 0, 0, 0, 0,0, 0, 0, 0,0, 0, 0);
  }
  else
  {
  let ad = new AddDrawingObjectCommand(this, this.selectedObject);
  ad.execute();
  stack.add(ad);
  this.substate = 0;
  this.setState(STATE_IDLE);
  repaint();
  }
}
else if(this.state == STATE_ARC)
{
  if(this.substate == 0)
  {
    this.substate = 1;
    this.selectedObject = new DCircle(de, xx, yy, 100, GRAPHIC_COLOR, 0, 0, 0, 0,0, 0, 0, 0,0, 0, 0);
  }
  else if(this.substate == 1)
  {
    let ax = this.selectedObject.x;
    let ay = this.selectedObject.y;
    let radius = this.selectedObject.radius;
    let a = xx - ax;
    let b = yy - ay + 50;
    let dsa = 360 - 180 * Math.atan2(-b,a) / Math.PI;
    while(dsa > 360) dsa = dsa - 360;
    let startangle = Math.round(dsa);
    report("startangle = " + startangle + " a = " + a + " b = " + b + " radius = " + radius);
    let sweepangle = 90;
    this.selectedObject = new DArc(de, ax, ay, radius, startangle, sweepangle, GRAPHIC_COLOR, 0, 0, 0, 0, 0);
    this.substate = 2;
  }
  else
  {
    let a = xx - this.selectedObject.x;
    let b = yy - this.selectedObject.y;
    if(a != 0)
    {
      let dsa2 = 360 - 180 * Math.atan2(-b,a) / Math.PI;
      let dsa = dsa2;
      while(dsa < 0) dsa = 360 + dsa;
      while(dsa > 360) dsa = dsa - 360;
      let sweepangle = Math.round(dsa) - this.selectedObject.startangle;
//      alert(dsa + " " + this.selectedObject.startangle);
      this.selectedObject.sweepangle = sweepangle;
    }
    else this.selectedObject.sweepangle = 180;
    report("sweepangle = " + this.selectedObject.sweepangle);
    let ad = new AddDrawingObjectCommand(this, this.selectedObject);
    ad.execute();
    stack.add(ad);
    this.substate = 0;
    this.setState(STATE_IDLE);
    repaint();
  }
}
else if(this.state == STATE_GROUP)
{
  if(this.substate == 0)
  {
    this.selectbox = new DBox(de, xx, yy, 1, 1, SELECT_COLOR, 3, 0, 2, 100, 100, 0, 0, 0, 0, 0, 0);
    this.substate = 1;
    displayStatus("STATE_GROUP pick 2nd point");
    repaint();
  }
  else if(this.substate == 1)
  {
  this.selectbox.setX2(xx);
  this.selectbox.setY2(yy);
  this.selectbox.update();
  
  let vd = this.getObjectsInArea(this.selectbox);
  displayStatus("Group contains " + vd.length + " objects");
  report("SchematicSheet objects in area = " + vd.length);
   this.setState(STATE_IDLE);
  repaint();
  }
}
else if((this.state == STATE_PIN))
{
  if(this.substate == 0)    
  {
    let o = this.selectedObject;
    o.x1 = xx;
    o.x2 = xx + 200;
    o.y1 = yy;
    o.y2 = yy;
    this.substate = 1;
    repaint();
  }
  else if(this.substate == 1)
  {
    let ad = new AddDrawingObjectCommand(this, this.selectedObject);
    ad.execute();
    stack.add(ad);
    //	doj.add(dod);
    this.substate = 0;
    this.selectedObject = new DPin(de, 0, 0, 200, 0, PIN_COLOR, 0, 0, 8);
//					setSchematicState(STATE_IDLE);
    repaint();
  }
}
else if((this.state == STATE_BUS))
{
  if(this.substate == 0)    
  {
    this.selectedObject = new DBus(de, xx, yy, xx + 1, yy +1, BUS_COLOR, 0);
    this.substate = 1;
  }
  else
  {
    let o = this.selectedObject;
    let dx = o.x1 - xx;
    if(dx < 0) dx = -dx;
    let dy = o.y1 - yy;
    if(dy < 0) dy = -dy;
    if((dx > 1000) && (dy > 1000))
    {
      this.selectedObject = null;
      this.setState(STATE_IDLE);
      repaint();
    }
    else
    {
      let xxx = xx;
      let yyy = yy;
      if(b)
      {
	xxx = Number(v[ii].x) + Number(v[ii].xw);
	yyy = Number(v[ii].y) + Number(v[ii].yw);
      }
      if(dx >= dy) 
      {
	o.setX2(xxx);
	o.y2 = o.y1;
      }
      else 
      {
	o.setY2(yyy);
	o.x2 = o.x1;
      }
      if(this.substate == 1)
      {
	this.substate = 0;
	bn = prompt("Enter Bus Name:");
	this.substate = 2;
      }
      if(bn != null)
      {
	o.attributes[o.attributes.length] = createAttribute(de, o.x1 + 50, o.y1 + 100, ATTRIBUTE_COLOR, o.textsize, VISIBILITY_VISIBLE, SHOW_VALUE, 0, 1, "busname", bn);
	let ad = new AddDrawingObjectCommand(this, this.selectedObject);
	ad.execute();
	stack.add(ad);
	ste.schematic.addDBus(this.selectedObject);
      }
      this.selectedObject = null;
      this.selectedObject = new DBus(de, xx, yy, xx + 1, yy +1, BUS_COLOR, 0);

      repaint();
    }
 
  }
}

clicker = false;
}

SchematicSheet.prototype.getNetNameAt = function(xx, yy)
{
let n = null;
let dx = this.getObjectsAt(xx, yy);
//report("SchematicSheet getNetNameAt objects = " + dx.length));
let kk = dx.length;
let b = false;
let ii = 0;
while(ii < kk)
{
  let d = dx[ii];
  if(d.klass == "DPin")
  {
    let prn = d.parent;
    let nt = getAttributeValue("net", prn);
    if(nt != null)
    {
     let pn = getAttributeValue("pinnumber", d);
     if(this.netpin(nt, pn))
     {
       n = nt.substring(0, nt.indexOf(":"));
       d.connectedSignal = n;
       b = true;
     }
    }
    else if((d.connectedSignal != null) && (d.connectedSignal.length > 0))
    {
       n = d.connectedSignal;
       b = true;      
    }
  }
  ii += 1;
}

ii = 0;
while((ii < kk) && (!b))
{
  let d = dx[ii];
  if(d.klass == "DNet")
  {
    n = getAttributeValue("netname", d);
    b = true;
  }
  ii += 1;
}
return(n);
}

SchematicSheet.prototype.netpin = function(nt, pn)
{
  let b = false;
  let l = nt.length;
  let i = nt.indexOf(":") + 1;
  let j = nt.indexOf(",");
  if(j == -1)
  {
      if(pn == nt.substring(i)) b = true;
  }
  else
  {
      let bb = true;
      while((bb) && !b)
      {
	if(j == -1)
	{
	  if(pn == nt.substring(i)) b = true;
	  bb = false;
	}
	else if(pn == nt.substring(i,j)) b = true;
	else
	{
	    i = j + 1;
	    j = nt.indexOf(",", i);
	}
      }
  }
  return(b);
}

SchematicSheet.prototype.setNodeNetName = function(name, xx, yy)
{
let dx = this.getObjectsAt(xx, yy);
let kk = dx.length;
let ii = 0;
while(ii < kk)
{
  let d = dx[ii];
  if(d.klass == "DNet")
  {
    setAttributeValue("netname", d, name);
  }
  else if(d.klass == "DPin")
  {
    if(d.pintype == 1)
    {
      alert("Error. You cannot connect a net to a bus pin.");
    }
    else d.connectedSignal == name;
//				d.setAttributeValue("netname", name);
  }
  ii += 1;
}
}

SchematicSheet.prototype.mouseDoubleClicked = function(evt)
{
//displayStatus("2 " + evt+ " button = " + evt.button);
}

SchematicSheet.prototype.mouseMoved = function(evt)
{
  mousePos = getMousePos(canvas, evt);
  let xx = de.mouseToDrawingX(mousePos.x) + xfmX * de.getInverseZoom();
  let yy = de.mouseToDrawingY(mousePos.y) + xfmY * de.getInverseZoom();

//displayStatus("2 " + evt+ " button = " + evt.button);
if((this.selectedObject != null) && ((this.state == STATE_PLACING) || (this.state == STATE_MOVE)))
{
  if(this.selectedObject.klass == "DPin")
  {
    
  }
  if((this.selectedObject.klass == "DText") && ((this.selectedObject.name == "refdes") || (this.selectedObject.name == "value") || (this.selectedObject.name == "pinlabel") || (this.selectedObject.name == "pinnumber") || (this.selectedObject.name == "device")) && (this.selectedObject.parent != null))
  {
    let p = this.selectedObject.parent;
    let xc = Number(p.x) - xx;
    let yc = Number(p.y) - yy;
    xx = -xc;
    yy = -yc;
  }
  if((mmode == 3) && (MOVEPOINTS.length > 0))
  {
    let x0 = ENDPOINT.x;
    let y0 = ENDPOINT.y;
    for(i = 0; i < MOVEPOINTS.length; i++)
    {
      let a = MOVEPOINTS[i];
      if(a.klass == "DNet")
      {
        if((a.getX() == x0) && (a.getY() == y0))
        {
          a.x1 = xx; 
          a.y1 = yy;
        }
        else if((a.getX2() == x0) && (a.getY2() == y0))
        {
          a.x2 = xx;
          a.y2 = yy;
        }
        a.update();
      }
    }
    ENDPOINT = new PointI(xx, yy);
  }
  this.selectedObject.setX(xx);
  this.selectedObject.setY(yy);
  repaint();
}
else if((this.dj != null) && ((this.state == STATE_PLACING)|| (this.state == STATE_MOVE)))
{
  this.dj.x = xx;
  this.dj.y = yy;
  repaint();
}
else if(((this.state == STATE_NET) || (this.state == STATE_PATH) || (this.state == STATE_LINE)) && ((this.substate == 1) || (this.substate == 6)) && (this.selectedObject != null))
{
 if((this.state == STATE_NET))
  {
    let o = this.selectedObject;
    let dx = o.x1 - xx;
    if(dx < 0) dx = -dx;
    let dy = o.y1 - yy;
    if(dy < 0) dy = -dy;
    if(dx >= dy) 
    {
      o.setX2(xx);
      o.y2 = o.y1;
    }
    else 
    {
      o.setY2(yy);
      o.x2 = o.x1;
    }
  }
  else
  {
    this.selectedObject.setX2(xx);
    this.selectedObject.setY2(yy);
  }
  repaint();			
}
else if(((this.state == STATE_BUS) && this.substate != 0) && (this.selectedObject != null))
{
//  report("1293");
    let o = this.selectedObject;
    let dx = o.x1 - xx;
    if(dx < 0) dx = -dx;
    let dy = o.y1 - yy;
    if(dy < 0) dy = -dy;
    if(dx >= dy) 
    {
      o.setX2(xx);
      o.y2 = o.y1;
    }
    else 
    {
      o.setY2(yy);
      o.x2 = o.x1;
    }
//  this.selectedObject.x2 = xx;
//  this.selectedObject.y2 = yy;
  this.selectedObject.update();
  repaint();						
}
else if(((this.state == STATE_RECTANGLE) && this.substate == 1) && (this.selectedObject != null))
{
  this.selectedObject.setX2(xx);
  this.selectedObject.setY2(yy);
  this.selectedObject.update();
 repaint();				
}		
else if(this.state == STATE_CIRCLE)
{
  if(this.substate == 1)
  {
//    this.selectedObject.x = xx;
//    this.selectedObject.y = yy;
    let a = xx - this.selectedObject.x;
    let b = yy - this.selectedObject.y;
    let radius = Math.sqrt(a*a + b*b);
    let rf = Math.round(radius);
    this.selectedObject.radius = rf;
    this.selectedObject.update();
    repaint();
  }
}
else if(this.state == STATE_ARC)
{
  if(this.substate == 1)
  {
//    this.selectedObject.x = xx;
//    this.selectedObject.y = yy;
    let a = xx - this.selectedObject.x;
    let b = yy - this.selectedObject.y;
    let radius = Math.sqrt(a*a + b*b);
    let rf = Math.round(radius);
    this.selectedObject.radius = rf;
    this.selectedObject.update();
    repaint();
  }
  else if(this.substate == 2)
  {
    let a = xx - this.selectedObject.x;
    let b = yy - this.selectedObject.y;
    if(a != 0)
    {
      let dsa = 180 * Math.atan2(b,a) / Math.PI;
      while(dsa < 0) dsa = 360 + dsa;
      while(dsa > 360) dsa = dsa - 360;
      let sweepangle = Math.round(dsa);
      this.selectedObject.sweepangle = sweepangle;
      repaint();	
    }
  }
}
else if(((this.state == STATE_GROUP) && this.substate == 1) && (this.selectbox != null))
{
  this.selectbox.setX2(xx);
  this.selectbox.setY2(yy);
  this.selectbox.update();
  repaint();			
}
/*else if(this.state == STATE_PICTURE)
{
  this.selectedObject.x = xx;
  this.selectedObject.y = yy;
  this.state = STATE_IDLE;
  repaint();			
}
*/
else if(((this.state == STATE_PIN) && this.substate == 0) && (this.selectedObject != null))
{
  this.selectedObject.x1 = xx;
  this.selectedObject.x2 = (xx + 200);
  this.selectedObject.y1 = yy;
  this.selectedObject.y2 = yy;
  repaint();			
}
else if((this.state == STATE_TEXT) || (this.state == STATE_ATTRIBUTE))
{
  if(this.selectedObject != null) 
  {
    this.selectedObject.x = xx;
    this.selectedObject.y = yy;
    repaint();			
  }
}
else if(bMouseDownActive && (this.selectedObject == null))
{
  if(lastmousePos != null)
  {
    let dx = mousePos.x - lastmousePos.x;
    let dy = mousePos.y - lastmousePos.y;
    let d = Math.round(10 / de.getInverseZoom());
    d = 10*d;
//    report("1943 " + d);
    if(Math.abs(dx) > Math.abs(dy))
    {
      if(dx < 0) Mscroll(-d, 0, d); //moveLeft();
      else Mscroll(d, 0, -d); //moveRight();
    }
    else if(dy < 0) Mscroll(0, -d, d); //moveUp();
    else Mscroll(0, d, -d);  //moveDown();
  }
}

}

function Mscroll(x, y, t)
{
  ctx.clearRect(0,0, MAXWIDTH, MAXHEIGHT);
  ctx.translate(x, y);
  let z = de.getInverseZoom();
  xfmX -= x
  xfmY -= y;
  repaint();
}

SchematicSheet.prototype.getObjectsAt = function(xxx, yyy)
{
  let v = [];
  let z = de.getInverseZoom();
  let xx = xxx + xfmX * z;
  let yy = yyy + xfmY * z;
  let allnets = true;
  let oneinrange = false;
  let somenets = 0;
  let i = 0;
  let k = this.DrawingObjects.length;
//  report("getObjectsAt " + k);
  while(i < k)
  {
    let o = this.DrawingObjects[i];
    if(o.inRange(xx, yy))
    {
      v[v.length] = o;
      if(((o.klass != "DNet") && (o.klass != "DBus")) && (i > 0))
      {
	allnets = false;
//	report("allnets false " + o.klass + " " + getAttributeValue("device", o));
      }
      if((o.klass == "DNet") || (o.klass == "DBus"))
      {
	oneinrange = true;
	somenets += 1;
      }
    }
    else if((o.klass == "DNet") || (o.klass == "DBus"))
    {
	let x = o.x1;
	let y = o.y1;
	if((xx == x) && (yy == y))
	{
	  v[v.length] = o;
//	  report("here3 " + xx + " " + yy);
	  somenets += 1;
	}
	else if((xx == o.x1) && (xx == o.x2) && (((yy > o.y1) && (yy < o.y2)) || ((yy > o.y2) && (yy < o.y1))))
	{
	  v[v.length] = o;
//	  report("here1 " + xx + " " + yy);
	  somenets = 5;
	}
	else if((yy == o.y1) && (yy == o.y2) && (((xx > o.x1) && (xx < o.x2)) || ((xx > o.x2) && (xx < o.x1))))
	{
	  v[v.length] = o;
//	  report("here2 " + xx + " " + yy);
	  somenets = 5;
	}
	else
	{
	  x = o.x2;
	  y = o.y2;
	  if((xx == x) && (yy == y))
	  {
	    v[v.length] = o;
	    somenets += 1;
	  }
	}   
    }
    if(o.klass == "DComponent")
    {
      let p1 = new PointI(xx, yy);
      let p2 = o.unmorph(p1);
      let xxx = p2.x;
      let yyy = p2.y;
      let vz = [];
      vz = o.getPins();
      let kk = vz.length;
      let ii = 0;
      while(ii < kk)
      {
//	report("goa " + xxx + " -" + o.x + ", " + yyy + " -" + o.y);
//	report(vz[ii].xw + " " + vz[ii].yw);
	if(vz[ii].inRange(xxx - o.x, yyy - o.y))
	{
//	  report("added ok");
	  v[v.length] = vz[ii];
	  if(i > 0) allnets = false;
	}
	ii += 1;
      }
    }
  i += 1;
  }
//  report("allnets " + allnets + " somenets " + somenets);
  if((!clicker) && allnets && (((somenets > 1) && oneinrange) || (somenets > 2)))
  {
    this.addDrawingObject(new DJunction(de, xx, yy, NET_COLOR));
  }
  return(v);
}

SchematicSheet.prototype.getExactObjectsAt = function(xx, yy)
{
  let v = [];
  let i = 0;
  let k = this.DrawingObjects.length;
  while(i < k)
  {
    let o = this.DrawingObjects[i];
    if(((o.klass != "DNet") && (o.klass != "DBus")) && (i > 0))
    {
      if(((o.x1 == xx) && (o.y1 == yy)) || ((o.x2 == xx) && (o.y2 == yy)))
      {
	v[v.length] = o;
      }
    }
    else if(o.klass == "DComponent")
    {
      if(o.inRange(xx, yy))
      {
	let p1 = new PointI(xx, yy);
	let p2 = o.unmorph(p1);
	let xxx = p2.x;
	let yyy = p2.y;
	let vz = [];
	vz = o.getPins();
	let kk = vz.length;
	let ii = 0;
	while(ii < kk)
	{
	  if(vz[ii].inRange(xxx - o.x, yyy - o.y))
	  {
	    v[v.length] = vz[ii];
	  }
	  ii += 1;
	}
      }
    }
  i += 1;
  }
  return(v);
}

SchematicSheet.prototype.clearJunctions = function()
{
//  report("clearJunctions before " + this.DrawingObjects.length);
  let i = this.DrawingObjects.length - 1;
  while(i >= 0)
  {
    let o = this.DrawingObjects[i];
    if(o.klass == "DJunction") removeItemFromArray(o, this.DrawingObjects);
    i -= 1;
  }
//  report("clearJunctions after " + this.DrawingObjects.length);
}
	
SchematicSheet.prototype.getObjectsInArea = function(selectbox)
{
  let v = [];
  let r = selectbox.selectBox;
  let ry =de.correctY(r.y);
  let k = this.DrawingObjects.length;
  let i = 0;
  while(i < k)
  {
    let o = this.DrawingObjects[i];
    let b = false;
    if((r.x < o.getX()) && (o.getX() < r.x + r.width))
    {
      if((ry < o.getY()) && (o.getY() < ry + r.height)) b = true;
    }
    if(b) 
    {
      v[v.length] = o;
    }
    i += 1;
  }
return v;
}

// DrawingObjects
class DrawingObject {
  constructor(de) {
    // de = de;
    this.klass = "DrawingObject";
    this.selectBox = null;
    this.selectable = true;
    this.colorindex = 0;
    this.attributes = [];
  }

  paint(ctx) {

  }

  makeSelectBox() {

  }

  getData() {
    let sb = "";
    return(sb);
  }




}

// DLine
function DLine(de, x1, y1, x2, y2, colorindex, width, capstyle, dashstyle, dashlength,dashspace)
{
  this.klass = "DLine";
  this.attributes = [];
  // de = de;
  this.x1 = Number(x1);
  this.y1 = Number(y1);
  this.x2 = Number(x2);
  this.y2 = Number(y2);
  this.colorindex = Number(colorindex);
//  this.color = de.getColor(this.colorindex);
  this.width = Number(width);
  this.capstyle = Number(capstyle);
  this.dashstyle = Number(dashstyle);
  this.dashlength = Number(dashlength);
  this.dashspace = Number(dashspace);
  this.line = new Line2D(x1,de.correctY(y1),x2,de.correctY(y2));
  this.selectBox = this.makeSelectBox();
  this.selectable = 1;
  this.c = -1;
}

DLine.prototype.getDataJ = function()
{
  let o = {
      type: "DLine",
      x1: this.x1,
      y1: this.y1,
      x2: this.x2,
      y2: this.y2,
      colorindex: this.colorindex,
      width: this.width,
      capstyle: this.capstyle,
      dashstyle: this.dashstyle,
      dashspace: this.dashspace,
      selectable: this.selectable,
      attributes: this.attributes
  };
  return(o);
}

DLine.prototype.update = function()
{
  this.line = new Line2D(this.x1,de.correctY(this.y1),this.x2,de.correctY(this.y2)); 
  this.line.lineWidth = this.width;
  this.line.colorindex = this.colorindex;
  switch(this.capstyle)
  {
    case 0 : 
      this.line.lineCap = "butt";
      break;
    case 1 : 
      this.line.lineCap = "square";
      break;
    case 2 : 
      this.line.lineCap = "round";
      break;
    default:
      this.line.lineCap = "round";
      break;
  }

  this.selectBox = this.makeSelectBox();
}

DLine.prototype.getX = function()
{
 return(this.x1); 
}

DLine.prototype.getY = function()
{
 return(this.y1); 
}
	
DLine.prototype.setX = function(x) 
{
  let d = x - this.x1;
  this.x1 = x;
  this.x2 = this.x2 + d;
  de.setLine(this.line, this.x1, this.y1, this.x2, this.y2);
}

DLine.prototype.setY = function (y) 
{
  let d = y - this.y1;
  this.y1 = y;
  this.y2 = this.y2 + d;
  de.setLine(this.line, this.x1, this.y1, this.x2, this.y2);
}

DLine.prototype.setX2 = function(x) 
{
  this.x2 = x;
  de.setLine(this.line, this.x1, this.y1, this.x2, this.y2);
}

DLine.prototype.setY2 = function (y) 
{
  this.y2 = y;
  de.setLine(this.line, this.x1, this.y1, this.x2, this.y2);
}

DLine.prototype.getX2 = function()
{
 return(this.x2);
}

DLine.prototype.getY2 = function()
{
 return(this.y2);
}


DLine.prototype.getData = function() 
{
//let cangle = angle;
//		setAngle(0);
let sb = "";
sb += "L " + R(this.x1) + " " + R(this.y1) + " " + R(this.x2)  + " " + R(this.y2) + " " + this.colorindex + " " + R(this.width) + " " + this.capstyle + " " + this.dashstyle + " " + this.dashlength + " " + this.dashspace + "\n";
// attributes
if(this.attributes.length != 0)
{
  sb += "{\n";
  let k = this.attributes.length;
  let i = 0;
  while(i < k)
  {
    sb += this.attributes[i].getData();
    i += 1;
  }
  sb += "}\n";
}
//setAngle(cangle);
return sb;
}

DLine.prototype.inRange = function(xx, yy)
{
let b = false;
let oc = this.selectBox.outcode(xx, de.correctY(yy));
if(oc == 0) b = true;
return(b);	
}

DLine.prototype.makeSelectBox = function()
{
let w = this.x2 - this.x1;
let h = this.y2 - this.y1;
let xm = this.x1;
if(this.x2 < this.x1) xm = this.x2;
let ym = this.y1;
if(this.y2 > this.y1) ym = this.y2;
if(w < 0) w = -w;
if(h < 0) h = -h;
let margin = 0 ; // 80;
let margin2 = 0; //160;
//let c = 0;
if(this.x1 == this.x2)
{
  margin = 80 * gridsize /100;
  margin2 = 2 * margin;
  if(this.y1 <= this.y2)
  {
    c = 1;
    this.selectBox = new Rectangle2D();
    this.selectBox = this.selectBox.setRect(this.x1 - margin, de.correctY(this.y2 -h) -margin, margin2, h - margin2);
  }
  else
  {
    c = 2;
    this.selectBox = new Rectangle2D();
    this.selectBox = this.selectBox.setRect(this.x1 - margin, de.correctY(this.y1 - h) -margin, margin2, h - margin2);
  }
}
else if(this.y1 == this.y2)
{
  margin = 80;
  margin2 = 160;
  if(this.x1 <= this.x2)
  {
    c = 3;
    this.selectBox = new Rectangle2D();
    this.selectBox = this.selectBox.setRect(this.x1 + margin, de.correctY(this.y2 +h) +margin, w - margin2, margin2);
  }
  else
  {
    c = 4;
    this.selectBox = new Rectangle2D();
    this.selectBox = this.selectBox.setRect(this.x2 + margin, de.correctY(this.y1) +margin, w - margin2, margin2);
  }
}
else
{
  c = 5;
  this.selectBox = new Rectangle2D();
  this.selectBox.setRect(xm + margin, de.correctY(ym) +h +margin, w - margin2, h - margin2);
}
//alert(c);
return(this.selectBox);
}

DLine.prototype.paint = function(ctx)
{
 this.dPaint(ctx); 
}

DLine.prototype.dPaint = function(ctx)
{
  this.line.paint(ctx, de.getColor(this.colorindex), de.getInverseZoom());
  if(this.selectable == 1)
  {
  this.selectBox = this.makeSelectBox();
  if(sheet.getSelectedObject() == this)
  {
    this.selectBox.paint(ctx, de.getColor(BOUNDINGBOX_COLOR), de.getInverseZoom());
  }
  }
}

// DBox
function DBox(de, x, y, boxwidth, boxheight, colorindex, width,
		capstyle, dashstyle, dashlength, dashspace, filltype,
		fillwidth, angle1, pitch1, angle2, pitch2)
{
  this.klass = "DBox";
  this.attributes = [];
  // de = de;
  this.x = x;
  this.y = y;
  this.boxwidth = boxwidth;
  this.boxheight = boxheight;
  this.colorindex = colorindex;
//  this.color = de.getColor(this.colorindex);
  this.width = width;
  this.capstyle = capstyle;
  this.dashstyle = dashstyle;
  this.dashlength = dashlength;
  this.dashspace = dashspace;
  this.filltype = filltype;
  this.fillwidth = fillwidth;
  this.angle1 = angle1;
  this.pitch1 = pitch1;
  this.angle2 = angle2;
  this.pitch2 = pitch2;
  this.box = new Rectangle2D();
  this.box.filltype = this.filltype;
  this.box.setRect(x, de.correctY(y), this.boxwidth, this.boxheight);
  this.selectBox = this.makeSelectBox();
  this.selectable = 1;
}

DBox.prototype.getDataJ = function()
{
  let o = {
      type: "DBox",
      x: this.x,
      y: this.y,
      boxwidth: this.boxwidth,
      boxheight: this.boxheight,
      colorinde: this.colorindex,
      width: this.width,
      capstyle: this.capstyle,
      dashstyle: this.dashstyle,
      dashlength: this.dashlength,
      dashspace: this.dashspace,
      filltype: this.filltype,
      fillwidth: this.fillwidth,
      angle1: this.angle1,
      pitch1: this.pitch1,
      angle2: this.angle2,
      pitch2: this.pitch2,
      selectable: this.selectable
  };
  return(o);
}

DBox.prototype.update = function()
{
//  alert(this.x + " " +  de.correctY(this.y) + " " + this.boxwidth +" " + this.boxheight);
  this.box.filltype = this.filltype;
  this.box.setRect(this.x, de.correctY(this.y), this.boxwidth, this.boxheight); 
  this.makeSelectBox();
}

DBox.prototype.getData = function()
{
  let sb = "B " + R(this.x) + " " + R(this.y) + " " + R(this.boxwidth) + " " + R(this.boxheight)
	 + " " + this.colorindex + " " + R(this.width) + " " + this.capstyle + " " + this.dashstyle + " " + this.dashlength + " " + this.dashspace
	 + " " + this.filltype + " " + this.fillwidth + " " + this.angle1 + " " + this.pitch1 + " " + this.angle2 + " " + this.pitch2 + "\n";

  let k = this.attributes.length;
  let i = 0;
  if(k > 0) sb += "{\n";
  while(i < k) // write out top level attributes
  {
    sb += this.attributes[i].getData();
    i += 1;
  }
  if(k > 0) sb += "}\n";
  return(sb);
}

DBox.prototype.getX = function()
{
 return(this.x); 
}

DBox.prototype.getY = function()
{
 return(this.y); 
}
	
DBox.prototype.setX = function(x) 
{
  this.x = x;
  this.box.setRect(this.x, de.correctY(this.y), Number(this.boxwidth), Number(this.boxheight)); 
}

DBox.prototype.setY = function (y) 
{
  this.y = y;
  this.box.setRect(this.x, de.correctY(this.y), Number(this.boxwidth), Number(this.boxheight)); 
}

DBox.prototype.setX2 = function(x2)
{
  this.boxwidth = this.x - x2;
  if(this.boxwidth < 0) this.boxwidth = -this.boxwidth;
  if(x2 < this.x) this.x = x2;
  de.setRect(this.box, this.x, this.y, Number(this.boxwidth), Number(this.boxheight));		
//  setRect(box);
}

DBox.prototype.setY2 = function(y2)
{
  this.boxheight = this.y - y2;
  if(this.boxheight < 0) this.boxheight = -this.boxheight;
  if(y2 < this.y) this.y = y2;
  de.setRect(this.box, this.x, this.y, Number(this.boxwidth), Number(this.boxheight));		
}

DBox.prototype.getX2 = function()
{
  let x2 = Number(this.x) + Number(this.boxwidth);
  return(x2);
}

DBox.prototype.getY2 = function()
{
  let y2 = Number(this.y) + Number(this.boxheight);
  return(y2);
}




DBox.prototype.inRange = function(xx, yy)
{
let b = false;
let oc = this.selectBox.outcode(xx, de.correctY(yy));
if(oc == 0) b = true;
return(b);	
}

DBox.prototype.makeSelectBox = function()
{
  this.selectBox = new Rectangle2D();
// alert(this.x + " " +  de.correctY(this.y) + " " + this.boxwidth +" " + this.boxheight);
  this.selectBox = this.selectBox.setRect(this.x - 40 , de.correctY(this.y) + 40  , Number(this.boxwidth) + 80, Number(this.boxheight) + 80 );
  return(this.selectBox);
}

DBox.prototype.paint = function(ctx)
{
 this.dPaint(ctx); 
}

DBox.prototype.dPaint = function(ctx)
{
  this.box.paint(ctx, de.getColor(this.colorindex), de.getInverseZoom());
  let k = this.attributes.length;
  if(k > 0)
  {
    ctx.save();
    ctx.translate(this.x/z , -(this.y)/z);   
    let i = 0;
    while(i < k)
    {
      this.attributes[i].paint(ctx);
      i += 1;
    }
    ctx.restore();
  }
  if(this.selectable == 1)
  {
  this.selectBox = this.makeSelectBox();
  if(sheet.getSelectedObject() == this)
  {
    this.selectBox.paint(ctx, de.getColor(BOUNDINGBOX_COLOR), de.getInverseZoom());
  }
  }
}

// DCircle
function DCircle(de, x, y, radius, colorindex, width,
	capstyle, dashstyle, dashlength, dashspace, filltype,
	fillwidth, angle1, pitch1, angle2, pitch2)
{
  this.klass = "DCircle";
  this.attributes = [];
  // de = de;
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.colorindex = colorindex;
 // this.color = de.getColor(this.colorindex);
  this.width = width;
  this.capstyle = capstyle;
  this.dashstyle = dashstyle;
  this.dashlength = dashlength;
  this.dashspace = dashspace;
  this.filltype = filltype;
  this.fillwidth = fillwidth;
  this.angle1 = angle1;
  this.pitch1 = pitch1;
  this.angle2 = angle2;
  this.pitch2 = pitch2;
  this.circle = new Arc2D();
  this.circle.filltype = this.filltype;
  this.circle.makeArc(this.x, de.correctY(this.y), radius, 0, 2 * Math.PI);
  this.selectBox = this.makeSelectBox();
  this.selectable = 1;
}

DCircle.prototype.getDataJ = function()
{
  let o = {
      type: "DCircle",
      x: this.x,
      y: this.y,
      radius: this.radius,
      colorindex: this.colorindex,
      width: this.width,
      capstyle: this.capstyle,
      dashstyle: this.dashstyle,
      dashlength: this.dashlength,
      dashspace: this.dashspace,
      filltype: this.filltype,
      fillwidth: this.fillwidth,
      angle1: this.angle1,
      pitch1: this.pitch1,
      angle2: this.angle2,
      pitch2: this.pitch2,
      selectable: this.selectable
  };
  return(o);
}

DCircle.prototype.update = function()
{
  this.circle.filltype = this.filltype;
  this.circle.makeArc(this.x, de.correctY(this.y), this.radius, 0, 2 * Math.PI);
  this.selectBox = this.makeSelectBox();
}

DCircle.prototype.getRadius = function()
{
 return(this.radius);
}

DCircle.prototype.getX = function()
{
 return(this.x); 
}

DCircle.prototype.getY = function()
{
 return(this.y); 
}
	
DCircle.prototype.setX = function(x) 
{
  this.x = x;
  this.circle.makeArc(this.x, de.correctY(this.y), this.radius, 0, 2 * Math.PI);
}

DCircle.prototype.setY = function (y) 
{
  this.y = y;
  this.circle.makeArc(this.x, de.correctY(this.y), this.radius, 0, 2 * Math.PI);
}

DCircle.prototype.getData = function()
{
  let sb = "V " + R(this.x) + " " + R(this.y) + " " + R(this.radius) + " " + this.colorindex + " " + R(this.width) + " " + this.capstyle + " " + this.dashstyle + " " + this.dashlength + " " + this.dashspace
	 + " " + this.filltype + " " + this.fillwidth + " " + this.angle1 + " " + this.pitch1 + " " + this.angle2 + " " + this.pitch2 + "\n";
  let k = this.attributes.length;
  let i = 0;
  if(k > 0) sb += "{\n";
  while(i < k) // write out top level attributes
  {
    sb += this.attributes[i].getData();
    i += 1;
  }
  if(k > 0) sb += "}\n";
  return(sb);
}

DCircle.prototype.inRange = function(xx, yy)
{
let b = false;
let oc = this.selectBox.outcode(xx, de.correctY(yy));
if(oc == 0) b = true;
return(b);	
}

DCircle.prototype.makeSelectBox = function()
{
  this.selectBox = new Rectangle2D();
  this.selectBox = this.selectBox.setRect(this.x - this.radius , de.correctY(this.y - this.radius) , 2 * this.radius, 2 * this.radius );
  return(this.selectBox);
}

DCircle.prototype.paint = function(ctx)
{
 this.dPaint(ctx); 
}

DCircle.prototype.dPaint = function(ctx)
{
  this.circle.paint(ctx, de.getColor(this.colorindex), de.getInverseZoom());
  let k = this.attributes.length;
  if(k > 0)
  {
    let i = 0;
    ctx.save();
    ctx.translate(this.x/z , -(this.y)/z);   
    while(i < k)
    {
      this.attributes[i].paint(ctx);
      i += 1;
    }
    ctx.restore();
  }
  if(this.selectable == 1)
  {
  this.selectBox = this.makeSelectBox();
  if(sheet.getSelectedObject() == this)
  {
    this.selectBox.paint(ctx, de.getColor(BOUNDINGBOX_COLOR), de.getInverseZoom());
  }
  }
}

function DPath(de, colorindex, width, capstyle, dashstyle, dashlength, dashspace, filltype, fillwidth, angle1, pitch1, angle2, pitch2, numlines)
{
  this.klass = "DPath";
  // de = de;
  this.colorindex = colorindex;
  this.width = width;
  this.capstyle = capstyle;
  this.dashstyle = dashstyle;
  this.dashlength = dashlength;
  this.dashspace = dashspace;
  this.filltype = filltype;
  this.fillwidth = fillwidth;
  this.angle1 = angle1;
  this.pitch1 = pitch1;
  this.angle2 = angle2;
  this.pitch2 = pitch2;
  this.numlines = numlines;
  this.segments = [];
  this.closed = false;
  this.attributes = [];
  this.selectable = 1;
  this.currentLine = null;
  this.parent = null;
  this.x = 0;
  this.y = 0;
  this.mx = 0;
  this.my = 0;
  this.selectBox = this.makeSelectBox();
}

DPath.prototype.getDataJ = function()
{
  let o = {
      klass: this.klass,
      colorindex: this.colorindex,
      width: this.width,
      capstyle: this.capstyle,
      dashstyle: this.dashstyle,
      dashlength: this.dashlength,
      dashspace: this.dashspace,
      filltype: this.filltype,
      fillwidth: this.fillwidth,
      angle1: this.angle1,
      pitch1: this.pitch1,
      angle2: this.angle2,
      pitch2: this.pitch2,
      numlines: this.numlines,
      segments: [],
      closed: this.closed,
      attributes: [],
      selectable: this.selectable,
      currentLine: this.currentLine,
      parent: null,
      x: this.x,
      y: this.y,
      mx: this.mx,
      my: this.my,
      selectBox: null
  }
  this.segments.forEach( (seg) => {
      o.segments.push(seg.getDataJ());
  });
  
  this.attributes.forEach( (att) => {
      let pnt = att.parent;
      att.parent = null;
      o.attributes.push(att.getDataJ());
      att.parent = pnt;
  });
  return(o);
}

DPath.prototype.addDrawingObject = function(o)
{
 report("DPath addDrawingObject " + o.klass); 
}

DPath.prototype.addLineSegment = function(sx, sy)
{
  let ln = null;
//  report("DPath addLineSegment " + sx + " " + sy);
  if(this.segments.length == 0)
  {
  report("2617 DPath addLineSegment length = " + this.segments.length + " " + this.x + " " + this.y + " " + sx + " " + sy);
//    ln = new DLine(de, this.x, this.y, sx, sy, this.colorindex, this.width, this.capstyle, this.dashstyle, this.dashlength,this.dashspace);
    ln = new Line2D(this.x,de.correctY(this.y),sx,de.correctY(sy));
    ln.selectable = 0;
  }
  else
  {
    let rx = this.segments[this.segments.length -1].x2;
    let ry = de.correctY(this.segments[this.segments.length -1].y2);
  report("DPath addLineSegment length = " + this.segments.length + " " + rx + " " + ry + " " + sx + " " + sy);
//    ln = new DLine(de, rx, ry, sx, sy, this.colorindex, this.width, this.capstyle, this.dashstyle, this.dashlength,this.dashspace);
    ln = new Line2D(rx,de.correctY(ry),sx,de.correctY(sy)); 
    ln.selectable = 0;
  }
  this.segments[this.segments.length] = ln;
}

DPath.prototype.setM = function(xx, yy)
{
  this.mx = xx;
  this.yy = yy;
}

DPath.prototype.closePath = function()
{
  if(this.segments.length > 1)
  {
    report("DPath closePath " + this.segments.length);
    this.setX2(this.x)
    this.setY2(this.y);
    this.closed = true;
  }
}

DPath.prototype.setX2 = function(x)
{
  if(this.segments.length == 0)
  {
    this.addLineSegment(x, 100);
  }
  else this.segments[this.segments.length-1].setX2(x);
}

DPath.prototype.setY2 = function(y)
{
  this.segments[this.segments.length-1].setY2(de.correctY(y));
}

DPath.prototype.update = function()
{
  let k = this.segments.length;
  let i = 0;
  while(i < k)
  {
 //   this.segments[i].update();
 //   this.segments[i] = new Line2D(this.x1,de.correctY(this.y1),this.x2,de.correctY(this.y2)); 
    i += 1;
  }
  this.selectBox = this.makeSelectBox();
}

DPath.prototype.setX = function(x)
{
  let dx = x - this.x;
  this.x = x;
  let k = this.segments.length;
  let i = 0;
  while(i < k)
  {
    this.segments[i].x1 = this.segments[i].x1 + dx;
    this.segments[i].x2 = this.segments[i].x2 + dx;
   i += 1;
  }
  
}

DPath.prototype.setY = function(y)
{
  let dy = y - this.y;
  this.y = y;
  let k = this.segments.length;
  let i = 0;
  while(i < k)
  {
    this.segments[i].y1 = this.segments[i].y1 - dy;
    this.segments[i].y2 = this.segments[i].y2 - dy;
  i += 1;
  }
}

DPath.prototype.getX = function()
{
  return(this.x);
}

DPath.prototype.getY = function()
{
  return(this.y);
}

DPath.prototype.getData = function()
{
  this.numlines = 1 + this.segments.length;
  let sb = "H " + this.colorindex + " " + R(this.width) + " " + this.capstyle + " " + this.dashstyle + " " + this.dashlength + " " + this.dashspace
	 + " " + this.filltype + " " + this.fillwidth + " " + this.angle1 + " " + this.pitch1 + " " + this.angle2 + " " + this.pitch2 + " " + this.numlines + "\n";
  sb += "M " + R(this.x) + "," + R(this.y) + "\n";
  let k = this.segments.length; // - 1;
  let i = 0;
  while(i < k) // write out top level attributes
  {
    let o = this.segments[i];
    if(o.klass == "Line2D")
    {
      sb += "L " + R(o.x2) + "," + R(de.correctY(o.y2)) + "\n";
    }
    i += 1;
  }
  sb += "z\n";
 
  k = this.attributes.length;
  i = 0;
  if(k > 0) sb += "{\n";
  while(i < k) // write out top level attributes
  {
    sb += this.attributes[i].getData();
    i += 1;
  }
  if(k > 0) sb += "}\n";
  return(sb);
}

DPath.prototype.inRange = function(xx, yy)
{
let b = false;
let oc = this.selectBox.outcode(xx, de.correctY(yy));
if(oc == 0) b = true;
return(b);	
}

DPath.prototype.makeSelectBox = function()
{
  this.selectBox = new Rectangle2D();
  let bx = this.x ;
  let by = this.y ;
//  report("makeSelectBox DPath " + bx + " " + by );
  this.selectBox = this.selectBox.setRect(bx - 100 , de.correctY(by - 100) , 200, 200 );
  return(this.selectBox);
}

DPath.prototype.paint = function(ctx)
{
 this.dPaint(ctx); 
}

DPath.prototype.dPaint = function(ctx)
{
  let k = this.segments.length;
  let i = 0;
  if(! this.closed)
  {
  while(i < k)
  {
    this.segments[i].paint(ctx, de.getColor(this.colorindex), de.getInverseZoom());
    i += 1;
  }
  }
  else  
  {
    ctx.beginPath();
    let z = de.getInverseZoom();
    ctx.moveTo(this.x/z, de.correctY(this.y)/z);
    let color = de.getColor(this.colorindex);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = this.lineWidth;
    k -= 1;
    while(i < k)
    {
      let u = this.segments[i];
      ctx.lineTo(u.x2 /z, u.y2 / z);
      i += 1;
    }
    if(this.filltype == 0 ) ctx.stroke();
    else
    {
      ctx.closePath();
      ctx.fill();
    }
  }
  
  
  k = this.attributes.length;
  if(k > 0)
  {
    i = 0;
    ctx.save();
    ctx.translate(this.x/z , -(this.y)/z);   
    while(i < k)
    {
      this.attributes[i].paint(ctx);
      i += 1;
    }
    ctx.restore();
  }
  if(this.selectable == 1)
  {
  this.selectBox = this.makeSelectBox();
  if(sheet.getSelectedObject() == this)
  {
    this.selectBox.paint(ctx, de.getColor(BOUNDINGBOX_COLOR), de.getInverseZoom());
  }
  }
}

function closePath(o)
{
 if((o != null) && (o.klass == "DPath"))
 {
   o.closePath();
   this.closed = true;
   let ad = new AddDrawingObjectCommand(sheet, o);
   ad.execute();
   stack.add(ad);
   this.substate = 0;
   report("closedPath with " + o.segments.length + " segments");
 }
 sheet.setState(STATE_IDLE);
 repaint();
}

//DArc
function DArc(de, x, y, radius, startangle, sweepangle, colorindex, width,
				capstyle, dashstyle, dashlength, dashspace)
{
  this.klass = "DArc";
  this.attributes = [];
  // de = de;
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.startangle = startangle;
  this.sweepangle = sweepangle;
  this.colorindex = colorindex;
 // this.color = de.getColor(this.colorindex);
  this.width = width;
  this.capstyle = capstyle;
  this.dashstyle = dashstyle;
  this.dashlength = dashlength;
  this.dashspace = dashspace;
  this.filltype = 0;
  this.arc = new Arc2D();
  this.ang2 = Number(startangle) + Number(sweepangle);
  if(this.ang2 > 360) this.ang2 -= 360;
  this.arc.makeArc(this.x, de.correctY(this.y), radius, startangle /180 * Math.PI, this.ang2 /180 * Math.PI);
  this.selectBox = this.makeSelectBox();
  this.selectable = 1;
  
}

DArc.prototype.getDataJ = function()
{
  let o = {
      type: "DArc",
      x: this.x,
      y: this.y,
      radius: this.radius,
      startangle: this.startangle,
      sweepangle: this.sweepangle,
      colorindex: this.colorindex,
      width: this.width,
      capstyle: this.capstyle,
      dashstyle: this.dashstyle,
      dashlength: this.dashlength,
      dashspace: this.dashspace,
      filltype: this.filltype,
      fillwidth: this.fillwidth,
      angle1: this.angle1,
      pitch1: this.pitch1,
      angle2: this.angle2,
      pitch2: this.pitch2,
      selectable: this.selectable
  };
  return(o);
}

DArc.prototype.update = function()
{
  this.ang2 = Number(this.startangle) + Number(this.sweepangle);
  if(this.ang2 > 360) this.ang2 -= 360;
  this.arc.filltype = this.filltype;
  this.arc.makeArc(this.x, de.correctY(this.y), this.radius, this.startangle /180 * Math.PI, this.ang2 /180 * Math.PI);
  this.selectBox = this.makeSelectBox();
}

DArc.prototype.getX = function()
{
 return(this.x); 
}

DArc.prototype.getY = function()
{
 return(this.y); 
}
	
DArc.prototype.setX = function(x) 
{
  this.x = x;
  this.arc.makeArc(this.x, de.correctY(this.y), this.radius, this.startangle /180 * Math.PI, this.ang2 /180 * Math.PI);
}

DArc.prototype.setY = function (y) 
{
  this.y = y;
  this.arc.makeArc(this.x, de.correctY(this.y), this.radius, this.startangle /180 * Math.PI, this.ang2 /180 * Math.PI);
}


DArc.prototype.getData = function()
{
  let sb = "A " + R(this.x) + " " + R(this.y) + " " + R(this.radius)+ " " + R(this.startangle)
	 + " " + R(this.sweepangle) + " " + this.colorindex + " " + this.width + " " + this.capstyle 
	 + " " + this.dashstyle + " " + this.dashlength + " " + this.dashspace + "\n";

  let k = this.attributes.length;
  let i = 0;
  if(k > 0) sb += "{\n";
  while(i < k) // write out top level attributes
  {
    sb += this.attributes[i].getData();
    i += 1;
  }
  if(k > 0) sb += "}\n";
  return(sb);
}

DArc.prototype.inRange = function(xx, yy)
{
let b = false;
let oc = this.selectBox.outcode(xx, de.correctY(yy));
if(oc == 0) b = true;
return(b);	
}

DArc.prototype.makeSelectBox = function()
{
  this.selectBox = new Rectangle2D();
  this.selectBox = this.selectBox.setRect(this.x - this.radius , de.correctY(this.y - this.radius) , 2 * this.radius, 2 * this.radius );
  return(this.selectBox);
}

DArc.prototype.paint = function(ctx)
{
 this.dPaint(ctx); 
}

DArc.prototype.dPaint = function(ctx)
{
  this.arc.paint(ctx, de.getColor(this.colorindex), de.getInverseZoom());
  if(this.selectable == 1)
  {
  this.selectBox = this.makeSelectBox();
  if(sheet.getSelectedObject() == this)
  {
    this.selectBox.paint(ctx, de.getColor(BOUNDINGBOX_COLOR), de.getInverseZoom());
  }
  }
}

// Line2D

function Line2D(x1, y1, x2, y2)
{
 this.klass = "Line2D";
 this.x1 = x1;
 this.y1 = y1;
 this.x2 = x2,
 this.y2 = y2;
 this.lineWidth = 1;
 this.lineCap = "square";
}

Line2D.prototype.setLine = function(x1, y1, x2, y2)
{
 this.x1 = x1;
 this.y1 = y1;
 this.x2 = x2,
 this.y2 = y2;
 return(this);
}

Line2D.prototype.getX = function()
{
  return(this.x1);
}

Line2D.prototype.getY = function()
{
  return(this.y1);
}

Line2D.prototype.setX2 = function(x)
{
  this.x2 = x;
}

Line2D.prototype.setY2 = function(y)
{
  this.y2 = y;
}

Line2D.prototype.paint = function(ctx, color, z)
{
    z = de.getInverseZoom();
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = this.lineWidth;  // /z??
    ctx.lineCap = this.lineCap;
    ctx.beginPath();
    ctx.moveTo(this.x1 / z, this.y1 / z);
    ctx.lineTo(this.x2 / z, this.y2 / z);
//    ctx.closePath();
    ctx.stroke();
    ctx.restore();
}


// Rectangle2D
function Rectangle2D()
{
  this.klass = "Rectangle2D";
  this.x = 0;
  this.y = 0;
  this.width = 0;
  this.height = 0;
  this.filltype = 0;
}

Rectangle2D.prototype.outcode = function(x, y)
{
 let z = -1;
 if((x >= this.x) && (x <= this.x + this.width)) 
 {
   if((y >= this.y - this.height) && (y <= this.y ))
   {
     z = 0;
   }
 }
 return(z);
}

Rectangle2D.prototype.setRect = function(x, y, width, height)
{
 this.x = x;
 this.y = y;
 this.width = width;
 this.height = height;
 return(this);
}

Rectangle2D.prototype.paint = function(ctx, color, z)
{
    z = de.getInverseZoom();
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = color;
//    alert(this.x / z + " " + (this.y - this.height) / z + " " + this.width / z + " " + this.height / z);
    ctx.rect(this.x / z, (this.y - this.height) / z, this.width / z, this.height / z);
    ctx.closePath();
    if(this.filltype == 1)
    {
      ctx.fillStyle = color;
      ctx.fill();
    }
    else ctx.stroke();
    ctx.restore();
}

// Arc2D
function Arc2D()
{
  this.klass = "Arc2D";
  this.x = 0;
  this.y = 0;
  this.radius = 0;
  this.startangle = 0;
  this.endangle = 2 *Math.PI;
  this.filltype = 0;
}

Arc2D.prototype.makeArc = function(x, y, radius, startangle, endangle)
{
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.startangle = startangle;
  this.endangle = endangle;
}

Arc2D.prototype.outcode = function(x, y)
{
 let z = -1;
 if((x >= this.x - this.radius) && (x <= this.x + this.radius)) 
 {
   if((y >= this.y - this.radius) && (y <= this.y + this.radius))
   {
     z = 0;
   }
 }
 return(z);
}

Arc2D.prototype.paint = function(ctx, color, z)
{
    z = de.getInverseZoom();
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = color;
    let a = 2 * Math.PI -this.startangle;
//    if(this.startangle == 0) a = 0;
    let b = 2* Math.PI -this.endangle;
//    if(this.endangle == 0) b = 0
    ctx.arc(this.x / z, this.y / z, this.radius / z, a, b, true);
//    ctx.closePath();
    if(this.filltype == 1)
    {
      ctx.fillStyle = color;
      ctx.fill();
    }
    else ctx.stroke();
    ctx.restore();
}


//DPin
function DPin(de, x1, y1, x2, y2, colorindex, pintype, whichend, textsize)
{
  this.klass = "DPin";
  // de = de;
  this.x1 = Number(x1);
  this.y1 = Number(y1);
  this.x2 = Number(x2);
  this.y2 = Number(y2);
  this.colorindex = Number(colorindex);
//  this.color = de.getColor(this.colorindex);
  this.pintype = Number(pintype);
  this.whichend = Number(whichend);
  this.textsize = Number(textsize);
  this.line = new Line2D();
  this.circle = new Arc2D();
  if((this.pintype == 1) || (this.pintype == "bus"))this.circle.filltype = 1;
  this.attributes = [];
  this.attributes[this.attributes.length] = createAttribute(de, x1, y1, ATTRIBUTE_COLOR, textsize, VISIBILITY_INVISIBLE, SHOW_VALUE, 0, 0, "pinnumber", "0");
  this.attributes[this.attributes.length] = createAttribute(de, x1, y1, ATTRIBUTE_COLOR, textsize, VISIBILITY_VISIBLE, SHOW_VALUE, 0, 0, "pinlabel", "");
  if((this.pintype == 1) || (this.pintype == "bus"))
  {
    this.circle.filltype = 1;
    this.attributes[this.attributes.length] = createAttribute(de, x1, y1, ATTRIBUTE_COLOR, textsize, VISIBILITY_INVISIBLE, SHOW_VALUE, 0, 0, "pintype", "bus");
  }
  else this.attributes[this.attributes.length] = createAttribute(de, x1, y1, ATTRIBUTE_COLOR, textsize, VISIBILITY_INVISIBLE, SHOW_VALUE, 0, 0, "pintype", "in");
  this.attributes[this.attributes.length] = createAttribute(de, x1, y1, ATTRIBUTE_COLOR, textsize, VISIBILITY_INVISIBLE, SHOW_VALUE, 0, 0, "pinseq", "");
  de.setLine(this.line, x1, y1, x2, y2);
  this.xw = 0;
  this.yw = 0;
  this.setWhichEnd(whichend);
  this.radius = 40;
  this.circle.makeArc(this.xw, de.correctY(this.yw), this.radius, 0, 2 * Math.PI);
  this.selectBox = this.makeSelectBox();
  this.selectable = 1;
  this.margin = 80;
  this.connectedSignal = null;
  this.membernames = [];
  this.parent = null;
  this.offsetX = 0;
  this.offsetY = 0;
  this.angle = 0;
  this.visible = 1;
  this.netpin = false;
  this.pinoffset = 0;
  this.labeloffset = 250;
//  de.setFrame(circle, xw, yw, 40);
}

DPin.prototype.getDataJ = function()
{
  let o = {
      type: "DPin",
      x1: this.x1,
      y1: this.y1,
      x2: this.x2,
      y2: this.y2,
      colorindex: this.colorindex,
      pintype: this.pintype,
      whichend: this.whichend,
      textsize: this.textsize,
      angle: this.angle,
      visible: this.visible,
      connectedSignal: this.connectedSignal,
      attributes: this.attributes
      
      
  };
  return(o);
}

DPin.prototype.setAngle = function(a)
{
  let oldx2 = this.x2;
  let oldy2 = this.y2;
  switch(a)
  {
    case 90: 
      this.y2 = this.y1 - (this.x2 - this.x1);
      this.x2 = this.x1 - (oldy2 - this.y1);
    this.angle = 0;
    break;
    case 270:
      this.y2 = this.y1 + (this.x2 - this.x1);
      this.x2 = this.x1 + (oldy2 - this.y1);
     break;
    case 180:
      this.x2 = this.x1 - (oldx2 - this.x1);
  }
}

DPin.prototype.getAngle = function()
{
  return(this.angle);
}

DPin.prototype.getConnectedSignal = function()
{
  return(this.connectedSignal);
}

DPin.prototype.setConnectedSignal = function(signame)
{
  this.connectedSignal = signame;
}

DPin.prototype.setPinoffset = function(n)
{
  this.pinoffset = n;
}

DPin.prototype.getPinoffset = function()
{
  return(this.pinoffset);
}

DPin.prototype.getPinnumber = function()
{
  return(getAttributeValue("pinnumber", this));
}


DPin.prototype.update = function()
{
   this.setWhichEnd(this.whichend);
   de.setLine(this.line, this.x1, this.y1, this.x2, this.y2);
   if((this.pintype == 1) || (this.pintype == "bus"))
   {
     this.circle.filltype = 1;
     setAttributeValue("pintype", this, "bus");
   }
   let x = getAttributeValue("pintype", this);
   if(x == "bus") this.circle.filltype = 1;
   this.circle.makeArc(this.xw, de.correctY(this.yw), this.radius, 0, 2 * Math.PI);
   this.selectBox = this.makeSelectBox();
}

DPin.prototype.addAttribute = function(a)
{
  let tt = getAttributeIndex(a.name, this);
  if(tt == -1) this.attributes[this.attributes.length] = a;
  else 
  {
    this.attributes.splice(tt,1);
    this.attributes.splice(tt, 0, a);
  }
}

DPin.prototype.getX = function()
{
 return(this.x1); 
}

DPin.prototype.getY = function()
{
 return(this.y1); 
}
	
DPin.prototype.setX = function(x) 
{
  let d = x - this.x1;
  this.x1 = x;
  this.x2 = this.x2 + d;
}

DPin.prototype.setY = function (y) 
{
  let d = y - this.y1;
  this.y1 = y;
  this.y2 = this.y2 + d;
}

DPin.prototype.getX2 = function()
{
 return(this.x2);
}

DPin.prototype.getY2 = function()
{
 return(this.y2);
}

DPin.prototype.getData = function() 
{
let sb = "";
sb = "P " + R(this.x1) + " " + R(this.y1) + " " + R(this.x2)  + " " + R(this.y2) 
    + " " + this.colorindex + " " + this.pintype + " " + this.whichend  + "\n";

// attributes
if(this.attributes.length != 0)
{
  sb += "{\n";
  let k = this.attributes.length;
  let i = 0;
  while(i < k)
  {
    sb += this.attributes[i].getData();
    i += 1;
  }
  sb += "}\n";
}
return sb;
}

DPin.prototype.fixPinlabel = function()
{
  let a = getAttribute("pinlabel", this);
  if(this.x1 < this.x2)  
  {
    let xx = a.getX() + this.labeloffset; 
    a.setX(xx);
  }
  else if(this.x1 > this.x2)
  {
      report("3587 " + a.getTextWidth() + " " + getAttributeValue("pinlabel", this)); 
    let xx = a.getX() - this.labeloffset - a.getTextWidth() * a.size; 
    a.setX(xx);
  }
  else if(this.y1 > this.y2)
  {
    let yy = a.getY() - this.labeloffset;
    a.setY(yy);
  }
  else if(this.y1 < this.y2)
  {
    let yy = a.getY() + this.labeloffset;
    a.setY(yy);
  }
}

DPin.prototype.updateAttributeLocations = function()
{
  let k = this.attributes.length;
  let i = 0;
  let x = this.x1;
  let y = this.y1;
  let numoffset = 50;
  let labeloffset = 250;
  if(this.whichend == 1)
  {
    numoffset = 50;
    labeloffset = -250;
  }
  while(i < k)
  {
    let d = this.attributes[i];
    if(d.name == "pinnumber")
    {
      d.setX(x + d.getX() + numoffset);			
    }
    if(d.name == "pinlabel")
    {
      if(this.whichend == 1) labeloffset -= d.getTextWidth();
      d.setX(x + d.getX() + labeloffset);			
    }
    d.setY(y + d.getY());
    i += 1;
  }
}

DPin.prototype.setWhichEnd = function(whichend) 
{
this.whichend = whichend;
if(whichend == 0)
{
  this.xw = this.x1;
  this.yw = this.y1;
}
else
{
  this.xw = this.x2;
  this.yw = this.y2;
}
}

DPin.prototype.addDrawingObject = function(a)
{
  report("DPin addDrawingObject not supported, corrupted file error " + a.klass);
}

DPin.prototype.inRange = function(xx, yy)
{
let b = false;
let oc = this.selectBox.outcode(xx, de.correctY(yy));
if(oc == 0) b = true;
//report("DPin " + xx + " " + de.correctY(yy) + " " + this.selectBox.x + " " +  this.selectBox.y + " " + this.selectBox.width + " " +  this.selectBox.height + " "+ b);

return(b);	
}

DPin.prototype.makeSelectBox = function()
{
  this.selectBox = new Rectangle2D();
  if(this.y1 == this.y2) // horizontal pins
  {
//    this.selectBox = this.selectBox.setRect(this.xw - 100  , de.correctY(this.yw - this.margin) , 200, 2 * this.margin );
    this.selectBox = this.selectBox.setRect(this.xw - gridsize + 10  , de.correctY(this.yw - gridsize/2) , 2 * gridsize -20, gridsize);
//    this.selectBox = this.selectBox.setRect(this.xw - gridsize + 10  , de.correctY(this.yw - gridsize/2) , 2 * gridsize - 20, gridsize - 20);
 }
  else
  {
    let ty = Number(this.y2)  - this.y1;
    if(ty < 0 ) ty = -ty;
//    ty = Number(ty) + 100;
    ty = Number(ty) + 50;
//    ty = Number(ty) + gridsize;
    this.selectBox = this.selectBox.setRect(this.xw - this.margin , de.correctY(this.yw - this.margin) , 2 * this.margin,  ty  );
  }
    
 return(this.selectBox);
}

DPin.prototype.paint = function(ctx)
{
 this.dPaint(ctx); 
}

DPin.prototype.dPaint = function(ctx)
{
  if(this.visible == 1)
  {
  this.update();
  this.line.paint(ctx, de.getColor(this.colorindex), de.getInverseZoom());
  if(SHOW_PINS) this.circle.paint(ctx, "red", de.getInverseZoom());
  let k = this.attributes.length;
  let i = 0;
  while(i < k)
  {
    this.attributes[i].paint(ctx);
    i += 1;
  }
  if(this.selectable == 1)
  {
  this.selectBox = this.makeSelectBox();
  if(sheet.getSelectedObject() == this)
  {
//    this.selectBox.paint(ctx, de.getColor(BOUNDINGBOX_COLOR), de.getInverseZoom());
    this.selectBox.paint(ctx, de.getColor(SELECT_COLOR), de.getInverseZoom());
  }
  }
  }
}


function createAttribute(de, x, y, colorindex, size, visibility, show_name_value,
			angle, alignment, name, value)
{
  let linesx = [];
  linesx[0] = name + "=" + value;
  let textz =  new DText(de, x, y, colorindex, size, visibility, show_name_value, angle, alignment, 1, linesx);
  textz.name = name;
  textz.value = value;
  return(textz);
}

function getAttribute(name, obj)
{
  let b = true;
  let i = 0;
  let a = null;
  if(!(obj === undefined) && (obj != null) && !(obj.klass === undefined))
  {
//  if(obj.attributes === undefined) report("attribtes undefined for " + obj + " " + obj.klass + " " + name);
  let k = obj.attributes.length;
  while( b && i < k)
  {
    if(obj.attributes[i].name == name)
    {
      b = false;
      a = obj.attributes[i];
    }
    i += 1;
  }
  }
  return(a);
}

function getAttributeIndex(name, obj)
{
  let b = true;
  let z = -1;
  let k = obj.attributes.length;
  let i = 0;
  let a = null;
  while( b && i < k)
  {
    if(obj.attributes[i].name == name)
    {
      b = false;
      z = i;
    }
    i += 1;
  }
  return(z);
}

function getAttributeValue(name, obj)
{
  let av = null;
  if((typeof obj !== 'undefined') && (obj != null) && (typeof obj.attributes !== 'undefined'))
  {
    let a = getAttribute(name, obj);
    if(a != null) 
    {
      av = a.value;
      if(document.getElementById("uav").checked) av = av.toUpperCase();
    }
  }
  return(av);
}

function setAttributeValue(name, obj, value)
{
  let a = null;
  let v = value;
  if(document.getElementById("uav").checked) v = value.toUpperCase();
  if(obj != null)
  {
    a = getAttribute(name, obj);
    if(a != null)
    {
      a.value = v;
      a.lines[0] = name + "=" + v;
    }
    else
    {
      a = createAttribute(de, 0, 0, ATTRIBUTE_COLOR, 10, VISIBILITY_INVISIBLE, 1, 0, 0, name, v);
      if(a == null) report("setAttributeValue a is null");
      if(obj.attributes === undefined) console.trace();
      obj.attributes[obj.attributes.length] = a;
    }
  }
  else 
  {
      console.trace();
      report("setAttributeValue obj is null for " + name + ":" + v);
  }
  return(a);
}

function updateAttribute(att, value)
{
  let v = value;
  if(document.getElementById("uav").checked) v = value.toUpperCase();
  att.value = v;
  att.lines[0] = att.name + "=" + v;
  
}


// DComponent
function DComponent(de, x, y, selectable, angle, mirror, filename)
{
  this.klass = "DComponent";
  // de = de;
  this.x = Number(x);
  this.y = Number(y);
  this.selectable = Number(selectable);
  this.angle = 0;
  this.theta = 0;
  this.mirror = Number(mirror);
  this.filename = filename;
  this.basename = filename;
  this.doj = [];
  this.vpins = [];
  this.pins = [];
  this.attributes = [];
  this.selectBox = new Rectangle2D();
  this.selectBox.setRect(0  , de.correctY(0) , 100, 100);
  this.togglepinnumber = true;
  let a = createAttribute(de, x, y, ATTRIBUTE_COLOR, 10, VISIBILITY_INVISIBLE, SHOW_VALUE, 0, 1, "device", "");
  a.parent = this;
  this.attributes.push(a);
//  this.attributes[this.attributes.length] = createAttribute(de, x, y, ATTRIBUTE_COLOR, 10, VISIBILITY_INVISIBLE, SHOW_VALUE, 0, 1, "device", "");
  a = createAttribute(de, x, y, ATTRIBUTE_COLOR, 10, VISIBILITY_VISIBLE, SHOW_VALUE, 0, 1, "refdes", "");
  a.parent = this;
  this.attributes.push(a);
//  this.attributes[this.attributes.length] = createAttribute(de, x, y, ATTRIBUTE_COLOR, 10, VISIBILITY_VISIBLE, SHOW_VALUE, 0, 1, "refdes", "");
  this.boxoffset = 0;
  this.setAngle(angle);
}

DComponent.prototype.getDataJ = function()
{
  let o = {
      type: "DComponent",
      x: this.x,
      y: this.y,
      selectable: this.selectable,
      angle: this.angle,
      mirror: this.mirror,
      filename: this.filename,
      attributes: [],
      pins: this.pins,
      dojs: []
  };
  
  this.vpins.forEach( (pin) => {
      o.pins.push(pin.getDataJ());
      });
  
  this.doj.forEach( (oj) => {
      if(oj.klass == "DPin") 
      {
          let pnt = oj.parent;
          oj.parent = null;
          o.pins.push(oj.getDataJ());
          oj.parent = pnt;
      }
      else
      {
        try{
//            report("4083 " + oj.klass);
          o.dojs.push(oj.getDataJ());  
        }
        catch(e) {
            report("3934 " + oj.klass + " " + e);
        }
      }
      });
  this.attributes.forEach( (att) => {
      let pnt = att.parent;
      att.parent = null;
      o.attributes.push(att.getDataJ());
      att.parent = pnt;
  });
  return(o);
}

//TODO
DComponent.prototype.loadx = function()
{
if(filename.indexOf(".sym") != -1)
{
  report("DComponent parsing .sym: " + filename);
  let bname = filename;
  if(filename.indexOf("http") == -1) 
  {
    if(bname.indexOf("file:") == 0) bname = bname.substring(5);
    let f = new File(bname);
    if(!f.exists())
    {
      bname = de.findSymbol(bname);
    }
  }
  let fp = new FileParser(bname, de);
}
 
}

DComponent.prototype.netAttributeExists = function(a)
{
  let avalue = a.value.substring(a.value.indexOf(":")).trim();
//  report("see if net " + a.value + " " + avalue + " exists");
  let b = true;
  let i = 0;
  let k = this.attributes.length;
  while(b && (i < k))
  {
    let ae = this.attributes[i];
//    report("-- " + ae.name + " " + ae.value);
    if(ae.name == "net")
    {
//      report("net recognized");
      let j = ae.value.indexOf(":");
      if(j != -1)
      {
	let y = ae.value.substring(j).trim();
	let x = y.localeCompare(avalue);
//	report("   3327:: -" + y + "-" + avalue + "- x = " + x + " " + y.length + " " + avalue.length);
	if(x == 0) 
	{
	  b = false;
	}
//	report(!b);
      }
    }
    i += 1;
  }
  return(!b)
}

DComponent.prototype.updateNetAttribute = function(a)
{
  let b = true;
  let i = a.value.indexOf(":");
  let aname = a.value.substring(0, i);
  let avalue = a.value.substring(i + 1);
  i = 0;
  let k = this.attributes.length;
  while(b && (i < k))
  {
    let ae = this.attributes[i];
//    report("-- " + ae.name + " " + ae.value);
    if(ae.name == "net")
    {
      let j = ae.value.indexOf(":");
      let aename = ae.value.substring(0, j);
      let aevalue = ae.value.substring(j+1);
      if(aevalue == avalue)
      {
	ae.value = a.value;
	b = false;
      }
    }
    i += 1;
  }
}

DComponent.prototype.update = function()
{
  let n = null;
  let k = this.attributes.length;
  let i = 0;
  while(i < k)
  {
    if(this.attributes[i].name == "net")
    {
      n = this.attributes[i].value;
      if(n != null)
      {
	let parray = [];
	if(n.indexOf(",") != -1)
	{
	  parray = n.split(",");
	}
	else
	{
	  parray[0] = n;
	}
	let kk = parray.length;
	let ii = 0;
	while(ii < kk)
	{
	  let pn = parray[ii].substring(n.indexOf(":") + 1);
	  let p = this.getPinByNumber(pn);
	  if(p == null)
	  {
	    p = new DPin(de, 0, 0, 0, 0, PIN_COLOR, 0, 0, 8);
	    p.visible = 0;
	    p.netpin = true;
	    setAttributeValue("pinnumber", p, pn);
	    let nn = n.substring(0, parray[ii].indexOf(":"));
	    setAttributeValue("pinlabel", p, nn);
	    p.connectedSignal = nn;
	    p.parent = this
	    this.vpins[this.vpins.length] = p;
	    let nnn = ste.schematic.getNet(nn);
	    if(nnn == null) ste.schematic.addNet(new Net(nn));
	    report("DComponent update net1 " + nn + " " + pn);
	  }
	  else
	  {
	    let nn = parray[ii].substring(0, parray[ii].indexOf(":"));
	    if(nn != "OPEN")
	    {
	      p.connectedSignal = nn;
	      p.netpin = true;
	      if(this.filename.indexOf("_offsheet") != -1) setAttributeValue("pinlabel", p, nn);
//	      report("DComponent update net2 " + nn );
	    }
	  }
	  ii += 1;
	}
      }
    }
    i += 1;
  }
  n = getAttributeValue("slot", this);
  if(n != null)
  {
    k = this.attributes.length;
    i = 0;
    let b = false;
    let s = n + ":";
    while((i < k) && !b)
    {
     if(this.attributes[i].name == "slotdef")
     {
      let v = this.attributes[i].value;
      if(v.indexOf(s) == 0)
      {
	let z = v.substring(v.indexOf(":") + 1);
	b = true;
	let parray = z.split(",");
	let kk = parray.length;
	let ii = 0;
	while(ii < kk)
	{
	  let pin = this.getPinBySeq(ii + 1);
	  if(pin == null)
	  {
	    report("DComponent update slotdef pin null for pinseq "+ (ii+1) + " on " + getAttributeValue("refdes", this));
	  }
	  else setAttributeValue("pinnumber", pin, parray[ii]);
	  ii += 1;
	}
      }
     }
     i += 1;
    }
  }
  let device = getAttributeValue("device", this);
  if((device == "VHDL_INPUT_PORT")|| (device == "VHDL_INOUT_PORT") || (device == "VHDL_OUTPUT_PORT"))
  {
    let pins = this.getPins();
    k = pins.length;
    i = 0;
    while(i < k)
    {
      let p = pins[i];
      let pl = getAttributeValue("pinlabel", p);
      let cs = p.connectedSignal;
      if(((pl == null) || (pl == "")) && (cs != null) && (cs != ""))
      {
	setAttributeValue("pinlabel", p, cs); //setAttributeValue(name, obj, value)
      }
      i += 1;
    }
  }
}

DComponent.prototype.getPinBySeq = function(n)
{
  let pins = this.getPins();
  let b = true;
  let k = pins.length;
  let i = 0;
  let p = null;
  while((i < k) && b)
  {
   let seq = getAttributeValue("pinseq", pins[i]);
   if(seq == n)
   {
    b = false; 
    p = pins[i];
   }
   i += 1;
  }
  return(p);
}

DComponent.prototype.getX = function()
{
 return(this.x); 
}

DComponent.prototype.getY = function()
{
 return(this.y); 
}
	
DComponent.prototype.setX = function(x) 
{
  this.x = x;
}

DComponent.prototype.setY = function (y) 
{
  this.y = y;
}

DComponent.prototype.setAngle = function (a) 
{
  this.angle = a;
  while (this.angle >= 360) this.angle -= 360; 
  this.theta = Math.PI * this.angle / 180;
}

DComponent.prototype.addDrawingObject = function(o)
{
  let addItem = true;
  if(o.klass == "DPin")
  {
      let pn = getAttributeValue("pinnumber", o);
      if(pn != null)
      {
	let p = this.getPinByNumber(pn);
	if(p != null)
	{
	  let seq = getAttributeValue("pinseq", o);
	  if(seq != null) // o is the real pin
	  {
	      let cs = p.connectedSignal;
	      if(cs != null) 
	      {
		o.connectedSignal = cs;
		if(!removeItemFromArray(p, this.doj)) removeItemFromArray(p, this.vpins);
	      }
	  }
	  else // p is the real pin 
	  {
	      let cs = o.connectedSignal;
	      if(cs != null) 
	      {
		p.connectedSignal = cs;
		addItem = false;
	      }
	  }
	  
//	  console.trace();
//	 alert("Pin " + pn + " already exists on " + o.klass + " " + getAttributeValue("refdes", this) + ":" + getAttributeValue("device", this)); 
	}
      }
  }
  
  if(addItem)
  {
  if(o.klass == "DPin")o.parent = this;
//  this.doj[this.doj.length] = o;
  else if(o.klass == "DPath")
  {
    o.parent = this;
    o.selectable = 0;
  }
  else
  {
  let r = o.selectBox;
  if(r === undefined) ;
  else if(r.width > this.selectBox.width)
  {
    this.selectBox.width = r.width;
  }
  if(r === undefined) ;
  else if(r.height > this.selectBox.height)
  {
    this.selectBox.height = r.height;
  }
  }
  this.doj[this.doj.length] = o;
  }
}

DComponent.prototype.addDrawingObjects = function(darray)
{
  let k = darray.length;
  let i = 0;
  while(i < k)
  {
   this.addDrawingObject(darray[i]);
   i += 1;   
  }
}

DComponent.prototype.addAttribute = function(a)
{
//      report("3907 net " + a.name + " " + a.value + " " + this.netAttributeExists(a));
  let tt = getAttributeIndex(a.name, this);
  if(tt == -1) this.attributes[this.attributes.length] = a;
  else 
  {
    if(a.name == "net")
    {
      report("3913 net " + a.name + " " + a.value + " " + this.netAttributeExists(a));
      if(!this.netAttributeExists(a)) this.attributes[this.attributes.length] = a;
      else
      {
	this.updateNetAttribute(a);
      }
    } 
    else if(a.name == "slotdef")
    {
      this.addSlotdefAttribute(a);
    } 
    else
    {
      this.attributes.splice(tt,1);
      this.attributes.splice(tt, 0, a);
    }
  }
}

DComponent.prototype.addAttributePermissive = function(a)
{
  let tt = getAttributeIndex(a.name, this);
  if(tt == -1) this.attributes[this.attributes.length] = a;
  else 
  {
    if(a.name == "net")
    {
//      report("3593 net " + a.name + " " + a.value + " " + this.netAttributeExists(a));
      if(!this.netAttributeExists(a)) this.attributes[this.attributes.length] = a;
    } 
    else if(a.name == "slotdef")
    {
	this.addSlotdefAttribute(a);
//      this.attributes[this.attributes.length] = a;
    } 
   else
    {
      if((this.attributes[tt].value == null) || (this.attributes[tt].value == "") || (this.attributes[tt].value.length == 0)) 
      {
	this.attributes.splice(tt,1);
	this.attributes.splice(tt, 0, a);
      }
    }
  }
}

DComponent.prototype.addSlotdefAttribute = function(a)
{
  let k = this.attributes.length;
  let g = a.value.substring(0, a.value.indexOf(":"));
  let i = 0;
  let b = true;
  while(b && (i < k))
  {
    let x = this.attributes[i];
    if(x.name == "slotdef")
    {
      let j = x.value.substring(0, x.value.indexOf(":"));
      if(j == g) b = false;
    }
    i += 1;
  }
  if(b) this.attributes[this.attributes.length] = a;
}

DComponent.prototype.addAttributes = function(darray)
{
  let k = darray.length;
  let i = 0;
  while(i < k)
  {
    this.addAttributePermissive(darray[i]);
    i += 1;
  }
}

DComponent.prototype.addAttributesPermissive = function(darray)
{
  let k = darray.length;
  let i = 0;
  while(i < k)
  {
    this.addAttributePermissive(darray[i]);
    i += 1;
  }
}

DComponent.prototype.getPins = function()
{
  let k = this.doj.length;
  let i = 0;
  let pins = [];
  for(i = 0; i < k; i++)
  {
   let p = this.doj[i];
   if(p.klass == "DPin") pins[pins.length] = p;
  }
  if(this.vpins.length >0) addAll(this.vpins, pins);
  return(pins);
}

DComponent.prototype.getPinByNumber = function(n)
{
 let pins = this.getPins();
 if(this.vpins.length > 0) addAll(this.vpins, pins);
 let k = pins.length;
 let i = 0;
 let b = true;
 let p = null;
 while(b && (i < k))
 {
   let px = pins[i];
   if(n == getAttributeValue("pinnumber", px))
   {
     p = px;
     b = false;
   }
   i += 1;
 }
 return(p);
}

DComponent.prototype.getPinByName = function(nm)
{
 let pins = this.getPins();
 if(this.vpins.length > 0) addAll(this.vpins, pins);
 let k = pins.length;
 let i = 0;
 let b = true;
 let p = null;
 while(b && (i < k))
 {
   let px = pins[i];
   if(nm == getAttributeValue("pinlabel", px))
   {
     p = px;
     b = false;
   }
   i += 1;
 }
 return(p);
}

DComponent.prototype.makeSelectBox = function()
{
  this.selectBox = new Rectangle2D();
  this.selectBox.setRect(this.boxoffset  , de.correctY(0) , 100, 100);
//  this.selectBox.setRect(this.x  , this.y , 100, 100);
  let k = this.doj.length;
  let i = 0;
  let boxmaxwidth = 0;
  let boxmaxheight = 0;
  let boxx = 0;
  let boxy = 0
  let boxx2 = 10030;
  let boxy2 = 0

  while(i < k)
  {
    let o = this.doj[i];
    let r = o.selectBox;
    if((o.klass == "DPin") && (o.parent == null))
    {
     if(this.boxoffset < 0) this.boxoffset = - this.boxoffset;
    }
    

    else if((o.klass == "DPin") && (o.parent != null))
    {
     if(o.whichend == 0) 
     {
//       this.boxoffset = o.x2 - o.x1;
       if((o.x1 < o.x2)&& (o.y1 == o.y2)) // left side margin
       {
	if(o.x2 >  boxx) boxx = o.x2;
       }
       else if((o.x1 == o.x2)&& (o.y1 < o.y2)) // bottom margin
       {
	if(o.y2 >  boxy) boxy = o.y2;
       }
     }
     else
     {
      if((o.x1 < o.x2) && (o.y1 == o.y2))  // right side
      {
	if(o.x1 < boxx2) boxx2 = o.x1;
      }
      else if((o.x1 == o.x2)&& (o.y1 < o.y2)) // top margin
      {
	if(o.y1 >  boxy2) boxy2 = o.y1;
      }
      else if((o.x1 == o.x2)&& (o.y1 > o.y2)) // bottom margin
       {
	if(o.y1 >  boxy) boxy = o.y1;
       }
    }
//     if(this.boxoffset < 0) this.boxoffset = - this.boxoffset;
    }

    
    let rw = Number(r.width);
//    if(rw > 2000) rw = 2000;
    if(rw > this.selectBox.width)
    {
      this.selectBox.width = rw;
    }
    let rh = Number(r.height);
//    if(rh > 2000) rh = 2000;
    if(rh > this.selectBox.height)
    {
      this.selectBox.height = rh;
    }

    if((Number(r.x1) + rw) > (Number(this.x) + Number(this.selectBox.width)))
    {
      this.selectBox.width = Number(r.x1) + rw;
    }
//    if(boxx2 == 10030) boxx2 = Number(boxx) + 200;
    let w = boxx2 - boxx;
    if((w > 200) && (w < this.selectBox.width)) this.selectBox.width = w;
    let h = boxy2 - boxy;
    if((h > 50) && (h < this.selectBox.height)) this.selectBox.height = h;

    if(this.selectBox.width > 1000) this.selectBox.width = 1000;
    if(this.selectBox.height > 1000) this.selectBox.height = 1000;
  i += 1;
  }
//  report("old " + this.selectBox.x + " " + this.selectBox.y + " " + this.selectBox.width + " " + this.selectBox.height+ "\n");
//  report("new " + boxx + " " + boxy + " " + (boxx2-boxx) + " " + (boxy2-boxy)+ "\n");
  if(boxx > this.selectBox.x) this.selectBox.x = Number(boxx) + 50;
  if(de.correctY(this.selectBox.y) < boxy)
  {
    if(boxy > 200) boxy = 200; // a fudge for transistors
    this.selectBox.y = de.correctY(boxy);
  }
//  report(boxx2 + " " + boxx);
  if(boxx2 == 10030) boxx2 = boxx + 200;
  else this.selectBox.width = boxx2 - boxx - 150;
  if(this.selectBox.width < 225) this.selectBox.width = 225;

}

DComponent.prototype.paint = function(ctx)
{
  let k = this.doj.length;
  let i = 0;
  let pins = [];
  let z = de.getInverseZoom();
  ctx.save();
  if(this.angle != 0)
  {
    let xx = this.x;
    let yy = this.y;
    ctx.translate(0, de.MAX_Y/z);
    ctx.rotate(this.theta);
    if(this.angle == 90) ctx.translate(-yy/z, (-de.MAX_Y - xx)/z);
    else if(this.angle == 180) ctx.translate(( -xx/z), (-de.MAX_Y +this.y)/z);
    else if(this.angle == 270) ctx.translate(yy/z, (-de.MAX_Y+ xx)/z);
    this.x = xx;
    this.y = yy;
  }
  else
  {
   ctx.translate(this.x/z , -(this.y)/z);   
  }
  if(this.mirror == 1)
  {
    ctx.save();
    ctx.scale(-1, 1);
  }

  while(i < k)
  {
   this.doj[i].paint(ctx);
   i += 1;
  }
  if(this.selectable == 1)
  {
    this.makeSelectBox();
    if(SHOW_SELECT_BOXES || (sheet.getSelectedObject() == this))
    {
      this.selectBox.paint(ctx, de.getColor(BOUNDINGBOX_COLOR), de.getInverseZoom());
    }
  }
  if(this.mirror == 1) ctx.restore();
  i = 0;
  ctx.restore();
  ctx.save();
  ctx.translate(this.x/z , -(this.y)/z);   
  k = this.attributes.length;
  while(i < k)
  {
 //   report("DC paint name = " +this.attributes[i].x + " " + this.attributes[i].y + " " + this.attributes[i].visibility + " " + this.attributes[i].name + ", value = " + this.attributes[i].value + ", lines[0] = " + this.attributes[i].lines[0]);
   this.attributes[i].paint(ctx);
   i += 1;
  }
  ctx.restore();
}

  
DComponent.prototype.inRange = function(xx, yy)
{
let b = false;
if(this.selectable == 1)
{
  let p1 = new PointI(xx, yy);
  let p2 = this.unmorph(p1);
  let xxx = p2.x;
  let yyy = p2.y;
  let r = this.selectBox;
  let c = getAttribute("device",this);
//  if(c == "gnand2") report()
  if((xxx >= this.x + r.x) && (xxx <= (this.x + r.x + r.width)))
  {
   let ty = de.correctY(r.y);
   if((yyy >= this.y + ty) && (yyy <= (this.y + ty + r.height)))
    {
      b = true;
    }
  }
}
return(b);	
}


/**
 * Morph is used by component's DrawingObject to determine how a point is translated
 * with respect to the component's origin. Morph uses the Mouse's drawing axis.
 * @param orig - a point relative to the component's origin
 * @return a translated point with respect to the component's origin
 */

DComponent.prototype.morph2 = function(orig)
{
let p = orig;
let x0 = orig.x;
let y0 = orig.y;
let xn = x0;
let yn = y0;
let h = true;
switch(Number(this.angle))
{
case 0:
  if(this.mirror == 1) xn = -x0;
//  report("morph2 xn = " + xn);
  break;
case 90:
  xn = y0;
  yn = -x0;
  if(this.mirror == 1) 
  {
    xn = xn;
    yn = -yn;
  }
  h = false;
  break;
case 180:
  xn = -x0;
  yn = -y0;
  if(this.mirror == 1) xn = -xn;
  break;
case 270:
  xn = -y0;
  yn = x0;
  if(this.mirror == 1) 
  {
    xn = xn;
    yn = -yn;
  }
  h = false;
  break;
default:
  break;
}
//report("morph2 xn = " + xn + ", yn = " + yn);
p = new PointI(xn, yn);
// report("DComponent morph x0 = " + x0 + " y0 = " + y0 + " xn = " + xn + " yn = " + yn);
return(p);
}

DComponent.prototype.unmorph = function(orig)
{
let p = orig;
let x0 = orig.x - this.x;
let y0 = orig.y - this.y;
let xn = x0;
let yn = y0;
let h = true;
switch(Number(this.angle))
{
case 0:
  if(this.mirror == 1) xn = -xn;
  p = new PointI(this.x + xn, this.y + yn);
  break;
case 270:
  xn = y0;
  yn = -x0;
  if(this.mirror == 1) 
  {
    xn = -xn;
    yn = yn;
  }
  p = new PointI(this.x + xn, this.y + yn);
  h = false;
  break;
case 180:
  xn = -x0;
  yn = -y0;
  if(this.mirror == 1) xn = -xn;
  p = new PointI(this.x + xn, this.y + yn);
  break;
case 90:
  xn = -y0;
  yn = x0;
  if(this.mirror == 1) 
  {
    xn = -xn;
    yn = yn;
  }
  p = new PointI(this.x + xn, this.y + yn);
  h = false;
  break;
default:
  report("unmorph invalid angle " + this.angle);
  break;
}
return(p);
}

/**
 * Gets data for this component in a schematic. 
 **/
DComponent.prototype.getData = function()
{
  let k = this.attributes.length;
  let i = 0;
  let bn = this.basename;
  if(!fullsymbolpath)
  {
    let j = bn.lastIndexOf("/");
    if(j != -1) bn = bn.substring(j+1);
  }
  if(bn == null)
  {
    this.basename = getAttributeValue("device", this);
  }
  if(this.basename.indexOf(".sym") == -1) bn += ".sym";
  if(this.filename == null)
  {
    this.filename = bn;
  }
  report("filename = " + this.filename + ", device = " + this.basename);
//  let sb = "C " + this.x+ " " + this.y + " " + this.selectable+ " " + this.angle+ " " + this.mirror + " " + bn + "\n";
  let sb = "C " + R(this.x) + " " + R(this.y) + " " + this.selectable+ " " + this.angle+ " " + this.mirror + " " + this.filename + "\n";
  if(k > 0)
  {
    sb += "{\n";
    while(i < k) // write out top level attributes
    {
      sb += this.attributes[i].getData();
      i += 1;
    }
    sb += "}\n";
  }
  return(sb);
}

/**
 * Gets data for this symbol. 
 * **/
DComponent.prototype.saveSymbolData = function()
{
  let sb ="v 20110115 2\n";
  let k = this.attributes.length;
  let i = 0;
  while(i < k) // write out top level attributes
  {
    sb += this.attributes[i].getData();
    i += 1;
  }
  k = this.doj.length;
  i = 0;
  while( i < k)
  {
//    report(this.doj[i].klass);
    sb += this.doj[i].getData();
    i += 1;
  }

  return(sb);
}

function DNet(de, x1, y1, x2, y2, colorindex)
{
  this.klass = "DNet";
  // de = de;
  this.x1 = Number(x1);
  this.y1 = Number(y1);
  this.x2 = Number(x2);
  this.y2 = Number(y2);
  this.colorindex = Number(colorindex);
  this.textsize = 10;
  this.attributes = [];
  this.attributes.push(createAttribute(de, this.x1 + 50, this.y1 + 50, ATTRIBUTE_COLOR, this.textsize, VISIBILITY_INVISIBLE, SHOW_VALUE, 0, 1, "netname", ""));
  this.line = new Line2D();
  de.setLine(this.line, x1, y1, x2, y2);
  this.selectBox = this.makeSelectBox();
  this.selectable = 1;
  this.name = "";

}

DNet.prototype.getDataJ = function()
{
  let o = {
      type: "DNet",
      name: this.name,
      x1: this.x1,
      y1: this.y1,
      x2: this.x2,
      y2: this.y2,
      colorindex: this.colorindex,
      selectable: this.selectable,
      textsize: this.textsize,
      line: this.line,
      attributes: this.attributes
  };
  return(o);
}

DNet.prototype.setColorIndex = function(ci)
{
  this.colorindex = Number(ci);  
}

DNet.prototype.isEndPoint = function(xx, yy)
{
  let b = false;
  if((this.x1 == xx) && (this.y1 == yy)) b = true;
  else if((this.x2 == xx) && (this.y2 == yy)) b = true;
  return(b);
}

DNet.prototype.update = function()
{
  de.setLine(this.line, this.x1, this.y1, this.x2, this.y2);
}

DNet.prototype.addDrawingObject = function(a)
{
  report("DNet addDrawingObject not supported, corrupted file error " + a.klass);
  console.trace();
}

DNet.prototype.addAttribute = function(a)
{
  let tt = getAttributeIndex(a.name, this);
  if(tt == -1) this.attributes[this.attributes.length] = a;
  else 
  {
 //     this.attributes[tt] = darray[i];
    this.attributes.splice(tt,1);
    this.attributes.splice(tt, 0, a);
  }
}

DNet.prototype.getX = function()
{
 return(this.x1); 
}

DNet.prototype.getY = function()
{
 return(this.y1); 
}

DNet.prototype.getX2 = function()
{
 return(this.x2); 
}

DNet.prototype.getY2 = function()
{
 return(this.y2); 
}
	
DNet.prototype.setX = function(x) 
{
  let d = Number(x) - Number(this.x1);
  this.x1 = Math.round(x);
  this.x2 = Math.round(this.x2 + d);
  de.setLine(this.line, this.x1, this.y1, this.x2, this.y2);
  let k = this.attributes.length;
  let i = 0;
  while(i < k)
  {
    let a = this.attributes[i];
    a.x = Number(a.x) + d;
    i += 1;
  }
}

DNet.prototype.setY = function (y) 
{
  let d = Number(y) - Number(this.y1);
  this.y1 = Math.round(y);
  this.y2 = Math.round(this.y2 + d);
  de.setLine(this.line, this.x1, this.y1, this.x2, this.y2);
  let k = this.attributes.length;
  let i = 0;
  while(i < k)
  {
    let a = this.attributes[i];
    a.y = Number(a.y) + d;
    i += 1;
  }
}

DNet.prototype.setX2 = function(x) 
{
  this.x2 = Math.round(x);
  de.setLine(this.line, this.x1, this.y1, this.x2, this.y2);
}

DNet.prototype.setY2 = function (y) 
{
  this.y2 = Math.round(y);
  de.setLine(this.line, this.x1, this.y1, this.x2, this.y2);
}

//TODO
DNet.prototype.updateAttributeLocations = function (dx, dy) 
{
  
}

DNet.prototype.getData = function() 
{
let sb = "";
sb += "N " + this.x1 + " " + this.y1 + " " + this.x2  + " " + this.y2 + " " + this.colorindex + "\n";
// attributes
if(this.attributes.length != 0)
{
  sb += "{\n";
  let k = this.attributes.length;
  let i = 0;
  while(i < k)
  {
    sb += this.attributes[i].getData();
    i += 1;
  }
  sb += "}\n";
}
return sb;
}

DNet.prototype.inRange = function(xx, yy)
{
let b = false;
let oc = -1;
if(this.selectBox != null) oc = this.selectBox.outcode(xx, de.correctY(yy));
if(oc == 0) b = true;
return(b);	
}

DNet.prototype.makeSelectBox = function()
{
let w = this.x2 - this.x1;
let h = this.y2 - this.y1;
let xm = this.x1;
if(this.x2 < this.x1) xm = this.x2;
let ym = this.y1;
if(this.y2 < this.y1) ym = this.y2;
if(w < 0) w = -w;
if(h < 0) h = -h;
let margin = 80 * gridsize/100;
let margin2 = 2 * margin;
//let c = 0;
if(this.x1 == this.x2)
{
  if(this.y1 <= this.y2)
  {
    c = 1;
    this.selectBox = new Rectangle2D();
    this.selectBox = this.selectBox.setRect(this.x1 - margin, de.correctY(this.y2 -h) -margin, margin2, h - margin2);
  }
  else
  {
    c = 2;
    this.selectBox = new Rectangle2D();
    this.selectBox = this.selectBox.setRect(this.x1 - margin, de.correctY(this.y1 - h) -margin, margin2, h - margin2);
  }
}
else if(this.y1 == this.y2)
{
  if(this.x1 <= this.x2)
  {
    c = 3;
    this.selectBox = new Rectangle2D();
    this.selectBox = this.selectBox.setRect(this.x1 + margin, de.correctY(this.y2 +h) +margin, w - margin2, margin2);
  }
  else
  {
    c = 4;
    this.selectBox = new Rectangle2D();
    this.selectBox = this.selectBox.setRect(this.x2 + margin, de.correctY(this.y1) +margin, w - margin2, margin2);
  }
}
else
{
  c = 5;
  this.selectBox = new Rectangle2D();
//  this.selectBox.setRect(xm + margin, de.correctY(ym) +h +margin, w - margin2, h - margin2);
  this.selectBox.setRect(xm - margin, de.correctY(ym) -h -margin, 200, h - margin2);
}
//alert(c);
return(this.selectBox);
}

DNet.prototype.paint = function(ctx)
{
 this.dPaint(ctx); 
}

DNet.prototype.dPaint = function(ctx)
{
  ctx.save();
  ctx.lineWidth = 2.0;
  this.line.paint(ctx, de.getColor(this.colorindex), de.getInverseZoom());
  ctx.restore();
  let k = this.attributes.length;
  let i = 0;
  while(i < k)
  {
    this.attributes[i].paint(ctx);
    i += 1;
  }
  if(this.selectable == 1)
  {
  this.selectBox = this.makeSelectBox();
  if(sheet.getSelectedObject() == this)
  {
    this.selectBox.paint(ctx, de.getColor(BOUNDINGBOX_COLOR), de.getInverseZoom());
  }
  }
}

/** Finds free end of a DNet
 *  returns 1 if x1 is free and net is horizontal
 *          2 if x1 is free and net is vertical
 *          3 if x2 is free and net is horizontal
 *          4 if v2 is free and net is vertical
 *          otherwise 0
 */
function getFreeEnd(net)
{
  let p = 0;
  let oa = sheet.getObjectsAt(net.x1, net.y1);
  if(oa.length == 1) p = 1;
  if(p == 0)
  {
    oa = sheet.getObjectsAt(net.x2, net.y2);
    if(oa.length == 1) p = 3;
  }
  if((p != 0) && (net.x1 == net.x2)) p += 1;
  return(p);
}

function DJunction(de, x, y, colorindex)
{
  this.klass = "DJunction";
  // de = de;
  this.x = Number(x);
  this.y = Number(y);
  this.colorindex = Number(colorindex);
  this.box = new Rectangle2D();
  this.box.filltype = 1;
  this.box.setRect(x - 50, de.correctY(y - 50), 100, 100);
  this.selectBox = this.makeSelectBox();
  this.selectable = 1;
  this.attributes = [];
}

DJunction.prototype.getDataJ = function()
{
  let o = {
      type: "DJunction",
      x: this.x,
      y: this.y,
      colorindex: this.colorindex,
      filltype: this.box.filltype,
      selectable: this.selectable,
      attributes: this.attributes,
      selectBox: this.selectBox
  }
  return(o);
}

DJunction.prototype.getX = function()
{
 return(this.x); 
}

DJunction.prototype.getY = function()
{
 return(this.y); 
}

DJunction.prototype.setX = function(x)
{
  this.x = x;
}

DJunction.prototype.setY = function(y)
{
  this.y = y;
}

DJunction.prototype.update = function()
{
//  alert(this.x + " " +  de.correctY(this.y) + " " + this.boxwidth +" " + this.boxheight);
  this.box.filltype = 1;
  this.box.setRect(this.x - 50, de.correctY(this.y - 50), 100, 100); 
  this.makeSelectBox();
}

DJunction.prototype.getData = function()
{
return("");
}

DJunction.prototype.inRange = function(xx, yy)
{
let b = false;
let oc = this.selectBox.outcode(xx, de.correctY(yy));
if(oc == 0) b = true;
return(b);	
}

DJunction.prototype.makeSelectBox = function()
{
  this.selectBox = new Rectangle2D();
// alert(this.x + " " +  de.correctY(this.y) + " " + this.boxwidth +" " + this.boxheight);
  this.selectBox = this.selectBox.setRect(this.x - 90 , de.correctY(this.y) + 90  , 140, 140 );
  return(this.selectBox);
}

DJunction.prototype.paint = function(ctx)
{
 this.dPaint(ctx); 
}


DJunction.prototype.dPaint = function(ctx)
{
  this.box.paint(ctx, de.getColor(this.colorindex), de.getInverseZoom());
  this.selectBox = this.makeSelectBox();
  if(sheet.getSelectedObject() == this)
  {
    this.selectBox.paint(ctx, de.getColor(BOUNDINGBOX_COLOR), de.getInverseZoom());
  }
}

function DBus(de, x1, y1, x2, y2, colorindex, ripperdir)
{
  this.klass = "DBus";
  // de = de;
  this.x1 = Number(x1);
  this.y1 = Number(y1);
  this.x2 = Number(x2);
  this.y2 = Number(y2);
  this.colorindex = colorindex;
  this.ripperdir = ripperdir;
  this.width = 7;
  this.textsize = 10;
  this.attributes = [];
  this.line = new Line2D();
  this.line.lineWidth = this.width;
  de.setLine(this.line, x1, y1, x2, y2);
  this.selectBox = this.makeSelectBox();
  this.selectable = 1;
  this.members = []; // an array of Net
}

DBus.prototype.getDataJ = function()
{
  let o = {
      klass: "DBus",
      x1: this.x1,
      y1: this.y1,
      x2: this.x2,
      y2: this.y2,
      colorindex: this.colorindex,
      ripperdir: this.ripperdir,
      width: this.width,
      textsize: this.textsize,
      attributes: [],
      line: this.line,
//  this.line.lineWidth = this.width;
//  de.setLine(this.line, x1, y1, x2, y2);
//      this.selectBox = this.makeSelectBox();
      selectable: this.selectable,
      members: []
  };
  
  this.attributes.forEach( (att) => {
      let pnt = att.parent;
      att.parent = null;
      o.attributes.push(att.getDataJ());
      att.parent = pnt;
  });
  
  this.members.forEach( (mem) => {
      let pnt = mem.parent;
      mem.parent = null;
      o.members.push(mem.getDataJ());
      mem.parent = pnt;
  });
  
  return(o);
}

DBus.prototype.addMember = function(dnet)
{
  addItemToArray(dnet, this.members);
}

DBus.prototype.update = function()
{
  de.setLine(this.line, this.x1, this.y1, this.x2, this.y2);
  let a = getAttribute("L1", this);
  if(a != null)
  {
    a.x = this.x1 + 50;
    a.y = this.y1 + 50;
  }
  a = getAttribute("L2", this);
  if(a != null)
  {
    a.x = this.x1 + 50;
    a.y = this.y1 + 100;
  }
 
}

DBus.prototype.getX = function()
{
 return(this.x1); 
}

DBus.prototype.getY = function()
{
 return(this.y1); 
}
	
DBus.prototype.setX = function(x) 
{
  let d = Number(x) - Number(this.x1);
  this.x1 = x;
  this.x2 = this.x2 + d;
  de.setLine(this.line, this.x1, this.y1, this.x2, this.y2);
  let k = this.attributes.length;
  let i = 0;
  while(i < k)
  {
    let a = this.attributes[i];
    a.x = Number(a.x) + d;
    i += 1;
  }
}

DBus.prototype.setY = function (y) 
{
  let d = Number(y) - Number(this.y1);
  this.y1 = y;
  this.y2 = this.y2 + d;
  de.setLine(this.line, this.x1, this.y1, this.x2, this.y2);
  let k = this.attributes.length;
  let i = 0;
  while(i < k)
  {
    let a = this.attributes[i];
    a.y = Number(a.y) + d;
    i += 1;
  }
}

DBus.prototype.setX2 = function(x) 
{
  this.x2 = x;
  de.setLine(this.line, this.x1, this.y1, this.x2, this.y2);
}

DBus.prototype.setY2 = function (y) 
{
  this.y2 = y;
  de.setLine(this.line, this.x1, this.y1, this.x2, this.y2);
}

DBus.prototype.addAttribute = function(a)
{
  let tt = getAttributeIndex(a.name, this);
  if(tt == -1) this.attributes[this.attributes.length] = a;
  else 
  {
    this.attributes.splice(tt,1);
    this.attributes.splice(tt, 0, a);
  }
}

DBus.prototype.getData = function() 
{
//let cangle = angle;
//		setAngle(0);
let sb = "";
sb += "U " + this.x1 + " " + this.y1 + " " + this.x2  + " " + this.y2 + " " + this.colorindex + " " + this.ripperdir + "\n";
// attributes
if(this.attributes.length != 0)
{
  sb += "{\n";
  let k = this.attributes.length;
  let i = 0;
  while(i < k)
  {
    sb += this.attributes[i].getData();
    i += 1;
  }
  sb += "}\n";
}
//setAngle(cangle);
return sb;
}

DBus.prototype.inRange = function(xx, yy)
{
let b = false;
let oc = -1;
if(this.selectBox != null) oc = this.selectBox.outcode(xx, de.correctY(yy));
if(oc == 0) b = true;
return(b);	
}

DBus.prototype.makeSelectBox = function()
{
let w = this.x2 - this.x1;
let h = this.y2 - this.y1;
let xm = this.x1;
if(this.x2 < this.x1) xm = this.x2;
let ym = this.y1;
if(this.y2 < this.y1) ym = this.y2;
if(w < 0) w = -w;
if(h < 0) h = -h;
let margin = 80;
let margin2 = 160;
//let c = 0;
if(this.x1 == this.x2)
{
  if(this.y1 <= this.y2)
  {
    c = 1;
    this.selectBox = new Rectangle2D();
    this.selectBox = this.selectBox.setRect(this.x1 - margin, de.correctY(this.y2 -h) -margin, margin2, h - margin2);
  }
  else
  {
    c = 2;
    this.selectBox = new Rectangle2D();
    this.selectBox = this.selectBox.setRect(this.x1 - margin, de.correctY(this.y1 - h) -margin, margin2, h - margin2);
  }
}
else if(this.y1 == this.y2)
{
  if(this.x1 <= this.x2)
  {
    c = 3;
    this.selectBox = new Rectangle2D();
    this.selectBox = this.selectBox.setRect(this.x1 + margin, de.correctY(this.y2 +h) +margin, w - margin2, margin2);
  }
  else
  {
    c = 4;
    this.selectBox = new Rectangle2D();
    this.selectBox = this.selectBox.setRect(this.x2 + margin, de.correctY(this.y1) +margin, w - margin2, margin2);
  }
}
else
{
  c = 5;
  this.selectBox = new Rectangle2D();
//  this.selectBox.setRect(xm + margin, de.correctY(ym) +h +margin, w - margin2, h - margin2);
  this.selectBox.setRect(xm - margin, de.correctY(ym) -h -margin, 200, h - margin2);
}
//report(c);
return(this.selectBox);
}

DBus.prototype.paint = function(ctx)
{
 this.dPaint(ctx); 
}

DBus.prototype.dPaint = function(ctx)
{
  ctx.save();
//  ctx.lineWidth = 2.0;
  this.line.paint(ctx, de.getColor(this.colorindex), de.getInverseZoom());
  ctx.restore();
  let k = this.attributes.length;
  let i = 0;
  while(i < k)
  {
    this.attributes[i].paint(ctx);
    i += 1;
  }
  if(this.selectable == 1)
  {
  this.selectBox = this.makeSelectBox();
  if(sheet.getSelectedObject() == this)
  {
//    ctx.save();
//    ctx.lineWidth = 2.0;
    this.selectBox.paint(ctx, de.getColor(BOUNDINGBOX_COLOR), de.getInverseZoom());
//    ctx.restore();
  }
  }
}

function DPicture(de, x, y, width, height, angle, mirrored, embedded)
{
  this.klass = "DPicture";
  this.src = "";
  this.img = null;
  this.loaded = false;
  this.data = "";
  // de = de;
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.widtho = 100;
  this.heigho = 100;
  this.angle = angle;
  this.mirrored = mirrored;
  this.embedded = embedded;
  this.selectable = 1;
  this.selectBox = this.makeSelectBox();
  this.attributes = [];
}

DPicture.prototype.load = function(url)
{
  report("DPicture load start " + url);
  let _that = this;
  this.img = new Image();
  this.img.onload = function() {
    _that.widtho = _that.img.width;
    _that.heighto = _that.img.height;
    if(_that.width == 100) _that.width = _that.widtho;
    if(_that.height == 100) _that.height = _that.heighto;
    _that.loaded = true;
    report("DPicture load complete " + _that.src);
    repaint();
  };
  this.img.onerror = function(e) {
    report(_that.src + " responded with error " + e.type + " " + e.toString());
    };
  this.img.ontimeout = function() {
    report(_that.src + " responded with timeout error ");
    };
  this.src = url;
  this.img.src = url;
}

DPicture.prototype.startData = function()
{
  this.img = new Image();
  if(this.src.indexOf(".gif") != -1) this.data = "data:image/gif:base64,";
  else if(this.src.indexOf(".jpg") != -1) this.data = "data:image/jpeg:base64,";
  else this.data = "data:image/png:base64,";
}

DPicture.prototype.endData = function()
{
  this.img.src = this.data;
  this.widtho = this.img.width;
  this.heighto = this.img.height;
  if(this.width == 100) this.width = this.widtho;
  if(this.height == 100) this.height = this.heighto;
  this.loaded = true;
  repaint();
}

DPicture.prototype.addBase64Data = function(d)
{
  this.data += d;
}

DPicture.prototype.update = function()
{
}

DPicture.prototype.getX = function()
{
 return(this.x); 
}

DPicture.prototype.getY = function()
{
 return(this.y); 
}
	
DPicture.prototype.setX = function(x) 
{
  this.x = x;
}

DPicture.prototype.setY = function (y) 
{
  this.y = y;
}

DPicture.prototype.getData = function() 
{
//let cangle = angle;
//		setAngle(0);
let sb = "";
sb += "G " + this.x + " " + this.y + " " + this.width  + " " + this.height + " " + this.angle + " " + this.mirrored + " " + this.embedded + "\n";
sb += this.src + "\n";
if(this.embedded == 1)
{
  let k = this.data.length;
  let j = 0;
  while(j < k)
  {
    if((j + 64) < k) sb += this.data.substring(j, j +64) + "\n";
    else sb += this.data.substring(j) + "\n";
    j += 64;
  }
  sb += ".\n";
}

// attributes
if(this.attributes.length != 0)
{
  sb += "{\n";
  let k = this.attributes.length;
  let i = 0;
  while(i < k)
  {
    sb += this.attributes[i].getData();
    i += 1;
  }
  sb += "}\n";
}
//setAngle(cangle);
return sb;
}

DPicture.prototype.inRange = function(xx, yy)
{
let b = false;
let oc = -1;
if(this.selectBox != null) oc = this.selectBox.outcode(xx, de.correctY(yy));
if(oc == 0) b = true;
return(b);	
}

DPicture.prototype.makeSelectBox = function()
{
  this.selectBox = new Rectangle2D();
  this.selectBox = this.selectBox.setRect(this.x - 40 , de.correctY(this.y - this.height) + 40  , Number(this.width) + 80, Number(this.height) + 80 );
  return(this.selectBox);
}

DPicture.prototype.paint = function(ctx)
{
// if(this.loaded) 
   this.dPaint(ctx); 
}

DPicture.prototype.dPaint = function(ctx)
{
  let z = de.getInverseZoom();
  ctx.save();
  if(this.loaded) ctx.drawImage(this.img, this.x / z, de.correctY(this.y) / z, this.width / z, this.height / z);
  ctx.restore();  
//  if(this.selectable == 1)
  {
    this.selectBox = this.makeSelectBox();
    if(sheet.getSelectedObject() == this)
    {
      this.selectBox.paint(ctx, de.getColor(BOUNDINGBOX_COLOR), z);
    }
  }
}

function getNearEnd(n)
{
  let z = de.getInverseZoom();
  let xx = de.mouseToDrawingX(NetPos.x) + xfmX * z;
  let yy = de.mouseToDrawingY(NetPos.y) - xfmY * z;
//  report("xx = " + xx + " yy = " + yy + " x1 = " + n.x1 + " x2 = " + n.x2 + " y1 = " + n.y1 + " y2 = " + n.y2 + " mp.x = " + NetPos.x + " mp.y = " + NetPos.y);
  d1 = Math.abs(n.x1 - xx) + Math.abs(n.y1 - yy);
  d2 = Math.abs(n.x2 - xx) + Math.abs(n.y2 - yy);
  let pt = null;
  if(d1 < d2) pt = new DEnd(n.x1, n.y1);
  else pt = new DEnd(n.x2, n.y2);
//  pt.connectedSignal = n.connectedSignal;
  pt.connectedSignal = getAttributeValue("netname", n);
  return(pt);
}

function DEnd(x, y)
{
  this.klass = "DEnd";
  this.x = x;
  this.y = y;
  this.getX = function(){
    return(this.x);  
  };
  this.getY = function(){
    return(this.y);  
  };
  this.setX = function(x){
    this.x = x;  
  };
  this.setY = function(y){
    this.y = y;  
  };
  this.update = function(){};
  this.attributes = [];
  this.connectedSignal = null;
  this.selectBox = null;
  this.parent = null;
}

DEnd.prototype.getDataJ = function()
{
  let o = {
      klass: this.klass,
      x: this.x,
      y: this.y,
      attributes: [],
      connectedSignal: this.connectedSignal,
      selectBox: null
  };
  this.attributes.forEach( (att) => {
      let pnt = att.parent;
      att.parent = null;
      o.attributes.push(att.getDataJ());
      att.parent = pnt;
  });
  return(o);
}

DEnd.prototype.makeSelectBox = function()
{
  this.selectBox = new Rectangle2D();
  this.selectBox = this.selectBox.setRect(this.x - 50 , de.correctY(this.y) + 50  , 100, 100 );
  return(this.selectBox);
}

DEnd.prototype.paint = function(ctx)
{
  this.selectBox = this.makeSelectBox();
  if(sheet.getSelectedObject() == this)
  {
    this.selectBox.paint(ctx, de.getColor(BUS_COLOR), de.getInverseZoom());
  }
}

