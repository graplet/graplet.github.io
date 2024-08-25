import { IconDefinition, faCircleNodes, faCode, faCogs, faDatabase, faLocationArrow, faSyncAlt, faQuoteRight, faSquareRootVariable, faListUl } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Blockly from 'blockly'
import { renderToString } from 'react-dom/server'

enum CategoryName {
  Events = 'Events',
  Logic = 'Logic',
  Loops = 'Loops',
  Math = 'Math',
  Text = 'Text',
  List = 'List',
  Functions = 'Functions',
  Variables = 'Variables',
  Storage = 'Storage',
}

const categoryIcons: Record<CategoryName, IconDefinition> = {
  [CategoryName.Events]: faLocationArrow,
  [CategoryName.Logic]: faCircleNodes,
  [CategoryName.Loops]: faSyncAlt,
  [CategoryName.Math]: faSquareRootVariable,
  [CategoryName.Text]: faQuoteRight,
  [CategoryName.List]: faListUl,
  [CategoryName.Functions]: faCogs,
  [CategoryName.Variables]: faCode,
  [CategoryName.Storage]: faDatabase,
}

function isCategoryName(name: string): name is CategoryName {
  return Object.values(CategoryName).includes(name as CategoryName)
}

class Category extends Blockly.ToolboxCategory {
  constructor(
    categoryDef: Blockly.utils.toolbox.CategoryInfo,
    toolbox: Blockly.IToolbox,
    opt_parent: Blockly.ICollapsibleToolboxItem
  ) {
    super(categoryDef, toolbox, opt_parent)
  }

  addColourBorder_(colour: string): void {
    const labelDom = this.getLabelDom()
    if (this.rowDiv_ && labelDom) {
      this.rowDiv_.style.backgroundColor = 'var(--bg-1)'
      labelDom.style.color = colour
    }
  }

  getLabelDom(): HTMLElement | null {
    return this.rowDiv_?.getElementsByClassName('blocklyTreeLabel')[0] as HTMLElement | null
  }

  createIconDom_(): HTMLElement {
    const categoryName = this.name_ as CategoryName
    const icon = isCategoryName(categoryName) ? categoryIcons[categoryName] : faCogs
    const iconString = renderToString(<FontAwesomeIcon icon={icon} className='mr-1' />)
    const span = document.createElement('span')
    span.style.marginLeft = '5px'
    span.style.color = this.colour_
    span.innerHTML = iconString
    return span
  }

  setSelected(isSelected: boolean): void {
    const labelDom = this.getLabelDom()
    const iconDom = this.iconDom_ as HTMLElement
    if (this.rowDiv_ && labelDom && iconDom) {
      const backgroundColor = isSelected ? this.colour_ : 'var(--bg-1)'
      const color = isSelected ? 'rgb(var(--rgb-text))' : this.colour_
      this.rowDiv_.style.backgroundColor = backgroundColor
      labelDom.style.color = color
      iconDom.style.color = color
    }

    Blockly.utils.aria.setState(this.htmlDiv_ as HTMLElement,
      Blockly.utils.aria.State.SELECTED, isSelected)
  }
}

Blockly.registry.register(
  Blockly.registry.Type.TOOLBOX_ITEM,
  Blockly.ToolboxCategory.registrationName,
  Category, true
)
