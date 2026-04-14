import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectToDB } from './db/index.js';
import { Category } from './models/category.models.js';
import { Dish } from './models/dish.models.js';
import { User } from './models/user.models.js';
import { Table } from './models/table.models.js';
import { Order } from './models/order.models.js';
import { Payment } from './models/payment.models.js';
import { Feedback } from './models/feedback.models.js';

dotenv.config();

// Configuration for seeding amounts
const SEED_CONFIG = {
    categories: 8,
    dishes: 50,
    users: 25,
    tables: 15,
    orders: 100,
    payments: 90, // Some orders might not have payments yet
    feedback: 75  // Not all orders will have feedback
};

// Restaurant category data for realistic seeding
const CATEGORY_DATA = [
    { name: 'Appetizers', description: 'Delicious starters to begin your meal' },
    { name: 'Main Course', description: 'Hearty and satisfying main dishes' },
    { name: 'Desserts', description: 'Sweet treats to end your meal perfectly' },
    { name: 'Beverages', description: 'Refreshing drinks and beverages' },
    { name: 'Soups', description: 'Warm and comforting soups' },
    { name: 'Salads', description: 'Fresh and healthy salad options' },
    { name: 'Pasta', description: 'Italian pasta dishes and specialties' },
    { name: 'Pizza', description: 'Wood-fired pizzas with fresh toppings' }
];

