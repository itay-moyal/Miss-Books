export function RateByTextbox({ val, selected }) {
  return (
    <input
      type="number"
      min="1"
      max="5"
      value={val}
      onChange={(ev) => selected(+ev.target.value)}
    />
  )
}
