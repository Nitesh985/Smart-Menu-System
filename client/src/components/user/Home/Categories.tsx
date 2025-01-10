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
                ? "flex items-center justify-center rounded-full border-2 border-white border-opacity-40 group"
                : "flex items-center justify-center rounded-full border-2 border-white border-opacity-0 opacity-45 group"
            }
          >
            <CategoryItem {...category} />
            <div className="group-hover:flex hidden opacity-45 absolute mt-20 bg-slate-800 rounded-xl font-garamond w-20 justify-center items-center" >{category.name}</div>
          </NavLink>
        ))}
      {loading && <Loading />}
    </>
  );
}

export default Categories;
