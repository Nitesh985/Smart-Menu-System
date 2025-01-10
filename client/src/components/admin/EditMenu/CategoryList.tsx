import React, { useEffect, useState } from "react";
import { Button, Image, Loading, Modal, Table } from "../..";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { getAllCategories } from "../../../api/category";
import EditCategoryBtn from "./EditCategoryBtn";
import RemoveCategoryBtn from "./RemoveCategoryBtn";
import { EditCategory } from "..";

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoryUpdated, setCategoryUpdated] = useState(false);
  

  useEffect(() => {
    setLoading(true);
    getAllCategories()
      .then((categories) => {
        setCategories(categories);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [categoryUpdated]);

  return (
    <>
      <Table rows={["name", "description"]}>
        {categories.length > 0 &&
          categories.map((category, index) => (
            <tr
              key={category._id}
              className={
                index === 0
                  ? `bg-slate-300 group flex items-center`
                  : "group flex items-center"
              }
            >
              <td className="flex space-x-2 justify-center items-center ">
                <p className="font-semibold text-[14px] ">{index + 1}</p>
              </td>
              <td>
                {category.image && (
                  <Image imageUrl={category.image?.url} alt={category.name} />
                )}
                <div className="text-center font-semibold">{category.name}</div>
              </td>
              <td>{category.description}</td>
              <div className="ml-5 flex scale-0 space-x-3 group-hover:scale-100">
                <EditCategoryBtn
                  categoryId={category?._id}
                  setCategoryUpdated={setCategoryUpdated}
                />
                <RemoveCategoryBtn
                  categoryId={category?._id}
                  setCategoryUpdated={setCategoryUpdated}
                />
              </div>
            </tr>
          ))}
      </Table>
      {loading && <Loading />}
      
    </>
  );
}

export default CategoryList;
