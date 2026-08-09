// eo_analog.js


class AnalogSim {
    constructor (schem) {
       this.schem = schem; 
    }
    
    checkDesignForSim() {
        
    }
    
    calculateOperatingPoints() {
        
    }
    
} // end class AnalogSim

class PinDef {
    constructor(pinno, lastv, anet) {
        this.pinno = pinno;
//        this.lastv = lastv;
        this.lasti = 0;
        this.anet = anet;
        this.alias = null;
    }
    
    getLastV() {
        let v = 0;
        if(this.anet != null) v = this.anet.getLastV()
        return(v);   
    }
    
    setLastV(v) {
        if(this.anet != null) this.anet.setLastV(v);
    }
    
    getLastI() {
        return(this.lasti);
    }
    
    setLastI(i) {
        this.lasti = i;
    }
    
}

class AnalogModel {
    constructor () {
        this.name = "";
        this.bVoltageSource = false;
        this.bCurrentSource = false;
        this.V0 = 0;
        this.I0 = null;
        this.pindefs = [];
        this.lasti = 0;
        this.comp = null;
        
    }
    
    init(comp) {
        this.comp = comp;
    }
    
    // Override this function for other parts.
    getI(v, anet, dt, pinno) {
        return(this.I0);  
    }
    
    getVestForI(i, anet, dt, pinno)
    {
      return(null);  
    }
    
    // Override this function for other parts.
    getRecommendedDeltaT() {
        let dt = 1000; // 1000 ps
        return(dt);
    }
    
    isVoltageSource() {
        return(this.bVoltageSource);
    }
    
    isCurrentSource() {
        return(this.bCurrentSource);
    }
    
    getPinDef(pinno) {
        let k = this.pindefs.length;
        let i = 0;
        let b = true;
        let r = null;
        while(b && (i<k))
        {
          if(pinno == this.pindefs[i].pinno)
          {
            b = false;
            r = this.pindefs[i];
          }
          else i += 1;
        }
        return(r);
    }
    
    getPinDefByAlias(alias) {
        let k = this.pindefs.length;
        let i = 0;
        let b = true;
        let r = null;
        while(b && (i<k))
        {
          if(alias == this.pindefs[i].alias)
          {
            b = false;
            r = this.pindefs[i];
          }
          else i += 1;
        }
        return(r);
    }

    setANetOnPin(anet, pinno) {
      let b = true;
      let r = this.getPinDef(pinno);
      if(r != null) r.anet = anet;  
      return(r);
    }

    getANetOnPin(pinno) {
      let anet = getPinDef(pinno).anet;
      return(anet);
    }
    
} // end class Analog Model

class Resistor extends AnalogModel {
    constructor () {
        super();
        this.name = "Resistor";
        this.pindefs = [
          new PinDef(1, 0, null),
          new PinDef(2, 0, null)
          ];
        
    }
    
    init(comp) {
        this.comp = comp;
        let r = getAttributeValue("value", comp);
        if(isNaN(r))
        {
          let j = r.indexOf("K");
          if(j != -1) r = Number(r.substring(0,j)) * 1000;
          else if((j= r.indexOf("M")) != -1) r = Number(r.substring(0,j)) * 1000000;
          this.r = r;
        }
        if(isNaN(r)) sb += "Resistor " + refdes + " excluded , value is Not a Number\n";
        else this.r = r;
    }
    
    /** Gets the current into the pin when the the net is at a voltage.
     * */
    getI(v, anet, dt, pinno) {
        let i = 0;
        if(pinno == 1)
        {
//          this.pindefs[0].getLastV() = v;
//          i = (this.pindefs[0].getLastV() - this.pindefs[1].getLastV()) / this.r;
          i = (v - this.pindefs[1].getLastV()) / this.r;
          this.pindefs[0].lasti = i;
          this.pindefs[1].lasti = -i;
        }
        else if(pinno == 2)
        {
//          this.pindefs[1].getLastV() = v; 
//          i = -((this.pindefs[0].getLastV() - this.pindefs[1].getLastV()) / this.r);
          i = -((this.pindefs[0].getLastV() - v) / this.r);
          this.pindefs[0].lasti = -i;
          this.pindefs[1].lasti = i;
        }
        areport("130       for R pinno = " + pinno + " i = " + i + " v1 = " + this.pindefs[0].getLastV() + " v2 = " + this.pindefs[1].getLastV());
        this.lasti = i;
        return(i);  
    }
    
