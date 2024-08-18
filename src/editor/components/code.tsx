import { useContext, useEffect } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import MainWorkspace from '../../scripts/workspace';
import { vs, vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { ThemeContext } from '../../theme';
import { javascriptGenerator } from 'blockly/javascript';

interface CodeOutputComponentProps {
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
}

const CodeOutputComponent: React.FC<CodeOutputComponentProps> = ({ code, setCode }) => {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const workspace = MainWorkspace.getInstance();

    if (!workspace) return;

    const updateCode = () => {
      const generatedCode = javascriptGenerator.workspaceToCode(workspace);
      setCode(generatedCode);
    };

    updateCode();
    workspace.addChangeListener(updateCode);

    return () => {
      workspace.removeChangeListener(updateCode);
    };
  }, [setCode]);

  return (
    <SyntaxHighlighter
      showLineNumbers
      wrapLongLines
      language="javascript"
      style={theme === 'light' ? vs : vs2015}
      customStyle={{ margin: 0, height: '100%', padding: 0 }}
    >
      {code || '// code will appear here'}
    </SyntaxHighlighter>
  );
};

export default CodeOutputComponent;
