import { useState, useCallback } from 'react'
import Child from './Child';
 
function Parent() {
 
    const [parentCount, setParentCount] = useState(0);
   
    const handleClick = useCallback(() => {
        console.log('Parent component button clicked');
    }, []);
 
    return (
        <div>
            <h1>Parent Count: {parentCount}</h1>
            <button onClick={() => setParentCount(parentCount + 1)}>Increment Parent Count</button>
            <Child onClick={handleClick} />
        </div>
    );
}
 
export default Parent;