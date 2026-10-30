import { useSelector } from "react-redux";

function CounterDisplay() {
  const count = useSelector((state) => state.counter.value);

  return <h1>{count}</h1>;
}

export default CounterDisplay;
