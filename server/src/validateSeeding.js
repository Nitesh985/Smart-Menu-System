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

// Validation functions for each collection
async function validateCategories() {
    const categories = await Category.find({});
    const issues = [];

    console.log(`📁 Categories: ${categories.length} documents`);

    for (const category of categories) {
        if (!category.name || category.name.trim() === '') {
            issues.push(`Category ${category._id} has empty name`);
        }
        if (!category.description) {
            issues.push(`Category ${category._id} missing description`);
        }
        if (!category.image || !category.image.url) {
            issues.push(`Category ${category._id} missing image URL`);
        }
    }

    // Check for duplicate names
    const names = categories.map(c => c.name);
    const duplicates = names.filter((name, index) => names.indexOf(name) !== index);
    if (duplicates.length > 0) {
        issues.push(`Duplicate category names found: ${duplicates.join(', ')}`);
    }

    return issues;
}

async function validateDishes() {
    const dishes = await Dish.find({}).populate('categoryId');
    const categories = await Category.find({});
    const issues = [];

    console.log(`🍽️  Dishes: ${dishes.length} documents`);

    for (const dish of dishes) {
        if (!dish.name || dish.name.trim() === '') {
            issues.push(`Dish ${dish._id} has empty name`);
        }
        if (!dish.price || dish.price <= 0) {
            issues.push(`Dish ${dish._id} has invalid price: ${dish.price}`);
        }
        if (!dish.categoryId) {
            issues.push(`Dish ${dish._id} missing categoryId`);
        } else if (!dish.categoryId.name) {
            issues.push(`Dish ${dish._id} has invalid category reference`);
        }
        if (dish.stock < 0) {
            issues.push(`Dish ${dish._id} has negative stock: ${dish.stock}`);
        }
        if (!dish.description || dish.description.trim() === '') {
            issues.push(`Dish ${dish._id} missing description`);
        }
        if (!dish.image || !dish.image.url) {
            issues.push(`Dish ${dish._id} missing image URL`);
        }
    }

    // Check category distribution
    const categoryDistribution = {};
    dishes.forEach(dish => {
        const categoryName = dish.categoryId?.name || 'Unknown';
        categoryDistribution[categoryName] = (categoryDistribution[categoryName] || 0) + 1;
    });

    console.log('   Category distribution:', categoryDistribution);

    return issues;
}

async function validateUsers() {
    const users = await User.find({});
    const issues = [];

    console.log(`👥 Users: ${users.length} documents`);

    for (const user of users) {
        if (!user.username || user.username.trim() === '') {
            issues.push(`User ${user._id} has empty username`);
        }
        if (!user.email || !user.email.includes('@')) {
            issues.push(`User ${user._id} has invalid email: ${user.email}`);
        }
        if (!user.contactNo || user.contactNo.trim() === '') {
            issues.push(`User ${user._id} missing contact number`);
        }
    }

    // Check for duplicate emails
    const emails = users.map(u => u.email);
    const duplicateEmails = emails.filter((email, index) => emails.indexOf(email) !== index);
    if (duplicateEmails.length > 0) {
        issues.push(`Duplicate user emails found: ${duplicateEmails.join(', ')}`);
    }

    // Check for duplicate usernames
    const usernames = users.map(u => u.username);
    const duplicateUsernames = usernames.filter((username, index) => usernames.indexOf(username) !== index);
    if (duplicateUsernames.length > 0) {
        issues.push(`Duplicate usernames found: ${duplicateUsernames.join(', ')}`);
    }

    return issues;
}

async function validateTables() {
    const tables = await Table.find({});
    const issues = [];

    console.log(`🪑 Tables: ${tables.length} documents`);

    for (const table of tables) {
        if (!table.table_no || table.table_no.trim() === '') {
            issues.push(`Table ${table._id} has empty table number`);
        }
        if (typeof table.occupied !== 'boolean') {
            issues.push(`Table ${table._id} has invalid occupied status: ${table.occupied}`);
        }
    }

    // Check for duplicate table numbers
    const tableNumbers = tables.map(t => t.table_no);
    const duplicateTableNumbers = tableNumbers.filter((num, index) => tableNumbers.indexOf(num) !== index);
    if (duplicateTableNumbers.length > 0) {
        issues.push(`Duplicate table numbers found: ${duplicateTableNumbers.join(', ')}`);
    }

    const occupiedCount = tables.filter(t => t.occupied).length;
    console.log(`   Occupied tables: ${occupiedCount}/${tables.length}`);

    return issues;
}

