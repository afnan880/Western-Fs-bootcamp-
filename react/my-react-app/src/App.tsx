// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import './App.css'
// We are directly using the Profile component in the App component,
// bcuz it has export as default in profile.tsx

import { Button } from './button/button.tsx'
import ProfileDetails from './profileDetails/profiledetail.tsx'
import Counter from './Hooks/useMemo.tsx'
import UserList from './userlist/userlist.tsx'
import List from './list/list.tsx'
import Customers from './customers/customers.tsx'
import Post from './customers/post.tsx'
import Parent from './Hooks/UseCallBack/Parent.tsx'
function App() {

  const person = {
    name: 'John Doe',
    description: 'I am a software developer',
    theme: {
      backgroundColor: 'lightblue',
      color: 'black',
      padding: '10px',
      borderRadius: '5px',
    }
  }

  return (
    //Rule 1 - We call it a fragment, it is a way to group multiple elements without adding an extra node to the DOM
    <>
      <h1>Welcome to App page</h1>
      <ProfileDetails>
        <div style={person.theme}>
          <h1>{person.name}</h1>
          <p>{person.description}</p>
        </div>
      </ProfileDetails>
      {/* Rule #2 all tags include single tags must be closed, for example, the img tag must be closed with a slash at the end of the tag */}
      {/* Rule #4 all attributes must be wrapped in curly braces, for example, the src attribute of the img tag must be written as src={heroImg} in React */}

      {/* Rule #3 all attributes must be in camelCase, for example, the class attribute must be written as className in React.
       class is reserved in React/HTML so we need use className */}
      <div style={{ backgroundColor: 'lightgray' }} >


        <UserList />
        <List />
      </div>
      <Counter />
      <Button text="submit" message="successful" />
      <Button text="cancel" message="declined" />
<Customers/>
<Post/>
<Parent/>
    </>
    //Similar to name pass the description from the parent to child.
  )
}

export default App
