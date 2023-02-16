[Answers found here](https://www.toptal.com/javascript/interview-questions)

1. What is a potential pitfall with using typeof bar === "object" to determine if bar is an object? How can this pitfall be avoided?

* Variable bar can be a function or an array and still be called "object", because technically all functions and arrays are types of objects. To specifically check if an object is indeed an object and no other type of object, one call specify this way:
```
console.log((bar !== null) && (typeof bar === "object") && (toString.call(bar) !== "[object Array]"));
```

2. What will the code below output to the console and why?
```
(function(){
  var a = b = 3;
})();

console.log("a defined? " + (typeof a !== 'undefined'));
console.log("b defined? " + (typeof b !== 'undefined'));
```

* If you're not using "strict mode", the code snippet would return:
```
a defined? false
b defined? true
```
* This is because ```var a = b = 3``` is actually 
```
b = 3
var a = b
```
* B isn't preceded with the ```var``` keyword, which makes it a global variable, which allows it to be in the scope even outside of the enclosing function.

3. What will the code below output to the console and why?
```
var myObject = {
    foo: "bar",
    func: function() {
        var self = this;
        console.log("outer func:  this.foo = " + this.foo);
        console.log("outer func:  self.foo = " + self.foo);
        (function() {
            console.log("inner func:  this.foo = " + this.foo);
            console.log("inner func:  self.foo = " + self.foo);
        }());
    }
};
myObject.func();
```

* The output:
```
outer func:  this.foo = bar
outer func:  self.foo = bar
inner func:  this.foo = undefined
inner func:  self.foo = bar
```
* The outer func has access to this, but the inner func doesn't so the this.foo becomes undefined. However, it does have access to self because it's in its scope.

4. What is the significance of, and reason for, wrapping the entire content of a JavaScript source file in a function block?
* This is a popular practice for avoiding naming conflicts with outside JavaScript libraries such as jQuery and Node.js. 

5. What is the significance, and what are the benefits, of including 'use strict' at the beginning of a JavaScript source file?
* This can voluntarily increase stricter parsing and error handling on JavaScript code that would otherwise be quietly ignored. It's generally a good practice to do this.

6. Consider the two functions below. Will they both return the same thing? Why or why not?
```
function foo1()
{
  return {
      bar: "hello"
  };
}

function foo2()
{
  return
  {
      bar: "hello"
  };
}
``` 
* No, the foo2() would return undefined because the automatic semicolon provider would add a semicolon to the end of the return keyword since nothing follows it on the same line.

7. What will the code below output? Explain your answer.
```
console.log(0.1 + 0.2);
console.log(0.1 + 0.2 == 0.3);
```

* This snippet would surprisingly output:
```
0.30000000000000004
false
```
* This is because JavaScript numbers output with floating point precision, which can lead to unexpected results. 

8. In what order will the numbers 1-4 be logged to the console when the code below is executed? Why?
```
(function() {
    console.log(1); 
    setTimeout(function(){console.log(2)}, 1000); 
    setTimeout(function(){console.log(3)}, 0); 
    console.log(4);
})();
```
* This returns:
```
1
4
3
2
```
* This is because 1 and 4 are simple console.logs, so they are in the queue first. And since 3 is in a set timeout of 0, this makes it a higher priority to be executed than 2, which has an entire second before console.logged.

9. Write a simple function (less than 160 characters) that returns a boolean indicating whether or not a string is a palindrome.
```
const isPalindrome = (word) => {
    let palindrome = ''
    for (let i = word.length-1; i >= 0; i--){
        palindrome += word[i];
    }
    return (palindrome === word) ? true : false;
}
```

10. Write a sum method which will work properly when invoked using either syntax below.
```
console.log(sum(2,3));   // Outputs 5
console.log(sum(2)(3));  // Outputs 5
```
```
function sum(x) {
   if (arguments.length == 2) {
        return arguments[0] + arguments[1]; 
   } else {
        return function(y) {return x + y};
   }
}
```

11. Consider the following code snippet:
```
for (var i = 0; i < 5; i++) {
  var btn = document.createElement('button');
  btn.appendChild(document.createTextNode('Button ' + i));
  btn.addEventListener('click', function(){ console.log(i); });
  document.body.appendChild(btn);
}
```
(a) What gets logged to the console when the user clicks on “Button 4” and why?
* This code will always console.log 5 because the function already makes it to five by the time it runs, no matter what button is clicked. By the time the onCLicks are rendered, the for loop has already reached the end and i has the value of 5.

(b) Provide one or more alternate implementations that will work as expected.
```
for (var i = 0; i < 5; i++) {
  var btn = document.createElement('button');
  btn.appendChild(document.createTextNode('Button ' + i));
  btn.addEventListener('click', (function(i) {
    return function() { console.log(i); };
  })(i));
  document.body.appendChild(btn);
}
```

12. Assuming d is an “empty” object in scope, say:
```
var d = {};
…what is accomplished using the following code?

[ 'zebra', 'horse' ].forEach(function(k) {
	d[k] = undefined;
});
``` 
* Running this script ensures that the values in the array are set with undefined as their "own properties" in the object d. 

13. What will the code below output to the console and why?
```
var arr1 = "john".split('');
var arr2 = arr1.reverse();
var arr3 = "jones".split('');
arr2.push(arr3);
console.log("array 1: length=" + arr1.length + " last=" + arr1.slice(-1));
console.log("array 2: length=" + arr2.length + " last=" + arr2.slice(-1));
``` 
```
"array 1: length=5 last=j,o,n,e,s"
"array 2: length=5 last=j,o,n,e,s"
```
* When calling reverse() method on array, it changes the array itself. Arr2 is referencing the same object as arr1, so arr1 changes the same way when arr2.push(arr3) is called. And push an array into another array is setting the last element of first said array as the array being pushed. It doesn't concatenate the two arrays (that's what concat() does).

