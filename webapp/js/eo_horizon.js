 // eo_horizon.js
 
 class Horizon {
     
     sym = null;
     points = [];
     part_uuid = "";
     base_uuid = "";
     entity_uuid = "";
     unit_uuid = "";
     horizon_base_url = "";
     filename = "";
     device_name = "";
     prefix = "";
     pindefs = null;
     
     constructor(horizon_base_url) {
         this.sym = null;
         this.horizon_base_url = horizon_base_url;
     }
     
     getSymbol(filename) {
         
     }
     
     parse(jdata) {
         if(jdata.type == "part")
         {
           this.sym = null;
           this.pindefs = null;
           if(typeof jdata.base !== 'undefined')
           {
             base_uuid = jdata.base;
             part_uuid = jdata.uuid;
           }
           else if(base_uuid == "")
           {
             part_uuid = jdata.uuid;
             entity_uuid = jdata.entity;
             this.getEntity();
           }
           
             
         }
         else if(jdata.type == "entity")
         {
           this.sym = null;
           this.pindefs = null;
           this.device_name = jdata.name;
           this.prefix = jdata.prefix;
           let keys = jdata.gates.keys;
           if(keys.length == 1)
           {
             this.unit_uuid = jdata.gates[keys[0]].unit;
             this.getUnit();
           }
         }         
         else if(jdata.type == "unit")
         {
           this.sym = null;
           this.pindefs = jdata.pins;
           this.getSymbol();
         }
         else if(jdata.type == "symbol")
         {
           this.sym = new DComponent(de, 0, 0, 1, 0, 0, jdata.name);
           
           let a = Attribute.createAttribute("unit", jdata.unit);
           this.sym.addAttribute(a);
           a = Attribute.createAttribute("uuid", jdata.uuid);
           this.sym.addAttribute(a);
           setAttributeValue("device", this.sym, jdata.name);
           a = getAttribute("device", this.sym);
           a.setVisible(true);
           a.setY(a.getY() + 100);
           let ref = "A?";
           if(this.prefix != "") ref = prefix + "?";
           setAttributeValue("refdes", this.sym, ref);
           
           let keys = Object.keys(jdata.junctions);
           keys.forEach( (key) => {
               let position = jdata.junctions[key].position;
               let pt = new PointI(position[0], position[1]);
               pt.key = key;
               this.points.push(pt);
               report("27 " + pt.x + " " + pt.y + " " + pt.key);
           });
           
           let pins = Object.keys(jdata.pins);
           pins.forEach( (key, i) => {
               let x = jdata.pins[key].position;
               let x1 = htoCmils(x[0]);
               let y1 = htoCmils(x[1]);
               let len = htoCmils(jdata.pins[key].length);
               let orient = jdata.pins[key].orientation;
               let x2 = x1 + len;
               let y2 = y1;
               let whichend = 0;
               if(orient == "right")
               {
                 x2 = x1 - len;
                 y2 = y1;
               }
               else if(orient == "down")
               {
                 x2 = x1;
                 y2 = y1 + len;
               }
               else if(orient == "up")
               {
                 x2 = x1;
                 y2 = y1 - len
               }
               let pin = new DPin(de, x1, y1, x2, y2, PIN_COLOR, 0, whichend, 10); 
               let pindef = this.getPindefByKey(key);
               if(pindef != null)
               {
                 let dir = pindef.direction;
                 let d = "io";
                 if(dir.indexOf("power") == 0) d = "pwr";
                 else if(dir == "input") d = "in";
                 else if(dir == "open_collector") d = "oc";
                 else if(dir == "output") d = "out";
                 else if(dir == "bidirectional") d = "io";
                 else if(dir == "passive") d = "pas";
                 setAttributeValue("pintype", pin, d);
                 let pname = pindef.primary_name;
                 report("120 pindef " + dir + " " + pname);
                 setAttributeValue("pinlabel", pin, pname);
                 setAttributeValue("pinseq", pin, i);
                 pin.fixPinlabel();
//                 pin.updateAttributeLocations();
               }
               else report("126 pindef is null for key " + key);
               this.sym.addDrawingObject(pin);
           });
           
           let lines = Object.keys(jdata.lines);
           lines.forEach( (key) => {
               let pos1 = this.getPositionByKey(jdata.lines[key].from);
               let pos2 = this.getPositionByKey(jdata.lines[key].to);
               let x1 = htoCmils(pos1.x);
               let y1 = htoCmils(pos1.y);
               let x2 = htoCmils(pos2.x);
               let y2 = htoCmils(pos2.y);
               let width = 3;
               report("70 line " + x1 + ", " + y1 + " / "+ x2 + ", "+ y2);
               let line = new DLine(de, x1, y1, x2, y2, GRAPHIC_COLOR, width, 0, 0, 0,0);
               this.sym.addDrawingObject(line);
           });
         }
         return(this.sym);
     }
     
     getPositionByKey(key) {
         let k = this.points.length;
         let i = 0;
         let b = true;
         let r = null;
         while(b && (i < k))
         {
           if(key == this.points[i].key)
           {
             b = false;
             r = this.points[i];
           }
           else i += 1;
         }
         return(r);
     }
     
     getPindefByKey(key) {
         let r = null;
         if(this.pindefs != null)
         {
           r = this.pindefs[key];
         }
         else report("182 this.pindefs == null");
         return(r);
     }
     
     getEntity() {
         
     }
     
     getUnit() {
         
     }
     
     getSymbol() {
         
     }
     
     
     
 } // end class Horizon

 function htoCmils(n)
 {
   let y = n /12500;
   return(y);
 }
 
 
