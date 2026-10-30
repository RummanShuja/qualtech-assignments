import { useDispatch } from "react-redux";
import { increment, decrement } from "../features/counterSlice";

function CounterButtons() {
  const dispatch = useDispatch();

  return (
    <div>
      <button onClick={() => dispatch(increment())}>
        Increase
      </button>

      <button onClick={() => dispatch(decrement())}>
        Decrease
      </button>
    </div>
  );
}

export default CounterButtons;
