import { grapletBlocklyTheme } from "./blocklytheme"
import { defaultToolbox } from "./toolbox"

export const defaultConfig = {
  renderer: 'zelos',
  toolbox: defaultToolbox,
  theme: grapletBlocklyTheme,
  grid: {
    spacing: 20,
    length: 1,
    colour: '#ccc',
    snap: true,
  },
  zoom: {
    controls: true,
    wheel: true,
    startScale: 0.75,
    maxScale: 3,
    minScale: 0.3,
    scaleSpeed: 1.2,
    pinch: true,
  },
  trashcan: false,
}