import { IconDefinition, faCircleNodes, faCode, faCogs, faList, faSquareRootAlt, faSyncAlt, faTextWidth } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Blockly from 'blockly';
import { renderToString } from 'react-dom/server';

type CategoryName = 'Logic' | 'Loops' | 'Math' | 'Text' | 'List' | 'Variables' | 'Functions';

const categoryIcons: Record<CategoryName, IconDefinition> = {
  Logic: faCircleNodes,
  Loops: faSyncAlt,
  Math: faSquareRootAlt,
  Text: faTextWidth,
  List: faList,
  Variables: faCode,
  Functions: faCogs,
};

function isCategoryName(name: string): name is CategoryName {
  return (categoryIcons as Record<string, IconDefinition>).hasOwnProperty(name);
}

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

  createIconDom_(): HTMLElement {
    const categoryName = this.name_;
    const icon = isCategoryName(categoryName) ? categoryIcons[categoryName] : faCogs;
    const iconString = renderToString(<FontAwesomeIcon icon={icon} />);
    const span = document.createElement('span');
    span.style.marginLeft = '5px';
    span.style.color = this.colour_;
    span.innerHTML = iconString;
    return span;
  }

  setSelected(isSelected: boolean): void {
    const labelDom = this.getLabelDom()
    const iconDom = this.iconDom_ as HTMLElement;
    if (this.rowDiv_ && labelDom && iconDom) {
      if (isSelected) {
        this.rowDiv_.style.backgroundColor = this.colour_;
        iconDom.style.color = 'rgb(var(--text-rgb))';
        labelDom.style.color = 'rgb(var(--text-rgb))';
      } else {
        this.rowDiv_.style.backgroundColor = 'var(--background-primary)';
        labelDom.style.color = this.colour_;
        iconDom.style.color = this.colour_;
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