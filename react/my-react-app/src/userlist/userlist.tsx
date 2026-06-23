import Profile from "../profile/profile";
 
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
        <div>
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