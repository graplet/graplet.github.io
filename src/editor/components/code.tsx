import { useContext, useEffect } from "react"
import SyntaxHighlighter from 'react-syntax-highlighter'
import { vs, vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs"
import { ThemeContext } from "../../scripts/models/themeprovider"
import { javascriptGenerator } from "blockly/javascript"
import WorkspaceManager from "../../scripts/models/workspacemanager"

const getMainWorkspace = () => {
  const mainWorkspace = WorkspaceManager.getInstance().getMainWorkspace()
  if (!mainWorkspace) throw new Error('Main Workspace not initialized')
  return mainWorkspace
}

const getWorkspaceSVG = () => {
  const workspaceSVG = getMainWorkspace().getComponent()
  if (!workspaceSVG) throw new Error('Workspace component not found')
  return workspaceSVG
}


interface CodeOutputComponentProps {
  code: string
  setCode: React.Dispatch<React.SetStateAction<string>>
}

const CodeOutputComponent: React.FC<CodeOutputComponentProps> = ({ code, setCode }) => {
  const { theme } = useContext(ThemeContext)

  useEffect(() => {
    const updateCode = () => {
      if (getWorkspaceSVG) {
        const generatedCode = javascriptGenerator.workspaceToCode(getWorkspaceSVG())
        setCode(generatedCode)
      }
    }

    updateCode()
    if (getWorkspaceSVG) {
      getWorkspaceSVG().addChangeListener(updateCode)
    }

    return () => {
      if (getWorkspaceSVG) {
        getWorkspaceSVG().removeChangeListener(updateCode)
      }
    }
  }, [setCode])

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
  )
}

export default CodeOutputComponent
