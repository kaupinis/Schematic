//eo_vhdl_decoder.js

class VhdlDecoder extends VhdlReader {
    constructor(s) {
        super(s);
        this.Stack = [];
        this.DataToProcess = true;
        this.action = false;
        this.PortMode = "";
        this.PortList =[];
        this.PortType = "";
        this.PortValue = "";
        this.ArchitectureName = "";
        this.EntityName = "";
        this.ComponentName = "";
        this.Limit1 = "";
        this.Limit2 = "";
        this.Direction = "";
        this.HasRange = false;
        this.ShowAction = false;
        this.queueListClear = false;
        this.AliasDesignator = "";
        this.AliasName = "";
        this.SubtypeIndication = "";
        this.Label = "";
        this.Operator = "";
        this.ht = null;
        this.L1 = "";
        this.L2 = "";
        this.R1 = null;
        this.RD = null;
        this.R2 = null;
        this.Op1 = "";
        this.Arg2 = "";
    }
    
    static parseVhdl1(s) {
      let p = new Promise( function(resolve, reject) {
        let vr = new VhdlDecoder(s);
        try {
          let o = vr.parse();
          resolve(o);
        }
        catch(e) {
          reject("45 parseVhdl1 " + e);
        }
      });
      return(p);
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
            report("69 z = " + this.z + " State = " + this.State);
        }
        catch(e) {
                report("72 " + e);
        }
        return(this.model);
    }

    nextState() {
  /*      if(Debug)
	{
	if( (State > 1215) || (State < 1000)) report("State is " + Integer.toString(State));
	else
		{
		let stateName = a[State - 1000];
		if(bTrace) report(" .. " + this.Token + " \t" + stateName + " " + Integer.toString(Position));
		}
	}
	*/
report("88 this.State = " + this.State + " " + Vhdl.StateNames[this.State] + " " + this.Token);
switch(this.State)
{
case Vhdl.S_null_state:
	this.Stack.push(Vhdl.S_design_file);
	break;
case Vhdl.S_design_file:
	this.Stack.push(Vhdl.S_design_unit);
	this.nextToken();
	break;
case Vhdl.S_design_unit:
	if(this.tokenIs("library")) this.Stack.push(Vhdl.S_library_clause);
	else if(this.tokenIs("use")) this.Stack.push(Vhdl.S_use_clause);
	else if(this.tokenIs("entity")) this.Stack.push(Vhdl.S_entity_declaration);
	else if(this.tokenIs("configuration")) this.Stack.push(Vhdl.S_configuration_declaration);
	else if(this.tokenIs("package")) 
		{
		if(getNextthis.Token().equals("body")) this.Stack.push(Vhdl.S_package_body);
		else this.Stack.push(Vhdl.S_package_declaration);
		}
	else if(this.tokenIs("architecture")) this.Stack.push(Vhdl.S_architecture_body);
	else 
		{
//		this.Stack.pop();
		}
	this.nextToken();
	break;
case Vhdl.S_package_declaration:  // this is a patch
//	if(this.isIdentifier())
		{
		this.nextToken();
		while(! this.tokenIs("end")) this.nextToken();
		this.nextToken();
		while(! this.tokenIs("end")) this.nextToken();
		this.nextToken();
		this.Stack.pop();
		}
case Vhdl.S_library_clause:
	if(this.isIdentifier()) 
		{
		this.action = true;
		this.Stack.push(Vhdl.S_logical_name_list);
		}
	else this.Stack.pop();
	break;
case Vhdl.S_logical_name_list:
	this.nextToken();
	if(this.tokenIs(","))
		{
		this.nextToken();
		if(this.isIdentifier())
			{
			this.Stack.push(Vhdl.S_logical_name_list);
			this.action = true;
			}
		}
	else if(this.tokenIs(";"))
		{
		this.Stack.pop();
		this.nextToken();
		}
	break;
case Vhdl.S_use_clause:
	this.nextToken();
	if(this.tokenIs(";"))
		{
		this.Stack.pop();
		this.nextToken();
		}
	break;
case Vhdl.S_entity_declaration:
	if(this.LastState == Vhdl.S_entity_declaration)
		{
		this.nextToken();
		if(this.tokenIs("is"))
			{
			this.Stack.push(Vhdl.S_entity_header);
			}
		else 
			{
			report("Entity declaration requires keyword is.");
			this.Stack.pop();
			}
		}
	else if(this.isIdentifier())
		{
		this.action = true;
		}
	else 
		{
		report("No entity identifier.");
		this.Stack.pop();
		}
	break;
case Vhdl.S_entity_header:
	if(! this.tokenIs("end")) this.nextToken();
	if(this.tokenIs("generic"))
		{
		this.Stack.push(Vhdl.S_generic_clause);
		}
	else if(this.tokenIs("port"))
		{
		this.Stack.push(Vhdl.S_port_clause);
		}
	else if(this.tokenIs("end"))
		{
		this.nextToken();
		if(this.tokenIs("entity")) this.nextToken();
		if(this.isIdentifier()) this.nextToken();
		if(this.tokenIs(";"))
			{
			this.nextToken();
			this.Stack.pop();
			}
		else report("Entity does not end with ;");
		}
	else 
		{
		this.Stack.pop();
		this.Stack.push(Vhdl.S_entity_declarative_part);
		}
	break;
case Vhdl.S_generic_clause:
	if(this.LastState != Vhdl.S_generic_clause) this.Stack.pop();
	this.nextToken();
	this.PortList = [];
	if(this.tokenIs("(")) this.Stack.push(Vhdl.S_generic_list);
	else if(this.tokenIs(")"))
		{
		this.nextToken();
		if(this.tokenIs(";"))
			{
			this.Stack.pop();
			}
		}
	break;
case Vhdl.S_generic_list:
//	report("gl entry : " + this.Token);
	this.nextToken();
//	report("gl 2 generic name : " + this.Token);
	this.PortValue = null;
	if(this.queueListClear)
		{
		this.queueListClear = false;
		this.PortList = [];
		}
	while(this.isIdentifier())
		{
		this.PortList.push(this.Token);
		this.nextToken();
//	report("gl 3 : " + this.Token);
		if(this.tokenIs(",")) this.nextToken();
		}
//	report("gl 4: : " + this.Token);
	if(this.tokenIs(":"))
		{
		this.nextToken();
//	report("gl 5 type : " + this.Token);
		if(this.isIdentifier())
			{
			this.PortType = this.Token;
			this.nextToken();
			if(this.tokenIs("range"))
				{
				this.nextToken();
				R1 = this.Token;
				this.nextToken();
				RD = this.Token;
				this.nextToken();
				R2 = this.Token;
				this.nextToken();
				}
			if(this.tokenIs("("))
				{
				this.nextToken();
				this.Limit1 = this.Token;
				this.nextToken();
				this.Direction = this.Token;
				this.nextToken();
				this.Limit2 = this.Token;
				this.nextToken();
				this.nextToken();
				}
//	report("gl 6:= : " + this.Token);
			if(this.tokenIs(":="))
				{
				let vc = "";
				this.nextToken();
				this.PortValue = this.Token;
				if(this.tokenIs("x"))
					{
					vc = this.Token;
					this.nextToken();
					}
				if(this.tokenIs("-"))
					{
					this.nextToken();
					this.Token = "-" + this.Token;
					this.PortValue = this.Token;
					}
				if(this.tokenIs("\"")) 
					{
					this.nextToken();
					this.Token = vc + "\"" + this.Token + "\"";
					this.PortValue = this.Token;
					}
				else if(this.tokenIs("\'"))
					{
					this.nextToken();
					vc = "\'" + this.Token + "\'";
					while(!this.tokenIs("\'")) this.nextToken();
					this.nextToken();
					this.PortValue = vc;
					}
				else if(this.Token.indexOf("\"") == 0)
					{
					this.PortValue = vc + this.Token;
					}
				while((!this.tokenIs(";")) && (!this.tokenIs(")")) )
					{
					this.nextToken();
					}
//	report("gl this.PortValue : " + this.PortValue);
				//this.nextToken();
				}
//	report("gl 7 : " + this.Token);
			if(this.tokenIs(";"))
				{
				this.action = true;
				this.queueListClear = true;
				}
			else if(this.tokenIs(")"))
				{
				this.action = true;
				}
			}
		}
	else if(this.tokenIs(";"))
		{
//	report("gl 8 : " + this.Token);
		this.Stack.pop();
		}
	break;
	
case Vhdl.S_port_clause:
//	if(this.LastState != Vhdl.S_port_clause) this.Stack.pop();
	if(this.tokenIs("port")) this.nextToken();
	if(this.tokenIs(";")) this.nextToken();
//	this.nextToken();
	this.PortList = [];
	if(this.tokenIs("(")) 
		{
		this.nextToken();
		this.Stack.push(Vhdl.S_port_list);
		}
	else if(this.tokenIs(")"))
		{
		this.nextToken();
		if(this.tokenIs(";"))
			{
			this.Stack.pop();
			}
		}
	else this.Stack.pop();
	break;
case Vhdl.S_port_list:
	this.Op1 = "";
	this.Arg2 = "";
	if(this.tokenIs(")")) 
		{
//		this.nextToken();
		this.Stack.pop();
		}
//	if(! this.tokenIs("end")) this.nextToken();
	if(this.queueListClear)
		{
		this.queueListClear = false;
		this.PortList= [];
		}
	while(this.isIdentifier())
		{
		this.PortList.push(this.Token);
		this.nextToken();
		if(this.tokenIs(",")) this.nextToken();
		}
	if(this.tokenIs(":"))
		{
		this.nextToken();
		if(this.tokenIs("in") || this.tokenIs("out") || this.tokenIs("inout") || this.tokenIs("buffer") || this.tokenIs("linkage"))
			{
			this.PortMode = this.Token;
			report("Port Mode = " + this.PortMode);
			this.nextToken();
			}
		if(this.isIdentifier())
			{
			this.PortType = this.Token;
			this.nextToken();
			if(this.tokenIs("("))
				{
				this.HasRange = true;
				this.nextToken();
				if(this.tokenIs("("))
					{
					this.nextToken();
					this.Limit1 = this.Token;
					this.nextToken();
					this.Op1 = this.Token;
					this.nextToken();
					this.Arg2 = this.Token;
					while(! this.tokenIs(")"))
						{
						this.nextToken();
						}
					}
				else this.Limit1 = this.Token;
				this.nextToken();
// fudge
				if( (this.tokenIs("-")) || (this.tokenIs("+")) )
					{
					this.nextToken();
					this.nextToken();
					}

				if(this.tokenIs("downto") || this.tokenIs("to")) this.Direction = this.Token;
				this.nextToken();
//				report("** " + this.Token);
				if(this.tokenIs("("))
					{
					this.nextToken();
					this.Limit2 = this.Token;
					this.nextToken();
					this.Op1 = this.Token;
					this.nextToken();
					this.Arg2 = this.Token;
					while(! this.tokenIs(")"))
						{
						this.nextToken();
						}
					}
				else this.Limit2 = this.Token;
				this.nextToken();
				while(!this.tokenIs(")"))
					{
					this.Limit2 += this.Token;
					this.nextToken();
					}
				this.nextToken(); // this should be ;
//				report("** " + this.Token);
				}
			else this.HasRange = false;
			if(this.tokenIs(":="))
				{
				while( (!this.tokenIs(";")) && (!this.tokenIs(")")) )
					{
					this.nextToken();
					}
				}
			if(this.tokenIs(";")) // normal entry
				{
				this.action = true;
				this.queueListClear = true;
				this.nextToken();
				}
			else if(this.tokenIs(")")) // end of list
				{
				this.action = true;
				this.queueListClear = true;
//				this.nextToken();
//				this.nextToken();
				}
			}
		}
	else if(this.tokenIs(";") || this.tokenIs("end"))
		{
		this.Stack.pop();
		}
	else if(this.tokenIs(")"))
		{
//		this.nextToken();
//		this.Stack.pop();
		}
	break;
case Vhdl.S_subtype_indication:

	break;
case Vhdl.S_entity_declarative_part:
//	this.nextToken();
	if(this.tokenIs("procedure") || this.tokenIs("function"))
		{
		this.Stack.push(Vhdl.S_subprogram_declaration);
		}
	else if(this.tokenIs("type")) this.Stack.push(Vhdl.S_type_declaration);
	else if(this.tokenIs("subtype")) this.Stack.push(Vhdl.S_subtype_declaration);
	else if(this.tokenIs("constant")) this.Stack.push(Vhdl.S_constant_declaration);
	else if(this.tokenIs("signal")) this.Stack.push(Vhdl.S_signal_declaration);
	else if(this.tokenIs("file")) this.Stack.push(Vhdl.S_file_declaration);
	else if(this.tokenIs("alias")) this.Stack.push(Vhdl.S_alias_declaration);
	else if(this.tokenIs("attribute")) 
		{
		this.nextToken();
		if(this.isIdentifier())
			{
			this.Label = this.Token;
			this.nextToken();
			if(this.tokenIs(":")) this.Stack.push(Vhdl.S_attribute_declaration);
			else if(this.tokenIs("of")) this.Stack.push(Vhdl.S_attribute_specification);
			}
		}
	else if(this.tokenIs("disconnect")) this.Stack.push(Vhdl.S_disconnection_specification);
	else if(this.tokenIs("use")) this.Stack.push(Vhdl.S_use_clause);
	else if(this.tokenIs("begin")) this.Stack.push(Vhdl.S_entity_statement_part);
	else if(this.tokenIs("end"))
		{
		this.nextToken();
		while(!this.tokenIs(";")) this.nextToken();
		this.action = true;
		}
	else if(this.tokenIs(";"))
			{
			this.nextToken();
			this.Stack.pop();
			}
	else report("Entity does not end with ;");
//		}

	break;
case Vhdl.S_attribute_declaration:
	this.nextToken();
	while(!this.tokenIs(";")) this.nextToken();
	this.nextToken();
	this.Stack.pop();
//	this.Stack.push(Vhdl.S_entity_declarative_part);
	break;
case Vhdl.S_attribute_specification:
	if(this.tokenIs(";")) 
		{
		this.nextToken();
		this.Stack.pop();
		}
	else
	{
	this.nextToken();
	if(this.isIdentifier())
		{
		this.L1 = this.Token;
		this.nextToken();
		if(this.tokenIs(":"))
			{
			this.nextToken();
			if(this.tokenIs("entity") || this.tokenIs("signal") ||this.tokenIs("configuration") || this.tokenIs("procedure") || this.tokenIs("function") ||
				this.tokenIs("package") || this.tokenIs("type") || this.tokenIs("subtype") || this.tokenIs("constant") || this.tokenIs("architecture") ||
				this.tokenIs("variable") || this.tokenIs("component") || this.tokenIs("label") || this.tokenIs("literal") || this.tokenIs("units"))
				{
				this.L2 = this.Token;
				this.nextToken();
				if(this.tokenIs("is"))
					{
					this.nextToken();
					let sb = "";
					while(!this.tokenIs(";"))
						{
						sb += this.Token;
						if(this.tokenIs("&")) sb += "\n";
						this.nextToken();
						}
					this.AliasName = sb;
					this.action = true;
					}
				}
			}
		}
	}
//	while(!this.tokenIs(";")) this.nextToken();
//	this.Stack.push(Vhdl.S_entity_declarative_part);
	break;
case Vhdl.S_constant_declaration:
	if(this.tokenIs("constant")) this.nextToken();
	if(this.queueListClear)
		{
		this.queueListClear = false;
		this.PortList = [];
		}
	while(this.isIdentifier())
		{
		this.PortList.push(this.Token);
		this.nextToken();
		if(this.tokenIs(",")) this.nextToken();
		}
	if(this.tokenIs(":"))
		{
		this.nextToken();
		if(this.isIdentifier())
			{
			this.PortType = this.Token;
			this.nextToken();
			if(this.tokenIs("("))
				{
				this.HasRange = true;
				this.nextToken();
				this.Limit1 = this.Token;
				this.nextToken();
				if(this.tokenIs("downto") || this.tokenIs("to")) this.Direction = this.Token;
				this.nextToken();
				this.Limit2 = this.Token;
				this.nextToken();
				this.nextToken();
				}
			else this.HasRange = false;
			sb3 = "";
			report("got here: " + this.Token);
			if(this.tokenIs(":="))
				{
				this.nextToken();
				while(!this.tokenIs(";"))
					{
					sb3 += this.Token;
					report("first check: " + this.Token);
					this.nextToken();
					}
				}
			if(this.tokenIs(";"))
				{
				this.action = true;
				this.queueListClear = true;
				}
			else if(this.tokenIs(")"))
				{
				this.action = true;
				this.queueListClear = true;
				this.nextToken();
				}
			else this.nextToken(); // this is a fudge
			}
		}
	else if(this.tokenIs(";"))
		{
		this.nextToken();
		this.Stack.pop();
		}
	else this.nextToken(); // this isalso a fudge;
	break;
case Vhdl.S_architecture_body:
	if(this.isIdentifier())
		{
		this.ArchitectureName = this.Token;
		this.nextToken();
		if(this.tokenIs("of"))
			{
			this.nextToken();
			this.EntityName = this.Token;
			this.nextToken();
			this.action = true;
			}
		}
	else if(this.tokenIs("is"))
		{
		this.Stack.push(Vhdl.S_architecture_declarative_part);
		}
	break;	
case Vhdl.S_architecture_declarative_part:
	this.PortList = [];
	if(this.tokenIs("begin"))
		{
		this.Stack.pop();
		this.Stack.push(Vhdl.S_architecture_statement_part);
		}
	else if(this.tokenIs("end"))
		{
		this.nextToken();
		if(this.tokenIs("function") || this.tokenIs("procedure"))
			{
			this.nextToken();
			}
		}
	else
		{
		if(this.tokenIs("procedure") || this.tokenIs("function"))
			{
			this.Stack.push(Vhdl.S_subprogram_specification);
			}
		else if(this.tokenIs("type")) this.Stack.push(Vhdl.S_type_declaration);
		else if(this.tokenIs("subtype")) this.Stack.push(Vhdl.S_subtype_declaration);
		else if(this.tokenIs("constant")) this.Stack.push(Vhdl.S_constant_declaration);
		else if(this.tokenIs("signal")) this.Stack.push(Vhdl.S_signal_declaration);
		else if(this.tokenIs("file")) this.Stack.push(Vhdl.S_file_declaration);
		else if(this.tokenIs("alias")) this.Stack.push(Vhdl.S_alias_declaration);
		//else if(this.tokenIs("attribute")) this.Stack.push(Vhdl.S_attribute_declaration);
		//else if(this.tokenIs("attribute")) this.Stack.push(Vhdl.S_attribute_specification);
		else if(this.tokenIs("attribute")) 
			{
			this.nextToken();
			if(this.isIdentifier())
				{
				this.Label = this.Token;
				this.nextToken();
				if(this.tokenIs(":")) this.Stack.push(Vhdl.S_attribute_declaration);
				else if(this.tokenIs("of")) this.Stack.push(Vhdl.S_attribute_specification);
				}
			}
		else if(this.tokenIs("component")) this.Stack.push(Vhdl.S_component_declaration);
		else if(this.tokenIs("for")) this.Stack.push(Vhdl.S_configuration_specification);
		else if(this.tokenIs("disconnect")) this.Stack.push(Vhdl.S_disconnection_specification);
		else if(this.tokenIs("use")) this.Stack.push(Vhdl.S_use_clause);
		this.nextToken();
		}
	break;
case Vhdl.S_disconnection_specification:  // temporary
	if(this.tokenIs("disconnect")) this.nextToken();
	while(!this.tokenIs(";")) this.nextToken();
	if(this.tokenIs(";")) this.Stack.pop();
	break;
case Vhdl.S_configuration_specification:  // temporary
	if(this.tokenIs("for")) this.nextToken();
	while(!this.tokenIs(";")) this.nextToken();
	if(this.tokenIs(";")) this.Stack.pop();
	break;
case Vhdl.S_file_declaration:  // temporary
	if(this.tokenIs("file")) this.nextToken();
	while(!this.tokenIs(";")) this.nextToken();
	if(this.tokenIs(";")) this.Stack.pop();
	break;
case Vhdl.S_subprogram_specification:  // temporary
//	while( !((this.tokenIs("is")) || (this.tokenIs(";")))) this.nextToken();
	while( !((this.tokenIs("is")) )) this.nextToken();
	if(this.tokenIs("is")) this.Stack.push(Vhdl.S_subprogram_body);
	break;
case Vhdl.S_subprogram_body: // temporary
	let w = true;
	while(w && !this.tokenIs("end")) 
		{
		this.nextToken();
		if(this.tokenIs("end"))
			{
			this.nextToken();
			if(!this.tokenIs("loop")) w = false;
			}
		}
	while(!this.tokenIs(";")) this.nextToken();
	this.Stack.pop();
	this.Stack.pop();
	break;
case Vhdl.S_type_declaration:
	if(this.tokenIs("type")) this.nextToken();
	if(this.isIdentifier())
		{
		this.AliasDesignator = this.Token;
		this.nextToken();
		if(this.tokenIs("is")) this.nextToken();
		if(this.tokenIs("(")) 
			{
			this.nextToken();
			while(!this.tokenIs(")")) 
				{
				this.nextToken();
				}
			}
		while(!this.tokenIs(";")) this.nextToken();
		//this.nextToken(); //of
		//this.nextToken();
		}
	else if(this.tokenIs(";")) 
		{
		this.nextToken();
		this.Stack.pop();
		}
	else this.nextToken();
	break;
case Vhdl.S_subtype_declaration:  // temporary
	if(this.tokenIs("subtype")) this.nextToken();
	if(this.isIdentifier())
		{
		this.AliasDesignator = this.Token;
		this.nextToken();
		if(this.tokenIs("is")) this.nextToken();
		if(this.tokenIs("(")) 
                {
                  this.nextToken();
		  while(!this.tokenIs(")")) 
		  {
                    this.nextToken();
                  }
		this.nextToken();
		}
	        else if(this.tokenIs(";")) this.Stack.pop();
                }
	break;
case Vhdl.S_alias_declaration:
	if(this.isIdentifier())
		{
		this.AliasDesignator = this.Token;
		this.nextToken();
		if(this.tokenIs(":"))
			{
			SubtypeIndication = "";
			while(! this.tokenIs("is"))
				{
				SubtypeIndication = SubtypeIndication + this.Token;
				this.nextToken();
				}
			}
		if(this.tokenIs("is"))
			{
			this.nextToken();
			this.AliasName = this.Token;
			this.action = true;
			this.nextToken();
			while(this.tokenIs("."))  // this is a patch for work.xxx signal
				{
				this.nextToken();
				this.AliasName = this.Token;
				this.nextToken();
				}
			if(this.tokenIs("("))
				{
				this.nextToken();
				this.Limit1 = this.Token;
				this.nextToken();
				if(this.tokenIs(")"))
					{
					this.AliasName = this.AliasName + "(" + this.Limit1 + ")";
					this.nextToken();
					}
				}
			}
		}
	else if(this.tokenIs(";"))
		{
		this.nextToken();
		this.Stack.pop();
		}
	break;
case Vhdl.S_component_declaration:
	if(this.isIdentifier())
		{
		this.ComponentName = this.Token;
		this.action = true;
		this.nextToken();
		}
	else if(this.tokenIs("is"))
		{
		this.nextToken();
		}
	else if(this.tokenIs("generic"))
		{
		this.Stack.push(Vhdl.S_generic_clause);
		}
	else if(this.tokenIs("port"))
		{
		this.Stack.push(Vhdl.S_port_clause);
		}
	else if(this.tokenIs(";")) this.nextToken();
	else if(this.tokenIs("end"))
		{
		this.nextToken();
		this.action = true;
		} //
	else if(this.tokenIs("component"))
		{
		this.nextToken();
		if(! this.tokenIs(";"))
			{
			this.nextToken();
			}
		if(this.tokenIs(";"))
			{
			this.nextToken();
			this.Stack.pop();
			}
		else 
			{
			report("component does not end with ;");
			this.Stack.pop();
			}
		}
	break;
case Vhdl.S_signal_declaration:
	if(this.queueListClear)
		{
		this.queueListClear = false;
		this.PortList = [];
		}
	while(this.isIdentifier())
		{
		this.PortList.push(this.Token);
		this.nextToken();
		if(this.tokenIs(",")) this.nextToken();
		}
	if(this.tokenIs(":"))
		{
		this.nextToken();
		if(this.isIdentifier())
			{
			this.PortType = this.Token;
			this.nextToken();
			if(this.tokenIs("("))
				{
				this.HasRange = true;
				this.nextToken();
//				report("** " + this.Token);
				if(this.tokenIs("("))
					{
					this.nextToken();
					this.Limit1 = this.Token;
					this.nextToken();
					this.Op1 = this.Token;
					this.nextToken();
					this.Arg2 = this.Token;
					while(!this.tokenIs(")"))
						{
						this.nextToken();
						}		
					}
				else this.Limit1 = this.Token;
				this.nextToken();
//				report("** " + this.Token);
				if(this.tokenIs("downto") || this.tokenIs("to")) this.Direction = this.Token;
				this.nextToken();
//				report("** " + this.Token);
				if(this.tokenIs("("))
					{
					this.nextToken();
					this.Limit2 = this.Token;
					this.nextToken();
					this.Op1 = this.Token;
					this.nextToken();
					this.Arg2 = this.Token;
					while(!this.tokenIs(")"))
						{
						this.nextToken();
						}		
					}
				else this.Limit2 = this.Token;
				this.nextToken();
//				report("** " + this.Token);
				}
			else this.HasRange = false;
			if(this.tokenIs(";"))
				{
				this.action = true;
				this.queueListClear = true;
				}
			else if(this.tokenIs(")"))
				{
				this.action = true;
				this.queueListClear = true;
				this.nextToken();
				}
			else this.nextToken(); // this is a fudge
			}
		}
	else if(this.tokenIs(";"))
		{
		this.Stack.pop();
		}
	else this.nextToken(); // this isalso a fudge;
	break;
case Vhdl.S_architecture_statement_part:
	if(this.tokenIs("end"))
		{
		this.nextToken();
		if(this.isIdentifier())
			{
			this.nextToken();
			}
		if(this.tokenIs(";"))
			{
			this.nextToken();
			this.Stack.pop();
			this.Stack.pop();
			}
		}
	else
		{
		this.Stack.push(Vhdl.S_concurrent_statement);
		}
	break;
case Vhdl.S_concurrent_statement:
	if(this.tokenIs("end")) this.Stack.pop();
	else {
	this.nextToken();
	//if(this.isIdentifier())
		{
		this.Label = null;
		if(this.tokenIs("postponed")) this.nextToken();
		if(this.tokenIs("block")) this.Stack.push(Vhdl.S_block_statement);
		else if(this.tokenIs("process")) 
			{
			this.Label = "PX" + Integer.toString(ProcNumber);
			ProcNumber += 1;
			this.Stack.push(Vhdl.S_process_statement);
			}
		else if(this.tokenIs("for")) this.Stack.push(Vhdl.S_generate_statement);
		else if(this.tokenIs("if")) this.Stack.push(Vhdl.S_generate_statement);
		else if(this.tokenIs("with")) this.Stack.push(Vhdl.S_selected_signal_assignment);
		else if(this.tokenIs("assert")) this.Stack.push(Vhdl.S_assertion_statement);
		else if(this.tokenIs("end")) this.Stack.push(Vhdl.S_architecture_statement_part);
		else {
		  this.Label = this.Token;
		  this.nextToken();
		  if(this.tokenIs("("))
			{
			this.nextToken();
			this.Limit1 = this.Token;
			this.nextToken();
			if(!this.tokenIs(")"))
				{
				this.nextToken();
				this.Limit2 = this.Token;
				this.nextToken();
				}
			this.nextToken();
			}
		  if(this.tokenIs(":"))
			{
			this.nextToken();
			if(this.tokenIs("postponed")) this.nextToken();
			if(this.tokenIs("block")) this.Stack.push(Vhdl.S_block_statement);
			else if(this.tokenIs("process")) this.Stack.push(Vhdl.S_process_statement);
			else if(this.tokenIs("for")) this.Stack.push(Vhdl.S_generate_statement);
			else if(this.tokenIs("if")) this.Stack.push(Vhdl.S_generate_statement);
			else if(this.tokenIs("with")) this.Stack.push(Vhdl.S_selected_signal_assignment);
			else if(this.tokenIs("assert")) this.Stack.push(Vhdl.S_assertion_statement);
			else
				{
				if(this.tokenIs("component")) this.nextToken();
				else if(this.tokenIs("configuration")) this.nextToken();
				if(this.tokenIs("entity")) 
					{
					this.nextToken();
					this.AliasName = this.Token;
					this.nextToken();
					if(this.tokenIs("."))
						{
						this.nextToken();
						this.AliasName = this.AliasName + "." + this.Token;
						this.nextToken(); 
						}
					if(this.tokenIs("("))
						{
						this.nextToken();
						this.AliasName = this.AliasName + "." + this.Token;
						this.nextToken(); // this should be ")"
						}
					
					}
				else 
					{
					this.AliasName = this.Token;
					this.nextToken();
					}
				if(this.tokenIs("port") || this.tokenIs("generic")) 
					{
					ht = new Hashtable();
					this.Stack.push(Vhdl.S_component_instantiation_statement);
					}

				}
			}
		  else if(this.tokenIs("<=")) 
			{
			this.action = true;
			this.Stack.push(Vhdl.S_conditional_signal_assignment);
			}
		  }
//		else if(this.tokenIs("end")) this.Stack.push(Vhdl.S_architecture_statement_part);
//		else this.nextToken();
		}
	//else 
	if(this.tokenIs("end")) this.Stack.pop();
	}
	break;
case Vhdl.S_generate_statement:  // temporary
	while(!this.tokenIs("end")) this.nextToken();
	this.nextToken(); // generate
	while(!this.tokenIs(";")) this.nextToken();
	this.nextToken();
	this.Stack.pop();
	break;
case Vhdl.S_selected_signal_assignment:
	if(this.tokenIs("with")) 
		{
		this.nextToken();
		this.Stack.push(Vhdl.S_expression);
		this.nextToken();
		this.action = true;
		}
	else if(this.tokenIs("select"))
		{
		this.nextToken();
		// get target
		this.Label = this.Token;
		this.nextToken();
		this.action = true;
		}
	else if(this.tokenIs("<="))
		{
		this.nextToken();
		if(this.tokenIs("guarded")) this.nextToken();
		else if(this.tokenIs("transport")) this.nextToken();
		else if(this.tokenIs("inertial")) this.nextToken();
		else if(this.tokenIs("reject")) this.nextToken();
		else
			{
			this.Stack.push(Vhdl.S_selected_waveforms);
			}
		}
	else if(this.tokenIs(";")) this.Stack.pop();
	else this.nextToken();
	break;
case Vhdl.S_selected_waveforms:
	if(this.tokenIs(";")) this.Stack.pop();
	else this.nextToken(); // temporary
	break;
case Vhdl.S_process_statement:
	if(this.tokenIs(";")) this.Stack.pop();
	{
	if(this.tokenIs("process"))
		{
		this.nextToken();
		this.action = true;
		}
	else if(this.tokenIs("("))
		{
		// call sensitivity list
		this.Stack.push(Vhdl.S_sensitivity_list);
		}
	else if(this.tokenIs(")"))
		{
		this.nextToken();
		//if(this.tokenIs("is")) // process declarative part
		while(!this.tokenIs("begin")) this.nextToken();
		}
	else if(this.tokenIs("begin"))
		{
		endCount = 0;
		this.Stack.push(Vhdl.S_process_statement_part);
		}
	else if(this.tokenIs("end"))
		{
		this.nextToken();
		if(this.tokenIs("process"))
			{
			this.nextToken();
			if(!this.tokenIs(";")) this.nextToken();
			this.Stack.pop();
			}
		}
	else if(this.tokenIs("if")) this.Stack.push(Vhdl.S_process_statement_part);
	else this.Stack.push(Vhdl.S_process_declarative_part);
	}
	break;
case Vhdl.S_process_declarative_part:
	if(this.tokenIs(";")) this.Stack.pop();
	else if(this.tokenIs("variable"))
		{
		this.nextToken();
		this.Stack.push(Vhdl.S_variable_declaration);
		}
	else if(this.tokenIs("begin")) this.Stack.pop();
	else {
	this.nextToken();
	if(this.tokenIs("begin")) this.Stack.pop();
	else if(this.tokenIs("end")) this.Stack.pop();
	else if(this.tokenIs("variable"))
		{
		this.nextToken();
		this.Stack.push(Vhdl.S_variable_declaration);
		}
	}
	break;
case Vhdl.S_process_statement_part:
	this.nextToken();
	if(this.tokenIs("process")) 
		{
		this.nextToken();
		//this.nextToken();
		this.Stack.pop();
		}
	else
	{
	if(this.tokenIs("if")) endCount += 1;
	if(this.tokenIs("case")) endCount += 1;
	if(this.isIdentifier() && !isaSpecialWord(this.Token))
		{
/*		this.nextToken();
		this.Label = "";
		if(this.tokenIs(":"))
			{
			this.Label = Lastthis.Token;
			this.nextToken();
			}
*/
		this.action = true;
		}
	else if(this.tokenIs("end")) 
		{
		endCount -= 1;
		if(endCount <= 0) 
			{
			this.Stack.pop();
			}
		}
//	else this.Stack.push(Vhdl.S_sequential_statement);
	}
	break;
case Vhdl.S_sequential_statement:
	if(this.isIdentifier() && !isaSpecialWord(this.Token))
		{
		this.nextToken();
		this.Label = "";
		if(this.tokenIs(":"))
			{
			this.Label = Lastthis.Token;
			this.nextToken();
			}
		else if(this.tokenIs("<=")) 
			{
			this.Stack.push(Vhdl.S_signal_assignment_statement);
			this.action = true;
			}
		else if(this.tokenIs(":=")) this.Stack.push(Vhdl.S_variable_assignment_statement);
		else if(this.tokenIs("(")) this.Stack.push(Vhdl.S_procedure_call_statement);
		}
	else if(this.tokenIs("wait")) this.Stack.push(Vhdl.S_wait_statement);
	else if(this.tokenIs("assert")) this.Stack.push(Vhdl.S_assertion_statement);
	else if(this.tokenIs("report")) this.Stack.push(Vhdl.S_report_statement);
	else if(this.tokenIs("if")) this.Stack.push(Vhdl.S_if_statement);
	else if(this.tokenIs("case")) this.Stack.push(Vhdl.S_case_statement);
	else if(this.tokenIs("loop")) this.Stack.push(Vhdl.S_loop_statement);
	else if(this.tokenIs("next")) this.Stack.push(Vhdl.S_next_statement);
	else if(this.tokenIs("exit")) this.Stack.push(Vhdl.S_exit_statement);
	else if(this.tokenIs("return")) this.Stack.push(Vhdl.S_return_statement);
	else if(this.tokenIs("null")) this.Stack.push(Vhdl.S_null_statement);
	else this.Stack.pop();
	break;
case Vhdl.S_if_statement:
	if(this.tokenIs("if")) 
		{
		endCount += 1;
		this.nextToken();
		}
	else if(this.tokenIs("end")) this.Stack.pop();
	else
		{
		this.nextToken();
		if(this.isIdentifier() && !isaSpecialWord(this.Token))
			{
			this.action = true;
			}
		}
	break;
case Vhdl.S_wait_statement:
	while(!this.tokenIs(";")) this.nextToken();
	this.Stack.pop();
	break;
case Vhdl.S_report_statement:
	while(!this.tokenIs(";")) this.nextToken();
	this.Stack.pop();
	break;
case Vhdl.S_case_statement:
	while(!this.tokenIs("end")) this.nextToken();
//	while(!this.tokenIs(";")) this.nextToken();
	this.Stack.pop();
	break;
case Vhdl.S_next_statement:
	while(!this.tokenIs(";")) this.nextToken();
	this.Stack.pop();
	break;
case Vhdl.S_exit_statement:
	while(!this.tokenIs(";")) this.nextToken();
	this.Stack.pop();
	break;
case Vhdl.S_return_statement:
	while(!this.tokenIs(";")) this.nextToken();
	this.Stack.pop();
	break;
case Vhdl.S_null_statement:
	while(!this.tokenIs(";")) this.nextToken();
	this.Stack.pop();
	break;
case Vhdl.S_signal_assignment_statement:
	while(!this.tokenIs(";")) 
		{
		this.nextToken();
//	if(this.isIdentifier() && !isaSpecialWord(this.Token))

		}
	this.Stack.pop();
	break;
case Vhdl.S_variable_assignment_statement:
	while(!this.tokenIs(";")) this.nextToken();
	this.Stack.pop();
	break;
case Vhdl.S_procedure_call_statement:
	while(!this.tokenIs(";")) this.nextToken();
	this.Stack.pop();
	break;

case Vhdl.S_variable_declaration:
	if(this.queueListClear)
		{
		this.queueListClear = false;
		this.PortList = [];
		}
	while(this.isIdentifier())
		{
		this.PortList.push(this.Token);
		this.nextToken();
		if(this.tokenIs(",")) this.nextToken();
		}
	if(this.tokenIs(":"))
		{
		this.nextToken();
		if(this.isIdentifier())
			{
			this.PortType = this.Token;
			this.nextToken();
			if(this.tokenIs("("))
				{
				this.HasRange = true;
				this.nextToken();
//				report("** " + this.Token);
				if(this.tokenIs("("))
					{
					this.nextToken();
					this.Limit1 = this.Token;
					this.nextToken();
					this.Op1 = this.Token;
					this.nextToken();
					this.Arg2 = this.Token;
					while(!this.tokenIs(")"))
						{
						this.nextToken();
						}		
					}
				else this.Limit1 = this.Token;
				this.nextToken();
//				report("** " + this.Token);
				if(this.tokenIs("downto") || this.tokenIs("to")) this.Direction = this.Token;
				this.nextToken();
//				report("** " + this.Token);
				if(this.tokenIs("("))
					{
					this.nextToken();
					this.Limit2 = this.Token;
					this.nextToken();
					this.Op1 = this.Token;
					this.nextToken();
					this.Arg2 = this.Token;
					while(!this.tokenIs(")"))
						{
						this.nextToken();
						}		
					}
				else this.Limit2 = this.Token;
				this.nextToken();
//				report("** " + this.Token);
				}
			else this.HasRange = false;
			if(this.tokenIs(";"))
				{
				this.action = true;
				this.queueListClear = true;
				}
			else if(this.tokenIs(")"))
				{
				this.action = true;
				this.queueListClear = true;
				this.nextToken();
				}
			else this.nextToken(); // this is a fudge
			}
		}
	else if(this.tokenIs(";"))
		{
		this.nextToken();
		this.Stack.pop();
		}
	else this.nextToken(); //
	break;
case Vhdl.S_sensitivity_list:
	if(this.tokenIs(")")) this.Stack.pop();
	else
	{
	this.PortList = [];
	while(!this.tokenIs(")"))
		{
		if(this.isIdentifier()) 
			{
			this.PortList.push(this.Token);
			}
		this.nextToken();
		}
	this.action = true;
	}
	break;
case Vhdl.S_assertion_statement:
	while(!this.tokenIs(";")) this.nextToken();
	this.Stack.pop();
	break;
case Vhdl.S_association_element:
	if(this.tokenIs(",")) this.Stack.pop();
	if(this.tokenIs(")")) this.Stack.pop();
	else if(this.isIdentifier())  // this.L1 is formal_designator
		{
		this.L1 = this.Token;
		this.nextToken();
		if(this.tokenIs("("))
			{
			this.nextToken();
			this.L1 = this.L1 + "(" + this.Token;
			this.nextToken();
			while(!this.tokenIs(")"))
				{
				this.L1 = this.L1 + " " + this.Token;
				this.nextToken();
				}
			this.L1 = this.L1 + ")";
			this.nextToken();
			}
		if(this.tokenIs("=>"))
			{
                        let bloop1 = true;
                        while(bloop1)
                        {
 //                       bloop1 = false;
			this.nextToken(); // this.L2 is actual_part
			if(this.tokenIs("x"))
				{
				this.nextToken();
				if(this.Token.indexOf("\"") == 0) this.L2 = "X" + this.Token;
				else this.L2 = "X";
				//this.nextToken();
				report(this.L1 + " => " + this.L2);
				}
			else if(this.tokenIs("\'"))
				{
				this.L2 = this.Token;
				this.nextToken();
				this.L2 += this.Token;
				this.nextToken();
				this.L2 += this.Token;
				//this.nextToken();
				}
			else if(this.tokenIs("\"")) 
				{
				this.nextToken();
				if(this.tokenIs(")")) this.L2 = null;
				else this.L2 = "\"" + this.Token + "\"";
				//this.nextToken();
				report(this.L1 + " => " + this.L2);
				}
			else if(this.tokenIs("("))
				{
				this.nextToken();
				if(this.tokenIs("others"))
					{
					this.L2 = this.Token;
					this.nextToken();
					while(!this.tokenIs(")"))
						{
						this.L2 += this.Token;
						this.nextToken();
						}
					}
				}
			else this.L2 = this.Token;
			if(this.tokenIs(")"))
				{
				this.L2 = "null";
				}
			else this.nextToken();
			while(this.tokenIs("."))  // this is a patch for work.xxx signal
				{
				this.nextToken();
				//this.L2 = this.L2 + "." + this.Token;
				this.L2 = this.Token;
				this.nextToken();
				}
			if(this.isIdentifier()) // eg. ns, us etc
				{
				this.L2 = this.L2 + this.Token;
				report("generic with suffix : " + this.L2);
				this.nextToken();
				}
			if(this.tokenIs("("))
				{
				this.L2 += "(";
				this.nextToken();
				while(!this.tokenIs(")"))
					{
					if(isaReservedWord(this.Token)) 
						{
						this.L2 += " " + this.Token + " ";
						}
					else this.L2 += this.Token;
					this.nextToken();
					}
				this.L2 += this.Token;
				this.nextToken();
				}
			if(this.tokenIs("\'"))
				{
				this.L2 += this.Token;
				this.nextToken();
				//this.L2 += this.Token;
				//this.nextToken();
				//this.L2 += this.Token;
				//this.nextToken();
				}
			if(this.tokenIs("\"")) 
                        {
                            report("1501");
                            this.nextToken();
                        }
			//if(this.tokenIs(",")) this.nextToken();
			ht.put(this.L1, this.L2);
			report("1498 this.L1 = " + this.L1 + ", this.L2 = " + this.L2 + " " + this.Token);
                        bloop1 = false;
                        if(this.tokenIs("&"))
                        {
                           this.nextToken();
                           this.nextToken();
                           report("1512 " + this.Token);
                           bloop1 = true;
                        }
                      
			}
                        }
		}

	break;
case Vhdl.S_association_list:
	if(this.tokenIs(")")) this.Stack.pop();
	else if(this.tokenIs(","))
		{
		this.nextToken();
		this.Stack.push(Vhdl.S_association_element);
		}
	else if(this.isIdentifier())  // formal_designator
		{
		this.Stack.push(Vhdl.S_association_element);
		}
	else
		{
		report("Vhdl.S_association_list: " + this.Token);
		this.Stack.pop();
		}
	break;
case Vhdl.S_component_instantiation_statement:
	if((this.tokenIs("port")) || (this.tokenIs("generic")) ) 
		{
		this.nextToken();  // map
		this.nextToken();  // (
		this.nextToken();
		this.Stack.push(Vhdl.S_association_list);
		}
	if(this.tokenIs(")"))
		{
		this.nextToken();
		if(this.tokenIs(";")) this.action = true;
		}
	else if(this.tokenIs(";")) 
		{
		this.Stack.pop();
		}
	break;
case Vhdl.S_conditional_signal_assignment:
	if(this.tokenIs(";")) this.Stack.pop();
	else 	{
		this.nextToken();
		if(this.tokenIs("guarded")) this.nextToken();
		else if(this.tokenIs("transport")) this.nextToken();
		else if(this.tokenIs("inertial")) this.nextToken();
		//else if(this.tokenIs("reject")) this.nextToken();
		else this.Stack.push(Vhdl.S_conditional_waveforms);
		}
	break;
case Vhdl.S_conditional_waveforms:
	if(this.tokenIs(";")) this.Stack.pop();
	else {
		if(this.tokenIs("when")) 
			{
			this.Stack.push(Vhdl.S_condition);
			}
		else if (this.tokenIs("else")) 
			{
			this.nextToken();
			this.Stack.push(Vhdl.S_waveform);
			}
		else this.Stack.push(Vhdl.S_waveform);
		}
	break;
case Vhdl.S_condition:
	if(this.tokenIs(";")) this.Stack.pop();
	else	{
		this.nextToken();
		if(this.tokenIs("else")) this.Stack.pop();
		else 
			{
			this.Stack.push(Vhdl.S_expression);
			this.action = true;
			}
		}
	break;
case Vhdl.S_waveform:
	if(this.tokenIs(";")) this.Stack.pop();
	else if(this.tokenIs(",")) 
		{
		this.nextToken();
		this.Stack.push(Vhdl.S_waveform_element);
		}
	else if(this.tokenIs("unaffected")) 
		{
		this.nextToken();
		this.Stack.pop();
		}
	else if(this.tokenIs("when")) this.Stack.pop();
	else this.Stack.push(Vhdl.S_waveform_element);
	break;
case Vhdl.S_waveform_element:
	if(this.tokenIs(";")) this.Stack.pop();
	else if(this.tokenIs("when")) this.Stack.pop();
	else if(this.tokenIs("null"))
		{
		this.nextToken();
		if(this.tokenIs("after"))
			{
			this.nextToken();
			this.L1 = this.Token;
			this.nextToken();
			this.L2 = this.Token;
			this.nextToken();
			}
		this.action = true;
		this.Stack.pop();
		}
	else if(this.tokenIs("after"))
		{
		this.nextToken();
		this.L1 = this.Token;
		if(isanInteger(this.Token))
			{
			this.nextToken();
			this.L2 = this.Token;
			}
		this.nextToken();
		while(!this.tokenIs(";")) this.nextToken();
		this.Stack.pop();
		}
//	else if(this.tokenIs(")"))
//		{
//		this.nextToken();
//		}
	else 
		{
		this.Stack.push(Vhdl.S_expression);
		r = true;
		this.action = true;
		}
	break;
case Vhdl.S_expression:
	this.Limit1 = "";
	if(this.tokenIs(";")) this.Stack.pop();
	else if( (this.tokenIs("and")) || (this.tokenIs("or")) || (this.tokenIs("xor")) ||
	   (this.tokenIs("nand")) || (this.tokenIs("nor")) || (this.tokenIs("xnor")) )
		{
		this.Limit1 = this.Token;
		this.nextToken();
		this.Stack.push(Vhdl.S_relation);
		this.action = true;
		}
	else if(r == false) this.Stack.pop();
	else this.Stack.push(Vhdl.S_relation);
	break;
case Vhdl.S_relation:
	if(this.tokenIs(";")) this.Stack.pop();
	else if((this.tokenIs("=")) || (this.tokenIs("/=")) || (this.tokenIs("<")) || (this.tokenIs("<="))
           || (this.tokenIs(">")) || (this.tokenIs(">="))) 
		{
		this.Limit1 = this.Token;
		this.Stack.push(Vhdl.S_relational_operator);
		this.action = true;
		}
	else if(this.tokenIs("not")) 
		{
		r = true;
		this.Stack.push(Vhdl.S_shift_expression);
		}
	else if(r == false) this.Stack.pop();
	else this.Stack.push(Vhdl.S_shift_expression);
	break;
case Vhdl.S_relational_operator:
	this.Stack.pop();
	this.nextToken();
	break;
case Vhdl.S_shift_expression:
	if(this.tokenIs(";")) this.Stack.pop();
	else if((this.tokenIs("sll")) || (this.tokenIs("srl")) || (this.tokenIs("sla")) || (this.tokenIs("rol"))
           || (this.tokenIs("ror")) ) 
		{
		this.Stack.push(Vhdl.S_shift_operator);
		this.action = true;		
		}
	else if(r == false) this.Stack.pop();
	else this.Stack.push(Vhdl.S_simple_expression);
	break;
case Vhdl.S_shift_operator:
	if(this.tokenIs(";")) this.Stack.pop();
	this.Stack.pop();
	this.nextToken();
	break;
case Vhdl.S_simple_expression:
	if(this.tokenIs(";")) this.Stack.pop();
	if(this.tokenIs("+")) 
		{
		Sign = 1;
		this.nextToken();
		this.Stack.push(Vhdl.S_term);
		}
	else if(this.tokenIs("-")) 
		{
		Sign = -1;
		this.nextToken();
		this.Stack.push(Vhdl.S_term);
		}
	else if(r == false) 
		{
		if((this.tokenIs("+")) || (this.tokenIs("-")) || (this.tokenIs("&")))
			{
			Operator = this.Token;
			this.nextToken();
			r = true;
			}
		else this.Stack.pop();
		}
	else this.Stack.push(Vhdl.S_term);
	break;
case Vhdl.S_term:
	if(this.tokenIs(";")) this.Stack.pop();
	else if(this.tokenIs("*"))
		{
		this.Limit2 = this.Token;
		this.nextToken();
		this.Stack.push(Vhdl.S_factor);
		}
	else if (this.tokenIs("abs") || this.tokenIs("not")) this.Stack.push(Vhdl.S_factor);
	else if(isaReservedWord(this.Token)) this.Stack.pop();
	else if(r == false) this.Stack.pop();
	else this.Stack.push(Vhdl.S_factor);
	break;
case Vhdl.S_factor:
	if(this.tokenIs(";")) this.Stack.pop();
	else if(this.tokenIs("abs")) 
		{
		this.nextToken();
		}
	else if(this.tokenIs("not"))
		{
		this.nextToken();
		}
	else if(this.isIdentifier() || (this.Token.indexOf("\'") != -1) )this.Stack.push(Vhdl.S_primary);
	else if(r == false) this.Stack.pop();
	else this.Stack.push(Vhdl.S_primary);
/*
	else 
		{
		this.Stack.pop();
		r = false;
		}
*/
	break;
case Vhdl.S_primary:
	if(this.tokenIs(";")) this.Stack.pop();
	else if(this.isIdentifier() || this.tokenIs("null"))
		{
		this.Label = this.Token;
		this.nextToken();
		if(this.tokenIs("."))
			{
			this.nextToken();
			this.Label = this.Label + "." + this.Token;
			}
		if(this.tokenIs("(")) // function call
			{
			while(!this.tokenIs(")")) this.nextToken();
			}
		else
			{
			this.action = true; // regster this in logic expression
			this.Stack.pop();
			r = false;
			}
		}
	else if(this.tokenIs("**"))
		{
		this.nextToken();
		this.Stack.push(Vhdl.S_primary);
		}
	else if(this.tokenIs("("))
		{
		this.nextToken();
		if(this.tokenIs("others"))
			{
			this.Stack.push(Vhdl.S_aggregate);
			}
		else this.Stack.push(Vhdl.S_expression);
		r = false;
		}
	else if(this.tokenIs(")"))
		{
		this.nextToken();
		this.Stack.pop();
		r = false;
		}
	else if(this.Token.indexOf("\'") == 0) // bit literal
		{
		this.nextToken();
		this.Label = "\'" + this.Token + "\'";
		this.nextToken();
		this.nextToken();
		if(this.tokenIs(",")) this.nextToken();
		this.action = true; // regster this in logic expression
		this.Stack.pop();
		r = false;
		}
	else if(this.Token.indexOf("\"") == 0) // string literal
		{
		this.nextToken();
		//this.Label = "\"" + this.Token + "\"";
		this.Label = this.Token;
		//this.nextToken();
		//this.nextToken();
		this.action = true; // regster this in logic expression
		this.Stack.pop();
		r = false;
		}
	else if(isanInteger(this.Token)) // decimal literal
		{
		this.nextToken();
		this.Label = this.Token;
		//this.action = true;
		this.Stack.pop();
		r = false;
		}
	else if(isaReservedWord(this.Token)) this.Stack.pop();
	else this.Stack.pop();
	break;
case Vhdl.S_aggregate:
	while(!this.tokenIs(")")) this.nextToken();
	this.Stack.pop();
	break;
default:
	this.nextToken();
	break;
}
let NextState = this.Stack[this.Stack.length -1];
return(NextState);
}

    doAction() {
      if(this.action)
      {
switch(this.State)
{
          case Vhdl.S_logical_name_list: // this this.action declares a library
          report("Action: declare library " + this.Token);
	  break;
case Vhdl.S_entity_declaration:
	if(this.tokenIs("end")) report("Action: end entity ");
	else report("Action: declare entity " + this.Token);
	break;
case Vhdl.S_port_list:
	if(! this.HasRange) report("Action: declare port(s) " + this.toPrettyString(this.PortList) + " " + this.PortMode + " " + this.PortType);
	else report("Action: declare port(s) " + this.toPrettyString(this.PortList) + " " + this.PortMode + " " + this.PortType + " " + this.Limit1 + " " + this.Direction + " " + this.Limit2);
	break;
case Vhdl.S_generic_list:
	report("Action: declare generic(s) " + this.toPrettyString(this.PortList) + " " + this.PortType + " " + this.PortValue);
	break;
case Vhdl.S_attribute_declaration:
	report("Action: attribute declaration ignored");
	break;
case Vhdl.S_constant_declaration:
	report("Action: declare constant(s) " + this.toPrettyString(this.PortList) + " " + this.PortType);
case Vhdl.S_architecture_body:
	report("Action: declare architecture " + this.ArchitectureName + " for entity " + this.EntityName);
	break; 
case Vhdl.S_component_declaration:
	if(this.tokenIs("component")) report("Action: end component " + this.ComponentName);
	else report("Action: declare component " + this.ComponentName);
	break; 
case Vhdl.S_signal_declaration:
	report("Action: declare signal(s) " + this.toPrettyString(this.PortList) + " " + this.PortType);
	break;
case Vhdl.S_alias_declaration:
	report("Action: declare alias " + this.AliasDesignator + " as " + this.AliasName);
	break;
case Vhdl.S_component_instantiation_statement:
	report("Action: instantiate " + this.Label + ": " + this.AliasName);	
	break;
case Vhdl.S_conditional_signal_assignment:
	report("Action: create LogicExpression for " + this.Label);
	break;
case Vhdl.S_expression:
	report("Action: new LogicExpression"); 
	break;
case Vhdl.S_relation:
	report("Action: capture logic operator: " + this.Limit1); 
	break;
case Vhdl.S_primary:
	report("Action: Primary value: " + this.Label); 
	break;
default:
	break;
}
this.action = false;
}
}


    toPrettyString(u)
    {
      let sb = u;
      /*
      let k = u.length;
      let i = 0;
      while(i < k)
      {
        sb += .elementAt(i) + ", ";
        i += 1;
      }
      */
      return(sb);
    }

/** This routine returns a Java let given a VHDL String.
* VHDL "" pairs are converted to \"
*/
getJavaString(s)
{
let sout = s;
/*
int j;
if((j = s.indexOf("\"\"")) != -1)
	{
	let tsb = s;
	int i = 1;
	boolean b = true;
	while( ( (j = tsb.indexOf("\"\"", i)) != -1 ) && b)
		{
		tsb.deleteCharAt(j);
		int k = tsb.length();
		if(j+1 > k) b = false;
		else i = j+1;
		}
	sout = tsb;

	}
	*/
return(sout);
}

} // end of class VHDLReader;








