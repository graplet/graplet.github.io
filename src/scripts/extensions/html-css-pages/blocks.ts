import * as  Blockly from 'blockly'

Blockly.Blocks['button'] = {
  init: function (this: Blockly.Block) {
    this.appendValueInput('TEXT')
        .appendField('button')
        .setCheck('String')
    this.setColour(160)
    this.setPreviousStatement(true)
    this.setNextStatement(true)
    this.setTooltip('Display a button')
  }
}

Blockly.Blocks['text'] = {
  init: function (this: Blockly.Block) {
    this.appendValueInput('TEXT')
        .appendField('text')
        .setCheck('String')
    this.setColour(160)
    this.setPreviousStatement(true)
    this.setNextStatement(true)
    this.setTooltip('Display text')
  }
}
