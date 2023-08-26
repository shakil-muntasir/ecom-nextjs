const Table = ({ fields, data }) => {
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
                    {fields.map((field, columnIndex) => (
                      <td key={columnIndex} className='px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500'>
                        {item[field.name]}
                      </td>
                    ))}
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
