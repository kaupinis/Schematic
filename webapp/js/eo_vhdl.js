// eo_vhdl.js

class Vhdl {
    
  static ReservedWords87 = [
   	"abs","access","after","alias", "all",
   	"and", "architecture", "array", "assert","attribute",
	"begin",	"block", "body",	"buffer", "bus",
   	"case", "component",	"configuration", "constant", "disconnect",
	"downto", "else", "elsif",	"end", "entity",
   	"exit", "file", "for", "function",	"generate",
   	"generic", "guarded",	"if",
   	"in", "inout", "is",	"label",
	"library",	"linkage", 	"loop", "map",
   	"mod", "nand",	"new", "next",	"nor",
	"not",	"null", "of",	"on", "open",
   	"or", "others", "out", "package", "port",
   	"procedure", "process",  "range",
	"record", "register", "reject", "rem", "report",
	"return",  "select", "severity",
	"signal",  "subtype", "then", "to", "transport",
	"type",  "units", "until", "use",
	"variable", "wait", "when", "while", "with",
   	"xor", "event"];

  static ReservedWords93 = [
   	"group", "impure", "inertial", "literal", "postponed",
   	"pure", "reject",  "rol", "ror","shared", "sla", "sll", "sra",
   	"srl", "unaffected", "xnor"];

  static SpecialWords = [
	"ns", "ps", "us", "ms", "sec", "time", "event", "rising_edge", "falling_edge"];
    
  static StateNames = [
  "S_design_file",
"S_library_clause",
"S_null_state",
"S_entity_declaration",
"S_configuration_declaration",
"S_package_body",
"S_package_declaration",
"S_architecture_body",
"S_abstract_literal",
"S_access_type_definition",
"S_actual_designator",
"S_actual_parameter_part",
"S_actual_part",
"S_adding_operator",
"S_aggregate",
"S_alias_declaration",
"S_allocator",
"S_architecture_declarative_part",
"S_architecture_statement_part",
"S_array_type_definition",
"S_assertion_statement",
"S_association_element",
"S_association_list ",
"S_attribute_declaration ",
"S_attribute_designator",
"S_attribute_name",
"S_attribute_specification",
"S_base",
"S_base_specifier",
"S_base_unit_declaration",
"S_based_integer",
"S_based_literal",
"S_basic_character",
"S_basic_graphic_character",
"S_binding_indication",
"S_bit_string_literal",
"S_bit_value",
"S_block_configuration",
"S_block_declarative_item",
"S_bock_declarative_part",
"S_block_header",
"S_block_specification",
"S_block_statement",
"S_block_statement_part",
"S_case_statement",
"S_case_statement_alternative",
"S_character_literal",
"S_choice",
"S_component_configuration",
"S_component_declaration",
"S_component_instantiation_statement",
"S_component_specification",
"S_compositetype_definition",
"S_concurrent_assertion_statement",
"S_concurrent_procedure_call",
"S_concurrent_signal_assignment_statement",
"S_concurrent_statement",
"S_condition",
"S_condition_clause",
"S_conditional_signal_assignment",
"S_conditional_waveforms",
"S_configuration_declarative_item",
"S_configuration_declarative_part",
"S_configuration_item",
"S_configuration_specification",
"S_constant_declaration",
"S_constrained_array_definition",
"S_constraint",
"S_context_clause",
"S_context_item",
"S_decimal_literal",
"S_declaration",
"S_design_unit",
"S_designator",
"S_direction",
"S_disconnection_specification",
"S_discrete_range",
"S_element_association",
"S_element_declaration",
"S_element_subtype_definition",
"S_entity_aspect",
"S_entity_class",
"S_entity_declarative_item",
"S_entity_declarative_part",
"S_entity_designator",
"S_entity_header",
"S_entity_name_list",
"S_entity_specification",
"S_entity_statement",
"S_entity_statement_part",
"S_ennumeration_literal",
"S_ennumeration_type_definition",
"S_exit_statement",
"S_exponent",
"S_expression",
"S_extended_digit",
"S_factor",
"S_file_declaration",
"S_file_logical_name",
"S_file_type_definition",
"S_floating_type_definition",
"S_formal_designator",
"S_formal_parameter_list",
"S_formal_part",
"S_full_type_declaration",
"S_function_call",
"S_generate_statement",
"S_generation_scheme",
"S_generic_clause",
"S_generic_list",
"S_generic_map_aspect",
"S_graphic_character",
"S_guarded_signal_specification",
"S_identifier",
"S_identifier_list",
"S_if_statement",
"S_incomplete_type_declaration",
"S_index_constraint",
"S_index_specification",
"S_index_subtype_definition",
"S_indexed_name",
"S_instantiation_list",
"S_integer",
"S_integer_type_definition",
"S_interface_constant_declaration",
"S_interface_declaration",
"S_interface_element",
"S_interface_list",
"S_interface_signal_declaration",
"S_interface_variable_declaration",
"S_iteration_scheme",
"S_label",
"S_letter",
"S_library_unit",
"S_literal",
"S_logical_name",
"S_logical_name_list",
"S_logical_operator",
"S_loop_statement",
"S_miscellaneous_operator",
"S_mode",
"S_multiplying_operator",
"S_name",
"S_next_statement",
"S_null_statement",
"S_numeric_literal",
"S_object_declaratio",
"S_operator_symbol",
"S_options",
"S_package_body_declarative_item",
"S_package_body_declarative_part",
"S_package_declaration",
"S_package_declarative_item",
"S_package_declarative_part",
"S_parameter_specification",
"S_physical_literal",
"S_physical_type_definition",
"S_port_clause",
"S_port_list",
"S_port_map_aspect",
"S_prefix",
"S_primary",
"S_primary_unit",
"S_procedure_call_statement",
"S_process_declarative_item",
"S_process_declarative_part",
"S_process_statement",
"S_process_statement_part",
"S_qualified_expression",
"S_range",
"S_range_constraint",
"S_record_type_definition",
"S_relation",
"S_relational_operator",
"S_return_statement",
"S_scalar_type_definition",
"S_secondary_unit",
"S_secondary_unit_declaration",
"S_selected_name",
"S_selected_signal_assignment",
"S_selected_waveforms",
"S_sensitivity_clause",
"S_sensitivity_list",
"S_sequence_of_statements",
"S_sign",
"S_signal_assignment_statement",
"S_signal_declaration",
"S_signal_kind",
"S_signal_list",
"S_simple_expression",
"S_simple_name",
"S_slice_name",
"S_string_literal",
"S_subprogram_body",
"S_subprogram_declaration",
"S_subprogram_declarative_item",
"S_subprogram-declarative_part",
"S_subprogram_specification",
"S_subprogram_statement_part",
"S_subtype_declaration",
"S_subtype_indication",
"S_suffix",
"S_target",
"S_term",
"S_timeout_clause",
"S_type_conversion",
"S_type_declaration",
"S_type_definition",
"S_type_mark",
"S_unconstrained_array_definition",
"S_use_clause",
"S_variable_assignment_statement",
"S_variable_declaration",
"S_wait_statement",
"S_waveform",
"S_waveform_element",
"S_shift_expression",
"S_sequential_statement",
"S_shift_expression",
"S_shift_operator",
"S_report_statement"
];

