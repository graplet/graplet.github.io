import Blockly from 'blockly';

export const htmlGenerator = new Blockly.Generator('HTML');

const Order = {
  ATOMIC: 0,
};

htmlGenerator.scrub_ = function (block, code, thisOnly) {
  const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  if (nextBlock && !thisOnly) {
    return code + '\n' + htmlGenerator.blockToCode(nextBlock);
  }
  return code;
};

htmlGenerator.forBlock['button'] = function (block: Blockly.Block, generator: Blockly.CodeGenerator) {
  const text: string = generator.valueToCode(block, 'TEXT', Order.ATOMIC);
  return `<button>${text}</button>\n`;
}

htmlGenerator.forBlock['text'] = function (block: Blockly.Block, generator: Blockly.CodeGenerator) {
  const text: string = generator.valueToCode(block, 'TEXT', Order.ATOMIC);
  return `<p>${text}</p>\n`;
}
