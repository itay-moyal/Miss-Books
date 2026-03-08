export function RateBySelect({ val, selected }) {
  return (
    <select value={val} onChange={(ev) => selected(+ev.target.value)}>
      {[1, 2, 3, 4, 5].map((num) => (
        <option key={num} value={num}>
          {num}
        </option>
      ))}
    </select>
  )
}
