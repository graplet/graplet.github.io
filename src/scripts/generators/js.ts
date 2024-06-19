import { Block } from "blockly";
import { JavascriptGenerator, Order, javascriptGenerator } from "blockly/javascript";

javascriptGenerator.forBlock['console'] = function(block:Block,generator:JavascriptGenerator) {
  const input: string = generator.valueToCode(block, 'INPUT', Order.ATOMIC);
  const type: string = block.getFieldValue('TYPE');
  return `console.${type.toLocaleLowerCase()}(${input})\n`;
}

javascriptGenerator.forBlock['alert'] = function(block:Block,generator:JavascriptGenerator) {
  const question: string = generator.valueToCode(block, 'TEXT', Order.ATOMIC);
  return `alert(${question})\n`;
}

javascriptGenerator.forBlock['clearconsole'] = function() {
  return `console.clear()\n`;
}

javascriptGenerator.forBlock['confirm'] = function(block:Block,generator:JavascriptGenerator) {
  const question: string = generator.valueToCode(block, 'TEXT', Order.ATOMIC);
  return [`confirm(${question})\n`,Order.FUNCTION_CALL];
}

javascriptGenerator.forBlock['list_append'] = function(block:Block,generator:JavascriptGenerator) {
  const list: string = generator.valueToCode(block, 'LIST', Order.ATOMIC);
  const item: string = generator.valueToCode(block, 'ITEM', Order.ATOMIC);
  return `${list}.push(${item})\n`;
}