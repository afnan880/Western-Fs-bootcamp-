import { useState } from "react";
 
function EmployeeName() {
 
    const [EmployeeName, setEmployeeName] = useState('');
 
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert(`EmployeeName Name: ${EmployeeName}`);
    }
 
    return (
        <div>
            <h1>EmployeeName</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="departmentName" className="form-label">EmployeeName Name</label>
                    <input type="text" className="form-control" value={EmployeeName} onChange={(e) => setEmployeeName(e.target.value)} placeholder="Enter EmployeeName name" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
 
export default EmployeeName;