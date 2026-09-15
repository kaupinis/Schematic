// eo_schematic2.js

function EditingStack()
{
  this.ve = [];
  this.pointer = -1;
}

EditingStack.prototype.add = function(e)
{
  while((this.pointer < (this.ve.length - 1)) && (this.pointer != -1))
  {
    this.ve.splice(this.pointer + 1, 1);
  }
  this.ve[this.ve.length] = e;
  this.pointer += 1;
}
	
EditingStack.prototype.undo = function()
{
  let z = this.ve.length;
  if((z > 0) && (this.pointer > -1))
  {
    let ec = this.ve[this.pointer];
    ec.undo();
    this.pointer -= 1; // point to last valid command
  }
  if(z == 0)
  {
    this.pointer = -1;
  }
//  report("es undo length = " + this.ve.length + " pointer = " + this.pointer );
}
	
EditingStack.prototype.redo = function()
{
  if(this.pointer <= this.ve.length - 2)
  {
    this.pointer += 1;
    let ec = this.ve[this.pointer];
    ec.execute();
  }
//  report("es redo length = " + this.ve.length + " pointer = " + this.pointer );
}
	
	
EditingStack.prototype.clear = function()
{
  let k = ve.length;
  if(k > 0)
  {
    ve.splice(0,k);
  }
}
	
function DeleteCommand(d)
{
  this.d = d;
}

DeleteCommand.prototype.execute = function()
{
  removeItemFromArray(this.d, sheet.DrawingObjects);
}

DeleteCommand.prototype.undo = function()
{
  sheet.addDrawingObject(this.d);
}

function DeleteGroupCommand(vd)
{
  this.vd = vd;
}

DeleteGroupCommand.prototype.execute = function()
{
   let k = this.vd.length;
   let i = 0;
   while(i < k)
   {
      let o = this.vd[i];
      removeItemFromArray(o, sheet.DrawingObjects);
      i += 1;
   }
}

DeleteGroupCommand.prototype.undo = function()
{
   let k = this.vd.length;
   let i = 0;
   while(i < k)
   {
      let o = this.vd[i];
      sheet.addDrawingObject(o);
      i += 1;
   }
}

function MoveCommand(d)
{
  this.d = d;
  this.old_x = d.getX();
  this.old_y = d.getY();
  this.new_x = 0;
  this.new_y = 0;
  this.MOVEPOINTS = MOVEPOINTS.slice(0);
  this.ENDPOINT = new PointI(this.old_x, this.old_y);
  this.mmode = mmode;
}

MoveCommand.prototype.execute = function()
{
//  this.d.setX(this.new_x);
//  this.d.setY(this.new_y);
  if((mmode == 3) && (MOVEPOINTS != []))
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
          a.x1 = this.new_x; 
          a.y1 = this.new_y;
        }
        else if((a.getX2() == x0) && (a.getY2() == y0))
        {
          a.x2 = this.new_x;
          a.y2 = this.new_y;
        }
        a.update();
      }
    }
    ENDPOINT = null;      
    clearArray(MOVEPOINTS);
    mmode = 0;
  }
  else
  {
    this.d.setX(this.new_x);
    this.d.setY(this.new_y);
  }
}

MoveCommand.prototype.undo = function()
{
  this.d.setX(this.old_x);
  this.d.setY(this.old_y);  
  if((this.mmode == 3) && (this.MOVEPOINTS != []))
  {
    let x0 = this.ENDPOINT.x;
    let y0 = this.ENDPOINT.y;
    for(i = 0; i < this.MOVEPOINTS.length; i++)
    {
      let a = this.MOVEPOINTS[i];
      if(a.klass == "DNet")
      {
        if((a.getX() == this.new_x) && (a.getY() == this.new_y))
        {
          a.x1 = this.ENDPOINT.x; 
          a.y1 = this.ENDPOINT.y;
        }
        else if((a.getX2() == this.new_x) && (a.getY2() == this.new_y))
        {
          a.x2 = this.ENDPOINT.x;
          a.y2 = this.ENDPOINT.y;
        }
        a.update();
      }
    }
    ENDPOINT = null;      
    clearArray(MOVEPOINTS);
    mmode = 0;
  }
  else
  {
    this.d.setX(this.old_x);
    this.d.setY(this.old_y);  
  }
}

function AddDrawingObjectCommand(sh, d)
{
  this.sh = sh;
  this.d = d;
}

AddDrawingObjectCommand.prototype.execute = function()
{
  this.sh.addDrawingObject(this.d);
}

AddDrawingObjectCommand.prototype.undo = function()
{
  this.sh.removeDrawingObject(this.d);
}

function FlipCommand(d)
{
  this.d = d;
}

FlipCommand.prototype.execute = function()
{
  if((this.d.klass == "DPin") && ((this.d.parent.klass === undefined) || (this.d.parent.klass == "SchematicSheet")))
  {
    if(this.d.whichend == 0) this.d.setWhichEnd(1);
    else this.d.setWhichEnd(0);
  }
  else
  {
    if(this.d.mirror == 0) this.d.mirror = 1;
    else this.d.mirror = 0;
  }
}

FlipCommand.prototype.undo = function()
{
  if((this.d.klass == "DPin") && ((this.d.parent.klass === undefined) || (this.d.parent.klass == "SchematicSheet")))
  {
    if(this.d.whichend == 0) this.d.setWhichEnd(1);
    else this.d.setWhichEnd(0);
  }
  else
  {
    if(this.d.mirror == 0) this.d.mirror = 1;
    else this.d.mirror = 0;
  }
}

function RotateCommand(d)
{
  this.d = d;
}

RotateCommand.prototype.execute = function()
{
  let a = Number(this.d.angle) + 90;
  if(a > 270) a = 0;
  this.d.setAngle(a);
}

RotateCommand.prototype.undo = function()
{
  let a = Number(this.d.angle) - 90;
  if(a < 0) a = 270;
  this.d.setAngle(a);
}

function makeTitleSheetA(de, x, y)
{
let dcomp = new DComponent(de, x, y, 0, 0, 0, "eo_titleA.sym");

//B 0 0 10000 7500 15 0 0 0 -1 -1 0 -1 -1 -1 -1 -1
let box = new DBox(de, x, y, 10000, 7500, 15, 0, 0, 0, -1, -1, 0, -1, -1, -1, -1, -1);
dcomp.addDrawingObject(box);

//T 10100 1500 5 10 0 0 0 0 1
//graphical=1
let text = createAttribute(de, 10100 + x, 1500 + y, 5, 10, 0, 0, 0, 0, "graphical", 1);
dcomp.attributes[dcomp.attributes.length] = text;

//T 7650 250 15 8 1 1 0 0 1
//revision=REV:
text = createAttribute(de, 7650 + x, 250 + y, 15, 8, 1, 1, 0, 0,  "revision", "REV:");
dcomp.attributes[dcomp.attributes.length] = text;

//T 6450 250 15 8 1 1 0 0 1
//author=DRAWN BY: 
text = createAttribute(de, 6450 + x, 250 + y, 15, 8, 1, 1, 0, 0, "author", "DRAWN BY:"); 
dcomp.attributes[dcomp.attributes.length] = text;

//T 8850 250 15 8 1 1 0 0 1
//sheetnumber=SHEET X OF Y
text = createAttribute(de, 8850 + x, 250 + y, 15, 8, 1, 1, 0, 0, "sheetnumber", "SHEET X OF Y");
dcomp.attributes[dcomp.attributes.length] = text;

//T 7650 100 15 8 1 1 0 0 1
//date=1/1/2013
let date = new Date();
let dt = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear().toString().substr(2,2);
text = createAttribute(de, 7650 + x, 100 + y, 15, 8, 1, 1, 0, 0, "date", dt);
dcomp.attributes[dcomp.attributes.length] = text;

//T 8175 500 15 16 1 1 0 4 1
//designname=Design Name
text = createAttribute(de, 8175 + x, 500 + y, 15, 16, 1, 1, 0, 4, "designname", "Design_Name");
dcomp.attributes[dcomp.attributes.length] = text;

//T 8175 800 15 16 1 1 0 4 1
//company=eightolives
text = createAttribute(de, 8175 + x, 800 + y, 15, 16, 1, 1, 0, 4, "company", "eightolives");
dcomp.attributes[dcomp.attributes.length] = text;

text = createAttribute(de, 8175 + x, 1000 + y, 15, 16, 0, 0, 0, 4, "gnd_plane_signal", "");
dcomp.attributes[dcomp.attributes.length] = text;
text = createAttribute(de, 8175 + x, 1200 + y, 15, 16, 0, 0, 0, 4, "power_plane_signal", "");
dcomp.attributes[dcomp.attributes.length] = text;

//T 900 100 8 10 1 1 0 0 1
//copyright=copyright (c) 2016 eightolives
text = createAttribute(de, 900 + x, 100 + y, 8, 10, 1, 1, 0, 0, "copyright", "copyright (c) 2026 eightolives");
dcomp.attributes[dcomp.attributes.length] = text;

//B 6400 50 3550 950 15 0 0 0 -1 -1 0 -1 -1 -1 -1 -1
box = new DBox(de, 6400 + x, 50 + y, 3550, 950, 15, 0, 0, 0, -1, -1, 0, -1, -1, -1, -1, -1);
dcomp.addDrawingObject(box);

//L 6400 350 9950 350 15 0 0 0 -1 -1
let line = new DLine(de, 6400 + x, 350 + y, 9950 + x, 350 + y, 15, 0, 0, 0, -1, -1);
dcomp.addDrawingObject(line);

//L 6400 650 9950 650 15 0 0 0 -1 -1
line = new DLine(de, 6400 + x, 650 + y, 9950 + x, 650 + y, 15, 0, 0, 0, -1, -1);
dcomp.addDrawingObject(line);

//L 7600 50 7600 350 15 0 0 0 -1 -1
line = new DLine(de, 7600 + x, 50 + y, 7600 + x, 350 + y, 15, 0, 0, 0, -1, -1);
dcomp.addDrawingObject(line);

//L 8800 50 8800 350 15 0 0 0 -1 -1
line = new DLine(de, 8800 +x, 50 + y, 8800 + x, 350 + y, 15, 0, 0, 0, -1, -1);
dcomp.addDrawingObject(line);

//L 7600 200 8800 200 15 0 0 0 -1 -1
line = new DLine(de, 7600 + x, 200 + y, 8800 + x, 200 + y, 15, 0, 0, 0, -1, -1);
dcomp.addDrawingObject(line);

return(dcomp);
}