14. What will the code below output to the console and why ?
```
console.log(1 +  "2" + "2");
console.log(1 +  +"2" + "2");
console.log(1 +  -"1" + "2");
console.log(+"1" +  "1" + "2");
console.log( "A" - "B" + "2");
console.log( "A" - "B" + 2);
```
* The output:
```
"122"
"32"
"02"
"112"
"NaN2"
NaN
```
* (1 +  "2" + "2") - JavaScript assumes that string concatenation is being performed here. So 1 is converted into a string.
* (1 +  +"2" + "2") - The second 2 with a plus sign in front of it is read as a "unary operator", which adds 1 and 2 to be three, and then the last 2 turns 3 into a string. 
* (1 +  -"1" + "2") - The answer follows the same rules as the last problem, turn -"1" to actual negative one. 
* (+"1" +  "1" + "2") - 1 is turned into a number because of the unary operation, but the next two strings concatenate into it. 
* ( "A" - "B" + "2") - A and B can never be converted to numeric values, so they are translated as Not A Number. 
* ( "A" - "B" + 2) - Similarly to the previous problem, the letters are NaN, and since 2 is not a string, it becomes NaN as well.

15. The following recursive code will cause a stack overflow if the array list is too large. How can you fix this and still retain the recursive pattern?
```
var list = readHugeList();

var nextListItem = function() {
    var item = list.pop();

    if (item) {
        // process the list item...
        nextListItem();
    }
};
```
* Answer:
```
var list = readHugeList();

var nextListItem = function() {
    var item = list.pop();

    if (item) {
        // process the list item...
        setTimeout( nextListItem, 0);
    }
};
```
* The stack overflow is eliminated because the event loop deals with the recursion instead of the call stack. The setTimeout exits the function instead of letting the queue accumulate itself. 

16. What is a “closure” in JavaScript? Provide an example.
* The function that is returned from the inside of a function, that has access to the variables in its 'lexical environment'. 
``` 
function idGenerator(){
    let start = 0; 
    return function generate() {
        start++;
        return start;
    }
}

const getNextId = idGenerator()

getNextId() => 1
getNextId() => 2
getNextId() => 3
``` 
* The closure can have access to global variables, it's outer functions inner variables, and its own variables. 

17. What would the following lines of code output to the console?
```
console.log("0 || 1 = "+(0 || 1));
console.log("1 || 2 = "+(1 || 2));
console.log("0 && 1 = "+(0 && 1));
console.log("1 && 2 = "+(1 && 2));
```
Explain your answer.

