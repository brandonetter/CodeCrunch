/*
Ok so the options were:
a) Create an environment that can load up a fresh database, seed it, have prisma installed
connect prisma to the database, and then run the user code in it, then clean up the database
and close the connection.
OR
b) Create a mock database and mock prisma client that can be used to test the user code.

I chose option b because it's much easier to implement and it's also faster to run.

Plus who doesn't like a good mock? 😄

*/
const source = `
"use strict";
/*
Title: Bran-new ORM
Description: This is a simple ORM that can handle basic CRUD operations and relationships between models.
*/
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var data = {
    users: [
        { id: 1, name: 'John', age: 25 },
        { id: 2, name: 'Mark', age: 30 },
        { id: 3, name: 'Jim', age: 35 },
        { id: 4, name: 'Josh', age: 35 },
    ],
    posts: [
        { id: 1, title: 'Hello World', userId: 1 },
        { id: 2, title: 'Hello GraphQL', userId: 1 },
        { id: 3, title: 'Hello Apollo', userId: 3 },
        { id: 4, title: 'That is cool', userId: 1 },
    ],
    comments: [
        { id: 1, text: 'Great post!', postId: 1, likes: 2, userId: 2 },
        { id: 2, text: 'Thanks!', postId: 1, likes: 3, userId: 4 },
        { id: 3, text: 'Awesome!', postId: 4, likes: 5, userId: 1 },
    ],
};
const createORM = function (data) {
    var orm = {};
    var findBy = function (model, key, value) {
        return data[model].find(function (item) { return item[key] === value; });
    };
    var filterBy = function (model, where) {
        if (data[model]) {
            return data[model].filter(function (item) {
                return Object.keys(where).every(function (key) {
                    var value = where[key];
                    if (typeof value === 'object') {
                        var operator = Object.keys(value)[0];
                        var operandValue = value[operator];
                        switch (operator) {
                            case 'startsWith':
                                return item[key]
                                    .toLowerCase()
                                    .startsWith(operandValue.toLowerCase());
                            case 'endsWith':
                                return item[key]
                                    .toLowerCase()
                                    .endsWith(operandValue.toLowerCase());
                            case 'contains':
                                return item[key]
                                    .toLowerCase()
                                    .includes(operandValue.toLowerCase());
                            case 'gt':
                                return item[key] > operandValue;
                            case 'lt':
                                return item[key] < operandValue;
                            case 'gte':
                                return item[key] >= operandValue;
                            case 'lte':
                                return item[key] <= operandValue;
                            case 'ne':
                                return item[key] !== operandValue;
                            case 'in':
                                return operandValue.includes(item[key]);
                            case 'notIn':
                                return !operandValue.includes(item[key]);
                            case 'not':
                                return item[key] !== operandValue;
                            case 'regex':
                                var regex = new RegExp(operandValue, 'i');
                                return regex.test(item[key]);
                            default:
                                return item[key] === value;
                        }
                    }
                    else {
                        return item[key] === value;
                    }
                });
            });
        }
        return [];
    };
    var select = function (data, selectQuery) {
        return Object.keys(selectQuery).reduce(function (acc, key) {
            if (selectQuery[key]) {
                acc[key] = data[key];
            }
            return acc;
        }, {});
    };
    var include = function (model, data, includeQuery) {
        return Object.keys(includeQuery).reduce(function (acc, key) {
            var _a, _b;
            var nestedInclude = includeQuery[key];
            var modelMin = model.slice(0, -1);
            if (nestedInclude) {
                var includeData = void 0;
                if (typeof nestedInclude === 'boolean') {
                    includeData = filterBy(key, (_a = {}, _a["".concat(modelMin, "Id")] = data.id, _a));
                }
                else {
                    var whereClause = nestedInclude.where || {};
                    includeData = filterBy(key, __assign(__assign({}, whereClause), (_b = {}, _b["".concat(modelMin, "Id")] = data.id, _b)));
                }
                acc[key] = includeData.map(function (item) {
                    return handleInclude(key, item, nestedInclude);
                });
            }
            return acc;
        }, {});
    };
    var handleInclude = function (model, data, includeQuery) {
        var selectedData = data;
        if (typeof includeQuery !== 'boolean') {
            if (includeQuery === null || includeQuery === void 0 ? void 0 : includeQuery.include) {
                includeQuery = includeQuery.include;
            }
        }
        if (includeQuery) {
            var includedData = include(model, data, includeQuery);
            selectedData = __assign(__assign({}, data), includedData);
        }
        return selectedData;
    };
    Object.keys(data).forEach(function (model) {
        orm[model] = {
            find: function (id) { return findBy(model, 'id', id); },
            all: function () { return data[model]; },
            findUnique: function (query) {
                var key = Object.keys(query.where)[0];
                var value = query.where[key];
                var modelData = findBy(model, key, value);
                if (!query.select && !query.include) {
                    return modelData;
                }
                var selectedData = modelData;
                if (query.select) {
                    selectedData = select(modelData, query.select);
                }
                if (query.include) {
                    selectedData = handleInclude(model, selectedData, query.include);
                }
                return selectedData;
            },
            findMany: function (query) {
              if(!query) return data[model];
                var modelData = filterBy(model, query.where);
                return modelData.map(function (item) {
                    var selectedData = item;
                    if (query.select) {
                        selectedData = select(item, query.select);
                    }
                    if (query.include) {
                        selectedData = handleInclude(model, selectedData, query.include);
                    }
                    return selectedData;
                });
            },
        };
    });
    return orm;
};
export default createORM;

`;
export default source;
