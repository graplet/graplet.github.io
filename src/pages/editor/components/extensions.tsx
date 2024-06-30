import { Switch } from "@mui/material";
import { useState } from "react";
import ExtensionArray from "../../../scripts/extension";
import { Extension } from "../../../scripts/extension";

const ExtensionsComponent = () => {
    const label = { inputProps: { 'aria-label': 'Extension Switch' } };
    const [activeExtensions, setActiveExtensions] = useState<{ [key: string]: Extension }>({});

    const activateExtension = (folder: string) => async (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        if (isChecked) {
            const module = await import(`../../../scripts/extensions/${folder}/index.ts`);
            const extension = module.default as Extension;
            setActiveExtensions(prev => ({ ...prev, [folder]: extension }));
            console.info(`Extension ${folder} activated`);
            console.log(extension.toolbox);
        } else {
            setActiveExtensions(prev => {
                const { [folder]: _, ...rest } = prev;
                return rest;
            });
            console.info(`Extension ${folder} deactivated`);
        }
    };

    return (
        <div>
            <p>Extensions are work in progress</p>
            {ExtensionArray.map((extension, index) => (
                <div className="extension-card" key={index}>
                    <p>{extension.name}</p>
                    <Switch
                        onChange={activateExtension(extension.folder)}
                        {...label}
                        sx={{
                            '& .MuiSwitch-track': {
                                backgroundColor: '#ccc',
                            },
                        }}
                    />
                    <em>{extension.description}</em>
                </div>
            ))}

        </div>
    );
}

export default ExtensionsComponent;
