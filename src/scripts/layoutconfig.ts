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
        weight: 70,
        children: [
          {
            type: "tab",
            name: "Blocks",
            icon: "/tabs/blocks.svg",
            component: "workspace",
            enableClose: false,
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
                name: "Code",
                icon: "/tabs/code.svg",
                component: "code",
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
                icon: "/tabs/console.svg",
                component: "console",
              },
            ],
          },
        ],
      },
    ],
  },
}
