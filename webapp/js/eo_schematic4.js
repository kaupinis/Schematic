// eo_schematic4.js

function HashtableEntry(key, value)
{
    this.key = key.toString();
    this.value = value;
}

function Hashtable()
{
  this.t = [];
}

Hashtable.prototype.put = function(a, b)
{
  let x = new HashtableEntry(a, b);
  this.t[this.t.length] = x;
}

Hashtable.prototype.containsKey = function(x)
{
  let y = x.toString();
  let b = true;
  let k = this.t.length;
  let i = 0;
  while(b && (i < k))
  {
    if(this.t[i].key == y) b = false;
    i += 1;
  }
  return(!b);
}

Hashtable.prototype.getEntry = function(key)
{
//  let y = x.toString();
  let ent = null;
  let b = true;
  let k = this.t.length;
  let i = 0;
  while(b && (i < k))
  {
    if(this.t[i].key == key) 
    {
      b = false;
      ent = this.t[i];
    }
    else i += 1;
  }
  return(ent);
}

Hashtable.prototype.clear = function()
{
  clearArray(this.t);
}

function VHDL()
{
  
}

VHDL.prototype.getModeForPintype = function(pintype)
{
let s = "inout";
if(pintype == null) ;
else if(pintype == "io") s = "inout";
else if(pintype.indexOf("in") != -1) s = "in";
else if(pintype.indexOf("out") != -1) s = "out";
else if(pintype == "clk") s = "in";
else if(pintype == "pas") s = "in";
else if(pintype == "pwr") s = "in";
else if(pintype == "oe") s = "out";
else if(pintype == "oc") s = "out";
else if(pintype == "tp") s = "out";
else if(pintype == "tri") s = "out";		
return(s);
}
	
VHDL.prototype.isInVector = function(s, v)
{
let b = true;
let k = v.length;
let i = 0;
while(b && (i < k))
{
  let s1 = v[i];
  if(s == s1) b = false;
  i += 1;
}
return(!b);
}

VHDL.prototype.getTypeForPintype = function(pin)
{
  let type = getAttributeValue("logic_type", pin);
  if(pin.pintype == 0)
  {
    if(type == null) type = "std_logic";
  }
  else
  {
    let limit1 = getAttributeValue("limit1", pin);
    let limit2 = getAttributeValue("limit2", pin);
    let size = getAttributeValue("size", pin);
    if((limit1 != null) && (limit2 != null))
    {
      if(type == null) type = "std_logic_vector";
      if(limit1 < limit2)
      {
	type += "(" + this.limit1 + " to " + this.limit2 + ")";
      }
      else
      {
	type += "(" + this.limit1 + " downto " + this.limit2 + ")";	
      }
    }
    else if(size != null)
    {
      if(type == null) type = "std_logic_vector";
      type += "(" + size  + " - 1 downto 0)"; 
    }
    if(type == null) 
    {
      let name = getAttributeValue("pinlabel", pin);
      type = name + "_TYPE";
    }
  }
  return(type);
}
	
