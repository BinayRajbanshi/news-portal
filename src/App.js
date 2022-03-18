import React, { useEffect , useState } from 'react'
import SearchForm from './SearchForm'

export default function App() {
  const [articles , setArticles] = useState([])
  const [term , setTerm] = useState('everything')
  const [isLoading , setIsLoading] = useState(true)

  useEffect(() => {
    try {
    fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${term}&api-key=${process.env.REACT_APP_ARTICLES_API_KEY}`)
    .then(res => res.json())
    .then(data => 
      {
        console.log(data)
        console.log(data.response.docs)
        setArticles(data.response.docs)
        setIsLoading(false)
      }
    )
    } catch (error) {
      console.error(error)
    }
  } , [term])

  return (
    <>
    <div className="showcase">
      <div className="overlay px-5">
        <h1 className='capitalize text-4xl font-bold text-white text-center mb-4'>Viewing articles about {term}</h1>
        <SearchForm searchText = {(text) => setTerm(text)}/>
      </div>
    </div>


    {isLoading ? (
    <h1 className='text-center mt-20 font-bold text-5xl'>Loading...</h1>
    ): ( <section className='grid grid-cols-1 gap-10 px-5 pt-10 pb-20 lg:w-9/12 lg:mx-auto'>
    {articles.map((article) => {
      const {
        abstract,
        headline: {main},
        lead_paragraph ,
        news_desk ,
        section_name ,
        byline:{original} ,
        web_url ,
        _id,
        word_count
      } = article

      return(
        <article key={_id} className="bg-white px-5 py-10 rounded-lg ">
          <h2 className='font-bold text-2xl lg:text-4xl mb-5 capitalize'>{main}</h2> 
           <p>{abstract}</p>
           <p>{lead_paragraph}</p>

           <ul className='my-4'>
             <li className='italic'>__{original}</li>
             <li><span className='font-bold'>News Desk:</span> {news_desk}</li>
             <li><span className='font-bold'>Section Name:</span> {section_name}</li>
             <li><span className='font-bold'>Word Count:</span> {word_count}</li>
           </ul>
           <a href={web_url} target='_blank' className='underline'> 
             Web Resource</a>
        </article>
      )
    })}
  </section>)
  }
    </>
  )
}
