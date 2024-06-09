import React, { useEffect, useState } from 'react'
import { HiEllipsisHorizontal, HiEllipsisVertical, HiMiniBars3BottomRight } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import { GifState } from '../Context/DataContext'
import SearchGif from './SearchGif'

function Header() {
  const [categories, setCategories] = useState([])
  const [showCategories, setShowCategories] = useState(false)
  const {gf, filter, setFilter, favorites} = GifState()

  async function fetchCategories() {
    const { data } = await gf.categories();
    setCategories(data)
  }

  useEffect(() => {
    fetchCategories();
  }, [])
  return (
    <>
    <nav>
      <div className='relative flex gap-4 items-center justify-between mb-2'>
        <Link to='/' className='flex gap-2'>
          <img src="/logo.svg" alt="GIPHY Logo" className='w-7' />
          <h1 className='text-4xl font-bold tracking-tighter cursor-pointer'>GIPHY</h1>
        </Link>

        {/* categoies list */}
        <div className='font-bold text-md flex gap-2 items-center'>
          {categories?.slice(0, 5)?.map((category) => {
            return (
              <Link to={`/${category.name_encoded}`} key={category.name} className='px-4 py-1 hover:gradient border-b-4 hidden lg:block'>{category.name}</Link>
            )
          })
          }

          <button onClick={() => setShowCategories(!showCategories)}>
            <HiEllipsisVertical size={35} className={`p-0.5 hover:gradient ${showCategories ? "gradient" : ""} border-b-4 hidden lg:block`} />
          </button>

          {/* favorite Gife btn */}
          {favorites.length > 0 && <div className="h-9 bg-gray-700 pt-1 px-6 cursor-pointer rounded">
              <Link to="/favorites">Favorite GIFs</Link>
            </div>
          }

          <button>
            <HiMiniBars3BottomRight size={30} className='text-sky-400 block lg:hidden' />
          </button>
        </div>
        {showCategories &&
          <div className='absolute top-14 left-0 px-10  pt-6 pb-9 w-full gradient z-20'>
            <span className="text-3xl font-extrabold">Categories</span>
            <hr className="bg-gray-100 opacity-50 my-5"/>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {categories.map((category) => {
                return (
                  <Link to={`/${category.name_encoded}`} key={category.name} className='font-bold'>{category.name}</Link>
                )
              })}
            </div>
          </div>}
      </div>
    </nav>
    <SearchGif />
    {/* banner */}
    <div className="">
        <img src="/banner.gif" alt="banner gif" className='w-full rounded my-2' />
      </div>
    </>
  )
}

export default Header