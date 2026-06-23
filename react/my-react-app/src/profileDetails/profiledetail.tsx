type ProfileDetailsProps = {
    children: React.ReactNode
};
 
function ProfileDetails({ children }: ProfileDetailsProps) {
    return (
        <div className="profile-details">
            <h1>Profile detail page</h1>
            {children}
        </div>
    )
}
 
export default ProfileDetails;
 