// Helper function to get random array elements
const getRandomElements = (array, count) => {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

// Clear existing data
async function clearDatabase() {
    console.log('🗑️  Clearing existing data...');
    await Promise.all([
        Category.deleteMany({}),
        Dish.deleteMany({}),
        User.deleteMany({}),
        Table.deleteMany({}),
        Order.deleteMany({}),
        Payment.deleteMany({}),
        Feedback.deleteMany({})
    ]);
    console.log('✅ Database cleared!');
}

// Seed Categories
async function seedCategories() {
    console.log('🍽️  Seeding categories...');
    const categories = [];

    for (let i = 0; i < SEED_CONFIG.categories; i++) {
        const categoryData = CATEGORY_DATA[i] || {
            name: faker.commerce.department(),
            description: faker.lorem.sentence()
        };

        categories.push({
            name: categoryData.name,
            description: categoryData.description,
            image: {
                url: faker.image.urlPicsumPhotos({ width: 400, height: 300 }),
                public_id: faker.string.alphanumeric(12)
            }
        });
    }

    const createdCategories = await Category.insertMany(categories);
    console.log(`✅ Created ${createdCategories.length} categories`);
    return createdCategories;
}

// Seed Dishes
async function seedDishes(categories) {
    console.log('🍕 Seeding dishes...');
    const dishes = [];

    // Dish name mappings for different categories
    const dishNames = {
        'Appetizers': ['Garlic Bread', 'Mozzarella Sticks', 'Chicken Wings', 'Spring Rolls', 'Bruschetta'],
        'Main Course': ['Grilled Chicken', 'Beef Steak', 'Fish & Chips', 'Lamb Curry', 'Pork Ribs'],
        'Desserts': ['Chocolate Cake', 'Ice Cream', 'Tiramisu', 'Cheesecake', 'Apple Pie'],
        'Beverages': ['Fresh Juice', 'Smoothie', 'Coffee', 'Tea', 'Milkshake'],
        'Soups': ['Tomato Soup', 'Chicken Soup', 'Mushroom Soup', 'Lentil Soup', 'Vegetable Soup'],
        'Salads': ['Caesar Salad', 'Greek Salad', 'Garden Salad', 'Fruit Salad', 'Quinoa Salad'],
        'Pasta': ['Spaghetti Carbonara', 'Penne Arrabbiata', 'Lasagna', 'Fettuccine Alfredo', 'Ravioli'],
        'Pizza': ['Margherita Pizza', 'Pepperoni Pizza', 'Hawaiian Pizza', 'Veggie Pizza', 'Meat Lovers Pizza']
    };

    for (let i = 0; i < SEED_CONFIG.dishes; i++) {
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        const categoryDishes = dishNames[randomCategory.name] || [];
        const dishName = categoryDishes[Math.floor(Math.random() * categoryDishes.length)] ||
                         faker.commerce.productName();

        dishes.push({
            name: dishName,
            image: {
                url: faker.image.urlPicsumPhotos({ width: 600, height: 400 }),
                public_id: faker.string.alphanumeric(12)
            },
            stock: faker.number.int({ min: 0, max: 100 }),
            description: faker.lorem.paragraph({ min: 1, max: 3 }),
            price: faker.number.float({ min: 5.99, max: 89.99, fractionDigits: 2 }),
            categoryId: randomCategory._id
        });
    }

    const createdDishes = await Dish.insertMany(dishes);
    console.log(`✅ Created ${createdDishes.length} dishes`);
    return createdDishes;
}

// Seed Users
async function seedUsers() {
    console.log('👥 Seeding users...');
    const users = [];

    for (let i = 0; i < SEED_CONFIG.users; i++) {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();

        users.push({
            username: faker.internet.username({ firstName, lastName }),
            email: faker.internet.email({ firstName, lastName }),
            contactNo: faker.phone.number({ style: 'national' }),
            address: faker.location.streetAddress({ useFullAddress: true })
        });
    }

    const createdUsers = await User.insertMany(users);
    console.log(`✅ Created ${createdUsers.length} users`);
    return createdUsers;
}

// Seed Tables
async function seedTables() {
    console.log('🪑 Seeding tables...');
    const tables = [];

    for (let i = 1; i <= SEED_CONFIG.tables; i++) {
        tables.push({
            table_no: `T${i.toString().padStart(3, '0')}`,
            occupied: faker.datatype.boolean({ probability: 0.3 }) // 30% chance of being occupied
        });
    }

    const createdTables = await Table.insertMany(tables);
    console.log(`✅ Created ${createdTables.length} tables`);
    return createdTables;
}

// Seed Orders
async function seedOrders(users, tables, dishes) {
    console.log('📋 Seeding orders...');
    const orders = [];
    const orderStatuses = ['PENDING', 'PREPARING', 'READY', 'CANCELLED'];

    for (let i = 0; i < SEED_CONFIG.orders; i++) {
        const randomUser = users[Math.floor(Math.random() * users.length)];
        const randomTable = tables[Math.floor(Math.random() * tables.length)];
        const orderItemsCount = faker.number.int({ min: 1, max: 6 });
        const selectedDishes = getRandomElements(dishes, orderItemsCount);

        const orderItems = selectedDishes.map(dish => ({
            _id: dish._id,
            quantity: faker.number.int({ min: 1, max: 4 }),
            price: dish.price
        }));

        const totalPrice = orderItems.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);

        orders.push({
            tableId: randomTable._id,
            orderedBy: randomUser._id,
            isEditing: faker.datatype.boolean({ probability: 0.1 }), // 10% chance
            status: faker.helpers.arrayElement(orderStatuses),
            note: faker.datatype.boolean({ probability: 0.4 }) ? faker.lorem.sentence() : undefined,
            orderItems: orderItems,
            totalPrice: Math.round(totalPrice * 100) / 100 // Round to 2 decimal places
        });
    }

    const createdOrders = await Order.insertMany(orders);
    console.log(`✅ Created ${createdOrders.length} orders`);
    return createdOrders;
}

// Seed Payments
async function seedPayments(orders) {
    console.log('💳 Seeding payments...');
    const payments = [];
    const paymentStatuses = ['PENDING', 'COMPLETE', 'FAILED', 'REFUNDED'];
    const paymentMethods = ['ESEWA', 'CASH'];

    // Select random orders for payments (not all orders have payments)
    const ordersForPayment = getRandomElements(orders, SEED_CONFIG.payments);

    for (const order of ordersForPayment) {
        const status = faker.helpers.arrayElement(paymentStatuses);
        let amount = order.totalPrice;

        // If refunded, amount might be different
        if (status === 'REFUNDED') {
            amount = faker.datatype.boolean({ probability: 0.7 }) ?
                     amount : faker.number.float({ min: amount * 0.5, max: amount, fractionDigits: 2 });
        }

        payments.push({
            orderId: order._id,
            amount: amount,
            status: status,
            paymentMethod: faker.helpers.arrayElement(paymentMethods)
        });
    }

    const createdPayments = await Payment.insertMany(payments);
    console.log(`✅ Created ${createdPayments.length} payments`);
    return createdPayments;
}

