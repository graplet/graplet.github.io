import HTMLCSSPagesComponent from './component.tsx';
import { toolbox } from './toolbox';
import './blocks';
import { Extension } from '../../extension.ts';

const extension: Extension = {
  component: HTMLCSSPagesComponent,
  toolbox: toolbox,
};

export default extension;
