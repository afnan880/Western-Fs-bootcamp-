import { useReducer } from 'react';
 
function reducer(state: { count: number }, action: { type: string }) {
 
    const { type } = action;
 
    switch (type) {
        case 'increment':
            return { count: state.count + 1 };
        case 'decrement':
            return { count: state.count - 1 };
        case 'reset':
            return { count: 0 };
        default:
            throw new Error('Unknown action type');
    }
 
}
 
function Counter() {
    const [state, dispatch] = useReducer(reducer, { count: 0 });
 
    return (
        <div>
            <p>You clicked {state.count} times</p>
            <button onClick={() => dispatch({ type: 'increment' })}>
                Increment
            </button>
            <button onClick={() => dispatch({ type: 'decrement' })}>
                Decrement
            </button>
            <button onClick={() => dispatch({ type: 'reset' })}>
                Reset
            </button>
        </div>
    );
}
 
export default Counter;




 