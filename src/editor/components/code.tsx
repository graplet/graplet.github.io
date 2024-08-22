import { useContext } from "react"
import SyntaxHighlighter from 'react-syntax-highlighter'
import { vs, vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs"
import { ThemeContext } from "../../scripts/models/themeprovider"

interface CodeOutputComponentProps {
  code: string
  setCode: React.Dispatch<React.SetStateAction<string>>
}

const CodeOutputComponent: React.FC<CodeOutputComponentProps> = ({ code }) => {
  const { theme } = useContext(ThemeContext)

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
