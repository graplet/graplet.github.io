/* eslint-disable @typescript-eslint/no-unused-vars */
import { Switch, SwitchProps } from '@mui/material';
import { FC, useState, useCallback } from 'react';
import ExtensionArray from '../../scripts/extension';
import { Extension } from '../../scripts/extension';

const ExtensionsComponent: FC = () => {
  const [activeExtensions, setActiveExtensions] = useState<Record<string, Extension>>({});
  const activateExtension = useCallback(
    (folder: string) => async (event: React.ChangeEvent<HTMLInputElement>) => {
      const { checked: isChecked } = event.target;

      if (isChecked) {
        try {
          const module = await import(`../../../scripts/extensions/${folder}/index.ts`);
          const extension = module.default as Extension;
          setActiveExtensions(prev => ({ ...prev, [folder]: extension }));
          console.info(`Extension ${folder} activated`);
          console.log(extension.toolbox);
        } catch (error) {
          console.error(`Failed to activate extension ${folder}:`, error);
        }
      } else {
        setActiveExtensions(prev => {
          const { [folder]: _, ...rest } = prev;
          return rest;
        });
        console.info(`Extension ${folder} deactivated`);
      }
    },
    []
  );

  const switchLabel: SwitchProps = { inputProps: { 'aria-label': 'Extension Switch' } };

  return (
    <div>
      <p>Extensions are work in progress</p>
      {ExtensionArray.map(({ name, folder, description }, index) => (
        <div className="extension-card" key={index}>
          <p>{name}</p>
          <Switch
            onChange={activateExtension(folder)}
            {...switchLabel}
            sx={switchStyles}
          />
          <em>{description}</em>
        </div>
      ))}
      <p>Component Testing</p>
      {Object.keys(activeExtensions).map((key) => {
        const ActiveComponent = activeExtensions[key].component as FC;
        return <ActiveComponent key={key} />;
      })}
    </div>
  );
};

const switchStyles = {
  '& .MuiSwitch-track': {
    backgroundColor: '#ccc',
  },
};

export default ExtensionsComponent;
