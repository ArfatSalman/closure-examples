// Curried Add

// Write a function called curriedAdd. If you give this function a number, it returns a new function to you.
// If you give this function no arguments, it returns the total of all the numbers you’ve passed to it so far.

// let firstAdder = curriedAdd();
// let secondAdder = curriedAdd();
// let thirdAdder = curriedAdd();

// firstAdder(); // 0
// secondAdder(1)(2)(); // 3
// thirdAdder(2)(8)(5)(1)(); // 16

function curriedAdd(total) {
	if (total === undefined) return 0;
	return function addNext(num) {
		if (num === undefined) return total;
		total += num;
		return addNext;
	};
}
module.exports = { curriedAdd };
