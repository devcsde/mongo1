"use strict";

/**
 * Created by csche on 24.07.2017.
 */
var env = process.env.NODE_ENV || "development";

if (env === "development") {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = "mongodb://localhost:27017/TodoApp";
} else if (env === "test") {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = "mongodb://localhost:27017/TodoAppTest";
}
//# sourceMappingURL=config.js.map