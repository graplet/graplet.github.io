import * as Blockly from 'blockly'
import * as En from 'blockly/msg/en'

Blockly.setLocale(En)
Blockly.Scrollbar.scrollbarThickness = 15
Blockly.ContextMenuItems.registerCommentOptions()

export const grapletBlocklyTheme: Blockly.Theme = Blockly.Theme.defineTheme('graplet', {
  'name': 'graplet',
  'base': Blockly.Themes.Classic,
  'componentStyles': {
    'workspaceBackgroundColour': 'var(--bg-1)',
    'toolboxBackgroundColour': 'var(--bg-2)',
    'flyoutBackgroundColour': 'var(--bg-2)',
    'scrollbarColour': 'var(--bg-2)',
  },
  'categoryStyles': {
    'event_category': {
       'colour': '#a5865b'
    },
 }
})

