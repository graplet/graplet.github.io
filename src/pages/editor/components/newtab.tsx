import { Layout } from 'flexlayout-react';

const NewTabComponent = ({ layoutRef }: { layoutRef: React.MutableRefObject<Layout | null> }) => {
    function openTab(name: string) {
        layoutRef.current?.addTabToActiveTabSet({
            icon: `/${name.toLocaleLowerCase()}.svg`,
            component: name.toLowerCase(),
            name: name
        });
    }
    return (
        // Will be replaced with a more complex UI in the future
        <>
            <button onClick={() => openTab('Code')}>Code</button>
            <button onClick={() => openTab('Settings')}>Settings</button>
            <button onClick={() => openTab('Console')}>Console</button>
            <button onClick={() => openTab('Extensions')}>Extensions</button>
        </>
    );
};

export default NewTabComponent;