    /** Gets the voltage of the net to support the current into the pin.
     * */
    getVestForI(i, anet, dt, pinno)
    {
      let vest = 0;
      let vopp = 0;
      let vold = anet.getLastV();
      if(pinno == 1)
      {
        vopp = Number(this.pindefs[1].getLastV());
        if(vold < vopp) vest = -i * this.r + vopp;
        else vest = i * this.r + vopp;
//        vest = -i * this.r + this.pindefs[0].getLastV();
//        vest = i * this.r + Number(this.pindefs[1].getLastV());
      }
      else
      {
        vopp = Number(this.pindefs[0].getLastV());
        if(vold < vopp) vest = -i * this.r + vopp;
        else vest = i * this.r + vopp;
        
//        vest = i * this.r +  Number(this.pindefs[0].getLastV());  
      }
      return(vest);  
    }
    
    getRecommendedDeltaT() {
        let dt = 1000; // 1000 ps
        return(dt);
    }
    
} // end class Analog Model

class Capacitor extends AnalogModel {
     constructor () {
        super();
        this.name = "Capacitor";
        this.pindefs = [
          new PinDef(1, 0, null),
          new PinDef(2, 0, null)
          ];
        
    }
    
    init(comp) {
        this.comp = comp
        let C = getAttributeValue("value", comp);
        if(isNaN(C))
        {
          let j = C.indexOf("m");
          if(j != -1) C = Number(C.substring(0,j)) * 1000;
          else if((j= C.indexOf("u")) != -1) C = Number(C.substring(0,j)) * 1000000;
          else if((j= C.indexOf("n")) != -1) C = Number(C.substring(0,j)) * 1000000000;
          else if((j= C.indexOf("p")) != -1) C = Number(C.substring(0,j)) * 1000000000000;
        }
        else this.c = C;
    }
    
    getI(v, anet, dt, pinno) {
        let i = 0;
        if(dt == 0)
        {
          i = 0;   
        }
        else
        {
          if(dt != 0)
          {
            let vx = this.pindefs[1].getLastV();
            if(pinno == 2) vx = this.pindefs[0].getLastV();
            i = this.c * (v - vx) / dt;
          }
          if(pinno == 1) 
          {
//          this.pindefs[0].getLastV() = v;
            this.pindefs[0].lasti = i;
          }
          else 
          {
            i = -i;
//          this.pindefs[1].getLastV() = v;
            this.pindefs[1].lasti = i;
          }
        }
       return(i);  
    }
    
    
    getVestForI(i, anet, dt, pinno)
    {
        let v = 0;
        if(dt == 0)
        {
          v = anet.getV();  
        }
        return(v);
    }
   
    getRecommendedDeltaT() {
        let dt = 1000; // 1000 ps
        return(dt);
    }
   
} // end class Capacitor

class Inductor extends AnalogModel {
     constructor () {
        super();
        this.name = "Inductor";
        this.analyze = null;
        this.lasti = 0;
        this.pindefs = [
          new PinDef(1, 0, null),
          new PinDef(2, 0, null)
          ];
    }
    
    init(comp) {
        this.comp = comp
        let L = getAttributeValue("value", comp);
        if(isNaN(L))
        {
          let j = L.indexOf("m");
          if(j != -1) L = Number(r.substring(0,j)) * 1000;
          else if((j= L.indexOf("u")) != -1) L = Number(L.substring(0,j)) * 1000000;
          else if((j= L.indexOf("n")) != -1) L = Number(L.substring(0,j)) * 1000000000;
        }
        else this.l = L;
    }
    
