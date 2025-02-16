import { useEffect, useState } from "react"
import { getAllFeedbacks } from "../../api/feedback"
import { FeedbackComponent } from "../../components/admin"
import { Loading, Rating, Star } from "../../components"
import { CgProfile } from "react-icons/cg";


type FeedbackType = {
    _id: string,
    userId: string,
    message: string,
    rating: number,
    createdAt: Date,
    updatedAt: Date,
    user:{
            _id: string,
            username: string
        }
}


function Feedbacks() {
    const [feedbacks, setFeedbacks] = useState<FeedbackType[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        setLoading(true)
        getAllFeedbacks()
        .then((res)=>{
            setFeedbacks(res.data)
        })
        .finally(()=>setLoading(false))
    }, [])

    if (loading) <Loading />

  return (
    <>
        <h3 className="text-center font-bold text-3xl mt-3" >Feedbacks ({feedbacks.length})</h3>
        <div className="px-16 py-9 space-y-7 " >
            {feedbacks.map(feedback=>(
                <FeedbackComponent {...feedback} />
            ))}
        </div>
    
    </>
  )
}

export default Feedbacks