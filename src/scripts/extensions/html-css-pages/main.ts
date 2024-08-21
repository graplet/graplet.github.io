import { Extension } from '../../models/extensiontypes.ts'
import HTMLCSSPagesComponent from './component.tsx'
import plane from './assets/plane.svg'

const extension: Extension = {
  tabs: [
    { 
      name: 'Pages',
      icon: plane,
      suffix: 'html',
      component: HTMLCSSPagesComponent
    },
  ],
}

export default extension