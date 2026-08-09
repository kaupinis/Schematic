// eo_analysis.js

let Analyzer = null;
let bToggleVoltagesOn = false;
let adebug = true;
let bdebug = true;

function areport(s)
{
  if(adebug) report(s);   
}

function breport(s)
{
  if(bdebug) report(s);   
}

function r(n)
{
  return(Math.round( 1000 * n) / 1000);
}

class Pobj {
    constructor(pin, comp) {
        this.klass = "Pobj";
        this.pin = pin;
        this.comp = comp;
        this.pinno = getAttributeValue("pinnumber", pin);
    }
    
}

class ANet {
    constructor(netname, pobj) {
        this.klass = "ANet";
        this.netname = netname;
        this.pobjs = [pobj];
        this.lastv = 0;
        this.lastsumi = 0;
        this.lastiabs = 0;
        this.v = 0;
        this.i = 0;
        this.bFixedVoltage = false;
        this.bFixedCurrent = false;
        this.bDone = false;
        this.di = null;
        this.dv = null;
        this.vmin = -1000;
        this.vmax = 1000;
    }
    
    setV(v) {
        this.v = v;
    }
    
    getV() {
        return(this.v);
    }
    
    setLastV(v) {
        if(!this.bFixedVoltage) this.lastv = v;
    }
    
    getLastV() {
        return(this.lastv);
    }
    
    addPobj(pobj){
        this.pobjs.push(pobj);
    }
    
    getNetZ() {
        let z = 1000;
        if(this.lastiabs != 0) z = this.v / this.lastiabs;
        return(z);
    }
    
    /*
    sumI(v, dt) {
        let sum = 0;
        let k = this.pobjs.length;
        let i =0;
        for(i=0; i<k; i++)
        {
          let pin = this.pobjs[i].pin;
          let comp = this.pobjs[i].comp;
          sum += comp.amodel.getI(v, this, dt, getAttributeValue("pinnumber", pin)); 
        }
        return(sum);
    }
    */
    
    
}

class Analyze {
    constructor() {
        this.comps = []; // DComponents
        this.nets = [];  // ANets
        this.fixedNets = [];
        this.gnd = null;
        this.voltage_sources = [];
        this.current_sources = [];
        this.CurrentThreshold = .000001;
        this.MaxIterations = 15;
        this.MITmax = 5;
        
        
    }
    
    /** This resets the bDone flag of all nets related to anet.
     * 
     */
    undone(anet) {
//        areport("85 undone " + anet.netname);
        if(!anet.bFixedVoltage)
        {
          anet.pobjs.forEach((pob) => {
            let pinz = pob.comp.getPins();
            pinz.forEach((pin) => {
                let nn = pin.getConnectedSignal();
                if((nn != null) && (nn != "GND"))
                {
                  let a = this.getANet(nn);
                  if((a != null) && !a.bFixedVoltage)
                  {
                    a.bDone = false;  
//                    areport("89 undone " + nn);
                  }
                }
                
            });
            
          });
        }
        
    }
    
    addPin(pin, comp) {
        let netname = pin.connectedSignal;
        let a = null;
        let b = true;
        let k = this.nets.length;
        let i = 0;
        while(b && (i < k))
        {
          if(this.nets[i].netname == netname)
          {
            b = false;
          }
          else i += 1;
        }
        let pobj = new Pobj(pin, comp);
        if(b)  // net not in nets
        {
          a = new ANet(netname, pobj);
          if(netname == "GND") a.bFixedVoltage = true;
          if(comp.amodel.name == "VoltageSource") a.bFixedVoltage = true;
          this.nets.push(a);
        }
        else
        {
           this.nets[i].addPobj(pobj);
           if(comp.amodel.name == "VoltageSource") this.nets[i].bFixedVoltage = true;
           a = this.nets[i];
        }
        let pinno = pin.getPinnumber();
//        report("87 " + comp.amodel.name + " " + pinno);
        let pd = comp.amodel.getPinDef(pinno);
        if(pd == null) report("90 null for pinno " + pinno + " " + comp.amodel.name);
        else pd.anet = a;
    }
    