  static S_design_file = 0;
  static S_library_clause = 1;
  static S_null_state = 2;
  static S_entity_declaration = 3;
  static S_configuration_declaration = 4;
  static S_package_body = 5;
  static S_package_declaration1 = 6;
  static S_architecture_body = 7;
  static S_abstract_literal = 8;
  static S_access_type_definition = 9;
  static S_actual_designator = 10;
  static S_actual_parameter_part = 11;
  static S_actual_part = 12;
  static S_adding_operator = 13;
  static S_aggregate = 14;
  static S_alias_declaration = 15;
  static S_allocator = 16;
  static S_architecture_declarative_part = 17;
  static S_architecture_statement_part = 18;
  static S_array_type_definition = 19;
  static S_assertion_statement = 20;
  static S_association_element = 21;
  static S_association_list  = 22;
  static S_attribute_declaration  = 23;
  static S_attribute_designator = 24;
  static S_attribute_name = 25;
  static S_attribute_specification = 26;
  static S_base = 27;
  static S_base_specifier = 28;
  static S_base_unit_declaration = 29;
  static S_based_integer = 30;
  static S_based_literal = 31;
  static S_basic_character = 32;
  static S_basic_graphic_character = 33;
  static S_binding_indication = 34;
  static S_bit_string_literal = 35;
  static S_bit_value = 36;
  static S_block_configuration = 37;
  static S_block_declarative_item = 38;
  static S_bock_declarative_part = 39;
  static S_block_header = 40;
  static S_block_specification = 41;
  static S_block_statement = 42;
  static S_block_statement_part = 43;
  static S_case_statement = 44;
  static S_case_statement_alternative = 45;
  static S_character_literal = 46;
  static S_choice = 47;
  static S_component_configuration = 48;
  static S_component_declaration = 49;
  static S_component_instantiation_statement = 50;
  static S_component_specification = 51;
  static S_compositetype_definition = 52;
  static S_concurrent_assertion_statement = 53;
  static S_concurrent_procedure_call = 54;
  static S_concurrent_signal_assignment_statement = 55;
  static S_concurrent_statement = 56;
  static S_condition = 57;
  static S_condition_clause = 58;
  static S_conditional_signal_assignment = 59;
  static S_conditional_waveforms = 60;
  static S_configuration_declarative_item = 61;
  static S_configuration_declarative_part = 62;
  static S_configuration_item = 63;
  static S_configuration_specification = 64;
  static S_constant_declaration = 65;
  static S_constrained_array_definition = 66;
  static S_constraint = 67;
  static S_context_clause = 68;
  static S_context_item = 69;
  static S_decimal_literal = 70;
  static S_declaration = 71;
  static S_design_unit = 72;
  static S_designator = 73;
  static S_direction = 74;
  static S_disconnection_specification = 75;
  static S_discrete_range = 76;
  static S_element_association = 77;
  static S_element_declaration = 78;
  static S_element_subtype_definition = 79;
  static S_entity_aspect = 80;
  static S_entity_class = 81;
  static S_entity_declarative_item = 82;
  static S_entity_declarative_part = 83;
  static S_entity_designator = 84;
  static S_entity_header = 85;
  static S_entity_name_list = 86;
  static S_entity_specification = 87;
  static S_entity_statement = 88;
  static S_entity_statement_part = 89;
  static S_ennumeration_literal = 90;
  static S_ennumeration_type_definition = 91;
  static S_exit_statement = 92;
  static S_exponent = 93;
  static S_expression = 94;
  static S_extended_digit = 95;
  static S_factor = 96;
  static S_file_declaration = 97;
  static S_file_logical_name = 98;
  static S_file_type_definition = 99;
  static S_floating_type_definition = 0;
  static S_formal_designator = 1;
  static S_formal_parameter_list = 2;
  static S_formal_part = 3;
  static S_full_type_declaration = 4;
  static S_function_call = 5;
  static S_generate_statement = 6;
  static S_generation_scheme = 7;
  static S_generic_clause = 8;
  static S_generic_list = 9;
  static S_generic_map_aspect = 110;
  static S_graphic_character = 111;
  static S_guarded_signal_specification = 112;
  static S_identifier = 113;
  static S_identifier_list = 114;
  static S_if_statement = 115;
  static S_incomplete_type_declaration = 116;
  static S_index_constraint = 117;
  static S_index_specification = 118;
  static S_index_subtype_definition = 119;
  static S_indexed_name = 120;
  static S_instantiation_list = 121;
  static S_integer = 122;
  static S_integer_type_definition = 123;
  static S_interface_constant_declaration = 124;
  static S_interface_declaration = 125;
  static S_interface_element = 126;
  static S_interface_list = 127;
  static S_interface_signal_declaration = 128;
  static S_interface_variable_declaration = 129;
  static S_iteration_scheme = 130;
  static S_label = 131;
  static S_letter = 132;
  static S_library_unit = 133;
  static S_literal = 134;
  static S_logical_name = 135;
  static S_logical_name_list = 136;
  static S_logical_operator = 137;
  static S_loop_statement = 138;
  static S_miscellaneous_operator = 139;
  static S_mode = 140;
  static S_multiplying_operator = 141;
  static S_name = 142;
  static S_next_statement = 143;
  static S_null_statement = 144;
  static S_numeric_literal = 145;
  static S_object_declaratio = 146;
  static S_operator_symbol = 147;
  static S_options = 148;
  static S_package_body_declarative_item = 149;
  static S_package_body_declarative_part = 150;
  static S_package_declaration = 151;
  static S_package_declarative_item = 152;
  static S_package_declarative_part = 153;
  static S_parameter_specification = 154;
  static S_physical_literal = 155;
  static S_physical_type_definition = 156;
  static S_port_clause = 157;
  static S_port_list = 158;
  static S_port_map_aspect = 159;
  static S_prefix = 160;
  static S_primary = 161;
  static S_primary_unit = 162;
  static S_procedure_call_statement = 163;
  static S_process_declarative_item = 164;
  static S_process_declarative_part = 165;
  static S_process_statement = 166;
  static S_process_statement_part = 167;
  static S_qualified_expression = 168;
  static S_range = 169;
  static S_range_constraint = 170;
  static S_record_type_definition = 171;
  static S_relation = 172;
  static S_relational_operator = 173;
  static S_return_statement = 174;
  static S_scalar_type_definition = 175;
  static S_secondary_unit = 176;
  static S_secondary_unit_declaration = 177;
  static S_selected_name = 178;
  static S_selected_signal_assignment = 179;
  static S_selected_waveforms = 180;
  static S_sensitivity_clause = 181;
  static S_sensitivity_list = 182;
  static S_sequence_of_statements = 183;
  static S_sign = 184;
  static S_signal_assignment_statement = 185;
  static S_signal_declaration = 186;
  static S_signal_kind = 187;
  static S_signal_list = 188;
  static S_simple_expression = 189;
  static S_simple_name = 190;
  static S_slice_name = 191;
  static S_string_literal = 192;
  static S_subprogram_body = 193;
  static S_subprogram_declaration = 194;
  static S_subprogram_declarative_item = 195;
  static S_subprogram_declarative_part = 196;
  static S_subprogram_specification = 197;
  static S_subprogram_statement_part = 198;
  static S_subtype_declaration = 199;
  static S_subtype_indication = 200;
  static S_suffix = 201;
  static S_target = 202;
  static S_term = 203;
  static S_timeout_clause = 204;
  static S_type_conversion = 205;
  static S_type_declaration = 206;
  static S_type_definition = 207;
  static S_type_mark = 208;
  static S_unconstrained_array_definition = 209;
  static S_use_clause = 210;
  static S_variable_assignment_statement = 211;
  static S_variable_declaration = 212;
  static S_wait_statement = 213;
  static S_waveform = 214;
  static S_waveform_element = 215;
  static S_shift_expression = 216;
  static S_sequential_statement = 217;
  static S_shift_operator = 218;
  static S_report_statement = 219;

