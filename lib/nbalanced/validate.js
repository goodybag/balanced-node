//===========================================================================
// FILE: validate.js
//
// DESCRIPTION:
//    validation routines and methods.
//
// HISTORY:
//    Created: 3/24/13 Chad Scharf
//===========================================================================

/**
 * Validates a required parameter. If a parameter is invalid, invoked callback or throws an exception if no
 *  callback is supplied.
 *
 * @method parameterRequired
 * @param {*} parameter The parameter value/instance to be validated
 * @param {String} name The name of the parameter that is being validated
 * @param {Function} callback The callback function to call, if any.
 */
exports.parameterRequired = function (parameter, name, callback) {
    if (typeof parameter === "undefined" || parameter === null) {
        var err = "Required parameter '" + (name || "") + "' is missing or was not provided.";
        exports.callbackOrThrow(err, callback);
        return false;
    }
    return true;

}; // parameterRequired

/**
 * Validates a required parameter. If a parameter is invalid, invoked callback or throws an exception if no
 *  callback is supplied.
 *
 * @method requiredProperties
 * @param {Object} object The object value/instance to be validated
 * @param {Array} names The name or names of the object properties that are required to be populated
 * @param {Function} callback The callback function to call, if any.
 */
exports.requiredProperties = function (object, names, callback) {

    // Get our property names array to check, if just one property (not an array) make it an array.
    var check = (names instanceof Array ? names : [names]);

    // Validate the object itself that we want to check isn't null or undefined.
    if (typeof object === "undefined" || object === null) {
        exports.callbackOrThrow("object is undefined or null.", callback);
        return false;
    }

    // If there are no properties to check, then just assume we're checking the object itself,
    //  and since we already did this above, we'll just be happy and content and return true.
    if (!names || names.length === 0) {
        return true;
    }

    // Build our invalid items array for any properties that are missing from the object
    var invalidItems = [];
    for (var i = 0; i < check.length; i += 1) {
        var n = check[i];
        var c = object[n];
        if (typeof c === "undefined" || c === null) {
            invalidItems.push(n);
        }
    }

    // Check if there were any missing or null items that were required for this object
    if (invalidItems.length > 0) {
        exports.callbackOrThrow("The following properties are required and are missing or null (" +
            invalidItems.join() + ").", callback);
        return false;
    }

    // Valid, yay!
    return true;

}; // requiredProperties

/**
 * Either throws an exception or makes a callback if a callback is provided.
 *
 * @method parameterRequired
 * @param {String} error The error to be returned/thrown.
 * @param {Function} callback The callback function to call, if any.
 * @return {Boolean} Always returns false.
 */
exports.callbackOrThrow = function (error, callback) {
    if (callback && typeof callback !== "function") callback = null;

    if (!callback) throw error;
    else callback({ description: [error], status: 400 });

    return false;

}; // callbackOrThrow