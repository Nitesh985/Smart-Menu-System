import Button from '../../tagUtils/Button';
import Input from '../../tagUtils/Input';
import { useForm, SubmitHandler } from "react-hook-form";
import { registerUser } from '../../../api/user';
import { useAppDispatch } from '../../../store/hooks';
import { login, setToken } from '../../../store/authSlice';
import { Loading } from '../..';
import { useState } from 'react';

type Inputs = {
  username: string;
  email: string;
  address: string;
  contactNo: string;
}

interface SignUpFormProps {
  tableId: string | null;
  onSuccess: (freshToken: string) => void; // Explicit callback containing the token
}

function SignUpForm({ tableId, onSuccess }: SignUpFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Inputs>();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const signUp: SubmitHandler<Inputs> = (data) => {
    setLoading(true);
    registerUser({ ...data, tableId })
      .then((res) => {
        if (res && res.success) {
          alert("Registration complete!");
          
          const userToken = res.data.token;
          dispatch(setToken(userToken));
          dispatch(login({ userData: res.data }));
          
          // Bubble token straight up to execute order instantly
          onSuccess(userToken);
        }
      })
      .catch((error) => {
        console.error(error);
        if (error.response?.status === 400 && error.response?.data?.message === "Invalid email!") {
          setError("email", { message: "*Please provide correct email address!" });
        } else {
          alert(error.response?.data?.message || "An error occurred during registration.");
        }
      })
      .finally(() => setLoading(false));
  };

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
          {...register("username", { required: true })}
        />
        {errors.username && <span className="text-sm text-red-600 self-start">*Username is a required field</span>}
        
        <Input
          type="text"
          placeholder="Enter your email"
          inputStyles="w-full input-info"
          {...register("email", {
            required: true, 
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "*Email must be valid",
            }
          })}
        />
        {errors.email && <span className="text-sm text-red-600 self-start">{errors.email.message || "*Email is a required field"}</span>}
        
        <Input
          type="text"
          placeholder="Enter your contact no"
          inputStyles="w-full input-info"
          {...register("contactNo", {
            required: true, 
            pattern: {
              value: /^(\+\d{1,3}[- ]?)?\d{10}$/,
              message: "*Contact No must be valid",
            }
          })}
        />
        {errors.contactNo && <span className="text-sm text-red-600 self-start">{errors.contactNo.message || "*Contact No is a required field"}</span>}
        
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
  );
}

export default SignUpForm;