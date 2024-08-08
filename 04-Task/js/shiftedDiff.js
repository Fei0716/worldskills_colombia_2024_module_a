/**
 * Write a function that receives two strings and returns the number of characters we would need to rotate the first string forward to match the second.
 *
 * @param {String} first
 * @param {String} second
 * @return {Number}
 */


document.addEventListener('DOMContentLoaded' , function(){

    document.querySelector('#calc').addEventListener('click',function() {
        let result = shiftedDiff(document.querySelector('#string1').value, document.querySelector('#string2').value);
        document.querySelector('#message').innerHTML = result.toString();
    });
    function shiftedDiff(first, second) {
        /* Work here */
        if (first.length !== second.length) return -1;
        let rotatedFirst = first;
        let result = 0;
        let temp = rotatedFirst.split('');
        for(let i = 0; i < first.length; i++){
            if(temp.join('') === second){
                return result;
            }
            temp.unshift(temp.pop());
            result++;
        }
        return -1;
    }
})

