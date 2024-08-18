import WorkspaceManager from "../../scripts/models/workspacemanager"

interface Sample {
  name: string
}

interface SampleLoaderProps {
  samples: Sample[]
}

const SampleLoader = ({ samples }: SampleLoaderProps) => {
  const loadSample = async (path: string) => {
      const data = await import(`../../samples/${path}.json`)
      WorkspaceManager.getInstance().getMainWorkspace()?.load(data.default)
      console.log('Loaded sample:', data)
  }

  return (
    <div>
      <br />
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
  return (
    <SampleLoader
      samples={[
        { name: 'Collatz Conjecture' },
        { name: 'Shopping Cart' },
        { name: 'Guess The Number' },
        { name: 'Rock Paper Scissors' },
      ]}
    />
  )
}

export default SamplesComponent
