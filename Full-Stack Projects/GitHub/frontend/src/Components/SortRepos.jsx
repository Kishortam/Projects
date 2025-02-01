import React from 'react'

// Sorting repos based on sort type recent, forks, stars
const SortRepos = ({onSort, sortType}) => { // imprting from homepage
  return (
    <div className='mb-2 flex justify-center lg:justify-end'>
        {/* button 1 */}
			<button
				type='button'
				className={`py-2.5 px-5 me-2 mb-2 text-xs sm:text-sm font-medium focus:outline-none rounded-lg bg-glass`}
				onClick={()=> onSort("recent")}
			>
				Most Recent
			</button>
            {/* button 2 */}
			<button
				type='button'
				className={`py-2.5 px-5 me-2 mb-2  text-xs sm:text-sm font-medium focus:outline-none rounded-lg bg-glass`}
				onClick={()=> onSort("stars")}
			>
				Most Stars
			</button>
            {/* button 3 */}
			<button
				type='button'
				className={`py-2.5 px-5 me-2 mb-2  text-xs sm:text-sm font-medium focus:outline-none rounded-lg bg-glass`}
				onClick={()=> onSort("forks")}
			>
				Most Forks
			</button>
		</div>
  )
}

export default SortRepos