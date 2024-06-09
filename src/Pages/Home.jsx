import React, { useEffect, useState } from 'react'
import FilterGif from '../Components/FilterGif'
import { GifState } from '../Context/DataContext'
import Gif from '../Components/Gif';
import SearchGif from '../Components/SearchGif';

function Home() {
  const { gf, gifs, setGifs, filter } = GifState()
  const [limit, setLimit] = useState(20)


  async function fetchTrendingGifs() {
    const { data } = await gf.trending({
      limit: limit,
      type: filter,
      rating: "g",
    });

    setGifs((prev) => [...prev,...data])
  }

  useEffect(() => {
    fetchTrendingGifs()
  }, [filter, limit])

  const handelInfiniteScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setLimit((prev) => prev + 20);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handelInfiniteScroll);
    return () => window.removeEventListener("scroll", handelInfiniteScroll);
  }, []);

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