    static isanInteger(s) {
      let b = true;
      let t = s.toString();
      let g = t.length();
      if(g == 0) b = false;
      else
      {
        let i = 0;
        while(b && (i < g))
        {
	  b = b && Vhdl.isDigit(t.charAt(i));
	  i += 1;
        }
      }
      return(b);
    }
    
    static isDigit(r) {
      let b = false;
      if((r == '0') || ( r == '1') ||( r == '2') ||( r == '3') ||( r == '4') ||( r == '5') ||( r == '6') ||( r == '7') ||( r == '8') ||( r == '9')) b = true;
      return(b);
    }
    
    static isAlpha(t) {
      const c = t.charCodeAt(0);
      let b = true;
      if (!(c >= 65 && c <= 90) && !(c >= 97 && c <= 122)) b = false;
      return(b);
    }
    
    static isAlnum(c) {
      let r = false;
      if (Vhdl.isDigit(c) == true) r = true;
      else if (Vhdl.isAlpha(c) == true) r = true;
      return r;
    }
    
    /*TODO*/
    static isgraph(c) {
      return false;
    }

    static isaSpecialWord(t) {
      let r = false;
      let t1 = t.toLowerCase();
      let L1 = Vhdl.SpecialWords.length;
      let i = 0;
      while (!r && ( i < L1) )
      {
      	if( t1 == Vhdl.SpecialWords[i]) r = true;
      	i += 1;
      }
      return(r);
    }    
    
