import { IJsonModel } from "flexlayout-react"

export const layoutJsonConfig: IJsonModel = {
  global: { legacyOverflowMenu: false, tabEnableRename: false },
  borders: [],
  layout: {
    type: "row",
    weight: 100,
    children: [
      {
        type: "tabset",
        weight: 40,
        children: [
          {
            type: "tab",
            name: "Blocks",
            icon: "/tabicons/blocks.svg",
            component: "workspace",
            enableClose: false,
          },
          {
            type: "tab",
            name: "Code",
            icon: "/tabicons/code.svg",
            component: "code",
          },
        ],
      },
      {
        type: "row",
        weight: 30,
        children: [
          {
            type: "tabset",
            weight: 60,
            children: [
              {
                type: "tab",
                name: "Tutorial",
                icon: "/tabicons/tutorial.svg",
                component: "tutorial",
              },
            ],
          },
          {
            type: "tabset",
            weight: 40,
            children: [
              {
                type: "tab",
                name: "Console",
                icon: "/tabicons/console.svg",
                component: "console",
              },
            ],
          },
        ],
      },
    ],
  },
}
