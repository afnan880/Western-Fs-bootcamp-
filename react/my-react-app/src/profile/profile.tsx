import './Profile.css'

type ProfileProps = {
    imgUrl: string
    fullName: string
    description: string
    role: string
};

export default function Profile({ imgUrl, fullName, description, role }: ProfileProps) {

    return (
        <div className="card" style={{ width: '400px' }}>
            <img className="card-img-top" src={imgUrl} alt="Hero Image" />
            <div className="card-body">
                <h4 className="card-title">{fullName}</h4>
                <p className="card-text">{description}</p>
                <p className="card-text">{!role || role !== 'admin' ? <p>User</p> : <p>Admin User</p>}</p>
            </div>
        </div>

    )
}
