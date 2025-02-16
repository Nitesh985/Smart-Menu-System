import { IoSend } from "react-icons/io5";
import { Button, RatingStar, TextArea, Loading } from "../..";
import { writeFeedback } from "../../../api/feedback";
import { useAppSelector } from "../../../store/hooks";
import { useState } from "react";

function GiveReview() {
  const [formData, setFormData] = useState({
    message: "",
    rating: 5,
  });
  const [loading, setLoading] = useState(false);
  const token = useAppSelector((state) => state.auth.token);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const writeReview = (e) => {
    e.preventDefault();
    console.log(formData);
    setLoading(true);
    writeFeedback(token, formData)
    .then(()=>setFormData({message:"", rating:5}))
    .finally(() => setLoading(false));
  };

  return (
    <>
        <form className="mt-3" onSubmit={writeReview}>
          <RatingStar handleChange={handleChange} />
          <div className="flex space-x-3 w-full">
            <TextArea
              placeholder="...Your Feedback"
              className="w-full focus:border-purple-600 focus:border-opacity-50"
              name="message"
              value={formData.message}
              onChange={handleChange}
            />
            <Button disabled={loading} type="submit" className="rounded-lg border-purple-700">
              <IoSend />
            </Button>
          </div>
        </form>
    </>
  );
}

export default GiveReview;
