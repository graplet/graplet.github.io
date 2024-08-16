import * as Blockly from 'blockly'

Blockly.Blocks['alert'] = {
  init: function(this:Blockly.Block) {
    this.appendValueInput('TEXT')
        .appendField('alert')
        .setCheck('String')
    this.setColour(160)
    this.setPreviousStatement(true)
    this.setNextStatement(true)
    this.setTooltip('Display an alert dialog')
  }
}

Blockly.Blocks["math_number"] = {
  init: function(this:Blockly.Block) {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("https://i.ibb.co/6Brz8yN/hash.png", 15, 15,""))
        .appendField(new Blockly.FieldNumber(0), 'NUM')
    this.setOutput(true, 'Number')
    this.setColour(230)
    this.setTooltip('A number.')
  }
}

Blockly.Blocks['console'] = {
  init: function(this:Blockly.Block) {
    this.appendDummyInput()
        .appendField('console')
        .appendField(new Blockly.FieldDropdown([['log', 'LOG'],['info','INFO'],['error', 'ERROR'],['warn','WARN']]), 'TYPE')
    this.appendValueInput('INPUT')
    this.setColour(160)
    this.setPreviousStatement(true)
    this.setInputsInline(true)
    this.setNextStatement(true)
    this.setTooltip('Log to the console')
  }
}

Blockly.Blocks['clearconsole'] = {
  init: function(this:Blockly.Block) {
    this.appendDummyInput()
        .appendField('clear console')
    this.setColour(160)
    this.setPreviousStatement(true)
    this.setNextStatement(true)
    this.setTooltip('Clear the console')
  }
}

Blockly.Blocks['confirm'] = {
  init: function(this:Blockly.Block) {
    this.appendValueInput('TEXT')
        .appendField('confirm')
        .setCheck('String')
    this.setColour(160)
    this.setOutput(true, 'Boolean')
    this.setTooltip('Display a confirmation dialog')
  }
}