    static isaReservedWord(t) {
      let r = false;
      let t1 = t.toLowerCase();
      let L1 = Vhdl.ReservedWords87.length;
      let L2 = Vhdl.ReservedWords93.length;
      let i = 0;
      while (!r && ( i < L1) )
      {
      	if( t1 == Vhdl.ReservedWords87[i]) r = true;
      	i += 1;
      }
      if(!r)
      {
        i = 9;
	while (!r && ( i < L2) )
        {
	  if( t1 == Vhdl.ReservedWords93[i]) r = true;
      	  i += 1;
        }
      }
      return(r);
    }  
    
    static isIdentifier(t) {
      let r=false;
      let m = true;
      try {
        if(!Vhdl.isaReservedWord(t) && (t.charAt(0)!='_') && (Vhdl.isAlpha(t.charAt(0))) )
	{
	  let k = t.length();
	  let i = 0;
	  while(i<k)
	  {
	    if(Vhdl.isAlnum(t.charAt(i)) || (t.charAt(i)=='_') ) {}
	    else m = false;
	    i += 1;
          }
	  if(m && !Vhdl.isaReservedWord(t)) r = true;
	}
      }
      catch(e)
      {
	report("487 VhdlRead isIdentifier() " + e);
      }
      return(r);
    }
    