    getI(v, anet, dt, pinno) {
        let i = null;
        if(dt == 0)
        {
          if(pinno == 1)
          {
//            let anet = 
            if(Math.abs(v - this.pindefs[1].getLastV()) > Math.abs(v * .002) + .001)
            {
              this.pindefs[1].anet.bDone = false;
              this.pindefs[0].anet.bTempDone = false;
            }
            this.pindefs[1].setLastV(v);
            i = this.pindefs[1].getLastI();
            let z = this.pindefs[1].anet.getNetZ();
            report("274 z = " + z);
            if(z != 0)
            {
            let i0 = Math.abs(v - this.pindefs[1].getLastV() / z);
            i -= i0;
            }
          }
          else
          {
            if(Math.abs(v - this.pindefs[0].getLastV()) > Math.abs(v * .002) + .001)
            {
              this.pindefs[0].anet.bDone = false;
              this.pindefs[1].anet.bTempDone = false;
            }
            this.pindefs[0].setLastV(v);
            i = this.pindefs[0].getLastI();  
            let z = this.pindefs[0].anet.getNetZ();
            report("291 z = " + z);
            if(z != 0)
            {
            let i0 = Math.abs(v - this.pindefs[0].getLastV() / z);
            i -= i0;
            }
          }
        }
        /*
        let vx = this.pindefs[1].getLastV();
        if(pinno == 2) vx = this.pindefs[0].getLastV();
        i = this.lasti + (this.v  / this.l) * dt;
        if(pinno == 1) this.pindefs[0].lasti = i;
        else this.pindefs[1].lasti = i;
        */
        return(i);  
    }
    
    getVestForI(i, anet, dt, pinno)
    {
      let vest = 0;
      let vopp = 0;
      let vold = anet.getLastV();
      if(dt == 0)
      {
        if(pinno == 1)
        {
          this.pindefs[0].setLastI(-i);
          this.pindefs[1].setLastI(i);
          vest = this.pindefs[1].getLastV();
        }
        else
        {
          this.pindefs[0].setLastI(-i);
          this.pindefs[1].setLastI(i);
          vest = this.pindefs[0].getLastV();
            
        }
      }
      else
      {
          /*
      if(pinno == 1)
      {
        vopp = Number(this.pindefs[1].getLastV());
        if(vold < vopp) vest = -i * this.r + vopp;
        else vest = i * this.r + vopp;
//        vest = -i * this.r + this.pindefs[0].getLastV();
//        vest = i * this.r + Number(this.pindefs[1].getLastV());
      }
      else
      {
        vopp = Number(this.pindefs[0].getLastV());
        if(vold < vopp) vest = -i * this.r + vopp;
        else vest = i * this.r + vopp;
        
//        vest = i * this.r +  Number(this.pindefs[0].getLastV());  
      }
      */
      }
      return(vest);  
    }
    
    getRecommendedDeltaT() {
        let dt = 1000; // 1000 ps
        return(dt);
    }
   
    
} // end class Inductor

class Diode_Signal extends AnalogModel {
     constructor () {
        super();
        this.name = "Diode_Signal";
        this.Is = .000000000035;  // 1N4148
        this.N = 1.24; // between 1 and 2
        this.Vt = .026; // at 25 C
        this.NVt = this.N * this.Vt;
        this.Vdiode = 0.7;
        let a = new PinDef(1, 0, null);
        a.alias = "A";
        this.pindefs.push(a);
        a = new PinDef(2, 0, null);
        a.alias = "K";
        this.pindefs.push(a);
    }
    
    init(comp) {
        this.comp = comp;
        let pA = comp.getPinByName("A");
        let pK = comp.getPinByName("K");
        if(pA != null)
        {
          let pn = pA.getPinnumber();
          this.pindefs[0].pinno = pn;
        }
        if(pK != null)
        {
          let pn = pK.getPinnumber();
          this.pindefs[1].pinno = pn;
        }
        
    }
    
