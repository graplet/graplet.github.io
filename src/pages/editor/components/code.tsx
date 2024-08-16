import { useContext, useEffect } from "react"
import SyntaxHighlighter from 'react-syntax-highlighter'
import MainWorkspace from "../../../scripts/workspace"
import { vs, vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs"
import { ThemeContext } from "../../../theme"
import { javascriptGenerator } from "blockly/javascript"

const CodeOutputComponent = ({code,setCode} : {code:string,setCode: React.Dispatch<React.SetStateAction<string>>}) => {
  const {theme} = useContext(ThemeContext)

  useEffect(() => {
    const workspace = MainWorkspace.getInstance()

    const updateCode = () => {
      if (workspace) {
        const generatedCode = javascriptGenerator.workspaceToCode(workspace)
        setCode(generatedCode)
      }
    }

    updateCode()
    if (workspace) {
      workspace.addChangeListener(updateCode)
    }

    return () => {
      if (workspace) {
        workspace.removeChangeListener(updateCode)
      }
    }
  }, [setCode])

  return (
    <>
    <SyntaxHighlighter
      showLineNumbers
      wrapLongLines
      language="javascript"
      style={theme == 'light' ? vs : vs2015}
      customStyle={{margin:0,height:'100%',padding:0}}
    >
      {code || '// code will appear here'}
    </SyntaxHighlighter>
    </>
  )
}

export default CodeOutputComponent