VHDL.prototype.generateVHDL = function(ste, sm, compdefs)
{
//report("generateVHDL");
let ProjectName = getAttributeValue("designname", sm.sheets[0].getTitleSheet());
let sb = "";
let sbx = "";
let sbb = "";
let ht = new Hashtable();
let htx = new Hashtable();
let date = new Date();
sb +="-- " + ProjectName + ".vhd " + (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear().toString().substr(2,2) + "\n\n";
let ts = sm.sheets[0].getTitleSheet();
let company = getAttributeValue("company", ts);
if(company != null) sb += "-- " + company + "\n";
let author = getAttributeValue("author", ts);
if(author != null) sb += "-- " + author + "\n";
let copyright = getAttributeValue("copyright", ts);
if(copyright != null) sb += "-- " + copyright + "\n";
sb += "\nLIBRARY IEEE;\nUSE IEEE.std_logic_1164.ALL;\n";
sb += "USE IEEE.std_logic_unsigned.ALL;\nUSE IEEE.std_logic_arith.ALL;\n\n";
sb += "LIBRARY WORK;\n\n";
sb += "ENTITY " + ProjectName + " IS\n\n";

let sbf = true;
//see if any ports
let vdj = sm.getComponents();
let kk = vdj.length;
let ii = 0;
let refdes = null;
let device = null;
let PortNames = [];
let pinname = null;
let s = null;
let first = true;
let x = false;
while(ii < kk)
{
  let dc = vdj[ii];
  refdes = getAttributeValue("refdes", dc);
  device = getAttributeValue("device", dc);
  if((refdes != null) && (device != null))
  {
    x = false;
    let dp = null;
    if(device.indexOf("VHDL_INPUT_PORT") != -1)
    {
      x = true;
      dp =dc.getPins()[0];
      pinname = dp.connectedSignal;
      if(dp.pintype == 0) s = "   " + pinname + " : IN std_logic";
      else
      {
	let bu = sm.getBus(pinname);
	let L1 = null;
	let L2 = null;
	let sz = null;
	if(bu != null)
	{
	  L1 = getAttributeValue("L1", bu);
	  L2 = getAttributeValue("L2", bu);
	}
	if((L1 != null) && (L2 != null))
	{
	  s = "   " + pinname + " : IN std_logic_vector(" + L1 + " downto " + L2 + ")";
	}
	else s = "   " + pinname + " : IN " + pinname + "_TYPE";
      }
    }
    else if(device.indexOf("VHDL_INOUT_PORT") != -1)
    {
      x = true;
      dp =dc.getPins()[0];
      pinname = dp.connectedSignal;
      if(dp.pintype == 0) s = "   " + pinname + " : INOUT std_logic";			
      else
      {
	let bu = sm.getBus(pinname);
	let L1 = null;
	let L2 = null;
	if(bu != null)
	{
	  L1 = getAttributeValue("L1", bu);
	  L2 = getAttributeValue("L2", bu);
	}
	if((L1 != null) && (L2 != null))
	{
	  s = "   " + pinname + " : INOUT std_logic_vector(" + L1 + " downto " + L2 + ")";
	}
	else s = "   " + pinname + " : INOUT " + pinname + "_TYPE";
      }
    }
    else if(device.indexOf("VHDL_OUTPUT_PORT") != -1)
    {
      x = true;
      dp =dc.getPins()[0];
      pinname = dp.connectedSignal;
      if(dp.pintype == 0) s = "   " + pinname + " : OUT std_logic";
      else
      {
	let bu = sm.getBus(pinname);
	let L1 = null;
	let L2 = null;
	if(bu != null)
	{
	  L1 = getAttributeValue("L1", bu);
	  L2 = getAttributeValue("L2", bu);
	}
	if((L1 != null) && (L2 != null))
	{
	  s = "   " + pinname + " : OUT std_logic_vector(" + L1 + " downto " + L2 + ")";
	}
	else s = "   " + pinname + " : OUT " + pinname + "_TYPE";
      }
    }
  
    if(x)
    {
      if(this.isInVector(pinname, PortNames))
      {
	x = false;
      }
      else
      {
	addItemToArray(pinname, PortNames);
      }
      let comment = getAttributeValue("comment",dp);
      if((comment != null) && (!comment.equals("null")) && (!comment.equals("")))
      {
	s += " -- " + comment;
      }
    }

    if(x && first)
    {
      first = false;
      sbx += "PORT(\n";
      sbx += s;
    }
    else if(x)
    {
      sbx += ";\n";
      sbx += s;
    }
  }
  ii += 1;
}
if(!sbf) sb += ");\n";
sbx = sb + sbx;
sb = "";
if(!first)
{
  sbx += "\n   );\n";
}
sbx += "SUBTYPE PIN_MAP_STRING IS STRING;\n\n";
sbx += "END " + ProjectName + ";\n\n";
sbx += "ARCHITECTURE schematic OF " + ProjectName + " IS\n\n";
// create components
		
// create signals
let its = sm.netv;
kk = its.length;
ii = 0;
while(ii < kk)
{
  let name = its[ii].netname;
  let bn = sm.getBus(name);

  if((!this.isInVector(name, PortNames)) && (name != "OPEN") && (name != "open") && (bn == null))
  {
    let n = sm.getNet(name);
    let comment = n.comment;
    let type = getAttributeValue("logic_type", n);
    if(type == null) type = "std_logic";
    if((comment != null) && (!(comment == "null")) && (!(comment == "")))
    {
      sb += "SIGNAL " + name + " : " + type + ";  -- " + comment + "\n";
    }
    else
    {
      sb += "SIGNAL " + name + " : " + type + ";\n";
    }
  }
  ii += 1;
}
// list vectors
its = sm.busarray;
kk = its.length;
ii = 0;
while(ii < kk)
{
  let name = its[ii].busname;
  if(!this.isInVector(name, PortNames))
  {
    let n = sm.getBus(name);
    let comment = n.comment;
    let type = getAttributeValue("logic_type", n);
    let L1 = getAttributeValue("L1", n);
    let L2 = getAttributeValue("L2", n);
   if((L1 != null) && (L2 != null))
    {
      if(type == null) type = "std_logic_vector";
      if(L1 < L2)
      {
	type += "(" + L1 + " to " + L2 + ")";
      }
      else
      {
	type += "(" + L1 + " downto " + L2 + ")";	
      }
      if((comment != null) && (!(comment == "null")) && (!(comment == "")))
      {
	sb += "SIGNAL " + name + " : " + type + ";  -- " + comment + "\n";
      }
      else
      {
	sb += "SIGNAL " + name + " : " + type + ";\n";
      }
    }
    else
    {
      if(type == null) type = name + "_TYPE";
      if((comment != null) && (!(comment == "null")) && (!(comment == "")))
      {
	sb += "--SIGNAL " + name + " : " + type + ";  -- " + comment + "\n";
      }
      else
      {
	sb += "--SIGNAL " + name + " : " + type + ";\n";
      }

    }
      
  }
  ii += 1;
}

// create body
sb += "\nBEGIN\n";
vdj = sm.getComponents();
		
let ref = null;
let dclast = null;
let dlast = null;
let hty = new Hashtable();
device = null;
let numslots = 0;
let vp = [];
kk = vdj.length;
ii = 0;
while(ii < kk)
{
  let dc = vdj[ii];
  refdes = getAttributeValue("refdes", dc);
  refdes = fixRefdes(refdes);
  device = getAttributeValue("device", dc);
  numslots = getAttributeValue("numslots", dc);
  if(numslots == null) numslots = 0;
  let xskip = false;
  if(device.indexOf("VHDL_INPUT_PORT") != -1) xskip = true;
  else if(device.indexOf("VHDL_INOUT_PORT") != -1) xskip = true;
  else if(device.indexOf("VHDL_OUTPUT_PORT") != -1) xskip = true;
  if((refdes == null) || (refdes.length == 0)) 
  {
    xskip = true;
    if(device.indexOf("CONST") == 0)
    {
      let pins = dc.getPins();
      if(pins.length == 1)
      {
	let p = pins[0];
//	if(p.pintype == 0)
	{
	  let c = p.connectedSignal;
	  let a = getAttributeValue("value", dc);
	  if(a.length == 1) a = "\'" + a + "\'";
	  else if(a.indexOf("\"") != 0) a = "\"" + a + "\""; 
	  if((a != null) && (c != ""))
	  {
	    sbb += c + " <= " + a + ";\n"
	  }
	}
      }
    }
  }
  if(!xskip)
  {
    if(ref == null)  // first component
    {
      device = this.fixVhdlName(device, refdes + "_" );
      dclast = device;
      dlast = dc;
      ref = refdes;
      vp = dc.getPins();
    }
    else if(ref == fixRefdes(refdes)) // if slotted or multi-piece
    {
      if(dclast == getAttributeValue("device", dc))
      {
	addAll(dc.getPins(), vp);
      }
      else
      {
	report("eo_schematic4 generateVHDL different device name for " + refdes);
	sb += "\n-- ERROR different device name for " + refdes + "\n";
      }
    }
    else // next component is different
    {
      // first output dlast component data
      sb += this.processComponent(ref, vp, dlast, hty);
      if(!ht.containsKey(dclast))
      {
	if(compdefs && (dlast != null) )
	{
	  sbx += this.addComponentDefinition(dlast, dclast, vp, sbx, hty);
	  ht.put(dclast, dclast);
	}
	else
	{
	  this.addComponentDefinition(dlast, dclast, vp, sbx, hty);
	  ht.put(dclast, dclast);	  
	}
      }
           
      // then initialize for current component  
      htx.clear();
      hty.clear();
      ref = fixRefdes(refdes);
      device = this.fixVhdlName(device, refdes + "_" );
      numslots = getAttributeValue("numslots", dc);
      if(numslots == null) numslots = 0;
      vp = dc.getPins();
      dclast = getAttributeValue("device", dc);
      dlast = dc;
    }
  }
ii += 1;
}
if(ii > 0) // process the last component
{
  sb += this.processComponent(ref, vp, dlast, hty);
  
  if(compdefs && !ht.containsKey(dclast))
  {
    if(compdefs && (dlast != null))
    {
      sbx += this.addComponentDefinition(dlast, dclast, vp, sbx, hty);
    }
    else
    {
       this.addComponentDefinition(dlast, dclast, vp, sbx, hty);     
    }
  }

}
sb += sbb;
sb += "\nEND schematic;\n\n";
return(sbx += sb);		
}

VHDL.prototype.processComponent = function(ref, vp, dcomp, hty)
{
//  sb = "-- processComponent " + ref + "\n";
  // first instantiate
  let sb = "";
  let htc = new Hashtable(); // not used??j
  let device = getAttributeValue("device", dcomp);
  let numslots = getAttributeValue("numslots", dcomp);
  if(numslots == null) numslots = 0;
  let c = getAttributeValue("description", dcomp);
  if((c == null) || (c == "") || (c == "null"))
  {
    c = getAttributeValue("value", dcomp);
  }
  else 
  {
    let v = getAttributeValue("value", dcomp);
    if((v != null) && (!(v == "")) && (!(v =="null")))
    {
      c += "; " + v;
    }
  }
  
  if((c != null) && (!(c == "")) && (!(c =="null")))
  {
    sb += ref + ": " + device +  " -- " + c + "\n";
  }
  else sb += ref + ": " + device + "\n";

  let sbk = this.getVHDLPinData(vp, ref, numslots != 0, htc);

  // declare generics
  if((vp.length > 0) && (getAttributeValue("pinnumber", vp[0]) != null))
  {
    sb += "   GENERIC MAP(\n";
    sb += "   PHYSICAL_PIN_MAP => \"PKG_PINS\",\n";
    sb += "   PKG_PINS => \"";
    sb += this.getPinMapString(vp, dcomp, numslots, hty);
    sb += "\"" ; // was "\")"
    let ff = this.getGenericsMap(dcomp);
    if(ff.length > 6) sb += ",\n" + ff;
    else sb += "\n   )\n";
  }
  else
  {
    let gf = this.getGenericsMap(dcomp);
    if(gf.length > 6)
    {
      sb += "   GENERIC MAP(\n";
      sb += gf;
    }
  }
  sb += "\n   PORT MAP(\n";
  sb += sbk;
//  sb += getConnectionAssignments(vp);
//  sb += this.getVHDLPinData(vp, ref, numslots != 0, ht);
  return(sb);
}

VHDL.prototype.getConnectionAssignments = function(htx)
{
  let sb = "";
  let kkk = htx.t.length;
  let iii = 0;
  let xfirst = true;
  while(iii < kkk)
  {
    if(xfirst) xfirst = false;
    else sb += ";\n";
    let h = htx.t[iii];
    sb += "     " + h.key + " => " + h.value;
    iii += 1;
  }
  sb += "\n     );\n";
  return(sb);
}

VHDL.prototype.getPinsWithNumbers = function(vp)
{
  let nvp = [];
  let k = vp.length;
  let i = 0;
  while(i < k)
  {
    let p = vp[i];
    let pn = getAttributeValue("pinnumber", p);
    if((pn != null) && (pn != "0")) nvp[nvp.length] = p;
    i += 1;
  }
  return(nvp);
}

VHDL.prototype.addComponentDefinition = function(d, dc, vp, sbb, hty)
{
  let sbx = ""
  let sb = "";
  let skip = false;
  sb += "\n   );\nPORT(\n";
  let comment = getAttributeValue("comment", d);
  if((comment == null) || (comment == ""))
  {
    comment = getAttributeValue("description", d);
  }
  if((comment == null) || (comment == "") || (comment == "null"))
  {
    sbx += "COMPONENT " + dc + "\n";
  }
  else
  {
    sbx += "COMPONENT " + dc + " -- " + comment + "\n";
  }
  
  let vdp = this.getPinsWithNumbers(vp);
  let listpins = false;
  if(vdp.length > 0) listpins = true;
  
  if(listpins)
  {
  sbx += "GENERIC(\n   PHYSICAL_PIN_MAP : STRING := \"PKG_PINS\";\n";
  sbx += "   PKG_PINS : PIN_MAP_STRING := \"";
  let first = true;
  let k = hty.t.length;
  let kx = 1;
  let i = 0;
  while(i < k)
  {
    if(first) first = false;
    else //if(!skip && listthispin)
    {
      sbx += ", ";
      if(kx == 5)
      {
	sbx += "\"&\n   \"";
	kx = 0;
      }
      kx += 1;
    }
    sbx += hty.t[i].value;
    i += 1;
  }
  sbx += "\"";
  }
  else
  {
    sbx +=  "GENERIC(\n";
  }
  
  
  let vd = d.attributes;
  kk = vd.length;
  ii = 0;
  let bfirst = true;
  while(ii < kk)
  {
    let a = vd[ii];
    let s = a.name;
    if(this.checkAttributeName(s))
    {
      if(bfirst) 
      {
	bfirst = false;
	if(listpins) sbx += ";\n";
      }
      else sbx += ";\n";
      if((s.charAt(0) == 'T') && (isLowerCase(s.charAt(1)) || isDigit(s.charAt(1))))
      {
	sbx += "   " + s + " : TIME := " + a.value;
      }
      else if(s.indexOf("I__") != -1) sbx += "   " + s + " : INTEGER := " + a.value;
      else sbx += "   " + s + " : STRING := \"" + a.value + "\"";
    }
    ii += 1;
  }

  k = hty.t.length;
  i = 0;
  let xfirst = true;
  while(i < k)
  {
    if(xfirst) xfirst = false;
    else
    {
      sb += ";\n"
    }
    sb += hty.t[i].key; 
    i += 1;
  }
  sb += "\n   );\nEND COMPONENT;\n\n";

sbx += sb;
return(sbx);	
}
	
VHDL.prototype.getGenericsMap = function(d)
{
  let sbx ="";
  let first = true;
  let vd = [];
  addAll(d.attributes, vd);
  let kk = vd.length;
  let ii = 0;
  while(ii < kk)
  {
    let a = vd[ii];
    let s = a.name;
    if(this.checkAttributeName(s))
    {
      if(!first) sbx += ",\n";
      else first = false;
      if(((s.charAt(0) == 'T') && (isLowerCase(s.charAt(1)) || isDigit(s.charAt(1)))) || (s.indexOf("I__") != -1))
      {
	sbx += "   " + s + " => " + a.value;
      }
      else sbx += "   " + s + " => \"" + a.value + "\"";
 //     ii += 1;
    }
    ii += 1;
  }
  sbx += "\n   )";
  return(sbx);
}
	
VHDL.prototype.checkAttributeName = function(s)
{
  let b = true;
  if(s == "refdes") b = false;
  else if(s == "device") b = false;
  else if(s == "comment") b = false;
  else if(s == "slotdef") b = false;
  else if(s == "slot") b = false;
  else if(s == "net") b = false;
  else if(s == "numslots") b = false;
  return(b);
}

function newobj()
{
  this.klass = "newobj";
  this.attributes = []; 
}
	
VHDL.prototype.getPinMapString = function(vpin, dc, numslots, hty)
{
  let sb = [];
  let vp = [];
  let ht = new Hashtable();
  let i = 0;
  let k = 0;
  if(numslots > 0)
  {
    k = dc.attributes.length;
    while(i < k)
    {
     if(dc.attributes[i].name == "slotdef")
     {
      let v = dc.attributes[i].value;
      let z = v.substring(v.indexOf(":") + 1);
      let parray = z.split(",");
      let kk = parray.length;
      let ii = 0;
      while(ii < kk)
      {
	let pin = dc.getPinBySeq(ii + 1);
	let pl = getAttributeValue("pinlabel", pin);
	if(!ht.containsKey(parray[ii]))
	{
	  let obj = new newobj();
	  ht.put(parray[ii], pl);
	  setAttributeValue("pinnumber", obj, parray[ii]);
	  let pinlabel = pl + "_" + parray[ii];
	  setAttributeValue("pinlabel", obj, pinlabel);
	  vp[vp.length] = obj;
	  
	  let type = this.getModeForPintype(getAttributeValue("pintype", pin));
	  type = type.toUpperCase();
	  type += " " + this.getTypeForPintype(pin);
	  let g = pinlabel + ":" + parray[ii];
	  let f = "   " + pinlabel + " : " + type;
	  hty.put(f, g);
	}
	ii += 1;
      }
     }
     i += 1;
    }
    k = vpin.length;
    i = 0;
    while(i < k)
    {
      let pnn = getAttributeValue("pinnumber", vpin[i]);
      if(pnn != null)
      {
	if(!ht.containsKey(pnn))
	{
	  vp[vp.length] = vpin[i];
	  ht.put(pnn, "");
	  let pinlabel = getAttributeValue("pinlabel", vpin[i]);
	  let type = this.getModeForPintype(getAttributeValue("pintype", vpin[i]));
	  type = type.toUpperCase();
	  type += " " + this.getTypeForPintype(vpin[i]);
	  let g = pinlabel + "_" + pnn + ":" + pnn;
	  let f = "   " + pinlabel + "_" + pnn + " : " + type;
	  hty.put(f,g);
	}
      }
      i += 1;
    }
    
  }
  else if(numslots == -1)  // non-homogenious but not slotted
  {
    let ref = getAttributeValue("refdes", dc);
    let ref1 = fixRefdes(ref);
    let sm = ste.getSchematic();
    let vdj = sm.getComponents();
    let kk = vdj.length;
    let ii = 0;
    let refdes = null;
    let device = null;
    while(ii < kk)
    {
      let dcomp = vdj[ii];
      refdes = getAttributeValue("refdes", dcomp);
      device = getAttributeValue("device", dcomp);
      if((refdes != null) && (device != null))
      {
	if(ref1 == fixRefdes(refdes))
	{
	  vp = dcomp.getPins();
	  k = vp.length;
	  i = 0;
	  while(i < k)
	  {
	  let pin = vp[i];
	  let pinlabel = getAttributeValue("pinlabel", pin);
	  let pinnumber = getAttributeValue("pinnumber", pin);
	  let type = this.getModeForPintype(getAttributeValue("pintype", pin));
	  type = type.toUpperCase();
	  type += " " + this.getTypeForPintype(pin);
	  let g = pinlabel + ":" + pinnumber;
	  let f = "   " + pinlabel + " : " + type;
	  hty.put(f, g);
	  i += 1;
	  }
	}
      }
      ii += 1;
    }
  }
  else
  {
    vp = vpin;
    k = vp.length;
    i = 0;
    while(i < k)
    {
      let pin = vp[i];
      let pinlabel = getAttributeValue("pinlabel", pin);
      let pinnumber = getAttributeValue("pinnumber", pin);
      let type = this.getModeForPintype(getAttributeValue("pintype", pin));
      type = type.toUpperCase();
      type += " " + this.getTypeForPintype(pin);
      let g = pinlabel + ":" + pinnumber;
      let f = "   " + pinlabel + " : " + type;
      hty.put(f, g);
      i += 1;
    }
  }
//  let m = vp.length;
  let m = hty.t.length;
  let first = true;
  let skip = false;
  let dupe = 2;
  let pinnumber = null;
  let lastpinnumber = null;
  let pn = null;
  k = 1;
  i = 0;
  while(i < m)
  {
    if(first) first = false;
    else if(!skip)
    {
      sb += ", ";
      if(k == 5)
      {
	sb += "\"&\n     \"";
	k = 0;
      }
      k += 1;
    }
    if(!skip) 
    {
     sb += hty.t[i].value;
    }
    lastpinnumber = pinnumber;
    i += 1;
  }
  
return(sb);
}

VHDL.prototype.getVHDLPinData = function(vp, refdes, slotted, ht)
{
  let sb = "";
  let k = vp.length;
  let i = 0;
  let first = true;
  let pn = null;
  let pinnumber = null;
  let lastpinnumber = null;
  let skip = false;
  let dupe = 2;
  while(i < k)
  {
    skip = false;
    let dp = vp[i];
    let pinlabel = getAttributeValue("pinlabel", dp);
    pinnumber = getAttributeValue("pinnumber", dp);
    if(pinlabel == null)
    {
      pinlabel = pinnumber;
      if(pinlabel == null)
      {
	//TODO
	report("geneateVHDL no pinlabel on " + refdes);
      }
      else
      {
	pinlabel = this.fixVhdlName(pinlabel, "P_");
      }
    }
    else if(slotted)
    {
      pinlabel = pinlabel + "_" + pinnumber;
    }
    if(pn == null)
    {
      pn = pinlabel;
    }
    else if (slotted && ht.containsKey(pinlabel)) skip = true;
    else if (pn == pinlabel)  // if dupe
    {
      report("geneateVHDL dupe pinlabel " + pinlabel + " on " + refdes);
      pinlabel = pinlabel + "_" + dupe;
      dupe += 1;
      if(lastpinnumber != null)
      {
	if(pinnumber == lastpinnumber) skip = true;
      }
    }
    else
    {
      pn = pinlabel;
      dupe = 2;
    }
    let netname = dp.connectedSignal;
    if((netname == null) || (netname.length == 0))
    {
      netname = "open";
    }
    if(!skip) 
    {
      if(first) first = false;
      else if(!skip) sb += ",\n";
      sb += "   " + pinlabel + " => " + netname;
      ht.put(pinlabel, pinlabel + ":" + pinnumber);
//      hty.put(
    }
    lastpinnumber = pinnumber;
    i += 1;
  }
//  sb += "\n";
  sb += "\n   );\n\n";
  return(sb);
}

VHDL.prototype.fixVhdlName = function(s, fix)
{
  let r = s;
  try{
  if(isDigit(s.charAt(0)))
  {
    r = fix + s;
  }
  }
  catch(e) {
      report("978 "+ s + " " +e);
  }
  return(r);
}

	/*
	public static void fixRefdes(SchematicToolEnvironment ste, Schematic sm)
	{
		Vector<DComponent> vdj = sm.getComponents();
		Collections.sort(vdj, new ComponentComparator());
		Iterator<DComponent> itd = vdj.iterator();
		String refdes = null;
		Vector<StringPair> vsp = new Vector<StringPair>();
		while(itd.hasNext())
		{
			DComponent dc = itd.next();
			String slotdef = dc.getAttributeValue("slotdef");
			refdes = dc.getAttributeValue("refdes");
			if((refdes != null) && (slotdef == null) && (refdes.indexOf("?") == -1))
			{
				if(Character.isLetter(refdes.charAt(refdes.length() -1)))
				{
					refdes = refdes.substring(0, refdes.length() -1);
				}
				StringPair sp = parseRefdes(refdes);
				try{
				int t = sp.getIntValue();
				update(vsp, sp.getParameter(), t);
				}
				catch(NumberFormatException nfe)
				{
					System.out.println("HardwareSupport " + sp.getValue() + " " + nfe);
				}
			}
		}
		
		// assign unassigned
		itd = vdj.iterator();
		while(itd.hasNext())
		{
			DComponent dc = itd.next();
			String slotdef = dc.getAttributeValue("slotdef");
			refdes = dc.getAttributeValue("refdes");
			if((refdes != null) && (slotdef == null) && (Character.isLetter(refdes.charAt(refdes.length() -1))))
			{
				//skip
				System.out.println("HadwareSupport skipping " + refdes);
			}
			else if((refdes != null) && (slotdef == null )&& ((refdes.indexOf("?")) != -1))
			{
				StringPair sp = parseRefdes(refdes);
				int f = getMaxRef(vsp, sp.getParameter());
				if(f == -1)
				{
					refdes = sp.getParameter() + "1";
					update(vsp, sp.getParameter(), 1);
				}
				else
				{
					String suffix = Integer.toString(f+1);
					refdes = sp.getParameter() + suffix;
					update(vsp, sp.getParameter(), f+1);
				}
				dc.setAttributeValue("refdes", refdes);
			}
		}
	}
	
	private static int getMaxRef(Vector<StringPair>vsp, String s)
	{
		int i = -1;
		boolean b = true;
		Iterator<StringPair> it = vsp.iterator();
		while(b && it.hasNext())
		{
			StringPair sp = it.next();
			if(s.equals(sp.getParameter()))
			{
				i = sp.getIntValue();
				b = false;
			}
		}
		return(i);
	}
	
	private static void update(Vector<StringPair>vsp, String s, int t)
	{
		boolean b = true;
		Iterator<StringPair> it = vsp.iterator();
		while (b && it.hasNext())
		{
			StringPair sp = it.next();
			if(sp.getParameter().equalsIgnoreCase(s))
			{
				if(t > sp.getIntValue())
				{
					sp.setValue(Integer.toString(t));
				}
				b = false;
			}
		}
		if(b)
		{
			vsp.add(new StringPair(s, Integer.toString(t)));
		}
	}
	
	public static StringPair parseRefdes(String refdes)
	{
		int k = refdes.length();
		int i = 0;
		int m = 0;
		int n = 0;
		String label = "";
		String num = ""; 
//		if(refdes.indexOf("?") != -1)
		while(i < k)
		{
			int x = refdes.charAt(i);
			if(Character.isDigit(x))
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
		System.out.println(label + ":" + num);
		StringPair sp = new StringPair(label, num);
		return(sp);
	}
	
*/

function makeHardwareTemplateOfSymbol(dcomp)
{
  let name = getAttributeValue("device", dcomp);
  let sbx = "";
  let sb = "";
  let date = new Date();
  sb +="// " + name + ".js " + (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear().toString().substr(2,2) + "  " + date.getTime() + "\n\n";
  sb += "// this is a template hardware model for " + name + "\n";
  sb += "// eightolives hardware model version 2\n\n";
  sb += name + ".prototype = new Element();\n";
  sb += name + ".prototype.constructor = " + name + ";\n\n";
  sb += "function " + name + "()\n{\n  this.name = \"" + name + "\";\n  this.initialize();";
  sb += "\n\n  //define ports\n"
//  sb += getHWGenerics(dcomp, "");
  let sbb = "\n  this.define = function()\n  {\n  //define ports\n  clearArray(this.ports);\n";
  let vp = dcomp.getPins();
  
  let vhdl = new VHDL();
  let numslots = getAttributeValue("numslots", dcomp); // check for slotted part
  if(numslots == null) 
  {
    numslots = 0;
    let refdes = getAttributeValue("refdes", dcomp);
    if(refdes.indexOf("?") == -1)
    {
      if( refdes != fixRefdes(refdes))
      {
	numslots = -1;
      }
    }
  }
  let hty = new Hashtable();
  vhdl.getPinMapString(vp, dcomp, numslots, hty);
//  let k = vp.length;
  let k = hty.t.length;
  let i = 0;
//  let vhdl = new VHDL();
  while(i < k)
  {
//    let p = vp[i];
//    let x = vhdl.getModeForPintype(getAttributeValue("pintype", p));
    let x = "INOUT";
    let p = hty.t[i].key;
    let jx = p.indexOf(":");
    let n = p.substring(0, jx).trim();
    let parray = p.substring(jx+1).split(" ");
    let stype = "";
    let plength = parray.length;
    if(plength == 2) 
    {
      x = parray[0];
      stype = parray[1];
    }
    if(plength == 3) 
    {
      x = parray[1];
      stype = parray[2];
    }
    /*
    let kj = plength;
    let ij = 0;
    let sa = "\n";
    while(ij < kj)
    {
      sa += ij + " " + parray[ij] + "\n";
      ij += 1;
    }
    alert("parray.length = " + parray.length + sa);
    */
    let xx = 2;
    if(x == "IN") xx =  0;
    else if(x == "OUT") xx = 1;
    
    p = dcomp.getPinByName(n);
    let pintype = 0;
    pintype = getAttributeValue("pintype", p);
//    sb += "1192 pintype = " + pintype + "\n";
//    if(parray[1].indexOf("std_logic_vector") != -1) pintype = 1;
    if(stype.indexOf("std_logic_vector") != -1) pintype = 1;
//   console.log("1201 " + p + " " + x + " " + pintype);
//    if((pintype == 0) || (pintype == "in"))
    if(pintype != "bus")
    {
//      let n = getAttributeValue("pinlabel", p);
      sb += "  let " + n + " = null;\n";
      p = dcomp.getPinByName(n);
      let pinno = getAttributeValue("pinnumber", p);
      if((pinno != null) && (pinno != ""))
      {
	sbb += "  " + n + " = this.addNewStdLogicPortPin(\"" + n + "\", " + xx + ", \"" + pinno + "\").signal;\n";
      }
      else sbb += "  " + n + " = this.addNewStdLogicPort(\"" + n + "\", " + xx + ").signal;\n";
      if(xx != 0) sbx += "  " + n + ".set(\"U\");\n";
    }
    /*
    else if(((pintype == 1)) || (pintype == "out")) //TODO
    {
      p = dcomp.getPinByName(n);
      let L1 = 7;
      let L2 = 0;
      let sz = getAttributeValue("size", p);
      if(sz != null)
      {
	    if(isNaN(sz))
	    {
	      L1 = sz + " - 1";
	      L2 = 0;
	    }
	    else
        {
	      L1 = Number(sz) - 1;
	      L2 = 0;
	    }
      }
      else
      {		
	    sz = getAttributeValue("L1", p);
	    if(sz != null)
	    {
	      L1 = sz;
	    }
	    sz = getAttributeValue("L2", p);
	    if(sz != null)
    	{
	      L2 = sz;
	    }
      }
      
      sb += "  let " + getAttributeValue("pinlabel", p) + " = null;\n";
      sbb += "  " + getAttributeValue("pinlabel", p) + " = this.addNewStdLogicVectorPort(\"" + getAttributeValue("pinlabel", p) + "\", " + xx + ", " + L1 + ", " + L2 + ").signal;\n";
    }
    */
    else if(pintype == "bus")
    {
      let pl = getAttributeValue("pinlabel", p);
      let s3 = "[";
      p.membernames.forEach((mn, index) => {
          if(index != 0) s3 += ", ";
//          else s3 = "[";
          s3 += '\'' + pl + "_" + mn + '\'';
          sb += "  let " + pl + "_" + mn +" = null;\n";
          sbb += "  " + pl + "_" + mn +" = this.addNewStdLogicPort(\"" + pl + "_" + mn  + "\", 2).signal;\n";
          sbx += "  " + pl + "_" + mn + ".set(\"Z\");\n";
      });
//      if(s3 != "") 
      s3 += "]";
      sb += "  let " + pl + " = null;\n";
      let L1 = getAttributeValue("L1", p);
      let L2 = getAttributeValue("L2", p);
      if((L1 !=null) && (L2 != null) && !((L1 == 0) && (L2 == 0)))
      {
        sbb += "  " + pl +" = this.addNewStdLogicVectorPort(\"" + getAttributeValue("pinlabel", p) + "\", 2, " + L1 + ", " + L2 + ").signal;\n";
        let v = makeVectorOf("Z", L1, L2);
        sbx += "  " + n + ".set(v);\n";
      }
      else sbb += "  " + pl + " = this.addNewBusPort(\"" + getAttributeValue("pinlabel", p) + ", " + s3 +  ");\n";
    }
    i += 1;
  }
  sbb += "  }\n";
  sbb += "  this.define();\n";
  
  sb += "\n  // define any internal variables\n";
  sb += "\n  //define generics\n";
  sb += getHWGenerics(dcomp, "");
  sb += sbb;
  /*
  let v = dcomp.attributes;
  let sbg = "";
  k = v.length;
  i = 0;
  while(i < k)
  {
    let an = v[i].name;
    if(an.charAt(0) == 'T')
    {
      sb += "  let " + an + " = new Time();\n  " + an + ".setTime(" + v[i].value + ");\n";
      sb += "  this.addGeneric(" + an + ");\n";
    }
    i += 1;
  }
  */
  sb += "\n  // set attributes\n  setAttributeValue(\"PRIMITIVE\",this, \"true\");\n";
  
  sb += "\n  //define architecture\n  let a = this.addNewArchitecture(\"simulatable\");\n  a.initialize();\n";
  
  sb += "\n  a.uninitialize = function()\n  {\n";
  sb += sbx;
  sb += "  if(!a.functionality) report('1274 ' + refdes.value + ' ' + device.value + ' has empty execute function.');\n";
  
  sb += "  }\n\n  a.execute = function()\n  {\n  \n";
  sb += "  a.functionality = false; // comment this out\n";
  

  sb += "  }\n";
  sb += "}\n\n";
  sb += "addModelDescription(new ModelDescription(\"" + name + "\", " + name + ", []));\n\n";
  return(sb);
}

function makeVectorOf(c, L1, L2)
{
  let v = "";
  let l = Math.abs(L1 - L2) + 1;
  if(isNaN(c))
  {
    let i = 0;
    if(c.length == 1)
    {
      for(i=0; i< l;i++)
      {
        v += c;
        v = v.toString();
      }
    }
  }
  else
  {
       
  }
  
  return(v);  
}

function dec2bin(dec) {
  return (dec >>> 0).toString(2);
}

function addUniqueStringToArray(str, arr)
{
  let k = arr.length;
  let i = 0;
  let b = true;
  while(b && (i < k))
  {
    if(str == arr[i]) b = false;
    i += 1;
  }
  if(b) arr.push(str);
  return(b);
}

function getHWGenerics(dc, ref)
{
  let sb = "";
  let bx = (dc.klass == "SchematicSheet");
//  report("getHWGenerics " + dc.klass);
  let v = dc.attributes;
  let k = v.length;
  let i = 0;
  let hg = "";
  let hh = "this";
  let bsm = false;
  let refdes = fixRefdes(ref);
  if(refdes != "") 
  {
    hg = refdes + "_";
    hh = refdes;
    bsm = true;
  }
  while(i < k)
  {
    let an = v[i].name;
    if(an.charAt(0) == 'T')
    {
      if(bsm) sb += "  " + refdes + ".addTimeGeneric(\"" + an + "\", \"" + v[i].value + "\");\n";
      else sb += "  let " + an + " = this.addTimeGeneric(\"" + an + "\", \"" + v[i].value + "\");\n";
    }
    else
    {
      let vc = v[i].value;
      if(an == "refdes") vc = fixRefdes(vc);
      if(bsm) sb += "  " + refdes + ".addStringGeneric(\"" + an + "\", \"" + vc + "\");\n";
      else if(!bx || ((an != "device") && (an != "refdes")))
      {
	sb += "  let " + an + " = this.addStringGeneric(\"" + an + "\", \"" + vc + "\");\n";
//	report("  " + an);
      }
    }
    i += 1;
  }
  return(sb);
}

function inRefArray(s, a)
{
  let b = false;
  let k = a.length;
  let i = 0;
  while(!b && (i < k))
  {
    let ai = a[i];
    if((s == ai) || (s == ai.substring(0, ai.length -1))) b = true;
    i += 1;
  }
  return(b);
}

let refa = [];
let CompNames = [];

function makeEmptyModels()
{
  report("makeEmptyModels");
  if(PROJECT_LIB == "LOCAL")
  {
    let k = CompNames.length;
    let i = 0;
    while(i < k)
    {
      let fnm = CompNames[i];
      if(fnm.indexOf(".js") == -1) fnm += ".js";
      let f = localStorage.getItem(fnm);
      if(f == null)
      {
	let comps = ste.getSchematic().getComponents();
	let dcomp = null;
	let kk = comps.length;
	let ii = 0;
	let b = true;
	while(b && (ii < kk))
	{
	  let d = getAttributeValue("device", comps[ii]);
	  if((d != null) && (d == CompNames[i]))
	  {
	    b = false;
	    localStorage.setItem(fnm, makeHardwareTemplateOfSymbol(comps[ii]));
	  }
	  ii += 1;
	}
      }
      i += 1;
    }
    
  }
  
}

function makeHardwareModelofSchematic()
{
let vhdl = new VHDL();
let sm = ste.getSchematic();
let sheets = sm.sheets;
let name = getAttributeValue("designname", sheets[0].getTitleSheet());
let designname = name;
let sbx = "";
let sb = "";
let date = new Date();
sb +="// " + name + ".js " + (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear().toString().substr(2,2) + "  " + date.getTime() + "\n\n";
sb += "// this is a hardware model for " + name + "\n";
sb += "// eightolives hardware model version 2\n\n";
sb += name + ".prototype = new Element();\n";
sb += name + ".prototype.constructor = " + name + ";\n\n";
sb += "function " + name + "()\n{\n  this.name = \"" + name + "\";\n  this.initialize();\n\n  //define generics\n";
sb += getHWGenerics(sheets[0].DrawingObjects[0], "");
//sb += "// --\n";
//sb += getHWGenerics(sheets[0], "");

sb += "\n  //define ports\n";
let sbf = true;
//see if any ports
let hty = new Hashtable();
let ht = new Hashtable();
let htq = new Hashtable();
refa = [];
let vdj = sm.getComponents();
let kk = vdj.length;
let ii = 0;
while(ii < kk)
{
  let r = getAttributeValue("refdes", vdj[ii]);
  if(r != null) 
  {
    refa[refa.length] = r;
  }
  ii += 1;
}
ii = 0;
let refdes = null;
let device = null;
let PortNames = [];
//let CompNames = [];
clearArray(CompNames);
let pinname = null;
let s = null;
let first = true;
let x = false;
let pn = "";
while(ii < kk)
{
  let dc = vdj[ii];
  refdes = getAttributeValue("refdes", dc);
  device = getAttributeValue("device", dc);
  if((refdes != null) && (device != null))
  {
    x = false;
    let dp = null;
    if(device.indexOf("VHDL_INPUT_PORT") != -1)
    {
      x = true;
      dp =dc.getPins()[0];
      pinname = dp.connectedSignal;
      if(inRefArray(pinname, refa)) pinname = "S_" + pinname;
      let pinno = getAttributeValue("pinnumber", dp);
      if(dp.pintype == 0) 
      {
	if((pinno != null) && (pinno != ""))
	{
	  sb += "  let " + pinname + " = this.addNewStdLogicPortPin(\"" + pinname + "\", 0, \"" + pinno + "\").signal;\n";
	}
	else sb += "  let " + pinname + " = this.addNewStdLogicPort(\"" + pinname + "\", 0).signal;\n";
	addUniqueStringToArray(pinname, PortNames);
      }
      else
      {
	let bu = sm.getBus(pinname);
	let sz = null;
	if(bu != null)
	{
	  sz = getAttributeValue("size", bu);
	}
	if(sz != null)
	{
	  let L1 = sz -1;
	  let L2 = 0;
	  sb += "  this.addNewStdLogicVectorPort(\"" + pinname + "\", 0, " + L1 + ", " + L2 + ");\n";
	  addUniqueStringToArray(pinname, PortNames);
	}
//	else s = "   " + pinname + " : IN " + pinname + "_TYPE";
      }
    }
    else if(device.indexOf("VHDL_INOUT_PORT") != -1)
    {
      x = true;
      dp =dc.getPins()[0];
      pinname = dp.connectedSignal;
      if(inRefArray(pinname, refa)) pinname = "S_" + pinname;
      let pinno = getAttributeValue("pinnumber", dp);
      if(dp.pintype == 0) 
      {
	if((pinno != null) && (pinno != ""))
	{
	  sb += "  let " + pinname + " = this.addNewStdLogicPortPin(\"" + pinname + "\", 2, \"" + pinno + "\").signal;\n";
	}
	else sb += "  let " + pinname + " = this.addNewStdLogicPort(\"" + pinname + "\", 2).signal;\n";
	addUniqueStringToArray(pinname, PortNames);
      }
      else
      {
	let bu = sm.getBus(pinname);
	let sz = null;
	if(bu != null)
	{
	  sz = getAttributeValue("size", bu);
	}
	if(sz != null)
	{
	  let L1 = sz -1;
	  let L2 = 0;
	  sb += "  this.addNewStdLogicVectorPort(\"" + pinname + "\", 2, " + L1 + ", " + L2 + ");\n";
	  addUniqueStringToArray(pinname, PortNames);
	}
//	else s = "   " + pinname + " : INOUT " + pinname + "_TYPE";
      }
    }
    else if(device.indexOf("VHDL_OUTPUT_PORT") != -1)
    {
      x = true;
      dp =dc.getPins()[0];
      pinname = dp.connectedSignal;
      if(inRefArray(pinname, refa)) pinname = "S_" + pinname;
      let pinno = getAttributeValue("pinnumber", dp);
      if(dp.pintype == 0) 
      {
	if((pinno != null) && (pinno != ""))
	{
	  sb += "  let " + pinname + " = this.addNewStdLogicPortPin(\"" + pinname + "\", 1, \"" + pinno + "\").signal;\n";
	}
	else sb += "  let " + pinname + " = this.addNewStdLogicPort(\"" + pinname + "\", 1).signal;\n";
	addUniqueStringToArray(pinname, PortNames);
      }
      else
      {
	let bu = sm.getBus(pinname);
	let sz = null;
	if(bu != null)
	{
	  sz = getAttributeValue("size", bu);
	}
	if(sz != null)
	{
	  let L1 = sz -1;
	  let L2 = 0;
	  sb += "  this.addNewStdLogicVectorPort(\"" + pinname + "\", 1, " + L1 + ", " + L2 + ");\n";
	  addUniqueStringToArray(pinname, PortNames);
	}
//	else s = "   " + pinname + " : OUT " + pinname + "_TYPE";
      }
    }
  }
  ii += 1;
}

sb += "\n  //define architecture\n  let a = this.addNewArchitecture(\"schematic\");\n  a.initialize();\n\n";
// create components
let prereqs = "[";
// create signals
let its = sm.netv;
kk = its.length;
ii = 0;
sb += "\n  //define signals\n";
while(ii < kk)
{
  let name = its[ii].netname;
  if((!vhdl.isInVector(name, PortNames)) && (name != "OPEN") && (name != "open"))
  {
    let n = sm.getNet(name);
    let m = sm.getBus(name);
    let comment = n.comment;
    let type = getAttributeValue("logic_type", n);
    if(type == null) 
    {
      type = "std_logic";
      if(m != null)
      {
	type = "std_logic_vector";
      }
    }
    if(inRefArray(name, refa)) 
    {
      sb += "  // signal name " + name + " changed to S_" + name + "\n";
      name = "S_" + name;
    }
    if(type == "std_logic")
    {
//      sb += "  let " + name + " = new StdLogic();\n";
//      sb += "  " + name + ".name = \"" + name + "\";\n";
//      sb += "  a.addSignal(" + name + ");\n\n";
      sb += "  let " + name + " = a.addNewStdLogicSignal(\"" + name + "\");\n";
    }
    else if(type == "std_logic_vector")
    {
      let L1 = 7;
      let L2 = 0;
      if(m != null)
      {
	L1 = m.getL1();
	L2 = m.getL2();
      }
      sb += "  let " + name + " = a.addNewStdLogicVectorSignal(\"" + name + "\", " + L1 + ", "+ L2 + ");\n";
    }
  }
  ii += 1;
}

// create body
sb += "\n  //define body\n";
vdj = sm.getComponents();
let ref = null;
let dclast = null;
let dlast = null;
device = null;
let vp = [];
kk = vdj.length;
ii = 0;
while(ii < kk)
{
  let dc = vdj[ii];
  refdes = getAttributeValue("refdes", dc);
  refdes = fixRefdes(refdes);
  device = getAttributeValue("device", dc);
  let xskip = false;
  if(device.indexOf("VHDL_INPUT_PORT") != -1) xskip = true;
  else if(device.indexOf("VHDL_INOUT_PORT") != -1) xskip = true;
  else if(device.indexOf("VHDL_OUTPUT_PORT") != -1) xskip = true;
//  report("1632 " + device + " " + device.length);
  if((refdes == null) || (refdes.length == 0) || (device.length == 0)) 
  {
    xskip = true;
    /*
    if(device.indexOf("CONST") == 0)
    {
      let pins = dc.getPins();
      if(pins.length == 1)
      {
	let p = pins[0];
//	if(p.pintype == 0)
	{
	  let c = p.connectedSignal;
	  let a = getAttributeValue("value", dc);
	  if(a.length == 1) a = "\'" + a + "\'";
	  else if(a.indexOf("\"") != 0) a = "\"" + a + "\""; 
	  if((a != null) && (c != ""))
	  {
	    sbb += c + " <= " + a + ";\n"
	  }
	}
      }
    }
    */
  }
  
  if(!xskip)
  {
    if(ref == null)  // first component
    {
      device = this.fixVhdlName(device, refdes + "_" );
      dclast = device;
      dlast = dc;
      ref = refdes;
      vp = dc.getPins();
    }
    else if(ref == fixRefdes(refdes)) // if slotted or multi-piece
    {
      if(dclast == getAttributeValue("device", dc))
      {
	addAll(dc.getPins(), vp);
      }
      else
      {
	report("eo_schematic4 modelschematic different device name for " + refdes);
	sb += "\n-- ERROR different device name for " + refdes + "\n";
      }
    }
    else // next component is different
    {
      // first output dlast component data
      HWMap(vp, dlast, htq);
      sb += processComponentModel(ref, vp, dlast, dclast, htq);
      addUniqueStringToArray(dclast, CompNames);
//      sb += "  " + ref + ".define();\n";
      sb += "  }\n";

      if(!ht.containsKey(dclast))
      {
	  ht.put(dclast, dclast);	  
      }
           
      // then initialize for current component  
      hty.clear();
      htq.clear();
      ref = fixRefdes(refdes);
      device = this.fixVhdlName(device, refdes + "_" );
      numslots = getAttributeValue("numslots", dc);
      if(numslots == null) numslots = 0;
      vp = dc.getPins();
      dclast = getAttributeValue("device", dc);
      dlast = dc;
    }
  }
ii += 1;
}

if(ii > 0) // process last component
{
  HWMap(vp, dlast, htq);
  sb += processComponentModel(ref, vp, dlast, dclast, htq);
  addUniqueStringToArray(dclast, CompNames);
//  sb += "  " + ref + ".define();\n";
  sb += "  }\n";
}
      
sb += "\n  /* //schematics normally use the default uninitialize and execute functions \n  a.uninitialize = function()\n  {\n";
sb += sbx;
  
sb += "  }\n\n  a.execute = function()\n  {\n  \n";
sb += "  }\n  */\n";
sb += "}\n\n";
  
kk = CompNames.length;
ii = 0;
let bfirst = true;
while(ii < kk)
{
    if(bfirst) bfirst = false;
    else if(prereqs.length > 1) prereqs += ", ";
    if(CompNames[ii] != "")prereqs += "\"" + CompNames[ii] + "\"";
    ii += 1;
}
prereqs += "]";
sb += "addModelDescription(new ModelDescription(\"" + designname + "\", " + designname + ", " + prereqs + "));\n\n";
return(sb);
}

function processComponentModel(ref, vp, dlast, dclast, htq)
{
  let sb = "";
  sb += "\n  let " + ref + " = a.addInstance(\"" + ref + "\", getInstanceOf(\"" + dclast + "\"));\n";
  sb += "  if(" + ref + " != null)\n  {\n";
  sb += getHWGenerics(dlast, ref);
  sb += "  " + ref + ".define();\n";

  let k = htq.t.length;
  let bslot = getAttributeValue("slotdef", dlast);
  if(bslot != null) bslot = true;
  else bslot = false;
//  let k = vp.length;
  let i = 0;
  while(i < k)
  {
    //if(!skip) 
    
    let val = htq.t[i].value;
    if((val != null) && (val != ""))
    {
      let pn = null;
      let pt = dlast.getPinByName(htq.t[i].key);
      if(pt != null) pn = getAttributeValue("pinnumber", pt);
      if((pn == null) && bslot)
      {
	let hx = htq.t[i].key.lastIndexOf("_");
	if(hx != -1) pn = htq.t[i].key.substring(hx + 1);
      }
      let vx = htq.t[i].value;
      if((vx != "") && (vx != "S_") && (pn != 0))
      {
      if(pn != null)
      {
      sb += "  " + ref + ".connectPortPinToSignal(\"" + htq.t[i].key + "\", \"" + pn + "\", " + htq.t[i].value + ");\n";
	
      }
      else 
      {
      sb += "  " + ref + ".connectPortToSignal(\"" + htq.t[i].key + "\", " + htq.t[i].value + ");\n";
      }
      }
    }
    
    /*
    let pt = vp[i];
    let ps = pt.connectedSignal;
    if((ps != null) && (ps != ""))
    {
      let pn = getAttributeValue("pinnumber", pt);
      let pl = getAttributeValue("pinlabel", pt);
      if(bslot) pl = pl + "_" + pn;
      if(pn != null)
      {
      sb += "  " + ref + ".connectPortPinToSignal(\"" + pl + "\", " + pn + ", " + ps + ");\n";
	
      }
      else 
      {
      sb += "  " + ref + ".connectPortToSignal(\"" + pl + "\", " + ps + ");\n";
      }
    }
    */
    i += 1;
  }
 
  
  return(sb);
}

function getPinBN(num, vpin)
{
  let p = null;
  let k = vpin.length;
  let i = 0;
  let b = true;
  while(b && (i < k))
  {
    if(num == getAttributeValue("pinnumber", vpin[i]))
    {
      b = false;
      p = vpin[i];
    }
    i += 1;
  }
  return(p);
}

function HWMap(vpin, dc, htq)
{
  let sb = [];
  let vp = [];
  let ht = new Hashtable();
  let i = 0;
  let numslots = getAttributeValue("numslots", dc);
  if(numslots == null) numslots = 0;
  if(numslots > 0)
  {
    let k = dc.attributes.length;
    while(i < k)
    {
     if(dc.attributes[i].name == "slotdef")
     {
      let v = dc.attributes[i].value;
      let z = v.substring(v.indexOf(":") + 1);
      let parray = z.split(",");
      let kk = parray.length;
      let ii = 0;
      while(ii < kk)
      {
	let pin = getPinBN(parray[ii], vpin);
	let pl = getAttributeValue("pinlabel", pin);
	if(!ht.containsKey(parray[ii]))
	{
	  let obj = new newobj();
	  ht.put(parray[ii], pl);
	  setAttributeValue("pinnumber", obj, parray[ii]);
	  let pinlabel = pl + "_" + parray[ii];
	  setAttributeValue("pinlabel", obj, pinlabel);
	  vp[vp.length] = obj;
	  
	  let g = pin.connectedSignal;
	  if((g != null) && (g != "OPEN") && (g != "open") && (g != ""))
	  {
	    if(inRefArray(g, refa)) 
	    {
	      g = "S_" + g;
	    }
	    htq.put(pinlabel, g);
	  }
	}
	ii += 1;
      }
     }
     i += 1;
    }
    k = vpin.length;
    i = 0;
    while(i < k)
    {
      let pnn = getAttributeValue("pinnumber", vpin[i]);
      if(pnn != null)
      {
	if(!ht.containsKey(pnn))
	{
	  vp[vp.length] = vpin[i];
	  ht.put(pnn, "");
	  let pinlabel = getAttributeValue("pinlabel", vpin[i]);
	  let g = vpin[i].connectedSignal;
	  if((g != null) && (g != "OPEN") && (g != "open"))
	  {
	    let f = pinlabel + "_" + pnn;
	    if(inRefArray(g, refa)) g = "S_" + g;
	    htq.put(f,g);
	  }
	}
      }
      i += 1;
    }
    
  }
  else if(numslots == -1)  // non-homogenious but not slotted
  {
    let ref = getAttributeValue("refdes", dc);
    let ref1 = fixRefdes(ref);
    let sm = ste.getSchematic();
    let vdj = sm.getComponents();
    let kk = vdj.length;
    let ii = 0;
    let refdes = null;
    let device = null;
    while(ii < kk)
    {
      let dcomp = vdj[ii];
      refdes = getAttributeValue("refdes", dcomp);
      device = getAttributeValue("device", dcomp);
      if((refdes != null) && (device != null))
      {
	if(ref1 == fixRefdes(refdes))
	{
	  vp = dcomp.getPins();
	  k = vp.length;
	  i = 0;
	  while(i < k)
	  {
	  let pin = vp[i];
	  let pinlabel = getAttributeValue("pinlabel", pin);
	  let g = pin.connectedSignal;
	  if((g != null) && (g != "OPEN") && (g != "open"))
	  {
	    if(inRefArray(g, refa)) g = "S_" + g;
	    htq.put(pinlabel, g);
	  }
	  i += 1;
	  }
	}
      }
      ii += 1;
    }
  }
  else
  {
    vp = vpin;
    k = vp.length;
    i = 0;
    while(i < k)
    {
      let pin = vp[i];
      let pinlabel = getAttributeValue("pinlabel", pin);
      let pinnumber = getAttributeValue("pinnumber", pin);
      let g = pin.connectedSignal;
      if((g != null) && (g != "OPEN") && (g != "open"))
      {
	if(inRefArray(g, refa)) g = "S_" + g;
        htq.put(pinlabel, g);
      }
      i += 1;
    }
  }

}


function makeSchematicForSymbol(dcomp)
{
  let vp = dcomp.getPins();
  let hty = new Hashtable();
  let vhdl = new VHDL();
  let numslots = getAttributeValue("numslots", dcomp);
  let ref = getAttributeValue("refdes", dcomp);
  if(numslots == null) numslots = 0;
  if((numslots == 0) && (ref != fixRefdes(ref))) numslots = -1;
  vhdl.getPinMapString(vp, dcomp, numslots, hty)
  newSheet(true);
  setAttributeValue("designname", sheet.getTitleSheet(), getAttributeValue("device", dcomp));
  let n = 15;
  let fp = null;
  let k = hty.t.length;
  let j = 0;
  let b = false;
  let x = 2000;
  let y = 7000;
  let i = 0;
  while(i < k)
  {
    let p = hty.t[i].key; //vp[i];
    let pi = p.indexOf(":");
    if(p.substring(pi).indexOf("INOUT") != -1) n = 15;
    else if(p.substring(pi).indexOf("OUT") != -1) n = 14;
    else n = 13;
      
    let dc = new DComponent(de, x, y, "1", "0", "0", DemoLib[n]);
    fp = new FileParser(DemoLib[n]);
    let d = fp.parse1(DemoLibK[n]);
    if(d != null)
    {
      dc.addDrawingObjects(d.doj);
      dc.addAttributes(d.attributes); 
    }
    let pn = dc.getPins()[0];
    let ptn = hty.t[i].value;
    pi = ptn.indexOf(":");
    a = ptn.substring(0, pi).trim();
    pn.connectedSignal = a;
    setAttributeValue("pinlabel", pn, a);
    a = ptn.substring(pi + 1).trim();
    setAttributeValue("pinnumber", pn, a);
    a = getAttribute("pinnumber", pn);
    a.visibility = 1;
    sheet.addDrawingObject(dc);
    sheet.selectedObject = pn;
    addNetStub();
    i += 1;
    j += 1;
    if(i%40 == 0)
    {
      j = 0;
      y = 7000;
      x = 2000;
      newSheet(true);
      setAttributeValue("designname", sheet.getTitleSheet(), getAttributeValue("device", dcomp));
      b = false;
    }
    if(j == 10)
    {
      b = !b;
      if(b) y =6750;
      else y = 7000;
      x += 2000;
      j = 0;
    }
    else
    {
     y -= 500; 
    }
  }

}
