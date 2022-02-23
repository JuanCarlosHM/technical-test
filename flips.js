
'use strict';

String.prototype.replaceAt = function(index, character) {
    return this.substr(0, index) + character + this.substr((index) +character.length);
};


function transform(arr, compareTo, index, counter) 
{    
    if(arr === compareTo)
    {
        return counter;
    } 

    if(arr.charAt(index) !== compareTo.charAt(index))
    {
        counter += 1; 

        for(var i = index; i < arr.length;  i++)
        {
            if(compareTo.charAt(i) === '0')
            {
                compareTo = compareTo.replaceAt(i, '1')
            }

            else {
                compareTo = compareTo.replaceAt(i, '0')
            }
        }
    }   

    return transform(arr, compareTo, index + 1, counter);
}


function theFinalProblem(target) 
{
  // Write your code here
  if (target.length < 1 || target.length > 100000) return 0;
  let resultString = new Array(target.length + 1).join(0);
 

  return transform(target, resultString, 0, 0);
}


function linearSearch(string)
{
    string = Array.from(string);
    console.log("string", string);

    let result = 0;

    string.forEach(element =>
    {
        if (result%2 == 0)
        {
            if (element != 0) result += 1
        }

        else
        {
            if(!(element != 0)) result += 1
        }
    })

    console.log("result -->", result);
    return result;
}


function main() 
{
    console.log("final", theFinalProblem("01010111"))
    console.log("linear", linearSearch("01010111"))
}

main()
