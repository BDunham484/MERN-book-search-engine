const User = require("../models/User");

const resolvers = {
    Query: {
        me: async () => {
            return 'placeholder text'
        }
    }
};

module.exports = resolvers;