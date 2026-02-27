const mongoose = require('mongoose');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const test = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const user = await User.findOne();
        if (!user) {
            console.log("No users found in database.");
            process.exit(0);
        }

        console.log("Found User ID:", user._id);

        const token = jwt.sign(
            { user: { id: user._id } },
            'secret'
        );

        console.log("Valid Token:", token);
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};

test();
