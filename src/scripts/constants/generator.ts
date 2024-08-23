import { Block } from "blockly"
import { JavascriptGenerator, Order, javascriptGenerator } from "blockly/javascript"

javascriptGenerator.forBlock['console'] = function(block:Block,generator:JavascriptGenerator) {
  const input: string = generator.valueToCode(block, 'INPUT', Order.ATOMIC)
  const type: string = block.getFieldValue('TYPE')
  return `console.${type.toLocaleLowerCase()}(${input})\n`
}

javascriptGenerator.forBlock['alert'] = function(block:Block,generator:JavascriptGenerator) {
  const question: string = generator.valueToCode(block, 'TEXT', Order.ATOMIC)
  return `alert(${question})\n`
}

javascriptGenerator.forBlock['clearconsole'] = function() {
  return `console.clear()\n`
}

javascriptGenerator.forBlock['confirm'] = function(block:Block,generator:JavascriptGenerator) {
  const question: string = generator.valueToCode(block, 'TEXT', Order.ATOMIC)
  return [`confirm(${question})\n`,Order.FUNCTION_CALL]
}

javascriptGenerator.forBlock['list_append'] = function(block:Block,generator:JavascriptGenerator) {
  const list: string = generator.valueToCode(block, 'LIST', Order.ATOMIC)
  const item: string = generator.valueToCode(block, 'ITEM', Order.ATOMIC)
  return `${list}.push(${item})\n`
}

javascriptGenerator.forBlock['list_remove'] = function(block:Block,generator:JavascriptGenerator) {
  const list: string = generator.valueToCode(block, 'LIST', Order.ATOMIC)
  const item: string = generator.valueToCode(block, 'ITEM', Order.ATOMIC)
  return `${list}.splice(${list}.indexOf(${item}),1)\n`
}

javascriptGenerator.forBlock['list_remove_by_index'] = function(block:Block,generator:JavascriptGenerator) {
  const list: string = generator.valueToCode(block, 'LIST', Order.ATOMIC)
  const index: string = generator.valueToCode(block, 'INDEX', Order.ATOMIC)
  return `${list}.splice(${index},1)\n`
}

javascriptGenerator.forBlock['wait_seconds'] = function(block:Block,generator:JavascriptGenerator) {
  const seconds: string = generator.valueToCode(block, 'SECONDS', Order.ATOMIC)
  return `await new Promise(resolve => setTimeout(resolve, ${seconds} * 1000))\n`
}

javascriptGenerator.forBlock['procedures_defnoreturn'] = function(block: Block, generator: JavascriptGenerator) {
  const funcName = generator.nameDB_?.getName(block.getFieldValue('NAME'), 'PROCEDURE')
  const branch = generator.statementToCode(block, 'STACK')
  const code = `async function ${funcName}() {\n${branch}}\n`
  return code
}

javascriptGenerator.forBlock['procedures_defreturn'] = function(block: Block, generator: JavascriptGenerator) {
  const funcName = generator.nameDB_?.getName(block.getFieldValue('NAME'), 'PROCEDURE')
  const branch = generator.statementToCode(block, 'STACK')
  const returnValue = generator.valueToCode(block, 'RETURN', Order.NONE) || 'null'
  const code = `async function ${funcName}() {\n${branch}return ${returnValue}\n}\n`
  return code
}

javascriptGenerator.forBlock['procedures_callnoreturn'] = function(block: Block, generator: JavascriptGenerator) {
  const funcName = generator.nameDB_?.getName(block.getFieldValue('NAME'), 'PROCEDURE')
  const args = block.inputList
    .filter(input => input.connection && input.connection.targetBlock())
    .map(input => generator.valueToCode(block, input.name, Order.NONE))
    .join(', ')
  const code = `await ${funcName}(${args})\n`
  return code
}

javascriptGenerator.forBlock['procedures_callreturn'] = function(block: Block, generator: JavascriptGenerator) {
  const funcName = generator.nameDB_?.getName(block.getFieldValue('NAME'), 'PROCEDURE')
  const args = block.inputList
    .filter(input => input.connection && input.connection.targetBlock())
    .map(input => generator.valueToCode(block, input.name, Order.NONE))
    .join(', ')

  const code = `await ${funcName}(${args})`
  return [code, Order.FUNCTION_CALL]
}

javascriptGenerator.forBlock['key_event'] = function(block) {
  const key = block.getFieldValue('KEY');
  const statements = javascriptGenerator.statementToCode(block, 'DO');
  
  const code = 
`document.addEventListener('keydown', function(event) {
  if (event.key === '${key}') {
    ${statements}
  }});`;
  
  return code;
};