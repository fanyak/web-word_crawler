const fetch = require("node-fetch");
const fs = require('fs');


/////////////////// GET the WORDS ////////////////////
// fs.appendFile('words.txt', '', function (err) {
//     if (err) throw err;
// });

// async function run() {
//     for(y=1999; y<=2012; y++){
//         for(m = 1; m<13; m++) {
//             for (d = 1; d<=31; d++) {
//                 const url = `https://www.xwordinfo.com/JSON/AnalyzeData.aspx?date=${m}%2F${d}%2F${y}`
//                 await fetch(url)
//                 .then((response) => {
//                     if(response && response.ok) {
//                         return response.json()
//                     }
//                     throw(Error('no result'))
//                 })                
//                 .then((html) => { 
//                     if(html){
//                         input_content = html.DistByLenTable
//                         input_content.replace(/[^<]*(<a href="([^"]+)">([^<]+)<\/a>)/g, function () {
//                             [word] = Array.prototype.slice.call(arguments, 3, 4)
//                             return fs.appendFile('words.txt', `${word}\n`, function (err) {
//                                 if (err) throw err;
//                               });            
//                         })
//                     }
//                 })
//                 .catch((err) => console.log(err))
//             }
//         }
//     }

// }




// data = fs.readFile('nyt_vocab_raw.txt', 'utf8' , (err, data) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     const words=data.split('\n');
//    run(words);
//   })
  
  
  
  
////////////////// GET THE CLUES /////////////////////////////////////  
/*
data = fs.readFile('..\\DAT256x\\crossword\\data\\labels.txt', 'utf8' , (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      
      const words = data.split('\r\n').map(wrd => wrd.split(' ').join(''))
      run(words);
    })  
  
  
async function run(words) {
      words_s = Array.from(new Set(words))
      console.log(words_s.length);
      dict = {};
      options = {'headers': {
                  'Cookie': 'ASP.NET_SessionId=chwci4f2w4lfcjcuxth0ygoe; ARRAffinity=50934412a88233855965ccac10162da4b96016167c1fdeba6213b706787e7de1; WAWebSiteSID=00e96cb1619b4fc499d45e07a7f038c9; PagesLeft=4'
                  }
               };
      // 36435
      //42758
      for(i=0; i<words_s.length; i++) {
          const word = words_s[i];
          if(!dict[word]) {
            if(word == 'STRIKEGOLD'){
              break;
            }
            const url = `https://www.xwordinfo.com/Finder?word=${word}`;
            await fetch(url, options)
            .then(response => response.text())
            .then(result => {
              try{
                indx = result.indexOf('score:');
                console.log(indx)
                const [date] = result.substring(indx, indx+1000).match(/(<td><a (.\s?)+)(<td class="grid">)/g);
                console.log(date);
                latest = (date.match(/,\s+(\d{4})/)[1]);
                const re = /((<td class="grid">)(.)+(<td>))(\w\s?)+(<span class='repeats'>)?/g;
                found  = result.match(re).map((txt) => txt.split('</td><td>')[1].split(" <span class='repeats'>")[0] );
                set = new Set(found);
                console.log(set);
                dict[word] = {latest_date: latest, clues: Array.from(set)};
                console.log(word);
                console.log(i)
                } catch(err) {
                throw(err);
                }
                fs.writeFile('nyt_definitions1.txt', JSON.stringify(dict), err => {
                    if (err) {
                      throw(err);
                    }
                    //file written successfully
                  })
                })
                .catch(error => console.log('error', error));
          }       
      }
}
 
*/


/////////////////// GET the GRID ////////////////////
var options = {
  'method': 'GET',
  'headers': {
    'Referer': 'https://www.xwordinfo.com/JSON/Sample1',
    'Cookie': 'PagesLeft=6; ASP.NET_SessionId=une43sadgonkglncma24bynn; ARRAffinity=50934412a88233855965ccac10162da4b96016167c1fdeba6213b706787e7de1; WAWebSiteSID=9ecbc6de82e84f30b8c8124c8a779b8f'
  }
};

async function run() {
    for(y=2010; y<=2021; y++){
       for(m = 1; m<13; m++) {
            for (d = 1; d<=31; d++) {
                const url = `https://www.xwordinfo.com/JSON/Data.aspx?date=${m}%2F${d}%2F${y}`
                 await fetch(url, options)
                 .then((response) => {
                     if(response && response.ok) {
                        return response.json()
                     }
                     throw(Error('no result'))
                 })                
                 .then((obj) => { 
                     if(obj && obj.size.rows == 15 && obj.size.cols == 15){
                             date = `${m}/${d}/${y}`
                             console.log(date)
                             grid = JSON.stringify({[date]: obj.grid})
                             return fs.appendFile('grids.txt', `${grid}\n`, 'utf8', function (err) {
                                 if (err) throw err;          
                            })
                        }
                 })
                 .catch((err) => console.log(err))
             }
       }
    }
}

run()
