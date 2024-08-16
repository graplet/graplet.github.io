import React, { useContext, useEffect } from 'react'
import MainWorkspace from '../../workspace'
import { vs, vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs"
import { htmlGenerator } from './generator'
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/default-highlight'
import { ThemeContext } from '../../../theme'

const HTMLCSSPagesComponent: React.FC = () => {
  const [HTMLCodeOutput, setCode] = React.useState<string>('')
  const {theme} = useContext(ThemeContext)
  useEffect(() => {
    const workspace = MainWorkspace.getInstance()
    // This is outdated, will be using its own workspace soon. 

    const updateCode = () => {
      const generatedCode = htmlGenerator.workspaceToCode(workspace)
      setCode(generatedCode)
    }

    updateCode()
    workspace.addChangeListener(updateCode)

    return () => {
      workspace.removeChangeListener(updateCode)
    }
  }, [])
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
  )
}

export default HTMLCSSPagesComponent
