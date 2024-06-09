import React, { useEffect } from 'react'
import FilterGif from '../Components/FilterGif'
import { GifState } from '../Context/DataContext'
import Gif from '../Components/Gif';
import SearchGif from '../Components/SearchGif';

function Home() {
  const { gf, gifs, setGifs, filter } = GifState()

  async function fetchTrendingGifs() {
    const { data } = await gf.trending({
      limit: 20,
      type: filter,
      rating: "g",
    });

    setGifs(data)
  }

  useEffect(() => {
    fetchTrendingGifs()
  }, [filter])

  return (
    <div >
      <FilterGif showTrending />

      {/* trending gifs */}
      <div className='columns-2  md:columns-3 lg:columns-4 xl:columns-5 gap-2'>
        {gifs.map((gif, index) => {
          return <Gif key={index} gif={gif} />
        })}
      </div>
    </div>
  )
}

export default Home