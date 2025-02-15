import React from 'react'
import { Image } from '../..'
import UnknownImage from '../../../assets/no-image-found.png'

export interface CategoryProps{
  _id: string;
  name: string;
  description:string;
  image:{
    url: string;
    public_id: string;
  }
}


function CategoryItem({image}:CategoryProps) {
  return (
      <Image imageUrl={image?.url || UnknownImage} className="w-16 h-16 rounded-full" />
  )
}

export default CategoryItem