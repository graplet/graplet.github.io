import React, { useContext, useEffect } from 'react'
import { vs, vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs"
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/default-highlight'
import { ThemeContext } from '../../models/themeprovider'

const HTMLCSSPagesComponent: React.FC = () => {
  const [HTMLCodeOutput, setCode] = React.useState<string>('')
  const { theme } = useContext(ThemeContext)

  useEffect(() => {
    const HTMLCode = '<div>hello testing</div>'
    setCode(HTMLCode)
  }, [])
  return (
    <div className='m-4'>
      <p>html-css-pages is still on the works.</p>
      <SyntaxHighlighter
        showLineNumbers
        wrapLongLines
        language="html"
        style={theme == 'light' ? vs : vs2015}
        customStyle={{ margin: 0, height: '100%', padding: 0 }}
      >
        {HTMLCodeOutput || ''}
      </SyntaxHighlighter>
    </div>
  )
}

export default HTMLCSSPagesComponent
