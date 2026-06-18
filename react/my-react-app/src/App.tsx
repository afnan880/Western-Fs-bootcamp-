// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import './App.css'
import Profile from './profile/profile.tsx'
import {Button} from './profile/profile.tsx'  
 
function App() {
 
 
 
  return (
    //Rule 1 - We call it a fragment, it is a way to group multiple elements without adding an extra node to the DOM
    <>
      <h1>Welcome to Vite + React</h1>
      <p>This is my paragraph</p>
       {/* Rule #2 all tags include single tags must be closed, for example, the img tag must be closed with a slash at the end of the tag */}
       {/* Rule #4 all attributes must be wrapped in curly braces, for example, the src attribute of the img tag must be written as src={heroImg} in React */}
     
      {/* Rule #3 all attributes must be in camelCase, for example, the class attribute must be written as className in React.
       class is reserved in React/HTML so we need use className */}
       <div className ="profiles">
       <Profile />
       <Profile />
       <Profile />
       <Profile />
       <Profile />
       </div>
       <Button/>
    </>
  )
}
 
export default App
