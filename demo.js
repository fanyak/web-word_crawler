
const fetch = require("node-fetch");

async function run() {
    dict = {};
    options = {
        'mode': 'no-cors',
        'headers': {
        'Cookie': 'ASP.NET_SessionId=chwci4f2w4lfcjcuxth0ygoe; ARRAffinity=50934412a88233855965ccac10162da4b96016167c1fdeba6213b706787e7de1; WAWebSiteSID=00e96cb1619b4fc499d45e07a7f038c9; PagesLeft=4'
      }
    };
    // 36435
    //42758


    const url = `https://www.xwordinfo.com/Crossword?date=5/12/2021`;
    await fetch(url, options)
        .then(response => response.text())
        .then(result => {
            try {
                // indx = result.indexOf('score:');
                // console.log(indx);
                // const [date] = result.substring(indx, indx + 1000).match(/(<td><a (.\s?)+)(<td class="grid">)/g);
                // console.log(date);
                // latest = (date.match(/,\s+(\d{4})/)[1]);
                // const re = /((<td class="grid">)(.)+(<td>))(\w\s?)+(<span class='repeats'>)?/g;
                // found = result.match(re).map((txt) => txt.split('</td><td>')[1].split(" <span class='repeats'>")[0]);
                // set = new Set(found);
                // console.log(set);
                // dict[word] = { latest_date: latest, clues: Array.from(set) };
                console.log(result);
            } catch (err) {
                throw (err);
            }
            // fs.writeFile('nyt_definitions0.txt', JSON.stringify(dict), err => {
            //     if (err) {
            //     throw (err);
            //     }
            //     //file written successfully
            // })
        })
        .catch(error => console.log('error', error));
}
   
  
  run();
