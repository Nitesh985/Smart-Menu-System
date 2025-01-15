import { useEffect, useState } from "react";
import Categories from "./Categories";
import { Button, Carousel, Loading } from "../..";
import DishCard from "./DishCard";
import { getAllDishes } from "../../../api/dish";
import { DishProps } from "./DishCard";
import { getDishByCategory } from "../../../api/category";
import { useParams } from "react-router-dom";

const images = [
  "https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://imgs.search.brave.com/r8d0TZGzFAuGuWKFEPsIENr0ua6ars2c3GnbP2hj2gQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA2Lzk3LzQ3LzE3/LzM2MF9GXzY5NzQ3/MTcxOF9ybnJPNGEx/RUNIaUZBMkF6cGJm/RmFwYnBicUhYTU5E/VC5qcGc",
];

function Home() {
  const [loading, setLoading] = useState(false);
  const [dishes, setDishes] = useState<DishProps[]>([]);
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
  }, [categoryId]);

  return (
    <main className="mt-2 w-full">
      <div className="mb-3 border border-t border-white border-opacity-20"></div>
      <div className="sticky border-b-slate-800 top-0 scrollbar-hide flex h-28 ml-3 items-center space-x-5 overflow-auto bg-white z-20">
        <Categories />
      </div>
      <div className="mb-3 border border-t border-white border-opacity-20 z-10"></div>
      <div className={`hidden sm:flex sm:${"mt-2 flex justify-center"} `}>
        <Carousel images={images} />
      </div>
      <div className="divider"></div>
      <div className="flex space-x-2">
        <Button className="green-submit-button">Veg</Button>
        <Button className="green-submit-button">Non-Veg</Button>
        <Button className="green-submit-button">Mixed</Button>
      </div>
      <section className="-mx-5 flex flex-wrap justify-between gap-y-14 py-6 px-4">
        {dishes.length > 0 &&
          dishes.map((dish) => <DishCard key={dish._id} {...dish} />)}
      </section>
      <aside>
        <div className="lg:tooltip lg:tooltip-open lg:tooltip-bottom" data-tip="hello">
          <button className="btn">Bottom</button>
        </div>
      </aside>
      {loading && <Loading />}
    </main>
  );
}

export default Home;
