const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

// Validate Function to check e-mail length
let emailLengthChecker = email => {
    // Check if e-mail exists
    if (!email) {
        return false; // Return error
    } else {
        // Check length of e-mail string
        if (email.length < 5 || email.length > 30) {
            return false; // Return error if does not meet length requirement
        } else {
            return true; // Return as valid e-mail
        }
    }
};

// Validate Function to check if valid e-mail format
let validEmailChecker = email => {
    // Check if e-mail exists
    if (!email) {
        return false; // Return error
    } else {
        // Regular expression to test if e-mail format is valid
        const regExp = new RegExp(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
        return regExp.test(email); // Return regular expression test result (true or false)
    }
};

// Array of e-mail validators
const emailValidators = [
    {
        validator: emailLengthChecker,
        message: "E-mail must be at least 5 characters but no more than 30"
    },
    {
        validator: validEmailChecker,
        message: "Must be a valid e-mail"
    }
];

// Validate Function to check username length
let usernameLengthChecker = username => {
    // Check if username exists
    if (!username) {
        return false; // Return error
    } else {
        // Check length of username string
        if (username.length < 3 || username.length > 15) {
            return false; // Return error if does not meet length requirement
        } else {
            return true; // Return as valid username
        }
    }
};

// Validate Function to check if valid username format
let validUsername = username => {
    // Check if username exists
    if (!username) {
        return false; // Return error
    } else {
        // Regular expression to test if username format is valid
        const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
        return regExp.test(username); // Return regular expression test result (true or false)
    }
};

// Array of Username validators
const usernameValidators = [
    {
        validator: usernameLengthChecker,
        message: "Username must be at least 3 characters but no more than 15"
    },
    {
        validator: validUsername,
        message: "Username must not have any special characters"
    }
];

let passwordLengthChecker = password => {
    if (!password) {
        return false;
    } else {
        if (password.length < 8 || password.length > 35) {
            return false;
        } else {
            return true;
        }
    }
};

let validPasword = password => {
    if (!password) {
        return false;
    } else {
        const regExp = new RegExp(
            /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/
        );
        return regExp.test(password);
    }
};

const passwordValidator = [
    {
        validator: passwordLengthChecker,
        message: "Passowrd must be at least 8 characters but no more than 35"
    },
    {
        validator: validPasword,
        message:
            "Must have at least one uppercas, loweercase, special character, and number"
    }
];

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: emailValidators
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: usernameValidators
    },
    password: {
        type: String,
        required: true,
        validate: passwordValidator
    }
});

userSchema.pre("save", function (next) {
    if (this.isModified("password")) {
        bcrypt.hash(this.password, 10, (err, hash) => {
            if (err) return next(err);
            this.password = hash;
            next();
        });
    } else {
        return next();
    }
});

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