    getI(v, anet, dt, pinno) {
        let id = 0;
        let i1 = this.pindefs[0].getLastI(); // lastsumi;
        let i2 = -this.pindefs[1].getLastI(); // lastsumi;
        let imax = Math.max(i1, -i2);
        let vd = 0;
        
        if(pinno == 1) 
        {
          vd = v - this.pindefs[1].getLastV();
          if(vd > this.Vdiode) id = imax;
//          this.pindefs[0].getLastV() = v;
//          iin = this.pindefs[0].anet.lastsumi;
        }
        else if(pinno == 2)
        {
          vd = this.pindefs[0].getLastV() - v;
          if(vd > this.Vdiode) id = -imax;
//          this.pindefs[1].getLastV() = v; 
//          iin = -this.pindefs[1].anet.lastsumi;
        }
//        let id = 0;
//        let vd = (this.pindefs[0].getLastV() - this.pindefs[1].getLastV());
//        report("276 diode pin 1 v = " + this.pindefs[0].getLastV() + " i = " + this.pindefs[0].anet.lastsumi + " pin 2 v = " + this.pindefs[1].getLastV() + " i = " + (-this.pindefs[1].anet.lastsumi)  + " id = " + id);
        if(vd > 0)
        {
//          if(vd > 1) vd = 1;
//          let eterm = Math.exp(vd / this.NVt);
//          id = this.Is * (eterm - 1);
//          id = iin;
//          id = -this.pindefs[1].lasti;
          id = imax + this.pindefs[1].anet.lastsumi
          let vg = this.pindefs[0].getLastV() - this.Vdiode;
          this.pindefs[1].anet.setLastV(vg);
          this.pindefs[1].anet.setV(vg);
        }
        report("298    vd = " + vd + " id = " + id);
        if(id > 1) id = 1;
        if(id < 0) id= 0;
        if(pinno == 1) 
        {
          this.pindefs[0].setLastI(id); // lasti = id;
          this.pindefs[1].setLastI(-id); //lasti = -id;
        }
        else if(pinno == 2)
        {
          id = -id;
          this.pindefs[1].setLastI(id); //lasti = id;
          this.pindefs[0].setLastI(-id); //lasti = -id;
        }
        report("276    diode pin 1 v = " + this.pindefs[0].getLastV() + " i = " + this.pindefs[0].anet.lastsumi + " pin 2 v = " + this.pindefs[1].getLastV() + " i = " + (-this.pindefs[1].anet.lastsumi)  + " id = " + id);
        return(id);  
    }
    
    getVestForI(i, anet, dt, pinno)
    {
      let vest = null;
      if(pinno == 1)
      {
        if(i <= 0) // lastv too low
        {
          vest = this.pindefs[1].getLastV() + this.Vdiode;
          let vest2 = this.pindefs[0].getLastV() + this.Vdiode;
          if(vest < vest2) vest = vest2;
        }
        else
        {
          vest = this.pindefs[1].getLastV() + this.Vdiode;
        }
      }
      if(pinno == 2)
      {
        if(this.pindefs[0].getLastV() > this.pindefs[1].getLastV() + this.Vdiode) vest = this.pindefs[0].getLastV() - this.Vdiode;
        else vest = this.pindefs[1].getLastV();
      }
      return(vest);  
    }
    
    getRecommendedDeltaT() {
        let dt = 1000; // 1000 ps
        return(dt);
    }
   
    
} // end class Diode

class VoltageSource extends AnalogModel {
     constructor () {
        super();
        this.name = "VoltageSource";
        this.VoltageSource = true;
        this.r = .001;
        this.pindefs = [
          new PinDef(1, 0, null),
          new PinDef(2, 0, null)
          ];
     }
     
     init(comp) {
         this.comp = comp;
         let r = getAttributeValue("value", comp);
         if(isNaN(r))
         {
           let j = r.indexOf("V");
           if(j != -1) r = Number(r.substring(0,j));
           else if((j= r.indexOf("m")) != -1) r = Number(r.substring(0,j)) / 1000;
         }
         if(isNaN(r)) sb += "VoltageSource " + refdes + " excluded , value is Not a Number\n";
         else this.V0 = r;
        
     }
     
     getI(v, anet, dt, pinno) {
        let tnet = this.pindefs[0].net;
        if(pinno == 2) tnet = this.pindefs[1].net;
        v = this.V0 + this.pindefs[1].getLastV();
        // get currents from all the other devices on the net
        
        return(null); 
     }
     
     getVestForI(i, dt, pinno)
     {
        let v = null;
        if(pinno == 1)
        {
          v = this.V0 + this.pindefs[1].getLastV();  
        }
        else
        {
          v = this.V0 + this.pindefs[1].getLastV();  
        }
        return(v);
     }
}
     
 class CurrentSource extends AnalogModel {
     constructor () {
        super();
        this.name = "CurrentSource";
        this.CurrentSource = true;
        this.I0 = Is;
        this.pindefs = [
          new PinDef(1, 0, null),
          new PinDef(2, 0, null)
          ];
     }
     
     init(comp) {
         this.comp = comp;
     }
     
     getI(v, anet, dt, pinno) {
        let i = this.I0;
        if(pinno == 1) 
        {
//            this.pindefs[0].getLastV() = v;
            i = this.I0;
        }
        else 
        {
//            this.pindefs[1].getLastV() = v;
            i = -this.I0;
        }
        // get currents from all the other devices on the net
        
        return(i); 
     }
     
 }
    
