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

Blockly.Blocks['wait_seconds'] = {
  init: function (this: Blockly.Block) {
    this.appendValueInput('SECONDS')
        .appendField('wait')
        .setCheck('Number')
    this.appendDummyInput()
        .appendField('seconds')
    this.setColour(210)
    this.setPreviousStatement(true)
    this.setNextStatement(true)
    this.setTooltip('Wait for a number of seconds')
  }
}

Blockly.Blocks['key_event'] = {
  init: function() {
    const keys = [
      'ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft',
      'Space', 'Enter', 'Escape', 'Shift', 'Backspace', 'Tab', 'CapsLock'
    ]

    Array.from({ length: 26 }).forEach((_, i) => {
      keys.push(String.fromCharCode(97 + i))
    })

    Array.from({ length: 10 }).forEach((_, i) => {
      keys.push(String.fromCharCode(48 + i))
    })
    const dropdownOptions: Blockly.MenuGenerator = keys.map(key => [key, key])
    this.appendDummyInput('NAME')
      .appendField('listen to key press')
      .appendField(new Blockly.FieldDropdown(dropdownOptions), 'KEY')
    this.appendStatementInput('DO')
      .setCheck(null)
      .appendField('do')
    this.setColour(35)
    this.setTooltip('Run the following blocks when a specific key is pressed')
    this.setHelpUrl('')
  }
}

Blockly.Blocks["mouse_event"] = {
  init: function() {
    const keys = ['click', 'dblclick', 'mousedown', 'mouseup', 'mousemove', 'contextmenu']
    const dropdownOptions: Blockly.MenuGenerator = keys.map(key => [key, key])
    this.appendDummyInput('NAME')
      .appendField('listen to mouse event')
      .appendField(new Blockly.FieldDropdown(dropdownOptions), 'EVENT')
    this.appendStatementInput('DO')
      .setCheck(null)
      .appendField('do')
    this.setColour(35)
    this.setTooltip('Run the following blocks when a specific mouse event occurs')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['storage_set'] = {
  init: function() {
    this.appendValueInput('KEY')
        .setCheck('String')
        .appendField('set storage key')
    this.appendValueInput('VALUE')
        .setCheck('String')
        .appendField('to value')
    this.setColour(345)
    this.setPreviousStatement(true)
    this.setNextStatement(true)
    this.setTooltip('Sets the value for a given key in storage')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['storage_get'] = {
  init: function() {
    this.appendValueInput('KEY')
        .setCheck('String')
        .appendField('get storage value for key')
    this.setOutput(true, 'String')
    this.setColour(345)
    this.setTooltip('Gets the value for a given key from storage')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['storage_remove'] = {
  init: function() {
    this.appendValueInput('KEY')
        .setCheck('String')
        .appendField('remove storage key')
    this.setColour(345)
    this.setPreviousStatement(true)
    this.setNextStatement(true)
    this.setTooltip('Removes the given key from storage')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['storage_clear'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('clear all storage')
    this.setColour(345)
    this.setPreviousStatement(true)
    this.setNextStatement(true)
    this.setTooltip('Clears all storage keys and values')
    this.setHelpUrl('')
  }
}
