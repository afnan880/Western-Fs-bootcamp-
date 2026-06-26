import Profile from "../profile/profile"
import './userlist.css'

export default function UserList() {
    const users = [
        {
            imgUrl: "https://react.dev/images/docs/scientists/1bX5QH6.jpg",
            fullName: "George Doe",
            description: "Software Developer",
            role: "admin"
        },
        {
            imgUrl: "./public/hero.png",
            fullName: "Jane Smith",
            description: "Product Manager",
            role: "user"
        },
        {
            imgUrl: "./public/react.svg",
            fullName: "Bob Johnson",
            description: "Designer",
            role: "admin"
        },
        {
            imgUrl: "../public/favicon.svg",
            fullName: "Alice Brown",
            description: "Engineer",
            role: "admin"
        },
    ];

    return (
        <div className="profiles">
            {users.map((user, index) => (
                <Profile
                    key={index}
                    imgUrl={user.imgUrl}
                    fullName={user.fullName}
                    description={user.description}
                    role={user.role}
                />
            ))}
        </div>

    );
}

//Create a new component. Name it List. 
//In the List component, create an array if users.
// For instance ['Robert', 'Emily', 'Michael', 'Sarah']
//Use the map function to iterate over the array of users and render the list of users
// in <ul> <li> tags.
//Include this List component in the App component to display the list of users.