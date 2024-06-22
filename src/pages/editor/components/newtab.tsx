import { Layout } from 'flexlayout-react';
import { useContext } from 'react';
import { ThemeContext } from '../../../theme';

interface LayoutRef {
    layoutRef: React.MutableRefObject<Layout | null>
    name?: string
}

const NewTabBox = ({ layoutRef, name }: LayoutRef) => {
    const {theme} = useContext(ThemeContext);

    const icon = `/tabs/${name?.toLocaleLowerCase()}.svg`;
    const component = name?.toLowerCase();
    function openTab() {
        layoutRef.current?.addTabToActiveTabSet({
            icon,
            component,
            name
        });
    }
    return (
        <div className='newtab-box' onClick={openTab}>
            <img style={{width:25, filter: theme === 'light' ? 'invert(1)' : 'none'}} src={icon} alt={name} />
            <p>{name}</p>
        </div>
    );

};

const NewTabComponent = ({ layoutRef }: LayoutRef) => {
    return (
        <>
            <p>Choose a tab to open</p>
            <div style={{display:'flex', gap:10}}>
                <NewTabBox layoutRef={layoutRef} name='Code' />
                <NewTabBox layoutRef={layoutRef} name='Console' />
                <NewTabBox layoutRef={layoutRef} name='Extensions' />
                <NewTabBox layoutRef={layoutRef} name='Samples' />
                <NewTabBox layoutRef={layoutRef} name='Settings' />
            </div>
        </>
    );
};

export default NewTabComponent;
