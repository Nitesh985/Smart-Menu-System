import { Button } from "../../components"
import { FaPlus } from "react-icons/fa6";


function EditMenu(){
    return (
        <>
            <h1 className="text-center font-bold text-3xl mt-3">Edit Menu</h1>
            <div>
                <Button>
                    <FaPlus size={25} />
                    <p>Add Dish</p>
                </Button>
                
                <Button>
                    <FaPlus size={25} />
                    <p>Add Category</p>
                </Button>
            </div>
        </>
    )
}

export default EditMenu