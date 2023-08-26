import Link from 'next/link'

const Pagination = () => {
  return (
    <div v-if='meta.links.length > 3' className='bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6'>
      {/* <!-- For desktop view --> */}
      <div className='hidden sm:flex-1 sm:flex sm:items-center sm:justify-between'>
        <div>
          <p className='text-sm text-gray-700'>
            Showing <span className='font-medium'>{meta.from}</span> to <span className='font-medium'>{meta.to}</span> of <span className='font-medium'>{meta.total}</span> results
          </p>
        </div>
        <div>
          <nav className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px' aria-label='Pagination'>
            {meta.links.map((link, key) => {
              if (!link.url) {
                ;<>
                  <div v-if="link.label === 'previous'" className='relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'>
                    <span className='sr-only'>Previous</span>
                    <ChevronLeftIcon className='h-5 w-5' aria-hidden='true' />
                  </div>

                  <div v-else-if="link.label === 'next'" className='relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'>
                    <span className='sr-only'>Next</span>
                    <ChevronRightIcon className='h-5 w-5' aria-hidden='true' />
                  </div>
                </>
              } else {
                return (
                  <>
                    <Link v-if="link.label === 'previous'" href={link.url} className='relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'>
                      <span className='sr-only'>Previous</span>
                      <ChevronLeftIcon className='h-5 w-5' aria-hidden='true' />
                    </Link>

                    <Link v-else-if="link.label === 'next'" href={link.url} className='relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'>
                      <span className='sr-only'>Next</span>
                      <ChevronRightIcon className='h-5 w-5' aria-hidden='true' />
                    </Link>

                    <Link
                      v-else
                      href={link.url}
                      v-html='link.label'
                      className={`bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium ${link.active ? 'z-10 bg-cyan-50 border-cyan-500 text-cyan-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'}`}
                    />
                  </>
                )
              }
            })}
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Pagination