// Seed Feedback
async function seedFeedback(users, orders) {
    console.log('⭐ Seeding feedback...');
    const feedback = [];

    // Select random orders for feedback (not all orders have feedback)
    const ordersWithFeedback = getRandomElements(orders, SEED_CONFIG.feedback);

    for (const order of ordersWithFeedback) {
        const rating = faker.number.int({ min: 1, max: 5 });
        let message = '';

        // Generate contextual feedback based on rating
        if (rating === 5) {
            message = faker.helpers.arrayElement([
                'Excellent food and service! Will definitely come back.',
                'Amazing experience, highly recommended!',
                'Perfect meal, everything was delicious.',
                'Outstanding quality and great presentation.',
                'Wonderful dining experience, exceeded expectations!'
            ]);
        } else if (rating === 4) {
            message = faker.helpers.arrayElement([
                'Very good food, just minor improvements needed.',
                'Great service and tasty food.',
                'Good experience overall, would recommend.',
                'Nice atmosphere and quality food.',
                'Satisfied with the meal and service.'
            ]);
        } else if (rating === 3) {
            message = faker.helpers.arrayElement([
                'Average experience, food was okay.',
                'Decent meal but could be better.',
                'Service was fine, food was acceptable.',
                'Not bad but not exceptional either.',
                'Room for improvement in quality.'
            ]);
        } else if (rating === 2) {
            message = faker.helpers.arrayElement([
                'Food was below expectations.',
                'Service was slow and food was cold.',
                'Not satisfied with the quality.',
                'Expected better for the price.',
                'Several issues with the order.'
            ]);
        } else {
            message = faker.helpers.arrayElement([
                'Very disappointing experience.',
                'Poor quality food and service.',
                'Would not recommend to others.',
                'Many problems with the order.',
                'Completely unsatisfied with everything.'
            ]);
        }

        feedback.push({
            userId: order.orderedBy,
            message: message,
            rating: rating
        });
    }

    const createdFeedback = await Feedback.insertMany(feedback);
    console.log(`✅ Created ${createdFeedback.length} feedback entries`);
    return createdFeedback;
}

// Main seeding function
async function seedDatabase() {
    try {
        console.log('🌱 Starting database seeding...\n');

        // Connect to database
        await connectToDB();
        console.log('📊 Connected to database\n');

        // Clear existing data
        await clearDatabase();
        console.log('');

        // Seed all collections in order (respecting dependencies)
        const categories = await seedCategories();
        console.log('');

        const dishes = await seedDishes(categories);
        console.log('');

        const users = await seedUsers();
        console.log('');

        const tables = await seedTables();
        console.log('');

        const orders = await seedOrders(users, tables, dishes);
        console.log('');

        const payments = await seedPayments(orders);
        console.log('');

        const feedback = await seedFeedback(users, orders);
        console.log('');

        // Summary
        console.log('🎉 Database seeding completed successfully!');
        console.log('📈 Summary:');
        console.log(`   • Categories: ${categories.length}`);
        console.log(`   • Dishes: ${dishes.length}`);
        console.log(`   • Users: ${users.length}`);
        console.log(`   • Tables: ${tables.length}`);
        console.log(`   • Orders: ${orders.length}`);
        console.log(`   • Payments: ${payments.length}`);
        console.log(`   • Feedback: ${feedback.length}`);
        console.log('\n✨ Your database is now populated with realistic test data!');

    } catch (error) {
        console.error('❌ Error seeding database:', error);
        throw error;
    } finally {
        // Close database connection
        await mongoose.connection.close();
        console.log('🔌 Database connection closed');
        process.exit(0);
    }
}

// Run the seeding if this file is executed directly
if (process.argv[1].endsWith('seedDatabase.js')) {
    seedDatabase().catch(console.error);
}

export { seedDatabase };
