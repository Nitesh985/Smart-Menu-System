import { faker } from "@faker-js/faker";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectToDB } from "./db/index.js";
import { Category } from "./models/category.models.js";
import { Dish } from "./models/dish.models.js";
import { User } from "./models/user.models.js";
import { Table } from "./models/table.models.js";
import { Order } from "./models/order.models.js";
import { Payment } from "./models/payment.models.js";
import { Feedback } from "./models/feedback.models.js";

dotenv.config();

// Configuration for selective seeding
const SELECTIVE_CONFIG = {
  categories: 5,
  dishes: 20,
  users: 10,
  tables: 8,
  orders: 30,
  payments: 25,
  feedback: 20,
};

// Restaurant category data for realistic seeding
const CATEGORY_DATA = [
  { name: "Appetizers", description: "Delicious starters to begin your meal" },
  { name: "Main Course", description: "Hearty and satisfying main dishes" },
  { name: "Desserts", description: "Sweet treats to end your meal perfectly" },
  { name: "Beverages", description: "Refreshing drinks and beverages" },
  { name: "Soups", description: "Warm and comforting soups" },
  { name: "Salads", description: "Fresh and healthy salad options" },
  { name: "Pasta", description: "Italian pasta dishes and specialties" },
  { name: "Pizza", description: "Wood-fired pizzas with fresh toppings" },
];

// Helper function to get random array elements
const getRandomElements = (array, count) => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Individual seeding functions
async function seedCategoriesOnly() {
  console.log("🍽️  Clearing and seeding categories...");
  await Category.deleteMany({});

  const categories = [];
  for (let i = 0; i < SELECTIVE_CONFIG.categories; i++) {
    const categoryData = CATEGORY_DATA[i] || {
      name: faker.commerce.department(),
      description: faker.lorem.sentence(),
    };

    categories.push({
      name: categoryData.name,
      description: categoryData.description,
      image: {
        url: faker.image.urlPicsumPhotos({ width: 400, height: 300 }),
        public_id: faker.string.alphanumeric(12),
      },
    });
  }

  const created = await Category.insertMany(categories);
  console.log(`✅ Created ${created.length} categories`);
  return created;
}

async function seedDishesOnly() {
  console.log("🍕 Clearing and seeding dishes...");

  // Get existing categories
  const categories = await Category.find({});
  if (categories.length === 0) {
    throw new Error("No categories found. Please seed categories first.");
  }

  await Dish.deleteMany({});

  const dishes = [];
  const dishNames = {
    Appetizers: [
      "Garlic Bread",
      "Mozzarella Sticks",
      "Chicken Wings",
      "Spring Rolls",
      "Bruschetta",
    ],
    "Main Course": [
      "Grilled Chicken",
      "Beef Steak",
      "Fish & Chips",
      "Lamb Curry",
      "Pork Ribs",
    ],
    Desserts: [
      "Chocolate Cake",
      "Ice Cream",
      "Tiramisu",
      "Cheesecake",
      "Apple Pie",
    ],
    Beverages: ["Fresh Juice", "Smoothie", "Coffee", "Tea", "Milkshake"],
    Soups: [
      "Tomato Soup",
      "Chicken Soup",
      "Mushroom Soup",
      "Lentil Soup",
      "Vegetable Soup",
    ],
    Salads: [
      "Caesar Salad",
      "Greek Salad",
      "Garden Salad",
      "Fruit Salad",
      "Quinoa Salad",
    ],
    Pasta: [
      "Spaghetti Carbonara",
      "Penne Arrabbiata",
      "Lasagna",
      "Fettuccine Alfredo",
      "Ravioli",
    ],
    Pizza: [
      "Margherita Pizza",
      "Pepperoni Pizza",
      "Hawaiian Pizza",
      "Veggie Pizza",
      "Meat Lovers Pizza",
    ],
  };

  for (let i = 0; i < SELECTIVE_CONFIG.dishes; i++) {
    const randomCategory =
      categories[Math.floor(Math.random() * categories.length)];
    const categoryDishes = dishNames[randomCategory.name] || [];
    const dishName =
      categoryDishes[Math.floor(Math.random() * categoryDishes.length)] ||
      faker.commerce.productName();

    dishes.push({
      name: dishName,
      image: {
        url: faker.image.urlPicsumPhotos({ width: 600, height: 400 }),
        public_id: faker.string.alphanumeric(12),
      },
      stock: faker.number.int({ min: 0, max: 100 }),
      description: faker.lorem.paragraph({ min: 1, max: 3 }),
      price: faker.number.float({ min: 5.99, max: 89.99, fractionDigits: 2 }),
      categoryId: randomCategory._id,
    });
  }

  const created = await Dish.insertMany(dishes);
  console.log(`✅ Created ${created.length} dishes`);
  return created;
}

