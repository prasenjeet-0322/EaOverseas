const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const User = require('../models/User');

// Load env vars
dotenv.config({ path: './server/.env' }); // Adjust path if needed, assuming running from root or server dir
// Try loading from root if server/.env fails or if we are running from root
if (!process.env.MONGO_URI) {
    dotenv.config();
}

const users = [
    {
        name: 'Alex Johnson',
        email: 'alex.j@example.com',
        password: '5678',
        role: 'Student'
    },
    {
        name: 'University Admin',
        email: 'admin@university.edu',
        password: 'UNIV2026',
        role: 'University'
    },
    {
        name: 'Dr. Partner',
        email: 'partner@counsellor.com',
        password: 'COUNSELLOR2026',
        role: 'Counsellor'
    }
];

const seedUsers = async () => {
    try {
        console.log('Connecting to MongoDB...', process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected.');

        for (const u of users) {
            let user = await User.findOne({ email: u.email });
            if (user) {
                console.log(`User ${u.email} already exists.`);
                if (!user.isVerified) {
                    user.isVerified = true;
                    await user.save();
                    console.log(`Matched user ${u.email} verified.`);
                }
            } else {
                console.log(`Creating user ${u.email}...`);
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(u.password, salt);

                user = new User({
                    name: u.name,
                    email: u.email,
                    password: hashedPassword,
                    role: u.role,
                    isVerified: true
                });

                await user.save();
                console.log(`User ${u.email} created successfully.`);
            }
        }

        console.log('Seeding complete.');
        process.exit();
    } catch (err) {
        console.error('Seeding failed:', err);
        process.exit(1);
    }
};

seedUsers();
