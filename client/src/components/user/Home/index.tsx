import { useEffect, useState } from "react";
import Categories from "./Categories";
import { Loading } from "../..";
import DishCard from "./DishCard";
import { getAllDishes } from "../../../api/dish";
import { DishProps } from "./DishCard";
import { getDishByCategory } from "../../../api/category";
import useSearchContext from "../../../context/SearchContext";
import { useParams } from "react-router-dom";

function Home() {
  const [loading, setLoading] = useState(false);
  const { dishes, setDishes } = useSearchContext();
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
  }, [categoryId, setDishes]);

  return (
    <main className="w-full">
      {/* Category bar */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-100 shadow-sm">
        <div className="flex h-28 items-center space-x-5 overflow-x-auto scrollbar-hide px-4">
          <Categories />
        </div>
      </div>

      {/* Dishes grid */}
      <section className="px-4 py-6">
        {loading ? (
          <Loading />
        ) : dishes.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {dishes.map((dish) => (
              <DishCard key={dish._id} {...dish} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400">
            <p className="text-lg font-medium">No dishes found</p>
            <p className="text-sm mt-1">Try selecting a different category</p>
          </div>
        )}
      </section>
    </main>
  );
}

export default Home;