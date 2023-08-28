import Link from 'next/link'

const Table = ({ fields, data, source, clickable, handleDelete }) => {
  const classes = field => {
    let classes = ''

    if (field.name.toLowerCase() === 'status') {
      classes = 'hidden px-6 py-3 bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider md:block'
    } else {
      classes = 'px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'

      if (field.alignment) {
        classes += ` text-${field.alignment}`
      }
    }

    return classes
  }

  const statusStyles = {
    created: 'bg-green-100 text-green-800',
    updated: 'bg-yellow-100 text-yellow-800',
    success: 'bg-green-100 text-green-800',
    processing: 'bg-yellow-100 text-yellow-800',
    failed: 'bg-gray-100 text-gray-800'
  }
  return (
    <div className='max-w-full px-4 sm:px-6 lg:px-12'>
      <div className='flex flex-col mt-2'>
        <div className='align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg border border-gray-200'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead>
              <tr>
                {fields.map((field, key) => (
                  <th key={key} className={classes(field)}>
                    {field.header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className='bg-white divide-y divide-gray-200'>
              {data.length > 0 ? (
                data.map((item, rowIndex) => (
                  <tr key={rowIndex}>
                    {fields.map((field, columnIndex) => {
                      if (field.name === 'actions') {
                        return (
                          <td key={columnIndex} className={`px-6 py-4 text-${field.alignment ?? 'left'}`}>
                            <Link href={`/${source}/${item['id']}/edit`} className='text-xs bg-cyan-500 text-white px-2 py-0.5 rounded-md font-semibold uppercase'>
                              Edit
                            </Link>

                            <button onClick={() => handleDelete(item['id'])} className='ml-1 text-xs bg-red-500 text-white px-2 py-0.5 rounded-md font-semibold uppercase'>
                              Delete
                            </button>
                          </td>
                        )
                      } else if (field.name === clickable) {
                        return (
                          <td key={columnIndex} className={`flex hover:text-cyan-600 hover:cursor-pointer hover:underline text-${field.alignment ?? 'left'} whitespace-nowrap text-sm text-gray-500`}>
                            <Link className='flex-1 px-6 py-4 inline-block' href={`/${source}/${item['id']}`}>
                              {item[field.name]}
                            </Link>
                          </td>
                        )
                      } else {
                        return (
                          <td key={columnIndex} className={`px-6 py-4 text-${field.alignment ?? 'left'} whitespace-nowrap text-sm text-gray-500`}>
                            {item[field.name]}
                          </td>
                        )
                      }
                    })}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={fields.length} className='px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500'>
                    No Records Available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Table
