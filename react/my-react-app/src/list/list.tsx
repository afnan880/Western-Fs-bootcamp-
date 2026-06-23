import { useState } from 'react'
 
export default function List() {
   
    const [users, setUsers] = useState([
        {id: 1, name: 'Robert'},
        {id: 2, name: 'Emily'},
        {id: 3, name: 'Michael'},
        {id: 4, name: 'Sarah'},
        {id: 5, name: 'David'},
        {id: 6, name: 'Jessica'},
        {id: 7, name: 'Daniel'},
        {id: 8, name: 'Laura'},
        {id: 9, name: 'James'},
        {id: 10, name: 'Sophia'}
    ]);
 
    function deleteUser(id: number) {
        const updatedUsers = users.filter(user => user.id !== id);
        setUsers(updatedUsers);
    }
 
    return (
        <ul>
            {users.map((user, index) => (
                <>
                <li key={user.id}>{user.name}</li>
                <button onClick={() => deleteUser(user.id)}>Delete {user.name}</button>
                </>
            ))}
        </ul>
    );
}