import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GifState } from '../Context/DataContext';
import Gif from '../Components/Gif';

function Category() {
  const { category } = useParams()
  const [result, setResult] = useState([]);
  const { gf, } = GifState();

  async function fetchResults() {
    const { data } = await gf.gifs(category, category)
    setResult(data)
  }

  useEffect(() => {
    fetchResults()
  }, [category])

  return (
    <div className='my-4'>
      <h3 className='text-2xl xl:4xl pb-3 font-extrabold'>{category}</h3>

      {result.length > 0 && (
        <div className='columns-2  md:columns-3 lg:columns-4 xl:columns-5 gap-2'>
          {result.slice(1).map((gif) => {
            return <Gif gif={gif} key={gif.id} />
          })}
        </div>
      )}
    </div>
  )
}

export default Category