```
0 || 1 = 1
1 || 2 = 1
0 && 1 = 0
1 && 2 = 2
```
* ```||``` and ```&&``` are logical operations that are solved left to right based on booleans. 
* 0 || 1 - if only one is true, the one that is true is returned. 0 is considered to be falsy. 
* 1 || 2 - 1 is first in this expression, and since it's true than it is returned immediately. 
* 0 && 1 - both need to be true for this operation, so 0 is falsy and gets returned immediately. 
* 1 && 2 - 1 is true, so 2 is checked on and happens to be truthy as well. And it happens to be the end of the operation, so is returned. 

18. What will be the output when the following code is executed? Explain.
```
console.log(false == '0')
console.log(false === '0')
```
* Answer: 
```
true
false
```
* This is because === is deep equality, which means that the two variables in question should be each other's exact value and same type. But with ==, inherent value is compared. false and 0 are both falsy, so they return true. 

19. What is the output out of the following code? Explain your answer.
```
var a={},
    b={key:'b'},
    c={key:'c'};

a[b]=123;
a[c]=456;

console.log(a[b]);
```

* The output would be 456 because JavaScript implicitly stringifies the parameter value of a set object property. Since both b and c are objects, they become ```[object Object]```. And since ```a[c]``` is reevaluated to 456 last, that makes both b and c 456. Both b and c are ```a[object Object]```. 

20. What will the following code output to the console:
```
console.log((function f(n){return ((n > 1) ? n * f(n-1) : n)})(10));
```
Explain your answer.

* Answer: 3628800. This function is essentially a recursive function performing 10! ( ten factorial ).

21. Consider the code snippet below. What will the console output be and why?
```
(function(x) {
    return (function(y) {
        console.log(x);
    })(2)
})(1);
```

* Because the inner function is a closure, its innerds have access to x value passed in from the outer function, which is 1. So 1 is returned. 

22. What will the following code output to the console and why:
```
var hero = {
    _name: 'John Doe',
    getSecretIdentity: function (){
        return this._name;
    }
};

var stoleSecretIdentity = hero.getSecretIdentity;

console.log(stoleSecretIdentity());
console.log(hero.getSecretIdentity());
```
What is the issue with this code and how can it be fixed.

```
undefined
John Doe
```
* stoleSecretIdentity is referencing the function hero.getSecretIdentity and is called, but doesn't have access to _name in the global scope. To fix this we can use ```bind```. 
```
var stoleSecretIdentity = hero.getSecretIdentity.bind(hero);
```

23. Create a function that, given a DOM Element on the page, will visit the element itself and all of its descendents (not just its immediate children). For each element visited, the function should pass that element to a provided callback function.

The arguments to the function should be:

* a DOM element
* a callback function (that takes a DOM element as its argument)

```
function Traverse(p_element,p_callback) {
   p_callback(p_element);
   var list = p_element.children;
   for (var i = 0; i < list.length; i++) {
       Traverse(list[i],p_callback);  // recursive call
   }
}
```
* The DOM tree is a tree that can be traversed through with a Depth Search Algorithm. 

24. Testing your ```this``` knowledge in JavaScript: What is the output of the following code?
```
var length = 10;
function fn() {
	console.log(this.length);
}

var obj = {
  length: 5,
  method: function(fn) {
    fn();
    arguments[0]();
  }
};

obj.method(fn, 1);
```

* Answer is surprising: 
```
10
2
``` 
* It's not 10 and 5:  
>In the first place, as fn is passed as a parameter to the function method, the scope (this) of the function fn is window. var length = 10; is declared at the window level. >It also can be accessed as window.length or length or this.length (when this === window.)
>
>method is bound to Object obj, and obj.method is called with parameters fn and 1. Though method is accepting only one parameter, while invoking it has passed two >parameters; the first is a function callback and other is just a number.
>
>When fn() is called inside method, which was passed the function as a parameter at the global level, this.length will have access to var length = 10 (declared globally) not >length = 5 as defined in Object obj.
>
>Now, we know that we can access any number of arguments in a JavaScript function using the arguments[] array.
>
>Hence arguments[0]() is nothing but calling fn(). Inside fn now, the scope of this function becomes the arguments array, and logging the length of arguments[] will return 2.
>
>Hence the output will be as above.

