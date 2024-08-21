import { Extension } from '../../models/extensiontypes.ts'
import HTMLCSSPagesComponent from './component.tsx'

const extension: Extension = {
  tabs: [
    { 
      name: 'HTML',
      suffix: 'html',
      component: HTMLCSSPagesComponent
    },
  ],
}

export default extension