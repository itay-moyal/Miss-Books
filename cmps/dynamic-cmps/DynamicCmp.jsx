import { RateBySelect } from "./RateBySelect.jsx"
import { RateByTextbox } from "./RateByTextbox.jsx"
import { RateByStars } from "./RateByStars.jsx"

export function DynamicCmp(props) {
  const cmpMap = {
    RateBySelect: <RateBySelect {...props} />,
    RateByTextbox: <RateByTextbox {...props} />,
    RateByStars: <RateByStars {...props} />,
  }
  return cmpMap[props.cmpType]
}
