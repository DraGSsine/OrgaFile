import React from 'react'

const LoadFolders = () => {
  const folders = [
    {
      name: 'Folder 1',
      id: '1',
      numberOfFiles: 5,
    }
    ,
    {
      name: 'Folder 2',
      id: '2',
      numberOfFiles: 5,
    }
    ,
    {
      name: 'Folder 3',
      id: '3',
      numberOfFiles: 5,
    }
  ]
  return (
    <div>
      {
        folders.map((folder) => (
          <div key={folder.id} className="flex justify-between items-center border-b border-gray-200 py-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <i className="fas fa-folder"></i>
              </div>
              <p className="pl-4">{folder.name}</p>
            </div>
            <p>{folder.numberOfFiles} files</p>
          </div>
        ))
      }
    </div>
  )
}

export default LoadFolders