async function validateOrders() {
    const orders = await Order.find({}).populate('tableId orderedBy orderItems._id');
    const users = await User.find({});
    const tables = await Table.find({});
    const dishes = await Dish.find({});
    const issues = [];

    console.log(`📋 Orders: ${orders.length} documents`);

    const validStatuses = ['PENDING', 'PREPARING', 'READY', 'CANCELLED'];

    for (const order of orders) {
        if (!order.tableId) {
            issues.push(`Order ${order._id} missing tableId`);
        }
        if (!order.orderedBy) {
            issues.push(`Order ${order._id} missing orderedBy`);
        }
        if (!validStatuses.includes(order.status)) {
            issues.push(`Order ${order._id} has invalid status: ${order.status}`);
        }
        if (!order.orderItems || order.orderItems.length === 0) {
            issues.push(`Order ${order._id} has no order items`);
        }
        if (!order.totalPrice || order.totalPrice <= 0) {
            issues.push(`Order ${order._id} has invalid total price: ${order.totalPrice}`);
        }

        // Validate order items
        if (order.orderItems) {
            for (const item of order.orderItems) {
                if (!item._id) {
                    issues.push(`Order ${order._id} has order item without dish ID`);
                }
                if (!item.quantity || item.quantity <= 0) {
                    issues.push(`Order ${order._id} has order item with invalid quantity: ${item.quantity}`);
                }
                if (!item.price || item.price <= 0) {
                    issues.push(`Order ${order._id} has order item with invalid price: ${item.price}`);
                }
            }
        }

        // Validate total price calculation
        if (order.orderItems) {
            const calculatedTotal = order.orderItems.reduce((total, item) => {
                return total + (item.price * item.quantity);
            }, 0);
            const roundedCalculatedTotal = Math.round(calculatedTotal * 100) / 100;
            if (Math.abs(order.totalPrice - roundedCalculatedTotal) > 0.01) {
                issues.push(`Order ${order._id} total price mismatch: ${order.totalPrice} vs calculated ${roundedCalculatedTotal}`);
            }
        }
    }

    // Status distribution
    const statusDistribution = {};
    orders.forEach(order => {
        statusDistribution[order.status] = (statusDistribution[order.status] || 0) + 1;
    });
    console.log('   Status distribution:', statusDistribution);

    return issues;
}

async function validatePayments() {
    const payments = await Payment.find({}).populate('orderId');
    const orders = await Order.find({});
    const issues = [];

    console.log(`💳 Payments: ${payments.length} documents`);

    const validStatuses = ['PENDING', 'COMPLETE', 'FAILED', 'REFUNDED'];
    const validMethods = ['ESEWA', 'CASH'];

    for (const payment of payments) {
        if (!payment.orderId) {
            issues.push(`Payment ${payment._id} missing orderId`);
        }
        if (!payment.amount || payment.amount < 0) {
            issues.push(`Payment ${payment._id} has invalid amount: ${payment.amount}`);
        }
        if (!validStatuses.includes(payment.status)) {
            issues.push(`Payment ${payment._id} has invalid status: ${payment.status}`);
        }
        if (!validMethods.includes(payment.paymentMethod)) {
            issues.push(`Payment ${payment._id} has invalid payment method: ${payment.paymentMethod}`);
        }

        // Validate amount against order total
        if (payment.orderId && payment.orderId.totalPrice) {
            if (payment.status !== 'REFUNDED' && payment.amount !== payment.orderId.totalPrice) {
                // Allow small differences for rounding
                if (Math.abs(payment.amount - payment.orderId.totalPrice) > 0.01) {
                    issues.push(`Payment ${payment._id} amount ${payment.amount} doesn't match order total ${payment.orderId.totalPrice}`);
                }
            }
        }
    }

    // Status and method distribution
    const statusDistribution = {};
    const methodDistribution = {};
    payments.forEach(payment => {
        statusDistribution[payment.status] = (statusDistribution[payment.status] || 0) + 1;
        methodDistribution[payment.paymentMethod] = (methodDistribution[payment.paymentMethod] || 0) + 1;
    });
    console.log('   Status distribution:', statusDistribution);
    console.log('   Method distribution:', methodDistribution);

    return issues;
}

async function validateFeedback() {
    const feedback = await Feedback.find({}).populate('userId');
    const users = await User.find({});
    const issues = [];

    console.log(`⭐ Feedback: ${feedback.length} documents`);

    for (const fb of feedback) {
        if (!fb.userId) {
            issues.push(`Feedback ${fb._id} missing userId`);
        }
        if (!fb.message || fb.message.trim() === '') {
            issues.push(`Feedback ${fb._id} has empty message`);
        }
        if (!fb.rating || fb.rating < 1 || fb.rating > 5) {
            issues.push(`Feedback ${fb._id} has invalid rating: ${fb.rating}`);
        }
    }

    // Rating distribution
    const ratingDistribution = {};
    feedback.forEach(fb => {
        ratingDistribution[fb.rating] = (ratingDistribution[fb.rating] || 0) + 1;
    });
    console.log('   Rating distribution:', ratingDistribution);

    // Average rating
    const averageRating = feedback.reduce((sum, fb) => sum + fb.rating, 0) / feedback.length;
    console.log(`   Average rating: ${averageRating.toFixed(2)}/5`);

    return issues;
}