function makeTitleSheetB2(de, x, y)
{
  let fp = new FileParser("eo_titleBb.sym");
  let tit = fp.parse1(eo_titleBb);
  setAttributeValue("designname", tit, "Design_Name");  
  setAttributeValue("company", tit, "eightolives");  
  
  return(tit);
}

function makeTitleSheetB(de, x, y)
{
let dcomp = new DComponent(de, x, y, 0, 0, 0, "eo_titleB.sym");

//B 0 0 10000 7500 15 0 0 0 -1 -1 0 -1 -1 -1 -1 -1
let box = new DBox(de, x, y, 10000, 7500, 15, 0, 0, 0, -1, -1, 0, -1, -1, -1, -1, -1);
dcomp.addDrawingObject(box);

//T 10100 1500 5 10 0 0 0 0 1
//graphical=1
let text = createAttribute(de, 10100 + x, 1500 + y, 5, 10, 0, 0, 0, 0, "graphical", 1);
dcomp.attributes[dcomp.attributes.length] = text;

//T 7650 250 15 8 1 1 0 0 1
//revision=REV:
text = createAttribute(de, 7650 + x, 250 + y, 15, 8, 1, 1, 0, 0,  "revision", "REV:");
dcomp.attributes[dcomp.attributes.length] = text;

//T 6450 250 15 8 1 1 0 0 1
//author=DRAWN BY: 
text = createAttribute(de, 6450 + x, 250 + y, 15, 8, 1, 1, 0, 0, "author", "DRAWN BY:"); 
dcomp.attributes[dcomp.attributes.length] = text;

//T 8850 250 15 8 1 1 0 0 1
//sheetnumber=SHEET X OF Y
text = createAttribute(de, 8850 + x, 250 + y, 15, 8, 1, 1, 0, 0, "sheetnumber", "SHEET X OF Y");
dcomp.attributes[dcomp.attributes.length] = text;

//T 7650 100 15 8 1 1 0 0 1
//date=1/1/2013
let date = new Date();
let dt = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear().toString().substr(2,2);
text = createAttribute(de, 7650 + x, 100 + y, 15, 8, 1, 1, 0, 0, "date", dt);
dcomp.attributes[dcomp.attributes.length] = text;

//T 8175 500 15 16 1 1 0 4 1
//designname=Design Name
text = createAttribute(de, 8175 + x, 500 + y, 15, 16, 1, 1, 0, 4, "designname", "Design_Name");
dcomp.attributes[dcomp.attributes.length] = text;

//T 8175 800 15 16 1 1 0 4 1
//company=eightolives
text = createAttribute(de, 8175 + x, 800 + y, 15, 16, 1, 1, 0, 4, "company", "eightolives");
dcomp.attributes[dcomp.attributes.length] = text;

text = createAttribute(de, 8175 + x, 1000 + y, 15, 16, 0, 0, 0, 4, "gnd_plane_signal", "");
dcomp.attributes[dcomp.attributes.length] = text;
text = createAttribute(de, 8175 + x, 1200 + y, 15, 16, 0, 0, 0, 4, "power_plane_signal", "");
dcomp.attributes[dcomp.attributes.length] = text;

//T 900 100 8 10 1 1 0 0 1
//copyright=copyright (c) 2016 eightolives
text = createAttribute(de, 900 + x, 100 + y, 8, 10, 1, 1, 0, 0, "copyright", "copyright (c) 2026 eightolives");
dcomp.attributes[dcomp.attributes.length] = text;

//B 6400 50 3550 950 15 0 0 0 -1 -1 0 -1 -1 -1 -1 -1
box = new DBox(de, 6400 + x, 50 + y, 3550, 950, 15, 0, 0, 0, -1, -1, 0, -1, -1, -1, -1, -1);
dcomp.addDrawingObject(box);

//L 6400 350 9950 350 15 0 0 0 -1 -1
let line = new DLine(de, 6400 + x, 350 + y, 9950 + x, 350 + y, 15, 0, 0, 0, -1, -1);
dcomp.addDrawingObject(line);

//L 6400 650 9950 650 15 0 0 0 -1 -1
line = new DLine(de, 6400 + x, 650 + y, 9950 + x, 650 + y, 15, 0, 0, 0, -1, -1);
dcomp.addDrawingObject(line);

//L 7600 50 7600 350 15 0 0 0 -1 -1
line = new DLine(de, 7600 + x, 50 + y, 7600 + x, 350 + y, 15, 0, 0, 0, -1, -1);
dcomp.addDrawingObject(line);

//L 8800 50 8800 350 15 0 0 0 -1 -1
line = new DLine(de, 8800 +x, 50 + y, 8800 + x, 350 + y, 15, 0, 0, 0, -1, -1);
dcomp.addDrawingObject(line);

//L 7600 200 8800 200 15 0 0 0 -1 -1
line = new DLine(de, 7600 + x, 200 + y, 8800 + x, 200 + y, 15, 0, 0, 0, -1, -1);
dcomp.addDrawingObject(line);

return(dcomp);
}

function checkBus()
{
let sb = "";
let totalerrors = 0;
let totalwarnings = 0;
let kkk = ste.schematic.sheets.length;
let iii = 0;
while(iii < kkk)
{
  let sh = ste.schematic.sheets[iii];
  let oj = sh.DrawingObjects;
  let errors = 0;
  let warnings = 0;
  let o = null;
  let k = oj.length;
  let i = 0;
  while(i < k)
  {
    o = oj[i];
    if(o.klass == "DBus")
    {
      let name = getAttributeValue("busname", o);
      if(name == null) name = "unnamed";
      let L1 = getAttributeValue("L1", o);
      let L2 = getAttributeValue("L2", o);
      if((L1 != null) && (L2 != null))
      {
	sb += "Summary bus " + name + " is vector " + L1 + " downto " + L2 + " on sheet " + (iii + 1) + "\n";
      }
      else if(o.members.length == 0)
      {
	if((L1 == null) || (L2 == null))
	{
	sb += "Warning: Bus " + name + " has no members or limits on sheet " + (iii + 1) + "\n";
	warnings += 1;
	}
      }
      else
      {
	if((L1 != null) || (L2 != null))
	{
	  sb += "Warning: Bus " + name + " has members and a limit on sheet " + (iii + 1) + "\n";
	}
	sb += "Summary of bus " + name + "  on sheet " + (iii + 1) + "\n";
	let km = o.members.length;
	let j = 0;
	while(j < km)
	{
	  let nn = getAttributeValue("netname", o.members[j]);
	  sb += " \t" + nn + "\n";
	  j += 1;
	}
      }
    }
    i += 1;
  }
  iii += 1;
}
  let buses = ste.schematic.buses;
  let k = buses.length;
  let i = 0;
  while(i < k)
  {
    let L1 = getAttributeValue("L1", buses[i]);
    let L2 = getAttributeValue("L2", buses[i]);
    let kk = buses[i].members.length;
    if((L1 != null) && (L2 != null))
    {
      if(kk != 0) sb += "Error: Bus " + buses[i].busname + " has both limits " + L1 + " downto " + L2 + " and " + kk + "bus members.\n";
    }
    else if(kk == 0)
    {
      sb += "Error: Bus " + buses[i].busname + " has no members or limits attribute in schematic\n";
      totalerrors += 1;
    }
    if(kk != 0)
    {
      sb += buses[i].busname + " members = \n";
      let j = 0
      while(j < kk)
      {
	sb += " \t" + buses[i].members[j].netname + "\n";
	j += 1;
      }
    }
    i += 1;
  }
  return(sb);
}