async function seedUsersOnly() {
  console.log("👥 Clearing and seeding users...");
  await User.deleteMany({});

  const users = [];
  for (let i = 0; i < SELECTIVE_CONFIG.users; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    users.push({
      username: faker.internet.username({ firstName, lastName }),
      email: faker.internet.email({ firstName, lastName }),
      contactNo: faker.phone.number({ style: "national" }),
      address: faker.location.streetAddress({ useFullAddress: true }),
    });
  }

  const created = await User.insertMany(users);
  console.log(`✅ Created ${created.length} users`);
  return created;
}

async function seedTablesOnly() {
  console.log("🪑 Clearing and seeding tables...");
  await Table.deleteMany({});

  const tables = [];
  for (let i = 1; i <= SELECTIVE_CONFIG.tables; i++) {
    tables.push({
      table_no: `T${i.toString().padStart(3, "0")}`,
      occupied: faker.datatype.boolean({ probability: 0.3 }),
    });
  }

  const created = await Table.insertMany(tables);
  console.log(`✅ Created ${created.length} tables`);
  return created;
}

async function seedOrdersOnly() {
  console.log("📋 Clearing and seeding orders...");

  // Check for required dependencies
  const users = await User.find({});
  const tables = await Table.find({});
  const dishes = await Dish.find({});

  if (users.length === 0) {
    throw new Error("No users found. Please seed users first.");
  }
  if (tables.length === 0) {
    throw new Error("No tables found. Please seed tables first.");
  }
  if (dishes.length === 0) {
    throw new Error("No dishes found. Please seed dishes first.");
  }

  await Order.deleteMany({});

  const orders = [];
  const orderStatuses = ["PENDING", "PREPARING", "READY", "CANCELLED"];

  for (let i = 0; i < SELECTIVE_CONFIG.orders; i++) {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const randomTable = tables[Math.floor(Math.random() * tables.length)];
    const orderItemsCount = faker.number.int({ min: 1, max: 4 });
    const selectedDishes = getRandomElements(dishes, orderItemsCount);

    const orderItems = selectedDishes.map((dish) => ({
      _id: dish._id,
      quantity: faker.number.int({ min: 1, max: 3 }),
      price: dish.price,
    }));

    const totalPrice = orderItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    orders.push({
      tableId: randomTable._id,
      orderedBy: randomUser._id,
      isEditing: faker.datatype.boolean({ probability: 0.1 }),
      status: faker.helpers.arrayElement(orderStatuses),
      note: faker.datatype.boolean({ probability: 0.4 })
        ? faker.lorem.sentence()
        : undefined,
      orderItems: orderItems,
      totalPrice: Math.round(totalPrice * 100) / 100,
    });
  }

  const created = await Order.insertMany(orders);
  console.log(`✅ Created ${created.length} orders`);
  return created;
}

async function seedPaymentsOnly() {
  console.log("💳 Clearing and seeding payments...");

  // Check for required dependencies
  const orders = await Order.find({});
  if (orders.length === 0) {
    throw new Error("No orders found. Please seed orders first.");
  }

  await Payment.deleteMany({});

  const payments = [];
  const paymentStatuses = ["PENDING", "COMPLETE", "FAILED", "REFUNDED"];
  const paymentMethods = ["ESEWA", "CASH"];

  // Select random orders for payments
  const ordersForPayment = getRandomElements(
    orders,
    Math.min(SELECTIVE_CONFIG.payments, orders.length),
  );

  for (const order of ordersForPayment) {
    const status = faker.helpers.arrayElement(paymentStatuses);
    let amount = order.totalPrice;

    // If refunded, amount might be different
    if (status === "REFUNDED") {
      amount = faker.datatype.boolean({ probability: 0.7 })
        ? amount
        : faker.number.float({
            min: amount * 0.5,
            max: amount,
            fractionDigits: 2,
          });
    }

    payments.push({
      orderId: order._id,
      amount: amount,
      status: status,
      paymentMethod: faker.helpers.arrayElement(paymentMethods),
    });
  }

  const created = await Payment.insertMany(payments);
  console.log(`✅ Created ${created.length} payments`);
  return created;
}

