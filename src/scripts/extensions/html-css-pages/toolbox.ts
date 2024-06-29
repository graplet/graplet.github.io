export const toolbox = {
  contents: [
    {
      kind: 'category',
      name: 'HTML',
      categorystyle: 'logic_category',
      contents: [
        {
          type: 'button',
          kind: 'block',
          inputs: {
            TEXT: {
              shadow: {
                type: 'text',
                fields: {
                  TEXT: 'click me!',
                },
              },
            },
          },
        },
        {
          type: 'text',
          kind: 'block',
          inputs: {
            TEXT: {
              shadow: {
                type: 'text',
                fields: {
                  TEXT: 'hello world!',
                },
              },
            },
          },
        },
      ],
    }
  ],
};