    static parseVhdl(s) {
      let p = new Promise( function(resolve, reject) {
        let vr = new VhdlReader(s);
        try {
          let o = vr.parse();
          resolve(o);
        }
        catch(e) {
          reject("344 parseVhdl " + e);
        }
      });
      return(p);
    }
            
            
            
 } // end of Vhdl

class VhdlReader extends Vhdl {
    constructor(s) {
        super();
        this.PortList = [];
        this.S = s;
        this.LineNumber = 0;
        this.Position = 0;
        this.Token = "";
        this.tokencache = null;
        this.bProcessingAsString = false;
        this.bComment = false;
        this.WorkingComment = "";
        this.bShowAction = false;
        this.bDebug = false;
        this.bTrace = false;
        this.model = "";
        this.delimiters = " \n\r\t,.\"\'=()&|+-*/!<>:;";
        this.State = this.getIndex("S_null_state");
    }
    
    getIndex(s) {
        let i = 0;
        let k = Vhdl.StateNames.length;
        let b = false;
        while(!b && (i < k))
        {
          if(s == Vhdl.StateNames[i]) b = true;
          else i += 1;
        }
        return(i);
    }
    
    setToken(s) {
        this.Token = s;
    }
    
    isIdentifier() {
      let r=false;
      let m = true;
      let t = this.Token;
      try {
        if(!Vhdl.isaReservedWord(t) && (t.charAt(0)!='_') && (Vhdl.isAlpha(t.charAt(0))) )
	{
	  let k = t.length;
	  let i = 0;
	  while(i<k)
	  {
	    if(Vhdl.isAlnum(t.charAt(i)) || (t.charAt(i)=='_') ) {}
	    else m = false;
	    i += 1;
          }
	  if(m && !Vhdl.isaReservedWord(t)) r = true;
	}
      }
      catch(e)
      {
	report("487 VhdlRead isIdentifier() " + e);
      }
      return(r);
    }
    parse() {
        this.LineNumber = 0;
        this.Position = 0;
        this.SLength = this.S.length;
        this.bDataToProcess = true;
        this.limit = 10000;
        this.z = 0;
//        report("420 " + this.S);
        try {
            while(this.bDataToProcess && (this.z < this.limit))
            {
              this.doAction();  // do action on current state State
              let tempState = this.State;
              this.State = this.nextState();
              this.LastState = tempState;
	      if(this.State == this.LastState) this.z += 1;
	      else this.z = 0;
            }
            report("431 z = " + this.z + " State = " + this.State);
        }
        catch(e) {
                report("311 " + e);
        }
        return(this.model);
    }
    
    getToken() {
      return(this.Token);
    }
    
    whitespace() {
      let r = false;
      try {
        let S = this.S;
        if(this.Position < S.length)
        {
          let c = S.charAt(this.Position);
          if( (c == '\n')||(c == '\r') ) 
	  {
	    this.LineNumber += 1;
	    r = true;
          }
/*          else if((c == ' ')||(c == '\0')||
   	    (c == '\012')||(c == '\014') ||(c == '\010') ||(c == '\022') ||
            (c == '\011')||(c == '\013') ||
            (c == '\015')) */
          else if((c == ' ')||(c == 0x00)||
   	    (c == 0x0a)||(c == 0x0c) ||(c == 0x08) ||(c == 0x12) ||
            (c == 0x09)||(c == 0x0b) ||
            (c == 0x0d)) 
          {
            r=true;
          }
//          if(Character.isWhitespace(c)) r = true;
          if(this.Position + 1 < S.length)
	  {
	    if((c == '-') && (S.charAt(this.Position + 1) == '-'))
            {
              this.comment=true;
              report("472 comment start");
              r = true;
	    }
	    
	    if(this.comment)
            {
              while((c != 0x0a) && (this.comment && (c != '\n')))
              {
                this.Position += 1;
                c = S.charAt(this.Position);
              }
            }

            if((c == 0x0a) || (this.comment && (c == '\n')))
	    {
	      this.comment=false;
              report("479 comment end");
	      r=true;
	    }
          }
        }
      }
      catch(e) { report("362 " + e);}
      return(r);
    }   
    
