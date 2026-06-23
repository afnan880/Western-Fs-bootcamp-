import React from 'react';
 
type ChildProps = {
    onClick: () => void;
};
 
const Child = ({onClick}: ChildProps) => {
    console.log('Child component rendered');
    return (
        <div>
            <button onClick={onClick}>Click me</button>
        </div>
    )
}
 
export default React.memo(Child);