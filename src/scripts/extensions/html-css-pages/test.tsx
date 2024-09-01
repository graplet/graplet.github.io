import { FC, useEffect } from "react"
import { PagesWorkspace } from "./manager"

export const Testcomponent: FC = () => {
  useEffect(() => {
    const pagesWorkspace = PagesWorkspace.getInstance()
    if (!pagesWorkspace.getWorkspace()) {
      pagesWorkspace.createWorkspace('pagesBlocklyDiv')
    }
  }, [])
  return (
    <div>
      Test
      <div id="pagesBlocklyDiv"></div>
    </div>
  )
}