    isSingleDelimiter() {
      let r = false;
      try {
        let c = this.S.charAt(this.Position);
        if(c == '&' || c =='\'' || c == '(' ||c == ')' ||
	c == '*' || c == '+' || c == '-' || c == '.' ||
	c == ',' || c == '/' || c == ':' || c == ';' ||
	c == '<' || c == '=' || c == '>' || c == '|' ||
	c == '[' || c == ']' || c == '\"')
        {
          r = true;
        }
      }
      catch(e)
      {
	report("384 VhdlReader isSingleDelimiter() " + e);
      }
      return r;
    }
    
    isCompoundDelimiter() {
      let r=false;
      if(this.Position + 2 < this.SLength)
      {
	let t = this.S.substring(this.Position, this.Position + 2);
	if((t == "<=") || (t ==":=") || (t == "/=") ||
		(t == ">=") || (t == "=>") || (t == "**") ||
		(t == "<>")) r=true;
      }
      return r;
    }    
    
    tokenIs(s) {
      return(s.toLowerCase() == this.Token.toLowerCase());   
    }
    
    getNextToken() {
      this.DataToProcess = this.nextToken();  
      return(this.Token);
    }
    
    nextToken() {
        let r = true;
        if(this.tokencache != null) // if something in cache, use it
        {
          this.Token = this.tokencache;
          this.tokencache = null;
        }
        else
        {
          r = this.nextToken1();  
        }
        return(r);
    }
    