function doCheckSheet(sarray)
{
let sb = "";
let gname = "";
let pname = "";
let date = new Date();
let totalerrors = 0;
let totalwarnings = 0;
let kkk = sarray.length;
let iii = 0;
while(iii < kkk)
{
  let fps = 0;
  let cps = 0;
  let sh = sarray[iii];
  let t = sh.getTitleSheet();
  sb += "\nCheck Sheet    " +  (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear().toString().substr(2,2);
  let stt =  getAttributeValue("designname", t);
  if(stt == null) stt = "";
  gname =  getAttributeValue("gnd_plane_signal", t);
  pname =  getAttributeValue("power_plane_signal", t);
  sb += "\n" + stt + "\n";
  sb += (iii +1) + ": " + getAttributeValue("sheetnumber", t) + "\n\n";
  let oj = sh.DrawingObjects;
  let errors = 0;
  let warnings = 0;
  if(stt.indexOf(" ") != -1)
  {
    sb += "Warning - designname should not have any spaces\n";
    warnings += 1;
  }
  sb += checkSheetRefs(sh);
  let o = null;
  let k = oj.length;
  let i = 0;
  while(i < k)
  {
    o = oj[i];
    if(o.klass == "DComponent")
    {
	let r = getAttributeValue("refdes", o);
	if(r.indexOf("?") != -1)
	{
	  sb += "Error: refdes has ? at " + o.getX() + ", " + o.getY() + " " + o.filename + "\n";
	  errors += 1;
	}
	if((r != null) && (r != ""))
	{
	  cps += 1;
	  let gh = getAttributeValue("footprint", o);
	  if((gh != null) && (gh != "")) fps += 1;
	}
	let stt = checkCompDupeNames(o, false);
	if(stt != "")
	{
	  sb += "Error: The symbol for " + r + " has duplicate port names.\n";
	  errors += 1;
	}
	let dev = getAttributeValue("device", o);
        if((dev != null) && (dev != ""))
        {
          if(dev.length >0)
          {
              let sz = dev.substring(0,1);
              if(!isNaN(sz)) 
              {
                  sb += "Error: device name starts with a numeric. " + dev + " " + r + "\n";
                  errors +=1;
              }
          }
        }
    }
    i+= 1; 
  }
  k = oj.length;
  i = 0;
  while(i < k)
  {
    o = oj[i];
    if(o.klass == "DComponent")
    {
    let hasOutputs = false;
	let pasorpwr = true;
	let r = getAttributeValue("refdes", o);
	let pins = o.getPins();
	let kk = pins.length;
	let ii = 0;
	while(ii < kk)
	{
	  let tpt = getAttributeValue("pintype", pins[ii]);
	  if((tpt == "out") || (tpt == "io") || (tpt == "inout") || (tpt == "pas")) hasOutputs = true;
	  if(!((tpt == "pas") || (tpt == "pwr"))) pasorpwr = false;
	  let s = pins[ii].connectedSignal;
	  if((s == null) || (s == "")) 
	  {
	    let c = "Comment: ";
	    let pinno = getAttributeValue("pinnumber", pins[ii]);
	    let pl = getAttributeValue("pinlabel", pins[ii]);
//	    sb += r + "-" + pinno + " " + pl + " has no connected signal\n";
	    let ncok = getAttributeValue("ncok", pins[ii]);
	    if((ncok == null) || (ncok == "") || (ncok == "false"))
	    {
	      warnings += 1;
	      c = "Warning: ";
	    }
	    if(pins[ii].pintype == 0) sb += c + r + "-" + pinno + " " + pl + " has no connected signal\n";
	    else sb += c + r + "-" + pinno + " " + pl + " has no connected bus\n";
	  }
	  else if(pins[ii].pintype == 1)
	  {
		let bs = ste.schematic.getBus(s);
		if(bs == null)
		{
		  let pinno = getAttributeValue("pinnumber", pins[ii]);
		  sb += "Error: " + r + "-" + pinno + " is a bus pin but connected signal " + s + " is not a bus.\n";
		  errors += 1;
		}
		else
		{
		  let bmembers = bs.members;
		  let k2 = bmembers.length;
		  let i2 = 0;
		  while(i2 < k2)
		  {
		   let bf = bmembers[i2];
		   let bn = o.getPinByName(bf.netname);
		   if(bn == null)
		   {
		     sb += "Warning: Bus " + bs.busname + " member " + bf.netname + " does not connect to a pin in " + getAttributeValue("refdes", o) + "\n";
		     warnings += 1;
		   }
		   i2 += 1;
		  }
		  let BL1 = getAttributeValue("L1", bs);
		  let BL2 = getAttributeValue("L2", bs);
		  if((BL1 != null) && (BL2 != null))
		  {
		    let sz = Number(BL1) - Number(BL2) + 1;
		    let os = getAttributeValue("size", pins[ii]);
		    if((os != null) && (sz != os))
		    {
		      if(isNaN(os))
		      {
			os = getAttributeValue(os, o);
		      }
		      if(sz != os)
		      {
			sb += "Error: Bus size is " + sz + " but pin size is " + os + " on " + r + "-" + getAttributeValue("pinlabel", pins[ii]) + "\n";
			errors += 1;
		      }
		    }
		    else if(os == null)
		    {
		      sb += "Error: Bus size is " + sz + " but no pin size specified on " + r + "-" + getAttributeValue("pinlabel", pins[ii]) + "\n";
		      errors += 1;
		    }
		  }
		}
		  
	    
	  }
	  ii += 1;
	}
    if((r != "") && (r.indexOf("J") != 0) && (r.indexOf("P") != 0) && (!hasOutputs) && (!pasorpwr))
    {
      sb += "Error: " + r + ":" + getAttributeValue("device", o) + " has no outputs.\n";
      errors += 1;
    }
   }
    i+= 1; 
  }
  iii += 1;
  sb += "Note: Of " + cps + " items with refdes, " + fps + " have footprints.\n";
  if(errors == 0) sb += "\n Check Sheet " + iii + " OK\n";
  else sb += "\nCheck Sheet " + iii + " has:\n" + errors + " errors.\n";
  if(warnings == 0) sb += "No warnings\n";
  else sb += warnings + " warnings.\n";
  totalerrors += errors;
  totalwarnings += warnings;
}
if(kkk > 1)
{
totalerrors += neterrors;
totalwarnings += netwarnings;
}
sb += "\n\nNote: attribute gnd_plane_signal = " + gname + "\n";
sb += "Note: attribute power_plane_signal = " + pname + "\n";
if(totalerrors == 0) sb += "\n\n Check Design OK\n";
else sb += "\n\nCheck Design has " + totalerrors + " errors.\n";
if(totalwarnings == 0) sb += "No warnings\n";
else sb += totalwarnings + " warnings.\n";
return(sb);
}

function makeConnector(de, NumberOfPins, direction, refdes)
{
let dc = new DComponent(de, 0, 0, 1, 0, 0, null);
setAttributeValue("refdes", dc, refdes);
let bScrewTerm = document.getElementById("cscrew").checked;
let v = [];
let x = 0;
let y = 0;
let width = 300;
let height = NumberOfPins * 200 + 100;
let whichend = 1;
let pinXoffset = 300;
let cxoffset = 70;
let refOffset = 50;
let NumOffset = 150;
let db = new DBox(de, x, y, width, height, GRAPHIC_COLOR, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
if(direction == 1)
{
  db.x = 200;
  db.update();
  pinXoffset = 0;
  whichend = 0;
  refOffset = 350;
  NumOffset = 250;
  cxoffset = 430;
//  db.x2 = 500;
  let g = "CONNECTOR_" + NumberOfPins + "L";
  setAttributeValue("device", dc, g);
  dc.filename = g + ".sym";
  dc.basename = dc.filename;
}
else
{
  dc.boxoffset = -50;
  db.x = 0;
//  db.x2 = 300;
  db.update();
  let g = "CONNECTOR_" + NumberOfPins + "R";
  setAttributeValue("device",dc, g);
  dc.filename = g + ".sym";
  dc.basename = dc.filename;
}
v[v.length] = db;
let k = 1;
let yp = NumberOfPins * 200 - 100;
let da = getAttribute("refdes", dc);
da.visibility = 1;
da.setX(refOffset);
da.setY(yp + 80);
while(k <= NumberOfPins)
{ 
  let dp = new DPin(de, pinXoffset, yp, pinXoffset + 200, yp, PIN_COLOR, 0, whichend, 8);
  setAttributeValue("pintype",dp, "in");
  setAttributeValue("pinnumber", dp, k);
  da = getAttribute("pinnumber", dp);
  da.visibility = 1;
  da.setX(NumOffset);
  da.setY(yp);
  setAttributeValue("pinseq", dp, k);
  da = getAttribute("pinseq", dp);
  da.visibility = 0;
  setAttributeValue("pinlabel",dp, "P" + k);
  da = getAttribute("pinlabel", dp);
  da.visibility = 0;
  v.push(dp);
  if(bScrewTerm)
  {
    let dg =  new DCircle(de, cxoffset, yp, 50, GRAPHIC_COLOR, 0, 0, 0, 0,0, 0, 0, 0,0, 0, 0);
    v.push(dg);
    dg = new DLine(de, cxoffset - 35, yp + 35, cxoffset + 35, yp -35, GRAPHIC_COLOR, 0, 0, 0, 0, 0);
    v.push(dg);
  }
  yp -= 200;
  k += 1;
}
dc.addDrawingObjects(v);
return(dc);
}

function makeDualRowHeader(de, NumberOfPins, type, refdes)
{  
let dc = new DComponent(de, 0, 0, 1, 0, 0, null);
setAttributeValue("refdes", dc, refdes);
dc.boxoffset = -50;
let bScrewTerm = document.getElementById("cscrew").checked;

let v = [];
let x = 0;
let y = 100;
let width = 350;
let height = NumberOfPins / 2 * 200 + 200;
let whichend = 1;
let whichendb = 1;
let refOffset = 50;
let NumOffset = 150;
let db = new DBox(de, x, y, width, height, GRAPHIC_COLOR, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
let gg = "R";
let pinXoffseto1 = 300; // 500
let pinXoffseto2 = 500; // 300
let pinXoffsete1 = 300; // 500
let pinXoffsete2 = 500; // 300
let pin1Yoffset = 100;
let pin2yoffset = 0;
let p1xoffset = 100; // -100
let p2xoffset = 100; // -100
if(type == 1) 
{
  gg = "L";
  pinXoffseto1 = -200;
  pinXoffseto2 = 50;
  pinXoffsete1 = -200;
  pinXoffsete2 = 50;
  pin1Yoffset = 0;
  pin2yoffset = -100;
  p1xoffset = 100;
  p2xoffset = 100;
  whichend = 0;
  whichendb = 0;
}
else if(type == 2) 
{
  gg = "B";
  pinXoffseto1 = -200; // -200
  pinXoffseto2 = 50; // 50
  pinXoffsete1 = 300;  // 500
  pinXoffsete2 = 500;  // 300
  pin1Yoffset = 0;
  pin2yoffset = 0;
  p1xoffset = 100;
  whichend = 0;
  whichendb = 1;
}
let g = "HEADER_" + NumberOfPins + "_" + gg;
setAttributeValue("device", dc, g);
dc.filename = (g + ".sym");
dc.basename = dc.filename;
v[v.length] = db;
let da = getAttribute("refdes", dc);
da.visibility = 1;
let k = 1;
let yp = NumberOfPins / 2 * 200 + 100;
while(k <= NumberOfPins)
{ 
  let c1 = new DCircle(de, 100, yp, 50, GRAPHIC_COLOR, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  let c2 = new DCircle(de, 250, yp, 50, GRAPHIC_COLOR, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  v.push(c1);
  v.push(c2);
  if(bScrewTerm)
  {
    let dg = new DLine(de, 100 - 35, yp + 35, 100 + 35, yp -35, GRAPHIC_COLOR, 0, 0, 0, 0, 0);
    v.push(dg);
    dg = new DLine(de, 250 - 35, yp + 35, 250 + 35, yp -35, GRAPHIC_COLOR, 0, 0, 0, 0, 0);
    v.push(dg);
  }
  let dp1 = new DPin(de, pinXoffseto1, yp + pin1Yoffset, pinXoffseto2, yp + pin1Yoffset, PIN_COLOR, 0, whichend, 8);
  let dp2 = new DPin(de, pinXoffsete1, yp + pin2yoffset, pinXoffsete2, yp + pin2yoffset, PIN_COLOR, 0, whichendb, 8);
  setAttributeValue("pintype", dp1, "in");
  setAttributeValue("pinnumber", dp1, k);
  da = getAttribute("pinnumber", dp1);
  da.visibility = 1; 
  da.x = (da.x + p1xoffset);
  da.y = (yp + pin1Yoffset);
  setAttributeValue("pinseq", dp1, k);
  da = getAttribute("pinseq", dp1);
  da.visibility = 0; 
  setAttributeValue("pinlabel", dp1, "P" + k);
  da = getAttribute("pinlabel", dp1);
  da.visibility = 0;
  v[v.length] = dp1;
			
  setAttributeValue("pintype", dp2, "in");
  setAttributeValue("pinnumber", dp2, (k + 1));
  da = getAttribute("pinnumber", dp2);
  da.visibility = 1; 
  da.x = (da.x + p2xoffset);
  da.y = (yp + pin2yoffset);
  setAttributeValue("pinseq", dp2, (k + 1));
  da = getAttribute("pinseq", dp2);
  da.visibility = 0;
  setAttributeValue("pinlabel", dp2, "P" + (k + 1));
  da = getAttribute("pinlabel", dp2);
  da.visibility = 0;
  v[v.length] = dp2;
  if(type == 0) 
  {
    let dl = new DLine(de, pinXoffseto1, yp + pin1Yoffset, pinXoffseto1 -100, yp + pin1Yoffset,GRAPHIC_COLOR, 1, 0, 0, 0, 0);
    v[v.length] = dl;
    dl = new DLine(de, pinXoffseto1 -100, yp + pin1Yoffset, pinXoffseto1 -150, yp + pin1Yoffset -50,GRAPHIC_COLOR, 1, 0, 0, 0, 0);
    v[v.length] = dl;
  }
  else if(type == 1) 
  {
    let dl = new DLine(de, pinXoffsete2, yp + pin2yoffset, pinXoffsete2 +100, yp + pin2yoffset,GRAPHIC_COLOR, 1, 0, 0, 0, 0);
    v[v.length] = dl;
    dl = new DLine(de, pinXoffsete2 +100, yp + pin2yoffset, pinXoffsete2 +150, yp + pin2yoffset +50 ,GRAPHIC_COLOR, 1, 0, 0, 0, 0);
    v[v.length] = dl;
  }
  yp -= 200;
  k += 2;
}
dc.addDrawingObjects(v);
return(dc);
}

function makeBlockSymbol(de, NumPinsLeft, NumPinsRight, Reverse, NumPinsTop, NumPinsBottom, minWidth,  minHeight, refdes, device, spacing, start)
{
let half = (spacing == 100);
let dc = new DComponent(de, 0, 0, 1, 0, 0, null);
setAttributeValue("refdes", dc, refdes);
let da = getAttribute("refdes", dc);
da.visibility = 1; 
setAttributeValue("device", dc, device);
da = getAttribute("device", dc);
da.visibility = 1;
			
let v = [];
let x = 0;
let y = 0;
let width = minWidth;
let w = NumPinsBottom * spacing + 200;
if(w > width) width = w;
w= NumPinsTop * spacing + 200;
if(w > width) width = w;
let height = minHeight;
let h = NumPinsLeft * spacing + 200;
if(h > height) height = h;
h = NumPinsRight * spacing + 200;
if(h > height) height = h;
let whichend = 0;
let pinXoffset = 0;
let refOffset = 50;
let NumOffset = 200;
let db = new DBox(de, x, y, width, height, GRAPHIC_COLOR, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
db.x = 200;
//db.setX2(200 + width);
db.y = 200; // + height;
//db.setY2(100);
let yp = height;
da = getAttribute("refdes", dc);
da.x = (200 + width/2);
da.y = (height - 100);
da = getAttribute("device", dc);
da.x = (100 + width/2);
da.y = (height - 300);
da.visibility = 1;
db.update();
let k = Number(start);
let z = NumPinsLeft + start - 1;
//set left pins
while(k <= z)
{ 
  let dp = new DPin(de, pinXoffset, yp, pinXoffset + 200, yp, PIN_COLOR, 0, whichend, 8);
  setAttributeValue("pintype", dp, "in");
  setAttributeValue("pinseq", dp, k);
  setAttributeValue("pinlabel", dp, "P" + k);
  setAttributeValue("pinnumber",dp, k);
  da = getAttribute("pinnumber", dp);
  da.visibility = 1;
  if(half)
  {
    adjustPinSize(dp, 4);
  }
  da.y = (yp);
  da.x = 50;
//  da.setOffsetX(50);
  da = getAttribute("pinlabel", dp);
  da.x = 250;
//  da.setOffsetX(250);
  v[v.length] = dp;
  yp -= spacing;
  k += 1;
}
// set bottom pins
pinXoffset = 400;
yp = height + 400;
whichend = 1;
z +=  NumPinsBottom;
while(k <= z)
  { 
    let dp = new DPin(de, pinXoffset, 200, pinXoffset, 0, PIN_COLOR, 0, whichend, 8);
    setAttributeValue("pinseq", dp, k);
    setAttributeValue("pinlabel",dp, "P" + k);
    setAttributeValue("pinnumber", dp, k);
    da = getAttribute("pinnumber", dp);
    if(half)
    {
      adjustPinSize(dp, 4);
    }
    da.visibility = 1;
//			da.setX(NumOffset);
    da.y = 100;
//    da.setOffsetY(-100);
    da = getAttribute("pinlabel", dp);
    da.y = 250;
//    da.setOffsetY(50);
    v[v.length] = dp;
    pinXoffset += spacing;
    k += 1;
  }

// set right pins
pinXoffset = 200 + width;
yp = height;
whichend = 1;
let zold = z;
z += NumPinsRight;
let kk = 0;
while(k <= z)
{ 
  if(Reverse) kk = z + 1 + zold - k;
  else kk = k;
  let dp = new DPin(de, pinXoffset, yp, pinXoffset + 200, yp, PIN_COLOR, 0, whichend, 8);
  setAttributeValue("pinseq", dp, kk);
  setAttributeValue("pinlabel", dp, "P" + kk);
  setAttributeValue("pinnumber",dp, kk);
  da = getAttribute("pinnumber", dp);
  da.visibility = 1;
  if(half)
  {
    adjustPinSize(dp, 4);
  }
  da.y = (yp);
  da = getAttribute("pinlabel", dp);
//  da.setAlignment(6);
  da.x = da.x - 200;
//  da.setOffsetX(100);
  v[v.length] = dp;
  yp -= spacing;
  k += 1;
}
// set top pins
pinXoffset = 400;
yp = height + 400;
whichend = 1;
zold = z;
z += NumPinsTop;
while(k <= z)
{ 
  if(Reverse) kk = z + 1 + zold - k;
  else kk = k;
  let dp = new DPin(de, pinXoffset, yp-200, pinXoffset, yp, PIN_COLOR, 0, whichend, 8);
  setAttributeValue("pinseq", dp, kk);
  setAttributeValue("pinlabel", dp, "P" + kk);
  setAttributeValue("pinnumber", dp, kk);
  da = getAttribute("pinnumber", dp);
  da.visibility= 1;
  if(half)
  {
    adjustPinSize(dp, 4);
  }
//			da.setX(NumOffset);
  da.y = (yp- 200);
  da = getAttribute("pinlabel" , dp);
  da.y = yp -300;
//  da.setOffsetY(-100);
  v[v.length] = dp;
  pinXoffset += spacing;
  k += 1;
}
		
v[v.length] = db;
dc.addDrawingObjects(v);
return(dc);
}

function adjustPinSize(dp, size)
{
getAttribute("pinlabel", dp).size = size;
getAttribute("pinnumber", dp).size = size;
}

function makeSymbolFromGroup(de, vd, xx, yy, device, refdes)
{
let dcomp = null;
let seq = 1;
let xmin = xx;
let ymin = yy;
let xmax = 0;
let ymax = 0;
let doj = []
let k = vd.length;
if(k > 0)
{
  let i = 0;
  while(i < k)
  {  
    let d = vd[i];
    let oname = d.klass;
    if((oname == "DNet") || (oname == "DBus") || (oname == "DComponent"))
    {
    }
    else
    {
      doj[doj.length] = d;
      sheet.removeDrawingObject(d);
    }
    i += 1;
  }
  i = 0;
  k = doj.length;
  while(i < k)
  {
    let d = doj[i];
    {
      let x = d.x;
      let y = d.y;
      if(x != 0)
      {
	if(x < xmin) xmin = x;
	if(x > xmax) xmax = x;
      }
      if(y < ymin) ymin = y;
      if(y > ymax) ymax = y;
    }
    i += 1;
  }
				
  dcomp = new DComponent(de, xx, yy, 1, 0, 0, device);
  setAttributeValue("device", dcomp, device);
  let df = getAttribute("device", dcomp);
  df.y = -150;
  df.x = 0;
  df.visibility = 1;
  setAttributeValue("refdes", dcomp, refdes);
  df = getAttribute("refdes", dcomp);
  df.visibility = 1;
  df.y = 0;
  df.x = 0;
  k = doj.length;
  i = 0;
  while(i < k)
  {
    let d = doj[i];
    {
      d.setX(d.getX() - xx);
      d.setY(d.getY() - yy);
      if(d.klass == "DAttribute")
      {
	addAttribute(d, dcomp);
      }
      if(d.klass == "DPin")
      {
	setAttributeValue("pinseq", d, seq);
	let pn = getAttributeValue("pinnumber", d);
	if((pn == null) || (pn == "") || (pn == "0"))
	{
	  setAttributeValue("pinnumber", d, seq);							
	}
	pn = getAttributeValue("pinlabel", d);
	if((pn == null) || (pn == ""))
	{
	  setAttributeValue("pinlabel",d, "P_" + seq);							
	}
	seq += 1;
	d.updateAttributeLocations();
      }
      d.update();
    }
    i += 1;
  }
  dcomp.update();
  dcomp.addDrawingObjects(doj);
}

return(dcomp); 
}

function ungroup(sh, d)
{
let x = d.getX();
let y = d.getY();
sh.removeDrawingObject(d);
let v = d.doj;
let k = v.length;
let i = 0;
while(i < k)
{
  let dd = v[i];
  dd.parent = null;
  let newx = x + dd.getX();
  let newy = y + dd.getY();
  dd.setX(newx);
  dd.setY(newy);
  dd.selectable = 1;
  if(dd.klass == "DPin")
  {
    let a = dd.attributes;
    let kk = a.length;
    let j = 0;
    for(j = 0; j<kk; j++)
    {
      a[j].setX(a[j].getX() + x);
      a[j].setY(a[j].getY() + y);
    }
  }
  sh.addDrawingObject(dd);
  i += 1;
}
		
}
 

function StringPair(parameter, value)
{
  this.parameter = parameter;
  this.value = value;
}

function addStringPair(sp, vsp)
{
 let k = vsp.length;
 let i = 0;
 let b = true;
 let spp = sp.parameter;
 let spv = sp.value;
 while(b && (i < k))
 {
  let x = vsp[i];
  if(x.parameter == spp)
  {
    if(x.value == spv)
    {
      b = false;
    }
  }
  i += 1;
 }
 if(b) vsp[vsp.length] = sp;
}

function getComponents()
{
let vsp = [];
let k = ste.getSchematic().sheets.length;
let i = 0;
while(i < k)
{
  let sh = ste.getSchematic().sheets[i];
  let vdj = sh.DrawingObjects;
  let kk = vdj.length;
  let j = 0;
  while(j < kk)
  {
    let dc = vdj[j];
    if(dc.klass == "DComponent")
    {
      let refdes = getAttributeValue("refdes", dc);
      let device = getAttributeValue("device", dc);
      let partid = getAttributeValue("partid", dc);
      if( (refdes != null) && (device != null) && (refdes.length > 1) && (device.length > 1))
      {
	refdes = fixRefdes(refdes);
	device = fixVhdlName(device, refdes + "_" );
	if(partid != null) device = partid;
	let sp = new StringPair(device, refdes);
	vsp[vsp.length] = sp;
      }
    }  
    j += 1;
  }
  i += 1;
}
vsp.sort(function(a,b) {return(a.parameter.localeCompare(b.parameter)); });
return(vsp);  
}

function makeBOM()
{
let date = new Date();
let dt = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear().toString().substr(2,2);
let tsheet = sheet.getTitleSheet();
let sb = "// Bill of Materials " + getAttributeValue("designname", tsheet) + " " + dt + "\n\n";
let company = getAttributeValue("company",tsheet);
if(company != null) sb += "// " + company + "\n";
let author = getAttributeValue("author", tsheet);
if(author != null) sb += "// " + author + "\n";
let copyright = getAttributeValue("copyright", tsheet);
if(copyright != null) sb += "// " + copyright + "\n";
		
let vsp = [];
let k = ste.getSchematic().sheets.length;
let i = 0;
while(i < k)
{
  let sh = ste.getSchematic().sheets[i];
  let vdj = sh.DrawingObjects;
  let kk = vdj.length;
  let j = 0;
  while(j < kk)
  {
    let dc = vdj[j];
    if(dc.klass == "DComponent")
    {
      let refdes = getAttributeValue("refdes", dc);
      let device = getAttributeValue("device", dc);
      let partid = getAttributeValue("partid", dc);
      let vl = getAttributeValue("value", dc);
      let desc = getAttributeValue("description", dc);
      if( (refdes != null) && (device != null) && (refdes.length > 1) && (device.length > 1))
      {
	refdes = fixRefdes(refdes);
	let des = fixVhdlName(device, refdes + "_" );
        device = des;
	if(partid != null) device = partid;
	let sp = new StringPair(device, refdes);
	let fp = getAttributeValue("footprint", dc);
        sp.footprint = fp;
        if(partid == null) partid = "";
        sp.partid = partid;
        sp.device = des;
        if(vl == null) vl = "";
        sp.vl = vl;
        if(desc == null) desc = "";
        sp.description = desc;
	if(fp == null) fp = "";
	sp.fp = fp;
        sp.symbol = dc.filename;
//	report("-- " + fp + " " + sp.fp);
	vsp[vsp.length] = sp;
      }
    }  
    j += 1;
  }
  i += 1;
}
vsp.sort(function(a,b) {return(a.parameter.localeCompare(b.parameter)); });
let qty = 0;
let s = null;
let ss = null;
let ref = null;
let symbol = "";
let description = "";
let bomfp = document.getElementById("bomfp").checked;
if(!bomfp)sb += "\nQTY \tPART ID (DEVICE) \tREFERENCES\n";
else sb += "\nQTY \tPART ID (DEVICE) \tREFERENCES \tFOOTPRINT\n";
let spfp = "";
let sp = null;
let lastsp = null;
k = vsp.length;
i = 0;
while(i < k)
{
  lastsp = sp;
  sp = vsp[i];
  let n = sp.parameter;
  if(s == null)
  {
    s = n;
    qty += 1;
    ss = sp.value;
    spfp = sp.fp;
    ref = ss;
  }
  else if(s == n)
  {
    let g = sp.value;
    if(!(ref == g))
    {
      qty += 1;
      ss = ss + ", " + g;
    }
    ref = g;
  }
  else
  {
    if(!bomfp) sb += qty + " \t" + paddedString(s, 25) + " " + ss + "\n";
    else
    {
      sb += qty + " \t" + paddedString(s, 25) + " " + ss + "\t\t" + spfp + "\n";
      BOMArray[BOMArray.length] = new BOMElement(lastsp.partid, qty, ss, lastsp.device, lastsp.vl, lastsp.fp, lastsp.symbol, lastsp.description);
    }
    s = n;
    qty = 1;
    ss = sp.value;
    spfp = sp.fp;
    ref = ss;
  }
  i += 1;
}
if(s != null)
{
  if(!bomfp) sb += qty + " \t" + paddedString(s,25) + " " + ss + "\n";	
  else sb += qty + " \t" + paddedString(s, 25) + " " + ss + "\t\t" + spfp + "\n";
  BOMArray[BOMArray.length] = new BOMElement(lastsp.partid, qty, ss, lastsp.device, lastsp.vl, lastsp.fp, lastsp.symbol, lastsp.description);
}
return(sb);		
}

let BOMArray = [];
function BOMElement(partid, qty, refs, device, value, footprint, symbol, description)
{
  this.partid = partid;
  this.qty = qty;
  this.refs = refs;
  this.device = device;
  this.value = value;
  this.footprint = footprint;
  this.symbol = symbol;
  this.description = description;
}

function paddedString(s, k)
{
let sb = s;
let z = k - s.length;
while(z > 0)
{
  sb += " ";
  z -= 1;
}
return(sb);
}

function updateBuses()
{
clearArray(ste.schematic.buses);
let kk = ste.schematic.sheets.length;
let ii = 0;
while(ii < kk)
{
  let sheetn = ii + 1;
  let sh = ste.schematic.sheets[ii];
  let vdj = sh.DrawingObjects;
  let k = vdj.length;
  let i = 0;
  while(i < k)
  {
    let o = vdj[i];
    if(o.klass == "DBus")
    {
      let bus = ste.schematic.addDBus(o);
      let xx = o.x1;
      let yy = o.y1;
      let name = getAttributeValue("busname", o);
      let vdo = sh.getObjectsAt(xx, yy);
      let vl = vdo.length;
      let bo = 0;
      let bxx = 0;
      while(bxx < vl)
      {
	let obj = vdo[bxx];
	if((obj.klass == "DPin") && (obj.pintype == 1)) 
	{
	  obj.connectedSignal = name;
	  let sz = getAttributeValue("size", obj);
	  report("updateBuses " + name + " size = " + sz);
	  if(sz != null)
	  {
	    let bsz = getAttributeValue("size", bus);
	    if(bsz == null) 
	    {
	      report("got here 34");
	      setAttributeValue("size", bus, sz);
	    }
	    else if(Number(bsz) < Number(sz)) 
	    {
	      report("got here 35");
	      setAttributeValue("size", bus, sz);
	    }
	    else report("got here 36");
	  }
	}
	bxx += 1;
      }
      let xx2 = o.x2;
      let yy2 = o.y2;
      vdo = sh.getObjectsAt(xx2, yy2);
      ko = vdo.length;
      bxx = 0;
      while(bxx < ko)
      {
	let obj = vdo[bxx];
	if((obj.klass == "DPin") && (obj.pintype == 1)) obj.connectedSignal = name;
	bxx += 1;
      }

    }
    i += 1;
  }
  ii += 1;
}
}

let neterrors = 0;
let netwarnings = 0;
function updateNetConnections()
{
report("updateNetConnections");
return(updateNetConnections1());
}

function updateNetConnections1()
{
report("updateNetConnections1");
sheet.clearJunctions();
ste.schematic.clearNets();
neterrors = 0;
netwarnings = 0;
let sb = "";
let newnets = [];
let sp = [];
let kk = ste.schematic.sheets.length;
let ii = 0;
while(ii < kk)
{
  let sheetn = ii + 1;
  let sh = ste.schematic.sheets[ii];
  let vdj = sh.DrawingObjects;
  let k = vdj.length;
  // first pass updates components
  let i = 0;
  while(i < k)
  {
    let o = vdj[i];
    if(o.klass == "DComponent") o.update();
    i += 1;
  }
  i = 0;
  
  // next pass connects nets to pins  
  while(i < k)
  {
    let o = vdj[i];
    let renamesp = null;
    if(typeof o !== 'undefined')
    {
    if(o.klass == "DNet")
    {
      let name = getAttributeValue("netname", o);
      if(name == null) ; //vdj.splice(i, 1);
      else
      {
      ste.schematic.addNet(o);
      let dn = o;
      let xx = dn.x1;
      let yy = dn.y1;
      let name = getAttributeValue("netname", dn);
      let vdo = sh.getObjectsAt(xx, yy);
      let vl = vdo.length;
      let bo = 0;
      let bxx = 0;
      while(bxx < vl)
      {
	if(vdo[bxx].klass == "DBus") 
	{
	  vdo[bxx].addMember(o);
	  bo += 1;
	}
	bxx += 1;
      }
      vl -= bo;
//      report("objects at " + xx + " " + yy + " = " + vl);
      if(vl < 2) 
      {
	neterrors += 1;;
	sb += "Net " + name + " on sheet " + sheetn + " has only " + vl + " connections at " + xx + ", " + yy + "\n";
	report("Net " + name + " on sheet " + sheetn + " has only " + vl + " connections at " + xx + ", " + yy );
      }
      let xx2 = dn.x2;
      let yy2 = dn.y2;
      let oo = sh.getObjectsAt(xx2, yy2);
      bo = 0;
      bxx = 0;
      while(bxx < oo.length)
      {
	if(oo[bxx].klass == "DBus") 
	{
	  oo[bxx].addMember(o);
	  bo += 1;
	}
	bxx += 1;
      }
      vl -= bo;
     
      addAll(sh.getObjectsAt(xx2, yy2), vdo);
      if(vdo.length < vl+2)
      {
	neterrors += 1;;
	vl = vdo.length - vl;
	sb += "Net " + name + " on sheet " + sheetn + " has only " + vl + " connections at " + xx + ", " + yy + "\n";
	report("Net " + name + " on sheet " + sheetn + " has only " + vl + " connections at " + xx + ", " + yy );
      }
      
//      let xvdo = sh.getExactObjectsAt(xx, yy);
//      addAll(sh.getObjectsAt(xx2, yy2), xvdo);
//      vdo = xvdo;
      let ko = vdo.length;
//      report("ko = " + ko + ", xvdo = " + xvdo.length);
      let io = 0;
      while(io < ko)
      { 
	let obj = vdo[io];
//	report(obj.klass);
	if((obj.klass == "DPin") && (obj.pintype == 1))
	{
	      report("error Net cannot connect to Bus Pin at " + xx + ", " + yy );
	      sb += "Net error: Net cannot connect to Bus Pin at " + xx + ", " + yy + "\n";
	      neterrors += 1;	      
	}
	else if(obj.klass == "DPin")
	{
	let dp = obj;
	let pname = dp.connectedSignal;
//	report("unc " + pname);
	if((pname != null) && (pname != ""))
	{
	  if(name == pname)
	  {
	  // ok
	  }
	  else if((name.indexOf("N_") == 0) && (!(name == pname)))
	  {
	    report("renameNet on " + (ii + 1) + " " + name + " as " + pname);
	    sb += "renamed Net " + name + " as " + pname + "\n";
//	    sp[sp.length] = new StringPair(name, pname);
	    if((renamesp != null) && (renamesp.value != pname)) // then error
	    {
	      let pt = dp.parent;
	      let refdes = getAttributeValue("refdes", pt);
	      let pn = getAttributeValue("pinnumber", dp); // was pt
	      report("error " + refdes + "-" + pn + " pin is " + pname + ", net is " + name);
	      sb += "Net error a " + refdes + "-" + pn + " pin is " + pname + ", net is " + name + "\n";
	      neterrors += 1;	      
	    }
	    else 
	    {
	      renamesp = new StringPair(name, pname);
	    }
	  }
	  else if(pname.indexOf("N_") == 0) 
	  {
	    dp.connectedSignal = name;
	  }
	  else
	  {
	    let pt = dp.parent;
	    let refdes = getAttributeValue("refdes", pt);
	    let pn = getAttributeValue("pinnumber", dp);
	    report("error " + dp.klass + " "   + refdes + "-" + pn + " pin is " + pname + ", net is " + name);
	    sb += "Net error b " + dp.klass + " "  + refdes + "-" + pn + " pin is " + pname + ", net is " + name + "\n";
	    neterrors += 1;
	  }
	}
	else
	{
	  dp.connectedSignal = name;
	}
	}
	if(obj.klass == "DNet")
	{
	  let dz = obj;
	  let pname = getAttributeValue("netname", dz);
	  if(pname != null)
	  {
	    if(name == pname)
	    {
		// ok
	    }
	    else if((name.indexOf("N_") == 0) && (!(name == pname)))
	    {
	      report("renameNet " + name + " as " + pname);
	      sp[sp.length] = new StringPair(name, pname);
	    }
	    else
	    {
	      report("error " + " net " + pname + " joins net " + name);
	      sb += "Net error " + " net " + pname + " joins net " + name + "\n";
	      neterrors += 1;;
	    }
	  }
	  else
	  {
	    setAttributeValue("netname", dz, name); //
	  }
	}
	io += 1;
	}
      }
    }
    if(renamesp != null) sp[sp.length] = renamesp;
    }
    i += 1;
  }
//  report("renameNets:");			
  renameNets(sp);
//  clearArray(ste.schematic.nets);
  k = vdj.length;
  i = 0;
  while(i < k)
  {
    let o = vdj[i];
    if(o.klass == "DComponent")
    {
      let dc = o;
      let pinb = dc.getPins();
      let ko = pinb.length;
      let io = 0;
      while(io < ko) 
      {
	let dp = pinb[io];
	let n = dp.connectedSignal;
	if(dp.netpin == false)
	{
	let bg = getAttributeValue("labelissignal", dp);
	if(bg == "true")
	{
	  n = getAttributeValue("pinlabel", dp);
//	  report("uncx labelissignal " + n);
	  dp.connectedSignal = n;
	}
	
	if((n != null) && (!(n == "")) && (!(n == "null")) && (dp.pintype == 0))
	{
	  let ot = ste.schematic.getNet(n);
	  let nt = new Net(n);
	  if(ot != null)
	  {
	    let netcomment = ot.comment;
	    if((netcomment != null) && (!(netcomment == "")) && (!(netcomment == "null")))
	    {
	      nt.comment = netcomment;
	    }
	  }
	  let zz = ste.schematic.findNetIn(n, newnets);
	  if(zz == null) newnets[newnets.length] = nt;
	  ste.schematic.addNet(nt);
	}
//	else  // if no connectedSignal
	{
	  // fix for rotated components
	  let xx = dp.x1;
	  let yy = dp.y1;
	  if(dp.whichend == 1)
	  {
	    xx = dp.x2;
	    yy = dp.y2;
	  }
	  let w = new PointI(xx, yy);
	  let q = dp.parent.morph2(w);
	  xx = q.x + dp.parent.getX();
	  yy = q.y + dp.parent.getY();
	  
	  let vdo = sh.getObjectsAt(xx, yy);
//	  report("unc " + getAttributeValue("pinlabel", dp) + " " + getAttributeValue("pinnumber", dp) + " " + getAttributeValue("refdes", dp.parent) + " vdo length " + vdo.length + " xx = " + xx + ", yy = " + yy + " " + dp.connectedSignal);
				
	  //TODO
	  if((vdo.length > 2) && (vdo.length <= 4))
	  {
/*	    if(vdo.length == 2)
	    {
	      report("vdo0 = " + getAttributeValue("device", vdo[0].parent) + " " + vdo[0].klass + " " + getAttributeValue("pinnumber", vdo[0]));
	      report("vdo1 = " + getAttributeValue("device", vdo[1].parent) + " " + vdo[1].klass + " " + getAttributeValue("pinnumber", vdo[1]));
	    }
	    */
	    let p = null;
	    let bx = false;
	    let kp = vdo.length;
	    let ip = 0;
	    while((ip < kp) && !bx)
	    {
	      let h = vdo[ip];
	      if(h.klass == "DNet")
	      {
//		report("unc net " + getAttributeValue("netname", h) + " " + h.isEndPoint(xx, yy));
		if(h.isEndPoint(xx, yy)) 
		{
		  dp.connectedSignal = getAttributeValue("netname", h);
		  bx = true;
		}
	      }
	      if(h.klass == "DPin")
	      {
		if(dp != h)
		{
		  p = h;
		  let g = p.connectedSignal;
		  let bg = getAttributeValue("labelissignal", p);
		  if(bg == "true")
		  {
		    n = getAttributeValue("pinlabel", p);
//		    report("unc labelissignal2 " + n + " " + getAttributeValue("refdes", p.parent));
		    if(n != "NC")
		    {
		      p.connectedSignal = n;
		      dp.connectedSignal = n;
		      bx = true;
		    }
		  }
		  else if(g != null)
		  {
		    dp.connectedSignal = g;
		    bx = true;
		  }
//		  bx = true;
		}
	      }
	      ip += 1;
	    }
	    if(!bx && (vdo.length > 1))
	    {
	     let CurrentNetName = ste.schematic.getNewNetName();
//	     report(vdo.length + "unc ncb " + getAttributeValue("pinlabel", dp) + " " + getAttributeValue("pinnumber", dp) + " " + getAttributeValue("refdes", dp.parent) + " " + CurrentNetName ); 
             report("created 1586 " + CurrentNetName + " vdo.length = " + vdo.length);
	     let nn = new DNet(de, xx, yy, xx + 1, yy + 1, NET_COLOR);
	     setAttributeValue("netname", nn, CurrentNetName);
	     dp.connectedSignal = CurrentNetName;
	     sheet.setNodeNetName(CurrentNetName, xx, yy);
	    }
	  }
	   let kp = vdo.length;
	   let ip = 0;
	   while(ip < kp)
	    {
	      let d = vdo[ip];
	      if(d.klass == "DPin")
	      {
		let p = d;
		if((p != dp) && (p.connectedSignal == null))
		{
		}
		else if((p != dp) && (dp.connectedSignal == null))
		{
		  let dev = getAttributeValue("device", dc);
		  {
		    let pu = p.connectedSignal;
		    if(pu != null)
		    {
		      dp.connectedSignal = pu;
		      if((dev == "VHDL_INPUT_PORT")|| (dev == "VHDL_INOUT_PORT") || (dev == "VHDL_OUTPUT_PORT"))
		      {
			setAttributeValue("pinlabel", dp, pu);
		      }
		    }
		  }
		  
		}
	      }
	      ip += 1;
	    }
	  }
	}
	io += 1;		
	}
    }
    else if(o.klass == "DNet")
    {
      let dn = o;
      let n = getAttributeValue("netname", dn);
      if(n != null) 
      {
	let net = ste.schematic.getNet(n);
	if(net == null) net = new Net(n);
	let c = getAttributeValue("netcomment", dn);
	if((c != null) && (!(c == "")) && (!(c == "null")))
	{
	  net.comment = c;
	}
	let zz = ste.schematic.findNetIn(n, newnets);
	if(zz == null) newnets[newnets.length] = net;
	ste.schematic.addNet(net);
      }
      else 
      {
	report("Schematic unc net has no netname");
	sb += "net has no netname\n";
        report("1851 dn.klass = " + dn.klass);
//	dn.setColorIndex(SELECT_COLOR);
	dn.setSelected(true);
      }
  }
      i += 1;
    }
    ii += 1;
  }
  clearArray(ste.schematic.nets);
  newnets.sort(function(a,b) {return(a.netname.localeCompare(b.netname)); });
  ste.schematic.nets = newnets;
updateBuses();
return(sb);
}

function PointI(x, y)
{
  this.x = Number(x);
  this.y = Number(y);
}

function renameNets(vsp)
{
let k = vsp.length;
let i = 0;
while(i < k)
{
  let p = vsp[i];
  renameNet(p.parameter, p.value);
  i += 1;
}
}

function renameNet(origname, newname)
{
let th = ste.schematic;
report("Schematic renameNet :" + origname + ": :" + newname + ":");
let n = th.getNet(origname);
if(n != null)
{
  n.netname = newname;
}
{
  let vss = th.sheets;
  let kk = vss.length;
  let ii = 0;
  while(ii < kk)
  {
    let sh = vss[ii];
    let vdj = sh.DrawingObjects;
    let k = vdj.length;
			
    let ko = vdj.length;
    let io = 0;
    while(io < ko)
    {
      let o = vdj[io];
      if(o.klass == "DNet")
      {
	let dn = o;
	let name = getAttributeValue("netname", dn);
	if(name == origname)
	{
	  setAttributeValue("netname", dn, newname);
	  let xx = dn.x1;
	  let yy = dn.y1;
	  let vdo = sh.getObjectsAt(xx, yy);
	  let xx2 = dn.x2;
	  let yy2 = dn.y2;
	  addAll(sh.getObjectsAt(xx2, yy2), vdo);
					
	  let kx = vdo.length;
	  let ix = 0;
	  while(ix < kx)
	  {
	    let obj = vdo[ix];
	    if(obj.klass == "DPin")
	    {
	    let dp = obj;
	    let pname = dp.connectedSignal;
	    if(pname != null)
	    {
	      if(pname == newname)
	      {
	      }
	      else if(pname == origname)
	      {
		dp.connectedSignal = newname;									
	      }
	      else
	      {
		let pu = dp.parent;
		let refdes = getAttributeValue("refdes", pu);
		let pn = getAttributeValue("pinnumber", dp);
		report("Schematic rename error " + refdes + "-" + pn + " pin is " + pname + ", net is " + name);
	      }
	    }
	    else
	    {
	      dp.connectedSignal = newname;
	    }
	    } 
	    ix += 1;
	} // while
      } // end if	
    } // end if
  io += 1;
  } // end while
ii += 1;
} // end while
} // if
}


function renameNetSegment(dn, origname, newname1)
{
  let newname = newname1;
  if(document.getElementById("uav").checked) newname = newname1.toUpperCase();
  let name = getAttributeValue("netname", dn);
  if(origname != newname)
  {
  setAttributeValue("netname", dn, newname);
  let xx = dn.x1;
  let yy = dn.y1;
  let vdo = sheet.getObjectsAt(xx, yy);
  let xx2 = dn.x2;
  let yy2 = dn.y2;
  addAll(sheet.getObjectsAt(xx2, yy2), vdo);
  let kx = vdo.length;
  let ix = 0;
  while(ix < kx)
  {
    let obj = vdo[ix];
    if((obj.klass == "DNet") && ( obj.klass != dn))
    {
      let n = getAttributeValue("netname", obj);
      if(n != newname) renameNetSegment(obj, origname, newname);
    }
    else if(obj.klass == "DPin")
    {
      let dp = obj;
      let pname = dp.connectedSignal;
      if(pname != null)
      {
	if(pname == newname)
	{
	}
	else if(pname == origname)
	{
	  dp.connectedSignal = newname;									
	}
	else
	{
	  let pu = dp.parent;
	  let refdes = getAttributeValue("refdes", pu);
	  let pn = getAttributeValue("pinnumber", dp);
	  report("Schematic rename error " + refdes + "-" + pn + " pin is " + pname + ", net is " + name);
	}
      }
      else
      {
	dp.connectedSignal = newname;
      }
    }
    ix += 1;
  }
  }
}

function addItemToArray(a, arra)
{
  let i = 0;
  let k = arra.length;
  let b = true;
  while(b && (i < k))
  {
    if(arra[i] == a) b = false;
    i += 1;
  }
  if(b) arra[arra.length] = a;
}

function clearArray(a)
{
  let k = a.length;
  if(k > 0)
  {
    a.splice(0,k);
  }  
}

function addAll(thisarray, tothisarray)
{
  let k = thisarray.length;
  let i = 0;
  while(i < k)
  {
      tothisarray[tothisarray.length] = thisarray[i];
      i += 1;
  }
}

let nerr = null;
let nerrcount = 0;

/**
 * Creates a net list in gEDA PCB format.
 * @return
 */
function generateGEDANetList(vss)
{
let sb = "";
nerr = "";
nerrcount = 0;
let vsp = [];
let kk = vss.length;
let ii = 0;
while(ii < kk)
{
  let sh = vss[ii];
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
					
	let nsp = getAttributeValue("net", dc);
	let vdp = dc.getPins();
	if(dc.vpins.length > 0) addAll(dc.vpins, vdp);
	let ko = vdp.length;
	let io = 0;
	while(io < ko)
	{
	  let dp = vdp[io];
	  let netname = dp.connectedSignal;
	  let pinn = getAttributeValue("pinnumber", dp);
	  let bb = false;
	  if(nsp != null)
	  {
//	    bb = sheet.netpin(nsp, pinn);
	  }
	  if((netname != null) && (refdes.length > 0) && !bb && (dp.pintype == 0))
	  {
	    addStringPair(new StringPair(netname, refdes + "-" + pinn), vsp);
	  }
	  io += 1;
	}
	let anet = getAttributeValue("net", dc);
	if(anet != null)
	{
	//TODO						
	}
      }
    }
    i += 1;
  }
  ii += 1;
}
let s = null;
let ss = null;
let qty = 0;
let EOL = false;
let lastvalue = null;
vsp.sort(function(a,b) {return(a.parameter.localeCompare(b.parameter)); });
let noc = 0;
let k = vsp.length;
let i = 0;
while(i < k)
{
  let sp = vsp[i];
  let n = sp.parameter;
  if((s == null) || (s == ""))
  {
    s = n;
    sb += "\n" + n + " \t";
    qty = 1;
    ss = sp.value;
    noc = 1;
    lastvalue = sp.value;
  }
  else if(s == n)
  {
    if(!(lastvalue == sp.value))
    {
      if(EOL) ss = "\\\n";
      ss = ss + " \t" + sp.value;
      lastvalue = sp.value;
      qty += 1;
      noc += 1;
      if(qty == 4)
      {
	EOL = true;
	sb += ss;	
	ss = "";
	qty = 0;
      }
      else EOL = false;
    }
  }
  else
  {
    sb += ss + "\n";
    if(noc < 2)
    {
      nerr += "Error: net " + s + " has only " + noc + " connections.\n"
      nerrcount += 1;
    }
    s = n;
    sb += "\n" + s + " \t";
    EOL = false;
    qty = 0;
    noc = 1;
    ss = sp.value;
    lastvalue = sp.value;
  }
  i += 1;
}
sb += ss + "\n";
return(sb);		
}

/**
 * Eliminates letters after digits in a refdes.
 * @param s input resdes e.g. U1a
 * @return fixed refdes e.g. U1
 */
function fixRefdes(s)
{
let sb = "";
let i = 0;
let k = s.length;
while((i < k) && isUpperCase(s.charAt(i)) )
{
  sb += s.charAt(i);
  i += 1;
}
while((i < k) && isDigit(s.charAt(i)))
{
  sb += s.charAt(i);
  i += 1;
}
return(s.substring(0,i));
}

function isDigit(a)
{
let b = false;
let cc = a.charCodeAt(0);
if((cc > 47) && (cc <  58))
{
  b = true;
}
return(b);
}

function isUpperCase(a)
{
 let b = false;
let cc = a.charCodeAt(0);
if((cc > 64) && (cc <  91))
{
  b = true;
}
return(b); 
}

function isLowerCase(a)
{
 let b = false;
let cc = a.charCodeAt(0);
if((cc > 96) && (cc <  123))
{
  b = true;
}
return(b); 
}

function isLetter(a)
{
 let b = false;
 if(isUpperCase(a) || isLowerCase(a)) b = true;
 return(b); 
}


function fixVhdlName(s, fix)
{
let r = s;
let cc = s.charCodeAt(0);
if((cc > 47) && (cc <  58))
{
  r = fix + s;
}
r = r.replace("+", "P");
r = r.replace("-", "N");
return(r);
}

function checkSheetRefs(sheet)
{
 let sb = "";
 let vdj = ste.schematic.getComponents();
 let kk = vdj.length;
 let v = sheet.DrawingObjects;
 let k = v.length;
 let i = 0;
 let ii = 0;
 while(i < k)
 {
    let o = v[i];
    if(o.klass == "DComponent")
    {
      let refdes = getAttributeValue("refdes", o);
      if(refdes != null)
      {
	if(refdes.indexOf("?") != -1)
	{
	  sb += "Refdes not assigned " + refdes + "\n";
	}
	else
	{
	  let cnt = 0;
	  ii = 0;
	  while(ii < kk)
	  {
	    let p = getAttributeValue("refdes", vdj[ii]);
	    if((p != null) && (p != ""))
	    {
	      if(p == refdes) cnt += 1;
	    }
	    ii += 1;
	  }
	  if(cnt > 1) sb += "Duplicate " + refdes + "\n";
	}
      }
    }
    i += 1;
 }
return(sb);
}

function fixRefs()
{
let vdj = ste.schematic.getComponents();
vdj.sort(function(a,b) {return(getAttributeValue("refdes",a).localeCompare(getAttributeValue("refdes",b))); });
let kk = vdj.length;
let ii = 0;
let refdes = null;
let vsp = [];
while(ii < kk)
{
  let dc = vdj[ii];
  let slotdef = getAttributeValue("slotdef", dc);
  refdes = getAttributeValue("refdes", dc);
//  report("ii = " + ii + " " + refdes);
  if((refdes != null) && (refdes.indexOf("?") == -1))
  {
    if(isLetter(refdes.charAt(refdes.length -1)))
    {
      refdes = refdes.substring(0, refdes.length -1);
    }
    let sp = parseRefdes(refdes);
    let t = sp.value;
    update(vsp, sp.parameter, t);
  }
  ii += 1;
}
// assign unassigned
kk = vdj.length;
ii = 0;
while(ii < kk)
{
  let dc = vdj[ii];
  let slot = getAttributeValue("slot", dc);
  let refdes = getAttributeValue("refdes", dc);
  if((refdes != null) && (slot == null) && (isLetter(refdes.charAt(refdes.length -1))))
  {
	//skip
  }
  else if((refdes != null) && (slot == null )&& ((refdes.indexOf("?")) != -1))
  {
    let sp = parseRefdes(refdes);
    let f = getMaxRef(vsp, sp.parameter);
    if(f == -1)
    {
      refdes = sp.parameter + "1";
      update(vsp, sp.parameter, 1);
    }
    else
    {
      let suffix = Number(f)+1;
      refdes = sp.parameter + suffix;
      update(vsp, sp.parameter, Number(f)+1);
    }
    setAttributeValue("refdes", dc, refdes);
  }
  else if(slot != null)
  {
    let suf = refdes[refdes.length -1];
    if(isDigit(suf) || (suf == "?"))
    {
      refdes = refdes + String.fromCharCode(Number(96 + Number(slot)));  
      setAttributeValue("refdes", dc, refdes);
    }
  }
  ii += 1;
}
	
}

	
function getMaxRef(vsp, s)
{
let i = -1;
let b = true;
let k = vsp.length;
let ii = 0;
while(b && (ii < k))
{
  let sp = vsp[ii];
  if(s == sp.parameter)
  {
    if(Number(sp.value) == i) report("dupe for " + s + sp.value);
    else if(sp.value > i) i = Number(sp.value);
  }
  ii += 1;
}
return(i);
}

function update(vsp, s, t)
{
let b = true;
let kk = vsp.length;
let ii = 0;
while (b && (ii < kk))
{
  let sp = vsp[ii];
  if(sp.parameter == s)
  {
    if(Number(t) > Number(sp.value))
    {
      sp.value = t;
    }
    b = false;
  }
  ii += 1;
}
if(b)
{
  addStringPair(new StringPair(s, t), vsp);
}
}

function parseRefdes(refdes)
{
let k = refdes.length;
let i = 0;
let m = 0;
let n = 0;
let label = "";
let num = "";
while(i < k)
{
  let x = refdes.charAt(i);
  if(isDigit(x))
  {
    if(m == 0) m = i;
    else n = i;
  }
  else if(x == '?')
  {
    m = i;
  }
			
  i += 1;
}
label = refdes.substring(0, m);
if(n > m)
{
  num = refdes.substring(m, n+1);
}
else num = refdes.substring(m);
//report("2453 " + label + ":" + num);
let sp = new StringPair(label, num);
return(sp);
}

function generatePADSList(vss)
{
let hoj = [];
let nets = [];
let CRLF = "\n";
let sbx = "";
let errors = 0;
sbx += "*PADS-PCB*" + CRLF;
sbx += "*PART*" + CRLF;
let vsp = [];
let kk = vss.length;
let ii = 0;
while(ii < kk)
{
  let sh = vss[ii];
  let vdj = sh.getDrawingObjects();
  let k = vdj.length;
  let i = 0;
  let parttableindex = 1;
  while(i < k)
  {
    let o = vdj[i];
    if(o.klass == "DComponent")
    {
      let dc = o;
      let refdes = getAttributeValue("refdes", dc);
      let device = getAttributeValue("device", dc);
      if( (refdes != null) && (refdes != "") && (device != null) && (device != ""))
      {
	refdes = fixRefdes(refdes);
	let padsdevice = getAttributeValue("padsdevice", dc);
	device = fixVhdlName(device, refdes + "_" );
	if(padsdevice != null) device = padsdevice;
	if(addString(refdes, hoj))
	{
	  sbx += refdes + " " + device + CRLF; // refdes, device, footprint not used
	}
	let vdp = dc.getPins();
	let kkk = vdp.length;
	let iii = 0;
	while(iii < kkk)
	{
	  let dp = vdp[iii];
	  let netname = dp.connectedSignal;
	  if((netname != null) && (netname.length > 0))
	  {
	    addString(netname, nets);
	    let pn = getAttributeValue("pinnumber", dp);
	    let pp = pn;
	    if(!isDigit(pp.charAt(0)))
	    {
	      errors += 1;
	      report("generatePADSNetList error - pinnumber not a number " + refdes + " " + pn);
	    }
	    vsp[vsp.length] = new StringPair(netname, refdes + "." + getAttributeValue("pinnumber", dp));
	  }
	  iii += 1;
	}
      }
    }
    i += 1;
  }
  ii+= 1;
}
		
sbx += "*NET*" + CRLF;
let s = null;
let ss = null;
let qty = 0;
let lastvalue = null;
vsp.sort(function(a,b) {return(a.parameter.localeCompare(b.parameter)); });

let k = vsp.length;
let i = 0;
while(i < k)
{
  let sp = vsp[i];
  let n = sp.parameter;
  if((s == null) || (s == ""))
  {
    s = n;
    sbx += "*SIGNAL* " + n + CRLF;
    qty = 1;
    ss = sp.value;
    lastvalue = sp.value;
  }
  else if(s == n)
  {
    if(lastvalue != sp.value)
    {
      if(qty == 0) ss += sp.value;
      else ss = ss + " " + sp.value;
      lastvalue = sp.value;
      qty += 1;
      if(qty == 8)
      {
	if((i + 1) < k)
	{
	  sbx += ss + CRLF;	
	  ss = "";
	}
//						sb += ss + "\n");
	qty = 0;
      }
    }
  }
  else
  {
    if(qty != 0) sbx += ss + CRLF;
    s = n;
    sbx += "*SIGNAL* " + s + CRLF;
    qty = 1;
    ss = sp.value;
    lastvalue = sp.value;
  }
  i += 1;
}
sbx += ss + CRLF;		
sbx += "*END*" + CRLF;
return(sbx);
}
	
function addString(refdes, hoj)
{
  let b = true;
  let k = hoj.length;
  let i = 0;
  while(b && (i < k))
  {
    let dc = hoj[i];
    if(refdes == dc)
    {
      b = false;
    }
    i += 1;
  }
  if(b)
  {
    hoj[hoj.length] = refdes;
  }
  return(b);
}

function consolidatePins(refdes, dp)
{
  let g = [];
  let k = dp.length;
  let i = 0;
  while(i < k)
  {
    let d = dp[i];
    let x = getPinByPinnumber(getAttributeValue("pinnumber", d), g);
    if(x == null)
    {
      g[g.length] = d;
    }
    else
    {
      if(d.connectedSignal == x.connectedSignal)
      {
	report("NetSupport consolidatePins has multiple connections " + refdes + " " + x.connectedSignal + " " + d.connectedSignal );
					
      }
    }
    i += 1;
  }
  return(g);
}

function getEESchemaUniqueID()
{
  let d = new Date();
  let t = d.getTime();
  let i = 0;
  let s = t.toString(16);
  let k = s.length;
  if(k < 8)
  {
    let z = 8 - k;
    while(i < z)
    {
      i += 1;
      s = s + "0";
    }
  }
  if(k > 8)
  {
    s = s.substring(0, 8);
  }
  return s;
}

function addSpecialStringObjectPair(sp, vop)
{
  let k = vop.length;
  let i = 0;
  let b = true;
  let spp = sp.getParameter();
  let p  = sp.getObject();
  let pn = getAttributeValue("pinnumber", p);
  while(b && i < k)
  {
    let x = vop[i];
    if(x.getParameter() == spp)
    {
      let p2 = x.getObject();
      let pn2 = getAttributeValue("pinnumber", p2);
      if(pn == pn2)
      {
	b = false;
      }
    }
    i += 1;
  }
  if(b) vop[vop.length] = sp;
}

function getStringIndex(r, hoj)
{
  let i = -1;
  let j = 0;
  let b = true;
  let kk = hoj.length;
  let ii = 0;
  while(b && ii < kk)
  {
    let s = hoj[ii];
    if(s == r)
    {
      b = false;
      i = j;
    }
  else j += 1;
  ii += 1;
  }
  return(i);
}

function getPinByPinnumber(pinnumber, vp)
{
  let d = null;
  let b = true;
  let k = vp.length;
  let i = 0;
  while(b && i < k)
  {
    let p = vp[i];
    if(getAttributeValue("pinnumber", p) == pinnumber)
    {
      d = p;
      b = false;
    }
    i += 1;
  }
  return(d);
}
	


//TODO
function generateEESchemaNetList(sheets)
{
  let errors = 0;
  let hoj = [];
  let nets = [];
  let sb = [];
  sb += "# EESchema format netlist created " + getDateStamp() + "\n";
  // first connections by device
  sb += "(\n";
  let vop = [];
  let vss = sheets;
  let kkk = sheets.length;
  let iii = 0;
  while(iii < kkk)
  {
    let sh = sheets[iii];
    let vdj = sh.getDrawingObjects();
    let k = vdj.length;
//    report("Schematic number of objects = " + k);
    let i = 0;
    let parttableindex = 1;
    while(i < k)
    {
      let o = vdj[i];
      if(o.klass == "DComponent")
      {
	let dc = o;
	let refdes = getAttributeValue("refdes", dc);
	let device = getAttributeValue("device",dc);
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
    iii += 1;
  }
		
  let s = null;
  let lastparameter = null;
  let b = true;
  vop.sort(function(a,b) 
    {
    let sa1 = a.getParameter();
    let sa2 = b.getParameter();
    let i = sa1.localeCompare(sa2);
    if(i == 0)
    {
      let d1 = a.getObject();
      let d2 = b.getObject();
      sa1 = getAttributeValue("pinnumber", d1);
      sa2 = getAttributeValue("pinnumber", d2);
 //     let i1 = Integer.parseInt(sa1);
 //     let i2 = Integer.parseInt(sa2);
      let i1 = Number(sa1);
      let i2 = Number(sa2);
      i = i1 - i2;
    }
    if(i < 0) i = -1;
    else if(i > 0) i = 1;
    return(i);
    });
  let k = vop.length;
  let i = 0;
  while(i < k)
  {
    let sp = vop[i];
    let parameter = sp.getParameter();
    let p = sp.getObject();
    if(lastparameter == null)
    {
      sb += " ( /" + getEESchemaUniqueID() + " $noname  " + parameter + "\n";
    }
    else if(lastparameter != parameter)
    {
      sb += " )\n";
      sb += " ( /" + getEESchemaUniqueID() + " $noname  " + parameter + "\n";
    }
    let z = p.connectedSignal;
    if(z == "open") z = "?";
    sb += "  ( " + getAttributeValue("pinnumber", p) + " " + z + " )\n";
    lastparameter = parameter;
    i += 1;
  }
  sb += ")\n";
		
  // then allowed footprints
  sb += "*\n";
  sb += "{ Allowed footprints by component:\n";
		
  sb += "$endfootprintlist\n";
  sb += "}\n";
		
  // then by nets
  sb += "{ Pin List by Nets\n";
  sb += "}\n";
  sb += "#End\n";		
  return(sb);
}

function getDateStamp()
{
  let date = new Date();
  let dt = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear().toString().substr(2,2);
  return(dt)
}

function StringObjectPair(parameter, obj)
{
  this.parameter = parameter;
  this.obj = obj;
}

StringObjectPair.prototype.getParameter = function()
{
return(this.parameter);
}

StringObjectPair.prototype.getObject = function()
{
return(this.obj);
}

function checkCompDupeNames(d, fix)
{
  let sb = "";
  let h = new Hashtable();
  let pins = d.getPins();
  let k = pins.length;
  let i = 0;
  while(i < k)
  {
    let p = getAttributeValue("pinlabel", pins[i]);
    if(h.containsKey(p))
    {
      if(fix)
      {
	let ent = h.getEntry(p);
	let n = Number(ent.value) + 1;
	ent.value = n;
	h.put(p+n, n);
	setAttributeValue("pinlabel", pins[i], p+n);
      }
      else sb += p + " is dupe\n";
    }
    else
    {
      h.put(p, 0);
    }
    i += 1;
  }
  return(sb);
}
