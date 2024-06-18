import * as Blockly from 'blockly';

Blockly.Blocks['alert'] = {
  init: function(this:Blockly.Block) {
    this.appendValueInput('TEXT')
        .appendField('alert')
        .setCheck('String');
    this.setColour(160);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
}



Blockly.Blocks['console'] = {
  init: function(this:Blockly.Block) {
    this.appendDummyInput()
        .appendField('console')
        .appendField(new Blockly.FieldDropdown([['log', 'LOG'],['info','INFO'],['error', 'ERROR'],['warn','WARN']]), 'TYPE');
    this.appendValueInput('INPUT')
    this.setColour(160);
    this.setPreviousStatement(true);
    this.setInputsInline(true);
    this.setNextStatement(true);
  }
}