import React, { useContext, useEffect } from 'react'
import { vs, vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs"
import { htmlGenerator } from './generator'
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/default-highlight'
import { ThemeContext } from '../../models/themeprovider'
import WorkspaceManager from '../../models/workspacemanager'

const HTMLCSSPagesComponent: React.FC = () => {
  const [HTMLCodeOutput, setCode] = React.useState<string>('')
  const { theme } = useContext(ThemeContext)
  const [workspaceID, setWorkspaceID] = React.useState<string>('')

  useEffect(() => {
    setWorkspaceID(WorkspaceManager.getInstance().register('htmlCSSPages'))
    const workspaceSVG = WorkspaceManager.getInstance().getWorkspaceByID(workspaceID)?.getComponent()
    if (!workspaceSVG) {
      throw new Error('Main workspace not found')
    }

    const updateCode = () => {
      const generatedCode = htmlGenerator.workspaceToCode(workspaceSVG)
      setCode(generatedCode)
    }

    updateCode()
    workspaceSVG.addChangeListener(updateCode)

    return () => {
      workspaceSVG.removeChangeListener(updateCode)
    }
  }, [workspaceID])
  return (
    <html>
      <h1>HTML & CSS Pages</h1>
      <p>Create a webpage using HTML and CSS Blocks</p>
      <div style={{ width: '100%', height: '100%' }}>
        <div id='htmlCSSPages'></div>
      </div>
      <SyntaxHighlighter
        showLineNumbers
        wrapLongLines
        language="javascript"
        style={theme == 'light' ? vs : vs2015}
        customStyle={{ margin: 0, height: '100%', padding: 0 }}
      >
        {HTMLCodeOutput || ''}
      </SyntaxHighlighter>
    </html>
  )
}

export default HTMLCSSPagesComponent
