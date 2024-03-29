Blockly.defineBlocksWithJsonArray([
{
  type: 'field_date',
  message0: 'date: %1',
  args0: [
    {
      type: 'field_date',
      name: 'FIELDNAME',
      date: '2020-02-20',
    },
  ],
  "inputsInline": true,
  "colour": "%{BKY_INSTANCE_HUE}",
  "output" : "String"
},
{
  type: 'colour_hsv_sliders',
  message0: 'hsv %1',
  args0: [
    {
      type: 'field_colour_hsv_sliders',
      name: 'COLOUR',
      colour: '#ff0000',
    },
  ],
  output: 'Colour',
  style: 'colour_blocks',
},
{
  "type": "input",
  "message0": "%1",
  "args0": [
    {
      "type": "field_input",
      "name": "TEXT",
      "text": ""
    }
  ],
  "output": "String",
  "colour": 0,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "console_log",
  "message0": "log in console %1",
  "args0": [
    {
      "type": "input_value",
      "name": "LOG"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": '#ffbf2b',
  "tooltip": "Outputs a message or value to the console for debugging or informational purposes.",
  "helpUrl": ""
},  
{
  "type": "once",
  "message0": "once %1 on %2 %3",
  "args0": [
    {
      "type": "input_value",
      "name": "EVENT",
      "check": "Boolean"
    },
    {
      "type": "input_value",
      "name": "CLIENT",
      "check": "Client"
    },
    {
      "type": "input_statement",
      "name": "DO"
    }
  ],
  "inputsInline": true,
  "colour": '%{BKY_EVENT_HUE}',
  "tooltip": "Executes only once when the specified condition becomes true.",
  "helpUrl": ""
},
{
  "type": "when",
  "message0": "when %1 on %2 %3",
  "args0": [
    {
      "type": "input_value",
      "name": "EVENT",
      "check": "Boolean"
    },
    {
      "type": "input_value",
      "name": "CLIENT",
      "check": "Client"
    },
    {
      "type": "input_statement",
      "name": "DO"
    }
  ],
  "inputsInline": true,
  "colour": '%{BKY_EVENT_HUE}',
  "tooltip": "Executes every time the specified condition is true.",
  "helpUrl": ""
},
{
  "type": "channel_event",
  "message0": "channel %1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "EVENT",
      "options": [
        [
          "created",
          "CREATE"
        ],
        [
          "updated",
          "UPDATE"
        ],
        [
          "deleted",
          "DELETE"
        ],
        [
          "pins update",
          "PINS_UPDATE"
        ]
      ]
    }
  ],
  "inputsInline": true,
  "output": "Boolean",
  "colour": '%{BKY_EVENT_HUE}',
  "tooltip": "Represents a boolean value indicating whether an action related to channel creation, updating (editing), deletion, or pin updates has occurred.",
  "helpUrl": ""
},
{
  "type": "emoji_event",
  "message0": "emoji %1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "NAME",
      "options": [
        [
          "created",
          "CREATE"
        ],
        [
          "updated",
          "UPDATE"
        ],
        [
          "deleted",
          "DELETE"
        ]
      ]
    }
  ],
  "inputsInline": true,
  "output": "Boolean",
  "colour": '%{BKY_EVENT_HUE}',
  "tooltip": "Represents a boolean value indicating whether an action related to emoji creation, update, or deletion has occurred.",
  "helpUrl": ""
},
{
  "type": "clientready",
  "message0": "Client is ready",
  "output": "Boolean",
  "colour": '%{BKY_EVENT_HUE}',
  "tooltip": "Triggers when the Discord client is fully ready and connected to the server.",
  "helpUrl": ""
},
{
  "type": "client_login",
  "message0": "login %1 with token %2",
  "args0": [
    {
      "type": "input_value",
      "name": "LOGIN_INPUT",
      "check": "Client"
    },
    {
      "type": "input_value",
      "name": "TOKEN_INPUT",
      "check": "String"
    }
  ],
  "inputsInline": true,
  "colour": "%{BKY_ACTION_HUE}",
  "tooltip": "Login the specified Client with the provided token.",
  "helpUrl": ""
},{
  "type": "client",
  "message0": "create new Client ",
  "inputsInline": true,
  "output": "Client",
  "colour": "%{BKY_INSTANCE_HUE}",
  "tooltip": "Initiates a new instance of a Discord client.",
  "helpUrl": ""
},
{
  "type": "property_of",
  "message0": "property %1 of %2",
  "args0": [
    {
      "type": "input_dummy",
      "name": "VALUE_CHILD"
    },
    {
      "type": "input_value",
      "name": "VALUE_PARENT"
    }
  ],
  "extensions": ["dynamic_property_of"],
  "inputsInline": true,
  "output": null,
  "colour": '%{BKY_INSTANCE_HUE}',
  "tooltip": " Retrieves a specific property of an object or variable",
  "helpUrl": ""
},
{
  "type": "get_by_id",
  "message0": "get instance %1 %2 %3 %4",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "INSTANCES",
      "options": [
        [
          "guild",
          "GUILD"
        ],
        [
          "channel",
          "CHANNEL"
        ],
        [
          "user",
          "USER"
        ],
        [
          "emoji",
          "EMOJI"
        ],
        [
          "invite",
          "INVITE"
        ]
      ]
    },
    {
      "type": "field_label_serializable",
      "name": "BY",
      "text": "by ID"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "ID_INPUT",
      "check": "Number"
    }
  ],
  "inputsInline": true,
  "output": null,
  "colour": '%{BKY_ACTION_HUE}',
  "tooltip": "Retrieves an instance or object by its unique identifier (ID)",
  "helpUrl": ""
},
{
  "type": "add_reaction",
  "message0": "to message %1 %2 reaction %3 %4 ",
  "args0": [
    {
      "type": "input_value",
      "name": "MESSAGE",
      "check": "Message"
    },
    {
      "type": "field_dropdown",
      "name": "ACTION",
      "options": [
        [
          "add",
          "ADD"
        ],
        [
          "remove",
          "REMOVE"
        ]
      ]
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "REACTION",
      "check": "String"
    },
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": '%{BKY_ACTION_HUE}',
  "tooltip": "Removes or adds a reaction to a Message.",
  "helpUrl": ""
},
{
  "type": "change_guild_name",
  "message0": "change name of guild %1 to %2",
  "args0": [
    {
      "type": "input_value",
      "name": "GUILD",
      "check": "Guild"
    },
    {
      "type": "input_value",
      "name": "NAME"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": '%{BKY_ACTION_HUE}',
  "tooltip": "Changes the name of a given Guild.",
  "helpUrl": ""
},
{
  "type": "embed_builder",
  "message0": "Embed Builder %1 Description %2",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "DESCRIPTION"
    }
  ],
  "mutator" : 'embed_builder_mutator',
  "inputsInline": false,
  "output": null,
  "colour": '%{BKY_INSTANCE_HUE}',
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "instances_options_embed_mutator",
  "message0": "Description: %1 %2 Title %3 %4 Color %5 %6 Author %7 %8 Footer %9",
  "args0": [
    {
      "type": "field_checkbox",
      "name": "DESCRIPTION",
      "checked": true
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_checkbox",
      "name": "TITLE",
      "checked": false
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_checkbox",
      "name": "COLOUR",
      "checked": false
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_checkbox",
      "name": "AUTHOR",
      "checked": false
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_checkbox",
      "name": "FOOTER",
      "checked": false
    }
  ],
  "colour": '%{BKY_INSTANCE_HUE}',
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "response_reply",
  "message0": "%1 %2 with %3",
  "args0": [
    {
      "type": "field_label_serializable",
      "name": "STATUS",
      "text": "reply to message"
    },
    {
      "type": "input_value",
      "name": "MESSAGE",
      "check": "Message"
    },
    {
      "type": "input_value",
      "name": "CONTENT"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": '%{BKY_ACTION_HUE}',
  "tooltip": "Replies to a message.",
  "helpUrl": ""
},
{
  "type": "bulk_delete",
  "message0": "in channel %1 purge %2 messages",
  "args0": [
    {
      "type": "input_value",
      "name": "CHANNEL",
      "check": "Channel"
    },
    {
      "type": "input_value",
      "name": "AMOUNT",
      "check": "Number"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": '%{BKY_ACTION_HUE}',
  "tooltip": "Deletes a given amount of messages in a Channel.",
  "helpUrl": ""
},
])

function generateActionBlock(typeLabel,initOptions, updateConnectionsFunction) {
  return {
    validate: function(newValue) {
      this.getSourceBlock().updateConnections(newValue);
      return newValue;
    },
    init: function() {
      var options = initOptions;
      this.setColour('%{BKY_ACTION_HUE}');
      this.setNextStatement(true);
      this.setPreviousStatement(true);
      this.setInputsInline(true);
      this.appendDummyInput()
        .appendField(typeLabel)
        .appendField(new Blockly.FieldDropdown(options, this.validate), 'TYPE');
      this.updateConnections(initOptions[0][1]);
    },
    updateConnections: updateConnectionsFunction
  };
}

var channelActions = generateActionBlock('channel',[
  ['create', 'CREATE'],
  ['edit', 'EDIT'],
  ['delete', 'DELETE']
], function(newValue) {
  this.removeInput('CREATE', true);
  this.removeInput('EDIT', true);
  this.removeInput('DELETE', true);
  this.removeInput('NAME', true);
  this.removeInput('GUILD', true);
  if (newValue == 'CREATE') {
    this.appendDummyInput('CREATE')
      .appendField('type:')
      .appendField(new Blockly.FieldDropdown([['Text', 'TEXT'], ['Voice', 'VOICE'], ['Announcement', 'ANNOUNCEMENT'],['Stage', 'STAGE']]), 'CHANNELTYPE');
    this.appendValueInput('GUILD')
      .appendField('on guild:')
      .setCheck('Guild')
    parentBlock = this.appendValueInput('NAME')
      .appendField('name:')
    if (this.rendered && Workspace && !parentBlock.connection.targetConnection && !parentBlock.sourceBlock.isInFlyout){
      var InputBlock = Workspace.newBlock('input')
        InputBlock.setShadow(true)
        InputBlock.initSvg()
        InputBlock.render();
      parentBlock.connection.connect(InputBlock.outputConnection)
    }
  } else if (newValue == 'EDIT') {
    var InputBlock = Workspace.newBlock('input')
      InputBlock.setShadow(true)
      InputBlock.initSvg()
      InputBlock.render();  
    this.appendValueInput('EDIT')
      .appendField('channel:')
      .setCheck('Channel')
    this.appendValueInput('NAME')
      .appendField('new name:')
      .connection.connect(InputBlock.outputConnection)   
  } else if (newValue == 'DELETE') {
    this.appendValueInput('DELETE')
      .appendField('channel:')
      .setCheck('Channel')
  }
});

var messageActions = generateActionBlock('message',[
  ['send', 'SEND'],
  ['edit', 'EDIT'],
  ['delete', 'DELETE']
], function(newValue) {
  this.removeInput('SEND',true);
  this.removeInput('EDIT', true);
  this.removeInput('DELETE',true);
  this.removeInput('CONTENT',true);
  if (newValue == 'SEND') {
    this.appendValueInput('SEND')
      .appendField('in channel:')
      .setCheck('Channel')
    var parentBlock = this.appendValueInput('CONTENT')
      .appendField('content:')
      .setCheck('String')
    if (this.rendered && Workspace && !parentBlock.connection.targetConnection && !parentBlock.sourceBlock.isInFlyout){
      var InputBlock = Workspace.newBlock('input')
        InputBlock.setShadow(true)
        InputBlock.initSvg()
        InputBlock.render();
      parentBlock.connection.connect(InputBlock.outputConnection)
    }
  } else if (newValue == 'EDIT') {
    this.appendValueInput('EDIT')
      .appendField('message:')
      .setCheck('Message')
    var InputBlock = Workspace.newBlock('input')
      InputBlock.setShadow(true)
      InputBlock.initSvg()
      InputBlock.render();

    this.appendValueInput('CONTENT')
      .appendField('new content:')
      .connection.connect(InputBlock.outputConnection)        
  } else if (newValue == 'DELETE'){
    this.appendValueInput('DELETE')
    .appendField('message:')
    .setCheck('Message')
  }
});

var roleActions = generateActionBlock('role',[
  ['create', 'CREATE'],
  ['edit', 'EDIT'],
  ['delete', 'DELETE']
], function(newValue) {
  this.removeInput('CREATE',true);
  this.removeInput('EDIT', true);
  this.removeInput('DELETE',true);
  this.removeInput('NAME',true);
  this.removeInput('COLOUR',true)
  if (newValue == 'CREATE') {
    this.appendValueInput('CREATE')
      .appendField('in guild:')
      .setCheck('Guild')
    var parentBlock1 = this.appendValueInput('NAME')
      .appendField('name:')
      .setCheck('String')
    var parentBlock2 = this.appendValueInput('COLOUR')
      .appendField('color:')
      .setCheck('Colour')
    
    if (Workspace){
      if (this.rendered && !parentBlock1.connection.targetConnection && !parentBlock1.sourceBlock.isInFlyout){
        var InputBlock = Workspace.newBlock('input')
          InputBlock.setShadow(true)
          InputBlock.initSvg()
          InputBlock.render();
        parentBlock1.connection.connect(InputBlock.outputConnection)
      }
    }
  } else if (newValue == 'EDIT') {
    this.appendValueInput('EDIT')
      .appendField('role:')
      .setCheck('Role')
    var InputBlock = Workspace.newBlock('input')
      InputBlock.setShadow(true)
      InputBlock.initSvg()
      InputBlock.render();  

    this.appendValueInput('NAME')
      .appendField('new name:')
      .connection.connect(InputBlock.outputConnection)        
  } else if (newValue == 'DELETE'){
    this.appendValueInput('DELETE')
    .appendField('role:')
    .setCheck('Role')
  }
});
