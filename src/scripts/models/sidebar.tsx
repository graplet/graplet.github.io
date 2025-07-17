import { faFolder, faHome, faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { FC } from "react"

const base = import.meta.env.BASE_URL

export const SideBar: FC = () => (
  <div className="mr-8 flex flex-col gap-4 text-nowrap">
    <div>
      <FontAwesomeIcon icon={faFolder} /> My Projects
    </div>
    <a href={`${base}/editor/`}>
      <FontAwesomeIcon icon={faPlus} /> New
    </a>
    <a href={`${base}/home/`}>
      <FontAwesomeIcon icon={faHome} /> Home
    </a>
  </div>
)
