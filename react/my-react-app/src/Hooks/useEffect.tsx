import {useState, useEffect } from 'react';
 
function Counter() {
    const [count, setCount] = useState(0);
 
    function calculateCount() {
        setCount(count + 1);
        // console.log('Count after incrementing:', count); // Log the updated count value
    }
 
    useEffect(() => {
        console.log('useEffect count value has been updated:', count); // Log the count value whenever it changes
    }, [count]);
 
    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={calculateCount}>
                Click me
            </button>
        </div>
    );
}
 
export default Counter;