    nextToken1() {
      let r=true;
      let j = this.Position;
      let i = 0;
      let S = this.S;
      this.LastToken = this.Token;
      let Token = "";
      this.CommentStringBuffer = this.WorkingCommentStringBuffer;
      this.WorkingCommentStringBuffer = "";
      if(this.Position < this.SLength)
      {
        let c = S.charAt(j);
        while((this.whitespace()) && (this.Position < this.SLength) ) //&&(c!=EOF))
	{
//	System.out.println("whitespace");
	  if(this.comment == true) this.WorkingCommentStringBuffer += S.charAt(this.Position);
	  this.Position +=1;
	}
      }
      else r = false;
      if(this.Position < this.SLength)
      {
        j = this.Position;
        if(this.isCompoundDelimiter())	/* compound delimiter */
	{
//	System.out.println("CompoundDelimiter");
	  Token = S.substring(j, this.Position + 2);
	  this.Position += 2;
	}
        else if(this.isSingleDelimiter())	/* single delimiter */
	{
//	System.out.println("SingleDelimiter");
	  Token = S.substring(this.Position, this.Position + 1);
	  this.Position += 1;
//	  if(this.tokenIs("\""))
	  if(Token == "\"")
	  {
            report("559 Processing a string start");
            let bString = true;
            while(bString)
            {
              while((S.charAt(this.Position) != '\"') &&  
                      !((S.charAt(this.Position) == '\"') && (S.charAt(this.Position + 1) == '\"') ) )
              {
                Token += S.charAt(this.Position);
                if((S.charAt(this.Position) == '\"') && (S.charAt(this.Position + 1) == '\"') )
                {
                  this.Position += 1;
                }
                this.Position += 1;
              }
              if(this.checkExtended(S, Token)) {}
              else 
                  bString = false;
            }
//            report("861 " + S.charAt(this.Position));
        
	    Token += "\"";
	    this.Position += 1;
            report("572 Processing a string end: " + Token);
          }
	}
        else if(this.ProcessingAString) 
	{
	  report("567 Processing a string start");
	  while(S.charAt(this.Position) != '\"') 
          {
	    Token += S.charAt(this.Position);
	    this.Position += 1;
          }
	  report("573 Processing a string end");
	}
        else if(Vhdl.isDigit(S.charAt(this.Position)))	/* abstract literals */
	{
//	System.out.println("abstract literal");

	  Token = S.substring(this.Position, this.Position + 1);
	  this.Position +=1; 
          i=1;
	  while(Vhdl.isDigit(S.charAt(this.Position))||(S.charAt(this.Position)=='_')) /* first integer */
	  {
	    Token += S.charAt(this.Position);
	    i+=1;
	    this.Position +=1;
	  }
	  if(S.charAt(this.Position)=='.')
	  {
	    Token += S.charAt(this.Position);
	    this.Position +=1;i=1;
	    while(Vhdl.isDigit(S.charAt(this.Position))||(S.charAt(this.Position)=='_'))
	    {
	      Token += S.charAt(this.Position);
              i+=1; 
              this.Position +=1;
            }
          }
	  else if(S.charAt(this.Position)=='E')
	  {
	    Token += S.charAt(this.Position);
	    this.Position +=1;
            i=1;
	    if((S.charAt(this.Position)=='+')||(S.charAt(this.Position)=='-'))
	    {
	      Token += S.charAt(this.Position);
              this.Position +=1;
              i=1;
            }
	    while(Vhdl.isDigit(S.charAt(this.Position))||(S.charAt(this.Position)=='_'))
	    {
	      Token += S.charAt(this.Position);
              i+=1; 
              this.Position +=1;
            }
          }
	  else if(S.charAt(this.Position)=='#')
	  {
	    Token += S.charAt(this.Position);
	    this.Position +=1;
            i=1;
            while(Vhdl.isAlnum(S.charAt(this.Position))||(S.charAt(this.Position)=='_'))
            {
              Token += S.charAt(this.Position);
              i+=1;
              this.Position +=1;
            }
          }
	  if(S.charAt(this.Position)=='.')
          {
            Token += S.charAt(this.Position);
            this.Position +=1;
            i=1;
            while(Vhdl.isAlnum(S.charAt(this.Position))||(S.charAt(this.Position)=='_'))
            {
              Token += S.charAt(this.Position);
              i+=1; 
              this.Position +=1;
            }
          }
	  if(S.charAt(this.Position)=='#')
          {
            if(S.charAt(this.Position)=='E')
            {
              Token += S.charAt(this.Position);
              this.Position +=1;
              i=1;
              if((S.charAt(this.Position)=='+')||(S.charAt(this.Position)=='-'))
              {
                Token += S.charAt(this.Position);
                this.Position +=1;
                i=1;
              }
              while(Vhdl.isDigit(S.charAt(this.Position))||(S.charAt(this.Position)=='_'))
              {
                Token += S.charAt(this.Position);
                i+=1; 
                this.Position +=1;
              }
            }
          }
 	}
        else if(Vhdl.isAlpha(S.charAt(this.Position)))	/* basic identifier */
	{
//	System.out.println("basic identifier");
	  while(Vhdl.isAlnum(S.charAt(this.Position))||(S.charAt(this.Position)=='_'))
          {
            i+=1; 
            this.Position +=1;
          }
	  Token = S.substring(j, this.Position);
	  i=1;
	}
        else if((S.charAt(this.Position)=='\\') && (this.ProcessingAString == false))		/* extended identifier */
	{
	report("676 Extended Identifier");
	Token = S.substring(this.Position,this.Position + 1);
	this.Position +=1; 
        i=1;
	if(this.isgraph(S.charAt(this.Position)))
        {
          Token += S.charAt(this.Position);
          i+=1; 
          this.Position +=1;
          while(isgraph(S.charAt(this.Position))||(S.charAt(this.Position)!='\\'))
          {
            Token += S.charAt(this.Position);
            i+=1; 
            this.Position +=1;
          }
          if(S.charAt(this.Position)=='\\')
          {
            Token += S.charAt(this.Position);
            i+=1; 
            this.Position +=1;
          }
        }
      }
      else
      {
	report("701 bad parse [" + this.LineNumber + "]" );
	Token += S.charAt(this.Position);
	this.Position +=1;
      }
    }
    else r = false;
    this.bDataToProcess = r;
    this.Token = Token;
//    report("721 Token is " + Token);
    return(r);
  } // end nextToken()

  checkExtended(S, Token) {   // used for multi-line concatenated strings
    let b = false;
    let p = this.Position;
//    report("1020 " + S.charAt(p) + " " + Token);
    if(S.charAt(p) == "\"") p += 1;
    while(S.charAt(p) == " ") p += 1;
    if(S.charAt(p) == "&")
    {
       while(S.charAt(p) != "\"") p += 1;
       p += 1;
//       report("1027 " + S.charAt(p));
       b = true;
       this.Position = p;
    }
    return(b);
  }
  
  nextState0() {
    let ns = this.State;
    return(ns);
  }
  
  doAction0() {
    this.nextToken();
  }
    
} // end VhdlReader
    
    
    

