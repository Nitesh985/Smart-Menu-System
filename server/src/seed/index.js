import "dotenv/config";
import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import { Dish } from "../models/dish.models.js";
import { Category } from "../models/category.models.js";
import {DB_NAME} from "../constants.js";



// Real food images mapped per category from Unsplash
const CATEGORY_IMAGES= {
  Nepali: [
    { name: "Dal Bhat", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=640&h=480&fit=crop" },
    { name: "Momo", image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=640&h=480&fit=crop" },
    { name: "Sel Roti", image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=640&h=480&fit=crop" },
    { name: "Thukpa", image: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=640&h=480&fit=crop" },
    { name: "Gundruk", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=640&h=480&fit=crop" },
    { name: "Dhido", image: "https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=640&h=480&fit=crop" },
  ],
  Deserts: [
    { name: "Chocolate Lava Cake", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=640&h=480&fit=crop" },
    { name: "Cheesecake", image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=640&h=480&fit=crop" },
    { name: "Ice Cream Sundae", image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=640&h=480&fit=crop" },
    { name: "Tiramisu", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=640&h=480&fit=crop" },
    { name: "Crème Brûlée", image: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=640&h=480&fit=crop" },
    { name: "Brownie", image: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=640&h=480&fit=crop" },
  ],
  Drinks: [
    { name: "Mango Lassi", image: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=640&h=480&fit=crop" },
    { name: "Lemon Iced Tea", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=640&h=480&fit=crop" },
    { name: "Strawberry Smoothie", image: "https://images.unsplash.com/photo-1502741224143-90386d7f8c82?w=640&h=480&fit=crop" },
    { name: "Cold Brew Coffee", image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=640&h=480&fit=crop" },
    { name: "Fresh Orange Juice", image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=640&h=480&fit=crop" },
    { name: "Masala Chai", image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=640&h=480&fit=crop" },
  ],
  Snacks: [
    { name: "Chicken Wings", image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=640&h=480&fit=crop" },
    { name: "Loaded Nachos", image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=640&h=480&fit=crop" },
    { name: "Spring Rolls", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=640&h=480&fit=crop" },
    { name: "French Fries", image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=640&h=480&fit=crop" },
    { name: "Onion Rings", image: "https://images.unsplash.com/photo-1639024471283-03518883512d?w=640&h=480&fit=crop" },
    { name: "Bruschetta", image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=640&h=480&fit=crop" },
  ],
  Chinese: [
    { name: "Kung Pao Chicken", image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=640&h=480&fit=crop" },
    { name: "Fried Rice", image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=640&h=480&fit=crop" },
    { name: "Dim Sum", image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=640&h=480&fit=crop" },
    { name: "Peking Duck", image: "https://images.unsplash.com/photo-1518492104633-130d0cc84637?w=640&h=480&fit=crop" },
    { name: "Chow Mein", image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=640&h=480&fit=crop" },
    { name: "Mapo Tofu", image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=640&h=480&fit=crop" },
  ],
  Indian: [
    { name: "Butter Chicken", image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=640&h=480&fit=crop" },
    { name: "Biryani", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=640&h=480&fit=crop" },
    { name: "Paneer Tikka", image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=640&h=480&fit=crop" },
    { name: "Masala Dosa", image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=640&h=480&fit=crop" },
    { name: "Palak Paneer", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=640&h=480&fit=crop" },
    { name: "Samosa", image: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?w=640&h=480&fit=crop" },
  ],
};

async function seed() {
  await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
  console.log("Connected to MongoDB");

  const categories = await Category.find();
  if (!categories.length) {
    console.error("No categories found. Please seed categories first.");
    process.exit(1);
  }

  await Dish.deleteMany({});
  console.log("Cleared existing dishes");

  const dishes = categories.flatMap((category) => {
    const categoryDishes = CATEGORY_IMAGES[category.name];

    if (!categoryDishes) {
      console.warn(`No images defined for category: "${category.name}", skipping...`);
      return [];
    }

    return categoryDishes.map((dish) => ({
      name: dish.name,
      description: faker.food.description(),
      price: faker.number.int({ min: 100, max: 1500 }),
      stock: faker.number.int({ min: 5, max: 100 }),
      image: {
        url: dish.image,
        public_id: faker.string.uuid(),
      },
      categoryId: category._id,
    }));
  });

  await Dish.insertMany(dishes);
  console.log(`Seeded ${dishes.length} dishes across ${categories.length} categories`);

  await mongoose.disconnect();
  console.log("Done");
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});