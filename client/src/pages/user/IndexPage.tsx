import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getTable, loginTable } from '../../api/table'
import useTableContext from '../../context/TableContext'

function IndexPage() {
  const navigate = useNavigate()
  const location = useLocation()  
  const queryParams = new URLSearchParams(location.search)
  const id = queryParams.get("id")
  const {setTableNo, setTableId} = useTableContext()


  useEffect(()=>{
      if (id){
        setTableId(id)
        getTable(id)
        .then((res)=>{
          
          setTableNo(res.data.table_no)  
          navigate("/")  
        })
        .catch(err=>console.log(err))
      }
  }, [])


    

  return (
    <div>...Loading</div>
  )
}

export default IndexPage

