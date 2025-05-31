import Button from '../../tagUtils/Button'
import Input from '../../tagUtils/Input'
import { useForm, SubmitHandler } from "react-hook-form"
import { registerUser } from '../../../api/user'
import store from '../../../store/store'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { login, setToken } from '../../../store/authSlice'
import { Loading } from '../..'
import { useState } from 'react'

type Inputs = {
  username: string;
  email: string;
  address: string;
  contactNo: string;
}

interface SignUpFormProps{
  onClose: ()=>void
}


function SignUpForm({onClose}:SignUpFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isLoading },
  } = useForm<Inputs>()
  const [loading, setLoading] = useState(false)

  const dispatch = useAppDispatch()
  const auth = useAppSelector(state=>state.auth)

  const signUp: SubmitHandler<Inputs> = (data) => {
    setLoading(true)
        registerUser({...data})
        .then(res=>{
          alert("The user is registered")
          console.log("Hey there!")
          console.log(res.data.token)
          dispatch(setToken(res.data.token))
          dispatch(login({userData:res.data}))
        })
        .then(()=>onClose())
        .catch(error=>{
          console.log(error)
          if (error.response.status===400 && error.response.data.message==="Invalid email!"){
            setError("email", {message: "*Please provide correct email address!"})
          }
        })
        .finally(()=>setLoading(false))
  }

  console.log(auth)

  return (
    <>
      <form
        className="mt-5 mb-10 flex flex-col justify-center items-center space-y-5 "
        encType="multipart/form-data"
        onSubmit={handleSubmit(signUp)}
      >
        <Input
          type="text"
          placeholder="Enter your username"
          inputStyles="w-full input-info"
          {...register("username", {required:true})}
          />
          {errors.username && <span className="text-sm text-red-600 self-start">{errors.username.message?errors.username.message:"*Username is a required field"}</span>}
        <Input
          type="text"
          placeholder="Enter your email"
          inputStyles="w-full input-info"
          {...register("email", {required:true, pattern:{
            value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "*Email must be valid",
          }})}
          />
          {errors.email && <span className="text-sm text-red-600 self-start">{errors.email.message?errors.email.message:"*Email is a required field"}</span>}
        <Input
          type="text"
          placeholder="Enter your contact no"
          inputStyles="w-full input-info"
          {...register("contactNo", {required:true, pattern: {
            value: /^(\+\d{1,3}[- ]?)?\d{10}$/,
            message: "*Contact No must be valid",
        }})}
        />
          {errors.contactNo && <span className="text-sm text-red-600 self-start">{errors.contactNo.message?errors.contactNo.message:"*Contact No is a required field"}</span>}
        <Input
          type="text"
          placeholder="Enter your address"
          inputStyles="w-full input-info"
          {...register("address")}
          />
          <Button
            type="submit"
            className="green-submit-button mt-10 w-full"
          >
            Submit
          </Button>
      </form>
      {loading && <Loading />}
    </>
    
  )
}


export default SignUpForm