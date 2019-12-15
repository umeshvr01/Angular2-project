const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

// Validate Function to check title length
let titleLengthChecker = title => {
    // Check if title exists
    if (!title) {
        return false; // Return error
    } else {
        // Check length of title string
        if (title.length < 5 || title.length > 50) {
            return false; // Return error if does not meet length requirement
        } else {
            return true; // Return as valid title
        }
    }
};

// Validate Function to check if valid title format
let alphaNumericTitleChecker = title => {
    // Check if e-mail exists
    if (!title) {
        return false; // Return error
    } else {
        // Regular expression to test if e-mail format is valid
        const regExp = new RegExp(/^[A-Za-z0-9 ]+$/);
        return regExp.test(title); // Return regular expression test result (true or false)
    }
};

// Array of title validators
const titleValidators = [
    {
        validator: titleLengthChecker,
        message: "Title must be at least 5 characters but no more than 50"
    },
    {
        validator: alphaNumericTitleChecker,
        message: " Title must be alphanumeric"
    }
];

// Validate Function to check body length
let bodyLengthChecker = body => {
    // Check if body exists
    if (!body) {
        return false; // Return error
    } else {
        // Check length of body string
        if (body.length < 5 || body.length > 500) {
            return false; // Return error if does not meet length requirement
        } else {
            return true; // Return as valid body
        }
    }
};

// Array of Body validators
const bodyValidators = [
    {
        validator: bodyLengthChecker,
        message: "Body must be at least 5 characters but no more than 500"
    }
];

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
        validate: titleValidators
    },
    body: {
        type: String,
        required: true,
        validate: bodyValidators
    },
    createdBy: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("Blog", blogSchema);