25. Consider the following code. What will the output be, and why?
```
(function () {
    try {
        throw new Error();
    } catch (x) {
        var x = 1, y = 2;
        console.log(x);
    }
    console.log(x);
    console.log(y);
})();
```
```
1
undefined
2
```
* var statements are hoisted (without their value initialization) to the top of the global or function scope it belongs to, even when it’s inside a with or catch block. However, the error’s identifier is only visible inside the catch block. It is equivalent to:
```
(function () {
    var x, y; // outer and hoisted
    try {
        throw new Error();
    } catch (x /* inner */) {
        x = 1; // inner x, not the outer one
        y = 2; // there is only one y, which is in the outer scope
        console.log(x /* inner */);
    }
    console.log(x);
    console.log(y);
})();
```

26. What will be the output of this code?
```
var x = 21;
var girl = function () {
    console.log(x);
    var x = 20;
};
girl ();
```
* It returns undefined because it’s because JavaScript initialization is not hoisted. (Why doesn’t it show the global value of 21? The reason is that when the function is executed, it checks that there’s a local x variable present but doesn’t yet declare it, so it won’t look for global one.)

27. What will this code print?
```
for (let i = 0; i < 5; i++) {
  setTimeout(function() { console.log(i); }, i * 1000 );
}
```
* We get ```0 1 2 3 4``` because we used let instead of var. The i variable is only seen in for loop's block scope.

28. What do the following lines output, and why?
```
console.log(1 < 2 < 3);
console.log(3 > 2 > 1);
```
* (1 < 2 < 3) - becomes true < 3, which is true because true equates to 1.
* (3 > 2 > 1) - becomes true > 1, which translates to 1 > 1, which is false.

29. How do you add an element at the begining of an array? How do you add one at the end?

* You can use array.push(element) for the end of the array, and array.unshift(element) for the beginning. 
* Or you can use ES6 syntax with spread operator: ```['start', ...array, 'end']```

30. Imagine you have this code:
```
var a = [1, 2, 3];
```
a) Will this result in a crash?
```
a[10] = 99;
```
b) What will this output?
```
console.log(a[6]);
```

* It won't crash. Slots 3 - 9 will be empty. But ```a[6]``` will return undefined, but the slot is still empty.

31. What is the value of ```typeof undefined == typeof NULL```?

* This will return true because NULL is an undefined variable, not because NULL is null (JS is case-sensitive).

32. What would following code return?
```
console.log(typeof typeof 1);
```
* Will return string because typeof 1 is 'number', and 'number' is a string. 

33. What will be the output of the following code:
```
for (var i = 0; i < 5; i++) {
	setTimeout(function() { console.log(i); }, i * 1000 );
}
```
Explain your answer. How could the use of closures help here?

* This would return 5 five times because the loop has reach 5 before the setTimeout performs. So each function call will reference the last variable left, which is five.
* Closure can help with this by introducing each unique value that appears within its scope. 
```
for (var i = 0; i < 5; i++) {
    (function(x){
	    setTimeout(function() { console.log(i); }, i * 1000 );
    }
    )(i);
}
```

34. What is NaN? What is its type? How can you reliably test if a value is equal to NaN?
* NaN stands for Not a Number. Its type is 'number'.
A solution would either be to use value !== value, which would only produce true if the value is equal to NaN. Also, ES6 offers a new ```Number.isNaN()``` function, which is a different and more reliable than the old global isNaN() function.

35. What will the following code output and why?
```
var b = 1;
function outer(){
   	var b = 2
    function inner(){
        b++;
        var b = 3;
        console.log(b)
    }
    inner();
}
outer();
```
* The output will be three because the scope check goes from local to global, and this is an example with a closure. Since 3 is the most immediate source of the value of b, the output becomes 3. 

36. Discuss possible ways to write a ```function isInteger(x)``` that determines if ```x``` is an integer.
* ```Number.isInteger()``` is a new ES6 function that will return a boolean that determines whether x is an integer or not. The simplest way to check pre-ES6 would probably be this:
```
function isInteger(x) {(x^0) === x};
```
37. How do you clone an object?
```
var obj = {a: 1 ,b: 2}
var objclone = Object.assign({},obj);
```