async function seedFeedbackOnly() {
  console.log("⭐ Clearing and seeding feedback...");

  // Check for required dependencies
  const users = await User.find({});
  const orders = await Order.find({});

  if (users.length === 0) {
    throw new Error("No users found. Please seed users first.");
  }
  if (orders.length === 0) {
    throw new Error("No orders found. Please seed orders first.");
  }

  await Feedback.deleteMany({});

  const feedback = [];
  const ordersWithFeedback = getRandomElements(
    orders,
    Math.min(SELECTIVE_CONFIG.feedback, orders.length),
  );

  for (const order of ordersWithFeedback) {
    const rating = faker.number.int({ min: 1, max: 5 });
    let message = "";

    // Generate contextual feedback based on rating
    if (rating === 5) {
      message = faker.helpers.arrayElement([
        "Excellent food and service! Will definitely come back.",
        "Amazing experience, highly recommended!",
        "Perfect meal, everything was delicious.",
        "Outstanding quality and great presentation.",
      ]);
    } else if (rating === 4) {
      message = faker.helpers.arrayElement([
        "Very good food, just minor improvements needed.",
        "Great service and tasty food.",
        "Good experience overall, would recommend.",
        "Nice atmosphere and quality food.",
      ]);
    } else if (rating === 3) {
      message = faker.helpers.arrayElement([
        "Average experience, food was okay.",
        "Decent meal but could be better.",
        "Service was fine, food was acceptable.",
        "Not bad but not exceptional either.",
      ]);
    } else if (rating === 2) {
      message = faker.helpers.arrayElement([
        "Food was below expectations.",
        "Service was slow and food was cold.",
        "Not satisfied with the quality.",
        "Expected better for the price.",
      ]);
    } else {
      message = faker.helpers.arrayElement([
        "Very disappointing experience.",
        "Poor quality food and service.",
        "Would not recommend to others.",
        "Completely unsatisfied with everything.",
      ]);
    }

    feedback.push({
      userId: order.orderedBy,
      message: message,
      rating: rating,
    });
  }

  const created = await Feedback.insertMany(feedback);
  console.log(`✅ Created ${created.length} feedback entries`);
  return created;
}

// CLI interface
async function runSelectiveSeeding() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`
🌱 Selective Database Seeding

Usage: node src/seedSelective.js <collection1> [collection2] ...

Available collections:
  categories  - Seed food categories
  dishes      - Seed menu items (requires categories)
  users       - Seed customer profiles
  tables      - Seed restaurant tables
  orders      - Seed customer orders (requires users, tables, dishes)
  payments    - Seed payment records (requires orders)
  feedback    - Seed customer reviews (requires users, orders)
  all         - Seed all collections in proper order

Examples:
  node src/seedSelective.js categories dishes
  node src/seedSelective.js users
  node src/seedSelective.js all
        `);
    process.exit(0);
  }

  try {
    await connectToDB();
    console.log("📊 Connected to database\n");

    const collections = args.includes("all")
      ? [
          "categories",
          "dishes",
          "users",
          "tables",
          "orders",
          "payments",
          "feedback",
        ]
      : args;

    for (const collection of collections) {
      try {
        switch (collection.toLowerCase()) {
          case "categories":
            await seedCategoriesOnly();
            break;
          case "dishes":
            await seedDishesOnly();
            break;
          case "users":
            await seedUsersOnly();
            break;
          case "tables":
            await seedTablesOnly();
            break;
          case "orders":
            await seedOrdersOnly();
            break;
          case "payments":
            await seedPaymentsOnly();
            break;
          case "feedback":
            await seedFeedbackOnly();
            break;
          default:
            console.log(`❌ Unknown collection: ${collection}`);
            continue;
        }
        console.log("");
      } catch (error) {
        console.error(`❌ Error seeding ${collection}:`, error.message);
        console.log("");
      }
    }

    console.log("✨ Selective seeding completed!");
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await mongoose.connection.close();
    console.log("🔌 Database connection closed");
    process.exit(0);
  }
}

// Export individual functions for programmatic use
export {
  seedCategoriesOnly,
  seedDishesOnly,
  seedUsersOnly,
  seedTablesOnly,
  seedOrdersOnly,
  seedPaymentsOnly,
  seedFeedbackOnly,
};

// Run selective seeding if this file is executed directly
if (process.argv[1].endsWith("seedSelective.js")) {
  runSelectiveSeeding().catch(console.error);
}
