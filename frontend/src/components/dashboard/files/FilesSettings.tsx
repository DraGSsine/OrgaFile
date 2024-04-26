import { Button } from '@nextui-org/button'
import React from 'react'
import { DropDown } from '@/components/Dropdown'

const FilesSettings = ({fileId}:{fileId:string}) => {
  return (
    <DropDown fileId={fileId}/>
  )
}

export default FilesSettings