import './profile.css'

export function Button(){
    return(
        <button onClick={() => alert('Button clicked!')}> Click Me </button>
    )
}
 function Profile() {
    const imgSrc = 'https://react.dev/images/docs/scientists/1bX5QH6.jpg'
    return (
        <img className="logo" src={imgSrc} alt="Hero Image" />
    )
}

export default Profile;
