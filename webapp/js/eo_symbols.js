// eo_symbols

let BuiltIn = [];

function BuiltInItem(title, link, desc, data)
{
  this.title = title;
  this.lib = "";
  this.link = link;
  this.desc = desc;
  this.data = data;
}

function addSymbol(lib, link, data)
{
  let bi = new BuiltInItem(link, link, "", data);
  bi.lib = lib;
  BuiltIn.push(bi);
}

function getBuiltInSymbolComponent(link)
{
  let fp = new FileParser(link);
  let d = null;
  let b = true;
  let k = BuiltIn.length;
  let i = 0;
  while(b && (i < k))
  {
    if(BuiltIn[i].link == link)
    {
      b = false;
      d = fp.parse1(BuiltIn[i].data);
//      sheet.selectedObject = d;
//      sheet.setState(STATE_PLACING);
    }
    else i += 1;
  }
  return(d);
}

function getBuiltInSymbol(link)
{
  let fp = new FileParser(link);
  let d = null;
  let b = true;
  let k = BuiltIn.length;
  let i = 0;
  while(b && (i < k))
  {
    if(BuiltIn[i].link == link)
    {
      b = false;
      d = fp.parse1(BuiltIn[i].data);
      sheet.selectedObject = d;
      sheet.setState(STATE_PLACING);
    }
    else i += 1;
  }
  return(d);
}

function getBuiltInSymbolIndex(link)
{
  let n = -1;
  let b = true;
  let k = BuiltIn.length;
  let i = 0;
  while(b && (i < k))
  {
    if(BuiltIn[i].link == link)
    {
      b = false;
      n = i;
    }
    else i += 1;
  }
  return(n);
}

function getBIS(link)
{
  CloseMenu();
  getBuiltInSymbol(link);  
}

let eo_symbols = "<?xml version=\"1.0\"?>\
<rss version=\"2.0\">\
<channel>\
<item>\
<title>Ground (chassis)</title>\
<link>eo_gnd_chassis.sym</link>\
<description>Model of a local chassis ground.</description>\
</item>\
<item>\
<title>Ground (earth)</title>\
<link>eo_earth.sym</link>\
<description>Model of earth ground.</description>\
</item>\
<item>\
<title>Analog Ground</title>\
<link>eo_agnd.sym</link>\
<description>Model of analog ground.</description>\
</item>\
<item>\
<title>Digital Ground</title>\
<link>eo_dgnd.sym</link>\
<description>Model of digital ground.</description>\
</item>\
<item>\
<title>Ground (triangle)</title>\
<link>eo_gnd_tri.sym</link>\
<description>Model of ground (triangle).</description>\
</item>\
<item>\
<title>Power Generic</title>\
<link>eo_power_generic.sym</link>\
<description>Generic model of a power bus.</description>\
</item>\
<item>\
<title>Power +3.3 V</title>\
<link>eo_power_3R3V.sym</link>\
<description>3.3 Volt Volt power bus.</description>\
</item>\
<item>\
<title>Power 5 V</title>\
<link>eo_power_5V.sym</link>\
<description>5 Volt power bus.</description>\
</item>\
<item>\
<title>Resistor</title>\
<link>eo_resistor.sym</link>\<description>Symbol model for a resistor. </description>\
</item>\
<item>\
<title>Capacitor</title>\
<link>eo_capacitor.sym</link>\
<description>Generic model of a capacitor. </description>\
</item>\
<item>\
<title>Capacitor Polar</title>\
<link>eo_capacitor_polar.sym</link>\
<description>Generic model of a polar capacitor. </description>\
</item>\
<item>\
<title>Inductor</title>\
<link>eo_inductor.sym</link>\
<description>Symbol model for an inductor. </description>\
</item>\
<item>\
<title>Inductor - iron/ferrite core</title>\
<link>eo_inductor_core.sym</link>\
<description>Symbol model for a iron/ferrite core inductor. </description>\
</item>\
<item>\
<title>Offsheet reference arrow in, arrow left</title>\
<link>eo_offsheetin.sym</link>\
<description>An offsheet reference symbol with arrow in and left, pin on right. </description>\
</item>\
<item>\
<title>Offsheet reference arrow out, arrow right</title>\
<link>eo_offsheetout.sym</link>\
<description>An offsheet reference symbol with arrow out and right, pin on left. </description>\
</item>\
<item>\
<title>Offsheet reference arrow out, arrow left</title>\
<link>eo_offsheetoutb.sym</link>\
<description>An offsheet reference symbol with arrow out and left, pin on right. </description>\
</item>\
<item>\
<title>Offsheet reference arrow in, arrow right</title>\
<link>eo_offsheetinb.sym</link>\
<description>An offsheet reference symbol with arrow in and right, pin on left. </description>\
</item>\
<item>\
<title>Input Port (VHDL)</title>\
<link>eo_input_port.sym</link>\
<description>A VHDL input port.</description>\
</item>\
<item>\
<title>Bus Input Port (VHDL)</title>\
<link>eo_input_port_bus.sym</link>\
<description>A VHDL bus (vector) input port.</description>\
</item>\
<item>\
<title>Input/Output Port</title>\
<link>eo_inout_port.sym</link>\
<description>A VHDL inout port.</description>\
</item>\
<item>\
<title>Bus Input/Output Port</title>\
<link>eo_inout_port_bus.sym</link>\
<description>A VHDL bus (vector) inout port.</description>\
</item>\
<item>\
<title>Output Port</title>\
<link>eo_output_port.sym</link>\
<description>A VHDL output port.</description>\
</item>\
<item>\
<title>Bus Output Port</title>\
<link>eo_output_port_bus.sym</link>\
<description>A VHDL bus (vector) output port.</description>\
</item>\
<item>\
<title>Microstrip Horizontal</title>\
<link>eo_microstrip_H.sym</link>\
<description>A horizontal microstrip symbol.</description>\
</item>\
<item>\
<title>Microstrip Vertical</title>\
<link>eo_microstrip_V.sym</link>\
<description>A vertical microstrip symbol.</description>\
</item>\
<item>\
<title>Potentiometer</title>\
<link>eo_pot.sym</link>\
<description>Symbol model for a potentiometer. </description>\
</item>\
<item>\
<title>Diode</title>\
<link>eo_diode.sym</link>\
<description>Generic model of a diode.</description>\
</item>\
<item>\
<title>Zener Diode</title>\
<link>eo_zener.sym</link>\
<description>Generic model of a Zener diode.</description>\
</item>\
<item>\
<title>Schottky Diode</title>\
<link>eo_schottkydiode.sym</link>\
<description>Generic model of a Schottky diode.</description>\
</item>\
<item>\
<title>Diode Bridge</title>\
<link>Diode_Bridge.sym</link>\
<description>Generic model of a diode bridge.</description>\
</item>\
<item>\
<title>SCR</title>\
<link>eo_scr.sym</link>\
<description>Generic model of an SCR.</description>\
</item>\
<item>\
<title>Triac</title>\
<link>eo_triac.sym</link>\
<description>Generic model of a triac.</description>\
</item>\
<item>\
<title>LED</title>\
<link>eo_led.sym</link>\
<description>Generic model of a light emitting diode (LED).</description>\
</item>\
<item>\
<title>NPN Transistor</title>\
<link>eo_npn.sym</link>\
<description>Symbol model for a generic NPN transistor.</description>\
</item>\
<item>\
<title>NPN Darlington Transistor</title>\
<link>eo_npn_darlington.sym</link>\
<description>Symbol model for a generic NPN Darlington transistor.</description>\
</item>\
<item>\
<title>PNP Transistor</title>\
<link>eo_pnp.sym</link>\
<description>Symbol model for a generic PNP transistor.</description>\
</item>\
<item>\
<title>JFET Transitor</title>\
<link>eo_jfet.sym</link>\
<description>Symbol model for a generic N channel junction FET.</description>\
</item>\
<item>\
<title>NMOS Transistor</title>\
<link>eo_nmos.sym</link>\
<description>Symbol model for a generic N channel MOSFET transistor.</description>\
</item>\
<item>\
<title>Dual Gate NMOS Transistor</title>\
<link>eo_nmos_dual_gate.sym</link>\
<description>Symbol model for a generic dual gate N channel MOSFET transistor.</description>\
</item>\
<item>\
<title>NMOS Transistor with diode</title>\
<link>eo_nmos_w_diode.sym</link>\
<description>Symbol model for a generic N channel MOSFET transistor with diode.</description>\
</item>\
<item>\
<title>PMOS Transistor</title>\
<link>eo_pmos.sym</link>\
<description>Symbol model for a generic P channel MOSFET transistor.</description>\
</item>\
<item>\
<title>PMOS Transistor with diode</title>\
<link>eo_pmos_w_diode.sym</link>\
<description>Symbol model for a generic P channel MOSFET transistor with diode.</description>\
</item>\
<item>\
<title>SPST Switch</title>\
<link>eo_spst.sym</link>\
<description>Symbol model for a Single Pole Single Throw switch.</description>\
</item>\
<item>\
<title>SPDT Switch</title>\
<link>eo_spdt.sym</link>\
<description>Symbol model for a Single Pole Double Throw switch.</description>\
</item>\
<item>\
<title>DPDT Switch</title>\
<link>eo_dpdt.sym</link>\
<description>Symbol model for a Double Pole Double Throw switch.</description>\
</item>\
<item>\
<title>Pushbutton Switch NO</title>\
<link>eo_pb_switch_no.sym</link>\
<description>Symbol model for a normally open pushbutton switch.</description>\
</item>\
<item>\
<title>Pushbutton Switch NC</title>\
<link>eo_pushbutton_NC.sym</link>\
<description>Symbol model for a normally closed pushbutton switch.</description>\
</item>\
<item>\
<title>Transformer</title>\
<link>eo_xfmr_1.sym</link>\
<description>Symbol model for a generic transformer.</description>\
</item>\
<item>\
<title>Transformer Step Down</title>\
<link>eo_xfmr_stepdn.sym</link>\
<description>Symbol model for a step down transformer.</description>\
</item>\
<item>\
<title>Transformer w/ Sec CT</title>\
<link>eo_xfmr_2.sym</link>\
<description>Symbol model for a generic transformer with a secondary center tap.</description>\
</item>\
<item>\
<title>Transformer w/ Pri, Sec CT</title>\
<link>eo_xfmr_3.sym</link>\
<description>Symbol model for a generic transformer with center taps on both primary and secondary.</description>\
</item>\
<item>\
<title>Transformer Air</title>\
<link>eo_xfmr_4.sym</link>\
<description>Symbol model for a generic air core transformer.</description>\
</item>\
<item>\
<title>Transformer Air w/ Sec CT</title>\
<link>eo_xfmr_5.sym</link>\
<description>Symbol model for a generic ait core transformer with a secondary center tap.</description>\
</item>\
<item>\
<title>Transformer Air w/Pri, Sec CT</title>\
<link>eo_xfmr_6.sym</link>\
<description>Symbol model for a generic air core transformer with center taps on both primary and secondary.</description>\
</item>\
<item>\
<title>Fuse</title>\
<link>eo_fuse.sym</link>\
<description>Symbol model for a fuse.</description>\
</item>\
<item>\
<title>Gas Discharge Tube</title>\
<link>GasDischargeTube.sym</link>\
<description>Symbol model for a 2 pin gas discharge tube.</description>\
</item>\
<item>\
<title>Crystal</title>\
<link>eo_xtal.sym</link>\
<description>Symbol model for a crystal.</description>\
</item>\
<item>\
<title>Op amp w/P&amp;G</title>\
<link>eo_opamp_pg.sym</link>\
<description>Symbol model for an op-amp with power and ground connections.</description>\
</item>\
<item>\
<title>Op amp</title>\
<link>eo_opamp_1.sym</link>\
<description>Symbol model for an op amp.</description>\
</item>\
<item>\
<title>Battery</title>\
<link>eo_battery_2cell.sym</link>\
<description>Symbol model for a battery.</description>\
</item>\
<item>\
<title>Test Point</title>\
<link>eo_testpoint.sym</link>\
<description>Symbol model for a test point or physical pin.</description>\
</item>\
<item>\
<title>Jumper</title>\
<link>eo_jumper.sym</link>\
<description>Symbol model for a jumper.</description>\
</item>\
<item>\
<title>Coax Connector</title>\
<link>eo_bnc.sym</link>\
<description>Symbol model for a coaxial connector.</description>\
</item>\
<item>\
<title>Audio Stereo (Tip/Ring/Shield) Connector</title>\
<link>eo_trs_connector.sym</link>\
<description>Symbol model for a stereo audio / tip/ring/shield connector.</description>\
</item>\
<item>\
<title>XLR Audio Connector</title>\
<link>eo_xlr3f.sym</link>\
<description>Symbol model for a 3 pin, female XLR type audio connector.</description>\
</item>\
<item>\
<title>DB9 Connector</title>\
<link>eo_db9.sym</link>\
<description>Symbol model for a 9 pin D type connector.</description>\
</item>\
<item>\
<title>DB15 Connector</title>\
<link>eo_db15.sym</link>\
<description>Symbol model for a 15 pin D type connector.</description>\
</item>\
<item>\
<title>DB25 Connector</title>\
<link>eo_db25.sym</link>\
<description>Symbol model for a 25 pin D type connector.</description>\
</item>\
<item>\
<title>Inverter</title>\
<link>eo_inv.sym</link>\
<description>Generic inverter.</description>\
</item>\
<item>\
<title>D Flip Flop</title>\
<link>eo_dff.sym</link>\
<description>Generic D flip flop.</description>\
</item>\
<item>\
<title>D Flip Flop w/ Reset</title>\
<link>eo_dffqrn.sym</link>\
<description>Generic D flip flop with reset.</description>\
</item>\
<item>\
<title>D Flip Flop Q, QN and Reset</title>\
<link>eo_dffqqnrn.sym</link>\
<description>Generic D flip flop with Q and QN outputs and Reset.</description>\
</item>\
<item>\
<title>D Flip Flop Q, QN, Reset and Preset</title>\
<link>eo_dffqqnrnpn.sym</link>\
<description>Generic D flip flop with Q and QN outputs and Preset and Reset.</description>\
</item>\
<item>\
<title>D Flip Flop Q, QN</title>\
<link>eo_dffqqn.sym</link>\
<description>Generic D flip flop with Q and QN outputs.</description>\
</item>\
<item>\
<title>JK Flip Flop</title>\
<link>eo_jk.sym</link>\
<description>Generic JK flip flop with Q and QN outputs and Reset and Preset.</description>\
</item>\
<item>\
<title>Inductor(big)</title>\
<link>eo_inductor_big.sym</link>\
<description>Symbol model for an inductor (larger symbol). </description>\
</item>\
<item>\
<title>Inductor - iron/ferrite core (big)</title>\
<link>eo_inductor_core_big.sym</link>\
<description>Symbol model for a iron/ferrite core inductor (larger symbol). </description>\
</item>\
<item>\
<title>Resistor (big)</title>\
<link>eo_resistor_big.sym</link>\
<description>Symbol model for a resistor (larger symbol). </description>\
</item>\
<item>\
<title>AC Chassis Connector</title>\
<link>eo_ac_chassis_conn.sym</link>\
<description>A chassis mounted AC connector. </description>\
</item>\
<item>\
<title>AC Plug</title>\
<link>eo_ac_plug.sym</link>\
<description>A 120V AC (USA) male plug. </description>\
</item>\
<item>\
<title>AC Socket</title>\
<link>eo_ac_socket.sym</link>\
<description>A 120 V AC (USA) female receptical. </description>\
</item>\
<item>\
<title>Voltage Source</title>\
<link>eo_voltage_source.sym</link>\
<description>A generic voltage source symbol. </description>\
</item>\
<item>\
<title>Current Source</title>\
<link>eo_current_source.sym</link>\
<description>A generic current source symbol. </description>\
</item>\
<item>\
<title>Microphone</title>\
<link>eo_microphone.sym</link>\
<description>A microphone symbol. </description>\
</item>\
<item>\
<title>Speaker</title>\
<link>eo_speaker.sym</link>\
<description>A speaker symbol. </description>\
</item>\
<item>\
<title>Relay Coil</title>\
<link>eo_relay_coil.sym</link>\
<description>A relay coil (part of a total relay). </description>\
</item>\
<item>\
<title>Relay Contacts</title>\
<link>eo_relay_contacts.sym</link>\
<description>SPDT relay contacts (part of a total relay). </description>\
</item>\
<item>\
<title>Motor</title>\
<link>eo_motor.sym</link>\
<description>Generic model of a 2-wire motor.</description>\
</item>\
<item>\
<title>Antenna</title>\
<link>eo_antenna.sym</link>\
<description>Generic model of an antenna.</description>\
</item>\
<item>\
<title>Generic Two Pin Device</title>\
<link>eo_two_pin.sym</link>\
<description>A generic two pin device.. </description>\
</item>\
<item>\
<title>Tube - Triode</title>\
<link>eo_Tube_triode.sym</link>\
<description>A generic triode tube. </description>\
</item>\
<item>\
<title>Tube - Tetrode</title>\
<link>eo_Tube_tetrode.sym</link>\
<description>A generic tetrode tube. </description>\
</item>\
<item>\
<title>Tube - Pentode</title>\
<link>eo_Tube_pentode.sym</link>\
<description>A generic pentode tube. </description>\
</item>\
<item>\
<title>Tube - Dual Triode</title>\
<link>eo_Tube_dual_triode.sym</link>\
<description>A generic dual triode tube. </description>\
</item>\
<item>\
<title>Tube - Dual Plate Rectifier</title>\
<link>eo_Tube_rectifier.sym</link>\
<description>A generic dual plate rectifier tube. </description>\
</item>\
<item>\
<title>Tube - Heater</title>\
<link>eo_Tube_Heater.sym</link>\
<description>A generic heater for a tube. </description>\
</item>\
<item>\
<title>Title A</title>\
<link>eo_titleA.sym</link>\
<description>Title outline A size. </description>\
</item>\
<item>\
<title>Title B</title>\
<link>eo_titleB.sym</link>\
<description>Title outline B size. </description>\
</item>\
<item>\
<title>NULL</title>\
<link>eo_NULL.sym</link>\
<description>NULL component. </description>\
</item>\
</channel>\
</rss>";

let eo_connectors = "<?xml version=\"1.0\"?>\
<rss version=\"2.0\">\
<channel>\
<item>\
<title>USB C Connector</title>\
<link>USB_C.sym</link>\
<description>Symbol model for a USB C connector.</description>\
</item>\
<item>\
<title>USB Micro B Connector</title>\
<link>USB_MICRO_B.sym</link>\
<description>Symbol model for a USB micro B connector.</description>\
</item>\
<item>\
<title>USB A Connector</title>\
<link>USB_A.sym</link>\
<description>Symbol model for a USB A connector.</description>\
</item>\
<item>\
<title>Coax Connector</title>\
<link>eo_bnc.sym</link>\
<description>Symbol model for a coaxial connector.</description>\
</item>\
<item>\
<title>Audio Stereo (Tip/Ring/Shield) Connector</title>\
<link>eo_trs_connector.sym</link>\
<description>Symbol model for a stereo audio / tip/ring/shield connector.</description>\
</item>\
<item>\
<title>XLR Audio Connector</title>\
<link>eo_xlr3f.sym</link>\
<description>Symbol model for a 3 pin, female XLR type audio connector.</description>\
</item>\
<item>\
<title>DB9 Connector</title>\
<link>eo_db9.sym</link>\
<description>Symbol model for a 9 pin D type connector.</description>\
</item>\
<item>\
<title>DB15 Connector</title>\
<link>eo_db15.sym</link>\
<description>Symbol model for a 15 pin D type connector.</description>\
</item>\
<item>\
<title>DB25 Connector</title>\
<link>eo_db25.sym</link>\
<description>Symbol model for a 25 pin D type connector.</description>\
</item>\
<item>\
<title>AC Chassis Connector</title>\
<link>eo_ac_chassis_conn.sym</link>\
<description>A chassis mounted AC connector. </description>\
</item>\
<item>\
<title>AC Plug</title>\
<link>eo_ac_plug.sym</link>\
<description>A 120V AC (USA) male plug. </description>\
</item>\
<item>\
<title>AC Socket</title>\
<link>eo_ac_socket.sym</link>\
<description>A 120 V AC (USA) female receptical. </description>\
</item>\
</channel>\
</rss>";


let eo_sim = "<?xml version=\"1.0\"?>\
<rss version=\"2.0\">\
<channel>\
<item>\
<title>inv</title>\
<link>eo_sim_inv.sym</link>\
<description>An inverter.</description>\
</item>\
<item>\
<title>nand2</title>\
<link>eo_sim_nand2.sym</link>\
<description>Two input \"nand\" gate.</description>\
</item>\
<item>\
<title>nand3</title>\
<link>eo_sim_nand3.sym</link>\
<description>Three input \"nand\" gate.</description>\
</item>\
<item>\
<title>nand4</title>\
<link>eo_sim_nand4.sym</link>\
<description>Four input \"nand\" gate.</description>\
</item>\
<item>\
<title>and2</title>\
<link>eo_sim_and2.sym</link>\
<description>Two input \"and\" gate.</description>\
</item>\
<item>\
<title>and3</title>\
<link>eo_sim_and3.sym</link>\
<description>Three input \"and\" gate.</description>\
</item>\
<item>\
<title>and4</title>\
<link>eo_sim_and4.sym</link>\
<description>Four input \"and\" gate.</description>\
</item>\
<item>\
<title>nor2</title>\
<link>eo_sim_nor2.sym</link>\
<description>Two input \"nor\" gate.</description>\
</item>\
<item>\
<title>nor3</title>\
<link>eo_sim_nor3.sym</link>\
<description>Three input \"nor\" gate.</description>\
</item>\
<item>\
<title>nor4</title>\
<link>eo_sim_nor4.sym</link>\
<description>Four input \"nor\" gate.</description>\
</item>\
<item>\
<title>or2</title>\
<link>eo_sim_or2.sym</link>\
<description>Two input \"or\" gate.</description>\
</item>\
<item>\
<title>or3</title>\
<link>eo_sim_or3.sym</link>\
<description>Three input \"or\" gate.</description>\
</item>\
<item>\
<title>or4</title>\
<link>eo_sim_or4.sym</link>\
<description>Four input \"or\" gate.</description>\
</item>\
<item>\
<title>xor2</title>\
<link>eo_sim_xor2.sym</link>\
<description>Two input \"xor\" gate.</description>\
</item>\
<item>\
<title>D Flop</title>\
<link>eo_sim_dff.sym</link>\
<description>D flip flop.</description>\
</item>\
<item>\
<title>JK Flip Flop</title>\
<link>eo_sim_jk.sym</link>\
<description>JK flip flop.</description>\
</item>\
<item>\
<title>D Flop with Circular Scan</title>\
<link>eo_sim_dff_cs.sym</link>\
<description>D flip flop with circular scan.</description>\
</item>\
<item>\
<title>Conjunction gate</title>\
<link>eo_sim_conjunction.sym</link>\
<description>Two input conjunction gate. Two 1s make output 1. Two 0s make output 0.</description>\
</item>\
<item>\
<title>Majority gate</title>\
<link>eo_sim_majority3.sym</link>\
<description>Three input majority gate.</description>\
</item>\
<item>\
<title>One Shot</title>\
<link>eo_sim_one_shot.sym</link>\
<description>One shot.</description>\
</item>\
<item>\
<title>One Shot Startup</title>\
<link>eo_sim_one_shot_startup.sym</link>\
<description>One shot at time 0 used to reset other cicuits.</description>\
</item>\
<item>\
<title>Clock Generator</title>\
<link>eo_sim_clock.sym</link>\
<description>A clock generator.</description>\
</item>\
<item>\
<title>Pulse Generator</title>\
<link>eo_sim_pulse_generator.sym</link>\
<description>A pulse generator when triggered creates N pulses of Th, Tperiod and Tdelay.</description>\
</item>\
<item>\
<title>Delay</title>\
<link>eo_sim_delay.sym</link>\
<description>A transport delay element.</description>\
</item>\
<item>\
<title>Decoder 3 to 8</title>\
<link>eo_sim_decode_3_8.sym</link>\
<description>A 3 line to 8 line decoder.</description>\
</item>\
<item>\
<title>2 to 1 mux</title>\
<link>eo_sim_mux_2_1.sym</link>\
<description>Two to one selector.</description>\
</item>\
<item>\
<title>4 to 1 mux</title>\
<link>eo_sim_mux_4_1.sym</link>\
<description>Four to one selector</description>\
</item>\
<item>\
<title>8 to 1 mux</title>\
<link>eo_sim_mux_8_1.sym</link>\
<description>Eight to one selector</description>\
</item>\
<item>\
<title>4 bit counter (161)</title>\
<link>eo_sim_count161.sym</link>\
<description>Four bit 161 type counter.</description>\
</item>\
<item>\
<title>4 bit adder</title>\
<link>eo_sim_adder4.sym</link>\
<description>Four bit binary adder.</description>\
</item>\
<item>\
<title>Memory 1K x 8 asynchronous</title>\
<link>eo_sim_memory_async_1Kx8.sym</link>\
<description>A 1024 by 8 bit asynchonous memory.</description>\
</item>\
<item>\
<title>Boundary Scan BC_1</title>\
<link>eo_sim_BC_1.sym</link>\
<description>Boundary Scan Cell BC_1.</description>\
</item>\
<item>\
<title>Boundary Scan BC_2</title>\
<link>eo_sim_BC_2.sym</link>\
<description>Boundary Scan Cell BC_2.</description>\
</item>\
<item>\
<title>Boundary Scan BC_7</title>\
<link>eo_sim_BC_7.sym</link>\
<description>Boundary Scan Cell BC_7.</description>\
</item>\
<item>\
<title>Parametized bus adder</title>\
<link>eo_adder.sym</link>\
<description>An adder with parametized bus I/O ports.</description>\
</item>\
<item>\
<title>Parametized bus multiplier</title>\
<link>eo_multiplier.sym</link>\
<description>A multiplier with parametized bus I/O ports.</description>\
</item>\
<item>\
<title>Parametized bus register</title>\
<link>eo_register.sym</link>\
<description>A register with parametized bus I/O ports.</description>\
</item>\
<item>\
<title>Input Port</title>\
<link>eo_input_port.sym</link>\
<description>An input port.</description>\
</item>\
<item>\
<title>Output Port</title>\
<link>eo_output_port.sym</link>\
<description>An output port.</description>\
</item>\
<item>\
<title>Inout Port</title>\
<link>eo_inout_port.sym</link>\
<description>An inout port.</description>\
</item>\
<item>\
<title>Constant std_logic_vector Value</title>\
<link>CONST_VEC.sym</link>\
<description>A constant std_logic_vector value which can connect to a bus used as a vector. Used for VHDL output. Modify the \"value\" attribute.</description>\
</item>\
<item>\
<title>Logic H Constant</title>\
<link>eo_LogicH.sym</link>\
<description>A constant logic H value. Used for VHDL output.</description>\
</item>\
<item>\
<title>Logic L Constant</title>\
<link>eo_LogicL.sym</link>\
<description>A constant logic L value. Used for VHDL output.</description>\
</item>\
<item>\
<title>Logic 1 Constant</title>\
<link>eo_LogicOne.sym</link>\
<description>A constant logic 1 value. Used for VHDL output.</description>\
</item>\
<item>\
<title>Logic 0 Constant</title>\
<link>eo_LogicZero.sym</link>\
<description>A constant logic 0 value. Used for VHDL output.</description>\
</item>\
<item>\
<title>Assert on High</title>\
<link>ASSERT_ON_HIGH.sym</link>\
<description>When input goes high, the message appears in the report window.</description>\
</item>\
<item>\
<title>Assert on High Clocked</title>\
<link>ASSERT_HIGH_CLK.sym</link>\
<description>When D input is high on the rising edge of CLK, the message appears in the report window.</description>\
</item>\
<item>\
<title>Stop on High</title>\
<link>STOP_ON_HIGH.sym</link>\
<description>When input goes high, the simulation is stopped.</description>\
</item>\
<item>\
<title>Stop on High Clocked</title>\
<link>ASSERT_HIGH_CLK.sym</link>\
<description>When D input is high on the rising edge of CLK, the simulation is stopped.</description>\
</item>\
<item>\
<title>Pause on High</title>\
<link>PAUSE_ON_HIGH.sym</link>\
<description>When input goes high, the simulation is paused.</description>\
</item>\
<item>\
<title>Pause on High Clocked</title>\
<link>PAUSE_HIGH_CLK.sym</link>\
<description>When D input is high on the rising edge of CLK, the simulation is paused.</description>\
</item>\
</channel>\
</rss>";

addSymbol("eo_symbols", "battery_2.sym", "v 20050820 1\r\n\
P 0 200 200 200 1 0 0\r\n\
{\r\n\
T 150 250 5 8 0 1 0 6 1\r\n\
pinnumber=1\r\n\
T 150 150 5 8 0 1 0 8 1\r\n\
pinseq=1\r\n\
T 200 200 9 8 0 1 0 0 1\r\n\
pinlabel=+\r\n\
T 200 200 5 8 0 1 0 2 1\r\n\
pintype=pwr\r\n\
}\r\n\
P 900 200 700 200 1 0 0\r\n\
{\r\n\
T 750 250 5 8 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 750 150 5 8 0 1 0 2 1\r\n\
pinseq=2\r\n\
T 700 200 9 8 0 1 0 6 1\r\n\
pinlabel=-\r\n\
T 700 200 5 8 0 1 0 8 1\r\n\
pintype=pwr\r\n\
}\r\n\
L 300 400 300 0 3 0 0 0 -1 -1\r\n\
L 400 300 400 100 3 0 0 0 -1 -1\r\n\
L 500 400 500 0 3 0 0 0 -1 -1\r\n\
L 600 300 600 100 3 0 0 0 -1 -1\r\n\
T 300 700 5 10 0 0 0 0 1\r\n\
device=BATTERY\r\n\
L 700 200 600 200 3 0 0 0 -1 -1\r\n\
L 200 200 300 200 3 0 0 0 -1 -1\r\n\
T 300 500 8 10 1 1 0 0 1\r\n\
refdes=B?\r\n\
T 300 1100 5 10 0 0 0 0 1\r\n\
description=battery\r\n\
");

addSymbol("eo_symbols", "bnc_1.sym", "v 20031231 1\r\n\
V 200 400 150 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
T 350 650 5 10 0 0 0 0 1\r\n\
device=BNC\r\n\
V 200 400 50 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
P 200 250 200 0 1 0 1\r\n\
{\r\n\
T 150 100 5 8 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 150 100 5 8 0 0 0 0 1\r\n\
pinseq=2\r\n\
T 150 100 5 8 0 1 0 0 1\r\n\
pinlabel=2\r\n\
T 150 100 5 8 0 1 0 0 1\r\n\
pintype=pas\r\n\
}\r\n\
P 250 400 500 400 1 0 1\r\n\
{\r\n\
T 350 550 5 8 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 350 550 5 8 0 0 0 0 1\r\n\
pinseq=1\r\n\
T 350 550 5 8 0 1 0 0 1 \r\n\
pinlabel=1\r\n\
T 350 550 5 8 0 1 0 0 1\r\n\
pintype=pas\r\n\
}\r\n\
T 0 600 8 10 1 1 0 0 1\r\n\
refdes=J?\r\n\
");

addSymbol("eo_symbols", "capacitor-1.sym", "v 20080706 1\r\n\
P 200 0 200 200 1 0 0\r\n\
{\r\n\
T 150 100 5 8 0 1 90 0 1\r\n\
pinnumber=n-\r\n\
T 150 100 5 8 0 1 90 0 1\r\n\
pinlabel=n-\r\n\
T 150 100 5 8 0 0 90 0 1\r\n\
pinseq=2\r\n\
T 150 100 5 8 0 0 90 0 1\r\n\
pintype=pas\r\n\
}\r\n\
P 200 500 200 300 1 0 0\r\n\
{\r\n\
T 150 500 5 8 0 1 90 0 1\r\n\
pinnumber=n+\r\n\
T 150 500 5 8 0 1 90 0 1\r\n\
pinlabel=n+\r\n\
T 150 500 5 8 0 0 90 0 1\r\n\
pinseq=1\r\n\
T 150 500 5 8 0 0 90 0 1\r\n\
pintype=pas\r\n\
}\r\n\
L 100 200 300 200 3 0 0 0 -1 -1\r\n\
L 100 270 300 270 3 0 0 0 -1 -1\r\n\
L 200 500 200 270 3 0 0 0 -1 -1\r\n\
L 200 0 200 200 3 0 0 0 -1 -1\r\n\
T -400 500 5 10 0 0 0 0 1\r\n\
spicetype=C\r\n\
T 500 350 8 10 1 1 0 0 1\r\n\
refdes=C?\r\n\
T 500 200 8 10 1 1 0 0 1\r\n\
capacitance=1uF\r\n\
T 300 400 9 10 1 0 0 0 1\r\n\
+\r\n\
");

addSymbol("eo_symbols", "diode_1.sym", "v 20031231 1\r\n\
L 200 200 200 0 3 0 0 0 -1 -1\r\n\
L 200 200 400 100 3 0 0 0 -1 -1\r\n\
T 500 300 5 10 1 1 0 0 1\r\n\
device=DIODE\r\n\
L 200 0 400 100 3 0 0 0 -1 -1\r\n\
L 400 200 400 0 3 0 0 0 -1 -1\r\n\
P 0 100 200 100 1 0 0\r\n\
{\r\n\
T 50 250 5 8 0 1 0 0 1\r\n\
pinnumber=A\r\n\
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
pinnumber=K\r\n\
T 450 250 5 8 0 0 0 0 1\r\n\
pinseq=2\r\n\
T 450 250 5 8 0 1 0 0 1\r\n\
pinlabel=K\r\n\
T 450 250 5 8 0 1 0 0 1\r\n\
pintype=pas\r\n\
}\r\n\
L 0 100 200 100 3 0 0 0 -1 -1\r\n\
L 400 100 600 100 3 0 0 0 -1 -1\r\n\
T 200 300 8 10 1 1 0 0 1\r\n\
refdes=D?\r\n\
");

addSymbol("eo_symbols", "Diode_Bridge.sym", "v 20181107 3\r\n\
T 0 -150 5 10 1 1 0 1 1\r\n\
device=Diode_Bridge\r\n\
T 0 0 5 10 1 1 0 1 1\r\n\
refdes=U1\r\n\
L 400 1100 600 900 3 0 0 0 0 0\r\n\
L 400 1100 600 1100 3 0 0 0 0 0\r\n\
L 600 1100 600 900 3 0 0 0 0 0\r\n\
L 500 1200 700 1000 3 0 0 0 0 0\r\n\
L 600 1100 800 1300 3 0 0 0 0 0\r\n\
L 900 1000 1100 1200 3 0 0 0 0 0\r\n\
L 900 1000 1100 1000 3 0 0 0 0 0\r\n\
L 1100 1000 1100 1200 3 0 0 0 0 0\r\n\
L 1000 900 1200 1100 3 0 0 0 0 0\r\n\
L 800 1300 1000 1100 3 0 0 0 0 0\r\n\
L 500 1000 300 800 3 0 0 0 0 0\r\n\
L 1100 1000 1300 800 3 0 0 0 0 0\r\n\
L 300 800 500 600 3 0 0 0 0 0\r\n\
L 400 500 600 700 3 0 0 0 0 0\r\n\
L 500 400 700 600 3 0 0 0 0 0\r\n\
L 600 500 800 300 3 0 0 0 0 0\r\n\
L 1100 600 1300 800 3 0 0 0 0 0\r\n\
L 1000 700 1200 500 3 0 0 0 0 0\r\n\
L 900 600 1100 400 3 0 0 0 0 0\r\n\
L 800 300 1000 500 3 0 0 0 0 0\r\n\
P 100 800 300 800 1 0 0\r\n\
{\r\n\
T 200 1000 5 8 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 200 1100 5 8 1 1 0 0 1\r\n\
pinlabel=A1\r\n\
T 200 1200 5 8 0 1 0 0 1\r\n\
pintype=io\r\n\
T 200 1300 5 8 0 1 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
P 1300 800 1500 800 1 0 1\r\n\
{\r\n\
T 1500 1000 5 8 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 1500 1100 5 8 1 1 0 0 1\r\n\
pinlabel=A2\r\n\
T 1500 1200 5 8 0 1 0 0 1\r\n\
pintype=io\r\n\
T 1500 1300 5 8 0 1 0 0 1\r\n\
pinseq=2\r\n\
}\r\n\
P 800 1500 800 1300 1 0 0\r\n\
{\r\n\
T 1000 1400 5 8 0 1 0 0 1\r\n\
pinnumber=3\r\n\
T 1000 1600 5 8 1 1 0 0 1\r\n\
pinlabel=B1\r\n\
T 1000 1700 5 8 0 1 0 0 1\r\n\
pintype=io\r\n\
T 1000 1800 5 8 0 1 0 0 1\r\n\
pinseq=3\r\n\
}\r\n\
P 800 300 800 100 1 0 1\r\n\
{\r\n\
T 1000 200 5 8 0 1 0 0 1\r\n\
pinnumber=4\r\n\
T 1000 0 5 8 1 1 0 0 1\r\n\
pinlabel=B2\r\n\
T 1000 -100 5 8 0 1 0 0 1\r\n\
pintype=io\r\n\
T 1000 -200 5 8 0 1 0 0 1\r\n\
pinseq=4\r\n\
}\r\n\
L 900 600 1100 600 3 0 0 0 0 0\r\n\
L 1100 400 1100 600 3 0 0 0 0 0\r\n\
L 400 500 600 500 3 0 0 0 0 0\r\n\
L 600 700 600 500 3 0 0 0 0 0\r\n\
");


addSymbol("eo_symbols", "eo_scr.sym", "v 20110115 2\r\n\
T 200 -100 5 10 0 1 0 1 1\r\n\
device=SCR\r\n\
T 200 0 5 10 1 1 0 1 1\r\n\
refdes=Q?\r\n\
L 300 300 300 100 3 0 0 0 -1 -1\r\n\
L 300 300 500 200 3 0 0 0 -1 -1\r\n\
L 300 100 500 200 3 0 0 0 -1 -1\r\n\
L 500 300 500 100 3 0 0 0 -1 -1\r\n\
P 100 200 300 200 1 0 0\r\n\
{\r\n\
T 200 450 5 8 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 400 450 5 8 0 1 0 0 1\r\n\
pinlabel=A\r\n\
T 50 450 5 8 0 1 0 0 1\r\n\
pintype=pas\r\n\
T 50 450 5 8 0 0 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
P 500 200 700 200 1 0 1\r\n\
{\r\n\
T 1000 450 5 8 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 692 450 5 8 0 1 0 0 1\r\n\
pinlabel=K\r\n\
T 450 450 5 8 0 1 0 0 1\r\n\
pintype=pas\r\n\
T 450 450 5 8 0 0 0 0 1\r\n\
pinseq=2\r\n\
}\r\n\
L 100 200 300 200 3 0 0 0 -1 -1\r\n\
L 500 200 700 200 3 0 0 0 -1 -1\r\n\
L 500 200 600 300 3 0 0 0 0 0\r\n\
P 600 500 600 300 1 0 0\r\n\
{\r\n\
T 650 500 5 8 0 1 0 0 1\r\n\
pinnumber=3\r\n\
T 850 500 5 8 0 1 0 0 1\r\n\
pinlabel=G\r\n\
T 0 500 5 8 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 500 5 8 0 1 0 0 1\r\n\
pinseq=3\r\n\
}\r\n\
");

addSymbol("eo_symbols", "eo_triac.sym", "v 20110115 2\r\n\
T 100 100 5 10 0 1 0 1 1\r\n\
device=Triac\r\n\
T 100 200 5 10 1 1 0 1 1\r\n\
refdes=Q?\r\n\
L 300 500 300 300 3 0 0 0 -1 -1\r\n\
L 300 500 500 400 3 0 0 0 -1 -1\r\n\
L 300 300 500 400 3 0 0 0 -1 -1\r\n\
L 500 500 500 300 3 0 0 0 -1 -1\r\n\
P 100 500 300 500 1 0 0\r\n\
{\r\n\
T 200 750 5 8 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 400 750 5 8 0 1 0 0 1\r\n\
pinlabel=T1\r\n\
T 50 750 5 8 0 1 0 0 1\r\n\
pintype=pas\r\n\
T 50 750 5 8 0 0 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
P 500 500 700 500 1 0 1\r\n\
{\r\n\
T 1000 750 5 8 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 692 750 5 8 0 1 0 0 1\r\n\
pinlabel=T2\r\n\
T 450 750 5 8 0 1 0 0 1\r\n\
pintype=pas\r\n\
T 450 750 5 8 0 0 0 0 1\r\n\
pinseq=2\r\n\
}\r\n\
L 300 600 500 500 3 0 0 0 0 0\r\n\
L 300 600 500 700 3 0 0 0 0 0\r\n\
L 500 700 500 500 3 0 0 0 0 0\r\n\
L 300 500 300 700 3 0 0 0 0 0\r\n\
V 400 500 224 3 0 0 0 0 0 0 0 0 0 0 0\r\n\
L 500 400 600 300 3 0 0 0 0 0\r\n\
P 600 300 600 100 1 0 1\r\n\
{\r\n\
T 650 300 5 8 0 1 0 0 1\r\n\
pinnumber=3\r\n\
T 326 300 5 8 0 1 0 0 1\r\n\
pinlabel=G\r\n\
T 0 300 5 8 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 300 5 8 0 1 0 0 1\r\n\
pinseq=3\r\n\
}\r\n\
");

addSymbol("eo_symbols", "eo_antenna.sym", "v 20110115 2\r\n\
T 200 200 5 10 0 1 0 1 1\r\n\
device=Antenna\r\n\
T 200 300 5 10 1 1 0 1 1\r\n\
refdes=ANT?\r\n\
L 0 400 100 300 3 0 0 0 0 0\r\n\
L 100 400 100 300 3 0 0 0 0 0\r\n\
L 200 400 100 300 3 0 0 0 0 0\r\n\
P 100 300 100 100 1 0 1\r\n\
{\r\n\
T 150 300 5 8 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T -174 300 5 8 0 1 0 0 1\r\n\
pinlabel=P_1\r\n\
T 0 300 5 8 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 300 5 8 0 1 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
");

addSymbol("eo_symbols", "eo_motor.sym", "v 20110115 2\r\n\
T 550 350 5 10 0 1 0 1 1\r\n\
device=Motor\r\n\
T 550 500 5 10 1 1 0 1 1\r\n\
refdes=MOT?\r\n\
T 100 400 3 12 1 1 0 0 1\r\n\
MOT\r\n\
P 250 850 250 650 1 0 0\r\n\
{\r\n\
T 300 850 5 8 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 500 850 5 8 0 1 0 0 1\r\n\
pinlabel=P_1\r\n\
T 0 850 5 8 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 850 5 8 0 1 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
P 250 250 250 50 1 0 1\r\n\
{\r\n\
T 300 250 5 8 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T -24 250 5 8 0 1 0 0 1\r\n\
pinlabel=P_2\r\n\
T 0 250 5 8 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 250 5 8 0 1 0 0 1\r\n\
pinseq=2\r\n\
}\r\n\
V 250 450 224 3 0 0 0 0 0 0 0 0 0 0 0\r\n\
B 200 650 100 50 3 2 0 0 0 0 0 0 0 0 0 0\r\n\
B 200 200 100 50 3 2 0 0 0 0 0 0 0 0 0 0\r\n\
");

addSymbol("eo_symbols", "eo_pushbutton_NC.sym", "v 20110115 2\r\n\
T 0 -150 5 10 0 1 0 1 1\r\n\
device=Pushbutton(NC)\r\n\
T 100 -50 5 10 1 1 0 1 1\r\n\
refdes=S?\r\n\
P 50 100 250 100 1 0 0\r\n\
{\r\n\
T 200 150 5 8 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 350 150 5 8 0 1 0 0 1\r\n\
pinlabel=P_1\r\n\
T 50 150 5 8 0 1 0 0 1\r\n\
pintype=pas\r\n\
T 50 150 5 8 0 0 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
P 450 100 650 100 1 0 1\r\n\
{\r\n\
T 1000 150 5 8 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 676 150 5 8 0 1 0 0 1\r\n\
pinlabel=P_2\r\n\
T 500 150 5 8 0 1 0 0 1\r\n\
pintype=pas\r\n\
T 500 150 5 8 0 0 0 0 1\r\n\
pinseq=2\r\n\
}\r\n\
L 200 50 500 50 3 0 0 0 0 0\r\n\
V 250 100 50 3 0 0 0 0 0 0 0 0 0 0 0\r\n\
V 450 100 50 3 0 0 0 0 0 0 0 0 0 0 0\r\n\
L 350 250 350 50 3 0 0 0 0 0\r\n\
");

addSymbol("eo_symbols", "dpdt_1.sym", "v 20041121 1\r\n\
T 410 850 8 10 0 0 0 0 1\r\n\
device=DPDT\r\n\
P 300 300 0 300 1 0 1\r\n\
{\r\n\
T 160 350 5 10 0 0 0 0 1\r\n\
pinseq=5\r\n\
T 160 300 5 10 0 1 0 0 1\r\n\
pinnumber=5\r\n\
T 160 350 5 10 0 1 0 0 1\r\n\
pinlabel=5\r\n\
T 160 350 5 10 0 1 0 0 1\r\n\
pintype=pas\r\n\
}\r\n\
P 700 500 1000 500 1 0 1\r\n\
{\r\n\
T 860 550 5 10 0 0 0 0 1\r\n\
pinseq=4\r\n\
T 710 500 5 10 0 1 0 0 1\r\n\
pinnumber=4\r\n\
T 710 500 5 10 0 1 0 0 1\r\n\
pinlabel=4\r\n\
T 860 550 5 10 0 1 0 0 1\r\n\
pintype=pas\r\n\
}\r\n\
P 700 100 1000 100 1 0 1\r\n\
{\r\n\
T 860 150 5 10 0 0 0 0 1\r\n\
pinseq=6\r\n\
T 710 100 5 10 0 1 0 0 1\r\n\
pinnumber=6\r\n\
T 860 150 5 10 0 1 0 0 1 \r\n\
pinlabel=6\r\n\
T 860 150 5 10 0 1 0 0 1\r\n\
pintype=pas\r\n\
}\r\n\
L 300 300 660 450 3 0 0 0 -1 -1\r\n\
P 300 1100 0 1100 1 0 1\r\n\
{\r\n\
T 160 1150 5 10 0 0 0 0 1\r\n\
pinseq=2\r\n\
T 300 1100 5 10 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 160 1150 5 10 0 1 0 0 1\r\n\
pinlabel=2\r\n\
T 160 1150 5 10 0 1 0 0 1\r\n\
pintype=pas\r\n\
}\r\n\
P 700 1300 1000 1300 1 0 1\r\n\
{\r\n\
T 860 1350 5 10 0 0 0 0 1\r\n\
pinseq=1\r\n\
T 710 1300 5 10 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 710 1300 5 10 0 1 0 0 1 \r\n\
pinlabel=1\r\n\
T 860 1350 5 10 0 1 0 0 1\r\n\
pintype=pas\r\n\
}\r\n\
P 700 900 1000 900 1 0 1\r\n\
{\r\n\
T 860 950 5 10 0 0 0 0 1\r\n\
pinseq=3\r\n\
T 800 850 5 10 0 1 0 0 1\r\n\
pinnumber=3\r\n\
T 860 950 5 10 0 1 0 0 1\r\n\
pinlabel=3\r\n\
T 860 950 5 10 0 1 0 0 1 \r\n\
pintype=pas\r\n\
}\r\n\
L 310 1100 660 1250 3 0 0 0 -1 -1\r\n\
T 410 1500 8 10 1 1 0 0 1\r\n\
refdes=S?\r\n\
L 460 1160 460 1050 3 0 0 0 -1 -1\r\n\
L 460 450 460 370 3 0 0 0 -1 -1\r\n\
L 460 700 460 550 3 0 0 0 -1 -1\r\n\
L 460 950 460 800 3 0 0 0 -1 -1\r\n\
V 660 1300 50 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
V 660 900 50 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
V 660 500 50 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
V 660 100 50 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
");

addSymbol("eo_connectors", "eo_ac_chassis_conn.sym", "v 20110115 2\r\n\
T 0 -150 5 10 0 1 0 0 1\r\n\
device=AC_CHASSIS\r\n\
T 100 100 5 10 1 1 0 0 1\r\n\
refdes=J?\r\n\
B 400 700 100 199 3 3 0 0 0 0 0 0 0 0 0 0\r\n\
B 550 400 100 199 3 3 0 0 0 0 0 0 0 0 0 0\r\n\
B 700 700 100 199 3 3 0 0 0 0 0 0 0 0 0 0\r\n\
L 200 1000 1000 1000 3 3 0 0 0 0\r\n\
L 1000 500 1000 1000 3 3 0 0 0 0\r\n\
L 1000 500 800 300 3 3 0 0 0 0\r\n\
L 800 300 400 300 3 3 0 0 0 0\r\n\
L 400 300 200 500 3 3 0 0 0 0\r\n\
L 200 500 200 1000 3 3 0 0 0 0\r\n\
P 0 800 400 800 1 0 0\r\n\
{\r\n\
T 50 850 5 10 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 250 800 5 10 0 1 0 0 1\r\n\
pinlabel=hot\r\n\
T 0 800 5 10 0 1 0 0 1\r\n\
pintype=pwr\r\n\
T 0 800 5 10 0 1 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
P 800 800 1200 800 1 0 1\r\n\
{\r\n\
T 1150 850 5 10 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 850 800 5 10 0 1 0 0 1\r\n\
pinlabel=neutral\r\n\
T 0 800 5 10 0 1 0 0 1\r\n\
pintype=pwr\r\n\
T 50 700 5 10 0 1 0 0 1\r\n\
pinseq=2\r\n\
}\r\n\
P 600 100 600 400 1 0 0\r\n\
{\r\n\
T 650 150 5 10 0 1 0 0 1\r\n\
pinnumber=3\r\n\
T 850 100 5 10 0 1 0 0 1\r\n\
pinlabel=GND\r\n\
T 0 100 5 10 0 1 0 0 1\r\n\
pintype=pwr\r\n\
T 0 100 5 10 0 1 0 0 1\r\n\
pinseq=3\r\n\
}\r\n\
");

addSymbol("eo_connectors", "eo_ac_plug.sym", "v 20110115 2\r\n\
T 0 -150 5 10 0 1 0 0 1\r\n\
device=AC_PLUG\r\n\
T -100 0 5 10 1 1 0 0 1\r\n\
refdes=P?\r\n\
T -100 -1500 5 10 0 1 0 0 1\r\n\
description=Male USA 120v plug\r\n\
P 300 800 300 575 1 0 0\r\n\
{\r\n\
T 400 800 5 10 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 500 800 5 10 0 1 0 0 1\r\n\
pinlabel=hot\r\n\
T 0 800 5 10 0 1 0 0 1\r\n\
pintype=pwr\r\n\
T 0 800 5 10 0 1 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
P 100 800 100 600 1 0 0\r\n\
{\r\n\
T -50 800 5 10 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T -300 800 5 10 0 1 0 0 1\r\n\
pinlabel=neutral\r\n\
T 0 800 5 10 0 1 0 0 1\r\n\
pintype=pwr\r\n\
T 0 800 5 10 0 1 0 0 1\r\n\
pinseq=2\r\n\
}\r\n\
P 200 0 200 200 1 0 0\r\n\
{\r\n\
T 300 0 5 10 0 1 0 0 1\r\n\
pinnumber=3\r\n\
T 400 0 5 10 0 1 0 0 1\r\n\
pinlabel=GND\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
pintype=pwr\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
pinseq=3\r\n\
}\r\n\
B 60 400 80 200 3 3 0 0 0 0 1 0 0 0 0 0\r\n\
B 260 425 80 150 3 3 0 0 0 0 1 0 0 0 0 0\r\n\
V 200 250 50 3 0 0 0 0 0 1 0 0 0 0 0\r\n\
V 200 400 300 3 0 0 0 0 0 0 0 0 0 0 0\r\n\
");

addSymbol("eo_connectors", "eo_ac_socket.sym", "v 20110115 2\r\n\
T 0 -150 5 10 0 1 0 0 1\r\n\
device=AC_SOCKET\r\n\
T -100 0 5 10 1 1 0 0 1\r\n\
refdes=J?\r\n\
T -100 -1500 5 10 0 1 0 0 1\r\n\
description=Female USA 120v receptical\r\n\
P 100 800 100 575 1 0 0\r\n\
{\r\n\
T -50 800 5 10 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T -300 800 5 10 0 1 0 0 1\r\n\
pinlabel=hot\r\n\
T 0 800 5 10 0 1 0 0 1\r\n\
pintype=pwr\r\n\
T 0 800 5 10 0 1 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
P 300 800 300 600 1 0 0\r\n\
{\r\n\
T 400 800 5 10 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 500 800 5 10 0 1 0 0 1\r\n\
pinlabel=neutral\r\n\
T 0 800 5 10 0 1 0 0 1\r\n\
pintype=pwr\r\n\
T 0 800 5 10 0 1 0 0 1\r\n\
pinseq=2\r\n\
}\r\n\
P 200 0 200 200 1 0 0\r\n\
{\r\n\
T 300 0 5 10 0 1 0 0 1\r\n\
pinnumber=3\r\n\
T 400 0 5 10 0 1 0 0 1\r\n\
pinlabel=GND\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
pinseq=3\r\n\
}\r\n\
B 60 425 80 150 3 3 0 0 0 0 0 0 0 0 0 0\r\n\
B 260 400 80 200 3 3 0 0 0 0 0 0 0 0 0 0\r\n\
V 200 250 50 3 0 0 0 0 0 0 0 0 0 0 0\r\n\
V 200 400 300 3 0 0 0 0 0 0 0 0 0 0 0\r\n\
");

addSymbol("eo_symbols", "eo_agnd.sym", "v 20110115 2\r\n\
T 0 -150 5 10 0 1 0 0 1\r\n\
device=AGND\r\n\
T 0 0 5 10 1 1 0 0 1\r\n\
refdes=\r\n\
L 20 100 180 100 3 3 0 0 0 0\r\n\
L 180 100 100 0 3 3 0 0 0 0\r\n\
L 100 0 20 100 3 3 0 0 0 0\r\n\
P 100 300 100 100 1 0 0\r\n\
{\r\n\
T 150 300 5 10 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 80 40 5 6 1 1 0 0 1\r\n\
label=A\r\n\
T 0 300 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 300 5 10 0 1 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
T 300 200 5 8 0 1 0 0 1\r\n\
net=AGND:1\r\n\
");

addSymbol("eo_symbols", "eo_battery_2cell.sym", "v 20050820 1\r\n\
P 0 200 200 200 1 0 0\r\n\
{\r\n\
T 150 250 5 8 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 150 150 5 8 0 1 0 8 1\r\n\
pinseq=1\r\n\
T 200 200 9 8 0 1 0 0 1\r\n\
pinlabel=VBATTP\r\n\
T 200 200 9 8 0 1 0 0 1\r\n\
pinaltlabel=+\r\n\
T 200 200 5 8 0 1 0 2 1\r\n\
pintype=pwr\r\n\
}\r\n\
P 900 200 700 200 1 0 0\r\n\
{\r\n\
T 750 250 5 8 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 750 150 5 8 0 1 0 2 1\r\n\
pinseq=2\r\n\
T 700 200 9 8 0 1 0 6 1\r\n\
pinlabel=VBATTN\r\n\
T 700 200 9 8 0 1 0 6 1\r\n\
pinaltlabel=-\r\n\
T 700 200 5 8 0 1 0 8 1\r\n\
pintype=pwr\r\n\
}\r\n\
L 300 400 300 0 3 0 0 0 -1 -1\r\n\
L 400 300 400 100 3 0 0 0 -1 -1\r\n\
L 500 400 500 0 3 0 0 0 -1 -1\r\n\
L 600 300 600 100 3 0 0 0 -1 -1\r\n\
T 300 700 5 10 0 0 0 0 1\r\n\
device=BATTERY\r\n\
L 700 200 600 200 3 0 0 0 -1 -1\r\n\
L 200 200 300 200 3 0 0 0 -1 -1\r\n\
T 300 500 8 10 1 1 0 0 1\r\n\
refdes=BT?\r\n\
T 300 1100 5 10 0 0 0 0 1\r\n\
description=battery\r\n\
");

addSymbol("eo_connectors", "eo_bnc.sym", "v 20031231 1\r\n\
V 200 400 150 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
T 350 650 5 10 0 0 0 0 1\r\n\
device=BNC_CONNECTOR\r\n\
V 200 400 50 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
P 250 400 500 400 1 0 1\r\n\
{\r\n\
T 350 550 5 8 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 350 550 5 8 0 0 0 0 1\r\n\
pinseq=1\r\n\
T 350 550 5 8 0 1 0 0 1\r\n\
pinlabel=PIN\r\n\
T 350 550 5 8 0 1 0 0 1\r\n\
pintype=pas\r\n\
}\r\n\
P 200 250 200 0 1 0 1\r\n\
{\r\n\
T 150 100 5 8 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 150 100 5 8 0 0 0 0 1\r\n\
pinseq=2\r\n\
T 150 100 5 8 0 1 0 0 1\r\n\
pinlabel=SHELL\r\n\
T 150 100 5 8 0 1 0 0 1\r\n\
pintype=pas\r\n\
}\r\n\
T 0 600 8 10 1 1 0 0 1\r\n\
refdes=J?\r\n\
");

addSymbol("eo_symbols", "eo_capacitor_polar.sym", "v 20110115 2\r\n\
T 500 200 8 10 0 1 0 0 1\r\n\
device=CAPACITOR_POLAR\r\n\
T -100 0 8 10 1 1 0 0 1\r\n\
refdes=C?\r\n\
T -400 500 5 10 0 0 0 0 1\r\n\
spicetype=C\r\n\
T -100 -150 8 10 1 1 0 0 1\r\n\
value=1uF\r\n\
P 200 0 200 200 1 0 0\r\n\
{\r\n\
T 150 100 5 8 0 1 90 0 1\r\n\
pinnumber=2\r\n\
T 150 100 5 8 0 1 90 0 1\r\n\
pinlabel=n\r\n\
T 150 100 5 8 0 0 90 0 1\r\n\
pintype=pas\r\n\
T 150 100 5 8 0 0 90 0 1\r\n\
pinseq=2\r\n\
}\r\n\
P 200 500 200 300 1 0 0\r\n\
{\r\n\
T 150 400 5 8 0 1 90 0 1\r\n\
pinnumber=1\r\n\
T 150 500 5 8 0 1 90 0 1\r\n\
pinlabel=p\r\n\
T 150 500 5 8 0 0 90 0 1\r\n\
pintype=pas\r\n\
T 150 500 5 8 0 0 90 0 1\r\n\
pinseq=1\r\n\
T 300 350 9 10 1 1 0 0 1\r\n\
altlabel=+\r\n\
}\r\n\
L 100 200 300 200 3 0 0 0 -1 -1\r\n\
L 100 270 300 270 3 0 0 0 -1 -1\r\n\
L 200 500 200 270 3 0 0 0 -1 -1\r\n\
L 200 0 200 200 3 0 0 0 -1 -1\r\n\
");

addSymbol("eo_symbols", "eo_capacitor.sym", "v 20080706 1\r\n\
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
");

addSymbol("eo_symbols", "eo_current_source.sym", "v 20110115 2\r\n\
T 0 -300 5 10 0 1 0 0 1\r\n\
device=CurrentSource\r\n\
T 400 -150 5 10 1 1 0 0 1\r\n\
refdes=I?\r\n\
T 300 500 5 10 1 1 0 0 1\r\n\
value=10mA\r\n\
P 0 200 200 200 1 0 0\r\n\
{\r\n\
T 50 200 5 10 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 250 200 5 10 0 1 0 0 1\r\n\
pinlabel=P_1\r\n\
T 0 200 5 10 0 1 0 0 1\r\n\
pintype=pwr\r\n\
T 0 200 5 10 0 1 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
P 600 200 800 200 1 0 1\r\n\
{\r\n\
T 650 200 5 10 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 350 200 5 10 0 1 0 0 1\r\n\
pinlabel=P_2\r\n\
T 0 200 5 10 0 1 0 0 1\r\n\
pintype=pwr\r\n\
T 0 200 5 10 0 1 0 0 1\r\n\
pinseq=2\r\n\
}\r\n\
V 400 200 200 3 0 0 0 0 0 0 0 0 0 0 0\r\n\
L 300 200 500 200 3 3 0 0 0 0\r\n\
L 450 250 500 200 3 3 0 0 0 0\r\n\
L 450 150 500 200 3 3 0 0 0 0\r\n\
");

addSymbol("eo_connectors", "eo_db9.sym", "v 20110115 2\r\n\
T 0 -150 5 10 0 1 0 0 1\r\n\
device=CONNECTOR_DB9\r\n\
T 0 0 5 10 1 1 0 0 1\r\n\
refdes=J?\r\n\
P 500 1100 230 1100 1 0 0\r\n\
{\r\n\
T 500 1100 5 8 1 1 0 3 1\r\n\
pinnumber=1\r\n\
T 500 1100 5 10 0 1 0 0 1\r\n\
pinlabel=P_1\r\n\
T 500 1100 5 10 0 1 0 0 1\r\n\
pintype=io\r\n\
T 500 1100 5 10 0 1 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
P 500 900 230 900 1 0 0\r\n\
{\r\n\
T 500 900 5 8 1 1 0 3 1\r\n\
pinnumber=2\r\n\
T 500 900 5 10 0 1 0 0 1\r\n\
pinlabel=P_2\r\n\
T 500 900 5 10 0 1 0 0 1\r\n\
pintype=io\r\n\
T 500 900 5 10 0 1 0 0 1\r\n\
pinseq=2\r\n\
}\r\n\
P 500 700 230 700 1 0 0\r\n\
{\r\n\
T 500 700 5 8 1 1 0 3 1\r\n\
pinnumber=3\r\n\
T 500 700 5 10 0 1 0 0 1\r\n\
pinlabel=P_3\r\n\
T 500 700 5 10 0 1 0 0 1\r\n\
pintype=io\r\n\
T 500 700 5 10 0 1 0 0 1\r\n\
pinseq=3\r\n\
}\r\n\
P 500 500 230 500 1 0 0\r\n\
{\r\n\
T 500 500 5 8 1 1 0 3 1\r\n\
pinnumber=4\r\n\
T 500 500 5 10 0 1 0 0 1\r\n\
pinlabel=P_4\r\n\
T 500 500 5 10 0 1 0 0 1\r\n\
pintype=io\r\n\
T 500 500 5 10 0 1 0 0 1\r\n\
pinseq=4\r\n\
}\r\n\
P 500 300 230 300 1 0 0\r\n\
{\r\n\
T 500 300 5 8 1 1 0 3 1\r\n\
pinnumber=5\r\n\
T 500 300 5 10 0 1 0 0 1\r\n\
pinlabel=P_5\r\n\
T 500 300 5 10 0 1 0 0 1\r\n\
pintype=io\r\n\
T 500 300 5 10 0 1 0 0 1\r\n\
pinseq=5\r\n\
}\r\n\
P 500 1000 130 1000 1 0 0\r\n\
{\r\n\
T 500 1000 5 8 1 1 0 3 1\r\n\
pinnumber=6\r\n\
T 500 1000 5 10 0 1 0 0 1\r\n\
pinlabel=P_6\r\n\
T 500 1000 5 10 0 1 0 0 1\r\n\
pintype=io\r\n\
T 500 1000 5 10 0 1 0 0 1\r\n\
pinseq=6\r\n\
}\r\n\
P 500 800 130 800 1 0 0\r\n\
{\r\n\
T 500 800 5 8 1 1 0 3 1\r\n\
pinnumber=7\r\n\
T 500 800 5 10 0 1 0 0 1\r\n\
pinlabel=P_7\r\n\
T 500 800 5 10 0 1 0 0 1\r\n\
pintype=io\r\n\
T 500 800 5 10 0 1 0 0 1\r\n\
pinseq=7\r\n\
}\r\n\
P 500 600 130 600 1 0 0\r\n\
{\r\n\
T 500 600 5 8 1 1 0 3 1\r\n\
pinnumber=8\r\n\
T 500 600 5 10 0 1 0 0 1\r\n\
pinlabel=P_8\r\n\
T 500 600 5 10 0 1 0 0 1\r\n\
pintype=io\r\n\
T 500 600 5 10 0 1 0 0 1\r\n\
pinseq=8\r\n\
}\r\n\
P 500 400 130 400 1 0 0\r\n\
{\r\n\
T 500 400 5 8 1 1 0 3 1\r\n\
pinnumber=9\r\n\
T 500 400 5 10 0 1 0 0 1\r\n\
pinlabel=P_9\r\n\
T 500 400 5 10 0 1 0 0 1\r\n\
pintype=io\r\n\
T 500 400 5 10 0 1 0 0 1\r\n\
pinseq=9\r\n\
}\r\n\
A 200 1200 100 0 90 3 0 0 0 0 0\r\n\
A 200 200 100 270 90 3 0 0 0 0 0\r\n\
L 200 100 0 200 3 3 0 0 0 0\r\n\
L 0 200 0 1200 3 3 0 0 0 0\r\n\
L 0 1200 200 1300 3 3 0 0 0 0\r\n\
L 300 200 300 1200 3 3 0 0 0 0\r\n\
V 200 300 30 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
V 200 500 30 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
V 200 700 30 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
V 200 900 30 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
V 200 1100 30 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
V 100 400 30 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
V 100 600 30 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
V 100 800 30 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
V 100 1000 30 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
");

addSymbol("eo_connectors", "eo_db15.sym", "v 20110115 2\r\n\
T 0 -150 5 10 0 1 0 0 1\r\n\
device=CONNECTOR_DB15\r\n\
T 0 0 5 10 1 1 0 0 1\r\n\
refdes=J?\r\n\
P 500 1700 230 1700 1 0 0\r\n\
{\r\n\
T 500 1700 5 8 1 1 0 3 1\r\n\
pinnumber=1\r\n\
T 500 1700 5 10 0 1 0 0 1\r\n\
pinlabel=P_1\r\n\
T 500 1700 5 10 0 1 0 0 1\r\n\
pintype=io\r\n\
T 500 1700 5 10 0 1 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
P 500 1500 230 1500 1 0 0\r\n\
{\r\n\
T 500 1500 5 8 1 1 0 3 1\r\n\
pinnumber=2\r\n\
T 500 1500 5 10 0 1 0 0 1\r\n\
pinlabel=P_2\r\n\
T 500 1500 5 10 0 1 0 0 1\r\n\
pintype=io\r\n\
T 500 1500 5 10 0 1 0 0 1\r\n\
pinseq=2\r\n\
}\r\n\
P 500 1300 230 1300 1 0 0\r\n\
{\r\n\
T 500 1300 5 8 1 1 0 3 1\r\n\
pinnumber=3\r\n\
T 500 1300 5 10 0 1 0 0 1\r\n\
pinlabel=P_3\r\n\
T 500 1300 5 10 0 1 0 0 1\r\n\
pintype=io\r\n\
T 500 1300 5 10 0 1 0 0 1\r\n\
pinseq=3\r\n\
}\r\n\
P 500 1100 230 1100 1 0 0\r\n\
{\r\n\
T 500 1100 5 8 1 1 0 3 1\r\n\
pinnumber=4\r\n\
T 500 1100 5 10 0 1 0 0 1\r\n\
pinlabel=P_4\r\n\
T 500 1100 5 10 0 1 0 0 1\r\n\
pintype=io\r\n\
T 500 1100 5 10 0 1 0 0 1\r\n\
pinseq=4\r\n\
}\r\n\
P 500 900 230 900 1 0 0\r\n\
{\r\n\
T 500 900 5 8 1 1 0 3 1\r\n\
pinnumber=5\r\n\
T 500 900 5 10 0 1 0 0 1\r\n\
pinlabel=P_5\r\n\
T 500 900 5 10 0 1 0 0 1\r\n\
pintype=io\r\n\
T 500 900 5 10 0 1 0 0 1\r\n\
pinseq=5\r\n\
}\r\n\
P 500 700 230 700 1 0 0\r\n\
{\r\n\
T 500 700 5 8 1 1 0 3 1\r\n\
pinnumber=6\r\n\
T 500 700 5 10 0 1 0 0 1\r\n\
pinlabel=P_6\r\n\
T 500 700 5 10 0 1 0 0 1\r\n\
pintype=io\r\n\
T 500 700 5 10 0 1 0 0 1\r\n\
pinseq=6\r\n\
}\r\n\
P 500 500 230 500 1 0 0\r\n\
{\r\n\
T 500 500 5 8 1 1 0 3 1\r\n\
pinnumber=7\r\n\
T 500 500 5 10 0 1 0 0 1\r\n\
pinlabel=P_7\r\n\
T 500 500 5 10 0 1 0 0 1\r\n\
pintype=io\r\n\
T 500 500 5 10 0 1 0 0 1\r\n\
pinseq=7\r\n\
}\r\n\
P 500 300 230 300 1 0 0\r\n\
{\r\n\
T 500 300 5 8 1 1 0 3 1\r\n\
pinnumber=8\r\n\
T 500 300 5 10 0 1 0 0 1\r\n\
pinlabel=P_8\r\n\
T 500 300 5 10 0 1 0 0 1\r\n\
pintype=io\r\n\
T 500 300 5 10 0 1 0 0 1\r\n\
pinseq=8\r\n\
}\r\n\
P 500 1600 130 1600 1 0 0\r\n\
{\r\n\
T 500 1600 5 8 1 1 0 3 1\r\n\
pinnumber=9\r\n\
T 500 1600 5 10 0 1 0 0 1\r\n\
pinlabel=P_9\r\n\
T 500 1600 5 10 0 1 0 0 1\r\n\
pintype=io\r\n\
T 500 1000 5 10 0 1 0 0 1\r\n\
pinseq=9\r\n\
}\r\n\
P 500 1400 130 1400 1 0 0\r\n\
{\r\n\
T 500 1400 5 8 1 1 0 3 1\r\n\
pinnumber=10\r\n\
T 500 1400 5 10 0 1 0 0 1\r\n\
pinlabel=P_10\r\n\
T 500 1400 5 10 0 1 0 0 1\r\n\
pintype=io\r\n\
T 500 1400 5 10 0 1 0 0 1\r\n\
pinseq=10\r\n\
}\r\n\
P 500 1200 130 1200 1 0 0\r\n\
{\r\n\
T 500 1200 5 8 1 1 0 3 1\r\n\
pinnumber=11\r\n\
T 500 1200 5 10 0 1 0 0 1\r\n\
pinlabel=P_11\r\n\
T 500 1200 5 10 0 1 0 0 1\r\n\
pintype=io\r\n\
T 500 1200 5 10 0 1 0 0 1\r\n\
pinseq=11\r\n\
}\r\n\
P 500 1000 130 1000 1 0 0\r\n\
{\r\n\
T 500 1000 5 8 1 1 0 3 1\r\n\
pinnumber=12\r\n\
T 500 1000 5 10 0 1 0 0 1\r\n\
pinlabel=P_12\r\n\
T 500 1000 5 10 0 1 0 0 1\r\n\
pintype=io\r\n\
T 500 1000 5 10 0 1 0 0 1\r\n\
pinseq=12\r\n\
}\r\n\
P 500 800 130 800 1 0 0\r\n\
{\r\n\
T 500 800 5 8 1 1 0 3 1\r\n\
pinnumber=13\r\n\
T 500 800 5 10 0 1 0 0 1\r\n\
pinlabel=P_13\r\n\
T 500 800 5 10 0 1 0 0 1\r\n\
pintype=io\r\n\
T 500 800 5 10 0 1 0 0 1\r\n\
pinseq=13\r\n\
}\r\n\
P 500 600 130 600 1 0 0\r\n\
{\r\n\
T 500 600 5 8 1 1 0 3 1\r\n\
pinnumber=14\r\n\
T 500 600 5 10 0 1 0 0 1\r\n\
pinlabel=P_14\r\n\
T 500 600 5 10 0 1 0 0 1\r\n\
pintype=io\r\n\
T 500 600 5 10 0 1 0 0 1\r\n\
pinseq=14\r\n\
}\r\n\
P 500 400 130 400 1 0 0\r\n\
{\r\n\
T 500 400 5 8 1 1 0 3 1\r\n\
pinnumber=15\r\n\
T 500 400 5 10 0 1 0 0 1\r\n\
pinlabel=P_15\r\n\
T 500 400 5 10 0 1 0 0 1\r\n\
pintype=io\r\n\
T 500 400 5 10 0 1 0 0 1\r\n\
pinseq=15\r\n\
}\r\n\
A 200 1800 100 0 90 3 0 0 0 0 0\r\n\
A 200 200 100 270 90 3 0 0 0 0 0\r\n\
L 200 100 0 200 3 3 0 0 0 0\r\n\
L 0 200 0 1800 3 3 0 0 0 0\r\n\
L 0 1800 200 1900 3 3 0 0 0 0\r\n\
L 300 200 300 1800 3 3 0 0 0 0\r\n\
V 200 300 30 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
V 200 500 30 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
V 200 700 30 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
V 200 900 30 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
V 200 1100 30 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
V 200 1300 30 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
V 200 1500 30 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
V 200 1700 30 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
V 100 400 30 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
V 100 600 30 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
V 100 800 30 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
V 100 1000 30 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
V 100 1200 30 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
V 100 1400 30 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
V 100 1600 30 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
");

addSymbol("eo_connectors", "eo_db25.sym", "v 20110115 2\r\n\
T 0 -150 5 10 0 1 0 0 1\r\n\
device=CONNECTOR_DB25\r\n\
T 0 0 5 10 1 1 0 0 1\r\n\
refdes=J?\r\n\
P 500 2700 230 2700 1 0 0\r\n\
{\r\n\
T 500 2700 5 8 1 1 0 3 1\r\n\
pinnumber=1\r\n\
T 500 2700 5 10 0 1 0 0 1\r\n\
pinlabel=P_1\r\n\
T 500 2700 5 10 0 1 0 0 1\r\n\
pintype=io\r\n\
T 500 2700 5 10 0 1 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
P 500 2600 130 2600 1 0 0\r\n\
{\r\n\
T 500 2600 5 8 1 1 0 3 1\r\n\
pinnumber=14\r\n\
T 500 2600 5 10 0 1 0 0 1\r\n\
pinlabel=P_14\r\n\
T 500 2600 5 10 0 1 0 0 1\r\n\
pintype=io\r\n\
T 500 2000 5 10 0 1 0 0 1\r\n\
pinseq=14\r\n\
}\r\n\
P 500 2500 230 2500 1 0 0\r\n\
{\r\n\
T 500 2500 5 8 1 1 0 3 1\r\n\
pinnumber=2\r\n\
T 500 2500 5 10 0 1 0 0 1\r\n\
pinlabel=P_2\r\n\
T 500 2500 5 10 0 1 0 0 1\r\n\
pintype=io\r\n\
T 500 2500 5 10 0 1 0 0 1\r\n\
pinseq=2\r\n\
}\r\n\
P 500 2400 130 2400 1 0 0\r\n\
{\r\n\
T 500 2400 5 8 1 1 0 3 1\r\n\
pinnumber=15\r\n\
T 500 2400 5 10 0 1 0 0 1\r\n\
pinlabel=P_15\r\n\
T 500 2400 5 10 0 1 0 0 1\r\n\
pintype=io\r\n\
T 500 2400 5 10 0 1 0 0 1\r\n\
pinseq=15\r\n\
}\r\n\
P 500 2300 230 2300 1 0 0\r\n\
{\r\n\
T 500 2300 5 8 1 1 0 3 1\r\n\
pinnumber=3\r\n\
T 500 2300 5 10 0 1 0 0 1\r\n\
pinlabel=P_3\r\n\
T 500 2300 5 10 0 1 0 0 1\r\n\
pintype=io\r\n\
T 500 2300 5 10 0 1 0 0 1\r\n\
pinseq=3\r\n\
}\r\n\
P 500 2200 130 2200 1 0 0\r\n\
{\r\n\
T 500 2200 5 8 1 1 0 3 1\r\n\
pinnumber=16\r\n\
T 500 2200 5 10 0 1 0 0 1\r\n\
pinlabel=P_16\r\n\
T 500 2200 5 10 0 1 0 0 1\r\n\
pintype=io\r\n\
T 500 2200 5 10 0 1 0 0 1\r\n\
pinseq=16\r\n\
}\r\n\
P 500 2100 230 2100 1 0 0\r\n\
{\r\n\
T 500 2100 5 8 1 1 0 3 1\r\n\
pinnumber=4\r\n\
T 500 2100 5 10 0 1 0 0 1\r\n\
pinlabel=P_4\r\n\
T 500 2100 5 10 0 1 0 0 1\r\n\
pintype=io\r\n\
T 500 2100 5 10 0 1 0 0 1\r\n\
pinseq=4\r\n\
}\r\n\
P 500 2000 130 2000 1 0 0\r\n\
{\r\n\
T 500 2000 5 8 1 1 0 3 1\r\n\
pinnumber=17\r\n\
T 500 2000 5 10 0 1 0 0 1\r\n\
pinlabel=P_17\r\n\
T 500 2000 5 10 0 1 0 0 1\r\n\
pintype=io\r\n\
T 500 2000 5 10 0 1 0 0 1\r\n\
pinseq=17\r\n\
}\r\n\
P 500 1900 230 1900 1 0 0\r\n\
{\r\n\
T 500 1900 5 8 1 1 0 3 1\r\n\
pinnumber=5\r\n\
T 500 1900 5 10 0 1 0 0 1\r\n\
pinlabel=P_5\r\n\
T 500 1900 5 10 0 1 0 0 1\r\n\
pintype=io\r\n\
T 500 1900 5 10 0 1 0 0 1\r\n\
pinseq=5\r\n\
}\r\n\
P 500 1800 130 1800 1 0 0\r\n\
{\r\n\
T 500 1800 5 8 1 1 0 3 1\r\n\
pinnumber=18\r\n\
T 500 1800 5 10 0 1 0 0 1\r\n\
pinlabel=P_18\r\n\
T 500 1800 5 10 0 1 0 0 1\r\n\
pintype=io\r\n\
T 500 1800 5 10 0 1 0 0 1\r\n\
pinseq=18\r\n\
}\r\n\
P 500 1700 230 1700 1 0 0\r\n\
{\r\n\
T 500 1700 5 8 1 1 0 3 1\r\n\
pinnumber=6\r\n\
T 500 1700 5 10 0 1 0 0 1\r\n\
pinlabel=P_6\r\n\
T 500 1700 5 10 0 1 0 0 1\r\n\
pintype=io\r\n\
T 500 1700 5 10 0 1 0 0 1\r\n\
pinseq=6\r\n\
}\r\n\
P 500 1600 130 1600 1 0 0\r\n\
{\r\n\
T 500 1600 5 8 1 1 0 3 1\r\n\
pinnumber=19\r\n\
T 500 1600 5 10 0 1 0 0 1\r\n\
pinlabel=P_19\r\n\
T 500 1600 5 10 0 1 0 0 1\r\n\
pintype=io\r\n\
T 500 1000 5 10 0 1 0 0 1\r\n\
pinseq=19\r\n\
}\r\n\
P 500 1500 230 1500 1 0 0\r\n\
{\r\n\
T 500 1500 5 8 1 1 0 3 1\r\n\
pinnumber=7\r\n\
T 500 1500 5 10 0 1 0 0 1\r\n\
pinlabel=P_7\r\n\
T 500 1500 5 10 0 1 0 0 1\r\n\
pintype=io\r\n\
T 500 1500 5 10 0 1 0 0 1\r\n\
pinseq=7\r\n\
}\r\n\
P 500 1400 130 1400 1 0 0\r\n\
{\r\n\
T 500 1400 5 8 1 1 0 3 1\r\n\
pinnumber=20\r\n\
T 500 1400 5 10 0 1 0 0 1\r\n\
pinlabel=P_20\r\n\
T 500 1400 5 10 0 1 0 0 1\r\n\
pintype=io\r\n\
T 500 1400 5 10 0 1 0 0 1\r\n\
pinseq=20\r\n\
}\r\n\
P 500 1300 230 1300 1 0 0\r\n\
{\r\n\
T 500 1300 5 8 1 1 0 3 1\r\n\
pinnumber=8\r\n\
T 500 1300 5 10 0 1 0 0 1\r\n\
pinlabel=P_8\r\n\
T 500 1300 5 10 0 1 0 0 1\r\n\
pintype=io\r\n\
T 500 1300 5 10 0 1 0 0 1\r\n\
pinseq=8\r\n\
}\r\n\
P 500 1200 130 1200 1 0 0\r\n\
{\r\n\
T 500 1200 5 8 1 1 0 3 1\r\n\
pinnumber=21\r\n\
T 500 1200 5 10 0 1 0 0 1\r\n\
pinlabel=P_21\r\n\
T 500 1200 5 10 0 1 0 0 1\r\n\
pintype=io\r\n\
T 500 1200 5 10 0 1 0 0 1\r\n\
pinseq=21\r\n\
}\r\n\
P 500 1100 230 1100 1 0 0\r\n\
{\r\n\
T 500 1100 5 8 1 1 0 3 1\r\n\
pinnumber=9\r\n\
T 500 1100 5 10 0 1 0 0 1\r\n\
pinlabel=P_9\r\n\
T 500 1100 5 10 0 1 0 0 1\r\n\
pintype=io\r\n\
T 500 1100 5 10 0 1 0 0 1\r\n\
pinseq=9\r\n\
}\r\n\
P 500 1000 130 1000 1 0 0\r\n\
{\r\n\
T 500 1000 5 8 1 1 0 3 1\r\n\
pinnumber=22\r\n\
T 500 1000 5 10 0 1 0 0 1\r\n\
pinlabel=P_22\r\n\
T 500 1000 5 10 0 1 0 0 1\r\n\
pintype=io\r\n\
T 500 1000 5 10 0 1 0 0 1\r\n\
pinseq=22\r\n\
}\r\n\
P 500 900 230 900 1 0 0\r\n\
{\r\n\
T 500 900 5 8 1 1 0 3 1\r\n\
pinnumber=10\r\n\
T 500 900 5 10 0 1 0 0 1\r\n\
pinlabel=P_10\r\n\
T 500 900 5 10 0 1 0 0 1\r\n\
pintype=io\r\n\
T 500 900 5 10 0 1 0 0 1\r\n\
pinseq=10\r\n\
}\r\n\
P 500 800 130 800 1 0 0\r\n\
{\r\n\
T 500 800 5 8 1 1 0 3 1\r\n\
pinnumber=23\r\n\
T 500 800 5 10 0 1 0 0 1\r\n\
pinlabel=P_23\r\n\
T 500 800 5 10 0 1 0 0 1\r\n\
pintype=io\r\n\
T 500 800 5 10 0 1 0 0 1\r\n\
pinseq=23\r\n\
}\r\n\
P 500 700 230 700 1 0 0\r\n\
{\r\n\
T 500 700 5 8 1 1 0 3 1\r\n\
pinnumber=11\r\n\
T 500 700 5 10 0 1 0 0 1\r\n\
pinlabel=P_11\r\n\
T 500 700 5 10 0 1 0 0 1\r\n\
pintype=io\r\n\
T 500 700 5 10 0 1 0 0 1\r\n\
pinseq=11\r\n\
}\r\n\
P 500 600 130 600 1 0 0\r\n\
{\r\n\
T 500 600 5 8 1 1 0 3 1\r\n\
pinnumber=24\r\n\
T 500 600 5 10 0 1 0 0 1\r\n\
pinlabel=P_24\r\n\
T 500 600 5 10 0 1 0 0 1\r\n\
pintype=io\r\n\
T 500 600 5 10 0 1 0 0 1\r\n\
pinseq=24\r\n\
}\r\n\
P 500 500 230 500 1 0 0\r\n\
{\r\n\
T 500 500 5 8 1 1 0 3 1\r\n\
pinnumber=12\r\n\
T 500 500 5 10 0 1 0 0 1\r\n\
pinlabel=P_12\r\n\
T 500 500 5 10 0 1 0 0 1\r\n\
pintype=io\r\n\
T 500 500 5 10 0 1 0 0 1\r\n\
pinseq=12\r\n\
}\r\n\
P 500 400 130 400 1 0 0\r\n\
{\r\n\
T 500 400 5 8 1 1 0 3 1\r\n\
pinnumber=25\r\n\
T 500 400 5 10 0 1 0 0 1\r\n\
pinlabel=P_25\r\n\
T 500 400 5 10 0 1 0 0 1\r\n\
pintype=io\r\n\
T 500 400 5 10 0 1 0 0 1\r\n\
pinseq=25\r\n\
}\r\n\
P 500 300 230 300 1 0 0\r\n\
{\r\n\
T 500 300 5 8 1 1 0 3 1\r\n\
pinnumber=13\r\n\
T 500 300 5 10 0 1 0 0 1\r\n\
pinlabel=P_13\r\n\
T 500 300 5 10 0 1 0 0 1\r\n\
pintype=io\r\n\
T 500 300 5 10 0 1 0 0 1\r\n\
pinseq=13\r\n\
}\r\n\
A 200 2800 100 0 90 3 0 0 0 0 0\r\n\
A 200 200 100 270 90 3 0 0 0 0 0\r\n\
L 200 100 0 200 3 3 0 0 0 0\r\n\
L 0 200 0 2800 3 3 0 0 0 0\r\n\
L 0 2800 200 2900 3 3 0 0 0 0\r\n\
L 300 200 300 2800 3 3 0 0 0 0\r\n\
V 200 300 30 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
V 200 500 30 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
V 200 700 30 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
V 200 900 30 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
V 200 1100 30 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
V 200 1300 30 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
V 200 1500 30 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
V 200 1700 30 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
V 200 1900 30 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
V 200 2100 30 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
V 200 2300 30 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
V 200 2500 30 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
V 200 2700 30 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
V 100 400 30 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
V 100 600 30 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
V 100 800 30 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
V 100 1000 30 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
V 100 1200 30 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
V 100 1400 30 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
V 100 1600 30 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
V 100 1800 30 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
V 100 2000 30 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
V 100 2200 30 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
V 100 2400 30 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
V 100 2600 30 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
");

addSymbol("eo_symbols", "eo_dff.sym", "v 20110115 2\r\n\
T 0 -150 5 10 0 1 0 0 1\r\n\
device=DFF\r\n\
T 0 0 5 10 1 1 0 0 1\r\n\
refdes=U?\r\n\
P 0 900 200 900 1 0 0\r\n\
{\r\n\
T 0 900 5 10 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 300 900 5 10 1 1 0 0 1\r\n\
pinlabel=D\r\n\
T 0 900 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 900 5 10 0 1 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
P 0 400 200 400 1 0 0\r\n\
{\r\n\
T 0 400 5 10 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 300 400 5 10 1 1 0 0 1\r\n\
pinlabel=CLK\r\n\
T 0 400 5 10 0 1 0 0 1\r\n\
pintype=clk\r\n\
T 0 400 5 10 0 1 0 0 1\r\n\
pinseq=2\r\n\
}\r\n\
P 800 900 1000 900 1 0 1\r\n\
{\r\n\
T 800 900 5 10 0 1 0 0 1\r\n\
pinnumber=3\r\n\
T 700 900 5 10 1 1 0 0 1\r\n\
pinlabel=Q\r\n\
T 800 900 5 10 0 1 0 0 1\r\n\
pintype=out\r\n\
T 800 900 5 10 0 1 0 0 1\r\n\
pinseq=3\r\n\
}\r\n\
L 200 500 300 400 3 3 0 0 0 0\r\n\
L 300 400 200 300 3 3 0 0 0 0\r\n\
B 200 100 600 999 3 3 0 0 0 0 0 0 0 0 0 0\r\n\
");

addSymbol("eo_symbols", "eo_dffqqn.sym", "v 20110115 2\r\n\
T 0 -150 5 10 0 1 0 0 1\r\n\
device=DFF_QQN\r\n\
T 0 0 5 10 1 1 0 0 1\r\n\
refdes=U?\r\n\
P 0 900 200 900 1 0 0\r\n\
{\r\n\
T 0 900 5 10 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 300 900 5 10 1 1 0 0 1\r\n\
pinlabel=D\r\n\
T 0 900 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 900 5 10 0 1 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
P 0 400 200 400 1 0 0\r\n\
{\r\n\
T 0 400 5 10 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 300 400 5 10 1 1 0 0 1\r\n\
pinlabel=CLK\r\n\
T 0 400 5 10 0 1 0 0 1\r\n\
pintype=clk\r\n\
T 0 400 5 10 0 1 0 0 1\r\n\
pinseq=2\r\n\
}\r\n\
P 800 900 1000 900 1 0 1\r\n\
{\r\n\
T 800 900 5 10 0 1 0 0 1\r\n\
pinnumber=3\r\n\
T 700 900 5 10 1 1 0 0 1\r\n\
pinlabel=Q\r\n\
T 800 900 5 10 0 1 0 0 1\r\n\
pintype=out\r\n\
T 800 900 5 10 0 1 0 0 1\r\n\
pinseq=3\r\n\
}\r\n\
L 200 500 300 400 3 3 0 0 0 0\r\n\
L 300 400 200 300 3 3 0 0 0 0\r\n\
B 200 100 600 999 3 3 0 0 0 0 0 0 0 0 0 0\r\n\
P 800 400 1000 400 1 0 1\r\n\
{\r\n\
T 800 400 5 10 0 1 0 0 1\r\n\
pinnumber=4\r\n\
T 600 400 5 10 1 1 0 0 1\r\n\
pinlabel=QN\r\n\
T 800 400 5 10 0 1 0 0 1\r\n\
pintype=out\r\n\
T 800 400 5 10 0 1 0 0 1\r\n\
pinseq=4\r\n\
}\r\n\
");

addSymbol("eo_symbols", "eo_dffqqnrn.sym", "v 20110115 2\r\n\
T 0 -150 5 10 0 1 0 0 1\r\n\
device=DFFQQNRN\r\n\
T 100 100 5 10 1 1 0 0 1\r\n\
refdes=U?\r\n\
P 500 100 500 300 1 0 0\r\n\
{\r\n\
T 500 100 5 10 0 1 0 0 1\r\n\
pinnumber=5\r\n\
T 450 350 5 10 1 1 0 0 1\r\n\
pinlabel=RN\r\n\
T 500 100 5 10 0 1 0 0 1\r\n\
pintype=clk\r\n\
T 500 100 5 10 0 1 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
P 0 1100 200 1100 1 0 0\r\n\
{\r\n\
T 0 1100 5 10 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 300 1100 5 10 1 1 0 0 1\r\n\
pinlabel=D\r\n\
T 0 1100 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 1100 5 10 0 1 0 0 1\r\n\
pinseq=2\r\n\
}\r\n\
P 0 600 200 600 1 0 0\r\n\
{\r\n\
T 0 600 5 10 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 300 600 5 10 1 1 0 0 1\r\n\
pinlabel=CLK\r\n\
T 0 600 5 10 0 1 0 0 1\r\n\
pintype=clk\r\n\
T 0 600 5 10 0 1 0 0 1\r\n\
pinseq=3\r\n\
}\r\n\
P 800 1100 1000 1100 1 0 1\r\n\
{\r\n\
T 800 1100 5 10 0 1 0 0 1\r\n\
pinnumber=3\r\n\
T 700 1100 5 10 1 1 0 0 1\r\n\
pinlabel=Q\r\n\
T 800 1100 5 10 0 1 0 0 1\r\n\
pintype=out\r\n\
T 800 1100 5 10 0 1 0 0 1\r\n\
pinseq=4\r\n\
}\r\n\
L 200 700 300 600 3 3 0 0 0 0\r\n\
L 300 600 200 500 3 3 0 0 0 0\r\n\
B 200 300 600 999 3 3 0 0 0 0 0 0 0 0 0 0\r\n\
P 800 600 1000 600 1 0 1\r\n\
{\r\n\
T 800 600 5 10 0 1 0 0 1\r\n\
pinnumber=4\r\n\
T 600 600 5 10 1 1 0 0 1\r\n\
pinlabel=QN\r\n\
T 800 600 5 10 0 1 0 0 1\r\n\
pintype=out\r\n\
T 800 600 5 10 0 1 0 0 1\r\n\
pinseq=5\r\n\
}\r\n\
");

addSymbol("eo_symbols", "eo_dffqrn.sym", "v 20110115 2\r\n\
T 0 -150 5 10 0 1 0 0 1\r\n\
device=DFFQNRN\r\n\
T 100 100 5 10 1 1 0 0 1\r\n\
refdes=U?\r\n\
P 500 100 500 300 1 0 0\r\n\
{\r\n\
T 500 100 5 10 0 1 0 0 1\r\n\
pinnumber=5\r\n\
T 450 350 5 10 1 1 0 0 1\r\n\
pinlabel=RN\r\n\
T 500 100 5 10 0 1 0 0 1\r\n\
pintype=clk\r\n\
T 500 100 5 10 0 1 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
P 0 1100 200 1100 1 0 0\r\n\
{\r\n\
T 0 1100 5 10 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 300 1100 5 10 1 1 0 0 1\r\n\
pinlabel=D\r\n\
T 0 1100 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 1100 5 10 0 1 0 0 1\r\n\
pinseq=2\r\n\
}\r\n\
P 0 600 200 600 1 0 0\r\n\
{\r\n\
T 0 600 5 10 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 300 600 5 10 1 1 0 0 1\r\n\
pinlabel=CLK\r\n\
T 0 600 5 10 0 1 0 0 1\r\n\
pintype=clk\r\n\
T 0 600 5 10 0 1 0 0 1\r\n\
pinseq=3\r\n\
}\r\n\
P 800 1100 1000 1100 1 0 1\r\n\
{\r\n\
T 800 1100 5 10 0 1 0 0 1\r\n\
pinnumber=3\r\n\
T 700 1100 5 10 1 1 0 0 1\r\n\
pinlabel=Q\r\n\
T 800 1100 5 10 0 1 0 0 1\r\n\
pintype=out\r\n\
T 800 1100 5 10 0 1 0 0 1\r\n\
pinseq=4\r\n\
}\r\n\
L 200 700 300 600 3 3 0 0 0 0\r\n\
L 300 600 200 500 3 3 0 0 0 0\r\n\
B 200 300 600 999 3 3 0 0 0 0 0 0 0 0 0 0\r\n\
}\r\n\
");


addSymbol("eo_symbols", "eo_dffqqnrnpn.sym", "v 20110115 2\r\n\
T 0 -150 5 10 0 1 0 0 1\r\n\
device=DFFQQNRNPN\r\n\
T 100 100 5 10 1 1 0 0 1\r\n\
refdes=U?\r\n\
P 500 100 500 300 1 0 0\r\n\
{\r\n\
T 500 100 5 10 0 1 0 0 1\r\n\
pinnumber=5\r\n\
T 450 350 5 10 1 1 0 0 1\r\n\
pinlabel=RN\r\n\
T 500 100 5 10 0 1 0 0 1\r\n\
pintype=clk\r\n\
T 500 100 5 10 0 1 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
P 0 1100 200 1100 1 0 0\r\n\
{\r\n\
T 0 1100 5 10 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 300 1100 5 10 1 1 0 0 1\r\n\
pinlabel=D\r\n\
T 0 1100 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 1100 5 10 0 1 0 0 1\r\n\
pinseq=2\r\n\
}\r\n\
P 0 600 200 600 1 0 0\r\n\
{\r\n\
T 0 600 5 10 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 300 600 5 10 1 1 0 0 1\r\n\
pinlabel=CLK\r\n\
T 0 600 5 10 0 1 0 0 1\r\n\
pintype=clk\r\n\
T 0 600 5 10 0 1 0 0 1\r\n\
pinseq=3\r\n\
}\r\n\
P 800 1100 1000 1100 1 0 1\r\n\
{\r\n\
T 800 1100 5 10 0 1 0 0 1\r\n\
pinnumber=3\r\n\
T 700 1100 5 10 1 1 0 0 1\r\n\
pinlabel=Q\r\n\
T 800 1100 5 10 0 1 0 0 1\r\n\
pintype=out\r\n\
T 800 1100 5 10 0 1 0 0 1\r\n\
pinseq=4\r\n\
}\r\n\
L 200 700 300 600 3 3 0 0 0 0\r\n\
L 300 600 200 500 3 3 0 0 0 0\r\n\
B 200 300 600 999 3 3 0 0 0 0 0 0 0 0 0 0\r\n\
P 800 600 1000 600 1 0 1\r\n\
{\r\n\
T 800 600 5 10 0 1 0 0 1\r\n\
pinnumber=4\r\n\
T 600 600 5 10 1 1 0 0 1\r\n\
pinlabel=QN\r\n\
T 800 600 5 10 0 1 0 0 1\r\n\
pintype=out\r\n\
T 800 600 5 10 0 1 0 0 1\r\n\
pinseq=5\r\n\
}\r\n\
P 500 1500 500 1300 1 0 0\r\n\
{\r\n\
T 500 1500 5 10 0 1 0 0 1\r\n\
pinnumber=6\r\n\
T 450 1200 5 10 1 1 0 0 1\r\n\
pinlabel=PN\r\n\
T 500 1500 5 10 0 1 0 0 1\r\n\
pintype=clk\r\n\
T 500 1500 5 10 0 1 0 0 1\r\n\
pinseq=6\r\n\
}\r\n\
");

addSymbol("eo_symbols", "dffqqrn.sym", "v 20110115 2\r\n\
T 0 -150 5 10 0 1 0 0 1\r\n\
device=DFFQQNRN\r\n\
T 100 100 5 10 1 1 0 0 1\r\n\
refdes=U?\r\n\
P 500 100 500 300 1 0 0\r\n\
{\r\n\
T 500 100 5 10 0 1 0 0 1\r\n\
pinnumber=4\r\n\
T 450 350 5 10 1 1 0 0 1\r\n\
pinlabel=RN\r\n\
T 500 100 5 10 0 1 0 0 1\r\n\
pintype=clk\r\n\
T 500 100 5 10 0 1 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
P 0 1100 200 1100 1 0 0\r\n\
{\r\n\
T 0 1100 5 10 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 300 1100 5 10 1 1 0 0 1\r\n\
pinlabel=D\r\n\
T 0 1100 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 1100 5 10 0 1 0 0 1\r\n\
pinseq=2\r\n\
}\r\n\
P 0 600 200 600 1 0 0\r\n\
{\r\n\
T 0 600 5 10 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 300 600 5 10 1 1 0 0 1\r\n\
pinlabel=CLK\r\n\
T 0 600 5 10 0 1 0 0 1\r\n\
pintype=clk\r\n\
T 0 600 5 10 0 1 0 0 1\r\n\
pinseq=3\r\n\
}\r\n\
P 800 1100 1000 1100 1 0 1\r\n\
{\r\n\
T 800 1100 5 10 0 1 0 0 1\r\n\
pinnumber=3\r\n\
T 700 1100 5 10 1 1 0 0 1\r\n\
pinlabel=Q\r\n\
T 800 1100 5 10 0 1 0 0 1\r\n\
pintype=out\r\n\
T 800 1100 5 10 0 1 0 0 1\r\n\
pinseq=4\r\n\
}\r\n\
L 200 700 300 600 3 3 0 0 0 0\r\n\
L 300 600 200 500 3 3 0 0 0 0\r\n\
B 200 300 600 999 3 3 0 0 0 0 0 0 0 0 0 0\r\n\
");

addSymbol("eo_symbols", "eo_dgnd.sym", "v 20110115 2\r\n\
T 0 -150 5 10 0 1 0 0 1\r\n\
device=DGND\r\n\
T 0 0 5 10 1 1 0 0 1\r\n\
refdes=\r\n\
L 20 100 180 100 3 3 0 0 0 0\r\n\
L 180 100 100 0 3 3 0 0 0 0\r\n\
L 100 0 20 100 3 3 0 0 0 0\r\n\
P 100 300 100 100 1 0 0\r\n\
{\r\n\
T 150 300 5 10 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 80 40 5 6 1 1 0 0 1\r\n\
label=D\r\n\
T 0 300 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 300 5 10 0 1 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
T 300 200 5 8 0 1 0 0 1\r\n\
net=DGND:1\r\n\
");

addSymbol("eo_symbols", "eo_diode.sym", "v 20031231 1\r\n\
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
T 450 250 5 8 0 1 0 0 1\r\n\
pinlabel=K\r\n\
T 450 250 5 8 0 1 0 0 1\r\n\
pintype=pas\r\n\
}\r\n\
L 0 100 200 100 3 0 0 0 -1 -1\r\n\
L 400 100 600 100 3 0 0 0 -1 -1\r\n\
T 200 300 8 10 1 1 0 0 1\r\n\
refdes=D?\r\n\
");

addSymbol("eo_symbols", "eo_dpdt.sym", "v 20110115 2\r\n\
T 410 850 8 10 0 0 0 0 1\r\n\
device=DPDT\r\n\
T 410 1500 8 10 1 1 0 0 1\r\n\
refdes=S?\r\n\
P 300 300 0 300 1 0 1\r\n\
{\r\n\
T 160 300 5 10 0 1 0 0 1\r\n\
pinnumber=5\r\n\
T 160 350 5 10 0 1 0 0 1\r\n\
pinlabel=P_5\r\n\
T 160 350 5 10 0 1 0 0 1\r\n\
pintype=pas\r\n\
T 160 350 5 10 0 0 0 0 1\r\n\
pinseq=5\r\n\
}\r\n\
P 700 500 1000 500 1 0 1\r\n\
{\r\n\
T 710 500 5 10 0 1 0 0 1\r\n\
pinnumber=4\r\n\
T 710 500 5 10 0 1 0 0 1\r\n\
pinlabel=P_4\r\n\
T 860 550 5 10 0 1 0 0 1\r\n\
pintype=pas\r\n\
T 860 550 5 10 0 0 0 0 1\r\n\
pinseq=4\r\n\
}\r\n\
P 700 100 1000 100 1 0 1\r\n\
{\r\n\
T 710 100 5 10 0 1 0 0 1\r\n\
pinnumber=6\r\n\
T 860 150 5 10 0 1 0 0 1\r\n\
pinlabel=P_6\r\n\
T 860 150 5 10 0 1 0 0 1\r\n\
pintype=pas\r\n\
T 860 150 5 10 0 0 0 0 1\r\n\
pinseq=6\r\n\
}\r\n\
L 300 300 660 450 3 0 0 0 -1 -1\r\n\
P 300 1100 0 1100 1 0 1\r\n\
{\r\n\
T 300 1100 5 10 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 160 1150 5 10 0 1 0 0 1\r\n\
pinlabel=P_2\r\n\
T 160 1150 5 10 0 1 0 0 1\r\n\
pintype=pas\r\n\
T 160 1150 5 10 0 0 0 0 1\r\n\
pinseq=2\r\n\
}\r\n\
P 700 1300 1000 1300 1 0 1\r\n\
{\r\n\
T 710 1300 5 10 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 710 1300 5 10 0 1 0 0 1\r\n\
pinlabel=P_1\r\n\
T 860 1350 5 10 0 1 0 0 1\r\n\
pintype=pas\r\n\
T 860 1350 5 10 0 0 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
P 700 900 1000 900 1 0 1\r\n\
{\r\n\
T 800 850 5 10 0 1 0 0 1\r\n\
pinnumber=3\r\n\
T 860 950 5 10 0 1 0 0 1\r\n\
pinlabel=P_3\r\n\
T 860 950 5 10 0 1 0 0 1\r\n\
pintype=pas\r\n\
T 860 950 5 10 0 0 0 0 1\r\n\
pinseq=3\r\n\
}\r\n\
L 310 1100 660 1250 3 0 0 0 -1 -1\r\n\
L 460 1160 460 1050 3 0 0 0 -1 -1\r\n\
L 460 450 460 370 3 0 0 0 -1 -1\r\n\
L 460 700 460 550 3 0 0 0 -1 -1\r\n\
L 460 950 460 800 3 0 0 0 -1 -1\r\n\
V 660 1300 50 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
V 660 900 50 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
V 660 500 50 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
V 660 100 50 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
");

addSymbol("eo_symbols", "eo_earth.sym", "v 20031231 1\r\n\
P 100 100 100 300 1 0 1\r\n\
{\r\n\
T 158 161 5 4 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 158 161 5 4 0 0 0 0 1\r\n\
pinseq=1\r\n\
T 158 161 5 4 0 1 0 0 1\r\n\
pinlabel=1\r\n\
T 158 161 5 4 0 1 0 0 1\r\n\
pintype=pwr\r\n\
}\r\n\
L 0 100 200 100 3 0 0 0 -1 -1\r\n\
L 55 50 145 50 3 0 0 0 -1 -1\r\n\
L 80 10 120 10 3 0 0 0 -1 -1\r\n\
T 300 50 8 10 0 0 0 0 1\r\n\
net=GND:1\r\n\
");

addSymbol("eo_symbols", "eo_fuses.sym", "v 20050820 1\r\n\
P 0 0 200 0 1 0 0\r\n\
{\r\n\
T 150 50 5 8 0 1 0 6 1\r\n\
pinnumber=1\r\n\
T 150 -50 5 8 0 1 0 8 1\r\n\
pinseq=1\r\n\
T 250 0 9 8 0 1 0 0 1\r\n\
pinlabel=1\r\n\
T 250 0 5 8 0 1 0 2 1\r\n\
pintype=pas\r\n\
}\r\n\
P 700 0 900 0 1 0 1\r\n\
{\r\n\
T 750 50 5 8 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 750 -50 5 8 0 1 0 2 1\r\n\
pinseq=2\r\n\
T 650 0 9 8 0 1 0 6 1\r\n\
pinlabel=2\r\n\
T 650 0 5 8 0 1 0 8 1\r\n\
pintype=pas\r\n\
}\r\n\
A 325 0 125 180 180 3 0 0 0 -1 -1\r\n\
A 575 0 125 0 180 3 0 0 0 -1 -1\r\n\
T 200 400 5 10 0 0 0 0 1\r\n\
device=FUSE\r\n\
T 200 200 8 10 1 1 0 0 1\r\n\
refdes=F?\r\n\
T 200 1000 5 10 0 0 0 0 1\r\n\
description=fuse\r\n\
");

addSymbol("eo_symbols", "eo_gnd_chassis.sym", "v 20031231 1\r\n\
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
");

addSymbol("eo_symbols", "eo_gnd_tri.sym", "v 20110115 2\r\n\
T 0 -150 5 10 0 1 0 0 1\r\n\
device=UGND\r\n\
T 0 0 5 10 1 1 0 0 1\r\n\
refdes=\r\n\
L 20 100 180 100 3 3 0 0 0 0\r\n\
L 180 100 100 0 3 3 0 0 0 0\r\n\
L 100 0 20 100 3 3 0 0 0 0\r\n\
P 100 300 100 100 1 0 0\r\n\
{\r\n\
T 150 300 5 10 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 80 40 5 6 1 1 0 0 1\r\n\
label=\r\n\
T 0 300 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 300 5 10 0 1 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
T 300 200 5 8 0 1 0 0 1\r\n\
net=GND:1\r\n\
");

addSymbol("eo_symbols", "eo_inductor_big.sym", "v 20050820 1\r\n\
P 900 100 750 100 1 0 0\r\n\
{\r\n\
T 800 150 5 8 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 800 50 5 8 0 1 0 2 1\r\n\
pinseq=2\r\n\
T 700 100 9 8 0 1 0 6 1\r\n\
pinlabel=2\r\n\
T 700 100 5 8 0 1 0 8 1\r\n\
pintype=pas\r\n\
}\r\n\
P 0 100 150 100 1 0 0\r\n\
{\r\n\
T 100 150 5 8 0 1 0 6 1\r\n\
pinnumber=1\r\n\
T 100 50 5 8 0 1 0 8 1\r\n\
pinseq=1\r\n\
T 200 100 9 8 0 1 0 0 1\r\n\
pinlabel=1\r\n\
T 200 100 5 8 0 1 0 2 1\r\n\
pintype=pas\r\n\
}\r\n\
A 237 100 75 0 180 3 0 0 0 -1 -1\r\n\
A 379 100 75 0 180 3 0 0 0 -1 -1\r\n\
A 521 100 75 0 180 3 0 0 0 -1 -1\r\n\
A 663 100 75 0 180 3 0 0 0 -1 -1\r\n\
T 200 500 5 10 0 0 0 0 1\r\n\
device=INDUCTOR\r\n\
L 738 100 750 100 3 0 0 0 -1 -1\r\n\
L 150 100 162 100 3 0 0 0 -1 -1\r\n\
A 308 100 4 180 180 3 0 0 0 -1 -1\r\n\
A 450 100 4 180 180 3 0 0 0 -1 -1\r\n\
A 592 100 4 180 180 3 0 0 0 -1 -1\r\n\
T 200 300 8 10 1 1 0 0 1\r\n\
refdes=L?\r\n\
T 200 1100 5 10 0 0 0 0 1\r\n\
description=inductor\r\n\
");


addSymbol("eo_symbols", "eo_inductor_core_big.sym", "v 20050820 1\r\n\
P 900 100 750 100 1 0 0\r\n\
{\r\n\
T 800 150 5 8 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 800 50 5 8 0 1 0 2 1\r\n\
pinseq=2\r\n\
T 700 100 9 8 0 1 0 6 1\r\n\
pinlabel=2\r\n\
T 700 100 5 8 0 1 0 8 1\r\n\
pintype=pas\r\n\
}\r\n\
P 0 100 150 100 1 0 0\r\n\
{\r\n\
T 100 150 5 8 0 1 0 6 1\r\n\
pinnumber=1\r\n\
T 100 50 5 8 0 1 0 8 1\r\n\
pinseq=1\r\n\
T 200 100 9 8 0 1 0 0 1\r\n\
pinlabel=1\r\n\
T 200 100 5 8 0 1 0 2 1\r\n\
pintype=pas\r\n\
}\r\n\
A 237 100 75 0 180 3 0 0 0 -1 -1\r\n\
A 379 100 75 0 180 3 0 0 0 -1 -1\r\n\
A 521 100 75 0 180 3 0 0 0 -1 -1\r\n\
A 663 100 75 0 180 3 0 0 0 -1 -1\r\n\
T 200 500 5 10 0 0 0 0 1\r\n\
device=INDUCTOR_CORE\r\n\
L 738 100 750 100 3 0 0 0 -1 -1\r\n\
L 150 100 162 100 3 0 0 0 -1 -1\r\n\
A 308 100 4 180 180 3 0 0 0 -1 -1\r\n\
A 450 100 4 180 180 3 0 0 0 -1 -1\r\n\
A 592 100 4 180 180 3 0 0 0 -1 -1\r\n\
L 200 320 700 320 3 0 0 0 -1 -1\r\n\
L 200 250 700 250 3 0 0 0 -1 -1\r\n\
T 200 -100 8 10 1 1 0 0 1\r\n\
refdes=L?\r\n\
T 200 1100 5 10 0 0 0 0 1\r\n\
description=inductor\r\n\
");

addSymbol("eo_symbols", "eo_inductor_core.sym", "v 20110115 2\r\n\
T 100 -175 5 10 0 1 0 0 1\r\n\
device=INDUCTOR\r\n\
T 200 -50 5 10 1 1 0 0 1\r\n\
refdes=L?\r\n\
T 200 -175 5 10 1 1 0 0 1\r\n\
value=1 uH\r\n\
L 100 200 400 200 3 0 0 0 -1 -1\r\n\
L 100 250 400 250 3 0 0 0 -1 -1\r\n\
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
pintype=in\r\n\
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
pintype=in\r\n\
T 0 100 5 10 0 1 0 0 1\r\n\
pinseq=2\r\n\
}\r\n\
");

addSymbol("eo_symbols", "eo_inductor.sym", "v 20110115 2\r\n\
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
pintype=in\r\n\
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
pintype=in\r\n\
T 0 100 5 10 0 1 0 0 1\r\n\
pinseq=2\r\n\
}\r\n\
");

addSymbol("eo_symbols", "eo_inout_port_bus.sym", "v 20110115 2\r\n\
T 200 600 5 10 0 0 0 0 1\r\n\
device=VHDL_INOUT_PORT_BUS\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
refdes=JPORT?\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
labelissignal=true\r\n\
P 0 100 200 100 1 1 0\r\n\
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
");

addSymbol("eo_symbols", "eo_inout_port.sym", "v 20110115 2\r\n\
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
");

addSymbol("eo_symbols", "eo_input_port_bus.sym", "v 20110115 2\r\n\
T 0 300 5 10 0 0 0 0 1\r\n\
device=VHDL_INPUT_PORT_BUS\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
refdes=JPORT?\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
labelissignal=true\r\n\
P 600 100 800 100 1 1 1\r\n\
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
");

addSymbol("eo_symbols", "eo_input_port.sym", "v 20110115 2\r\n\
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
");

addSymbol("eo_symbols", "eo_inv.sym", "v 20031231 1\r\n\
L 300 800 800 500 3 0 0 0 -1 -1\r\n\
T 600 900 5 10 0 0 0 0 1\r\n\
device=INV\r\n\
L 800 500 300 200 3 0 0 0 -1 -1\r\n\
L 300 800 300 500 3 0 0 0 -1 -1\r\n\
L 300 500 300 200 3 0 0 0 -1 -1\r\n\
V 850 500 50 6 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
P 300 500 0 500 1 0 1\r\n\
{\r\n\
T 200 550 5 8 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 200 450 5 8 0 1 0 8 1\r\n\
pinseq=1\r\n\
T 350 500 9 8 0 1 0 0 1\r\n\
pinlabel=A\r\n\
T 350 500 5 8 0 1 0 2 1\r\n\
pintype=in\r\n\
}\r\n\
P 1100 500 900 500 1 0 0\r\n\
{\r\n\
T 900 550 5 8 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 900 450 5 8 0 1 0 2 1\r\n\
pinseq=2\r\n\
T 750 500 9 8 0 1 0 6 1\r\n\
pinlabel=Y\r\n\
T 750 500 5 8 0 1 0 8 1\r\n\
pintype=out\r\n\
}\r\n\
T 300 900 8 10 1 1 0 0 1\r\n\
refdes=U?\r\n\
T 600 3700 5 10 0 0 0 0 1\r\n\
description=INVERTER\r\n\
");

addSymbol("eo_symbols", "eo_io_left.sym", "v 20031231 1\r\n\
P 0 100 200 100 1 0 0\r\n\
{\r\n\
T 150 150 5 10 0 1 0 6 1\r\n\
pinnumber=1\r\n\
T 250 250 9 10 1 1 0 2 1\r\n\
pinlabel=INPUT_OUTPUT\r\n\
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
T 200 600 5 10 0 0 0 0 1\r\n\
device=none\r\n\
T 200 700 5 10 0 0 0 0 1\r\n\
description=INPUT_OUTPUT LEFT port\r\n\
");

addSymbol("eo_symbols", "eo_jfet.sym", "v 20031231 1\r\n\
P 600 1000 600 800 1 0 0\r\n\
{\r\n\
T 500 850 5 6 0 1 0 0 1\r\n\
pinnumber=D\r\n\
T 500 850 5 6 0 0 0 0 1\r\n\
pinseq=1\r\n\
T 500 850 5 6 0 1 0 0 1 \r\n\
pinlabel=D\r\n\
T 500 850 5 6 0 1 0 0 1 \r\n\
pintype=pas\r\n\
}\r\n\
P 600 200 600 0 1 0 1\r\n\
{\r\n\
T 500 50 5 6 0 1 0 0 1\r\n\
pinnumber=S\r\n\
T 500 50 5 6 0 0 0 0 1\r\n\
pinseq=3\r\n\
T 500 50 5 6 0 1 0 0 1 \r\n\
pinlabel=S\r\n\
T 500 50 5 6 0 1 0 0 1 \r\n\
pintype=pas\r\n\
}\r\n\
V 500 501 316 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
T 50 0 5 10 1 1 0 0 1\r\n\
device=JFET\r\n\
L 400 700 400 300 3 0 0 0 -1 -1\r\n\
P 0 500 184 500 1 0 0\r\n\
{\r\n\
T 100 550 5 6 0 1 0 0 1\r\n\
pinnumber=G\r\n\
T 100 550 5 6 0 0 0 0 1\r\n\
pinseq=2\r\n\
T 100 550 5 6 0 1 0 0 1 \r\n\
pinlabel=G\r\n\
T 100 550 5 6 0 1 0 0 1 \r\n\
pintype=pas\r\n\
}\r\n\
L 400 500 184 500 3 0 0 0 -1 -1\r\n\
T 50 150 8 10 1 1 0 0 1\r\n\
refdes=Q?\r\n\
L 600 800 600 640 3 0 0 0 -1 -1\r\n\
L 400 640 600 640 3 0 0 0 -1 -1\r\n\
L 400 360 600 360 3 0 0 0 -1 -1\r\n\
L 600 200 600 360 3 0 0 0 -1 -1\r\n\
L 400 500 340 550 3 0 0 0 -1 -1\r\n\
L 340 450 400 500 3 0 0 0 -1 -1\r\n\
T 600 1100 8 10 0 0 0 0 1\r\n\
description=JFET transistor\r\n\
");

addSymbol("eo_symbols", "eo_jk.sym", "v 20110115 2\r\n\
T 0 -150 5 10 0 1 0 0 1\r\n\
device=JK\r\n\
T 100 200 5 10 1 1 0 0 1\r\n\
refdes=U?\r\n\
P 500 100 500 300 1 0 0\r\n\
{\r\n\
T 500 100 5 10 0 1 0 0 1\r\n\
pinnumber=5\r\n\
T 450 350 5 10 1 1 0 0 1\r\n\
pinlabel=RN\r\n\
T 500 100 5 10 0 1 0 0 1\r\n\
pintype=clk\r\n\
T 500 100 5 10 0 1 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
P 0 1100 200 1100 1 0 0\r\n\
{\r\n\
T 0 1100 5 10 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 300 1100 5 10 1 1 0 0 1\r\n\
pinlabel=J\r\n\
T 0 1100 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 1100 5 10 0 1 0 0 1\r\n\
pinseq=2\r\n\
}\r\n\
P 0 800 200 800 1 0 0\r\n\
{\r\n\
T 0 800 5 10 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 300 800 5 10 1 1 0 0 1\r\n\
pinlabel=CLK\r\n\
T 0 800 5 10 0 1 0 0 1\r\n\
pintype=clk\r\n\
T 0 800 5 10 0 1 0 0 1\r\n\
pinseq=3\r\n\
}\r\n\
P 800 1100 1000 1100 1 0 1\r\n\
{\r\n\
T 800 1100 5 10 0 1 0 0 1\r\n\
pinnumber=3\r\n\
T 700 1100 5 10 1 1 0 0 1\r\n\
pinlabel=Q\r\n\
T 800 1100 5 10 0 1 0 0 1\r\n\
pintype=out\r\n\
T 800 1100 5 10 0 1 0 0 1\r\n\
pinseq=4\r\n\
}\r\n\
L 200 900 300 800 3 3 0 0 0 0\r\n\
L 300 800 200 700 3 3 0 0 0 0\r\n\
P 800 600 1000 600 1 0 1\r\n\
{\r\n\
T 800 600 5 10 0 1 0 0 1\r\n\
pinnumber=4\r\n\
T 600 600 5 10 1 1 0 0 1\r\n\
pinlabel=QN\r\n\
T 800 600 5 10 0 1 0 0 1\r\n\
pintype=out\r\n\
T 800 600 5 10 0 1 0 0 1\r\n\
pinseq=5\r\n\
}\r\n\
P 500 1500 500 1300 1 0 0\r\n\
{\r\n\
T 500 1500 5 10 0 1 0 0 1\r\n\
pinnumber=6\r\n\
T 450 1200 5 10 1 1 0 0 1\r\n\
pinlabel=PN\r\n\
T 500 1500 5 10 0 1 0 0 1\r\n\
pintype=clk\r\n\
T 500 1500 5 10 0 1 0 0 1\r\n\
pinseq=6\r\n\
}\r\n\
P 0 500 200 500 1 0 0\r\n\
{\r\n\
T 0 500 5 10 0 1 0 0 1\r\n\
pinnumber=7\r\n\
T 300 500 5 10 1 1 0 0 1\r\n\
pinlabel=K\r\n\
T 0 500 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 500 5 10 0 1 0 0 1\r\n\
pinseq=7\r\n\
}\r\n\
B 200 300 600 999 3 3 0 0 0 0 0 0 0 0 0 0\r\n\
");

addSymbol("eo_symbols", "eo_jumper.sym", "v 20110115 2\r\n\
T 0 -150 5 10 0 1 0 0 1\r\n\
device=eo_jumper\r\n\
T 150 -50 5 10 1 1 0 0 1\r\n\
refdes=JMP?\r\n\
A 300 200 141 10 160 3 0 0 0 0 0\r\n\
P 0 200 200 200 1 0 0\r\n\
{\r\n\
T 50 100 5 10 1 1 0 0 1\r\n\
pinnumber=1\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
pinlabel=P_1\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
pintype=io\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
P 400 200 600 200 1 0 1\r\n\
{\r\n\
T 450 100 5 10 1 1 0 0 1\r\n\
pinnumber=2\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
pinlabel=P_2\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
pintype=io\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
pinseq=2\r\n\
}\r\n\
");

addSymbol("eo_symbols", "eo_led.sym", "v 20031231 1\r\n\
L 200 200 200 0 3 0 0 0 -1 -1\r\n\
L 200 200 400 100 3 0 0 0 -1 -1\r\n\
T 500 300 5 10 0 1 0 0 1\r\n\
device=LED\r\n\
L 200 0 400 100 3 0 0 0 -1 -1\r\n\
L 400 200 400 0 3 0 0 0 -1 -1\r\n\
P 0 100 200 100 1 0 0\r\n\
{\r\n\
T 50 250 5 8 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 50 250 5 8 0 0 0 0 1\r\n\
pinseq=1\r\n\
T 50 250 5 8 0 1 0 0 1 \r\n\
pinlabel=A\r\n\
T 50 250 5 8 0 1 0 0 1 \r\n\
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
T 450 250 5 8 0 1 0 0 1 \r\n\
pintype=pas\r\n\
}\r\n\
L 0 100 200 100 3 0 0 0 -1 -1\r\n\
L 400 100 600 100 3 0 0 0 -1 -1\r\n\
T 200 300 8 10 1 1 0 0 1\r\n\
refdes=DS?\r\n\
L 430 240 530 340 3 0 0 0 -1 -1\r\n\
L 530 340 480 310 3 0 0 0 -1 -1\r\n\
L 530 340 500 290 3 0 0 0 -1 -1\r\n\
L 500 240 600 340 3 0 0 0 -1 -1\r\n\
L 600 340 550 310 3 0 0 0 -1 -1\r\n\
L 600 340 570 290 3 0 0 0 -1 -1\r\n\
");

addSymbol("eo_symbols", "eo_microphone.sym", "v 20110115 2\r\n\
T 0 -150 5 10 0 1 0 0 1\r\n\
device=Microphone\r\n\
T 0 0 5 10 1 1 0 0 1\r\n\
refdes=MIC?\r\n\
P 0 400 200 400 1 0 1\r\n\
{\r\n\
T 0 450 5 10 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 0 450 5 10 0 1 0 0 1\r\n\
pinlabel=P_1\r\n\
T 0 1500 5 10 0 1 0 0 1\r\n\
pintype=out\r\n\
T 0 1500 5 10 0 1 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
P 0 200 200 200 1 0 1\r\n\
{\r\n\
T 0 2500 5 10 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 0 2500 5 10 0 1 0 0 1\r\n\
pinlabel=P_2\r\n\
T 0 700 5 10 0 1 0 0 1\r\n\
pintype=out\r\n\
T 0 700 5 10 0 1 0 0 1\r\n\
pinseq=2\r\n\
}\r\n\
A -200 300 200 270 180 3 0 0 0 -1 -1\r\n\
L -200 100 -200 500 3 0 0 0 -1 -1\r\n\
");

addSymbol("eo_symbols", "eo_microstrip_H.sym", "v 20110115 2\r\n\
T 0 -150 5 10 0 1 0 1 1\r\n\
device=Microstrip_B\r\n\
T 0 0 5 10 1 1 0 1 1\r\n\
refdes=W?\r\n\
T 300 300 5 10 1 0 0 0 1\r\n\
length=1 in\r\n\
T 300 200 5 10 1 0 0 0 1\r\n\
width=0.1 in\r\n\
T 300 400 5 10 1 0 0 0 1\r\n\
Zo=50\r\n\
B 300 0 800 100 3 2 0 0 0 0 0 0 0 0 0 0\r\n\
P 100 100 300 100 1 0 0\r\n\
{\r\n\
T 150 100 5 8 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 350 100 5 8 0 1 0 0 1\r\n\
pinlabel=P_1\r\n\
T 0 100 5 8 0 1 0 0 1\r\n\
pintype=io\r\n\
T 0 100 5 8 0 1 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
P 1100 100 1300 100 1 0 1\r\n\
{\r\n\
T 1150 100 5 8 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 826 100 5 8 0 1 0 0 1\r\n\
pinlabel=P_2\r\n\
T 0 100 5 8 0 1 0 0 1\r\n\
pintype=io\r\n\
T 0 100 5 8 0 1 0 0 1\r\n\
pinseq=2\r\n\
}\r\n\
");

addSymbol("eo_symbols", "eo_microstrip_V.sym", "v 20110115 2\r\n\
T 0 -150 5 10 0 1 0 1 1\r\n\
device=Microstrip_V\r\n\
T 0 0 5 10 1 1 0 1 1\r\n\
refdes=W?\r\n\
T 350 700 5 10 1 0 0 0 1\r\n\
length=1 in\r\n\
T 350 600 5 10 1 0 0 0 1\r\n\
width=0.1 in\r\n\
T 350 800 5 10 1 0 0 0 1\r\n\
Zo=50\r\n\
B 100 300 100 1500 3 2 0 0 0 0 0 0 0 0 0 0\r\n\
P 200 300 200 100 1 0 1\r\n\
{\r\n\
T 250 300 5 8 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T -74 300 5 8 0 1 0 0 1\r\n\
pinlabel=P_2\r\n\
T 0 300 5 8 0 1 0 0 1\r\n\
pintype=io\r\n\
T 0 300 5 8 0 1 0 0 1\r\n\
pinseq=2\r\n\
}\r\n\
P 200 2000 200 1800 1 0 0\r\n\
{\r\n\
T 250 2000 5 8 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 450 2000 5 8 0 1 0 0 1\r\n\
pinlabel=P_1\r\n\
T 0 2000 5 8 0 1 0 0 1\r\n\
pintype=io\r\n\
T 0 2000 5 8 0 1 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
");

addSymbol("eo_symbols", "eo_nmos_dual_gate.sym", "v 20110115 2\r\n\
T 0 -150 5 10 0 1 0 0 1\r\n\
device=DUAL_GATE_NMOS\r\n\
T 0 0 5 10 1 1 0 0 1\r\n\
refdes=Q?\r\n\
P 600 1000 600 800 1 0 0\r\n\
{\r\n\
T 650 800 5 6 0 1 0 0 1\r\n\
pinnumber=4\r\n\
T 500 1850 5 6 0 0 0 0 1\r\n\
pinseq=1\r\n\
T 1350 1850 5 6 0 1 0 0 1\r\n\
pinlabel=D\r\n\
T 500 1850 5 6 0 1 0 0 1\r\n\
pintype=pas\r\n\
}\r\n\
P 600 200 600 0 1 0 1\r\n\
{\r\n\
T 650 100 5 6 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 500 250 5 6 0 0 0 0 1\r\n\
pinseq=2\r\n\
T 850 250 5 6 0 1 0 0 1\r\n\
pinlabel=S\r\n\
T 500 250 5 6 0 1 0 0 1\r\n\
pintype=pas\r\n\
}\r\n\
P 0 500 184 500 1 0 0\r\n\
{\r\n\
T 50 550 5 6 0 1 0 0 1\r\n\
pinnumber=3\r\n\
T 100 1050 5 6 0 0 0 0 1\r\n\
pinseq=3\r\n\
T 50 500 5 6 0 1 0 0 1\r\n\
pinlabel=G2\r\n\
T 100 1050 5 6 0 1 0 0 1\r\n\
pintype=pas\r\n\
}\r\n\
L 400 500 184 500 3 0 0 0 -1 -1\r\n\
L 600 800 600 640 3 0 0 0 -1 -1\r\n\
L 440 700 440 580 3 0 0 0 -1 -1\r\n\
L 440 300 440 420 3 0 0 0 -1 -1\r\n\
L 440 440 440 560 3 0 0 0 -1 -1\r\n\
L 440 640 600 640 3 0 0 0 -1 -1\r\n\
L 440 360 600 360 3 0 0 0 -1 -1\r\n\
L 600 200 600 360 3 0 0 0 -1 -1\r\n\
L 600 360 600 500 3 0 0 0 -1 -1\r\n\
L 480 500 600 500 3 0 0 0 -1 -1\r\n\
V 500 500 300 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
L 400 700 400 500 3 3 0 0 0 0\r\n\
L 400 450 400 300 3 3 0 0 0 0\r\n\
L 200 300 400 300 3 3 0 0 0 0\r\n\
L 440 500 540 550 3 0 0 0 -1 -1\r\n\
L 540 450 440 500 3 0 0 0 -1 -1\r\n\
P 0 300 200 300 1 0 0\r\n\
{\r\n\
T 50 350 5 6 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 250 300 5 10 0 1 0 0 1\r\n\
pinlabel=G1\r\n\
T 0 300 5 10 0 1 0 0 1\r\n\
pintype=pas\r\n\
T 0 300 5 10 0 1 0 0 1\r\n\
pinseq=4\r\n\
}\r\n\
");

addSymbol("eo_symbols", "eo_nmos_w_diode.sym", "v 20031231 1\r\n\
P 600 1000 600 800 1 0 0\r\n\
{\r\n\
T 500 850 5 6 0 1 0 0 1\r\n\
pinnumber=3\r\n\
T 500 850 5 6 0 0 0 0 1\r\n\
pinseq=1\r\n\
T 500 850 5 6 0 1 0 0 1 \r\n\
pinlabel=D\r\n\
T 500 850 5 6 0 1 0 0 1 \r\n\
pintype=pas\r\n\
}\r\n\
P 600 200 600 0 1 0 1\r\n\
{\r\n\
T 500 50 5 6 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 500 50 5 6 0 0 0 0 1\r\n\
pinseq=3\r\n\
T 500 50 5 6 0 1 0 0 1 \r\n\
pinlabel=S\r\n\
T 500 50 5 6 0 1 0 0 1 \r\n\
pintype=pas\r\n\
}\r\n\
V 500 501 316 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
T 50 0 5 10 1 1 0 0 1\r\n\
device=NMOS\r\n\
L 400 700 400 300 3 0 0 0 -1 -1\r\n\
P 0 500 184 500 1 0 0\r\n\
{\r\n\
T 100 550 5 6 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 100 550 5 6 0 0 0 0 1\r\n\
pinseq=2\r\n\
T 100 550 5 6 0 1 0 0 1 \r\n\
pinlabel=G\r\n\
T 100 550 5 6 0 1 0 0 1 \r\n\
pintype=pas\r\n\
}\r\n\
L 400 500 184 500 3 0 0 0 -1 -1\r\n\
T 50 150 8 10 1 1 0 0 1\r\n\
refdes=Q?\r\n\
L 600 800 600 640 3 0 0 0 -1 -1\r\n\
L 440 700 440 580 3 0 0 0 -1 -1\r\n\
L 440 300 440 420 3 0 0 0 -1 -1\r\n\
L 440 440 440 560 3 0 0 0 -1 -1\r\n\
L 440 640 600 640 3 0 0 0 -1 -1\r\n\
L 440 360 600 360 3 0 0 0 -1 -1\r\n\
L 600 200 600 360 3 0 0 0 -1 -1\r\n\
L 600 360 600 500 3 0 0 0 -1 -1\r\n\
L 440 500 540 550 3 0 0 0 -1 -1\r\n\
L 540 450 440 500 3 0 0 0 -1 -1\r\n\
L 480 500 600 500 3 0 0 0 -1 -1\r\n\
L 600 700 680 700 3 0 0 0 -1 -1\r\n\
L 660 530 720 530 3 0 0 0 -1 -1\r\n\
L 680 700 690 700 3 0 0 0 -1 -1\r\n\
L 690 580 690 700 3 0 0 0 -1 -1\r\n\
L 640 510 660 530 3 0 0 0 -1 -1\r\n\
L 720 530 740 550 3 0 0 0 -1 -1\r\n\
L 660 470 690 530 3 0 0 0 -1 -1\r\n\
L 720 470 690 530 3 0 0 0 -1 -1\r\n\
L 660 470 720 470 3 0 0 0 -1 -1\r\n\
L 690 530 690 580 3 0 0 0 -1 -1\r\n\
L 600 300 690 300 3 0 0 0 -1 -1\r\n\
L 690 300 690 470 3 0 0 0 -1 -1\r\n\
V 600 700 5 3 0 0 0 -1 -1 1 -1 -1 1 -1 1\r\n\
V 600 360 5 3 0 0 0 -1 -1 1 -1 -1 1 -1 1\r\n\
V 600 300 5 3 0 0 0 -1 -1 1 -1 -1 1 -1 1\r\n\
T 600 1100 8 10 0 0 0 0 1\r\n\
description=NMOS transistor with diode\r\n\
");

addSymbol("eo_symbols", "eo_nmos.sym", "v 20031231 1\r\n\
P 600 1000 600 800 1 0 0\r\n\
{\r\n\
T 500 850 5 6 0 1 0 0 1\r\n\
pinnumber=3\r\n\
T 500 850 5 6 0 0 0 0 1\r\n\
pinseq=1\r\n\
T 500 850 5 6 0 1 0 0 1 \r\n\
pinlabel=D\r\n\
T 500 850 5 6 0 1 0 0 1 \r\n\
pintype=pas\r\n\
}\r\n\
P 600 200 600 0 1 0 1\r\n\
{\r\n\
T 500 50 5 6 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 500 50 5 6 0 0 0 0 1\r\n\
pinseq=3\r\n\
T 500 50 5 6 0 1 0 0 1 \r\n\
pinlabel=S\r\n\
T 500 50 5 6 0 1 0 0 1 \r\n\
pintype=pas\r\n\
}\r\n\
V 500 501 316 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
T 50 0 5 10 1 1 0 0 1\r\n\
device=NMOS\r\n\
L 400 700 400 300 3 0 0 0 -1 -1\r\n\
P 0 500 184 500 1 0 0\r\n\
{\r\n\
T 100 550 5 6 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 100 550 5 6 0 0 0 0 1\r\n\
pinseq=2\r\n\
T 100 550 5 6 0 1 0 0 1 \r\n\
pinlabel=G\r\n\
T 100 550 5 6 0 1 0 0 1 \r\n\
pintype=pas\r\n\
}\r\n\
L 400 500 184 500 3 0 0 0 -1 -1\r\n\
T 50 150 8 10 1 1 0 0 1\r\n\
refdes=Q?\r\n\
L 600 800 600 640 3 0 0 0 -1 -1\r\n\
L 440 700 440 580 3 0 0 0 -1 -1\r\n\
L 440 300 440 420 3 0 0 0 -1 -1\r\n\
L 440 440 440 560 3 0 0 0 -1 -1\r\n\
L 440 640 600 640 3 0 0 0 -1 -1\r\n\
L 440 360 600 360 3 0 0 0 -1 -1\r\n\
L 600 200 600 360 3 0 0 0 -1 -1\r\n\
L 600 360 600 500 3 0 0 0 -1 -1\r\n\
L 440 500 540 550 3 0 0 0 -1 -1\r\n\
L 540 450 440 500 3 0 0 0 -1 -1\r\n\
L 480 500 600 500 3 0 0 0 -1 -1\r\n\
V 600 700 5 3 0 0 0 -1 -1 1 -1 -1 1 -1 1\r\n\
V 600 360 5 3 0 0 0 -1 -1 1 -1 -1 1 -1 1\r\n\
V 600 300 5 3 0 0 0 -1 -1 1 -1 -1 1 -1 1\r\n\
T 600 1100 8 10 0 0 0 0 1\r\n\
description=NMOS transistor\r\n\
");

addSymbol("eo_symbols", "eo_npn_darlington.sym", "v 20110115 2\r\n\
T -200 -150 5 10 1 1 0 0 1\r\n\
device=NPN_DARLINGTON\r\n\
T 0 0 5 10 1 1 0 0 1\r\n\
refdes=Q?\r\n\
P 900 1300 900 700 1 0 0\r\n\
{\r\n\
T 1000 1200 5 6 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 500 1850 5 6 0 0 0 0 1\r\n\
pinseq=1\r\n\
T 1650 1850 5 6 0 1 0 0 1\r\n\
pinlabel=C\r\n\
T 500 1850 5 6 0 1 0 0 1\r\n\
pintype=pas\r\n\
}\r\n\
P 900 300 900 0 1 0 1\r\n\
{\r\n\
T 1000 100 5 6 0 1 0 0 1\r\n\
pinnumber=3\r\n\
T 500 350 5 6 0 0 0 0 1\r\n\
pinseq=2\r\n\
T 1150 350 5 6 0 1 0 0 1\r\n\
pinlabel=E\r\n\
T 500 350 5 6 0 1 0 0 1\r\n\
pintype=pas\r\n\
}\r\n\
L 900 300 700 400 3 0 0 0 -1 -1\r\n\
L 900 700 700 600 3 0 0 0 -1 -1\r\n\
L 700 700 700 300 3 0 0 0 -1 -1\r\n\
L 700 500 500 500 3 0 0 0 -1 -1\r\n\
L 900 300 800 300 3 0 0 0 -1 -1\r\n\
L 900 300 800 400 3 0 0 0 -1 -1\r\n\
L 600 500 400 600 3 0 0 0 -1 -1\r\n\
L 600 900 400 800 3 0 0 0 -1 -1\r\n\
L 400 900 400 500 3 0 0 0 -1 -1\r\n\
P 0 700 184 700 1 0 0\r\n\
{\r\n\
T 100 600 5 6 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 100 1250 5 6 0 0 0 0 1\r\n\
pinseq=3\r\n\
T 350 1250 5 6 0 1 0 0 1\r\n\
pinlabel=B\r\n\
T 100 1250 5 6 0 1 0 0 1\r\n\
pintype=pas\r\n\
}\r\n\
L 400 700 184 700 3 0 0 0 -1 -1\r\n\
L 600 500 500 500 3 0 0 0 -1 -1\r\n\
L 600 500 500 600 3 0 0 0 -1 -1\r\n\
L 600 900 600 1000 3 3 0 0 0 0\r\n\
L 600 1000 900 1000 3 3 0 0 0 0\r\n\
V 700 700 500 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
");

addSymbol("eo_symbols", "eo_npn.sym", "v 20110115 2\r\n\
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
");

addSymbol("eo_symbols", "eo_offsheetin.sym", "v 20110115 2\r\n\
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
");

addSymbol("eo_symbols", "eo_offsheetinb.sym", "v 20110115 2\r\n\
T 0 -150 5 10 0 1 0 0 1\r\n\
device=offsheetoutb\r\n\
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
");

addSymbol("eo_symbols", "eo_offsheetout.sym", "v 20110115 2\r\n\
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
");

addSymbol("eo_symbols", "eo_offsheetoutb.sym", "v 20110115 2\r\n\
T 0 -150 5 10 0 1 0 0 1\r\n\
device=offsheetinb\r\n\
P 0 0 300 0 1 0 1\r\n\
{\r\n\
T 250 200 5 10 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T -250 0 5 10 1 1 0 6 1\r\n\
pinlabel=\r\n\
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
");

addSymbol("eo_symbols", "eo_opamp_1.sym", "v 20050820 1\r\n\
L 200 800 200 0 3 0 0 0 -1 -1\r\n\
L 200 0 800 400 3 0 0 0 -1 -1\r\n\
T 800 150 5 10 0 0 0 0 1\r\n\
device=OPAMP\r\n\
L 800 400 200 800 3 0 0 0 -1 -1\r\n\
P 200 600 0 600 1 0 1\r\n\
{\r\n\
T 150 650 5 8 0 1 0 6 1\r\n\
pinnumber=3\r\n\
T 150 550 5 8 0 1 0 8 1\r\n\
pinseq=2\r\n\
T 250 600 9 8 0 1 0 0 1\r\n\
pinlabel=INP\r\n\
T 250 600 5 8 0 1 0 2 1\r\n\
pintype=in\r\n\
}\r\n\
P 200 200 0 200 1 0 1\r\n\
{\r\n\
T 150 250 5 8 0 1 0 6 1\r\n\
pinnumber=2\r\n\
T 150 150 5 8 0 1 0 8 1\r\n\
pinseq=3\r\n\
T 250 200 9 8 0 1 0 0 1\r\n\
pinlabel=INN\r\n\
T 250 200 5 8 0 1 0 2 1\r\n\
pintype=in\r\n\
}\r\n\
P 800 400 1000 400 1 0 1\r\n\
{\r\n\
T 850 450 5 8 0 1 0 0 1\r\n\
pinnumber=6\r\n\
T 850 350 5 8 0 1 0 2 1\r\n\
pinseq=6\r\n\
T 800 400 9 8 0 1 0 6 1\r\n\
pinlabel=AOUT\r\n\
T 800 400 5 8 0 1 0 8 1\r\n\
pintype=out\r\n\
}\r\n\
L 300 650 300 550 3 0 0 0 -1 -1\r\n\
L 250 600 350 600 3 0 0 0 -1 -1\r\n\
L 250 200 350 200 3 0 0 0 -1 -1\r\n\
T 700 100 8 10 1 1 0 0 1\r\n\
refdes=U?\r\n\
T 800 800 5 10 0 0 0 0 1\r\n\
description=single opamp\r\n\
");

addSymbol("eo_symbols", "eo_opamp_pg.sym", "v 20050820 1\r\n\
L 200 800 200 0 3 0 0 0 -1 -1\r\n\
L 200 0 800 400 3 0 0 0 -1 -1\r\n\
T 1050 150 5 10 0 0 0 0 1\r\n\
device=OPAMP\r\n\
L 800 400 200 800 3 0 0 0 -1 -1\r\n\
P 200 600 0 600 1 0 1\r\n\
{\r\n\
T 150 650 5 8 1 1 0 6 1\r\n\
pinnumber=3\r\n\
T 150 550 5 8 0 1 0 8 1\r\n\
pinseq=2\r\n\
T 250 600 9 8 0 1 0 0 1\r\n\
pinlabel=INP\r\n\
T 250 600 5 8 0 1 0 2 1\r\n\
pintype=in\r\n\
}\r\n\
P 200 200 0 200 1 0 1\r\n\
{\r\n\
T 150 250 5 8 1 1 0 6 1\r\n\
pinnumber=2\r\n\
T 150 150 5 8 0 1 0 8 1\r\n\
pinseq=3\r\n\
T 250 200 9 8 0 1 0 0 1\r\n\
pinlabel=INN\r\n\
T 250 200 5 8 0 1 0 2 1\r\n\
pintype=in\r\n\
}\r\n\
P 800 400 1000 400 1 0 1\r\n\
{\r\n\
T 850 450 5 8 1 1 0 0 1\r\n\
pinnumber=6\r\n\
T 850 350 5 8 0 1 0 2 1\r\n\
pinseq=6\r\n\
T 800 400 9 8 0 1 0 6 1\r\n\
pinlabel=VOUT\r\n\
T 800 400 5 8 0 1 0 8 1\r\n\
pintype=out\r\n\
}\r\n\
P 500 600 500 800 1 0 1\r\n\
{\r\n\
T 550 600 5 8 1 1 0 0 1\r\n\
pinnumber=7\r\n\
T 550 600 5 8 0 1 0 2 1\r\n\
pinseq=7\r\n\
T 500 600 9 8 0 1 0 5 1\r\n\
pinlabel=VP\r\n\
T 500 550 5 8 0 1 0 5 1\r\n\
pintype=pwr\r\n\
}\r\n\
P 500 200 500 0 1 0 1\r\n\
{\r\n\
T 550 100 5 8 1 1 0 0 1\r\n\
pinnumber=4\r\n\
T 550 100 5 8 0 1 0 2 1\r\n\
pinseq=4\r\n\
T 500 200 9 8 0 1 0 3 1\r\n\
pinlabel=VN\r\n\
T 500 300 5 8 0 1 0 3 1\r\n\
pintype=pwr\r\n\
}\r\n\
L 300 650 300 550 3 0 0 0 -1 -1\r\n\
L 250 600 350 600 3 0 0 0 -1 -1\r\n\
L 250 200 350 200 3 0 0 0 -1 -1\r\n\
T 700 100 8 10 1 1 0 0 1\r\n\
refdes=U?\r\n\
T 1050 950 5 10 0 0 0 0 1\r\n\
description=single opamp\r\n\
T 1050 1150 5 10 0 0 0 0 1\r\n\
comment=NC-PINS:1,5,8\r\n\
");

addSymbol("eo_symbols", "eo_output_port_bus.sym", "v 20110115 2\r\n\
T 100 300 5 10 0 0 0 0 1\r\n\
device=VHDL_OUTPUT_PORT_BUS\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
refdes=JPORT?\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
labelissignal=true\r\n\
P 0 100 200 100 1 1 0\r\n\
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
");

addSymbol("eo_symbols", "eo_output_port.sym", "v 20110115 2\r\n\
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
");

addSymbol("eo_symbols", "eo_pb_switch_no.sym", "v 20110115 2\r\n\
T 400 600 8 10 0 0 0 0 1\r\n\
device=PUSHBUTTON_SWITCH_NO\r\n\
T 200 300 8 10 1 1 0 0 1\r\n\
refdes=S?\r\n\
P 0 0 200 0 1 0 0\r\n\
{\r\n\
T 100 50 5 8 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 50 50 5 8 0 1 0 0 1\r\n\
pinlabel=P_1\r\n\
T 50 50 5 8 0 1 0 0 1\r\n\
pintype=pas\r\n\
T 50 50 5 8 0 0 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
P 400 0 600 0 1 0 1\r\n\
{\r\n\
T 500 50 5 8 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 500 50 5 8 0 1 0 0 1\r\n\
pinlabel=P_2\r\n\
T 500 50 5 8 0 1 0 0 1\r\n\
pintype=pas\r\n\
T 500 50 5 8 0 0 0 0 1\r\n\
pinseq=2\r\n\
}\r\n\
L 170 85 430 85 3 0 0 0 -1 -1\r\n\
V 200 0 14 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
V 400 0 14 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
L 300 100 300 200 3 0 0 0 -1 -1\r\n\
");

addSymbol("eo_symbols", "eo_pmos_w_diode.sym", "v 20031231 1\r\n\
P 600 1000 600 800 1 0 0\r\n\
{\r\n\
T 500 850 5 6 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 500 850 5 6 0 0 0 0 1\r\n\
pinseq=1\r\n\
T 500 850 5 6 0 1 0 0 1\r\n\
pinlabel=D\r\n\
T 500 850 5 6 0 1 0 0 1 \r\n\
pintype=pas\r\n\
}\r\n\
P 600 200 600 0 1 0 1\r\n\
{\r\n\
T 500 50 5 6 0 1 0 0 1\r\n\
pinnumber=3\r\n\
T 500 50 5 6 0 0 0 0 1\r\n\
pinseq=3\r\n\
T 500 50 5 6 0 1 0 0 1 \r\n\
pinlabel=S\r\n\
T 500 50 5 6 0 1 0 0 1 \r\n\
pintype=pas\r\n\
}\r\n\
V 500 501 316 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
T 50 0 5 10 1 1 0 0 1\r\n\
device=PMOS\r\n\
L 400 700 400 300 3 0 0 0 -1 -1\r\n\
P 0 500 184 500 1 0 0\r\n\
{\r\n\
T 100 550 5 6 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 100 550 5 6 0 0 0 0 1\r\n\
pinseq=2\r\n\
T 100 550 5 6 0 1 0 0 1 \r\n\
pinlabel=G\r\n\
T 100 550 5 6 0 1 0 0 1 \r\n\
pintype=pas\r\n\
}\r\n\
L 400 500 184 500 3 0 0 0 -1 -1\r\n\
T 50 150 8 10 1 1 0 0 1\r\n\
refdes=Q?\r\n\
L 600 800 600 640 3 0 0 0 -1 -1\r\n\
L 440 700 440 580 3 0 0 0 -1 -1\r\n\
L 440 300 440 420 3 0 0 0 -1 -1\r\n\
L 440 440 440 560 3 0 0 0 -1 -1\r\n\
L 440 640 600 640 3 0 0 0 -1 -1\r\n\
L 440 360 600 360 3 0 0 0 -1 -1\r\n\
L 600 200 600 360 3 0 0 0 -1 -1\r\n\
L 600 360 600 500 3 0 0 0 -1 -1\r\n\
L 600 500 500 550 3 0 0 0 -1 -1\r\n\
L 500 450 600 500 3 0 0 0 -1 -1\r\n\
L 440 500 600 500 3 0 0 0 -1 -1\r\n\
L 600 700 680 700 3 0 0 0 -1 -1\r\n\
L 600 300 690 300 3 0 0 0 -1 -1\r\n\
L 690 530 690 700 3 0 0 0 -1 -1\r\n\
L 680 700 690 700 3 0 0 0 -1 -1\r\n\
L 690 300 690 470 3 0 0 0 -1 -1\r\n\
L 660 530 720 530 3 0 0 0 -1 -1\r\n\
L 660 530 690 470 3 0 0 0 -1 -1\r\n\
L 720 530 690 470 3 0 0 0 -1 -1\r\n\
L 720 470 740 490 3 0 0 0 -1 -1\r\n\
L 660 470 640 450 3 0 0 0 -1 -1\r\n\
L 660 470 720 470 3 0 0 0 -1 -1\r\n\
V 600 700 5 3 0 0 0 -1 -1 1 -1 -1 1 -1 1\r\n\
V 600 360 5 3 0 0 0 -1 -1 1 -1 -1 1 -1 1\r\n\
V 600 300 5 3 0 0 0 -1 -1 1 -1 -1 1 -1 1\r\n\
T 600 1100 8 10 0 0 0 0 1\r\n\
description=PMOS transistor with diode\r\n\
");

addSymbol("eo_symbols", "eo_pmos.sym", "v 20031231 1\r\n\
P 600 1000 600 800 1 0 0\r\n\
{\r\n\
T 500 850 5 6 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 500 850 5 6 0 0 0 0 1\r\n\
pinseq=1\r\n\
T 500 850 5 6 0 1 0 0 1 \r\n\
pinlabel=D\r\n\
T 500 850 5 6 0 1 0 0 1 \r\n\
pintype=pas\r\n\
}\r\n\
P 600 200 600 0 1 0 1\r\n\
{\r\n\
T 500 50 5 6 0 1 0 0 1\r\n\
pinnumber=3\r\n\
T 500 50 5 6 0 0 0 0 1\r\n\
pinseq=3\r\n\
T 500 50 5 6 0 1 0 0 1 \r\n\
pinlabel=S\r\n\
T 500 50 5 6 0 1 0 0 1 \r\n\
pintype=pas\r\n\
}\r\n\
V 500 501 316 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
T 50 0 5 10 1 1 0 0 1\r\n\
device=PMOS\r\n\
L 400 700 400 300 3 0 0 0 -1 -1\r\n\
P 0 500 184 500 1 0 0\r\n\
{\r\n\
T 100 550 5 6 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 100 550 5 6 0 0 0 0 1\r\n\
pinseq=2\r\n\
T 100 550 5 6 0 1 0 0 1 \r\n\
pinlabel=G\r\n\
T 100 550 5 6 0 1 0 0 1 \r\n\
pintype=pas\r\n\
}\r\n\
L 400 500 184 500 3 0 0 0 -1 -1\r\n\
T 50 150 8 10 1 1 0 0 1\r\n\
refdes=Q?\r\n\
L 600 800 600 640 3 0 0 0 -1 -1\r\n\
L 440 700 440 580 3 0 0 0 -1 -1\r\n\
L 440 300 440 420 3 0 0 0 -1 -1\r\n\
L 440 440 440 560 3 0 0 0 -1 -1\r\n\
L 440 640 600 640 3 0 0 0 -1 -1\r\n\
L 440 360 600 360 3 0 0 0 -1 -1\r\n\
L 600 200 600 360 3 0 0 0 -1 -1\r\n\
L 600 360 600 500 3 0 0 0 -1 -1\r\n\
L 600 500 500 550 3 0 0 0 -1 -1\r\n\
L 500 450 600 500 3 0 0 0 -1 -1\r\n\
L 440 500 600 500 3 0 0 0 -1 -1\r\n\
V 600 700 5 3 0 0 0 -1 -1 1 -1 -1 1 -1 1\r\n\
V 600 360 5 3 0 0 0 -1 -1 1 -1 -1 1 -1 1\r\n\
V 600 300 5 3 0 0 0 -1 -1 1 -1 -1 1 -1 1\r\n\
T 600 1100 8 10 0 0 0 0 1\r\n\
description=PMOS transistor with diode\r\n\
");

addSymbol("eo_symbols", "eo_pnp.sym", "v 20110115 2\r\n\
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
");

addSymbol("eo_symbols", "eo_pot.sym", "v 20080706 1\r\n\
L 600 300 500 100 3 0 0 0 -1 -1\r\n\
L 500 100 400 300 3 0 0 0 -1 -1\r\n\
L 400 300 300 100 3 0 0 0 -1 -1\r\n\
L 300 100 200 300 3 0 0 0 -1 -1\r\n\
T 300 400 5 10 0 0 0 0 1\r\n\
spicetype=R\r\n\
L 600 300 700 100 3 0 0 0 -1 -1\r\n\
L 700 100 750 200 3 0 0 0 -1 -1\r\n\
L 500 200 500 450 3 0 0 0 -1 -1\r\n\
L 500 200 448 301 3 0 0 0 -1 -1\r\n\
L 501 201 553 302 3 0 0 0 -1 -1\r\n\
P 500 450 500 600 1 0 1\r\n\
{\r\n\
T 400 500 5 8 0 1 0 0 1\r\n\
pinnumber=3\r\n\
T 400 500 5 8 0 0 0 0 1\r\n\
pinseq=3\r\n\
T 500 450 5 10 0 1 0 0 1\r\n\
pintype=pas\r\n\
T 500 450 5 10 0 1 0 0 1\r\n\
pinlabel=wiper\r\n\
}\r\n\
P 900 200 750 200 1 0 0\r\n\
{\r\n\
T 800 250 5 8 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 800 250 5 8 0 1 0 0 1\r\n\
pinlabel=n2\r\n\
T 800 250 5 8 0 0 0 0 1\r\n\
pinseq=2\r\n\
T 800 250 5 8 0 0 0 0 1\r\n\
pintype=pas\r\n\
}\r\n\
P 0 200 152 200 1 0 0\r\n\
{\r\n\
T 100 250 5 8 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 100 250 5 8 0 1 0 0 1\r\n\
pinlabel=n1\r\n\
T 100 250 5 8 0 0 0 0 1\r\n\
pinseq=1\r\n\
T 100 250 5 8 0 0 0 0 1\r\n\
pintype=pas\r\n\
}\r\n\
L 201 300 150 200 3 0 0 0 -1 -1\r\n\
T 300 400 8 10 1 1 0 3 1\r\n\
refdes=R?\r\n\
T 300 400 8 10 0 1 0 3 1\r\n\
device=POTENTIOMETER\r\n\
T 800 400 8 10 1 1 0 3 1\r\n\
value=1K\r\n\
");

addSymbol("eo_symbols", "eo_power_3R3V.sym", "v 20031231 1\r\n\
P 200 0 200 200 1 0 0\r\n\
{\r\n\
T 250 50 5 6 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 250 50 5 6 0 0 0 0 1\r\n\
pinseq=1\r\n\
T 75 250 9 8 0 1 0 0 1 \r\n\
pinlabel=P3R3V\r\n\
T 250 50 5 6 0 1 0 0 1 \r\n\
pintype=pwr\r\n\
}\r\n\
L 50 200 350 200 3 0 0 0 -1 -1\r\n\
T 75 250 9 8 0 1 0 0 1\r\n\
net=P3R3V:1\r\n\
T 75 250 9 8 1 1 0 0 1\r\n\
name=P3R3V\r\n\
");

addSymbol("eo_symbols", "eo_power_5V.sym", "v 20031231 1\r\n\
P 200 0 200 200 1 0 0\r\n\
{\r\n\
T 250 50 5 6 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 250 50 5 6 0 0 0 0 1\r\n\
pinseq=1\r\n\
T 250 50 5 6 0 1 0 0 1 \r\n\
pinlabel=P5V\r\n\
T 250 50 5 6 0 1 0 0 1 \r\n\
pintype=pwr\r\n\
}\r\n\
L 50 200 350 200 3 0 0 0 -1 -1\r\n\
T 75 250 9 8 0 1 0 0 1\r\n\
net=P5V:1\r\n\
T 75 250 9 8 1 1 0 0 1\r\n\
name=P5V\r\n\
");

addSymbol("eo_symbols", "eo_power_generic.sym", "v 20031231 1\r\n\
P 200 0 200 200 1 0 0\r\n\
{\r\n\
T 250 50 5 6 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 250 50 5 6 0 0 0 0 1\r\n\
pinseq=1\r\n\
T 250 50 5 6 0 1 0 0 1 \r\n\
pinlabel=PWR\r\n\
T 250 50 5 6 0 1 0 0 1 \r\n\
pintype=pwr\r\n\
}\r\n\
L 50 200 350 200 3 0 0 0 -1 -1\r\n\
T 300 0 8 8 0 0 0 0 1\r\n\
net=PWR:1\r\n\
T 75 250 9 8 1 1 0 0 1\r\n\
name=PWR\r\n\
");

addSymbol("eo_symbols", "eo_relay_coil.sym", "v 20110115 2\r\n\
T 0 -150 5 10 1 1 0 0 1\r\n\
device=Relay\r\n\
T 0 0 5 10 1 1 0 0 1\r\n\
refdes=K?a\r\n\
P 0 400 350 400 1 0 0\r\n\
{\r\n\
T 50 400 5 10 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 250 400 5 10 0 1 0 0 1\r\n\
pinlabel=P_1\r\n\
T 0 400 5 10 0 1 0 0 1\r\n\
pintype=io\r\n\
T 0 400 5 10 0 1 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
P 0 200 350 200 1 0 0\r\n\
{\r\n\
T 50 200 5 10 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 250 200 5 10 0 1 0 0 1\r\n\
pinlabel=P_2\r\n\
T 0 200 5 10 0 1 0 0 1\r\n\
pintype=io\r\n\
T 0 200 5 10 0 1 0 0 1\r\n\
pinseq=2\r\n\
}\r\n\
B 350 100 100 399 3 3 0 0 0 0 0 0 0 0 0 0\r\n\
");

addSymbol("eo_symbols", "eo_relay_contacts.sym", "v 20110115 2\r\n\
T 0 -150 5 10 0 1 0 0 1\r\n\
device=Relay\r\n\
T 0 0 5 10 1 1 0 0 1\r\n\
refdes=K?b\r\n\
V 275 200 25 3 0 0 0 -1 -1 0 0 -1 -1 -1 -1\r\n\
P 0 200 250 200 1 0 0\r\n\
{\r\n\
T 100 50 3 6 0 1 0 0 1\r\n\
pinnumber=3\r\n\
T 100 50 3 6 0 0 0 0 1\r\n\
pinseq=1\r\n\
T 100 50 3 6 0 1 0 0 1\r\n\
pinlabel=COM1\r\n\
T 100 50 3 6 0 1 0 0 1\r\n\
pintype=pas\r\n\
}\r\n\
P 450 300 800 300 1 0 1\r\n\
{\r\n\
T 400 350 3 6 0 1 0 0 1\r\n\
pinnumber=4\r\n\
T 400 350 3 6 0 0 0 0 1\r\n\
pinseq=2\r\n\
T 400 350 3 6 0 1 0 0 1\r\n\
pinlabel=NC1\r\n\
T 400 350 3 6 0 1 0 0 1\r\n\
pintype=pas\r\n\
}\r\n\
P 450 100 800 100 1 0 1\r\n\
{\r\n\
T 400 150 3 6 0 1 0 0 1\r\n\
pinnumber=5\r\n\
T 400 150 3 6 0 0 0 0 1\r\n\
pinseq=3\r\n\
T 400 150 3 6 0 1 0 0 1\r\n\
pinlabel=NO1\r\n\
T 400 150 3 6 0 1 0 0 1\r\n\
pintype=pas\r\n\
}\r\n\
L 300 200 500 250 3 0 0 0 -1 -1\r\n\
L 450 100 500 150 3 0 0 0 -1 -1\r\n\
L 550 100 500 150 3 0 0 0 -1 -1\r\n\
L 450 300 500 250 3 0 0 0 -1 -1\r\n\
L 550 300 500 250 3 0 0 0 -1 -1\r\n\
");

addSymbol("eo_symbols", "eo_resistor_big.sym", "v 20080706 1\r\n\
L 600 300 500 100 3 0 0 0 -1 -1\r\n\
L 500 100 400 300 3 0 0 0 -1 -1\r\n\
L 400 300 300 100 3 0 0 0 -1 -1\r\n\
L 300 100 200 300 3 0 0 0 -1 -1\r\n\
T 300 400 5 10 0 0 0 0 1\r\n\
spicetype=R\r\n\
L 600 300 700 100 3 0 0 0 -1 -1\r\n\
L 700 100 750 200 3 0 0 0 -1 -1\r\n\
P 900 200 750 200 1 0 0\r\n\
{\r\n\
T 800 250 5 8 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 800 250 5 8 0 1 0 0 1\r\n\
pinlabel=n2\r\n\
T 800 250 5 8 0 0 0 0 1\r\n\
pinseq=2\r\n\
T 800 250 5 8 0 0 0 0 1\r\n\
pintype=pas\r\n\
}\r\n\
P 0 200 150 200 1 0 0\r\n\
{\r\n\
T 100 250 5 8 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 100 250 5 8 0 1 0 0 1\r\n\
pinlabel=n1\r\n\
T 100 250 5 8 0 0 0 0 1\r\n\
pinseq=1\r\n\
T 100 250 5 8 0 0 0 0 1\r\n\
pintype=pas\r\n\
}\r\n\
L 201 300 150 200 3 0 0 0 -1 -1\r\n\
T 0 0 8 10 1 1 0 3 1\r\n\
refdes=R?\r\n\
T 0 -150 8 10 1 1 0 3 1\r\n\
value=1K\r\n\
T 600 400 8 10 0 1 0 3 1\r\n\
device=RESISTOR\r\n\
");

addSymbol("eo_symbols", "eo_resistor.sym", "v 20110115 2\r\n\
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
");

addSymbol("eo_symbols", "eo_schottkydiode.sym", "v 20031231 1\r\n\
L 200 200 200 0 3 0 0 0 -1 -1\r\n\
L 200 200 400 100 3 0 0 0 -1 -1\r\n\
T 500 300 5 10 1 1 0 0 1\r\n\
device=DIODE\r\n\
L 200 0 400 100 3 0 0 0 -1 -1\r\n\
L 400 200 400 0 3 0 0 0 -1 -1\r\n\
P 0 100 200 100 1 0 0\r\n\
{\r\n\
T 50 250 5 8 0 1 0 0 1\r\n\
pinnumber=A\r\n\
T 50 250 5 8 0 0 0 0 1\r\n\
pinseq=1\r\n\
T 50 250 5 8 0 1 0 0 1 \r\n\
pinlabel=A\r\n\
T 50 250 5 8 0 1 0 0 1 \r\n\
pintype=pas\r\n\
}\r\n\
P 400 100 600 100 1 0 1\r\n\
{\r\n\
T 450 250 5 8 0 1 0 0 1\r\n\
pinnumber=K\r\n\
T 450 250 5 8 0 0 0 0 1\r\n\
pinseq=2\r\n\
T 450 250 5 8 0 1 0 0 1 \r\n\
pinlabel=K\r\n\
T 450 250 5 8 0 1 0 0 1 \r\n\
pintype=pas\r\n\
}\r\n\
L 0 100 200 100 3 0 0 0 -1 -1\r\n\
L 400 100 600 100 3 0 0 0 -1 -1\r\n\
A 450 200 50 90 90 3 0 0 0 -1 -1\r\n\
A 350 0 50 270 90 3 0 0 0 -1 -1\r\n\
T 200 300 8 10 1 1 0 0 1\r\n\
refdes=D?\r\n\
");

addSymbol("eo_symbols", "eo_spdt.sym", "v 20110115 2\r\n\
T 410 850 8 10 0 0 0 0 1\r\n\
device=SPDT\r\n\
T 410 700 8 10 1 1 0 0 1\r\n\
refdes=S?\r\n\
P 300 300 0 300 1 0 1\r\n\
{\r\n\
T 300 300 5 10 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 160 350 5 10 0 1 0 0 1\r\n\
pinlabel=C\r\n\
T 160 350 5 10 0 1 0 0 1\r\n\
pintype=pas\r\n\
T 160 350 5 10 0 0 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
P 700 500 1000 500 1 0 1\r\n\
{\r\n\
T 710 500 5 10 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 710 500 5 10 0 1 0 0 1\r\n\
pinlabel=P_2\r\n\
T 710 500 5 10 0 1 0 0 1\r\n\
pintype=pas\r\n\
T 860 550 5 10 0 0 0 0 1\r\n\
pinseq=2\r\n\
}\r\n\
P 700 100 1000 100 1 0 1\r\n\
{\r\n\
T 710 100 5 10 0 1 0 0 1\r\n\
pinnumber=3\r\n\
T 710 100 5 10 0 1 0 0 1\r\n\
pinlabel=P_3\r\n\
T 710 100 5 10 0 1 0 0 1\r\n\
pintype=pas\r\n\
T 860 150 5 10 0 0 0 0 1\r\n\
pinseq=3\r\n\
}\r\n\
L 300 300 660 450 3 0 0 0 -1 -1\r\n\
V 660 500 50 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
V 660 100 50 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
");

addSymbol("eo_symbols", "eo_speaker.sym", "v 20110115 2\r\n\
T 0 -150 5 10 0 1 0 0 1\r\n\
device=Speaker\r\n\
T 0 -50 5 10 1 1 0 0 1\r\n\
refdes=SP?\r\n\
P 0 400 200 400 1 0 0\r\n\
{\r\n\
T 50 400 5 10 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 250 400 5 10 0 1 0 0 1\r\n\
pinlabel=P_1\r\n\
T 0 400 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 400 5 10 0 1 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
P 0 200 200 200 1 0 0\r\n\
{\r\n\
T 50 200 5 10 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 250 200 5 10 0 1 0 0 1\r\n\
pinlabel=P_2\r\n\
T 0 200 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 200 5 10 0 1 0 0 1\r\n\
pinseq=2\r\n\
}\r\n\
B 200 100 200 400 3 3 0 0 0 0 0 0 0 0 0 0\r\n\
L 400 500 500 600 3 3 0 0 0 0\r\n\
L 500 0 400 100 3 3 0 0 0 0\r\n\
L 500 0 500 600 3 3 0 0 0 0\r\n\
");

addSymbol("eo_symbols", "eo_spst.sym", "v 20110115 2\r\n\
T 410 850 8 10 0 0 0 0 1\r\n\
device=SPST\r\n\
T 410 300 8 10 1 1 0 0 1\r\n\
refdes=S?\r\n\
P 300 100 0 100 1 0 1\r\n\
{\r\n\
T 300 300 5 10 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 160 350 5 10 0 1 0 0 1\r\n\
pinlabel=P_1\r\n\
T 160 350 5 10 0 1 0 0 1\r\n\
pintype=pas\r\n\
T 160 350 5 10 0 0 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
P 700 100 1000 100 1 0 1\r\n\
{\r\n\
T 710 100 5 10 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 710 100 5 10 0 1 0 0 1\r\n\
pinlabel=P_2\r\n\
T 710 100 5 10 0 1 0 0 1\r\n\
pintype=pas\r\n\
T 860 150 5 10 0 0 0 0 1\r\n\
pinseq=2\r\n\
}\r\n\
L 300 100 660 250 3 0 0 0 -1 -1\r\n\
V 660 100 50 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
");

addSymbol("eo_symbols", "eo_testpoint.sym", "v 20110115 2\r\n\
T 0 -150 5 10 0 1 0 0 1\r\n\
device=TestPoint\r\n\
T 0 0 5 10 1 1 0 0 1\r\n\
refdes=TP?\r\n\
V 0 200 60 3 0 0 0 0 0 0 0 0 0 0 0\r\n\
P 0 200 0 200 1 0 0\r\n\
{\r\n\
T 100 800 5 10 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 500 800 5 10 0 1 0 0 1\r\n\
pinlabel=P_1\r\n\
T 0 800 5 10 0 1 0 0 1\r\n\
pintype=io\r\n\
T 0 800 5 10 0 1 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
");

addSymbol("eo_connectors", "eo_trs_connector.sym", "v 20110115 2\r\n\
T 0 -150 5 10 0 1 0 0 1\r\n\
device=CONNECTOR_TRS\r\n\
T 0 0 5 10 1 1 0 0 1\r\n\
refdes=J?\r\n\
L 100 600 200 500 3 3 0 0 0 0\r\n\
L 200 500 300 600 3 3 0 0 0 0\r\n\
L 300 600 600 600 3 3 0 0 0 0\r\n\
L 200 400 300 500 3 3 0 0 0 0\r\n\
L 300 500 400 400 3 3 0 0 0 0\r\n\
L 400 400 600 400 3 3 0 0 0 0\r\n\
P 400 600 600 600 1 0 1\r\n\
{\r\n\
T 440 650 5 8 0 1 0 0 1\r\n\
pinnumber=3\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
pinlabel=RING\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
pintype=pas\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
P 450 400 600 400 1 0 1\r\n\
{\r\n\
T 450 450 5 8 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
pinlabel=TIP\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
pintype=pas\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
pinseq=2\r\n\
}\r\n\
P 400 200 600 200 1 0 1\r\n\
{\r\n\
T 450 250 5 8 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
pinlabel=SHIELD\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
pintype=pas\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
pinseq=3\r\n\
}\r\n\
B 60 200 80 200 3 3 0 0 0 0 0 0 0 0 0 0\r\n\
L 100 200 500 200 3 3 0 0 0 0\r\n\
");

addSymbol("eo_symbols", "eo_two_pin.sym", "v 20110115 2\r\n\
T 0 -150 5 10 0 1 0 0 1\r\n\
device=GENERIC_TWO_PIN\r\n\
T 100 0 5 10 1 1 0 0 1\r\n\
refdes=J?\r\n\
B 200 140 300 120 3 3 0 0 0 0 0 0 0 0 0 0\r\n\
P 0 200 200 200 1 0 0\r\n\
{\r\n\
T 50 200 5 10 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 250 200 5 10 0 1 0 0 1\r\n\
pinlabel=P_1\r\n\
T 0 200 5 10 0 1 0 0 1\r\n\
pintype=pas\r\n\
T 0 200 5 10 0 1 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
P 500 200 700 200 1 0 1\r\n\
{\r\n\
T 550 200 5 10 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 250 200 5 10 0 1 0 0 1\r\n\
pinlabel=P_2\r\n\
T 0 200 5 10 0 1 0 0 1\r\n\
pintype=pas\r\n\
T 0 200 5 10 0 1 0 0 1\r\n\
pinseq=2\r\n\
}\r\n\
");

addSymbol("eo_symbols", "eo_voltage_source.sym", "v 20110115 2\r\n\
T 300 350 5 10 0 1 0 0 1\r\n\
device=VoltageSource\r\n\
T 300 500 5 10 1 1 0 0 1\r\n\
refdes=V?\r\n\
T 300 700 5 10 1 1 0 0 1\r\n\
value=3.3V\r\n\
V 0 500 200 3 0 0 0 0 0 0 0 0 0 0 0\r\n\
P 0 900 0 700 1 0 0\r\n\
{\r\n\
T 100 750 5 10 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 100 800 5 10 0 1 0 0 1\r\n\
pinlabel=P_1\r\n\
T 100 800 5 10 1 1 0 0 1\r\n\
polarity=+\r\n\
T 0 1800 5 10 0 1 0 0 1\r\n\
pintype=pwr\r\n\
T 0 1800 5 10 0 1 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
P 0 100 0 300 1 0 0\r\n\
{\r\n\
T 100 50 5 10 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 100 200 5 10 0 1 0 0 1\r\n\
pinlabel=P_2\r\n\
T 100 200 5 10 1 1 0 0 1\r\n\
polarity=-\r\n\
T 0 200 5 10 0 1 0 0 1\r\n\
pintype=pwr\r\n\
T 0 200 5 10 0 1 0 0 1\r\n\
pinseq=2\r\n\
}\r\n\
");

addSymbol("eo_symbols", "eo_xfmr_1.sym", "v 20031231 1\r\n\
A 500 400 100 270 180 3 0 0 0 -1 -1\r\n\
A 500 200 100 270 180 3 0 0 0 -1 -1\r\n\
A 500 800 100 270 180 3 0 0 0 -1 -1\r\n\
A 1000 200 100 90 180 3 0 0 0 -1 -1\r\n\
A 1000 400 100 90 180 3 0 0 0 -1 -1\r\n\
A 1000 800 100 90 180 3 0 0 0 -1 -1\r\n\
A 500 600 100 270 180 3 0 0 0 -1 -1\r\n\
A 1000 600 100 90 180 3 0 0 0 -1 -1\r\n\
L 500 900 200 900 3 0 0 0 -1 -1\r\n\
L 500 100 200 100 3 0 0 0 -1 -1\r\n\
L 1000 100 1300 100 3 0 0 0 -1 -1\r\n\
L 1000 900 1300 900 3 0 0 0 -1 -1\r\n\
L 700 1000 700 0 3 0 0 0 -1 -1\r\n\
L 800 1000 800 0 3 0 0 0 -1 -1\r\n\
P 200 100 0 100 1 0 1\r\n\
{\r\n\
T 100 150 5 8 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 100 150 5 8 0 0 0 0 1\r\n\
pinseq=2\r\n\
T 100 150 5 8 0 1 0 0 1 \r\n\
pinlabel=P\r\n\
T 100 150 5 8 0 1 0 0 1 \r\n\
pintype=pas\r\n\
}\r\n\
P 200 900 0 900 1 0 1\r\n\
{\r\n\
T 100 1150 5 8 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 100 1150 5 8 0 0 0 0 1\r\n\
pinseq=1\r\n\
T 100 1150 5 8 0 1 0 0 1 \r\n\
pinlabel=PDOT\r\n\
T 100 1150 5 8 0 1 0 0 1 \r\n\
pintype=pas\r\n\
}\r\n\
P 1500 100 1300 100 1 0 0\r\n\
{\r\n\
T 1400 150 5 8 0 1 0 0 1\r\n\
pinnumber=4\r\n\
T 1400 150 5 8 0 0 0 0 1\r\n\
pinseq=4\r\n\
T 1400 150 5 8 0 1 0 0 1 \r\n\
pinlabel=S\r\n\
T 1400 150 5 8 0 1 0 0 1 \r\n\
pintype=pas\r\n\
}\r\n\
P 1500 900 1300 900 1 0 0\r\n\
{\r\n\
T 1400 1150 5 8 0 1 0 0 1\r\n\
pinnumber=3\r\n\
T 1400 1150 5 8 0 0 0 0 1\r\n\
pinseq=3\r\n\
T 1400 1150 5 8 0 1 0 0 1 \r\n\
pinlabel=SDOT\r\n\
T 1400 1150 5 8 0 1 0 0 1 \r\n\
pintype=pas\r\n\
}\r\n\
T 300 1100 8 10 1 1 0 0 1\r\n\
refdes=T?\r\n\
T 300 1100 8 10 0 0 0 0 1\r\n\
device=transformer\r\n\
");


addSymbol("eo_symbols", "eo_fuse.sym", "v 20050820 1\r\n\
P 0 0 200 0 1 0 0\r\n\
{\r\n\
T 150 50 5 8 0 1 0 6 1\r\n\
pinnumber=1\r\n\
T 150 -50 5 8 0 1 0 8 1\r\n\
pinseq=1\r\n\
T 250 0 9 8 0 1 0 0 1\r\n\
pinlabel=1\r\n\
T 250 0 5 8 0 1 0 2 1\r\n\
pintype=pas\r\n\
}\r\n\
P 700 0 900 0 1 0 1\r\n\
{\r\n\
T 750 50 5 8 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 750 -50 5 8 0 1 0 2 1\r\n\
pinseq=2\r\n\
T 650 0 9 8 0 1 0 6 1\r\n\
pinlabel=2\r\n\
T 650 0 5 8 0 1 0 8 1\r\n\
pintype=pas\r\n\
}\r\n\
A 325 0 125 180 180 3 0 0 0 -1 -1\r\n\
A 575 0 125 0 180 3 0 0 0 -1 -1\r\n\
T 200 400 5 10 0 0 0 0 1\r\n\
device=FUSE\r\n\
T 200 200 8 10 1 1 0 0 1\r\n\
refdes=F?\r\n\
T 200 1000 5 10 0 0 0 0 1\r\n\
description=fuse\r\n\
");




addSymbol("eo_symbols", "eo_xfmr_2.sym", "v 20031231 1\r\n\
A 500 400 100 270 180 3 0 0 0 -1 -1\r\n\
A 500 200 100 270 180 3 0 0 0 -1 -1\r\n\
A 500 800 100 270 180 3 0 0 0 -1 -1\r\n\
A 1000 200 100 90 180 3 0 0 0 -1 -1\r\n\
A 1000 400 100 90 180 3 0 0 0 -1 -1\r\n\
A 1000 800 100 90 180 3 0 0 0 -1 -1\r\n\
A 500 600 100 270 180 3 0 0 0 -1 -1\r\n\
A 1000 600 100 90 180 3 0 0 0 -1 -1\r\n\
L 500 900 200 900 3 0 0 0 -1 -1\r\n\
L 500 100 200 100 3 0 0 0 -1 -1\r\n\
L 1000 100 1300 100 3 0 0 0 -1 -1\r\n\
L 1000 900 1300 900 3 0 0 0 -1 -1\r\n\
L 1000 500 1300 500 3 0 0 0 -1 -1\r\n\
L 700 1000 700 0 3 0 0 0 -1 -1\r\n\
L 800 1000 800 0 3 0 0 0 -1 -1\r\n\
P 200 100 0 100 1 0 1\r\n\
{\r\n\
T 100 150 5 8 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 100 150 5 8 0 0 0 0 1\r\n\
pinseq=2\r\n\
T 100 150 5 8 0 1 0 0 1 \r\n\
pinlabel=P\r\n\
T 100 150 5 8 0 1 0 0 1 \r\n\
pintype=pas\r\n\
}\r\n\
P 200 900 0 900 1 0 1\r\n\
{\r\n\
T 100 1150 5 8 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 100 1150 5 8 0 0 0 0 1\r\n\
pinseq=1\r\n\
T 100 1150 5 8 0 1 0 0 1 \r\n\
pinlabel=PDOT\r\n\
T 100 1150 5 8 0 1 0 0 1 \r\n\
pintype=pas\r\n\
}\r\n\
P 1500 100 1300 100 1 0 0\r\n\
{\r\n\
T 1400 150 5 8 0 1 0 0 1\r\n\
pinnumber=4\r\n\
T 1400 150 5 8 0 0 0 0 1\r\n\
pinseq=4\r\n\
T 1400 150 5 8 0 1 0 0 1 \r\n\
pinlabel=S\r\n\
T 1400 150 5 8 0 1 0 0 1 \r\n\
pintype=pas\r\n\
}\r\n\
P 1500 900 1300 900 1 0 0\r\n\
{\r\n\
T 1400 1150 5 8 0 1 0 0 1\r\n\
pinnumber=3\r\n\
T 1400 1150 5 8 0 0 0 0 1\r\n\
pinseq=3\r\n\
T 1400 1150 5 8 0 1 0 0 1 \r\n\
pinlabel=SDOT\r\n\
T 1400 1150 5 8 0 1 0 0 1 \r\n\
pintype=pas\r\n\
}\r\n\
P 1500 500 1300 500 1 0 0\r\n\
{\r\n\
T 1400 150 5 8 0 1 0 0 1\r\n\
pinnumber=5\r\n\
T 1400 150 5 8 0 0 0 0 1\r\n\
pinseq=5\r\n\
T 1400 150 5 8 0 1 0 0 1 \r\n\
pinlabel=SCT\r\n\
T 1400 150 5 8 0 1 0 0 1 \r\n\
pintype=pas\r\n\
}\r\n\
T 300 1100 8 10 1 1 0 0 1\r\n\
refdes=T?\r\n\
T 300 1100 8 10 0 0 0 0 1\r\n\
device=transformer\r\n\
");

addSymbol("eo_symbols", "eo_xfmr_3.sym", "v 20031231 1\r\n\
A 500 400 100 270 180 3 0 0 0 -1 -1\r\n\
A 500 200 100 270 180 3 0 0 0 -1 -1\r\n\
A 500 800 100 270 180 3 0 0 0 -1 -1\r\n\
A 1000 200 100 90 180 3 0 0 0 -1 -1\r\n\
A 1000 400 100 90 180 3 0 0 0 -1 -1\r\n\
A 1000 800 100 90 180 3 0 0 0 -1 -1\r\n\
A 500 600 100 270 180 3 0 0 0 -1 -1\r\n\
A 1000 600 100 90 180 3 0 0 0 -1 -1\r\n\
L 500 900 200 900 3 0 0 0 -1 -1\r\n\
L 500 500 200 500 3 0 0 0 -1 -1\r\n\
L 500 100 200 100 3 0 0 0 -1 -1\r\n\
L 1000 100 1300 100 3 0 0 0 -1 -1\r\n\
L 1000 900 1300 900 3 0 0 0 -1 -1\r\n\
L 1000 500 1300 500 3 0 0 0 -1 -1\r\n\
L 700 1000 700 0 3 0 0 0 -1 -1\r\n\
L 800 1000 800 0 3 0 0 0 -1 -1\r\n\
P 200 100 0 100 1 0 1\r\n\
{\r\n\
T 100 150 5 8 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 100 150 5 8 0 0 0 0 1\r\n\
pinseq=2\r\n\
T 100 150 5 8 0 1 0 0 1 \r\n\
pinlabel=P\r\n\
T 100 150 5 8 0 1 0 0 1 \r\n\
pintype=pas\r\n\
}\r\n\
P 200 900 0 900 1 0 1\r\n\
{\r\n\
T 100 1150 5 8 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 100 1150 5 8 0 0 0 0 1\r\n\
pinseq=1\r\n\
T 100 1150 5 8 0 1 0 0 1 \r\n\
pinlabel=PDOT\r\n\
T 100 1150 5 8 0 1 0 0 1 \r\n\
pintype=pas\r\n\
}\r\n\
P 200 500 0 500 1 0 1\r\n\
{\r\n\
T 100 750 5 8 0 1 0 0 1\r\n\
pinnumber=6\r\n\
T 100 750 5 8 0 0 0 0 1\r\n\
pinseq=6\r\n\
T 100 750 5 8 0 1 0 0 1 \r\n\
pinlabel=PCT\r\n\
T 100 750 5 8 0 1 0 0 1 \r\n\
pintype=pas\r\n\
}\r\n\
P 1500 100 1300 100 1 0 0\r\n\
{\r\n\
T 1400 150 5 8 0 1 0 0 1\r\n\
pinnumber=4\r\n\
T 1400 150 5 8 0 0 0 0 1\r\n\
pinseq=4\r\n\
T 1400 150 5 8 0 1 0 0 1 \r\n\
pinlabel=S\r\n\
T 1400 150 5 8 0 1 0 0 1 \r\n\
pintype=pas\r\n\
}\r\n\
P 1500 900 1300 900 1 0 0\r\n\
{\r\n\
T 1400 1150 5 8 0 1 0 0 1\r\n\
pinnumber=3\r\n\
T 1400 1150 5 8 0 0 0 0 1\r\n\
pinseq=3\r\n\
T 1400 1150 5 8 0 1 0 0 1 \r\n\
pinlabel=SDOT\r\n\
T 1400 1150 5 8 0 1 0 0 1 \r\n\
pintype=pas\r\n\
}\r\n\
P 1500 500 1300 500 1 0 0\r\n\
{\r\n\
T 1400 750 5 8 0 1 0 0 1\r\n\
pinnumber=5\r\n\
T 1400 750 5 8 0 0 0 0 1\r\n\
pinseq=5\r\n\
T 1400 750 5 8 0 1 0 0 1 \r\n\
pinlabel=SCT\r\n\
T 1400 750 5 8 0 1 0 0 1 \r\n\
pintype=pas\r\n\
}\r\n\
T 300 1100 8 10 1 1 0 0 1\r\n\
refdes=T?\r\n\
T 300 1100 8 10 0 0 0 0 1\r\n\
device=transformer\r\n\
");

addSymbol("eo_symbols", "eo_xfmr_4.sym", "v 20031231 1\r\n\
A 500 400 100 270 180 3 0 0 0 -1 -1\r\n\
A 500 200 100 270 180 3 0 0 0 -1 -1\r\n\
A 500 800 100 270 180 3 0 0 0 -1 -1\r\n\
A 1000 200 100 90 180 3 0 0 0 -1 -1\r\n\
A 1000 400 100 90 180 3 0 0 0 -1 -1\r\n\
A 1000 800 100 90 180 3 0 0 0 -1 -1\r\n\
A 500 600 100 270 180 3 0 0 0 -1 -1\r\n\
A 1000 600 100 90 180 3 0 0 0 -1 -1\r\n\
L 500 900 200 900 3 0 0 0 -1 -1\r\n\
L 500 100 200 100 3 0 0 0 -1 -1\r\n\
L 1000 100 1300 100 3 0 0 0 -1 -1\r\n\
L 1000 900 1300 900 3 0 0 0 -1 -1\r\n\
P 200 100 0 100 1 0 1\r\n\
{\r\n\
T 100 150 5 8 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 100 150 5 8 0 0 0 0 1\r\n\
pinseq=2\r\n\
T 100 150 5 8 0 1 0 0 1 \r\n\
pinlabel=P\r\n\
T 100 150 5 8 0 1 0 0 1 \r\n\
pintype=pas\r\n\
}\r\n\
P 200 900 0 900 1 0 1\r\n\
{\r\n\
T 100 1150 5 8 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 100 1150 5 8 0 0 0 0 1\r\n\
pinseq=1\r\n\
T 100 1150 5 8 0 1 0 0 1 \r\n\
pinlabel=PDOT\r\n\
T 100 1150 5 8 0 1 0 0 1 \r\n\
pintype=pas\r\n\
}\r\n\
P 1500 100 1300 100 1 0 0\r\n\
{\r\n\
T 1400 150 5 8 0 1 0 0 1\r\n\
pinnumber=4\r\n\
T 1400 150 5 8 0 0 0 0 1\r\n\
pinseq=4\r\n\
T 1400 150 5 8 0 1 0 0 1 \r\n\
pinlabel=S\r\n\
T 1400 150 5 8 0 1 0 0 1 \r\n\
pintype=pas\r\n\
}\r\n\
P 1500 900 1300 900 1 0 0\r\n\
{\r\n\
T 1400 1150 5 8 0 1 0 0 1\r\n\
pinnumber=3\r\n\
T 1400 1150 5 8 0 0 0 0 1\r\n\
pinseq=3\r\n\
T 1400 1150 5 8 0 1 0 0 1 \r\n\
pinlabel=SDOT\r\n\
T 1400 1150 5 8 0 1 0 0 1 \r\n\
pintype=pas\r\n\
}\r\n\
T 300 1100 8 10 1 1 0 0 1\r\n\
refdes=T?\r\n\
T 300 1100 8 10 0 0 0 0 1\r\n\
device=transformer\r\n\
");

addSymbol("eo_symbols", "eo_xfmr_5.sym", "v 20031231 1\r\n\
A 500 400 100 270 180 3 0 0 0 -1 -1\r\n\
A 500 200 100 270 180 3 0 0 0 -1 -1\r\n\
A 500 800 100 270 180 3 0 0 0 -1 -1\r\n\
A 1000 200 100 90 180 3 0 0 0 -1 -1\r\n\
A 1000 400 100 90 180 3 0 0 0 -1 -1\r\n\
A 1000 800 100 90 180 3 0 0 0 -1 -1\r\n\
A 500 600 100 270 180 3 0 0 0 -1 -1\r\n\
A 1000 600 100 90 180 3 0 0 0 -1 -1\r\n\
L 500 900 200 900 3 0 0 0 -1 -1\r\n\
L 500 100 200 100 3 0 0 0 -1 -1\r\n\
L 1000 100 1300 100 3 0 0 0 -1 -1\r\n\
L 1000 900 1300 900 3 0 0 0 -1 -1\r\n\
L 1000 500 1300 500 3 0 0 0 -1 -1\r\n\
P 200 100 0 100 1 0 1\r\n\
{\r\n\
T 100 150 5 8 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 100 150 5 8 0 0 0 0 1\r\n\
pinseq=2\r\n\
T 100 150 5 8 0 1 0 0 1 \r\n\
pinlabel=P\r\n\
T 100 150 5 8 0 1 0 0 1 \r\n\
pintype=pas\r\n\
}\r\n\
P 200 900 0 900 1 0 1\r\n\
{\r\n\
T 100 1150 5 8 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 100 1150 5 8 0 0 0 0 1\r\n\
pinseq=1\r\n\
T 100 1150 5 8 0 1 0 0 1 \r\n\
pinlabel=PDOT\r\n\
T 100 1150 5 8 0 1 0 0 1 \r\n\
pintype=pas\r\n\
}\r\n\
P 1500 100 1300 100 1 0 0\r\n\
{\r\n\
T 1400 150 5 8 0 1 0 0 1\r\n\
pinnumber=4\r\n\
T 1400 150 5 8 0 0 0 0 1\r\n\
pinseq=4\r\n\
T 1400 150 5 8 0 1 0 0 1 \r\n\
pinlabel=S\r\n\
T 1400 150 5 8 0 1 0 0 1 \r\n\
pintype=pas\r\n\
}\r\n\
P 1500 900 1300 900 1 0 0\r\n\
{\r\n\
T 1400 1150 5 8 0 1 0 0 1\r\n\
pinnumber=3\r\n\
T 1400 1150 5 8 0 0 0 0 1\r\n\
pinseq=3\r\n\
T 1400 1150 5 8 0 1 0 0 1 \r\n\
pinlabel=SDOT\r\n\
T 1400 1150 5 8 0 1 0 0 1 \r\n\
pintype=pas\r\n\
}\r\n\
P 1500 500 1300 500 1 0 0\r\n\
{\r\n\
T 1400 150 5 8 0 1 0 0 1\r\n\
pinnumber=5\r\n\
T 1400 150 5 8 0 0 0 0 1\r\n\
pinseq=5\r\n\
T 1400 150 5 8 0 1 0 0 1 \r\n\
pinlabel=SCT\r\n\
T 1400 150 5 8 0 1 0 0 1 \r\n\
pintype=pas\r\n\
}\r\n\
T 300 1100 8 10 1 1 0 0 1\r\n\
refdes=T?\r\n\
T 300 1100 8 10 0 0 0 0 1\r\n\
device=transformer\r\n\
");

addSymbol("eo_symbols", "eo_xfmr_6.sym", "v 20031231 1\r\n\
A 500 400 100 270 180 3 0 0 0 -1 -1\r\n\
A 500 200 100 270 180 3 0 0 0 -1 -1\r\n\
A 500 800 100 270 180 3 0 0 0 -1 -1\r\n\
A 1000 200 100 90 180 3 0 0 0 -1 -1\r\n\
A 1000 400 100 90 180 3 0 0 0 -1 -1\r\n\
A 1000 800 100 90 180 3 0 0 0 -1 -1\r\n\
A 500 600 100 270 180 3 0 0 0 -1 -1\r\n\
A 1000 600 100 90 180 3 0 0 0 -1 -1\r\n\
L 500 900 200 900 3 0 0 0 -1 -1\r\n\
L 500 500 200 500 3 0 0 0 -1 -1\r\n\
L 500 100 200 100 3 0 0 0 -1 -1\r\n\
L 1000 100 1300 100 3 0 0 0 -1 -1\r\n\
L 1000 900 1300 900 3 0 0 0 -1 -1\r\n\
L 1000 500 1300 500 3 0 0 0 -1 -1\r\n\
P 200 100 0 100 1 0 1\r\n\
{\r\n\
T 100 150 5 8 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 100 150 5 8 0 0 0 0 1\r\n\
pinseq=2\r\n\
T 100 150 5 8 0 1 0 0 1 \r\n\
pinlabel=P\r\n\
T 100 150 5 8 0 1 0 0 1 \r\n\
pintype=pas\r\n\
}\r\n\
P 200 900 0 900 1 0 1\r\n\
{\r\n\
T 100 1150 5 8 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 100 1150 5 8 0 0 0 0 1\r\n\
pinseq=1\r\n\
T 100 1150 5 8 0 1 0 0 1 \r\n\
pinlabel=PDOT\r\n\
T 100 1150 5 8 0 1 0 0 1 \r\n\
pintype=pas\r\n\
}\r\n\
P 200 500 0 500 1 0 1\r\n\
{\r\n\
T 100 750 5 8 0 1 0 0 1\r\n\
pinnumber=6\r\n\
T 100 750 5 8 0 0 0 0 1\r\n\
pinseq=6\r\n\
T 100 750 5 8 0 1 0 0 1 \r\n\
pinlabel=PCT\r\n\
T 100 750 5 8 0 1 0 0 1 \r\n\
pintype=pas\r\n\
}\r\n\
P 1500 100 1300 100 1 0 0\r\n\
{\r\n\
T 1400 150 5 8 0 1 0 0 1\r\n\
pinnumber=4\r\n\
T 1400 150 5 8 0 0 0 0 1\r\n\
pinseq=4\r\n\
T 1400 150 5 8 0 1 0 0 1 \r\n\
pinlabel=S\r\n\
T 1400 150 5 8 0 1 0 0 1 \r\n\
pintype=pas\r\n\
}\r\n\
P 1500 900 1300 900 1 0 0\r\n\
{\r\n\
T 1400 1150 5 8 0 1 0 0 1\r\n\
pinnumber=3\r\n\
T 1400 1150 5 8 0 0 0 0 1\r\n\
pinseq=3\r\n\
T 1400 1150 5 8 0 1 0 0 1 \r\n\
pinlabel=SDOT\r\n\
T 1400 1150 5 8 0 1 0 0 1 \r\n\
pintype=pas\r\n\
}\r\n\
P 1500 500 1300 500 1 0 0\r\n\
{\r\n\
T 1400 750 5 8 0 1 0 0 1\r\n\
pinnumber=5\r\n\
T 1400 750 5 8 0 0 0 0 1\r\n\
pinseq=5\r\n\
T 1400 750 5 8 0 1 0 0 1 \r\n\
pinlabel=SCT\r\n\
T 1400 750 5 8 0 1 0 0 1 \r\n\
pintype=pas\r\n\
}\r\n\
T 300 1100 8 10 1 1 0 0 1\r\n\
refdes=T?\r\n\
T 300 1100 8 10 0 0 0 0 1\r\n\
device=transformer\r\n\
");


addSymbol("eo_symbols", "eo_xfmr_stepdn.sym", "v 20031231 1\r\n\
A 500 400 100 270 180 3 0 0 0 -1 -1\r\n\
A 500 200 100 270 180 3 0 0 0 -1 -1\r\n\
A 500 600 100 270 180 3 0 0 0 -1 -1\r\n\
A 500 800 100 270 180 3 0 0 0 -1 -1\r\n\
A 1000 400 100 90 180 3 0 0 0 -1 -1\r\n\
A 1000 600 100 90 180 3 0 0 0 -1 -1\r\n\
L 500 900 200 900 3 0 0 0 -1 -1\r\n\
L 500 100 200 100 3 0 0 0 -1 -1\r\n\
L 1000 300 1300 300 3 0 0 0 -1 -1\r\n\
L 1000 700 1300 700 3 0 0 0 -1 -1\r\n\
L 700 1000 700 0 3 0 0 0 -1 -1\r\n\
L 800 1000 800 0 3 0 0 0 -1 -1\r\n\
P 200 100 0 100 1 0 1\r\n\
{\r\n\
T 100 150 5 8 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 100 150 5 8 0 0 0 0 1\r\n\
pinseq=2\r\n\
T 100 150 5 8 0 1 0 0 1 \r\n\
pinlabel=P\r\n\
T 100 150 5 8 0 1 0 0 1\r\n\
pintype=pas\r\n\
}\r\n\
P 200 900 0 900 1 0 1\r\n\
{\r\n\
T 100 1150 5 8 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 100 1150 5 8 0 0 0 0 1\r\n\
pinseq=1\r\n\
T 100 1150 5 8 0 1 0 0 1 \r\n\
pinlabel=PDOT\r\n\
T 100 1150 5 8 0 1 0 0 1 \r\n\
pintype=pas\r\n\
}\r\n\
P 1500 300 1300 300 1 0 0\r\n\
{\r\n\
T 1400 150 5 8 0 1 0 0 1\r\n\
pinnumber=4\r\n\
T 1400 150 5 8 0 0 0 0 1\r\n\
pinseq=4\r\n\
T 1400 150 5 8 0 1 0 0 1 \r\n\
pinlabel=S\r\n\
T 1400 150 5 8 0 1 0 0 1 \r\n\
pintype=pas\r\n\
}\r\n\
P 1500 700 1300 700 1 0 0\r\n\
{\r\n\
T 1400 1150 5 8 0 1 0 0 1\r\n\
pinnumber=3\r\n\
T 1400 1150 5 8 0 0 0 0 1\r\n\
pinseq=3\r\n\
T 1400 1150 5 8 0 1 0 0 1 \r\n\
pinlabel=SDOT\r\n\
T 1400 1150 5 8 0 1 0 0 1 \r\n\
pintype=pas\r\n\
}\r\n\
T 300 1100 8 10 1 1 0 0 1\r\n\
refdes=T?\r\n\
T 300 1100 8 10 0 0 0 0 1\r\n\
device=transformer\r\n\
");

addSymbol("eo_connectors", "eo_xlr3f.sym", "v 20110115 2\r\n\
T 0 -150 5 10 0 1 0 0 1\r\n\
device=XLR_Female\r\n\
T 0 0 5 10 1 1 0 0 1\r\n\
refdes=J?\r\n\
V 300 500 50 3 0 0 0 0 0 0 0 0 0 0 0\r\n\
V 500 500 50 3 0 0 0 0 0 0 0 0 0 0 0\r\n\
V 400 350 50 3 0 0 0 0 0 0 0 0 0 0 0\r\n\
V 400 450 250 3 0 0 0 0 0 0 0 0 0 0 0\r\n\
P 550 500 800 500 1 0 1\r\n\
{\r\n\
T 650 550 5 10 1 1 0 0 1\r\n\
pinnumber=1\r\n\
T 350 500 5 10 0 1 0 0 1\r\n\
pinlabel=DRAIN\r\n\
T 0 500 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 500 5 10 0 1 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
P 0 500 250 500 1 0 0\r\n\
{\r\n\
T 70 550 5 10 1 1 0 0 1\r\n\
pinnumber=2\r\n\
T 250 500 5 10 0 1 0 0 1\r\n\
pinlabel=P\r\n\
T 0 500 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 500 5 10 0 1 0 0 1\r\n\
pinseq=2\r\n\
}\r\n\
P 400 100 400 300 1 0 0\r\n\
{\r\n\
T 470 100 5 10 1 1 0 0 1\r\n\
pinnumber=3\r\n\
T 650 100 5 10 0 1 0 0 1\r\n\
pinlabel=N\r\n\
T 0 100 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 100 5 10 0 1 0 0 1\r\n\
pinseq=3\r\n\
}\r\n\
");

addSymbol("eo_symbols", "eo_xtal.sym", "v 20050820 1\r\n\
P 0 100 200 100 1 0 0\r\n\
{\r\n\
T 150 150 5 8 0 1 0 6 1\r\n\
pinnumber=1\r\n\
T 150 50 5 8 0 1 0 8 1\r\n\
pinseq=1\r\n\
T 250 100 9 8 0 1 0 0 1\r\n\
pinlabel=P1\r\n\
T 250 100 5 8 0 1 0 2 1\r\n\
pintype=pas\r\n\
}\r\n\
P 400 100 600 100 1 0 1\r\n\
{\r\n\
T 550 150 5 8 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 550 50 5 8 0 1 0 2 1\r\n\
pinseq=2\r\n\
T 450 100 9 8 0 1 0 6 1\r\n\
pinlabel=P2\r\n\
T 450 100 5 8 0 1 0 8 1\r\n\
pintype=pas\r\n\
}\r\n\
B 250 0 100 200 3 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
T 200 500 5 10 0 0 0 0 1\r\n\
device=CRYSTAL\r\n\
L 200 240 200 -40 3 0 0 0 -1 -1\r\n\
L 400 240 400 -40 3 0 0 0 -1 -1\r\n\
T 200 300 8 10 1 1 0 0 1\r\n\
refdes=Y?\r\n\
T 200 1100 5 10 0 0 0 0 1\r\n\
description=crystal\r\n\
");

addSymbol("eo_symbols", "eo_zener.sym", "v 20110115 2\r\n\
T 500 300 5 10 0 1 0 0 1\r\n\
device=ZENER\r\n\
T 200 300 8 10 1 1 0 0 1\r\n\
refdes=D?\r\n\
L 200 200 200 0 3 0 0 0 -1 -1\r\n\
L 200 200 400 100 3 0 0 0 -1 -1\r\n\
L 200 0 400 100 3 0 0 0 -1 -1\r\n\
L 400 200 400 0 3 0 0 0 -1 -1\r\n\
L 400 0 350 -50 3 0 0 0 -1 -1\r\n\
L 400 200 450 250 3 0 0 0 -1 -1\r\n\
P 0 100 200 100 1 0 0\r\n\
{\r\n\
T 50 150 5 8 0 1 0 0 1\r\n\
pinnumber=A\r\n\
T 0 100 5 8 0 0 0 0 1\r\n\
pinseq=1\r\n\
T 0 100 5 8 0 1 0 0 1\r\n\
pinlabel=A\r\n\
T 0 100 5 8 0 1 0 0 1\r\n\
pintype=pas\r\n\
}\r\n\
P 400 100 600 100 1 0 1\r\n\
{\r\n\
T 550 150 5 8 0 1 0 0 1\r\n\
pinnumber=K\r\n\
T 400 100 5 8 0 0 0 0 1\r\n\
pinseq=2\r\n\
T 400 100 5 8 0 1 0 0 1\r\n\
pinlabel=K\r\n\
T 400 100 5 8 0 1 0 0 1\r\n\
pintype=pas\r\n\
}\r\n\
L 0 100 200 100 3 0 0 0 -1 -1\r\n\
L 400 100 600 100 3 0 0 0 -1 -1\r\n\
");

addSymbol("eo_connectors", "USB_A.sym","v 20110115 2\r\n\
T 0 -100 5 10 1 1 0 1 1\r\n\
device=USB_A\r\n\
T 50 780 5 10 1 1 0 1 1\r\n\
refdes=J?\r\n\
B 0 0 300 900 3 3 0 0 0 0 0 0 0 0 0 0\r\n\
P 300 700 500 700 1 0 1\r\n\
{\r\n\
T 150 700 5 8 1 1 0 0 1\r\n\
pinnumber=1\r\n\
T 300 700 5 8 0 1 0 0 1\r\n\
pinlabel=VBUS\r\n\
T 300 700 5 8 0 1 0 0 1\r\n\
pintype=pwr\r\n\
T 300 700 5 8 0 1 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
P 300 500 500 500 1 0 1\r\n\
{\r\n\
T 150 500 5 8 1 1 0 0 1\r\n\
pinnumber=2\r\n\
T 300 500 5 8 0 1 0 0 1\r\n\
pinlabel=D_N\r\n\
T 300 500 5 8 0 1 0 0 1\r\n\
pintype=io\r\n\
T 300 500 5 8 0 1 0 0 1\r\n\
pinseq=2\r\n\
}\r\n\
P 300 300 500 300 1 0 1\r\n\
{\r\n\
T 150 300 5 8 1 1 0 0 1\r\n\
pinnumber=3\r\n\
T 300 300 5 8 0 1 0 0 1\r\n\
pinlabel=D_P\r\n\
T 300 300 5 8 0 1 0 0 1\r\n\
pintype=io\r\n\
T 300 300 5 8 0 1 0 0 1\r\n\
pinseq=3\r\n\
}\r\n\
P 300 100 500 100 1 0 1\r\n\
{\r\n\
T 150 100 5 8 1 1 0 0 1\r\n\
pinnumber=4\r\n\
T 300 100 5 8 0 1 0 0 1\r\n\
pinlabel=GND\r\n\
T 300 100 5 8 0 1 0 0 1\r\n\
pintype=pwr\r\n\
T 300 100 5 8 0 1 0 0 1\r\n\
pinseq=4\r\n\
}\r\n\
");

addSymbol("eo_connectors", "USB_C.sym","v 20110115 2\r\n\
T 0 -150 5 10 1 1 0 1 1\r\n\
device=USB_C\r\n\
T 0 0 5 10 1 1 0 1 1\r\n\
refdes=J?\r\n\
B 0 100 350 2600 3 3 0 0 0 0 0 0 0 0 0 0\r\n\
V 100 2500 50 3 1 0 0 0 0 0 0 0 0 0 0\r\n\
V 250 2500 50 3 1 0 0 0 0 0 0 0 0 0 0\r\n\
P 300 2600 500 2600 1 0 1\r\n\
{\r\n\
T 400 2600 5 8 1 1 0 0 1\r\n\
pinnumber=B12\r\n\
T 300 2600 5 8 0 1 0 0 1\r\n\
pinlabel=GND1\r\n\
T 300 2600 5 8 0 1 0 0 1\r\n\
pintype=pwr\r\n\
T 300 2600 5 8 0 1 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
P 300 2500 500 2500 1 0 1\r\n\
{\r\n\
T 400 2500 5 8 1 1 0 0 1\r\n\
pinnumber=A1\r\n\
T 300 2500 5 8 0 1 0 0 1\r\n\
pinlabel=GND2\r\n\
T 300 2500 5 8 0 1 0 0 1\r\n\
pintype=pwr\r\n\
T 300 2500 5 8 0 1 0 0 1\r\n\
pinseq=2\r\n\
}\r\n\
L 300 2600 200 2600 3 1 0 0 0 0\r\n\
L 200 2600 150 2550 3 1 0 0 0 0\r\n\
V 100 2300 50 3 1 0 0 0 0 0 0 0 0 0 0\r\n\
V 250 2300 50 3 1 0 0 0 0 0 0 0 0 0 0\r\n\
P 300 2400 500 2400 1 0 1\r\n\
{\r\n\
T 400 2400 5 8 1 1 0 0 1\r\n\
pinnumber=B11\r\n\
T 300 2400 5 8 0 1 0 0 1\r\n\
pinlabel=RX1_P\r\n\
T 300 2400 5 8 0 1 0 0 1\r\n\
pintype=in\r\n\
T 300 2400 5 8 0 1 0 0 1\r\n\
pinseq=3\r\n\
}\r\n\
P 300 2300 500 2300 1 0 1\r\n\
{\r\n\
T 400 2300 5 8 1 1 0 0 1\r\n\
pinnumber=A2\r\n\
T 300 2300 5 8 0 1 0 0 1\r\n\
pinlabel=TX1_P\r\n\
T 300 2300 5 8 0 1 0 0 1\r\n\
pintype=out\r\n\
T 300 2300 5 8 0 1 0 0 1\r\n\
pinseq=4\r\n\
}\r\n\
L 300 2400 200 2400 3 1 0 0 0 0\r\n\
L 200 2400 150 2350 3 1 0 0 0 0\r\n\
V 100 2100 50 3 1 0 0 0 0 0 0 0 0 0 0\r\n\
V 250 2100 50 3 1 0 0 0 0 0 0 0 0 0 0\r\n\
P 300 2200 500 2200 1 0 1\r\n\
{\r\n\
T 400 2200 5 8 1 1 0 0 1\r\n\
pinnumber=B10\r\n\
T 300 2200 5 8 0 1 0 0 1\r\n\
pinlabel=RX1_N\r\n\
T 300 2200 5 8 0 1 0 0 1\r\n\
pintype=in\r\n\
T 300 2200 5 8 0 1 0 0 1\r\n\
pinseq=5\r\n\
}\r\n\
P 300 2100 500 2100 1 0 1\r\n\
{\r\n\
T 400 2100 5 8 1 1 0 0 1\r\n\
pinnumber=A3\r\n\
T 300 2100 5 8 0 1 0 0 1\r\n\
pinlabel=TX1_N\r\n\
T 300 2100 5 8 0 1 0 0 1\r\n\
pintype=out\r\n\
T 300 2100 5 8 0 1 0 0 1\r\n\
pinseq=6\r\n\
}\r\n\
L 300 2200 200 2200 3 1 0 0 0 0\r\n\
L 200 2200 150 2150 3 1 0 0 0 0\r\n\
V 100 1900 50 3 1 0 0 0 0 0 0 0 0 0 0\r\n\
V 250 1900 50 3 1 0 0 0 0 0 0 0 0 0 0\r\n\
P 300 2000 500 2000 1 0 1\r\n\
{\r\n\
T 400 2000 5 8 1 1 0 0 1\r\n\
pinnumber=B9\r\n\
T 300 2000 5 8 0 1 0 0 1\r\n\
pinlabel=VBUS1\r\n\
T 300 2000 5 8 0 1 0 0 1\r\n\
pintype=pwr\r\n\
T 300 2000 5 8 0 1 0 0 1\r\n\
pinseq=7\r\n\
}\r\n\
P 300 1900 500 1900 1 0 1\r\n\
{\r\n\
T 400 1900 5 8 1 1 0 0 1\r\n\
pinnumber=A4\r\n\
T 300 1900 5 8 0 1 0 0 1\r\n\
pinlabel=VBUS2\r\n\
T 300 1900 5 8 0 1 0 0 1\r\n\
pintype=pwr\r\n\
T 300 1900 5 8 0 1 0 0 1\r\n\
pinseq=8\r\n\
}\r\n\
L 300 2000 200 2000 3 1 0 0 0 0\r\n\
L 200 2000 150 1950 3 1 0 0 0 0\r\n\
V 100 1700 50 3 1 0 0 0 0 0 0 0 0 0 0\r\n\
V 250 1700 50 3 1 0 0 0 0 0 0 0 0 0 0\r\n\
P 300 1800 500 1800 1 0 1\r\n\
{\r\n\
T 400 1800 5 8 1 1 0 0 1\r\n\
pinnumber=B8\r\n\
T 300 1800 5 8 0 1 0 0 1\r\n\
pinlabel=SBU2\r\n\
T 300 1800 5 8 0 1 0 0 1\r\n\
pintype=io\r\n\
T 300 1800 5 8 0 1 0 0 1\r\n\
pinseq=9\r\n\
}\r\n\
P 300 1700 500 1700 1 0 1\r\n\
{\r\n\
T 400 1700 5 8 1 1 0 0 1\r\n\
pinnumber=A5\r\n\
T 300 1700 5 8 0 1 0 0 1\r\n\
pinlabel=CC1\r\n\
T 300 1700 5 8 0 1 0 0 1\r\n\
pintype=io\r\n\
T 300 1700 5 8 0 1 0 0 1\r\n\
pinseq=10\r\n\
}\r\n\
L 300 1800 200 1800 3 1 0 0 0 0\r\n\
L 200 1800 150 1750 3 1 0 0 0 0\r\n\
V 100 1500 50 3 1 0 0 0 0 0 0 0 0 0 0\r\n\
V 250 1500 50 3 1 0 0 0 0 0 0 0 0 0 0\r\n\
P 300 1600 500 1600 1 0 1\r\n\
{\r\n\
T 400 1600 5 8 1 1 0 0 1\r\n\
pinnumber=B7\r\n\
T 300 1600 5 8 0 1 0 0 1\r\n\
pinlabel=D2_N\r\n\
T 300 1600 5 8 0 1 0 0 1\r\n\
pintype=io\r\n\
T 300 1600 5 8 0 1 0 0 1\r\n\
pinseq=11\r\n\
}\r\n\
P 300 1500 500 1500 1 0 1\r\n\
{\r\n\
T 400 1500 5 8 1 1 0 0 1\r\n\
pinnumber=A6\r\n\
T 300 1500 5 8 0 1 0 0 1\r\n\
pinlabel=D1_P\r\n\
T 300 1500 5 8 0 1 0 0 1\r\n\
pintype=io\r\n\
T 300 1500 5 8 0 1 0 0 1\r\n\
pinseq=12\r\n\
}\r\n\
L 300 1600 200 1600 3 1 0 0 0 0\r\n\
L 200 1600 150 1550 3 1 0 0 0 0\r\n\
V 100 1300 50 3 1 0 0 0 0 0 0 0 0 0 0\r\n\
V 250 1300 50 3 1 0 0 0 0 0 0 0 0 0 0\r\n\
P 300 1400 500 1400 1 0 1\r\n\
{\r\n\
T 400 1400 5 8 1 1 0 0 1\r\n\
pinnumber=B6\r\n\
T 300 1400 5 8 0 1 0 0 1\r\n\
pinlabel=D2_P\r\n\
T 300 1400 5 8 0 1 0 0 1\r\n\
pintype=io\r\n\
T 300 1400 5 8 0 1 0 0 1\r\n\
pinseq=13\r\n\
}\r\n\
P 300 1300 500 1300 1 0 1\r\n\
{\r\n\
T 400 1300 5 8 1 1 0 0 1\r\n\
pinnumber=A7\r\n\
T 300 1300 5 8 0 1 0 0 1\r\n\
pinlabel=D1_N\r\n\
T 300 1300 5 8 0 1 0 0 1\r\n\
pintype=io\r\n\
T 300 1300 5 8 0 1 0 0 1\r\n\
pinseq=14\r\n\
}\r\n\
L 300 1400 200 1400 3 1 0 0 0 0\r\n\
L 200 1400 150 1350 3 1 0 0 0 0\r\n\
V 100 1100 50 3 1 0 0 0 0 0 0 0 0 0 0\r\n\
V 250 1100 50 3 1 0 0 0 0 0 0 0 0 0 0\r\n\
P 300 1200 500 1200 1 0 1\r\n\
{\r\n\
T 400 1200 5 8 1 1 0 0 1\r\n\
pinnumber=B5\r\n\
T 300 1200 5 8 0 1 0 0 1\r\n\
pinlabel=CC2\r\n\
T 300 1200 5 8 0 1 0 0 1\r\n\
pintype=io\r\n\
T 300 1200 5 8 0 1 0 0 1\r\n\
pinseq=15\r\n\
}\r\n\
P 300 1100 500 1100 1 0 1\r\n\
{\r\n\
T 400 1100 5 8 1 1 0 0 1\r\n\
pinnumber=A8\r\n\
T 300 1100 5 8 0 1 0 0 1\r\n\
pinlabel=SBU1\r\n\
T 300 1100 5 8 0 1 0 0 1\r\n\
pintype=io\r\n\
T 300 1100 5 8 0 1 0 0 1\r\n\
pinseq=16\r\n\
}\r\n\
L 300 1200 200 1200 3 1 0 0 0 0\r\n\
L 200 1200 150 1150 3 1 0 0 0 0\r\n\
V 100 900 50 3 1 0 0 0 0 0 0 0 0 0 0\r\n\
V 250 900 50 3 1 0 0 0 0 0 0 0 0 0 0\r\n\
P 300 1000 500 1000 1 0 1\r\n\
{\r\n\
T 400 1000 5 8 1 1 0 0 1\r\n\
pinnumber=B4\r\n\
T 300 1000 5 8 0 1 0 0 1\r\n\
pinlabel=VBUS3\r\n\
T 300 1000 5 8 0 1 0 0 1\r\n\
pintype=pwr\r\n\
T 300 1000 5 8 0 1 0 0 1\r\n\
pinseq=17\r\n\
}\r\n\
P 300 900 500 900 1 0 1\r\n\
{\r\n\
T 400 900 5 8 1 1 0 0 1\r\n\
pinnumber=A9\r\n\
T 300 900 5 8 0 1 0 0 1\r\n\
pinlabel=VBUS4\r\n\
T 300 900 5 8 0 1 0 0 1\r\n\
pintype=pwr\r\n\
T 300 900 5 8 0 1 0 0 1\r\n\
pinseq=18\r\n\
}\r\n\
L 300 1000 200 1000 3 1 0 0 0 0\r\n\
L 200 1000 150 950 3 1 0 0 0 0\r\n\
V 100 700 50 3 1 0 0 0 0 0 0 0 0 0 0\r\n\
V 250 700 50 3 1 0 0 0 0 0 0 0 0 0 0\r\n\
P 300 800 500 800 1 0 1\r\n\
{\r\n\
T 400 800 5 8 1 1 0 0 1\r\n\
pinnumber=B3\r\n\
T 300 800 5 8 0 1 0 0 1\r\n\
pinlabel=TX2_N\r\n\
T 300 800 5 8 0 1 0 0 1\r\n\
pintype=out\r\n\
T 300 800 5 8 0 1 0 0 1\r\n\
pinseq=19\r\n\
}\r\n\
P 300 700 500 700 1 0 1\r\n\
{\r\n\
T 400 700 5 8 1 1 0 0 1\r\n\
pinnumber=A10\r\n\
T 300 700 5 8 0 1 0 0 1\r\n\
pinlabel=RX2_N\r\n\
T 300 700 5 8 0 1 0 0 1\r\n\
pintype=in\r\n\
T 300 700 5 8 0 1 0 0 1\r\n\
pinseq=20\r\n\
}\r\n\
L 300 800 200 800 3 1 0 0 0 0\r\n\
L 200 800 150 750 3 1 0 0 0 0\r\n\
V 100 500 50 3 1 0 0 0 0 0 0 0 0 0 0\r\n\
V 250 500 50 3 1 0 0 0 0 0 0 0 0 0 0\r\n\
P 300 600 500 600 1 0 1\r\n\
{\r\n\
T 400 600 5 8 1 1 0 0 1\r\n\
pinnumber=B2\r\n\
T 300 600 5 8 0 1 0 0 1\r\n\
pinlabel=TX2_P\r\n\
T 300 600 5 8 0 1 0 0 1\r\n\
pintype=out\r\n\
T 300 600 5 8 0 1 0 0 1\r\n\
pinseq=21\r\n\
}\r\n\
P 300 500 500 500 1 0 1\r\n\
{\r\n\
T 400 500 5 8 1 1 0 0 1\r\n\
pinnumber=A11\r\n\
T 300 500 5 8 0 1 0 0 1\r\n\
pinlabel=RX2_P\r\n\
T 300 500 5 8 0 1 0 0 1\r\n\
pintype=in\r\n\
T 300 500 5 8 0 1 0 0 1\r\n\
pinseq=22\r\n\
}\r\n\
L 300 600 200 600 3 1 0 0 0 0\r\n\
L 200 600 150 550 3 1 0 0 0 0\r\n\
V 100 300 50 3 1 0 0 0 0 0 0 0 0 0 0\r\n\
V 250 300 50 3 1 0 0 0 0 0 0 0 0 0 0\r\n\
P 300 400 500 400 1 0 1\r\n\
{\r\n\
T 400 400 5 8 1 1 0 0 1\r\n\
pinnumber=B1\r\n\
T 300 400 5 8 0 1 0 0 1\r\n\
pinlabel=GND3\r\n\
T 300 400 5 8 0 1 0 0 1\r\n\
pintype=pwr\r\n\
T 300 400 5 8 0 1 0 0 1\r\n\
pinseq=23\r\n\
}\r\n\
P 300 300 500 300 1 0 1\r\n\
{\r\n\
T 400 300 5 8 1 1 0 0 1\r\n\
pinnumber=A12\r\n\
T 300 300 5 8 0 1 0 0 1\r\n\
pinlabel=GND4\r\n\
T 300 300 5 8 0 1 0 0 1\r\n\
pintype=pwr\r\n\
T 300 300 5 8 0 1 0 0 1\r\n\
pinseq=24\r\n\
}\r\n\
L 300 400 200 400 3 1 0 0 0 0\r\n\
L 200 400 150 350 3 1 0 0 0 0\r\n\
");

addSymbol("eo_connectors", "USB_MICRO_B.sym","v 20110115 2\r\n\
T 0 -100 5 10 1 1 0 1 1\r\n\
device=USB_MICRO_B\r\n\
T 50 980 5 10 1 1 0 1 1\r\n\
refdes=J?\r\n\
B 0 0 300 1100 3 3 0 0 0 0 0 0 0 0 0 0\r\n\
P 300 900 500 900 1 0 1\r\n\
{\r\n\
T 150 900 5 8 1 1 0 0 1\r\n\
pinnumber=1\r\n\
T 300 900 5 8 0 1 0 0 1\r\n\
pinlabel=VBUS\r\n\
T 300 900 5 8 0 1 0 0 1\r\n\
pintype=pwr\r\n\
T 300 900 5 8 0 1 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
P 300 700 500 700 1 0 1\r\n\
{\r\n\
T 150 700 5 8 1 1 0 0 1\r\n\
pinnumber=2\r\n\
T 300 700 5 8 0 1 0 0 1\r\n\
pinlabel=D_N\r\n\
T 300 700 5 8 0 1 0 0 1\r\n\
pintype=io\r\n\
T 300 700 5 8 0 1 0 0 1\r\n\
pinseq=2\r\n\
}\r\n\
P 300 500 500 500 1 0 1\r\n\
{\r\n\
T 150 500 5 8 1 1 0 0 1\r\n\
pinnumber=3\r\n\
T 300 500 5 8 0 1 0 0 1\r\n\
pinlabel=D_P\r\n\
T 300 500 5 8 0 1 0 0 1\r\n\
pintype=io\r\n\
T 300 500 5 8 0 1 0 0 1\r\n\
pinseq=3\r\n\
}\r\n\
P 300 300 500 300 1 0 1\r\n\
{\r\n\
T 150 300 5 8 1 1 0 0 1\r\n\
pinnumber=4\r\n\
T 300 300 5 8 0 1 0 0 1\r\n\
pinlabel=ID\r\n\
T 300 300 5 8 0 1 0 0 1\r\n\
pintype=in\r\n\
T 300 300 5 8 0 1 0 0 1\r\n\
pinseq=4\r\n\
}\r\n\
P 300 100 500 100 1 0 1\r\n\
{\r\n\
T 150 100 5 8 1 1 0 0 1\r\n\
pinnumber=5\r\n\
T 300 100 5 8 0 1 0 0 1\r\n\
pinlabel=GND\r\n\
T 300 100 5 8 0 1 0 0 1\r\n\
pintype=pwr\r\n\
T 300 100 5 8 0 1 0 0 1\r\n\
pinseq=5\r\n\
}\r\n\
");

addSymbol("eo_symbols", "GasDischargeTube.sym", "v 20110115 2\r\n\
T 0 -150 5 10 0 1 0 1 1\r\n\
device=GasDischageTube\r\n\
T -100 0 5 10 1 1 0 1 1\r\n\
refdes=GDT?\r\n\
V 300 550 50 3 0 0 0 0 0 0 0 0 0 0 0\r\n\
P 300 800 300 600 1 0 0\r\n\
{\r\n\
T 350 800 5 8 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 550 800 5 8 0 1 0 0 1\r\n\
pinlabel=P_1\r\n\
T 0 800 5 8 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 800 5 8 0 1 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
P 300 300 300 100 1 0 1\r\n\
{\r\n\
T 350 300 5 8 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 26 300 5 8 0 1 0 0 1\r\n\
pinlabel=P_2\r\n\
T 0 300 5 8 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 300 5 8 0 1 0 0 1\r\n\
pinseq=2\r\n\
}\r\n\
V 300 350 50 3 0 0 0 0 0 0 0 0 0 0 0\r\n\
V 300 450 255 3 0 0 0 0 0 0 0 0 0 0 0\r\n\
");

addSymbol("eo_symbols", "eo_Tube_Heater.sym", "v 20110115 2\r\n\
T 0 -150 5 10 0 1 0 1 1\r\n\
device=Tube_Heater\r\n\
T 250 150 5 10 1 1 0 1 1\r\n\
refdes=VTH?\r\n\
L 100 250 150 300 3 0 0 0 0 0\r\n\
L 150 300 200 250 3 0 0 0 0 0\r\n\
P 100 250 100 50 1 0 1\r\n\
{\r\n\
T 150 250 5 8 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T -174 250 5 8 0 1 0 0 1\r\n\
pinlabel=P_1\r\n\
T 0 250 5 8 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 250 5 8 0 1 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
P 200 250 200 50 1 0 1\r\n\
{\r\n\
T 250 250 5 8 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T -74 250 5 8 0 1 0 0 1\r\n\
pinlabel=P_2\r\n\
T 0 250 5 8 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 250 5 8 0 1 0 0 1\r\n\
pinseq=2\r\n\
}\r\n\
");

addSymbol("eo_symbols", "eo_Tube_triode.sym", "v 20110115 2\r\n\
T -350 650 5 10 0 1 0 1 1\r\n\
device=Tube_triode\r\n\
T -100 750 5 10 1 1 0 1 1\r\n\
refdes=VT?\r\n\
V 500 650 0 3 0 0 0 0 0 0 0 0 0 0 0\r\n\
V 500 500 255 3 0 0 0 0 0 0 0 0 0 0 0\r\n\
L 350 650 650 650 3 0 0 0 0 0\r\n\
P 500 850 500 650 1 0 0\r\n\
{\r\n\
T 550 850 5 8 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 750 850 5 8 0 1 0 0 1\r\n\
pinlabel=A\r\n\
T 0 850 5 8 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 850 5 8 0 1 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
L 600 350 600 300 3 0 0 0 0 0\r\n\
P 350 350 350 150 1 0 1\r\n\
{\r\n\
T 400 350 5 8 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 76 350 5 8 0 1 0 0 1\r\n\
pinlabel=K\r\n\
T 0 350 5 8 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 350 5 8 0 1 0 0 1\r\n\
pinseq=2\r\n\
}\r\n\
L 350 350 600 350 3 0 0 0 0 0\r\n\
P 100 500 300 500 1 0 0\r\n\
{\r\n\
T 150 500 5 8 0 1 0 0 1\r\n\
pinnumber=3\r\n\
T 350 500 5 8 0 1 0 0 1\r\n\
pinlabel=G1\r\n\
T 0 500 5 8 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 500 5 8 0 1 0 0 1\r\n\
pinseq=3\r\n\
}\r\n\
L 350 500 400 500 3 0 0 0 0 0\r\n\
L 450 500 500 500 3 0 0 0 0 0\r\n\
L 550 500 600 500 3 0 0 0 0 0\r\n\
");

addSymbol("eo_symbols", "eo_Tube_tetrode.sym", "v 20110115 2\r\n\
T -400 550 5 10 0 1 0 1 1\r\n\
device=Tube_tetrode\r\n\
T -100 650 5 10 1 1 0 1 1\r\n\
refdes=VT?\r\n\
P 650 550 850 550 1 0 1\r\n\
{\r\n\
T 700 550 5 8 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 376 550 5 8 0 1 0 0 1\r\n\
pinlabel=G2\r\n\
T 0 550 5 8 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 550 5 8 0 1 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
V 500 500 255 3 0 0 0 0 0 0 0 0 0 0 0\r\n\
L 350 650 650 650 3 0 0 0 0 0\r\n\
P 500 850 500 650 1 0 0\r\n\
{\r\n\
T 1100 1700 5 8 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 500750250 850850 5 8 0 1 0 0 1\r\n\
pinlabel=A\r\n\
T 0 1700 5 8 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 1700 5 8 0 1 0 0 1\r\n\
pinseq=2\r\n\
}\r\n\
P 350 350 350 150 1 0 1\r\n\
{\r\n\
T 800 700 5 8 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T NaN 350350 5 8 0 1 0 0 1\r\n\
pinlabel=K\r\n\
T 0 700 5 8 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 700 5 8 0 1 0 0 1\r\n\
pinseq=3\r\n\
}\r\n\
L 350 350 600 350 3 0 0 0 0 0\r\n\
P 100 450 300 450 1 0 0\r\n\
{\r\n\
T 300 950 5 8 0 1 0 0 1\r\n\
pinnumber=3\r\n\
T 100350250 450500 5 8 0 1 0 0 1\r\n\
pinlabel=G1\r\n\
T 0 950 5 8 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 950 5 8 0 1 0 0 1\r\n\
pinseq=4\r\n\
}\r\n\
L 600 350 600 300 3 0 0 0 0 0\r\n\
L 350 450 400 450 3 0 0 0 0 0\r\n\
L 450 450 500 450 3 0 0 0 0 0\r\n\
L 550 450 600 450 3 0 0 0 0 0\r\n\
L 350 550 400 550 3 0 0 0 0 0\r\n\
L 450 550 500 550 3 0 0 0 0 0\r\n\
L 550 550 600 550 3 0 0 0 0 0\r\n\
");

addSymbol("eo_symbols", "eo_Tube_pentode.sym", "v 20110115 2\r\n\
T -300 700 5 10 0 1 0 1 1\r\n\
device=Tube_pentode\r\n\
T 50 800 5 10 1 1 0 1 1\r\n\
refdes=VT?\r\n\
P 700 500 900 500 1 0 1\r\n\
{\r\n\
T 750 500 5 8 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 426 500 5 8 0 1 0 0 1\r\n\
pinlabel=G2\r\n\
T 0 500 5 8 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 500 5 8 0 1 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
P 150 400 350 400 1 0 0\r\n\
{\r\n\
T 900 950 5 8 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 150376250 400550 5 8 0 1 0 0 1\r\n\
pinlabel=G1\r\n\
T 0 950 5 8 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 950 5 8 0 1 0 0 1\r\n\
pinseq=2\r\n\
}\r\n\
V 550 650 0 3 0 0 0 0 0 0 0 0 0 0 0\r\n\
V 550 500 255 3 0 0 0 0 0 0 0 0 0 0 0\r\n\
L 400 650 700 650 3 0 0 0 0 0\r\n\
P 550 850 550 650 1 0 0\r\n\
{\r\n\
T 1150 1700 5 8 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 1550 1700 5 8 0 1 0 0 1\r\n\
pinlabel=A\r\n\
T 0 1700 5 8 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 1700 5 8 0 1 0 0 1\r\n\
pinseq=3\r\n\
}\r\n\
L 650 350 650 300 3 0 0 0 0 0\r\n\
P 400 350 400 150 1 0 1\r\n\
{\r\n\
T 850 700 5 8 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 202 700 5 8 0 1 0 0 1\r\n\
pinlabel=K\r\n\
T 0 700 5 8 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 700 5 8 0 1 0 0 1\r\n\
pinseq=4\r\n\
}\r\n\
L 400 350 650 350 3 0 0 0 0 0\r\n\
P 150 600 350 600 1 0 0\r\n\
{\r\n\
T 350 1100 5 8 0 1 0 0 1\r\n\
pinnumber=3\r\n\
T 750 1100 5 8 0 1 0 0 1\r\n\
pinlabel=G3\r\n\
T 0 1100 5 8 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 1100 5 8 0 1 0 0 1\r\n\
pinseq=5\r\n\
}\r\n\
L 400 500 450 500 3 0 0 0 0 0\r\n\
L 500 500 550 500 3 0 0 0 0 0\r\n\
L 600 500 650 500 3 0 0 0 0 0\r\n\
L 400 400 450 400 3 0 0 0 0 0\r\n\
L 500 400 550 400 3 0 0 0 0 0\r\n\
L 600 400 650 400 3 0 0 0 0 0\r\n\
L 400 600 450 600 3 0 0 0 0 0\r\n\
L 500 600 550 600 3 0 0 0 0 0\r\n\
L 600 600 650 600 3 0 0 0 0 0\r\n\
");

addSymbol("eo_symbols", "eo_Tube_rectifier.sym", "v 20110115 2\r\n\
T -550 600 5 10 0 1 0 1 1\r\n\
device=Tube_rectifier\r\n\
T -100 700 5 10 1 1 0 1 1\r\n\
refdes=VT?\r\n\
V 350 450 255 3 0 0 0 0 0 0 0 0 0 0 0\r\n\
L 200 550 300 550 3 0 0 0 0 0\r\n\
L 400 550 500 550 3 0 0 0 0 0\r\n\
P 250 750 250 550 1 0 0\r\n\
{\r\n\
T 300 750 5 8 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 100 650 5 8 0 1 0 0 1\r\n\
pinlabel=A1\r\n\
T 0 750 5 8 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 750 5 8 0 1 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
P 450 750 450 550 1 0 0\r\n\
{\r\n\
T 500 750 5 8 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 500 650 5 8 0 1 0 0 1\r\n\
pinlabel=A2\r\n\
T 0 750 5 8 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 750 5 8 0 1 0 0 1\r\n\
pinseq=2\r\n\
}\r\n\
L 300 300 350 350 3 0 0 0 0 0\r\n\
L 350 350 400 300 3 0 0 0 0 0\r\n\
P 300 300 300 100 1 0 1\r\n\
{\r\n\
T 500 550 5 8 0 1 0 0 1\r\n\
pinnumber=3\r\n\
T 300-174-274 300250 5 8 0 1 0 0 1\r\n\
pinlabel=H1\r\n\
T 0 550 5 8 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 550 5 8 0 1 0 0 1\r\n\
pinseq=3\r\n\
}\r\n\
P 400 300 400 100 1 0 1\r\n\
{\r\n\
T 700 550 5 8 0 1 0 0 1\r\n\
pinnumber=4\r\n\
T 400-74-274 300250 5 8 0 1 0 0 1\r\n\
pinlabel=H2\r\n\
T 0 550 5 8 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 550 5 8 0 1 0 0 1\r\n\
pinseq=4\r\n\
}\r\n\
");

addSymbol("eo_symbols", "eo_Tube_dual triode.sym", "v 20110115 2\r\n\
T -550 650 5 10 0 1 0 1 1\r\n\
device=Tube_dual_triode\r\n\
T 50 800 5 10 1 1 0 1 1\r\n\
refdes=VT?\r\n\
V 500 650 0 3 0 0 0 0 0 0 0 0 0 0 0\r\n\
L 350 650 650 650 3 0 0 0 0 0\r\n\
P 500 850 500 650 1 0 0\r\n\
{\r\n\
T 1100 1700 5 8 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 1500 1700 5 8 0 1 0 0 1\r\n\
pinlabel=A1\r\n\
T 0 1700 5 8 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 1700 5 8 0 1 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
L 600 350 600 300 3 0 0 0 0 0\r\n\
P 350 350 350 150 1 0 1\r\n\
{\r\n\
T 800 700 5 8 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 168 700 5 8 0 1 0 0 1\r\n\
pinlabel=K1\r\n\
T 0 700 5 8 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 700 5 8 0 1 0 0 1\r\n\
pinseq=2\r\n\
}\r\n\
L 350 350 600 350 3 0 0 0 0 0\r\n\
P 100 500 300 500 1 0 0\r\n\
{\r\n\
T 300 1000 5 8 0 1 0 0 1\r\n\
pinnumber=3\r\n\
T 700 1000 5 8 0 1 0 0 1\r\n\
pinlabel=G1\r\n\
T 0 1000 5 8 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 1000 5 8 0 1 0 0 1\r\n\
pinseq=3\r\n\
}\r\n\
L 350 500 400 500 3 0 0 0 0 0\r\n\
L 450 500 500 500 3 0 0 0 0 0\r\n\
L 550 500 600 500 3 0 0 0 0 0\r\n\
V 900 650 0 3 0 0 0 0 0 0 0 0 0 0 0\r\n\
L 750 650 1050 650 3 0 0 0 0 0\r\n\
P 900 850 900 650 1 0 0\r\n\
{\r\n\
T 1500 1700 5 8 0 1 0 0 1\r\n\
pinnumber=4\r\n\
T 1900 1700 5 8 0 1 0 0 1\r\n\
pinlabel=A2\r\n\
T 0 1700 5 8 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 1700 5 8 0 1 0 0 1\r\n\
pinseq=4\r\n\
}\r\n\
L 1000 350 1000 300 3 0 0 0 0 0\r\n\
P 750 350 750 150 1 0 1\r\n\
{\r\n\
T 1200 700 5 8 0 1 0 0 1\r\n\
pinnumber=5\r\n\
T 568 700 5 8 0 1 0 0 1\r\n\
pinlabel=K2\r\n\
T 0 700 5 8 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 700 5 8 0 1 0 0 1\r\n\
pinseq=5\r\n\
}\r\n\
L 750 350 1000 350 3 0 0 0 0 0\r\n\
P 1050 500 1250 500 1 0 1\r\n\
{\r\n\
T 1250 1000 5 8 0 1 0 0 1\r\n\
pinnumber=6\r\n\
T 1134 1000 5 8 0 1 0 0 1\r\n\
pinlabel=G2\r\n\
T 0 1000 5 8 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 1000 5 8 0 1 0 0 1\r\n\
pinseq=6\r\n\
}\r\n\
L 750 500 800 500 3 0 0 0 0 0\r\n\
L 850 500 900 500 3 0 0 0 0 0\r\n\
L 950 500 1000 500 3 0 0 0 0 0\r\n\
A 900 500 250 270 180 3 0 0 0 0 0\r\n\
A 500 500 250 90 198 3 0 0 0 0 0\r\n\
L 500 750 900 750 3 0 0 0 0 0\r\n\
L 500 250 900 250 3 0 0 0 0 0\r\n\
");

addSymbol("eo_sim", "ASSERT_HIGH_CLK.sym", "v 20110115 2\r\n\
T 0 -150 5 10 1 1 0 1 1\r\n\
device=ASSERT_HIGH_CLK\r\n\
T 0 0 5 10 1 1 0 1 1\r\n\
refdes=ASSERT?\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
primitive=true\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
model=simlib\r\n\
T 0 -300 5 10 1 1 0 1 1\r\n\
message=message text\r\n\
P 0 400 200 400 1 0 0\r\n\
{\r\n\
T 50 400 5 8 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 250 400 5 8 1 1 0 0 1\r\n\
pinlabel=DIN\r\n\
T 0 400 5 8 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 400 5 8 0 1 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
P 0 200 200 200 1 0 0\r\n\
{\r\n\
T 50 200 5 8 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 250 200 5 8 1 1 0 0 1\r\n\
pinlabel=CLK\r\n\
T 0 200 5 8 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 200 5 8 0 1 0 0 1\r\n\
pinseq=2\r\n\
}\r\n\
B 200 100 600 400 3 2 0 0 0 0 0 0 0 0 0 0\r\n\
");

addSymbol("eo_sim", "ASSERT_ON_HIGH.sym", "v 20110115 2\r\n\
T 0 -150 5 10 1 1 0 1 1\r\n\
device=ASSERT_ON_HIGH\r\n\
T 0 0 5 10 1 1 0 1 1\r\n\
refdes=ASSERT?\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
primitive=true\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
model=simlib\r\n\
T 0 -300 5 10 1 1 0 1 1\r\n\
message=message text\r\n\
P 0 200 200 200 1 0 0\r\n\
{\r\n\
T 50 200 5 8 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 250 200 5 8 0 1 0 0 1\r\n\
pinlabel=P_1\r\n\
T 0 200 5 8 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 200 5 8 0 1 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
B 200 100 600 200 3 2 0 0 0 0 0 0 0 0 0 0\r\n\
");

addSymbol("eo_sim", "CONST_VEC.sym", "v 20110115 2\r\n\
T 0 220 5 8 1 1 0 1 1\r\n\
device=CONST_VEC\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
I__VSIZE=8\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
value=x00\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
model=simlib\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
primitive=true\r\n\
P 500 200 700 200 1 1 1\r\n\
{\r\n\
T 550 200 5 8 0 1 0 0 1\r\n\
pinnumber=0\r\n\
T 226 200 5 8 0 1 0 0 1\r\n\
pinlabel=P_1\r\n\
T 0 200 5 8 0 1 0 0 1\r\n\
pintype=bus\r\n\
T 0 200 5 8 0 1 0 0 1\r\n\
pinseq=1\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
size=I__VSIZE\r\n\
}\r\n\
B 0 100 500 200 3 2 0 0 0 0 0 0 0 0 0 0\r\n\
");

addSymbol("eo_sim", "CONSTANT.sym", "v 20110115 2\r\n\
T 0 220 5 8 1 1 0 1 1\r\n\
device=CONSTANT\r\n\
T 100 110 5 8 1 1 0 0 1\r\n\
value=0\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
model=simlib\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
primitive=true\r\n\
P 500 200 700 200 1 0 1\r\n\
{\r\n\
T 550 200 5 8 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 226 200 5 8 0 1 0 0 1\r\n\
pinlabel=P_1\r\n\
T 0 200 5 8 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 200 5 8 0 1 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
B 0 100 500 200 3 2 0 0 0 0 0 0 0 0 0 0\r\n\
");

addSymbol("eo_sim", "eo_adder.sym", "v 20110115 2\r\n\
T 0 -150 5 10 1 1 0 1 1\r\n\
device=ADDER\r\n\
T 0 0 5 10 1 1 0 1 1\r\n\
refdes=U?\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
primitive=true\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
model=simlib\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
Td=3 ns\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
logicfunction=ADDER\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
I__ASIZE=24\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
I__BSIZE=24\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
I__YSIZE=24\r\n\
V 400 300 224 3 0 0 0 0 0 0 0 0 0 0 0\r\n\
P 0 400 200 400 1 1 0\r\n\
{\r\n\
T 0 400 5 10 0 1 0 0 1\r\n\
pinnumber=0\r\n\
T 350 400 5 8 0 1 0 0 1\r\n\
pinlabel=A\r\n\
T 0 800 5 8 0 1 0 0 1\r\n\
pintype=bus\r\n\
T 0 800 5 8 0 1 0 0 1\r\n\
pinseq=1\r\n\
T 0 400 5 10 0 1 0 0 1\r\n\
size=I__ASIZE\r\n\
}\r\n\
P 0 200 200 200 1 1 0\r\n\
{\r\n\
T 0 200 5 10 0 1 0 0 1\r\n\
pinnumber=0\r\n\
T 350 200 5 8 0 1 0 0 1\r\n\
pinlabel=B\r\n\
T 0 400 5 8 0 1 0 0 1\r\n\
pintype=bus\r\n\
T 0 400 5 8 0 1 0 0 1\r\n\
pinseq=2\r\n\
T 0 200 5 10 0 1 0 0 1\r\n\
size=I__BSIZE\r\n\
}\r\n\
P 600 300 800 300 1 1 1\r\n\
{\r\n\
T 600 300 5 10 0 1 0 0 1\r\n\
pinnumber=0\r\n\
T 426 300 5 8 0 1 0 0 1\r\n\
pinlabel=Y\r\n\
T 0 600 5 8 0 1 0 0 1\r\n\
pintype=bus\r\n\
T 0 600 5 8 0 1 0 0 1\r\n\
pinseq=3\r\n\
T 0 300 5 10 0 1 0 0 1\r\n\
size=I__YSIZE\r\n\
}\r\n\
L 300 300 500 300 3 0 0 0 0 0\r\n\
L 400 400 400 200 3 0 0 0 0 0\r\n\
");

addSymbol("eo_sim", "eo_inout_port.sym", "v 20110115 2\r\n\
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
");

addSymbol("eo_sim", "eo_input_port.sym", "v 20110115 2\r\n\
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
");

addSymbol("eo_sim", "eo_LogicH.sym", "v 20110115 2\r\n\
T 0 220 5 8 1 1 0 1 1\r\n\
device=LogicH\r\n\
T 0 0 5 10 1 1 0 1 1\r\n\
refdes=V?\r\n\
T 100 110 5 8 1 1 0 0 1\r\n\
value=H\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
model=simlib\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
primitive=true\r\n\
P 500 200 700 200 1 0 1\r\n\
{\r\n\
T 550 200 5 8 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 226 200 5 8 0 1 0 0 1\r\n\
pinlabel=P_1\r\n\
T 0 200 5 8 0 1 0 0 1\r\n\
pintype=out\r\n\
T 0 200 5 8 0 1 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
B 0 100 500 200 3 2 0 0 0 0 0 0 0 0 0 0\r\n\
");


addSymbol("eo_sim", "eo_LogicL.sym", "v 20110115 2\r\n\
T 0 220 5 8 1 1 0 1 1\r\n\
device=LogicL\r\n\
T 0 0 5 10 1 1 0 1 1\r\n\
refdes=V?\r\n\
T 100 110 5 8 1 1 0 0 1\r\n\
value=L\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
model=simlib\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
primitive=true\r\n\
P 500 200 700 200 1 0 1\r\n\
{\r\n\
T 550 200 5 8 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 226 200 5 8 0 1 0 0 1\r\n\
pinlabel=P_1\r\n\
T 0 200 5 8 0 1 0 0 1\r\n\
pintype=out\r\n\
T 0 200 5 8 0 1 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
B 0 100 500 200 3 2 0 0 0 0 0 0 0 0 0 0\r\n\
");


addSymbol("eo_sim", "eo_LogicOne.sym", "v 20110115 2\r\n\
T 0 220 5 8 1 1 0 1 1\r\n\
device=LogicOne\r\n\
T 0 0 5 10 1 1 0 1 1\r\n\
refdes=V?\r\n\
T 100 110 5 8 1 1 0 0 1\r\n\
value=1\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
model=simlib\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
primitive=true\r\n\
P 500 200 700 200 1 0 1\r\n\
{\r\n\
T 550 200 5 8 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 226 200 5 8 0 1 0 0 1\r\n\
pinlabel=P_1\r\n\
T 0 200 5 8 0 1 0 0 1\r\n\
pintype=out\r\n\
T 0 200 5 8 0 1 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
B 0 100 500 200 3 2 0 0 0 0 0 0 0 0 0 0\r\n\
");


addSymbol("eo_sim", "eo_LogicZero.sym", "v 20110115 2\r\n\
T 0 220 5 8 1 1 0 1 1\r\n\
device=LogicZero\r\n\
T 0 0 5 10 1 1 0 1 1\r\n\
refdes=R?\r\n\
T 100 110 5 8 1 1 0 0 1\r\n\
value=0\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
model=simlib\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
primitive=true\r\n\
P 500 200 700 200 1 0 1\r\n\
{\r\n\
T 550 200 5 8 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 226 200 5 8 0 1 0 0 1\r\n\
pinlabel=P_1\r\n\
T 0 200 5 8 0 1 0 0 1\r\n\
pintype=out\r\n\
T 0 200 5 8 0 1 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
B 0 100 500 200 3 2 0 0 0 0 0 0 0 0 0 0\r\n\
");

addSymbol("eo_sim", "eo_multiplier.sym", "v 20110115 2\r\n\
T 0 -150 5 10 1 1 0 1 1\r\n\
device=MULTIPLIER\r\n\
T 0 0 5 10 1 1 0 1 1\r\n\
refdes=U?\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
primitive=true\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
model=simlib\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
Td=3 ns\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
logicfunction=MULTIPLIER\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
I__ASIZE=24\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
I__BSIZE=24\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
I__YSIZE=24\r\n\
V 500 300 224 3 0 0 0 0 0 0 0 0 0 0 0\r\n\
L 400 400 600 200 3 0 0 0 0 0\r\n\
L 400 200 600 400 3 0 0 0 0 0\r\n\
P 100 400 300 400 1 1 0\r\n\
{\r\n\
T 150 400 5 8 0 1 0 0 1\r\n\
pinnumber=0\r\n\
T 350 400 5 8 0 1 0 0 1\r\n\
pinlabel=A\r\n\
T 0 400 5 8 0 1 0 0 1\r\n\
pintype=bus\r\n\
T 0 400 5 8 0 1 0 0 1\r\n\
pinseq=1\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
size=I__ASIZE\r\n\
}\r\n\
P 100 200 300 200 1 1 0\r\n\
{\r\n\
T 150 200 5 8 0 1 0 0 1\r\n\
pinnumber=0\r\n\
T 350 200 5 8 0 1 0 0 1\r\n\
pinlabel=B\r\n\
T 0 200 5 8 0 1 0 0 1\r\n\
pintype=bus\r\n\
T 0 200 5 8 0 1 0 0 1\r\n\
pinseq=2\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
size=I__BSIZE\r\n\
}\r\n\
P 700 300 900 300 1 1 1\r\n\
{\r\n\
T 750 300 5 8 0 1 0 0 1\r\n\
pinnumber=0\r\n\
T 426 300 5 8 0 1 0 0 1\r\n\
pinlabel=Y\r\n\
T 0 300 5 8 0 1 0 0 1\r\n\
pintype=bus\r\n\
T 0 300 5 8 0 1 0 0 1\r\n\
pinseq=3\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
size=I__YSIZE\r\n\
}\r\n\
");

addSymbol("eo_sim", "eo_output_port.sym", "v 20110115 2\r\n\
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
");

addSymbol("eo_sim", "eo_pullup.sym", "v 20110115 2\r\n\
T 300 -175 5 10 0 1 0 0 1\r\n\
device=PULLUP\r\n\
T 0 -50 5 10 1 1 0 0 1\r\n\
refdes=R1\r\n\
T 0 -175 5 10 1 1 0 0 1\r\n\
value=10K\r\n\
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
pintype=out\r\n\
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
pintype=out\r\n\
T 0 100 5 10 0 1 0 0 1\r\n\
");

addSymbol("eo_sim", "eo_register.sym", "v 20110115 2\r\n\
T 0 -150 5 10 1 1 0 1 1\r\n\
device=REGISTER\r\n\
T 0 0 5 10 1 1 0 1 1\r\n\
refdes=U?\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
I__DSIZE=8\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
I__QSIZE=8\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
model=simlib\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
Td=3 ns\r\n\
P 0 600 200 600 1 1 0\r\n\
{\r\n\
T 50 600 5 8 0 1 0 0 1\r\n\
pinnumber=0\r\n\
T 250 600 5 8 1 1 0 0 1\r\n\
pinlabel=D\r\n\
T 0 600 5 8 0 1 0 0 1\r\n\
pintype=bus\r\n\
T 0 600 5 8 0 1 0 0 1\r\n\
pinseq=1\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
size=I__DSIZE\r\n\
}\r\n\
P 0 400 200 400 1 0 0\r\n\
{\r\n\
T 50 400 5 8 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 250 400 5 8 1 1 0 0 1\r\n\
pinlabel=CLK\r\n\
T 0 400 5 8 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 400 5 8 0 1 0 0 1\r\n\
pinseq=2\r\n\
}\r\n\
P 0 200 200 200 1 0 0\r\n\
{\r\n\
T 50 200 5 8 0 1 0 0 1\r\n\
pinnumber=3\r\n\
T 250 200 5 8 1 1 0 0 1\r\n\
pinlabel=RST_N\r\n\
T 0 200 5 8 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 200 5 8 0 1 0 0 1\r\n\
pinseq=3\r\n\
}\r\n\
P 800 600 1000 600 1 1 1\r\n\
{\r\n\
T 850 600 5 8 0 1 0 0 1\r\n\
pinnumber=0\r\n\
T 626 600 5 8 1 1 0 0 1\r\n\
pinlabel=Q\r\n\
T 0 600 5 8 0 1 0 0 1\r\n\
pintype=bus\r\n\
T 0 600 5 8 0 1 0 0 1\r\n\
pinseq=4\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
size=I__QSIZE\r\n\
}\r\n\
B 200 100 600 600 3 2 0 0 0 0 0 0 0 0 0 0\r\n\
");

addSymbol("eo_sim", "eo_sim_adder4.sym", "v 20110115 2\r\n\
T 850 1700 5 10 1 1 0 0 1\r\n\
device=adder4\r\n\
T 950 1900 5 10 1 1 0 0 1\r\n\
refdes=U?\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
model=simlib\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
primitive=true\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
Td=5 ns\r\n\
P 0 2000 200 2000 1 0 0\r\n\
{\r\n\
T 50 2000 5 10 1 1 0 0 1\r\n\
pinnumber=1\r\n\
T 250 2000 5 10 1 1 0 0 1\r\n\
pinlabel=A0\r\n\
T 0 2000 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 2000 5 10 0 1 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
P 0 1800 200 1800 1 0 0\r\n\
{\r\n\
T 50 1800 5 10 1 1 0 0 1\r\n\
pinnumber=2\r\n\
T 250 1800 5 10 1 1 0 0 1\r\n\
pinlabel=A1\r\n\
T 0 1800 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 1800 5 10 0 1 0 0 1\r\n\
pinseq=2\r\n\
}\r\n\
P 0 1600 200 1600 1 0 0\r\n\
{\r\n\
T 50 1600 5 10 1 1 0 0 1\r\n\
pinnumber=3\r\n\
T 250 1600 5 10 1 1 0 0 1\r\n\
pinlabel=A2\r\n\
T 0 1600 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 1600 5 10 0 1 0 0 1\r\n\
pinseq=3\r\n\
}\r\n\
P 0 1400 200 1400 1 0 0\r\n\
{\r\n\
T 50 1400 5 10 1 1 0 0 1\r\n\
pinnumber=4\r\n\
T 250 1400 5 10 1 1 0 0 1\r\n\
pinlabel=A3\r\n\
T 0 1400 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 1400 5 10 0 1 0 0 1\r\n\
pinseq=4\r\n\
}\r\n\
P 0 1200 200 1200 1 0 0\r\n\
{\r\n\
T 50 1200 5 10 1 1 0 0 1\r\n\
pinnumber=5\r\n\
T 250 1200 5 10 1 1 0 0 1\r\n\
pinlabel=B0\r\n\
T 0 1200 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 1200 5 10 0 1 0 0 1\r\n\
pinseq=5\r\n\
}\r\n\
P 0 1000 200 1000 1 0 0\r\n\
{\r\n\
T 50 1000 5 10 1 1 0 0 1\r\n\
pinnumber=6\r\n\
T 250 1000 5 10 1 1 0 0 1\r\n\
pinlabel=B1\r\n\
T 0 1000 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 1000 5 10 0 1 0 0 1\r\n\
pinseq=6\r\n\
}\r\n\
P 0 800 200 800 1 0 0\r\n\
{\r\n\
T 50 800 5 10 1 1 0 0 1\r\n\
pinnumber=7\r\n\
T 250 800 5 10 1 1 0 0 1\r\n\
pinlabel=B2\r\n\
T 0 800 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 800 5 10 0 1 0 0 1\r\n\
pinseq=7\r\n\
}\r\n\
P 0 600 200 600 1 0 0\r\n\
{\r\n\
T 50 600 5 10 1 1 0 0 1\r\n\
pinnumber=8\r\n\
T 250 600 5 10 1 1 0 0 1\r\n\
pinlabel=B3\r\n\
T 0 600 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 600 5 10 0 1 0 0 1\r\n\
pinseq=8\r\n\
}\r\n\
P 0 400 200 400 1 0 0\r\n\
{\r\n\
T 50 400 5 10 1 1 0 0 1\r\n\
pinnumber=9\r\n\
T 250 400 5 10 1 1 0 0 1\r\n\
pinlabel=CI\r\n\
T 0 400 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 400 5 10 0 1 0 0 1\r\n\
pinseq=9\r\n\
}\r\n\
P 1700 2000 1900 2000 1 0 1\r\n\
{\r\n\
T 1700 2000 5 10 1 1 0 0 1\r\n\
pinnumber=14\r\n\
T 1400 2000 5 10 1 1 0 0 1\r\n\
pinlabel=CY\r\n\
T 1700 2000 5 10 0 1 0 0 1\r\n\
pintype=out\r\n\
T 1700 2000 5 10 0 1 0 0 1\r\n\
pinseq=14\r\n\
}\r\n\
P 1700 1800 1900 1800 1 0 1\r\n\
{\r\n\
T 1700 1800 5 10 1 1 0 0 1\r\n\
pinnumber=13\r\n\
T 1400 1800 5 10 1 1 0 0 1\r\n\
pinlabel=S3\r\n\
T 1700 1800 5 10 0 1 0 0 1\r\n\
pintype=out\r\n\
T 1700 1800 5 10 0 1 0 0 1\r\n\
pinseq=13\r\n\
}\r\n\
P 1700 1600 1900 1600 1 0 1\r\n\
{\r\n\
T 1700 1600 5 10 1 1 0 0 1\r\n\
pinnumber=12\r\n\
T 1400 1600 5 10 1 1 0 0 1\r\n\
pinlabel=S2\r\n\
T 1700 1600 5 10 0 1 0 0 1\r\n\
pintype=out\r\n\
T 1700 1600 5 10 0 1 0 0 1\r\n\
pinseq=12\r\n\
}\r\n\
P 1700 1400 1900 1400 1 0 1\r\n\
{\r\n\
T 1700 1400 5 10 1 1 0 0 1\r\n\
pinnumber=11\r\n\
T 1400 1400 5 10 1 1 0 0 1\r\n\
pinlabel=S1\r\n\
T 1700 1400 5 10 0 1 0 0 1\r\n\
pintype=out\r\n\
T 1700 1400 5 10 0 1 0 0 1\r\n\
pinseq=11\r\n\
}\r\n\
P 1700 1200 1900 1200 1 0 1\r\n\
{\r\n\
T 1700 1200 5 10 1 1 0 0 1\r\n\
pinnumber=10\r\n\
T 1400 1200 5 10 1 1 0 0 1\r\n\
pinlabel=S0\r\n\
T 1700 1200 5 10 0 1 0 0 1\r\n\
pintype=out\r\n\
T 1700 1200 5 10 0 1 0 0 1\r\n\
pinseq=10\r\n\
}\r\n\
B 200 100 1500 2100 3 3 0 0 0 0 0 0 0 0 0 0\r\n\
");

addSymbol("eo_sim", "eo_sim_and2.sym", "v 20110115 2\r\n\
T 500 700 5 10 1 1 0 0 1\r\n\
refdes=U?\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
logicfunction=AND_2\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
device=and2\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
model=simlib\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
primitive=true\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
Td=3 ns\r\n\
L 300 0 700 0 3 0 0 0 -1 -1\r\n\
L 300 0 300 600 3 0 0 0 -1 -1\r\n\
L 300 600 700 600 3 0 0 0 -1 -1\r\n\
A 700 300 300 270 180 3 0 0 0 -1 -1\r\n\
P 1000 300 1300 300 1 0 1\r\n\
{\r\n\
T 1000 300 5 10 0 1 0 0 1\r\n\
pinnumber=3\r\n\
T 1000 300 5 10 0 1 0 0 1\r\n\
pinlabel=Y\r\n\
T 1000 300 5 10 0 1 0 0 1\r\n\
pintype=out\r\n\
T 1000 300 5 10 0 1 0 0 1\r\n\
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
");

addSymbol("eo_sim", "eo_sim_and3.sym", "v 20110115 2\r\n\
T 500 700 5 10 1 1 0 0 1\r\n\
refdes=U?\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
logicfunction=AND_3\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
device=and3\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
model=simlib\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
primitive=true\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
Td=3 ns\r\n\
L 300 0 700 0 3 0 0 0 -1 -1\r\n\
L 300 0 300 600 3 0 0 0 -1 -1\r\n\
L 300 600 700 600 3 0 0 0 -1 -1\r\n\
A 700 300 300 270 180 3 0 0 0 -1 -1\r\n\
P 1000 300 1300 300 1 0 1\r\n\
{\r\n\
T 1000 300 5 10 0 1 0 0 1\r\n\
pinnumber=4\r\n\
T 1000 300 5 10 0 1 0 0 1\r\n\
pinlabel=Y\r\n\
T 1000 300 5 10 0 1 0 0 1\r\n\
pintype=out\r\n\
T 1000 300 5 10 0 1 0 0 1\r\n\
pinseq=4\r\n\
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
P 0 300 300 300 1 0 0\r\n\
{\r\n\
T 0 300 5 10 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 0 300 5 10 0 1 0 0 1\r\n\
pinlabel=B\r\n\
T 0 300 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 300 5 10 0 1 0 0 1\r\n\
pinseq=2\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
comment=\r\n\
}\r\n\
P 0 100 300 100 1 0 0\r\n\
{\r\n\
T 0 100 5 10 0 1 0 0 1\r\n\
pinnumber=3\r\n\
T 0 100 5 10 0 1 0 0 1\r\n\
pinlabel=C\r\n\
T 0 100 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 100 5 10 0 1 0 0 1\r\n\
pinseq=3\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
comment=\r\n\
}\r\n\
");

addSymbol("eo_sim", "eo_sim_and4.sym", "v 20110115 2\r\n\
T 500 700 5 10 1 1 0 0 1\r\n\
refdes=U?\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
logicfunction=AND_4\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
device=and4\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
model=simlib\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
primitive=true\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
Td=3 ns\r\n\
L 300 0 700 0 3 0 0 0 -1 -1\r\n\
L 300 0 300 600 3 0 0 0 -1 -1\r\n\
L 300 600 700 600 3 0 0 0 -1 -1\r\n\
A 700 300 300 270 180 3 0 0 0 -1 -1\r\n\
P 1000 300 1300 300 1 0 1\r\n\
{\r\n\
T 1000 300 5 10 0 1 0 0 1\r\n\
pinnumber=5\r\n\
T 1000 300 5 10 0 1 0 0 1\r\n\
pinlabel=Y\r\n\
T 1000 300 5 10 0 1 0 0 1\r\n\
pintype=out\r\n\
T 1000 300 5 10 0 1 0 0 1\r\n\
pinseq=5\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
comment=\r\n\
}\r\n\
P 0 600 300 600 1 0 0\r\n\
{\r\n\
T 0 600 5 10 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 0 600 5 10 0 1 0 0 1\r\n\
pinlabel=A\r\n\
T 0 600 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 600 5 10 0 1 0 0 1\r\n\
pinseq=1\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
comment=\r\n\
}\r\n\
P 0 400 300 400 1 0 0\r\n\
{\r\n\
T 0 400 5 10 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 0 400 5 10 0 1 0 0 1\r\n\
pinlabel=B\r\n\
T 0 400 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 400 5 10 0 1 0 0 1\r\n\
pinseq=2\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
comment=\r\n\
}\r\n\
P 0 200 300 200 1 0 0\r\n\
{\r\n\
T 0 200 5 10 0 1 0 0 1\r\n\
pinnumber=3\r\n\
T 0 200 5 10 0 1 0 0 1\r\n\
pinlabel=C\r\n\
T 0 200 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 200 5 10 0 1 0 0 1\r\n\
pinseq=3\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
comment=\r\n\
}\r\n\
P 0 0 300 0 1 0 0\r\n\
{\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
pinnumber=4\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
pinlabel=D\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
pinseq=4\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
comment=\r\n\
}\r\n\
L 300 700 300 -100 3 0 0 0 -1 -1\r\n\
");

addSymbol("eo_sim", "eo_sim_BC_1.sym", "v 20110115 2\r\n\
T 950 1300 5 10 1 1 0 0 1\r\n\
refdes=U?\r\n\
T 850 1100 5 10 1 1 0 0 1\r\n\
device=BC_1\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
model=simlib\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
primitive=true\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
Td=1 ns\r\n\
P 0 1400 200 1400 1 0 0\r\n\
{\r\n\
T 50 1400 5 10 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 250 1400 5 10 1 1 0 0 1\r\n\
pinlabel=DIN\r\n\
T 0 1400 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 1400 5 10 0 1 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
P 0 1200 200 1200 1 0 0\r\n\
{\r\n\
T 50 1200 5 10 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 250 1200 5 10 1 1 0 0 1\r\n\
pinlabel=CELL_IN\r\n\
T 0 1200 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 1200 5 10 0 1 0 0 1\r\n\
pinseq=2\r\n\
}\r\n\
P 0 1000 200 1000 1 0 0\r\n\
{\r\n\
T 50 1000 5 10 0 1 0 0 1\r\n\
pinnumber=3\r\n\
T 250 1000 5 10 1 1 0 0 1\r\n\
pinlabel=SHIFTDR\r\n\
T 0 1000 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 1000 5 10 0 1 0 0 1\r\n\
pinseq=3\r\n\
}\r\n\
P 0 800 200 800 1 0 0\r\n\
{\r\n\
T 50 800 5 10 0 1 0 0 1\r\n\
pinnumber=4\r\n\
T 250 800 5 10 1 1 0 0 1\r\n\
pinlabel=CLOCKDR\r\n\
T 0 800 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 800 5 10 0 1 0 0 1\r\n\
pinseq=4\r\n\
}\r\n\
P 0 600 200 600 1 0 0\r\n\
{\r\n\
T 50 600 5 10 0 1 0 0 1\r\n\
pinnumber=5\r\n\
T 250 600 5 10 1 1 0 0 1\r\n\
pinlabel=UPDATEDR\r\n\
T 0 600 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 600 5 10 0 1 0 0 1\r\n\
pinseq=5\r\n\
}\r\n\
P 0 400 200 400 1 0 0\r\n\
{\r\n\
T 50 400 5 10 0 1 0 0 1\r\n\
pinnumber=6\r\n\
T 250 400 5 10 1 1 0 0 1\r\n\
pinlabel=MODE\r\n\
T 0 400 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 400 5 10 0 1 0 0 1\r\n\
pinseq=6\r\n\
}\r\n\
P 1700 1400 1900 1400 1 0 1\r\n\
{\r\n\
T 1700 1400 5 10 0 1 0 0 1\r\n\
pinnumber=8\r\n\
T 1350 1400 5 10 1 1 0 0 1\r\n\
pinlabel=DOUT\r\n\
T 1700 1400 5 10 0 1 0 0 1\r\n\
pintype=out\r\n\
T 1700 1400 5 10 0 1 0 0 1\r\n\
pinseq=8\r\n\
}\r\n\
P 1700 1200 1900 1200 1 0 1\r\n\
{\r\n\
T 1700 1200 5 10 0 1 0 0 1\r\n\
pinnumber=7\r\n\
T 1150 1200 5 10 1 1 0 0 1\r\n\
pinlabel=CELL_OUT\r\n\
T 1700 1200 5 10 0 1 0 0 1\r\n\
pintype=out\r\n\
T 1700 1200 5 10 0 1 0 0 1\r\n\
pinseq=7\r\n\
}\r\n\
B 200 100 1500 1500 3 3 0 0 0 0 0 0 0 0 0 0\r\n\
");

addSymbol("eo_sim", "eo_sim_BC_2.sym", "v 20110115 2\r\n\
T 950 1300 5 10 1 1 0 0 1\r\n\
refdes=U?\r\n\
T 850 1100 5 10 1 1 0 0 1\r\n\
device=BC_2\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
model=simlib\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
primitive=true\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
Td=1 ns\r\n\
P 0 1400 200 1400 1 0 0\r\n\
{\r\n\
T 50 1400 5 10 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 250 1400 5 10 1 1 0 0 1\r\n\
pinlabel=DIN\r\n\
T 0 1400 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 1400 5 10 0 1 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
P 0 1200 200 1200 1 0 0\r\n\
{\r\n\
T 50 1200 5 10 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 250 1200 5 10 1 1 0 0 1\r\n\
pinlabel=CELL_IN\r\n\
T 0 1200 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 1200 5 10 0 1 0 0 1\r\n\
pinseq=2\r\n\
}\r\n\
P 0 1000 200 1000 1 0 0\r\n\
{\r\n\
T 50 1000 5 10 0 1 0 0 1\r\n\
pinnumber=3\r\n\
T 250 1000 5 10 1 1 0 0 1\r\n\
pinlabel=SHIFTDR\r\n\
T 0 1000 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 1000 5 10 0 1 0 0 1\r\n\
pinseq=3\r\n\
}\r\n\
P 0 800 200 800 1 0 0\r\n\
{\r\n\
T 50 800 5 10 0 1 0 0 1\r\n\
pinnumber=4\r\n\
T 250 800 5 10 1 1 0 0 1\r\n\
pinlabel=CLOCKDR\r\n\
T 0 800 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 800 5 10 0 1 0 0 1\r\n\
pinseq=4\r\n\
}\r\n\
P 0 600 200 600 1 0 0\r\n\
{\r\n\
T 50 600 5 10 0 1 0 0 1\r\n\
pinnumber=5\r\n\
T 250 600 5 10 1 1 0 0 1\r\n\
pinlabel=UPDATEDR\r\n\
T 0 600 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 600 5 10 0 1 0 0 1\r\n\
pinseq=5\r\n\
}\r\n\
P 0 400 200 400 1 0 0\r\n\
{\r\n\
T 50 400 5 10 0 1 0 0 1\r\n\
pinnumber=6\r\n\
T 250 400 5 10 1 1 0 0 1\r\n\
pinlabel=MODE\r\n\
T 0 400 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 400 5 10 0 1 0 0 1\r\n\
pinseq=6\r\n\
}\r\n\
P 1700 1400 1900 1400 1 0 1\r\n\
{\r\n\
T 1700 1400 5 10 0 1 0 0 1\r\n\
pinnumber=8\r\n\
T 1350 1400 5 10 1 1 0 0 1\r\n\
pinlabel=DOUT\r\n\
T 1700 1400 5 10 0 1 0 0 1\r\n\
pintype=out\r\n\
T 1700 1400 5 10 0 1 0 0 1\r\n\
pinseq=8\r\n\
}\r\n\
P 1700 1200 1900 1200 1 0 1\r\n\
{\r\n\
T 1700 1200 5 10 0 1 0 0 1\r\n\
pinnumber=7\r\n\
T 1150 1200 5 10 1 1 0 0 1\r\n\
pinlabel=CELL_OUT\r\n\
T 1700 1200 5 10 0 1 0 0 1\r\n\
pintype=out\r\n\
T 1700 1200 5 10 0 1 0 0 1\r\n\
pinseq=7\r\n\
}\r\n\
B 200 100 1500 1500 3 3 0 0 0 0 0 0 0 0 0 0\r\n\
");

addSymbol("eo_sim", "eo_sim_BC_7.sym", "v 20110115 2\r\n\
T 950 1900 5 10 1 1 0 0 1\r\n\
refdes=U?\r\n\
T 850 1700 5 10 1 1 0 0 1\r\n\
device=BC_7\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
model=simlib\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
primitive=true\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
Td=1 ns\r\n\
P 0 2000 200 2000 1 0 0\r\n\
{\r\n\
T 50 2000 5 10 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 250 2000 5 10 1 1 0 0 1\r\n\
pinlabel=DIN\r\n\
T 0 2000 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 2000 5 10 0 1 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
P 0 1800 200 1800 1 0 0\r\n\
{\r\n\
T 50 1800 5 10 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 250 1800 5 10 1 1 0 0 1\r\n\
pinlabel=CELL_IN\r\n\
T 0 1800 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 1800 5 10 0 1 0 0 1\r\n\
pinseq=2\r\n\
}\r\n\
P 0 1600 200 1600 1 0 0\r\n\
{\r\n\
T 50 1600 5 10 0 1 0 0 1\r\n\
pinnumber=3\r\n\
T 250 1600 5 10 1 1 0 0 1\r\n\
pinlabel=SHIFTDR\r\n\
T 0 1600 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 1600 5 10 0 1 0 0 1\r\n\
pinseq=3\r\n\
}\r\n\
P 0 1400 200 1400 1 0 0\r\n\
{\r\n\
T 50 1400 5 10 0 1 0 0 1\r\n\
pinnumber=4\r\n\
T 250 1400 5 10 1 1 0 0 1\r\n\
pinlabel=CLOCKDR\r\n\
T 0 1400 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 1400 5 10 0 1 0 0 1\r\n\
pinseq=4\r\n\
}\r\n\
P 0 1200 200 1200 1 0 0\r\n\
{\r\n\
T 50 1200 5 10 0 1 0 0 1\r\n\
pinnumber=5\r\n\
T 250 1200 5 10 1 1 0 0 1\r\n\
pinlabel=UPDATEDR\r\n\
T 0 1200 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 1200 5 10 0 1 0 0 1\r\n\
pinseq=5\r\n\
}\r\n\
P 0 1000 200 1000 1 0 0\r\n\
{\r\n\
T 50 1000 5 10 0 1 0 0 1\r\n\
pinnumber=6\r\n\
T 250 1000 5 10 1 1 0 0 1\r\n\
pinlabel=MODE\r\n\
T 0 1000 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 1000 5 10 0 1 0 0 1\r\n\
pinseq=6\r\n\
}\r\n\
P 0 800 200 800 1 0 0\r\n\
{\r\n\
T 50 800 5 10 0 1 0 0 1\r\n\
pinnumber=7\r\n\
T 250 800 5 10 1 1 0 0 1\r\n\
pinlabel=MODE_2\r\n\
T 0 800 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 800 5 10 0 1 0 0 1\r\n\
pinseq=7\r\n\
}\r\n\
P 0 600 200 600 1 0 0\r\n\
{\r\n\
T 50 600 5 10 0 1 0 0 1\r\n\
pinnumber=8\r\n\
T 250 600 5 10 1 1 0 0 1\r\n\
pinlabel=OCONTROL\r\n\
T 0 600 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 600 5 10 0 1 0 0 1\r\n\
pinseq=8\r\n\
}\r\n\
P 0 400 200 400 1 0 0\r\n\
{\r\n\
T 50 400 5 10 0 1 0 0 1\r\n\
pinnumber=9\r\n\
T 250 400 5 10 1 1 0 0 1\r\n\
pinlabel=SYS_IN\r\n\
T 0 400 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 400 5 10 0 1 0 0 1\r\n\
pinseq=9\r\n\
}\r\n\
P 1700 2000 1900 2000 1 0 1\r\n\
{\r\n\
T 1700 2000 5 10 0 1 0 0 1\r\n\
pinnumber=12\r\n\
T 1350 2000 5 10 1 1 0 0 1\r\n\
pinlabel=DOUT\r\n\
T 1700 2000 5 10 0 1 0 0 1\r\n\
pintype=out\r\n\
T 1700 2000 5 10 0 1 0 0 1\r\n\
pinseq=12\r\n\
}\r\n\
P 1700 1800 1900 1800 1 0 1\r\n\
{\r\n\
T 1700 1800 5 10 0 1 0 0 1\r\n\
pinnumber=11\r\n\
T 1200 1800 5 10 1 1 0 0 1\r\n\
pinlabel=SYS_OUT\r\n\
T 1700 1800 5 10 0 1 0 0 1\r\n\
pintype=out\r\n\
T 1700 1800 5 10 0 1 0 0 1\r\n\
pinseq=11\r\n\
}\r\n\
P 1700 1600 1900 1600 1 0 1\r\n\
{\r\n\
T 1700 1600 5 10 0 1 0 0 1\r\n\
pinnumber=10\r\n\
T 1150 1600 5 10 1 1 0 0 1\r\n\
pinlabel=CELL_OUT\r\n\
T 1700 1600 5 10 0 1 0 0 1\r\n\
pintype=out\r\n\
T 1700 1600 5 10 0 1 0 0 1\r\n\
pinseq=10\r\n\
}\r\n\
B 200 100 1500 2100 3 3 0 0 0 0 0 0 0 0 0 0\r\n\
");

addSymbol("eo_sim", "eo_sim_clock.sym", "v 20110115 2\r\n\
T 950 500 5 10 1 1 0 0 1\r\n\
refdes=U?\r\n\
T 850 300 5 10 1 1 0 0 1\r\n\
device=clock\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
model=simlib\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
primitive=true\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
Tp=100 ns\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
Th=50 ns\r\n\
P 0 600 200 600 1 0 0\r\n\
{\r\n\
T 50 600 5 10 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 250 600 5 10 1 1 0 0 1\r\n\
pinlabel=RESET_N\r\n\
T 0 600 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 600 5 10 0 1 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
P 0 400 200 400 1 0 0\r\n\
{\r\n\
T 50 400 5 10 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 250 400 5 10 1 1 0 0 1\r\n\
pinlabel=ENABLE\r\n\
T 0 400 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 400 5 10 0 1 0 0 1\r\n\
pinseq=2\r\n\
}\r\n\
P 1700 600 1900 600 1 0 1\r\n\
{\r\n\
T 1700 600 5 10 0 1 0 0 1\r\n\
pinnumber=3\r\n\
T 1400 600 5 10 1 1 0 0 1\r\n\
pinlabel=CLK\r\n\
T 1700 600 5 10 0 1 0 0 1\r\n\
pintype=out\r\n\
T 1700 600 5 10 0 1 0 0 1\r\n\
pinseq=3\r\n\
}\r\n\
B 200 100 1500 700 3 3 0 0 0 0 0 0 0 0 0 0\r\n\
");

addSymbol("eo_sim", "eo_sim_conjunction.sym", "v 20110115 2\r\n\
T 500 700 5 10 1 1 0 0 1\r\n\
refdes=U?\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
logicfunction=conjunction\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
device=conjunction2\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
model=simlib\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
primitive=true\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
Td=3 ns\r\n\
T 600 300 10 10 1 1 0 0 1\r\n\
C\r\n\
L 200 0 200 600 3 0 0 0 -1 -1\r\n\
L 300 0 700 0 3 0 0 0 -1 -1\r\n\
L 300 0 300 600 3 0 0 0 -1 -1\r\n\
L 300 600 700 600 3 0 0 0 -1 -1\r\n\
A 700 300 300 270 180 3 0 0 0 -1 -1\r\n\
P 1000 300 1300 300 1 0 1\r\n\
{\r\n\
T 1000 300 5 10 0 1 0 0 1\r\n\
pinnumber=3\r\n\
T 1000 300 5 10 0 1 0 0 1\r\n\
pinlabel=Y\r\n\
T 1000 300 5 10 0 1 0 0 1\r\n\
pintype=out\r\n\
T 1000 300 5 10 0 1 0 0 1\r\n\
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
");

addSymbol("eo_sim", "eo_sim_count161.sym", "v 20110115 2\r\n\
T 950 1100 5 10 1 1 0 0 1\r\n\
refdes=U?\r\n\
T 850 900 5 10 1 1 0 0 1\r\n\
device=count161\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
model=simlib\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
primitive=true\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
Td=2 ns\r\n\
P 0 1200 200 1200 1 0 0\r\n\
{\r\n\
T 50 1200 5 10 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 250 1200 5 10 1 1 0 0 1\r\n\
pinlabel=LD_N\r\n\
T 0 1200 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 1200 5 10 0 1 0 0 1\r\n\
pinseq=1\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
comment=\r\n\
}\r\n\
P 0 1000 200 1000 1 0 0\r\n\
{\r\n\
T 50 1000 5 10 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 250 1000 5 10 1 1 0 0 1\r\n\
pinlabel=CLK\r\n\
T 0 1000 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 1000 5 10 0 1 0 0 1\r\n\
pinseq=2\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
comment=\r\n\
}\r\n\
P 0 800 200 800 1 0 0\r\n\
{\r\n\
T 50 800 5 10 0 1 0 0 1\r\n\
pinnumber=3\r\n\
T 250 800 5 10 1 1 0 0 1\r\n\
pinlabel=P\r\n\
T 0 800 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 800 5 10 0 1 0 0 1\r\n\
pinseq=3\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
comment=\r\n\
}\r\n\
P 0 600 200 600 1 0 0\r\n\
{\r\n\
T 50 600 5 10 0 1 0 0 1\r\n\
pinnumber=4\r\n\
T 250 600 5 10 1 1 0 0 1\r\n\
pinlabel=T\r\n\
T 0 600 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 600 5 10 0 1 0 0 1\r\n\
pinseq=4\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
comment=\r\n\
}\r\n\
P 0 400 200 400 1 0 0\r\n\
{\r\n\
T 50 400 5 10 0 1 0 0 1\r\n\
pinnumber=5\r\n\
T 250 400 5 10 1 1 0 0 1\r\n\
pinlabel=CLR_N\r\n\
T 0 400 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 400 5 10 0 1 0 0 1\r\n\
pinseq=5\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
comment=\r\n\
}\r\n\
P 600 100 600 -100 1 0 1\r\n\
{\r\n\
T 600 0 5 10 0 1 0 0 1\r\n\
pinnumber=6\r\n\
T 600 150 5 10 1 1 0 0 1\r\n\
pinlabel=QA\r\n\
T 600 100 5 10 0 1 0 0 1\r\n\
pintype=out\r\n\
T 600 100 5 10 0 1 0 0 1\r\n\
pinseq=6\r\n\
}\r\n\
P 800 100 800 -100 1 0 1\r\n\
{\r\n\
T 800 0 5 10 0 1 0 0 1\r\n\
pinnumber=7\r\n\
T 800 150 5 10 1 1 0 0 1\r\n\
pinlabel=QB\r\n\
T 800 100 5 10 0 1 0 0 1\r\n\
pintype=out\r\n\
T 800 100 5 10 0 1 0 0 1\r\n\
pinseq=7\r\n\
}\r\n\
P 1000 100 1000 -100 1 0 1\r\n\
{\r\n\
T 1000 0 5 10 0 1 0 0 1\r\n\
pinnumber=8\r\n\
T 1000 150 5 10 1 1 0 0 1\r\n\
pinlabel=QC\r\n\
T 1000 100 5 10 0 1 0 0 1\r\n\
pintype=out\r\n\
T 1000 100 5 10 0 1 0 0 1\r\n\
pinseq=8\r\n\
}\r\n\
P 1200 100 1200 -100 1 0 1\r\n\
{\r\n\
T 1200 0 5 10 0 1 0 0 1\r\n\
pinnumber=9\r\n\
T 1200 150 5 10 1 1 0 0 1\r\n\
pinlabel=QD\r\n\
T 1200 100 5 10 0 1 0 0 1\r\n\
pintype=out\r\n\
T 1200 100 5 10 0 1 0 0 1\r\n\
pinseq=9\r\n\
}\r\n\
P 1700 1200 1900 1200 1 0 1\r\n\
{\r\n\
T 1700 1200 5 10 0 1 0 0 1\r\n\
pinnumber=10\r\n\
T 1500 1200 5 10 1 1 0 0 1\r\n\
pinlabel=CY\r\n\
T 1700 1200 5 10 0 1 0 0 1\r\n\
pintype=out\r\n\
T 1700 1200 5 10 0 1 0 0 1\r\n\
pinseq=10\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
comment=\r\n\
}\r\n\
P 600 1400 600 1600 1 0 1\r\n\
{\r\n\
T 600 1500 5 10 0 1 0 0 1\r\n\
pinnumber=14\r\n\
T 600 1300 5 10 1 1 0 0 1\r\n\
pinlabel=A\r\n\
T 600 1400 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 600 1400 5 10 0 1 0 0 1\r\n\
pinseq=14\r\n\
}\r\n\
P 800 1400 800 1600 1 0 1\r\n\
{\r\n\
T 800 1500 5 10 0 1 0 0 1\r\n\
pinnumber=13\r\n\
T 800 1300 5 10 1 1 0 0 1\r\n\
pinlabel=B\r\n\
T 800 1400 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 800 1400 5 10 0 1 0 0 1\r\n\
pinseq=13\r\n\
}\r\n\
P 1000 1400 1000 1600 1 0 1\r\n\
{\r\n\
T 1000 1500 5 10 0 1 0 0 1\r\n\
pinnumber=12\r\n\
T 1000 1300 5 10 1 1 0 0 1\r\n\
pinlabel=C\r\n\
T 1000 1400 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 1000 1400 5 10 0 1 0 0 1\r\n\
pinseq=12\r\n\
}\r\n\
P 1200 1400 1200 1600 1 0 1\r\n\
{\r\n\
T 1200 1500 5 10 0 1 0 0 1\r\n\
pinnumber=11\r\n\
T 1200 1300 5 10 1 1 0 0 1\r\n\
pinlabel=D\r\n\
T 1200 1400 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 1200 1400 5 10 0 1 0 0 1\r\n\
pinseq=11\r\n\
}\r\n\
B 200 100 1500 1300 3 3 0 0 0 0 0 0 0 0 0 0\r\n\
");

addSymbol("eo_sim", "eo_sim_decode_3_8.sym", "v 20110115 2\r\n\
T 950 1700 5 10 1 1 0 0 1\r\n\
refdes=U?\r\n\
T 850 1500 5 10 1 1 0 0 1\r\n\
device=decode_3_8\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
model=simlib\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
primitive=true\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
Td=1 ns\r\n\
P 0 1800 200 1800 1 0 0\r\n\
{\r\n\
T 50 1800 5 10 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 250 1800 5 10 1 1 0 0 1\r\n\
pinlabel=EN_N\r\n\
T 0 1800 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 1800 5 10 0 1 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
P 0 1600 200 1600 1 0 0\r\n\
{\r\n\
T 50 1600 5 10 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 250 1600 5 10 1 1 0 0 1\r\n\
pinlabel=S0\r\n\
T 0 1600 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 1600 5 10 0 1 0 0 1\r\n\
pinseq=2\r\n\
}\r\n\
P 0 1400 200 1400 1 0 0\r\n\
{\r\n\
T 50 1400 5 10 0 1 0 0 1\r\n\
pinnumber=3\r\n\
T 250 1400 5 10 1 1 0 0 1\r\n\
pinlabel=S1\r\n\
T 0 1400 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 1400 5 10 0 1 0 0 1\r\n\
pinseq=3\r\n\
}\r\n\
P 0 1200 200 1200 1 0 0\r\n\
{\r\n\
T 50 1200 5 10 0 1 0 0 1\r\n\
pinnumber=4\r\n\
T 250 1200 5 10 1 1 0 0 1\r\n\
pinlabel=S2\r\n\
T 0 1200 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 1200 5 10 0 1 0 0 1\r\n\
pinseq=4\r\n\
}\r\n\
P 1700 1800 1900 1800 1 0 1\r\n\
{\r\n\
T 1700 1800 5 10 0 1 0 0 1\r\n\
pinnumber=12\r\n\
T 1500 1800 5 10 1 1 0 0 1\r\n\
pinlabel=D7\r\n\
T 1700 1800 5 10 0 1 0 0 1\r\n\
pintype=out\r\n\
T 1700 1800 5 10 0 1 0 0 1\r\n\
pinseq=12\r\n\
}\r\n\
P 1700 1600 1900 1600 1 0 1\r\n\
{\r\n\
T 1700 1600 5 10 0 1 0 0 1\r\n\
pinnumber=11\r\n\
T 1500 1600 5 10 1 1 0 0 1\r\n\
pinlabel=D6\r\n\
T 1700 1600 5 10 0 1 0 0 1\r\n\
pintype=out\r\n\
T 1700 1600 5 10 0 1 0 0 1\r\n\
pinseq=11\r\n\
}\r\n\
P 1700 1400 1900 1400 1 0 1\r\n\
{\r\n\
T 1700 1400 5 10 0 1 0 0 1\r\n\
pinnumber=10\r\n\
T 1500 1400 5 10 1 1 0 0 1\r\n\
pinlabel=D5\r\n\
T 1700 1400 5 10 0 1 0 0 1\r\n\
pintype=out\r\n\
T 1700 1400 5 10 0 1 0 0 1\r\n\
pinseq=10\r\n\
}\r\n\
P 1700 1200 1900 1200 1 0 1\r\n\
{\r\n\
T 1700 1200 5 10 0 1 0 0 1\r\n\
pinnumber=9\r\n\
T 1500 1200 5 10 1 1 0 0 1\r\n\
pinlabel=D4\r\n\
T 1700 1200 5 10 0 1 0 0 1\r\n\
pintype=out\r\n\
T 1700 1200 5 10 0 1 0 0 1\r\n\
pinseq=9\r\n\
}\r\n\
P 1700 1000 1900 1000 1 0 1\r\n\
{\r\n\
T 1700 1000 5 10 0 1 0 0 1\r\n\
pinnumber=8\r\n\
T 1500 1000 5 10 1 1 0 0 1\r\n\
pinlabel=D3\r\n\
T 1700 1000 5 10 0 1 0 0 1\r\n\
pintype=out\r\n\
T 1700 1000 5 10 0 1 0 0 1\r\n\
pinseq=8\r\n\
}\r\n\
P 1700 800 1900 800 1 0 1\r\n\
{\r\n\
T 1700 800 5 10 0 1 0 0 1\r\n\
pinnumber=7\r\n\
T 1500 800 5 10 1 1 0 0 1\r\n\
pinlabel=D2\r\n\
T 1700 800 5 10 0 1 0 0 1\r\n\
pintype=out\r\n\
T 1700 800 5 10 0 1 0 0 1\r\n\
pinseq=7\r\n\
}\r\n\
P 1700 600 1900 600 1 0 1\r\n\
{\r\n\
T 1700 600 5 10 0 1 0 0 1\r\n\
pinnumber=6\r\n\
T 1500 600 5 10 1 1 0 0 1\r\n\
pinlabel=D1\r\n\
T 1700 600 5 10 0 1 0 0 1\r\n\
pintype=out\r\n\
T 1700 600 5 10 0 1 0 0 1\r\n\
pinseq=6\r\n\
}\r\n\
P 1700 400 1900 400 1 0 1\r\n\
{\r\n\
T 1700 400 5 10 0 1 0 0 1\r\n\
pinnumber=5\r\n\
T 1500 400 5 10 1 1 0 0 1\r\n\
pinlabel=D0\r\n\
T 1700 400 5 10 0 1 0 0 1\r\n\
pintype=out\r\n\
T 1700 400 5 10 0 1 0 0 1\r\n\
pinseq=5\r\n\
}\r\n\
B 200 100 1500 1900 3 3 0 0 0 0 0 0 0 0 0 0\r\n\
");

addSymbol("eo_sim", "eo_sim_delay.sym", "v 20110115 2\r\n\
T 950 400 5 10 1 1 0 0 1\r\n\
refdes=U?\r\n\
T 850 200 5 10 1 1 0 0 1\r\n\
device=delay\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
model=simlib\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
primitive=true\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
Tdelay=100 ns\r\n\
P 0 500 200 500 1 0 0\r\n\
{\r\n\
T 50 500 5 10 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 250 500 5 10 1 1 0 0 1\r\n\
pinlabel=DIN\r\n\
T 0 500 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 500 5 10 0 1 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
P 1700 500 1900 500 1 0 1\r\n\
{\r\n\
T 1700 500 5 10 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 1300 500 5 10 1 1 0 0 1\r\n\
pinlabel=DOUT\r\n\
T 1700 500 5 10 0 1 0 0 1\r\n\
pintype=out\r\n\
T 1700 500 5 10 0 1 0 0 1\r\n\
pinseq=2\r\n\
}\r\n\
B 200 100 1500 600 3 3 0 0 0 0 0 0 0 0 0 0\r\n\
");

addSymbol("eo_sim", "eo_sim_dff_cs.sym", "v 20110115 2\r\n\
T 500 950 5 10 1 1 0 1 1\r\n\
device=dff_cs\r\n\
T 600 1100 5 10 1 1 0 1 1\r\n\
refdes=U?\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
model=simlib\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
primitive=true\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
Td=2 ns\r\n\
P 0 1200 200 1200 1 0 0\r\n\
{\r\n\
T 50 1200 5 8 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 250 1200 5 8 1 1 0 0 1\r\n\
pinlabel=D\r\n\
T 0 1200 5 8 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 1200 5 8 0 1 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
P 0 1000 200 1000 1 0 0\r\n\
{\r\n\
T 50 1000 5 8 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 250 1000 5 8 1 1 0 0 1\r\n\
pinlabel=CLK\r\n\
T 0 1000 5 8 0 1 0 0 1\r\n\
pintype=clk\r\n\
T 0 1000 5 8 0 1 0 0 1\r\n\
pinseq=2\r\n\
}\r\n\
P 0 800 200 800 1 0 0\r\n\
{\r\n\
T 50 800 5 8 0 1 0 0 1\r\n\
pinnumber=3\r\n\
T 250 800 5 8 1 1 0 0 1\r\n\
pinlabel=SIN\r\n\
T 0 800 5 8 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 800 5 8 0 1 0 0 1\r\n\
pinseq=3\r\n\
}\r\n\
P 0 600 200 600 1 0 0\r\n\
{\r\n\
T 50 600 5 8 0 1 0 0 1\r\n\
pinnumber=4\r\n\
T 250 600 5 8 1 1 0 0 1\r\n\
pinlabel=M1\r\n\
T 0 600 5 8 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 600 5 8 0 1 0 0 1\r\n\
pinseq=4\r\n\
}\r\n\
P 0 400 200 400 1 0 0\r\n\
{\r\n\
T 50 400 5 8 0 1 0 0 1\r\n\
pinnumber=5\r\n\
T 250 400 5 8 1 1 0 0 1\r\n\
pinlabel=M0\r\n\
T 0 400 5 8 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 400 5 8 0 1 0 0 1\r\n\
pinseq=5\r\n\
}\r\n\
P 600 200 600 0 1 0 1\r\n\
{\r\n\
T 400 100 5 8 0 1 0 0 1\r\n\
pinnumber=6\r\n\
T 400 250 5 8 1 1 0 0 1\r\n\
pinlabel=RESET_N\r\n\
T 400 200 5 8 0 1 0 0 1\r\n\
pintype=in\r\n\
T 400 200 5 8 0 1 0 0 1\r\n\
pinseq=6\r\n\
}\r\n\
P 1000 1200 1200 1200 1 0 1\r\n\
{\r\n\
T 1000 1200 5 8 0 1 0 0 1\r\n\
pinnumber=8\r\n\
T 800 1200 5 8 1 1 0 0 1\r\n\
pinlabel=Q\r\n\
T 1000 1200 5 8 0 1 0 0 1\r\n\
pintype=out\r\n\
T 1000 1200 5 8 0 1 0 0 1\r\n\
pinseq=8\r\n\
}\r\n\
P 1000 800 1200 800 1 0 1\r\n\
{\r\n\
T 1000 800 5 8 0 1 0 0 1\r\n\
pinnumber=7\r\n\
T 750 800 5 8 1 1 0 0 1\r\n\
pinlabel=SOUT\r\n\
T 1000 800 5 8 0 1 0 0 1\r\n\
pintype=out\r\n\
T 1000 800 5 8 0 1 0 0 1\r\n\
pinseq=7\r\n\
}\r\n\
P 600 1400 600 1600 1 0 1\r\n\
{\r\n\
T 400 1400 5 8 0 1 0 0 1\r\n\
pinnumber=9\r\n\
T 400 1300 5 8 1 1 0 0 1\r\n\
pinlabel=PRESET_N\r\n\
T 400 1400 5 8 0 1 0 0 1\r\n\
pintype=in\r\n\
T 400 1400 5 8 0 1 0 0 1\r\n\
pinseq=9\r\n\
}\r\n\
B 200 200 800 1200 3 3 0 0 0 0 0 0 0 0 0 0\r\n\
");

addSymbol("eo_sim", "eo_sim_dff.sym", "v 20110115 2\r\n\
T 0 -150 5 10 0 1 0 0 1\r\n\
device=dff\r\n\
T 100 100 5 10 1 1 0 0 1\r\n\
refdes=U?\r\n\
T 10 10 5 10 0 1 0 0 1\r\n\
model=simlib\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
primitive=true\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
Td=2 ns\r\n\
P 500 100 500 300 1 0 0\r\n\
{\r\n\
T 500 100 5 10 0 1 0 0 1\r\n\
pinnumber=5\r\n\
T 450 350 5 10 1 1 0 0 1\r\n\
pinlabel=RN\r\n\
T 500 100 5 10 0 1 0 0 1\r\n\
pintype=clk\r\n\
T 500 100 5 10 0 1 0 0 1\r\n\
pinseq=1\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
comment=RESET_N\r\n\
}\r\n\
P 0 1100 200 1100 1 0 0\r\n\
{\r\n\
T 0 1100 5 10 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 300 1100 5 10 1 1 0 0 1\r\n\
pinlabel=D\r\n\
T 0 1100 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 1100 5 10 0 1 0 0 1\r\n\
pinseq=2\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
comment=\r\n\
}\r\n\
P 0 600 200 600 1 0 0\r\n\
{\r\n\
T 0 600 5 10 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 300 600 5 10 1 1 0 0 1\r\n\
pinlabel=CLK\r\n\
T 0 600 5 10 0 1 0 0 1\r\n\
pintype=clk\r\n\
T 0 600 5 10 0 1 0 0 1\r\n\
pinseq=3\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
comment=\r\n\
}\r\n\
P 800 1100 1000 1100 1 0 1\r\n\
{\r\n\
T 800 1100 5 10 0 1 0 0 1\r\n\
pinnumber=3\r\n\
T 700 1100 5 10 1 1 0 0 1\r\n\
pinlabel=Q\r\n\
T 800 1100 5 10 0 1 0 0 1\r\n\
pintype=out\r\n\
T 800 1100 5 10 0 1 0 0 1\r\n\
pinseq=4\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
comment=\r\n\
}\r\n\
L 200 700 300 600 3 3 0 0 0 0\r\n\
L 300 600 200 500 3 3 0 0 0 0\r\n\
B 200 300 600 999 3 3 0 0 0 0 0 0 0 0 0 0\r\n\
P 800 600 1000 600 1 0 1\r\n\
{\r\n\
T 800 600 5 10 0 1 0 0 1\r\n\
pinnumber=4\r\n\
T 600 600 5 10 1 1 0 0 1\r\n\
pinlabel=QN\r\n\
T 800 600 5 10 0 1 0 0 1\r\n\
pintype=out\r\n\
T 800 600 5 10 0 1 0 0 1\r\n\
pinseq=5\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
comment=\r\n\
}\r\n\
P 500 1500 500 1300 1 0 0\r\n\
{\r\n\
T 500 1500 5 10 0 1 0 0 1\r\n\
pinnumber=6\r\n\
T 450 1200 5 10 1 1 0 0 1\r\n\
pinlabel=PN\r\n\
T 500 1500 5 10 0 1 0 0 1\r\n\
pintype=clk\r\n\
T 500 1500 5 10 0 1 0 0 1\r\n\
pinseq=6\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
comment=PRESET_N\r\n\
}\r\n\
");

addSymbol("eo_sim", "eo_sim_inv.sym", "v 20110115 2\r\n\
T 600 900 5 10 0 0 0 0 1\r\n\
device=INV\r\n\
T 300 900 8 10 1 1 0 0 1\r\n\
refdes=U?\r\n\
T 600 3700 5 10 0 0 0 0 1\r\n\
description=INVERTER\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
model=simlib\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
pimitive=true\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
Td=1 ns\r\n\
L 300 800 800 500 3 0 0 0 -1 -1\r\n\
L 800 500 300 200 3 0 0 0 -1 -1\r\n\
L 300 800 300 500 3 0 0 0 -1 -1\r\n\
L 300 500 300 200 3 0 0 0 -1 -1\r\n\
V 850 500 50 6 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
P 300 500 0 500 1 0 1\r\n\
{\r\n\
T 200 550 5 8 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 200 450 5 8 0 1 0 8 1\r\n\
pinseq=1\r\n\
T 350 500 9 8 0 1 0 0 1\r\n\
pinlabel=A\r\n\
T 350 500 5 8 0 1 0 2 1\r\n\
pintype=in\r\n\
}\r\n\
P 1100 500 900 500 1 0 0\r\n\
{\r\n\
T 900 550 5 8 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 900 450 5 8 0 1 0 2 1\r\n\
pinseq=2\r\n\
T 750 500 9 8 0 1 0 6 1\r\n\
pinlabel=Y\r\n\
T 750 500 5 8 0 1 0 8 1\r\n\
pintype=out\r\n\
}\r\n\
");

addSymbol("eo_sim", "eo_sim_jk.sym", "v 20110115 2\r\n\
T 0 -150 5 10 0 1 0 0 1\r\n\
device=jk\r\n\
T 100 200 5 10 1 1 0 0 1\r\n\
refdes=U?\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
model=simlib\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
primitive=true\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
Td =1 ns\r\n\
P 500 100 500 300 1 0 0\r\n\
{\r\n\
T 500 100 5 10 0 1 0 0 1\r\n\
pinnumber=5\r\n\
T 450 350 5 10 1 1 0 0 1\r\n\
pinlabel=RN\r\n\
T 500 100 5 10 0 1 0 0 1\r\n\
pintype=clk\r\n\
T 500 100 5 10 0 1 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
P 0 1100 200 1100 1 0 0\r\n\
{\r\n\
T 0 1100 5 10 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 300 1100 5 10 1 1 0 0 1\r\n\
pinlabel=J\r\n\
T 0 1100 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 1100 5 10 0 1 0 0 1\r\n\
pinseq=2\r\n\
}\r\n\
P 0 800 200 800 1 0 0\r\n\
{\r\n\
T 0 800 5 10 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 300 800 5 10 1 1 0 0 1\r\n\
pinlabel=CLK\r\n\
T 0 800 5 10 0 1 0 0 1\r\n\
pintype=clk\r\n\
T 0 800 5 10 0 1 0 0 1\r\n\
pinseq=3\r\n\
}\r\n\
P 800 1100 1000 1100 1 0 1\r\n\
{\r\n\
T 800 1100 5 10 0 1 0 0 1\r\n\
pinnumber=3\r\n\
T 700 1100 5 10 1 1 0 0 1\r\n\
pinlabel=Q\r\n\
T 800 1100 5 10 0 1 0 0 1\r\n\
pintype=out\r\n\
T 800 1100 5 10 0 1 0 0 1\r\n\
pinseq=4\r\n\
}\r\n\
L 200 900 300 800 3 3 0 0 0 0\r\n\
L 300 800 200 700 3 3 0 0 0 0\r\n\
P 800 600 1000 600 1 0 1\r\n\
{\r\n\
T 800 600 5 10 0 1 0 0 1\r\n\
pinnumber=4\r\n\
T 600 600 5 10 1 1 0 0 1\r\n\
pinlabel=QN\r\n\
T 800 600 5 10 0 1 0 0 1\r\n\
pintype=out\r\n\
T 800 600 5 10 0 1 0 0 1\r\n\
pinseq=5\r\n\
}\r\n\
P 500 1500 500 1300 1 0 0\r\n\
{\r\n\
T 500 1500 5 10 0 1 0 0 1\r\n\
pinnumber=6\r\n\
T 450 1200 5 10 1 1 0 0 1\r\n\
pinlabel=PN\r\n\
T 500 1500 5 10 0 1 0 0 1\r\n\
pintype=clk\r\n\
T 500 1500 5 10 0 1 0 0 1\r\n\
pinseq=6\r\n\
}\r\n\
P 0 500 200 500 1 0 0\r\n\
{\r\n\
T 0 500 5 10 0 1 0 0 1\r\n\
pinnumber=7\r\n\
T 300 500 5 10 1 1 0 0 1\r\n\
pinlabel=K\r\n\
T 0 500 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 500 5 10 0 1 0 0 1\r\n\
pinseq=7\r\n\
}\r\n\
B 200 300 600 999 3 3 0 0 0 0 0 0 0 0 0 0\r\n\
");

addSymbol("eo_sim", "eo_sim_majority3.sym", "v 20110115 2\r\n\
T 500 700 5 10 1 1 0 0 1\r\n\
refdes=U?\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
logicfunction=majority3\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
device=majority3\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
model=simlib\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
primitive=true\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
Td=3 ns\r\n\
T 500 250 5 10 1 1 0 0 1\r\n\
MAJ\r\n\
L 300 0 700 0 3 0 0 0 -1 -1\r\n\
L 300 0 300 600 3 0 0 0 -1 -1\r\n\
L 300 600 700 600 3 0 0 0 -1 -1\r\n\
L 700 0 1000 300 3 0 0 0 -1 -1\r\n\
L 700 600 1000 300 3 0 0 0 -1 -1\r\n\
P 1000 300 1300 300 1 0 1\r\n\
{\r\n\
T 1000 300 5 10 0 1 0 0 1\r\n\
pinnumber=4\r\n\
T 1000 300 5 10 0 1 0 0 1\r\n\
pinlabel=Y\r\n\
T 1000 300 5 10 0 1 0 0 1\r\n\
pintype=out\r\n\
T 1000 300 5 10 0 1 0 0 1\r\n\
pinseq=4\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
comment=\r\n\
}\r\n\
P 0 500 300 500 1 0 0\r\n\
{\r\n\
T 0 500 5 10 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 0 500 5 10 0 1 0 0 1\r\n\
pinlabel=I0\r\n\
T 0 500 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 500 5 10 0 1 0 0 1\r\n\
pinseq=1\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
comment=\r\n\
}\r\n\
P 0 300 300 300 1 0 0\r\n\
{\r\n\
T 0 300 5 10 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 0 300 5 10 0 1 0 0 1\r\n\
pinlabel=I1\r\n\
T 0 300 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 300 5 10 0 1 0 0 1\r\n\
pinseq=2\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
comment=\r\n\
}\r\n\
P 0 100 300 100 1 0 0\r\n\
{\r\n\
T 0 100 5 10 0 1 0 0 1\r\n\
pinnumber=3\r\n\
T 0 100 5 10 0 1 0 0 1\r\n\
pinlabel=I2\r\n\
T 0 100 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 100 5 10 0 1 0 0 1\r\n\
pinseq=3\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
comment=\r\n\
}\r\n\
");


addSymbol("eo_sim", "eo_sim_memory_async_1Kx8.sym", "v 20110115 2\r\n\
T 950 4300 5 10 1 1 0 0 1\r\n\
refdes=U?\r\n\
T 350 4100 5 10 1 1 0 0 1\r\n\
device=memory_async_1Kx8\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
model=simlib\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
primitive=true \r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
Td=5 ns\r\n\
P 0 4400 200 4400 1 0 0\r\n\
{\r\n\
T 50 4400 5 10 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 250 4400 5 10 1 1 0 0 1\r\n\
pinlabel=A\r\n\
T 0 4400 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 4400 5 10 0 1 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
P 0 4200 200 4200 1 0 0\r\n\
{\r\n\
T 50 4200 5 10 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 250 4200 5 10 1 1 0 0 1\r\n\
pinlabel=DIN\r\n\
T 0 4200 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 4200 5 10 0 1 0 0 1\r\n\
pinseq=2\r\n\
}\r\n\
P 0 4000 200 4000 1 0 0\r\n\
{\r\n\
T 50 4000 5 10 0 1 0 0 1\r\n\
pinnumber=3\r\n\
T 250 4000 5 10 1 1 0 0 1\r\n\
pinlabel=WE_N\r\n\
T 0 4000 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 4000 5 10 0 1 0 0 1\r\n\
pinseq=3\r\n\
}\r\n\
P 0 3800 200 3800 1 0 0\r\n\
{\r\n\
T 50 3800 5 10 0 1 0 0 1\r\n\
pinnumber=4\r\n\
T 250 3800 5 10 1 1 0 0 1\r\n\
pinlabel=CS_N\r\n\
T 0 3800 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 3800 5 10 0 1 0 0 1\r\n\
pinseq=4\r\n\
}\r\n\
P 0 3600 200 3600 1 0 0\r\n\
{\r\n\
T 50 3600 5 10 0 1 0 0 1\r\n\
pinnumber=5\r\n\
T 250 3600 5 10 1 1 0 0 1\r\n\
pinlabel=OE_N\r\n\
T 0 3600 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 3600 5 10 0 1 0 0 1\r\n\
pinseq=5\r\n\
}\r\n\
P 0 3400 200 3400 1 0 0\r\n\
{\r\n\
T 50 3400 5 10 0 1 0 0 1\r\n\
pinnumber=6\r\n\
T 250 3400 5 10 1 1 0 0 1\r\n\
pinlabel=DOUT\r\n\
T 0 3400 5 10 0 1 0 0 1\r\n\
pintype=out\r\n\
T 0 3400 5 10 0 1 0 0 1\r\n\
pinseq=6\r\n\
}\r\n\
P 0 3200 200 3200 1 0 0\r\n\
{\r\n\
T 50 3200 5 10 0 1 0 0 1\r\n\
pinnumber=7\r\n\
T 250 3200 5 10 1 1 0 0 1\r\n\
pinlabel=P7\r\n\
T 0 3200 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 3200 5 10 0 1 0 0 1\r\n\
pinseq=7\r\n\
}\r\n\
P 0 3000 200 3000 1 0 0\r\n\
{\r\n\
T 50 3000 5 10 0 1 0 0 1\r\n\
pinnumber=8\r\n\
T 250 3000 5 10 1 1 0 0 1\r\n\
pinlabel=P8\r\n\
T 0 3000 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 3000 5 10 0 1 0 0 1\r\n\
pinseq=8\r\n\
}\r\n\
P 0 2800 200 2800 1 0 0\r\n\
{\r\n\
T 50 2800 5 10 0 1 0 0 1\r\n\
pinnumber=9\r\n\
T 250 2800 5 10 1 1 0 0 1\r\n\
pinlabel=P9\r\n\
T 0 2800 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 2800 5 10 0 1 0 0 1\r\n\
pinseq=9\r\n\
}\r\n\
P 0 2600 200 2600 1 0 0\r\n\
{\r\n\
T 50 2600 5 10 0 1 0 0 1\r\n\
pinnumber=10\r\n\
T 250 2600 5 10 1 1 0 0 1\r\n\
pinlabel=P10\r\n\
T 0 2600 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 2600 5 10 0 1 0 0 1\r\n\
pinseq=10\r\n\
}\r\n\
P 0 2400 200 2400 1 0 0\r\n\
{\r\n\
T 50 2400 5 10 0 1 0 0 1\r\n\
pinnumber=11\r\n\
T 250 2400 5 10 1 1 0 0 1\r\n\
pinlabel=P11\r\n\
T 0 2400 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 2400 5 10 0 1 0 0 1\r\n\
pinseq=11\r\n\
}\r\n\
P 0 2200 200 2200 1 0 0\r\n\
{\r\n\
T 50 2200 5 10 0 1 0 0 1\r\n\
pinnumber=12\r\n\
T 250 2200 5 10 1 1 0 0 1\r\n\
pinlabel=P12\r\n\
T 0 2200 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 2200 5 10 0 1 0 0 1\r\n\
pinseq=12\r\n\
}\r\n\
P 0 2000 200 2000 1 0 0\r\n\
{\r\n\
T 50 2000 5 10 0 1 0 0 1\r\n\
pinnumber=13\r\n\
T 250 2000 5 10 1 1 0 0 1\r\n\
pinlabel=P13\r\n\
T 0 2000 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 2000 5 10 0 1 0 0 1\r\n\
pinseq=13\r\n\
}\r\n\
P 0 1800 200 1800 1 0 0\r\n\
{\r\n\
T 50 1800 5 10 0 1 0 0 1\r\n\
pinnumber=14\r\n\
T 250 1800 5 10 1 1 0 0 1\r\n\
pinlabel=P14\r\n\
T 0 1800 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 1800 5 10 0 1 0 0 1\r\n\
pinseq=14\r\n\
}\r\n\
P 0 1600 200 1600 1 0 0\r\n\
{\r\n\
T 50 1600 5 10 0 1 0 0 1\r\n\
pinnumber=15\r\n\
T 250 1600 5 10 1 1 0 0 1\r\n\
pinlabel=P15\r\n\
T 0 1600 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 1600 5 10 0 1 0 0 1\r\n\
pinseq=15\r\n\
}\r\n\
P 0 1400 200 1400 1 0 0\r\n\
{\r\n\
T 50 1400 5 10 0 1 0 0 1\r\n\
pinnumber=16\r\n\
T 250 1400 5 10 1 1 0 0 1\r\n\
pinlabel=P16\r\n\
T 0 1400 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 1400 5 10 0 1 0 0 1\r\n\
pinseq=16\r\n\
}\r\n\
P 0 1200 200 1200 1 0 0\r\n\
{\r\n\
T 50 1200 5 10 0 1 0 0 1\r\n\
pinnumber=17\r\n\
T 250 1200 5 10 1 1 0 0 1\r\n\
pinlabel=P17\r\n\
T 0 1200 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 1200 5 10 0 1 0 0 1\r\n\
pinseq=17\r\n\
}\r\n\
P 0 1000 200 1000 1 0 0\r\n\
{\r\n\
T 50 1000 5 10 0 1 0 0 1\r\n\
pinnumber=18\r\n\
T 250 1000 5 10 1 1 0 0 1\r\n\
pinlabel=P18\r\n\
T 0 1000 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 1000 5 10 0 1 0 0 1\r\n\
pinseq=18\r\n\
}\r\n\
P 0 800 200 800 1 0 0\r\n\
{\r\n\
T 50 800 5 10 0 1 0 0 1\r\n\
pinnumber=19\r\n\
T 250 800 5 10 1 1 0 0 1\r\n\
pinlabel=P19\r\n\
T 0 800 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 800 5 10 0 1 0 0 1\r\n\
pinseq=19\r\n\
}\r\n\
P 0 600 200 600 1 0 0\r\n\
{\r\n\
T 50 600 5 10 0 1 0 0 1\r\n\
pinnumber=20\r\n\
T 250 600 5 10 1 1 0 0 1\r\n\
pinlabel=P20\r\n\
T 0 600 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 600 5 10 0 1 0 0 1\r\n\
pinseq=20\r\n\
}\r\n\
P 0 400 200 400 1 0 0\r\n\
{\r\n\
T 50 400 5 10 0 1 0 0 1\r\n\
pinnumber=21\r\n\
T 250 400 5 10 1 1 0 0 1\r\n\
pinlabel=P21\r\n\
T 0 400 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 400 5 10 0 1 0 0 1\r\n\
pinseq=21\r\n\
}\r\n\
P 1700 4400 1900 4400 1 0 1\r\n\
{\r\n\
T 1700 4400 5 10 0 1 0 0 1\r\n\
pinnumber=29\r\n\
T 1800 4400 5 10 1 1 0 6 1\r\n\
pinlabel=P29\r\n\
T 1700 4400 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 1700 4400 5 10 0 1 0 0 1\r\n\
pinseq=29\r\n\
}\r\n\
P 1700 4200 1900 4200 1 0 1\r\n\
{\r\n\
T 1700 4200 5 10 0 1 0 0 1\r\n\
pinnumber=28\r\n\
T 1800 4200 5 10 1 1 0 6 1\r\n\
pinlabel=P28\r\n\
T 1700 4200 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 1700 4200 5 10 0 1 0 0 1\r\n\
pinseq=28\r\n\
}\r\n\
P 1700 4000 1900 4000 1 0 1\r\n\
{\r\n\
T 1700 4000 5 10 0 1 0 0 1\r\n\
pinnumber=27\r\n\
T 1800 4000 5 10 1 1 0 6 1\r\n\
pinlabel=P27\r\n\
T 1700 4000 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 1700 4000 5 10 0 1 0 0 1\r\n\
pinseq=27\r\n\
}\r\n\
P 1700 3800 1900 3800 1 0 1\r\n\
{\r\n\
T 1700 3800 5 10 0 1 0 0 1\r\n\
pinnumber=26\r\n\
T 1800 3800 5 10 1 1 0 6 1\r\n\
pinlabel=P26\r\n\
T 1700 3800 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 1700 3800 5 10 0 1 0 0 1\r\n\
pinseq=26\r\n\
}\r\n\
P 1700 3600 1900 3600 1 0 1\r\n\
{\r\n\
T 1700 3600 5 10 0 1 0 0 1\r\n\
pinnumber=25\r\n\
T 1800 3600 5 10 1 1 0 6 1\r\n\
pinlabel=P25\r\n\
T 1700 3600 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 1700 3600 5 10 0 1 0 0 1\r\n\
pinseq=25\r\n\
}\r\n\
P 1700 3400 1900 3400 1 0 1\r\n\
{\r\n\
T 1700 3400 5 10 0 1 0 0 1\r\n\
pinnumber=24\r\n\
T 1800 3400 5 10 1 1 0 6 1\r\n\
pinlabel=P24\r\n\
T 1700 3400 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 1700 3400 5 10 0 1 0 0 1\r\n\
pinseq=24\r\n\
}\r\n\
P 1700 3200 1900 3200 1 0 1\r\n\
{\r\n\
T 1700 3200 5 10 0 1 0 0 1\r\n\
pinnumber=23\r\n\
T 1800 3200 5 10 1 1 0 6 1\r\n\
pinlabel=P23\r\n\
T 1700 3200 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 1700 3200 5 10 0 1 0 0 1\r\n\
pinseq=23\r\n\
}\r\n\
P 1700 3000 1900 3000 1 0 1\r\n\
{\r\n\
T 1700 3000 5 10 0 1 0 0 1\r\n\
pinnumber=22\r\n\
T 1800 3000 5 10 1 1 0 6 1\r\n\
pinlabel=P22\r\n\
T 1700 3000 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 1700 3000 5 10 0 1 0 0 1\r\n\
pinseq=22\r\n\
}\r\n\
B 200 100 1500 4500 3 3 0 0 0 0 0 0 0 0 0 0\r\n\
");

addSymbol("eo_sim", "eo_sim_mux_2_1.sym", "v 20110115 2\r\n\
T 950 900 5 10 1 1 0 0 1\r\n\
refdes=U?\r\n\
T 850 700 5 10 1 1 0 0 1\r\n\
device=mux_2_1\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
model=simlib\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
primitive=true\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
Td=1 ns\r\n\
P 0 1000 200 1000 1 0 0\r\n\
{\r\n\
T 50 1000 5 10 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 250 1000 5 10 1 1 0 0 1\r\n\
pinlabel=EN_N\r\n\
T 0 1000 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 1000 5 10 0 1 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
P 0 800 200 800 1 0 0\r\n\
{\r\n\
T 50 800 5 10 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 250 800 5 10 1 1 0 0 1\r\n\
pinlabel=S0\r\n\
T 0 800 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 800 5 10 0 1 0 0 1\r\n\
pinseq=2\r\n\
}\r\n\
P 0 600 200 600 1 0 0\r\n\
{\r\n\
T 50 600 5 10 0 1 0 0 1\r\n\
pinnumber=3\r\n\
T 250 600 5 10 1 1 0 0 1\r\n\
pinlabel=D0\r\n\
T 0 600 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 600 5 10 0 1 0 0 1\r\n\
pinseq=3\r\n\
}\r\n\
P 0 400 200 400 1 0 0\r\n\
{\r\n\
T 50 400 5 10 0 1 0 0 1\r\n\
pinnumber=4\r\n\
T 250 400 5 10 1 1 0 0 1\r\n\
pinlabel=D1\r\n\
T 0 400 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 400 5 10 0 1 0 0 1\r\n\
pinseq=4\r\n\
}\r\n\
P 1700 1000 1900 1000 1 0 1\r\n\
{\r\n\
T 1700 1000 5 10 0 1 0 0 1\r\n\
pinnumber=5\r\n\
T 1600 1000 5 10 1 1 0 0 1\r\n\
pinlabel=Y\r\n\
T 1700 1000 5 10 0 1 0 0 1\r\n\
pintype=out\r\n\
T 1700 1000 5 10 0 1 0 0 1\r\n\
pinseq=5\r\n\
}\r\n\
B 200 100 1500 1100 3 3 0 0 0 0 0 0 0 0 0 0\r\n\
");

addSymbol("eo_sim", "eo_sim_mux_4_1.sym", "v 20110115 2\r\n\
T 950 1500 5 10 1 1 0 0 1\r\n\
refdes=U?\r\n\
T 850 1300 5 10 1 1 0 0 1\r\n\
device=mux_4_1\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
model=simlib\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
primitive=true\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
Td=1 ns\r\n\
P 0 1600 200 1600 1 0 0\r\n\
{\r\n\
T 50 1600 5 10 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 250 1600 5 10 1 1 0 0 1\r\n\
pinlabel=EN_N\r\n\
T 0 1600 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 1600 5 10 0 1 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
P 0 1400 200 1400 1 0 0\r\n\
{\r\n\
T 50 1400 5 10 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 250 1400 5 10 1 1 0 0 1\r\n\
pinlabel=S0\r\n\
T 0 1400 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 1400 5 10 0 1 0 0 1\r\n\
pinseq=2\r\n\
}\r\n\
P 0 1200 200 1200 1 0 0\r\n\
{\r\n\
T 50 1200 5 10 0 1 0 0 1\r\n\
pinnumber=3\r\n\
T 250 1200 5 10 1 1 0 0 1\r\n\
pinlabel=S1\r\n\
T 0 1200 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 1200 5 10 0 1 0 0 1\r\n\
pinseq=3\r\n\
}\r\n\
P 0 1000 200 1000 1 0 0\r\n\
{\r\n\
T 50 1000 5 10 0 1 0 0 1\r\n\
pinnumber=4\r\n\
T 250 1000 5 10 1 1 0 0 1\r\n\
pinlabel=D0\r\n\
T 0 1000 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 1000 5 10 0 1 0 0 1\r\n\
pinseq=4\r\n\
}\r\n\
P 0 800 200 800 1 0 0\r\n\
{\r\n\
T 50 800 5 10 0 1 0 0 1\r\n\
pinnumber=5\r\n\
T 250 800 5 10 1 1 0 0 1\r\n\
pinlabel=D1\r\n\
T 0 800 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 800 5 10 0 1 0 0 1\r\n\
pinseq=5\r\n\
}\r\n\
P 0 600 200 600 1 0 0\r\n\
{\r\n\
T 50 600 5 10 0 1 0 0 1\r\n\
pinnumber=6\r\n\
T 250 600 5 10 1 1 0 0 1\r\n\
pinlabel=D2\r\n\
T 0 600 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 600 5 10 0 1 0 0 1\r\n\
pinseq=6\r\n\
}\r\n\
P 0 400 200 400 1 0 0\r\n\
{\r\n\
T 50 400 5 10 0 1 0 0 1\r\n\
pinnumber=7\r\n\
T 250 400 5 10 1 1 0 0 1\r\n\
pinlabel=D3\r\n\
T 0 400 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 400 5 10 0 1 0 0 1\r\n\
pinseq=7\r\n\
}\r\n\
P 1700 1600 1900 1600 1 0 1\r\n\
{\r\n\
T 1700 1600 5 10 0 1 0 0 1\r\n\
pinnumber=8\r\n\
T 1600 1600 5 10 1 1 0 0 1\r\n\
pinlabel=Y\r\n\
T 1700 1600 5 10 0 1 0 0 1\r\n\
pintype=out\r\n\
T 1700 1600 5 10 0 1 0 0 1\r\n\
pinseq=8\r\n\
}\r\n\
B 200 100 1500 1700 3 3 0 0 0 0 0 0 0 0 0 0\r\n\
");

addSymbol("eo_sim", "eo_sim_mux_8_1.sym", "v 20110115 2\r\n\
T 950 2500 5 10 1 1 0 0 1\r\n\
refdes=U?\r\n\
T 850 2300 5 10 1 1 0 0 1\r\n\
device=mux_8_1\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
model=simlib\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
primitive=true\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
Td=1 ns\r\n\
P 0 2600 200 2600 1 0 0\r\n\
{\r\n\
T 50 2600 5 10 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 250 2600 5 10 1 1 0 0 1\r\n\
pinlabel=EN_N\r\n\
T 0 2600 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 2600 5 10 0 1 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
P 0 2400 200 2400 1 0 0\r\n\
{\r\n\
T 50 2400 5 10 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 250 2400 5 10 1 1 0 0 1\r\n\
pinlabel=S0\r\n\
T 0 2400 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 2400 5 10 0 1 0 0 1\r\n\
pinseq=2\r\n\
}\r\n\
P 0 2200 200 2200 1 0 0\r\n\
{\r\n\
T 50 2200 5 10 0 1 0 0 1\r\n\
pinnumber=3\r\n\
T 250 2200 5 10 1 1 0 0 1\r\n\
pinlabel=S1\r\n\
T 0 2200 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 2200 5 10 0 1 0 0 1\r\n\
pinseq=3\r\n\
}\r\n\
P 0 2000 200 2000 1 0 0\r\n\
{\r\n\
T 50 2000 5 10 0 1 0 0 1\r\n\
pinnumber=4\r\n\
T 250 2000 5 10 1 1 0 0 1\r\n\
pinlabel=S2\r\n\
T 0 2000 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 2000 5 10 0 1 0 0 1\r\n\
pinseq=4\r\n\
}\r\n\
P 0 1800 200 1800 1 0 0\r\n\
{\r\n\
T 50 1800 5 10 0 1 0 0 1\r\n\
pinnumber=5\r\n\
T 250 1800 5 10 1 1 0 0 1\r\n\
pinlabel=D0\r\n\
T 0 1800 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 1800 5 10 0 1 0 0 1\r\n\
pinseq=5\r\n\
}\r\n\
P 0 1600 200 1600 1 0 0\r\n\
{\r\n\
T 50 1600 5 10 0 1 0 0 1\r\n\
pinnumber=6\r\n\
T 250 1600 5 10 1 1 0 0 1\r\n\
pinlabel=D1\r\n\
T 0 1600 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 1600 5 10 0 1 0 0 1\r\n\
pinseq=6\r\n\
}\r\n\
P 0 1400 200 1400 1 0 0\r\n\
{\r\n\
T 50 1400 5 10 0 1 0 0 1\r\n\
pinnumber=7\r\n\
T 250 1400 5 10 1 1 0 0 1\r\n\
pinlabel=D2\r\n\
T 0 1400 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 1400 5 10 0 1 0 0 1\r\n\
pinseq=7\r\n\
}\r\n\
P 0 1200 200 1200 1 0 0\r\n\
{\r\n\
T 50 1200 5 10 0 1 0 0 1\r\n\
pinnumber=8\r\n\
T 250 1200 5 10 1 1 0 0 1\r\n\
pinlabel=D3\r\n\
T 0 1200 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 1200 5 10 0 1 0 0 1\r\n\
pinseq=8\r\n\
}\r\n\
P 0 1000 200 1000 1 0 0\r\n\
{\r\n\
T 50 1000 5 10 0 1 0 0 1\r\n\
pinnumber=9\r\n\
T 250 1000 5 10 1 1 0 0 1\r\n\
pinlabel=D4\r\n\
T 0 1000 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 1000 5 10 0 1 0 0 1\r\n\
pinseq=9\r\n\
}\r\n\
P 0 800 200 800 1 0 0\r\n\
{\r\n\
T 50 800 5 10 0 1 0 0 1\r\n\
pinnumber=10\r\n\
T 250 800 5 10 1 1 0 0 1\r\n\
pinlabel=D5\r\n\
T 0 800 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 800 5 10 0 1 0 0 1\r\n\
pinseq=10\r\n\
}\r\n\
P 0 600 200 600 1 0 0\r\n\
{\r\n\
T 50 600 5 10 0 1 0 0 1\r\n\
pinnumber=11\r\n\
T 250 600 5 10 1 1 0 0 1\r\n\
pinlabel=D6\r\n\
T 0 600 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 600 5 10 0 1 0 0 1\r\n\
pinseq=11\r\n\
}\r\n\
P 0 400 200 400 1 0 0\r\n\
{\r\n\
T 50 400 5 10 0 1 0 0 1\r\n\
pinnumber=12\r\n\
T 250 400 5 10 1 1 0 0 1\r\n\
pinlabel=D7\r\n\
T 0 400 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 400 5 10 0 1 0 0 1\r\n\
pinseq=12\r\n\
}\r\n\
P 1700 2600 1900 2600 1 0 1\r\n\
{\r\n\
T 1700 2600 5 10 0 1 0 0 1\r\n\
pinnumber=13\r\n\
T 1600 2600 5 10 1 1 0 0 1\r\n\
pinlabel=Y\r\n\
T 1700 2600 5 10 0 1 0 0 1\r\n\
pintype=out\r\n\
T 1700 2600 5 10 0 1 0 0 1\r\n\
pinseq=13\r\n\
}\r\n\
B 200 100 1500 2700 3 3 0 0 0 0 0 0 0 0 0 0\r\n\
");

addSymbol("eo_sim", "eo_sim_nand2.sym", "v 20110115 2\r\n\
T 500 700 5 10 1 1 0 0 1\r\n\
refdes=U?\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
logicfunction=NAND_2\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
device=nand2\r\n\
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
");


addSymbol("eo_sim", "eo_sim_nand3.sym", "v 20110115 2\r\n\
T 500 700 5 10 1 1 0 0 1\r\n\
refdes=U?\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
logicfunction=NAND_3\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
device=nand3\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
model=simlib\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
primitive=true\r\n\
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
pinnumber=4\r\n\
T 1100 300 5 10 0 1 0 0 1\r\n\
pinlabel=Y\r\n\
T 1100 300 5 10 0 1 0 0 1\r\n\
pintype=out\r\n\
T 1100 300 5 10 0 1 0 0 1\r\n\
pinseq=4\r\n\
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
P 0 300 300 300 1 0 0\r\n\
{\r\n\
T 0 300 5 10 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 0 300 5 10 0 1 0 0 1\r\n\
pinlabel=B\r\n\
T 0 300 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 300 5 10 0 1 0 0 1\r\n\
pinseq=2\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
comment=\r\n\
}\r\n\
P 0 100 300 100 1 0 0\r\n\
{\r\n\
T 0 100 5 10 0 1 0 0 1\r\n\
pinnumber=3\r\n\
T 0 100 5 10 0 1 0 0 1\r\n\
pinlabel=C\r\n\
T 0 100 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 100 5 10 0 1 0 0 1\r\n\
pinseq=3\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
comment=\r\n\
}\r\n\
");

addSymbol("eo_sim", "eo_sim_nand4.sym", "v 20110115 2\r\n\
T 500 700 5 10 1 1 0 0 1\r\n\
refdes=U?\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
logicfunction=NAND_4\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
device=nand4\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
model=simlib\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
primitive=true\r\n\
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
pinnumber=5\r\n\
T 1100 300 5 10 0 1 0 0 1\r\n\
pinlabel=Y\r\n\
T 1100 300 5 10 0 1 0 0 1\r\n\
pintype=out\r\n\
T 1100 300 5 10 0 1 0 0 1\r\n\
pinseq=5\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
comment=\r\n\
}\r\n\
P 0 600 300 600 1 0 0\r\n\
{\r\n\
T 0 600 5 10 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 0 600 5 10 0 1 0 0 1\r\n\
pinlabel=A\r\n\
T 0 600 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 600 5 10 0 1 0 0 1\r\n\
pinseq=1\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
comment=\r\n\
}\r\n\
P 0 400 300 400 1 0 0\r\n\
{\r\n\
T 0 400 5 10 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 0 400 5 10 0 1 0 0 1\r\n\
pinlabel=B \r\n\
T 0 400 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 400 5 10 0 1 0 0 1\r\n\
pinseq=2\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
comment=\r\n\
}\r\n\
P 0 200 300 200 1 0 0\r\n\
{\r\n\
T 0 200 5 10 0 1 0 0 1\r\n\
pinnumber=3\r\n\
T 0 200 5 10 0 1 0 0 1\r\n\
pinlabel=C\r\n\
T 0 200 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 200 5 10 0 1 0 0 1\r\n\
pinseq=3\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
comment=\r\n\
}\r\n\
P 0 0 300 0 1 0 0\r\n\
{\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
pinnumber=4\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
pinlabel=D\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
pinseq=4\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
comment=\r\n\
}\r\n\
L 300 700 300 -100 3 0 0 0 -1 -1\r\n\
");

addSymbol("eo_sim", "eo_sim_nor2.sym", "v 20110115 2\r\n\
T 500 700 5 10 1 1 0 0 1\r\n\
refdes=U?\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
logicfunction=NOR_2\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
device=nor2\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
model=simlib\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
primitive=true\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
Td=3 ns\r\n\
V 1050 300 50 6 0 0 0 -1 -1 0 0 -1 -1 -1 -1\r\n\
L 300 600 600 600 3 0 0 0 -1 -1\r\n\
L 300 0 600 0 3 0 0 0 -1 -1\r\n\
A 40 300 400 312 97 3 0 0 0 -1 -1\r\n\
A 600 400 400 270 76 3 0 0 0 -1 -1\r\n\
A 600 200 400 14 76 3 0 0 0 -1 -1\r\n\
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
}\r\n\
P 0 500 400 500 1 0 0\r\n\
{\r\n\
T 0 500 5 10 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 0 500 5 10 0 1 0 0 1\r\n\
pinlabel=A\r\n\
T 0 500 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 500 5 10 0 1 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
P 0 100 400 100 1 0 0\r\n\
{\r\n\
T 0 100 5 10 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 0 100 5 10 0 1 0 0 1\r\n\
pinlabel=B\r\n\
T 0 100 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 100 5 10 0 1 0 0 1\r\n\
pinseq=2\r\n\
}\r\n\
");

addSymbol("eo_sim", "eo_sim_nor3.sym", "v 20110115 2\r\n\
T 500 700 5 10 1 1 0 0 1\r\n\
refdes=U?\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
logicfunction=NOR_3\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
device=nor3\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
model=simlib\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
primitive=true\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
Td=3 ns\r\n\
V 1050 300 50 6 0 0 0 -1 -1 0 0 -1 -1 -1 -1\r\n\
L 300 600 600 600 3 0 0 0 -1 -1\r\n\
L 300 0 600 0 3 0 0 0 -1 -1\r\n\
A 40 300 400 312 97 3 0 0 0 -1 -1\r\n\
A 600 400 400 270 76 3 0 0 0 -1 -1\r\n\
A 600 200 400 14 76 3 0 0 0 -1 -1\r\n\
P 1100 300 1300 300 1 0 1\r\n\
{\r\n\
T 1100 300 5 10 0 1 0 0 1\r\n\
pinnumber=4\r\n\
T 1100 300 5 10 0 1 0 0 1\r\n\
pinlabel=Y\r\n\
T 1100 300 5 10 0 1 0 0 1\r\n\
pintype=out\r\n\
T 1100 300 5 10 0 1 0 0 1\r\n\
pinseq=4\r\n\
}\r\n\
P 0 500 400 500 1 0 0\r\n\
{\r\n\
T 0 500 5 10 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 0 500 5 10 0 1 0 0 1\r\n\
pinlabel=A\r\n\
T 0 500 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 500 5 10 0 1 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
P 0 300 450 300 1 0 0\r\n\
{\r\n\
T 0 300 5 10 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 0 300 5 10 0 1 0 0 1\r\n\
pinlabel=B\r\n\
T 0 300 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 300 5 10 0 1 0 0 1\r\n\
pinseq=2\r\n\
}\r\n\
P 0 100 400 100 1 0 0\r\n\
{\r\n\
T 0 100 5 10 0 1 0 0 1\r\n\
pinnumber=3\r\n\
T 0 100 5 10 0 1 0 0 1\r\n\
pinlabel=C\r\n\
T 0 100 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 100 5 10 0 1 0 0 1\r\n\
pinseq=3\r\n\
}\r\n\
");

addSymbol("eo_sim", "eo_sim_nor4.sym", "v 20110115 2\r\n\
T 500 700 5 10 1 1 0 0 1\r\n\
refdes=U?\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
logicfunction=NOR_4\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
device=nor4\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
model=simlib\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
primitive=true\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
Td=3 ns\r\n\
V 1050 300 50 6 0 0 0 -1 -1 0 0 -1 -1 -1 -1\r\n\
L 300 600 600 600 3 0 0 0 -1 -1\r\n\
L 300 0 600 0 3 0 0 0 -1 -1\r\n\
A 40 300 400 300 115 3 0 0 0 -1 -1\r\n\
A 600 400 400 270 76 3 0 0 0 -1 -1\r\n\
A 600 200 400 14 76 3 0 0 0 -1 -1\r\n\
P 1100 300 1300 300 1 0 1\r\n\
{\r\n\
T 1100 300 5 10 0 1 0 0 1\r\n\
pinnumber=5\r\n\
T 1100 300 5 10 0 1 0 0 1\r\n\
pinlabel=Y\r\n\
T 1100 300 5 10 0 1 0 0 1\r\n\
pintype=out\r\n\
T 1100 300 5 10 0 1 0 0 1\r\n\
pinseq=5\r\n\
}\r\n\
P 0 600 300 600 1 0 0\r\n\
{\r\n\
T 0 600 5 10 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 0 600 5 10 0 1 0 0 1\r\n\
pinlabel=A\r\n\
T 0 600 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 600 5 10 0 1 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
P 0 400 400 400 1 0 0\r\n\
{\r\n\
T 0 400 5 10 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 0 400 5 10 0 1 0 0 1\r\n\
pinlabel=B\r\n\
T 0 400 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 400 5 10 0 1 0 0 1\r\n\
pinseq=2\r\n\
}\r\n\
P 0 200 400 200 1 0 0\r\n\
{\r\n\
T 0 200 5 10 0 1 0 0 1\r\n\
pinnumber=3\r\n\
T 0 200 5 10 0 1 0 0 1\r\n\
pinlabel=C\r\n\
T 0 200 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 200 5 10 0 1 0 0 1\r\n\
pinseq=3\r\n\
}\r\n\
P 0 0 300 0 1 0 0\r\n\
{\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
pinnumber=4\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
pinlabel=D\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
pinseq=4\r\n\
}\r\n\
");

addSymbol("eo_sim", "eo_sim_one_shot_startup.sym", "v 20110115 2\r\n\
T 950 500 5 10 1 1 0 0 1\r\n\
refdes=U?\r\n\
T 550 300 5 10 1 1 0 0 1\r\n\
device=one_shot_startup\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
model=simlib\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
primitive=true\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
Tw=7 ns\r\n\
P 1700 600 1900 600 1 0 1\r\n\
{\r\n\
T 1700 600 5 10 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 1450 600 5 10 1 1 0 0 1\r\n\
pinlabel=Q_N\r\n\
T 1700 600 5 10 0 1 0 0 1\r\n\
pintype=out\r\n\
T 1700 600 5 10 0 1 0 0 1\r\n\
pinseq=2\r\n\
}\r\n\
P 1700 400 1900 400 1 0 1\r\n\
{\r\n\
T 1700 400 5 10 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 1550 400 5 10 1 1 0 0 1\r\n\
pinlabel=Q\r\n\
T 1700 400 5 10 0 1 0 0 1\r\n\
pintype=out\r\n\
T 1700 400 5 10 0 1 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
B 200 100 1500 700 3 3 0 0 0 0 0 0 0 0 0 0\r\n\
");

addSymbol("eo_sim", "eo_sim_one_shot.sym", "v 20110115 2\r\n\
T 950 500 5 10 1 1 0 0 1\r\n\
refdes=U?\r\n\
T 850 300 5 10 1 1 0 0 1\r\n\
device=one_shot\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
model=simlib\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
primitive=true\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
Td=5 ns\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
Tw=25 ns\r\n\
P 0 600 200 600 1 0 0\r\n\
{\r\n\
T 50 600 5 10 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 250 600 5 10 1 1 0 0 1\r\n\
pinlabel=T\r\n\
T 0 600 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 600 5 10 0 1 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
P 1700 600 1900 600 1 0 1\r\n\
{\r\n\
T 1700 600 5 10 0 1 0 0 1\r\n\
pinnumber=3\r\n\
T 1450 600 5 10 1 1 0 0 1\r\n\
pinlabel=Q_N\r\n\
T 1700 600 5 10 0 1 0 0 1\r\n\
pintype=out\r\n\
T 1700 600 5 10 0 1 0 0 1\r\n\
pinseq=3\r\n\
}\r\n\
P 1700 400 1900 400 1 0 1\r\n\
{\r\n\
T 1700 400 5 10 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 1550 400 5 10 1 1 0 0 1\r\n\
pinlabel=Q\r\n\
T 1700 400 5 10 0 1 0 0 1\r\n\
pintype=out\r\n\
T 1700 400 5 10 0 1 0 0 1\r\n\
pinseq=2\r\n\
}\r\n\
B 200 100 1500 700 3 3 0 0 0 0 0 0 0 0 0 0\r\n\
");

addSymbol("eo_sim", "eo_sim_or2.sym", "v 20110115 2\r\n\
T 500 700 5 10 1 1 0 0 1\r\n\
refdes=U?\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
logicfunction=OR_2\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
device=or2\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
model=simlib\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
primitive=true\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
Td=3 ns\r\n\
L 300 600 600 600 3 0 0 0 -1 -1\r\n\
L 300 0 600 0 3 0 0 0 -1 -1\r\n\
A 40 300 400 312 97 3 0 0 0 -1 -1\r\n\
A 600 400 400 270 76 3 0 0 0 -1 -1\r\n\
A 600 200 400 14 76 3 0 0 0 -1 -1\r\n\
P 1000 300 1300 300 1 0 1\r\n\
{\r\n\
T 1000 300 5 10 0 1 0 0 1\r\n\
pinnumber=3\r\n\
T 1000 300 5 10 0 1 0 0 1\r\n\
pinlabel=Y\r\n\
T 1000 300 5 10 0 1 0 0 1\r\n\
pintype=out\r\n\
T 1000 300 5 10 0 1 0 0 1\r\n\
pinseq=3\r\n\
}\r\n\
P 0 500 400 500 1 0 0\r\n\
{\r\n\
T 0 500 5 10 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 0 500 5 10 0 1 0 0 1\r\n\
pinlabel=A\r\n\
T 0 500 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 500 5 10 0 1 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
P 0 100 400 100 1 0 0\r\n\
{\r\n\
T 0 100 5 10 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 0 100 5 10 0 1 0 0 1\r\n\
pinlabel=B\r\n\
T 0 100 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 100 5 10 0 1 0 0 1\r\n\
pinseq=2\r\n\
}\r\n\
");

addSymbol("eo_sim", "eo_sim_or3.sym", "v 20110115 2\r\n\
T 500 700 5 10 1 1 0 0 1\r\n\
refdes=U?\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
logicfunction=OR_3\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
device=or3\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
model=simlib\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
primitive=true\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
Td=3 ns\r\n\
L 300 600 600 600 3 0 0 0 -1 -1\r\n\
L 300 0 600 0 3 0 0 0 -1 -1\r\n\
A 40 300 400 312 97 3 0 0 0 -1 -1\r\n\
A 600 400 400 270 76 3 0 0 0 -1 -1\r\n\
A 600 200 400 14 76 3 0 0 0 -1 -1\r\n\
P 1000 300 1300 300 1 0 1\r\n\
{\r\n\
T 1000 300 5 10 0 1 0 0 1\r\n\
pinnumber=4\r\n\
T 1000 300 5 10 0 1 0 0 1\r\n\
pinlabel=Y\r\n\
T 1000 300 5 10 0 1 0 0 1\r\n\
pintype=out\r\n\
T 1000 300 5 10 0 1 0 0 1\r\n\
pinseq=4\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
comment=\r\n\
}\r\n\
P 0 500 400 500 1 0 0\r\n\
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
P 0 300 450 300 1 0 0\r\n\
{\r\n\
T 0 300 5 10 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 0 300 5 10 0 1 0 0 1\r\n\
pinlabel=B\r\n\
T 0 300 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 300 5 10 0 1 0 0 1\r\n\
pinseq=2\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
comment=\r\n\
}\r\n\
P 0 100 400 100 1 0 0\r\n\
{\r\n\
T 0 100 5 10 0 1 0 0 1\r\n\
pinnumber=3\r\n\
T 0 100 5 10 0 1 0 0 1\r\n\
pinlabel=C\r\n\
T 0 100 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 100 5 10 0 1 0 0 1\r\n\
pinseq=3\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
comment=\r\n\
}\r\n\
");

addSymbol("eo_sim", "eo_sim_or4.sym", "v 20110115 2\r\n\
T 500 700 5 10 1 1 0 0 1\r\n\
refdes=U?\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
logicfunction=OR_4\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
device=or4\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
model=simlib\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
primitive=true\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
Td=3 ns\r\n\
L 300 600 600 600 3 0 0 0 -1 -1\r\n\
L 300 0 600 0 3 0 0 0 -1 -1\r\n\
A 40 300 400 300 115 3 0 0 0 -1 -1\r\n\
A 600 400 400 270 76 3 0 0 0 -1 -1\r\n\
A 600 200 400 14 76 3 0 0 0 -1 -1\r\n\
P 1000 300 1300 300 1 0 1\r\n\
{\r\n\
T 1000 300 5 10 0 1 0 0 1\r\n\
pinnumber=5\r\n\
T 1000 300 5 10 0 1 0 0 1\r\n\
pinlabel=Y\r\n\
T 1000 300 5 10 0 1 0 0 1\r\n\
pintype=out\r\n\
T 1000 300 5 10 0 1 0 0 1\r\n\
pinseq=5\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
comment=\r\n\
}\r\n\
P 0 600 300 600 1 0 0\r\n\
{\r\n\
T 0 600 5 10 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 0 600 5 10 0 1 0 0 1\r\n\
pinlabel=A\r\n\
T 0 600 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 600 5 10 0 1 0 0 1\r\n\
pinseq=1\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
comment=\r\n\
}\r\n\
P 0 400 400 400 1 0 0\r\n\
{\r\n\
T 0 400 5 10 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 0 400 5 10 0 1 0 0 1\r\n\
pinlabel=B\r\n\
T 0 400 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 400 5 10 0 1 0 0 1\r\n\
pinseq=2\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
comment=\r\n\
}\r\n\
P 0 200 400 200 1 0 0\r\n\
{\r\n\
T 0 200 5 10 0 1 0 0 1\r\n\
pinnumber=3\r\n\
T 0 200 5 10 0 1 0 0 1\r\n\
pinlabel=C\r\n\
T 0 200 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 200 5 10 0 1 0 0 1\r\n\
pinseq=3\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
comment=\r\n\
}\r\n\
P 0 0 300 0 1 0 0\r\n\
{\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
pinnumber=4\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
pinlabel=D\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
pinseq=4\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
comment=\r\n\
}\r\n\
");

addSymbol("eo_sim", "eo_sim_pulse_generator.sym", "v 20110115 2\r\n\
T 950 500 5 10 1 1 0 0 1\r\n\
refdes=U?\r\n\
T 550 300 5 10 1 1 0 0 1\r\n\
device=pulse_generator\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
model=simlib\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
primitive=true\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
Tdelay=1 ns\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
Th=10 ns\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
Tperiod=50 ns\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
N =1\r\n\
P 0 600 200 600 1 0 0\r\n\
{\r\n\
T 50 600 5 10 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 250 600 5 10 1 1 0 0 1\r\n\
pinlabel=TRIGGER\r\n\
T 0 600 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 600 5 10 0 1 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
P 1700 600 1900 600 1 0 1\r\n\
{\r\n\
T 1700 600 5 10 0 1 0 0 1\r\n\
pinnumber=3\r\n\
T 1450 600 5 10 1 1 0 0 1\r\n\
pinlabel=QN\r\n\
T 1700 600 5 10 0 1 0 0 1\r\n\
pintype=out\r\n\
T 1700 600 5 10 0 1 0 0 1\r\n\
pinseq=3\r\n\
}\r\n\
P 1700 400 1900 400 1 0 1\r\n\
{\r\n\
T 1700 400 5 10 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 1550 400 5 10 1 1 0 0 1\r\n\
pinlabel=Q\r\n\
T 1700 400 5 10 0 1 0 0 1\r\n\
pintype=out\r\n\
T 1700 400 5 10 0 1 0 0 1\r\n\
pinseq=2\r\n\
}\r\n\
B 200 100 1500 700 3 3 0 0 0 0 0 0 0 0 0 0\r\n\
");

addSymbol("eo_sim", "eo_sim_xor2.sym", "v 20110115 2\r\n\
T 500 700 5 10 0 1 0 0 1\r\n\
refdes=U?\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
logicfunction=XOR_2\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
device=xor2\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
model=simlib\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
primitive=true\r\n\
T 10 10 5 5 0 0 0 0 1\r\n\
Td=3 ns\r\n\
L 400 600 600 600 3 0 0 0 -1 -1\r\n\
L 400 0 600 0 3 0 0 0 -1 -1\r\n\
A 40 300 400 312 97 3 0 0 0 -1 -1\r\n\
A 140 300 400 312 97 3 0 0 0 -1 -1\r\n\
A 600 400 400 270 76 3 0 0 0 -1 -1\r\n\
A 600 200 400 14 76 3 0 0 0 -1 -1\r\n\
P 1000 300 1300 300 1 0 1\r\n\
{\r\n\
T 1000 300 5 10 0 1 0 0 1\r\n\
pinnumber=0\r\n\
T 1000 300 5 10 0 1 0 0 1\r\n\
pinlabel=Y\r\n\
T 1000 300 5 10 0 1 0 0 1\r\n\
pintype=out\r\n\
T 1000 300 5 10 0 1 0 0 1\r\n\
pinseq=3\r\n\
}\r\n\
P 0 500 400 500 1 0 0\r\n\
{\r\n\
T 0 500 5 10 0 1 0 0 1\r\n\
pinnumber=0\r\n\
T 0 500 5 10 0 1 0 0 1\r\n\
pinlabel=A\r\n\
T 0 500 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 500 5 10 0 1 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
P 0 100 400 100 1 0 0\r\n\
{\r\n\
T 0 100 5 10 0 1 0 0 1\r\n\
pinnumber=0\r\n\
T 0 100 5 10 0 1 0 0 1\r\n\
pinlabel=B\r\n\
T 0 100 5 10 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 100 5 10 0 1 0 0 1\r\n\
pinseq=2\r\n\
}\r\n\
");

addSymbol("eo_sim", "PAUSE_HIGH_CLK.sym", "v 20110115 2\r\n\
T 0 -150 5 10 1 1 0 1 1\r\n\
device=PAUSE_HIGH_CLK\r\n\
T 0 0 5 10 1 1 0 1 1\r\n\
refdes=ASSERT?\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
primitive=true\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
model=simlib\r\n\
T 0 -300 5 10 1 1 0 1 1\r\n\
message=message text\r\n\
P 0 400 200 400 1 0 0\r\n\
{\r\n\
T 50 400 5 8 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 250 400 5 8 1 1 0 0 1\r\n\
pinlabel=DIN\r\n\
T 0 400 5 8 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 400 5 8 0 1 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
P 0 200 200 200 1 0 0\r\n\
{\r\n\
T 50 200 5 8 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 250 200 5 8 1 1 0 0 1\r\n\
pinlabel=CLK\r\n\
T 0 200 5 8 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 200 5 8 0 1 0 0 1\r\n\
pinseq=2\r\n\
}\r\n\
B 200 100 600 400 3 2 0 0 0 0 0 0 0 0 0 0\r\n\
");

addSymbol("eo_sim", "PAUSE_ON_HIGH.sym", "v 20110115 2\r\n\
T 0 -150 5 10 1 1 0 1 1\r\n\
device=PAUSE_ON_HIGH\r\n\
T 0 0 5 10 1 1 0 1 1\r\n\
refdes=ASSERT?\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
primitive=true\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
model=simlib\r\n\
T 0 -300 5 10 1 1 0 1 1\r\n\
message=message text\r\n\
P 0 200 200 200 1 0 0\r\n\
{\r\n\
T 50 200 5 8 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 250 200 5 8 0 1 0 0 1\r\n\
pinlabel=P_1\r\n\
T 0 200 5 8 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 200 5 8 0 1 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
B 200 100 600 200 3 2 0 0 0 0 0 0 0 0 0 0\r\n\
");

addSymbol("eo_sim", "STOP_HIGH_CLK.sym", "v 20110115 2\r\n\
T 0 -150 5 10 1 1 0 1 1\r\n\
device=STOP_HIGH_CLK\r\n\
T 0 0 5 10 1 1 0 1 1\r\n\
refdes=ASSERT?\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
primitive=true\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
model=simlib\r\n\
T 0 -300 5 10 1 1 0 1 1\r\n\
message=message text\r\n\
P 0 400 200 400 1 0 0\r\n\
{\r\n\
T 50 400 5 8 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 250 400 5 8 1 1 0 0 1\r\n\
pinlabel=DIN\r\n\
T 0 400 5 8 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 400 5 8 0 1 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
P 0 200 200 200 1 0 0\r\n\
{\r\n\
T 50 200 5 8 0 1 0 0 1\r\n\
pinnumber=2\r\n\
T 250 200 5 8 1 1 0 0 1\r\n\
pinlabel=CLK\r\n\
T 0 200 5 8 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 200 5 8 0 1 0 0 1\r\n\
pinseq=2\r\n\
}\r\n\
B 200 100 600 400 3 2 0 0 0 0 0 0 0 0 0 0\r\n\
");

addSymbol("eo_sim", "STOP_ON_HIGH.sym", "v 20110115 2\r\n\
T 0 -150 5 10 1 1 0 1 1\r\n\
device=STOP_ON_HIGH\r\n\
T 0 0 5 10 1 1 0 1 1\r\n\
refdes=ASSERT?\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
primitive=true\r\n\
T 0 0 5 10 0 1 0 0 1\r\n\
model=simlib\r\n\
T 0 -300 5 10 1 1 0 1 1\r\n\
message=message text\r\n\
P 0 200 200 200 1 0 0\r\n\
{\r\n\
T 50 200 5 8 0 1 0 0 1\r\n\
pinnumber=1\r\n\
T 250 200 5 8 0 1 0 0 1\r\n\
pinlabel=P_1\r\n\
T 0 200 5 8 0 1 0 0 1\r\n\
pintype=in\r\n\
T 0 200 5 8 0 1 0 0 1\r\n\
pinseq=1\r\n\
}\r\n\
B 200 100 600 200 3 2 0 0 0 0 0 0 0 0 0 0\r\n\
");

addSymbol("eo_symbols", "eo_titleA.sym", "v 20110115 2\r\n\
T 10100 1500 5 10 0 0 0 0 1\r\n\
graphical=1\r\n\
T 7650 250 15 8 1 1 0 0 1\r\n\
revision=REV:\r\n\
T 6450 250 15 8 1 1 0 0 1\r\n\
author=DRAWN BY:\r\n\
T 8850 250 15 8 1 1 0 0 1\r\n\
sheetnumber=SHEET X OF Y\r\n\
T 7650 100 15 8 1 1 0 0 1\r\n\
date=1/1/2013\r\n\
T 8175 500 15 16 1 1 0 4 1\r\n\
designname=E010\r\n\
T 8175 800 15 16 1 1 0 4 1\r\n\
company=eightolives\r\n\
B 0 0 10000 7500 15 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
B 6400 50 3550 950 15 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
L 6400 350 9950 350 15 0 0 0 -1 -1\r\n\
L 6400 650 9950 650 15 0 0 0 -1 -1\r\n\
L 7600 50 7600 350 15 0 0 0 -1 -1\r\n\
L 8800 50 8800 350 15 0 0 0 -1 -1\r\n\
L 7600 200 8800 200 15 0 0 0 -1 -1\r\n\
");

//addSymbol("eo_symbols", "eo_titleB.sym","v 20110115 2\r\n\
let eo_titleB = "v 20110115 2\r\n\
T 0 0 5 10 0 1 0 1 1\r\n\
device=\r\n\
T 0 0 5 10 1 1 0 1 1\r\n\
refdes=\r\n\
T 14400 1500 5 10 0 0 0 0 1\r\n\
graphical=1\r\n\
B 0 0 17000 11000 15 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
L 12700 800 12700 200 15 0 0 0 -1 -1\r\n\
T 9300 600 15 8 1 0 0 0 1\r\n\
FILE:\r\n\
T 12800 600 15 8 1 0 0 0 1\r\n\
REVISION:\r\n\
T 12800 300 15 8 1 0 0 0 1\r\n\
DRAWN BY: \r\n\
T 9300 300 15 8 1 0 0 0 1\r\n\
PAGE\r\n\
T 11000 300 15 8 1 0 0 0 1\r\n\
OF\r\n\
T 9300 900 15 8 1 0 0 0 1\r\n\
TITLE\r\n\
B 9200 200 7600 1400 15 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
L 9200 800 16800 800 15 0 0 0 -1 -1\r\n\
B 200 200 16600 10600 15 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
L 200 2000 0 2000 15 0 0 0 -1 -1\r\n\
L 200 4000 0 4000 15 0 0 0 -1 -1\r\n\
L 200 6000 0 6000 15 0 0 0 -1 -1\r\n\
L 200 8000 0 8000 15 0 0 0 -1 -1\r\n\
L 2000 200 2000 0 15 0 0 0 -1 -1\r\n\
L 4000 200 4000 0 15 0 0 0 -1 -1\r\n\
L 6000 200 6000 0 15 0 0 0 -1 -1\r\n\
L 8000 200 8000 0 15 0 0 0 -1 -1\r\n\
L 10000 200 10000 0 15 0 0 0 -1 -1\r\n\
T 100 1000 15 8 1 0 0 4 1\r\n\
A\r\n\
T 100 3000 15 8 1 0 0 4 1\r\n\
B\r\n\
T 100 5000 15 8 1 0 0 4 1\r\n\
C\r\n\
T 100 7000 15 8 1 0 0 4 1\r\n\
D\r\n\
T 1000 100 15 8 1 0 0 4 1\r\n\
1\r\n\
T 3000 100 15 8 1 0 0 4 1\r\n\
2\r\n\
T 5000 100 15 8 1 0 0 4 1\r\n\
3\r\n\
T 7000 100 15 8 1 0 0 4 1\r\n\
4\r\n\
T 9000 100 15 8 1 0 0 4 1\r\n\
5\r\n\
L 200 10000 0 10000 15 0 0 0 -1 -1\r\n\
T 100 9000 15 8 1 0 0 4 1\r\n\
E\r\n\
T 100 10500 15 8 1 0 0 4 1\r\n\
F\r\n\
L 12000 200 12000 0 15 0 0 0 -1 -1\r\n\
L 14000 200 14000 0 15 0 0 0 -1 -1\r\n\
T 11000 100 15 8 1 0 0 4 1\r\n\
6\r\n\
T 13000 100 15 8 1 0 0 4 1\r\n\
7\r\n\
T 15000 100 15 8 1 0 0 4 1\r\n\
8\r\n\
L 16000 200 16000 0 15 0 0 0 -1 -1\r\n\
T 16500 100 15 8 1 0 0 4 1\r\n\
9\r\n\
L 17000 10000 16800 10000 15 0 0 0 -1 -1\r\n\
L 17000 8000 16800 8000 15 0 0 0 -1 -1\r\n\
L 17000 6000 16800 6000 15 0 0 0 -1 -1\r\n\
L 17000 4000 16800 4000 15 0 0 0 -1 -1\r\n\
L 17000 2000 16800 2000 15 0 0 0 -1 -1\r\n\
T 16900 1000 15 8 1 0 0 4 1\r\n\
A\r\n\
T 16900 3000 15 8 1 0 0 4 1\r\n\
B\r\n\
T 16900 5000 15 8 1 0 0 4 1\r\n\
C\r\n\
T 16900 7000 15 8 1 0 0 4 1\r\n\
D\r\n\
T 16900 9000 15 8 1 0 0 4 1\r\n\
E\r\n\
T 16900 10500 15 8 1 0 0 4 1\r\n\
F\r\n\
L 2000 11000 2000 10800 15 0 0 0 -1 -1\r\n\
L 4000 11000 4000 10800 15 0 0 0 -1 -1\r\n\
L 6000 11000 6000 10800 15 0 0 0 -1 -1\r\n\
L 8000 11000 8000 10800 15 0 0 0 -1 -1\r\n\
L 10000 11000 10000 10800 15 0 0 0 -1 -1\r\n\
L 12000 11000 12000 10800 15 0 0 0 -1 -1\r\n\
L 14000 11000 14000 10800 15 0 0 0 -1 -1\r\n\
L 16000 11000 16000 10800 15 0 0 0 -1 -1\r\n\
T 1000 10900 15 8 1 0 0 4 1\r\n\
1\r\n\
T 3000 10900 15 8 1 0 0 4 1\r\n\
2\r\n\
T 5000 10900 15 8 1 0 0 4 1\r\n\
3\r\n\
T 7000 10900 15 8 1 0 0 4 1\r\n\
4\r\n\
T 9000 10900 15 8 1 0 0 4 1\r\n\
5\r\n\
T 11000 10900 15 8 1 0 0 4 1\r\n\
6\r\n\
T 13000 10900 15 8 1 0 0 4 1\r\n\
7\r\n\
T 15000 10900 15 8 1 0 0 4 1\r\n\
8\r\n\
T 16500 10900 15 8 1 0 0 4 1\r\n\
9\r\n\
";

let eo_titleBb = "v 20110115 2\r\n\
B 0 0 17000 11000 15 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
T 0 0 5 10 0 1 0 1 1\r\n\
device=\r\n\
T 0 0 5 10 1 1 0 1 1\r\n\
refdes=\r\n\
T 14400 1500 5 10 0 0 0 0 1\r\n\
graphical=1\r\n\
T 14150 450 15 8 1 1 0 0 1\r\n\
revision=REV:\r\n\
T 12950 450 15 8 1 1 0 0 1\r\n\
author=DRAWN BY:\r\n\
T 15350 450 15 8 1 1 0 0 1\r\n\
sheetnumber=SHEET X OF Y\r\n\
T 14150 250 15 8 1 1 0 0 1\r\n\
date=1/1/2025\r\n\
T 14675 700 15 16 1 1 0 4 1\r\n\
designname=E010\r\n\
T 14675 1000 15 16 1 1 0 4 1\r\n\
company=eightolives\r\n\
T 8175 1000 15 16 0 0 0 4 1\r\n\
gnd_plane_signal=GND\r\n\
T 8175 1200 15 16 0 0 0 4 1\r\n\
power_plane_signal=VCC\r\n\
T 900 300 8 10 1 1 0 0 1\r\n\
copyright=copyright (c) 2025 eightolives\r\n\
B 12900 250 3550 950 15 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
L 12900 550 16450 550 15 0 0 0 -1 -1\r\n\
L 12900 850 16450 850 15 0 0 0 -1 -1\r\n\
L 14100 400 15300 400 15 0 0 0 -1 -1\r\n\
L 15300 250 15300 550 15 0 0 0 -1 -1\r\n\
L 14100 250 14100 550 15 0 0 0 -1 -1\r\n\
B 200 200 16600 10600 15 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
L 200 2000 0 2000 15 0 0 0 -1 -1\r\n\
L 200 4000 0 4000 15 0 0 0 -1 -1\r\n\
L 200 6000 0 6000 15 0 0 0 -1 -1\r\n\
L 200 8000 0 8000 15 0 0 0 -1 -1\r\n\
L 2000 200 2000 0 15 0 0 0 -1 -1\r\n\
L 4000 200 4000 0 15 0 0 0 -1 -1\r\n\
L 6000 200 6000 0 15 0 0 0 -1 -1\r\n\
L 8000 200 8000 0 15 0 0 0 -1 -1\r\n\
L 10000 200 10000 0 15 0 0 0 -1 -1\r\n\
T 100 1000 15 8 1 0 0 4 1\r\n\
A\r\n\
T 100 3000 15 8 1 0 0 4 1\r\n\
B\r\n\
T 100 5000 15 8 1 0 0 4 1\r\n\
C\r\n\
T 100 7000 15 8 1 0 0 4 1\r\n\
D\r\n\
T 1000 100 15 8 1 0 0 4 1\r\n\
1\r\n\
T 3000 100 15 8 1 0 0 4 1\r\n\
2\r\n\
T 5000 100 15 8 1 0 0 4 1\r\n\
3\r\n\
T 7000 100 15 8 1 0 0 4 1\r\n\
4\r\n\
T 9000 100 15 8 1 0 0 4 1\r\n\
5\r\n\
L 200 10000 0 10000 15 0 0 0 -1 -1\r\n\
T 100 9000 15 8 1 0 0 4 1\r\n\
E\r\n\
T 100 10500 15 8 1 0 0 4 1\r\n\
F\r\n\
L 12000 200 12000 0 15 0 0 0 -1 -1\r\n\
L 14000 200 14000 0 15 0 0 0 -1 -1\r\n\
T 11000 100 15 8 1 0 0 4 1\r\n\
6\r\n\
T 13000 100 15 8 1 0 0 4 1\r\n\
7\r\n\
T 15000 100 15 8 1 0 0 4 1\r\n\
8\r\n\
L 16000 200 16000 0 15 0 0 0 -1 -1\r\n\
T 16500 100 15 8 1 0 0 4 1\r\n\
9\r\n\
L 17000 10000 16800 10000 15 0 0 0 -1 -1\r\n\
L 17000 8000 16800 8000 15 0 0 0 -1 -1\r\n\
L 17000 6000 16800 6000 15 0 0 0 -1 -1\r\n\
L 17000 4000 16800 4000 15 0 0 0 -1 -1\r\n\
L 17000 2000 16800 2000 15 0 0 0 -1 -1\r\n\
T 16900 1000 15 8 1 0 0 4 1\r\n\
A\r\n\
T 16900 3000 15 8 1 0 0 4 1\r\n\
B\r\n\
T 16900 5000 15 8 1 0 0 4 1\r\n\
C\r\n\
T 16900 7000 15 8 1 0 0 4 1\r\n\
D\r\n\
T 16900 9000 15 8 1 0 0 4 1\r\n\
E\r\n\
T 16900 10500 15 8 1 0 0 4 1\r\n\
F\r\n\
L 2000 11000 2000 10800 15 0 0 0 -1 -1\r\n\
L 4000 11000 4000 10800 15 0 0 0 -1 -1\r\n\
L 6000 11000 6000 10800 15 0 0 0 -1 -1\r\n\
L 8000 11000 8000 10800 15 0 0 0 -1 -1\r\n\
L 10000 11000 10000 10800 15 0 0 0 -1 -1\r\n\
L 12000 11000 12000 10800 15 0 0 0 -1 -1\r\n\
L 14000 11000 14000 10800 15 0 0 0 -1 -1\r\n\
L 16000 11000 16000 10800 15 0 0 0 -1 -1\r\n\
T 1000 10900 15 8 1 0 0 4 1\r\n\
1\r\n\
T 3000 10900 15 8 1 0 0 4 1\r\n\
2\r\n\
T 5000 10900 15 8 1 0 0 4 1\r\n\
3\r\n\
T 7000 10900 15 8 1 0 0 4 1\r\n\
4\r\n\
T 9000 10900 15 8 1 0 0 4 1\r\n\
5\r\n\
T 11000 10900 15 8 1 0 0 4 1\r\n\
6\r\n\
T 13000 10900 15 8 1 0 0 4 1\r\n\
7\r\n\
T 15000 10900 15 8 1 0 0 4 1\r\n\
8\r\n\
T 16500 10900 15 8 1 0 0 4 1\r\n\
9\r\n\
";

addSymbol("eo_symbols", "eo_titleB.sym", "v 20110115 2\r\n\
B 0 0 17000 11000 15 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
T 0 0 5 10 0 1 0 1 1\r\n\
device=\r\n\
T 0 0 5 10 1 1 0 1 1\r\n\
refdes=\r\n\
T 14400 1500 5 10 0 0 0 0 1\r\n\
graphical=1\r\n\
T 14150 450 15 8 1 1 0 0 1\r\n\
revision=REV:\r\n\
T 12950 450 15 8 1 1 0 0 1\r\n\
author=DRAWN BY:\r\n\
T 15350 450 15 8 1 1 0 0 1\r\n\
sheetnumber=SHEET X OF Y\r\n\
T 14150 250 15 8 1 1 0 0 1\r\n\
date=1/1/2025\r\n\
T 14675 700 15 16 1 1 0 4 1\r\n\
designname=E010\r\n\
T 14675 1000 15 16 1 1 0 4 1\r\n\
company=eightolives\r\n\
T 8175 1000 15 16 0 0 0 4 1\r\n\
gnd_plane_signal=GND\r\n\
T 8175 1200 15 16 0 0 0 4 1\r\n\
power_plane_signal=VCC\r\n\
T 900 300 8 10 1 1 0 0 1\r\n\
copyright=copyright (c) 2025 eightolives\r\n\
B 12900 250 3550 950 15 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
L 12900 550 16450 550 15 0 0 0 -1 -1\r\n\
L 12900 850 16450 850 15 0 0 0 -1 -1\r\n\
L 14100 400 15300 400 15 0 0 0 -1 -1\r\n\
L 15300 250 15300 550 15 0 0 0 -1 -1\r\n\
L 14100 250 14100 550 15 0 0 0 -1 -1\r\n\
B 200 200 16600 10600 15 0 0 0 -1 -1 0 -1 -1 -1 -1 -1\r\n\
L 200 2000 0 2000 15 0 0 0 -1 -1\r\n\
L 200 4000 0 4000 15 0 0 0 -1 -1\r\n\
L 200 6000 0 6000 15 0 0 0 -1 -1\r\n\
L 200 8000 0 8000 15 0 0 0 -1 -1\r\n\
L 2000 200 2000 0 15 0 0 0 -1 -1\r\n\
L 4000 200 4000 0 15 0 0 0 -1 -1\r\n\
L 6000 200 6000 0 15 0 0 0 -1 -1\r\n\
L 8000 200 8000 0 15 0 0 0 -1 -1\r\n\
L 10000 200 10000 0 15 0 0 0 -1 -1\r\n\
T 100 1000 15 8 1 0 0 4 1\r\n\
A\r\n\
T 100 3000 15 8 1 0 0 4 1\r\n\
B\r\n\
T 100 5000 15 8 1 0 0 4 1\r\n\
C\r\n\
T 100 7000 15 8 1 0 0 4 1\r\n\
D\r\n\
T 1000 100 15 8 1 0 0 4 1\r\n\
1\r\n\
T 3000 100 15 8 1 0 0 4 1\r\n\
2\r\n\
T 5000 100 15 8 1 0 0 4 1\r\n\
3\r\n\
T 7000 100 15 8 1 0 0 4 1\r\n\
4\r\n\
T 9000 100 15 8 1 0 0 4 1\r\n\
5\r\n\
L 200 10000 0 10000 15 0 0 0 -1 -1\r\n\
T 100 9000 15 8 1 0 0 4 1\r\n\
E\r\n\
T 100 10500 15 8 1 0 0 4 1\r\n\
F\r\n\
L 12000 200 12000 0 15 0 0 0 -1 -1\r\n\
L 14000 200 14000 0 15 0 0 0 -1 -1\r\n\
T 11000 100 15 8 1 0 0 4 1\r\n\
6\r\n\
T 13000 100 15 8 1 0 0 4 1\r\n\
7\r\n\
T 15000 100 15 8 1 0 0 4 1\r\n\
8\r\n\
L 16000 200 16000 0 15 0 0 0 -1 -1\r\n\
T 16500 100 15 8 1 0 0 4 1\r\n\
9\r\n\
L 17000 10000 16800 10000 15 0 0 0 -1 -1\r\n\
L 17000 8000 16800 8000 15 0 0 0 -1 -1\r\n\
L 17000 6000 16800 6000 15 0 0 0 -1 -1\r\n\
L 17000 4000 16800 4000 15 0 0 0 -1 -1\r\n\
L 17000 2000 16800 2000 15 0 0 0 -1 -1\r\n\
T 16900 1000 15 8 1 0 0 4 1\r\n\
A\r\n\
T 16900 3000 15 8 1 0 0 4 1\r\n\
B\r\n\
T 16900 5000 15 8 1 0 0 4 1\r\n\
C\r\n\
T 16900 7000 15 8 1 0 0 4 1\r\n\
D\r\n\
T 16900 9000 15 8 1 0 0 4 1\r\n\
E\r\n\
T 16900 10500 15 8 1 0 0 4 1\r\n\
F\r\n\
L 2000 11000 2000 10800 15 0 0 0 -1 -1\r\n\
L 4000 11000 4000 10800 15 0 0 0 -1 -1\r\n\
L 6000 11000 6000 10800 15 0 0 0 -1 -1\r\n\
L 8000 11000 8000 10800 15 0 0 0 -1 -1\r\n\
L 10000 11000 10000 10800 15 0 0 0 -1 -1\r\n\
L 12000 11000 12000 10800 15 0 0 0 -1 -1\r\n\
L 14000 11000 14000 10800 15 0 0 0 -1 -1\r\n\
L 16000 11000 16000 10800 15 0 0 0 -1 -1\r\n\
T 1000 10900 15 8 1 0 0 4 1\r\n\
1\r\n\
T 3000 10900 15 8 1 0 0 4 1\r\n\
2\r\n\
T 5000 10900 15 8 1 0 0 4 1\r\n\
3\r\n\
T 7000 10900 15 8 1 0 0 4 1\r\n\
4\r\n\
T 9000 10900 15 8 1 0 0 4 1\r\n\
5\r\n\
T 11000 10900 15 8 1 0 0 4 1\r\n\
6\r\n\
T 13000 10900 15 8 1 0 0 4 1\r\n\
7\r\n\
T 15000 10900 15 8 1 0 0 4 1\r\n\
8\r\n\
T 16500 10900 15 8 1 0 0 4 1\r\n\
9\r\n\
");

addSymbol("eo_symbols", "eo_NULL.sym","v 20110115 2\r\n\
T 0 -150 5 10 1 1 0 1 1\r\n\
device=NULL\r\n\
T 0 0 5 10 1 1 0 1 1\r\n\
refdes=G?\r\n\
B 100 100 500 500 3 3 0 0 0 0 0 0 0 0 0 0\r\n\
L 100 500 600 100 3 0 0 0 0 0\r\n\
L 100 100 600 500 3 0 0 0 0 0\r\n\
");



