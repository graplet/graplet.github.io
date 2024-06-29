import ExtensionArray from "../../../scripts/extension";

const ExtensionsComponent = () => {
    return (
        <div>
            <p>Extensions are work in progress</p>
            {ExtensionArray.map((extension, index) => (
                <div className="extension-card" key={index}>
                    <p>{extension.name}</p>
                    <em>{extension.description}</em>
                </div>
            ))}
        </div>
    );
}

export default ExtensionsComponent;