class NPN extends AnalogModel {
     constructor () {
        super();
        this.name = "NPN";
        this.Is = .000000000035;  
        this.N = 1.24; // between 1 and 2
        this.Vt = .026; // at 25 C
        this.NVt = this.N * this.Vt;
        this.Vdiode = 0.7;
        this.beta = 50;
        let a = new PinDef(1, 0, null);
        a.alias = "C";
        this.pindefs.push(a);
        a = new PinDef(2, 0, null);
        a.alias = "B";
        this.pindefs.push(a);
        a = new PinDef(3, 0, null);
        a.alias = "E";
        this.pindefs.push(a);
    }
    
    init(comp) {
        this.comp = comp;
        let b1 = getAttributeValue("beta", comp);
        if(b1 != null) this.beta = Number(b1);
        let pC = comp.getPinByName("C");
        let pB = comp.getPinByName("B");
        let pE = comp.getPinByName("E");
        if(pC != null)
        {
          let pn = pC.getPinnumber();
          this.pindefs[0].pinno = pn;
        }
        if(pB != null)
        {
          let pn = pB.getPinnumber();
          this.pindefs[1].pinno = pn;
        }
        if(pE != null)
        {
          let pn = pE.getPinnumber();
          this.pindefs[2].pinno = pn;
        }
        this.pe = this.getPinDefByAlias("E");
        this.pb = this.getPinDefByAlias("B");
        this.pc = this.getPinDefByAlias("C");
    }
    
    getI(v, anet, dt, pinno) {
      let pd = this.getPinDef(pinno);
      let i = 0;
      if(pd.alias == "B")
      {
        let i1 = pd.getLastI();
        let i2 = -this.pe.getLastI() / (1 + this.beta); 
        let imax = Math.max(i1, -i2);
        let vd = v - this.pe.getLastV();
        if(vd > this.Vdiode) 
        {
          i = imax;
          this.pe.setLastV(vd - this.Vdiode);
        }
      }
      else if(pd.alias == "E")
      {
        let vd = this.pb.getLastV() - v;
        let i1 = pd.getLastI(); 
        let i2 = -this.pb.getLastI() * (1 + this.beta); 
        let imax = Math.max(i1, -i2);
        if(vd > this.Vdiode) 
        {
          i = -imax;
           this.pe.setLastV(vd - this.Vdiode);
        }
      }
      else if(pd.alias == "C")
      {
        let vd = this.pb.getLastV() - v;
        let i1 = pd.getLastI(); 
        let i2 = this.pb.getLastI() * this.beta; 
        let imax = Math.max(i1, i2);
        if(vd > this.Vdiode) i = -imax;
      }
      
      report("649  i = " + i + " Vbase = " + v + " Ve = " + this.pe.getLastV() + " Vc = " + this.pc.getLastV());
        
      return(i);
    }
    
    getVestForI(i, anet, dt, pinno) {
      let pd = this.getPinDef(pinno);
      let v = null;
      if(pd.alias == "B")
      {
        v = this.pe.getLastV() + this.Vdiode;
      }
      else if(pd.alias == "E")
      {
        if(this.pb.getLastV() > this.pe.getLastV() + this.Vdiode)
        {
          v = this.pb.getLastV() - this.Vdiode;
        }
        else v = this.pe.getLastV();
      }
      else if(pd.alias == "C")
      {
        v = this.pc.getLastV();
      }
      
      return(v);
    }
    
    
}

let AnalogModels = [VoltageSource, CurrentSource, Resistor, Capacitor, Inductor, Diode_Signal, NPN]; 

function getAnalogModelByName(name)
{
  let m = null;
  let k = AnalogModels.length;
  let i = 0;
  let b = true;
  while(b && (i < k))
  {
    if(name == AnalogModels[i].name)
    {
      m = AnalogModels[i];
      b = false;
    }
    else i += 1;
  }
  return(m);
}
