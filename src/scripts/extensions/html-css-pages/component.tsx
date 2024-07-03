import React, { useContext, useEffect } from 'react';
import Graplet from '../../workspace';
import { vs, vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { htmlGenerator } from './generator';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/default-highlight';
import { ThemeContext } from '../../../theme';

const HTMLCSSPagesComponent: React.FC = () => {
  const [HTMLCodeOutput, setCode] = React.useState<string>('');
  const {theme} = useContext(ThemeContext);
  useEffect(() => {
    const graplet = Graplet.getInstance();

    const updateCode = () => {
      if (graplet.workspace) {
        const generatedCode = htmlGenerator.workspaceToCode(graplet.workspace);
        setCode(generatedCode);
      }
    };

    updateCode();
    if (graplet.workspace) {
      graplet.workspace.addChangeListener(updateCode);
    }

    return () => {
      if (graplet.workspace) {
        graplet.workspace.removeChangeListener(updateCode);
      }
    };
  }, []);
  return (
    <html>
      <h1>HTML & CSS Pages</h1>
      <p>Create a webpage using HTML and CSS Blocks</p>
      <SyntaxHighlighter
        showLineNumbers
        wrapLongLines
        language="javascript"
        style={theme == 'light' ? vs : vs2015}
        customStyle={{margin:0,height:'100%',padding:0}}
      >
        {HTMLCodeOutput || ''}
      </SyntaxHighlighter>
    </html>
  );
}

export default HTMLCSSPagesComponent;
