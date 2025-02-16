import React, { useEffect, useState } from "react";
import { Button, Loading, Table, Image } from "../..";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { getAllDishes } from "../../../api/dish";
import { EditDishBtn, RemoveDishBtn } from "..";

function DishList() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dishUpdated, setDishUpdated] = useState(false)

  useEffect(() => {
    setLoading(true);
    getAllDishes()
      .then((dishes) => setDishes(dishes))
      .finally(() => setLoading(false));
  }, [dishUpdated]);


  return (
    <>
      <Table rows={["name", "description"]}>
        {dishes.length > 0 &&
          dishes.map((dish, index) => (
              <tr
                key={dish._id}
                className={
                  "group flex items-center"
                }
              >
                <td className="flex space-x-2 justify-center items-center ">
                  <p className="font-semibold text-[14px]">{index + 1}</p>
                </td>
                <td>
                  {dish?.image && (
                    <Image imageUrl={dish?.image?.url} />
                  )}
                  <div className="text-center">{dish.name}</div>
                </td>
                <td>{dish.description}</td>
                <div className="ml-5 flex scale-0 space-x-3 group-hover:scale-100">
                  <EditDishBtn dishId={dish._id}  setDishUpdated={setDishUpdated} />  
                  <RemoveDishBtn dishId={dish._id} setDishUpdated={setDishUpdated} />
                </div>
              </tr>
          ))}
      </Table>
      {loading && <Loading />}
    </>
  );
}

export default DishList;
