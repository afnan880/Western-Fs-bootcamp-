import { useState } from "react";
 
function Departments() {
 
    const [departmentName, setDepartmentName] = useState('');
 
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert(`Department Name: ${departmentName}`);
    }
 
    return (
        <div>
            <h1>Departments</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="departmentName" className="form-label">Department Name</label>
                    <input type="text" className="form-control" value={departmentName} onChange={(e) => setDepartmentName(e.target.value)} placeholder="Enter department name" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
 
export default Departments;