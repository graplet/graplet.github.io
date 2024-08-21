import { Extension } from '../../models/extensiontypes.ts'
import HTMLCSSPagesComponent from './component.tsx'
import plane from './assets/plane.svg'
import { Testcomponent } from './test.tsx'

const extension: Extension = {
  tabs: [
    {
      name: 'Pages',
      icon: plane,
      suffix: 'html',
      component: HTMLCSSPagesComponent
    },
    {
      name: 'Testing',
      icon: plane,
      suffix: 'test',
      component: Testcomponent
    },
  ],
}

export default extension