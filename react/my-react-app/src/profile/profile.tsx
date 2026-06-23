import './profile.css'
 
type ProfileProps = {
     imgUrl: string
     fullName:string
     description: string
     role:string
};
 
    // function inside a function is called a nested function, it is a way to organize code and avoid polluting the global scope. The handleClick function is defined inside the Profile component, so it can access the state and props of the Profile component.

 
export default function Profile({ imgUrl, fullName, description, role }: ProfileProps) {
 
    return (
        <div className="profile">
        <img className="logo" src={imgUrl} alt="Hero Image" />
        <h2>{fullName}</h2>
        <p>{description}</p>
        {!role || role !== 'admin' ? <p>User</p> : <p>Admin User</p>}

        </div>
    )
}
