import * as Blockly from 'blockly';
class Category extends Blockly.ToolboxCategory {
  /**
   * Constructor for the customized toolbox.
   * @override
   */
  constructor(
    categoryDef: Blockly.utils.toolbox.CategoryInfo,
    toolbox: Blockly.IToolbox,
    opt_parent: Blockly.ICollapsibleToolboxItem
  ) {
    super(categoryDef, toolbox, opt_parent);
  }

  addColourBorder_(colour: string): void {
    const labelDom = this.getLabelDom()
    if (this.rowDiv_ && labelDom){
      this.rowDiv_.style.backgroundColor = 'var(--background-primary)';
      labelDom.style.color = colour;
    }
  }

  getLabelDom(): HTMLElement | null {
    if (this.rowDiv_) {
      return this.rowDiv_.getElementsByClassName('blocklyTreeLabel')[0] as HTMLElement | null;
    }
    return null;
  }

  setSelected(isSelected: boolean): void {
    const labelDom = this.getLabelDom()
    if (this.rowDiv_ && labelDom) {
      if (isSelected) {
        this.rowDiv_.style.backgroundColor = this.colour_;
        labelDom.style.color = 'rgb(var(--text-rgb))';
      } else {
        this.rowDiv_.style.backgroundColor = 'var(--background-primary)';
        labelDom.style.color = this.colour_;
      }
    }

    Blockly.utils.aria.setState((this.htmlDiv_ as HTMLElement),
    Blockly.utils.aria.State.SELECTED, isSelected);
  }
}


Blockly.registry.register(
  Blockly.registry.Type.TOOLBOX_ITEM,
  Blockly.ToolboxCategory.registrationName,
  Category, true);