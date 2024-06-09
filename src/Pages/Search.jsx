import React, { useEffect, useState } from 'react'
import { GifState } from '../Context/DataContext'
import { useParams } from 'react-router-dom';
import FilterGif from '../Components/FilterGif';
import Gif from '../Components/Gif';

function Search() {
  const [searchResults, setSearchResults] = useState([])

  const { gf, filter } = GifState();

  const { query } = useParams();

  async function fetchSearchResults() {
    const { data } = await gf.search(query, {
      sort: "relevant",
      language: "en",
      type: filter,
      limit: 20
    })
    setSearchResults(data)
  }

  useEffect(() => {
    fetchSearchResults()
  }, [filter])

  return (
    <div className='my-4'>
      <h3 className='text-2xl xl:4xl pb-3 font-extrabold'>{query}</h3>

      <FilterGif alignLeft={true} />

      {searchResults.length > 0 ? (
        <div className='columns-2  md:columns-3 lg:columns-4 xl:columns-5 gap-2'>
        {searchResults.map((gif, index) => {
          return <Gif key={index} gif={gif} />
        })}
      </div>
      ): (
          <span className='font-bold'>
        { " " } No GIFs found for {query}. Try searching for Stickers instead?
    </span>
  )}
      
    </div >
  )
}

export default Search