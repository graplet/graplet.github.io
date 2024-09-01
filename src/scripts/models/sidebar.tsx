import { faFolder, faHome, faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { FC } from "react"

export const SideBar: FC = () => (
  <div className="mr-8 flex flex-col gap-4 text-nowrap">
    <div>
      <FontAwesomeIcon icon={faFolder} /> My Projects
    </div>
    <a href="/editor/">
      <FontAwesomeIcon icon={faPlus} /> New
    </a>
    <a href="/home/">
      <FontAwesomeIcon icon={faHome} /> Home
    </a>
  </div>
)