    getANet(netname) {
        let k = this.nets.length;
        let i = 0;
        let b = true;
        let r = null;
        while(b && (i<k))
        {
          if( this.nets[i].netname == netname)
          {
            b = false;
            r = this.nets[i];
          }
          else i += 1;
        }
        return(r);
    }
    
    checkAnalyze(){
        clearReport();
        generateGEDANetList(ste.schematic.sheets);
//        clearReport();
        let date = new Date();
        let sb = "Check Analyze    " +  (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear().toString().substr(2,2) + "\n\n";
   
        let sheets = ste.schematic.sheets;
        let k1 = sheets.length;
        let i1 = 0;
        for(i1 = 0; i1 < k1; i1++)
        {
          let sheet = sheets[i1];
          let scomps = sheet.getDrawingObjects(); //dojs;
          scomps.forEach((c) => {
            if(c.klass == "DComponent")
            {
              let refdes = getAttributeValue("refdes", c);
              if(refdes != "")
              {
              let amodelname = getAttributeValue("amodelname", c);
              if(amodelname == null)
              {
                let dname =  getAttributeValue("device", c);
 //               report("128 dname = " + dname + " refdes = " + refdes);
                if((refdes.charAt(0) == 'R') && (!isNaN(refdes.charAt(1))))
                {
                    c.amodel = new Resistor(); 
                    amodelname = "Resistor";
                    setAttributeValue("amodelname",c, amodelname);
                }
                else if(dname.indexOf("VoltageSource") == 0)
                {
                    report("154 make VoltageSource");
                    c.amodel = new VoltageSource(); 
                    amodelname = "VoltageSource";
                    setAttributeValue("amodelname",c, amodelname);
                    this.voltage_sources.push(c);
                }
                else if((refdes.charAt(0) == 'D') && (!isNaN(refdes.charAt(1))))
                {
                  let r = getAttributeValue("value", c);
                  if((r == null) || (r == "") ||(r == "Signal") || (r =="1N4148"))
                  {
                    report("177 add Diode_Signal");
                    c.amodel = new Diode_Signal(); 
                    amodelname = "Diode_Signal";
                    setAttributeValue("amodelname",c, amodelname);
                  }
                }
                else if((refdes.charAt(0) == 'Q') && (!isNaN(refdes.charAt(1))))
                {
                  let r = getAttributeValue("description", c);
                  if(r.indexOf("NPN") != -1)
                  {
                    report("266 add NPN");
                    c.amodel = new NPN(c); 
                    amodelname = "NPN";
                    setAttributeValue("amodelname",c, amodelname);
                  }
                }
                else if((refdes.charAt(0) == 'C') && (!isNaN(refdes.charAt(1))))
                {
                  report("177 add Capacitor");
                  c.amodel = new Capacitor(); 
                  amodelname = "Capacitor";
                  setAttributeValue("amodelname",c, amodelname);
                }
                else if((refdes.charAt(0) == 'L') && (!isNaN(refdes.charAt(1))))
                {
                  report("177 add Inductor");
                  c.amodel = new Inductor(); 
                  c.amodel.analyze = this; // ?
                  amodelname = "Inductor";
                  setAttributeValue("amodelname",c, amodelname);
                }
               
              }
              if(amodelname != null)
              {
                if((typeof c.amodel === 'undefined') || (c.amodel == null))
                {
                  let am = getAnalogModelByName(amodelname);
                  if(am != null) c.amodel = new am();
                }
                if(c.amodel != null)
                {
                  c.amodel.init(c);
                  this.comps.push(c);
                  let dpins = c.getPins();
                  dpins.forEach((dpin) => {
                    this.addPin(dpin, c);   
                  });
                }
              }
              }
              
            }
          });
        }
        sb += "Number of components with models: " + this.comps.length + "\n";
        sb += "Number of nets for analysis: " + this.nets.length + "\n\n";
        this.comps.forEach((comp) => {
            sb += getAttributeValue("device", comp) + " " + getAttributeValue("refdes", comp)  + " " + getAttributeValue("value", comp)+ "\n";
        });
        this.nets.forEach((net) => {
            net.bDone = false;
            sb += net.netname + " " + net.v + "\n";
        });
  
//        CloseMenu();
        return(sb);
        }
    
         
    /** estimates the sum of all pin currents on the net and the total current flowing.
     * If sum is <0, the net voltage is too low,
     * If sum > 0, the net voltage is too high
     * */
    estimateSumIForNet(anet) {
        let sum = 0;
        let iabs = 0;
        let dt = 0;
        let v = anet.v;
        areport("266 estimateSumI for " + anet.netname + " @ " + v + " Volts");
        anet.pobjs.forEach((pobj) => {
            let i = pobj.comp.amodel.getI(v, anet, dt, pobj.pin.getPinnumber());
//            areport("191    i = " + i + " at v = "+ v + " pinno = " + pobj.pin.getPinnumber() + " "+ getAttributeValue("refdes", pobj.comp));
            areport("191    " + getAttributeValue("refdes", pobj.comp) + "-" + pobj.pin.getPinnumber() + " i = " + i + " at v = "+ v);
            sum += i;
            if(i > 0) iabs += i;
//            iabs += Math.abs(i) / 2;
        });
        iabs = iabs - sum;
        areport("272    sum = " + sum + ", threshold is " + this.CurrentThreshold + " iabs = " + iabs);
        let sumo = {sum: sum, iabs: iabs};
        return(sumo);
    }
    
    estimateNextV(anet, i) {
        let a = [];
        let bFirst = true;
        let vold = anet.getLastV();
        let bTooLow = (i < 0);
        let vest = null;
        let dt = 0;
        let sv = 0;
        let iv = 0;
        areport("281 estimateNextV for " + anet.netname + " with iabs = " + i);
        anet.pobjs.forEach((pobj) => {
            let x = pobj.comp.amodel.getVestForI(i, anet, dt, pobj.pin.getPinnumber());
            areport("284   " + getAttributeValue("refdes", pobj.comp) + "-" + pobj.pin.getPinnumber() + "  v = " + r(x));
            if((x != null) && (x != 0))
            {
              a.push(x);  
              iv += 1;
              sv += 1 / x;
            }
        });
        if(sv != 0) sv = 1/sv;
        if(a.length > 0) 
        {
          vest = a[0];
          let vv = Math.abs(vest);
          a.forEach((v) => {
//              report("      212 vp = " + v);
             if(Math.abs(v) < vv) 
             {
               vest = v;
               vv = Math.abs(v);
             }
          });
          areport("300    (vpreest = " + vest + ") sv = " + sv);
        }
        return(sv);
    }

    calculateOperatingPoint() {
        let sb = "Calculate Operating Point\n\n";
        document.getElementById("analogstat").textContent =  "";    
        this.CurrentThreshold = document.getElementById("limit").value; //.000001;
        this.MITmax = document.getElementById("major").value; //5;
        this.MaxIterations = document.getElementById("minor").value; //15;
        
        this.nets.forEach((net) => {
            net.bDone = false;
            if(net.netname == "GND") net.bFixedVoltage = true;
        });

        this.voltage_sources.forEach((vs) => {
          if(vs.getPinByNumber(2).connectedSignal == "GND")
          {
            let p = vs.getPinByNumber(1);
            let a = this.getANet(p.connectedSignal);
            if(a == null) report("208 a is null");
            else areport("209 " + a.netname + " " + a.v + " " + a.pobjs.length + " " + a.klass);
            a.v = vs.amodel.V0;
            a.lastv = vs.amodel.V0;
            report("207 VoltageSource sets " + p.connectedSignal + " to " +  a.v + " " + vs.amodel.V0 + " " + a.lastv);
            a.bFixedVoltage = true;
          }
        });
        
        let bfini = false;
        let mit = 0;
        while(!bfini && (mit < this.MITmax))
        {
        areport("330 **************************************");
        if(mit == 0) bfini = true;
        mit += 1;
        
        // for each net calculate sum i 
        this.nets.forEach((net) => {
            let itno = 0;
            let vmin = net.vmin;
            let vmax = net.vmax;
            areport("220 --------------------------------------");
            while(!net.bDone && (itno < this.MaxIterations))
            {
              areport("\n221 " + itno + " " + net.netname + " v = " + r(net.getV()) + " lastv = " + r(net.getLastV()) + " lastsumi = " + net.lastsumi + " dv= " + r(net.dv) + " di= " + r(net.di));
              itno += 1;
              net.bTempDone = true;
              let sumo = null;
              let sum = 0;
              let iabs = 0;
//              let sum = this.estimateSumIForNet(net);
//              net.v = -this.estimateNextV(net, sum);
              areport("   248 v = " + net.getV() );
              
              if(net.bFixedVoltage)
              {
 //               net.lastsumi = sum;
                sumo = this.estimateSumIForNet(net);
                net.setLastV(net.getV());
                net.dv = 0;
              }
              else
              {
                let lastv = net.getV();
                sumo = this.estimateSumIForNet(net);
                sum = sumo.sum;
                iabs = sumo.iabs;
                
                net.dv = net.getV() - net.getLastV();
                net.di = sumo.sum - net.lastsumi;
//                if(net.di == 0) net.bTempDone &= false;
                let sumOK = true;
                if(sumo.sum < -this.CurrentThreshold) // v is too low
                {
                  if(net.getV() > vmin) 
                  {
                      vmin = net.getV(); 
                      sumOK = false;
                  }
                }
                if(sumo.sum > this.CurrentThreshold) // v is too high
                {
                  if(net.getV() < vmax) 
                  {
                      vmax = net.getV();
                      sumOK = false;
                  }
                }
                
                if(!sumOK) this.undone(net);
                
//                net.vmin = vmin;
//                net.vmax = vmax;
                net.setLastV(net.getV());
                net.lastsumi = sumo.sum;
                let vavg = null;
                if((vmin != -1000) && (vmax != 1000)) vavg = (vmin + vmax) / 2;
                
                let nextv = 0;
                let nexti = Math.max(iabs, Math.abs(sum)) ;
                let nextVest = this.estimateNextV(net, nexti);  // was sum
                net.lastiabs = nexti;
                nextv = nextVest;
                let alpha =.7;
 //               nextv = net.getV() -  nextVest;
                if(sum < 0) nextv = alpha * net.getV() + (1 - alpha) * nextVest;
                else  nextv = alpha * net.getV() -  (1 - alpha) * nextVest; 
                if(itno == 1) nextv = nextVest;
//                net.v = nextv;
                areport("366 " + net.netname + " sum = " + sum + "  net.v = " + r(net.getV()) + " nextVest = " + r(nextVest) + " nextv = " + r(nextv));
                          
 //               report("297 nextv = " + nextv + " net.v = " + net.getV() + " nextVest = " + nextVest + " sum = " + sum);
 //               else nextv = net.v - .5 * this.estimateNextV(net, sum);
                if(nextv < vmin) nextv = vmin;   
                if(nextv > vmax) nextv = vmax;
                          
                if(sum > 0)
                {
                  if(nextv == vmax) 
                  {
                    nextv = .9 * vmax;   
                    if((vavg != null) && (vavg != 0)) nextv = vavg;
                  }
                  if(nextv > lastv) nextv = .9 * lastv;
                }
                else if(sum < 0)
                {
                  if(nextv == vmin) 
                  {
                    nextv = 1.1 * vmin;   
                    if((vavg != null) && (vavg != 0)) nextv = vavg;
                  }
                  if(nextv < lastv) nextv = 1.1 * lastv;
                }
                          
                net.dv = nextv - net.getV();
                net.setV(nextv);
 
                let didv = net.di;
                if(net.dv != 0) didv = net.di/ net.dv;
 //               let vavg = (vmin + vmax) / 2;
 //               report("236 dv= " + net.dv + " di = " + net.di + " sum= " + sum + "  lastsumi=" + net.lastsumi); 
                areport("   394 v= " + r(net.getV()) + " sum = " + r(sum) + " next v = " + r(net.getV()) + " vmin = " + r(vmin) + " vmax = " + r(vmax) + " net.di = " + r(net.di) + " net.dv = " + r(net.dv) + " didv = " + r(didv) + " vavg = " + r(vavg));
                if(((sum > this.CurrentThreshold) || (sum < -this.CurrentThreshold)) && (net.di != 0))
                {
                  net.bTempDone &= false;
                }
              }
              net.bDone = net.bTempDone;
              if(itno == 20) this.undone(net);
              }
              if((!net.bDone) || (Math.abs(net.lastsumi) > this.CurrentThreshold)) this.undone(net);
              areport("   242 " + net.netname + " net.lastv = " + r(net.getLastV()) + " net.lastsumi = " + r(net.lastsumi) + "\n");
        });
        let bm = true;
        sb += "------------------------------------\n";
        this.nets.forEach((net) => {
            if(net.netname.length < 10) sb += net.netname + "\t\t v = " + (Math.round(1000 * net.getLastV()) / 1000) + "V  " + net.bDone + " sum = " + net.lastsumi + " iabs = " + net.lastiabs + "\n";
            else sb += net.netname + "\t v = " + (Math.round(1000 * net.getLastV()) / 1000) + "V  " + net.bDone   + " sum = " + net.lastsumi + " iabs = " + net.lastiabs + "\n";
            bm &= net.bDone;
        });
        bfini = bm;
        }
        if(bfini) 
        {
          sb +=  "OK in " + mit + " iterations\n";
          document.getElementById("analogstat").textContent = "OK in " + mit + " iterations";
        }
        else 
        {
          sb += "Failed after " + mit + " iterations\n"; 
          document.getElementById("analogstat").textContent = "No convergence in " + mit + " iterations";
        }
      return(sb);
    }
    
    annotateVoltages(){
        let a = this.nets;
        let k1 = a.length;
        let i1 = 0;
        for(i1=0; i1< k1; i1++)
        {
          let nn = a[i1].netname;
          let dojs = sheet.getDrawingObjects();
          let k2 = dojs.length;
          let i2 = 0;
          let b = true;
          while(b && (i2<k2))
          {
            let doj = dojs[i2];
            if(doj.klass == "DNet")
            {
              let nnn = getAttributeValue("netname", doj);
              if(nn == nnn) 
              {
                b = false;
                if(a[i1].bDone == true)
                {
                  let v = Math.round(1000 * a[i1].getLastV()) / 1000 + "V";
                  let aa = setAttributeValue("netvoltage", doj, v); 
                  aa.setX(doj.getX() + 100);
                  aa.setY(doj.getY() + 100);
                  aa.colorindex = 4; // "NET_COLOR"
                  aa.setVisible(true);
                }
                else
                {
                  let v = Math.round(1000 * a[i1].getLastV()) / 1000 + "V";
                  let aa = setAttributeValue("netvoltage", doj, v +" ??"); 
                  aa.setX(doj.getX() + 100);
                  aa.setY(doj.getY() + 100);
                  aa.colorindex = 4; // "NET_COLOR"
                  aa.setVisible(true);
                   
                }
              }
              
            }
            i2 += 1;
          }
        }
        repaint();
    }
    
    toggleVoltages() {
        let dojs = sheet.getDrawingObjects();
        dojs.forEach((doj) => {
            let a = getAttribute("netvoltage", doj);
            if(a != null)
            {
              a.setVisible(bToggleVoltagesOn);   
            }
            
        });
        bToggleVoltagesOn = !bToggleVoltagesOn; 
        repaint();
    }
    
    
}

function checkAnalyze()
{
  if(Analyzer == null)
  {
    Analyzer = new Analyze();   
  }
  
  report(Analyzer.checkAnalyze());
    
}

function calculateOperatingPoint()
{
  if(Analyzer != null)
  {
//    report(Analyzer.checkAnalyze()); 
    report(Analyzer.calculateOperatingPoint());
    Analyzer.annotateVoltages();
  }
}

function annotateVoltages()
{
  Analyzer.annotateVoltages();
}

function toggleVoltages()
{
   Analyzer.toggleVoltages();
}

