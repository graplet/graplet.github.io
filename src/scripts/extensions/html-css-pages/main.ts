import { Extension } from '../../models/extensiontypes.ts';
import HTMLCSSPagesComponent from './component.tsx';
import plane from './assets/plane.svg';
import { Testcomponent } from './test.tsx';
import LayoutManager from '../../models/layoutmanager.ts';

const url = new URL(import.meta.url);
const currentDirectoryPath = url.pathname.substring(0, url.pathname.lastIndexOf('/'));
const currentDirectoryName = currentDirectoryPath.split('/').filter(Boolean).pop();

const extension: Extension = {
  tabs: [
    {
      name: 'Pages',
      icon: plane,
      suffix: 'pages',
      component: HTMLCSSPagesComponent,
    },
    {
      name: 'Testing',
      icon: plane,
      suffix: 'test',
      component: Testcomponent,
    },
  ],
  init: () => {
    console.log(currentDirectoryName);
    LayoutManager.getLayoutRef().current?.addTabToActiveTabSet({
      icon: plane,
      component: `${currentDirectoryName}pages`,
      name: 'Pages',
    });
    LayoutManager.getLayoutRef().current?.addTabToActiveTabSet({
      icon: plane,
      component: `${currentDirectoryName}test`,
      name: 'Testing',
    });
  },
};

export default extension;
