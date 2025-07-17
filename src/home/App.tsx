import { useContext, useEffect, useState } from "react"
import { GrapletLocalStorage } from "../scripts/models/storage"
import './hero.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFolder, faRocket } from "@fortawesome/free-solid-svg-icons"
import { ThemeContext } from "../scripts/models/themeprovider"

import categories from '/hero/categories.png'
import blocks from '/hero/blocks.png'
import categories_light from '/hero/categories_light.png'
import blocks_light from '/hero/blocks_light.png'

interface HomePageProps {
  hasprojects?: boolean
}

const base = import.meta.env.BASE_URL

export const HomePage: React.FC<HomePageProps> = ({ hasprojects }) => {
  const [projectsExist, setProjectsExist] = useState<boolean>(false)
  const { theme } = useContext(ThemeContext)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const allProjects = await GrapletLocalStorage.getAllProjects()
        if (allProjects.length > 0) {
          setProjectsExist(true)
        }
      } catch (error) {
        console.error('Error fetching projects:', error)
      }
    }
    fetchProjects()
  }, [hasprojects])

  return (
    <>
      <div className="flex gap-10 items-center justify-center h-screen">
        <img
          className="w-48 h-fit"
          src={theme === 'light' ? categories_light : categories}
          alt="" />
        <div>
          <h3 className="flex items-center gap-5 text-5xl">
            <img
              className={`w-12 ${theme === 'light' ? 'invert' : ''}`}
              src={`${base}/fill.svg`}
              alt="Graplet Logo"
            /> Graplet
          </h3>
          <h3 className="text-3xl">Let's get creative</h3>
          <p className="text-lg">Programm Apps with blocks right out of the box</p>
          {projectsExist ? (
            <button className="hero text-sm" onClick={() => { window.location.href = base }}>
              <FontAwesomeIcon icon={faFolder} /> Open Projects
            </button>
          ) : (
              <button className="hero text-sm" onClick={() => { window.location.href = `${base}/editor/?tutorial` }}>
              <FontAwesomeIcon icon={faRocket} /> Get started
            </button>
          )}
        </div>
        <img
          style={{ width: 800 }}
          src={theme === 'light' ? blocks_light : blocks}
          alt=""
        />
      </div>
      <div className="glowball" style={{ right: -80, top: '50%' }}></div>
      <div className="glowball" style={{ bottom: -200, right: '40%' }}></div>
      <div className="glowball" style={{ top: -200, left: '30%' }}></div>
      <div className="glowball" style={{ left: 200, top: '40%', width: 40, filter: 'blur(100px)', zIndex: -1 }}></div>
    </>
  )
}