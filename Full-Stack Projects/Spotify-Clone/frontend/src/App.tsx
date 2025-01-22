import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";


function App() {


  return (
    <>
      <header>
        {/* if you are signed out, it will show sign in button */}
      <SignedOut>
        <SignInButton />
      </SignedOut>
      {/* if you are signed in, it will show logo, on click sign out button */}
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
    </>
  )
}

export default App
