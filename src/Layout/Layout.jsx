import { Outlet } from "react-router-dom"
import Header from '../Components/Header'
function Layout() {
  return (
    <div className="bg-gray-950 w-full min-h-screen text-white">
      <div className="container px-6 py-4 mx-auto">
      <Header />
      <main>
        <Outlet />
      </main>
      </div>
    </div>
  )
}

export default Layout