async function validateRelationships() {
    console.log('\n🔗 Validating relationships...');
    const issues = [];

    // Check if all dishes have valid categories
    const dishesWithoutCategory = await Dish.find({}).populate('categoryId');
    const invalidDishes = dishesWithoutCategory.filter(dish => !dish.categoryId);
    if (invalidDishes.length > 0) {
        issues.push(`${invalidDishes.length} dishes have invalid category references`);
    }

    // Check if all orders have valid users and tables
    const ordersWithRefs = await Order.find({}).populate('orderedBy tableId');
    const ordersWithInvalidUser = ordersWithRefs.filter(order => !order.orderedBy);
    const ordersWithInvalidTable = ordersWithRefs.filter(order => !order.tableId);

    if (ordersWithInvalidUser.length > 0) {
        issues.push(`${ordersWithInvalidUser.length} orders have invalid user references`);
    }
    if (ordersWithInvalidTable.length > 0) {
        issues.push(`${ordersWithInvalidTable.length} orders have invalid table references`);
    }

    // Check if all payments have valid orders
    const paymentsWithOrders = await Payment.find({}).populate('orderId');
    const paymentsWithInvalidOrder = paymentsWithOrders.filter(payment => !payment.orderId);
    if (paymentsWithInvalidOrder.length > 0) {
        issues.push(`${paymentsWithInvalidOrder.length} payments have invalid order references`);
    }

    // Check if all feedback has valid users
    const feedbackWithUsers = await Feedback.find({}).populate('userId');
    const feedbackWithInvalidUser = feedbackWithUsers.filter(fb => !fb.userId);
    if (feedbackWithInvalidUser.length > 0) {
        issues.push(`${feedbackWithInvalidUser.length} feedback entries have invalid user references`);
    }

    return issues;
}

async function generateSummary() {
    console.log('\n📊 Database Summary:');

    const counts = await Promise.all([
        Category.countDocuments({}),
        Dish.countDocuments({}),
        User.countDocuments({}),
        Table.countDocuments({}),
        Order.countDocuments({}),
        Payment.countDocuments({}),
        Feedback.countDocuments({})
    ]);

    const [categories, dishes, users, tables, orders, payments, feedback] = counts;

    console.log(`   • Categories: ${categories}`);
    console.log(`   • Dishes: ${dishes}`);
    console.log(`   • Users: ${users}`);
    console.log(`   • Tables: ${tables}`);
    console.log(`   • Orders: ${orders}`);
    console.log(`   • Payments: ${payments}`);
    console.log(`   • Feedback: ${feedback}`);

    // Calculate some interesting statistics
    const totalRevenue = await Order.aggregate([
        { $match: { status: { $ne: 'CANCELLED' } } },
        { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);

    const averageOrderValue = await Order.aggregate([
        { $match: { status: { $ne: 'CANCELLED' } } },
        { $group: { _id: null, avg: { $avg: '$totalPrice' } } }
    ]);

    if (totalRevenue.length > 0) {
        console.log(`   • Total Revenue: $${totalRevenue[0].total.toFixed(2)}`);
    }
    if (averageOrderValue.length > 0) {
        console.log(`   • Average Order Value: $${averageOrderValue[0].avg.toFixed(2)}`);
    }
}

// Main validation function
async function validateDatabase() {
    try {
        console.log('🔍 Starting database validation...\n');

        // Connect to database
        await connectToDB();
        console.log('📊 Connected to database\n');

        let allIssues = [];

        // Run all validations
        const categoryIssues = await validateCategories();
        const dishIssues = await validateDishes();
        const userIssues = await validateUsers();
        const tableIssues = await validateTables();
        const orderIssues = await validateOrders();
        const paymentIssues = await validatePayments();
        const feedbackIssues = await validateFeedback();
        const relationshipIssues = await validateRelationships();

        allIssues = [
            ...categoryIssues,
            ...dishIssues,
            ...userIssues,
            ...tableIssues,
            ...orderIssues,
            ...paymentIssues,
            ...feedbackIssues,
            ...relationshipIssues
        ];

        // Generate summary
        await generateSummary();

        // Report results
        console.log('\n🎯 Validation Results:');
        if (allIssues.length === 0) {
            console.log('✅ All validations passed! Your database is in perfect condition.');
        } else {
            console.log(`❌ Found ${allIssues.length} issues:`);
            allIssues.forEach((issue, index) => {
                console.log(`   ${index + 1}. ${issue}`);
            });
        }

        console.log('\n✨ Database validation completed!');

    } catch (error) {
        console.error('❌ Error validating database:', error);
        throw error;
    } finally {
        // Close database connection
        await mongoose.connection.close();
        console.log('🔌 Database connection closed');
        process.exit(0);
    }
}

// Run validation if this file is executed directly
if (process.argv[1].endsWith('validateSeeding.js')) {
    validateDatabase().catch(console.error);
}

export { validateDatabase };
