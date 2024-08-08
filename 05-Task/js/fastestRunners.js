/**
 * @typedef {Object} Runner
 * @property {String} name
 * @property {String[]} paces
 * @typedef {Object} Result
 * @property {String} name
 * @property {String} averagePace
 * @property {String} fastestPace
 */

/**
 * @param {Runner[]} runners
 * @return {Result[]}
 */
/**
 * Write a function that receives two strings and returns the number of characters we would need to rotate the first string forward to match the second.
 *
 * @param {String} first
 * @param {String} second
 * @return {Number}
 */


document.addEventListener('DOMContentLoaded' , function(){
    let runners = getRunners();

    async function getRunners(){
        let response = await fetch('./js/runners.json');
        let data = await response.json()
        fastestRunners(data);
    }
    function fastestRunners(runners) {
        /* Work here */
        let sumAverage = 0;
        let averageAll = 0;
        let tempTotal = 0;
        let fastestPace = 0;
        let lessThanAverage= [];
        //find the average for each of the runners
        runners.forEach((r, i)=>{
            tempTotal = r.paces.reduce((total,curr ,i)=>{
               return i === 1 ? toSeconds(total)+ toSeconds(curr) : total+ toSeconds(curr);
            });
            r.totalS = tempTotal;
            r.averagePace = tempTotal / r.paces.length
            sumAverage +=  r.averagePace;
        });
        averageAll = sumAverage / runners.length;

        runners.forEach((r, i)=>{
            if(r.averagePace < averageAll){
                fastestPace = r.paces[0];
                for(let i = 1; i < r.paces.length ; i++ ){
                    if(toSeconds(r.paces[i]) < toSeconds(fastestPace)){
                        fastestPace = r.paces[i];
                    }
                }
                lessThanAverage.push({
                    "name": r.name,
                    "averagePace": toMM(r.averagePace),
                    "fastestPace": fastestPace,
                })
            }
        });
        lessThanAverage.sort((a , b)=> a.totalS  - b.totalS);
        document.querySelector('#fastest').innerHTML = "[<br>";
        lessThanAverage.forEach((a) =>{
            document.querySelector('#fastest').innerHTML += `
                {
                    ${Object.keys(a)[0]} : ${a.name},
                    ${Object.keys(a)[1]} : ${a.averagePace},
                    ${Object.keys(a)[2]} : ${a.fastestPace},
                },<br>
            `;

        });
        document.querySelector('#fastest').innerHTML += "<br>]";

    }
    function toSeconds(mm){
        let array = mm.split(':');
        return parseInt(array[0]) * 60 + parseInt(array[1]);
    }
    function toMM(s){
        return parseInt(s/60) + ':' + ( parseInt(s % 60).toString().padStart(2 , '0'));
    }
})



