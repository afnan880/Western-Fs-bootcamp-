import { useRef } from 'react';
 
function Counter() {
    const countRef = useRef(0);
 
    function calculateCount() {
        countRef.current += 1;
        console.log(`Count: ${countRef.current}`);
    }
 
    return (
        <div>
            <p>You clicked {countRef.current} times</p>
            <button onClick={calculateCount}>
                Click me
            </button>
        </div>
    );
}
 
export default Counter;