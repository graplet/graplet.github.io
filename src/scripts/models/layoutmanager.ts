import { Layout } from "flexlayout-react"
import { createRef } from "react"

class LayoutManager {
  private static layoutRef: React.RefObject<Layout> = createRef<Layout>()

  public static getLayoutRef(): React.RefObject<Layout> {
    return LayoutManager.layoutRef
  }

  public static resetLayoutRef() {
    LayoutManager.layoutRef = createRef<Layout>()
  }
}

export default LayoutManager