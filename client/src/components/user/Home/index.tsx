import { useEffect, useState } from "react";
import Categories from "./Categories";
import { Button, Carousel, Loading } from "../..";
import DishCard from "./DishCard";
import { getAllDishes } from "../../../api/dish";
import { DishProps } from "./DishCard";
import { getDishByCategory } from "../../../api/category";
import useSearchContext from "../../../context/SearchContext";
import { Link, useParams } from "react-router-dom";


function Home() {
  const [loading, setLoading] = useState(false);
  const {dishes, setDishes} = useSearchContext()
  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const dishes = categoryId
          ? await getDishByCategory({ categoryId })
          : await getAllDishes();
        setDishes(dishes);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();

    // Promise.resolve(
    //   getDishByCategory({categoryId: categoryId?categoryId:""})
    // )
    // .then((dishes)=>{
    //   setDishes(dishes);
    // })
    //   .catch((error) => console.log(error))
    //   .finally(() => setLoading(false));
  }, [categoryId, setDishes]);

  return (
    <main className="w-full">
      <div className="border border-t border-white border-opacity-20"></div>
      <div className="sticky border-b-slate-800 top-0 scrollbar-hide flex h-28  items-center space-x-5 overflow-auto bg-white z-20">
        <Categories />
      </div>
      <div className="border border-t border-white border-opacity-20 z-10"></div>
      <div className="divider"></div>
      <section className="-mx-5 flex flex-wrap justify-between gap-y-14 py-6 px-4">
        {dishes.length > 0 &&
          dishes.map((dish) => 
            <DishCard key={dish._id} {...dish} />
          )}
      </section>
      {loading && <Loading />}
    </main>
  );
}

export default Home;
