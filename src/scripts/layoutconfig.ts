import { IJsonModel } from "flexlayout-react";

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
            icon: "/blocks.svg",
            component: "workspace",
          },
          {
            type: "tab",
            name: "Extensions",
            icon: "/extensions.svg",
            component: "extensions",
          }
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
                icon: "/code.svg",
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
                icon: "/console.svg",
                component: "console",
              },
            ],
          },
        ],
      },
    ],
  },
};
