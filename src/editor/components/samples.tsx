import WorkspaceManager from "../../scripts/models/workspacemanager"
import { useState, useEffect } from "react"

interface Sample {
  name: string
}

const SampleLoader = () => {
  const [samples, setSamples] = useState<Sample[]>([])

  useEffect(() => {
    // Dynamically import all JSON files from the samples directory
    const modules = import.meta.glob("../../samples/*.json")

    const sampleNames = Object.keys(modules).map((filePath) => {
      // Extract the file name without the path and extension
      const name = filePath.split("/").pop()?.replace(".json", "")
      return { name: name || "" }
    })

    setSamples(sampleNames)
  }, [])

  const loadSample = async (path: string) => {
    const modules = import.meta.glob("../../samples/*.json")
    const module = modules[`../../samples/${path}.json`]
    if (module) {
      const data = await module() as { default: { [key: string]: unknown; } }
      WorkspaceManager.getInstance().getMainWorkspace()?.load(data.default)
    } else {
      console.error(`Module for ${path} not found`)
    }
  }

  return (
    <div className="m-4">
      {samples.map((sample) => (
        <div style={{ marginBottom: 10 }} key={sample.name}>
          <label htmlFor={`load-sample-${sample.name}`}>{sample.name}</label>
          <button
            id={`load-sample-${sample.name}`}
            style={{ marginLeft: 10 }}
            onClick={() => loadSample(sample.name)}
          >
            Load
          </button>
        </div>
      ))}
    </div>
  )
}

const SamplesComponent = () => {
  return <SampleLoader />
}

export default SamplesComponent
