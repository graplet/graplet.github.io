import { Switch } from "@mui/material";
import ExtensionArray from "../../../scripts/extension";

const ExtensionsComponent = () => {
    const label = { inputProps: { 'aria-label': 'Switch demo'  }};
    return (
        <div>
            <p>Extensions are work in progress</p>
            {ExtensionArray.map((extension, index) => (
                <div className="extension-card" key={index}>
                    <p>{extension.name}</p>
                    <Switch 
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
