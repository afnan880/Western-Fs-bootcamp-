import { useState, useMemo } from "react";
 
const initialItems = new Array(19_999_999).fill(0).map((_, i) => {
  return {
    id: i,
    isSelected: i === 19_999_998,
  };
});
 
 
function Counter() {
  const [count, setCount] = useState(0);
  const [items] = useState(initialItems);
// Find the item with isSelected set to true
    const selectedItem = useMemo (() => { 
        return items.find((item) => item.isSelected);
    }, [items]);
 return (
    <div className="tutorial">
      <h1>Count: {count}</h1>
      <h1>Selected Item: {selectedItem?.id}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
export default Counter;