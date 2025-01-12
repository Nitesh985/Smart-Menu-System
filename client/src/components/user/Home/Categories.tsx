import React, { useEffect, useState } from "react";
import CategoryItem from "./CategoryItem";
import { getAllCategories } from "../../../api/category";
import { CategoryProps } from "./CategoryItem";
import { Loading } from "../..";
import { NavLink } from "react-router-dom";

function Categories() {
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAllCategories()
      .then((data) => setCategories(data))
      .catch((error) => console.error("Failed to fetch categories:", error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {categories.length > 0 &&
        categories.map((category) => (
          <NavLink
            key={category._id}
            to={`/${category._id}`}
            className={({ isActive }) =>
              isActive
                ? "flex items-center justify-center rounded-full border-[6px] border-green-400"
                : "flex items-center justify-center rounded-full border-[6px] border-transparent group"
            }
          >
            <CategoryItem {...category} />
            <div className=" absolute mt-24 rounded-xl font-semibold w-20 flex justify-center items-center" >{category.name}</div>
          </NavLink>
        ))}
      {loading && <Loading />}
    </>
  );
}

export default Categories;
