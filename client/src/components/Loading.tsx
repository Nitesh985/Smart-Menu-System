

function Loading({className}:{className?:string}) {
  return (
    <span className={` loading loading-spinner loading-lg text-bgColor-500 absolute right-1/2 top-1/2 ${className}`}></span>
  )
}

export default Loading