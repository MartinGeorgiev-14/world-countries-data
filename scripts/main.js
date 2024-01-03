import * as countries from "./countries.js"

const countNumSpan = document.getElementById("num-countries")
const populationButton = document.getElementById("population-button")
const languagesButton = document.getElementById("languages-button")
const infoContainer = document.getElementById("info-container")

populationButton.onclick = displayPopulation
languagesButton.onclick = displayLanguages

countNumSpan.innerHTML = countries.countries_data.length

function displayPopulation() {
    displayInfo("Top 10 most populated countries", getMostPopulatedCountries(countries.countries_data))
}

function displayLanguages(){
  // I've made this that way because i got pissed off and i wanted to be done!!!
  // I've made this that way because i got pissed off and i wanted to be done!!!
  // I've made this that way because i got pissed off and i wanted to be done!!!
    const langs = mostSpokenLanguages(countries.countries_data)
    const top1 = langs[0]
    const key = Object.keys(top1)
    const highest = langs[0][key]
   
    removeChildNodes(infoContainer)

    const titleInfo = document.getElementById("title-info")
    langs.forEach((element, index) => {
      const langsArr = Object.getOwnPropertyNames(element)

      const li = document.createElement("li")
      const titleP = document.createElement("p")
      const progressBar = document.createElement("div")
      const progress = document.createElement("div")
      const statP = document.createElement("p")

      progressBar.classList.add("progress")
    
      titleP.innerHTML = langsArr[0]
      statP.innerHTML = element[langsArr[0]]
      progress.style.width = calculatePercantage(element[langsArr[0]], highest) + "%"

      infoContainer.append(li)
      li.append(titleP)
      li.append(progressBar)
      progressBar.append(progress)
      li.append(statP)
    })

    titleInfo.innerHTML = "Top 10 most spoken languages"
}

function displayInfo(text, result){
    removeChildNodes(infoContainer)

    const titleInfo = document.getElementById("title-info")
    console.log(result)
    result.forEach(element => {
      const li = document.createElement("li")
      const titleP = document.createElement("p")
      const progressBar = document.createElement("div")
      const progress = document.createElement("div")
      const statP = document.createElement("p")

      progressBar.classList.add("progress")
    
      titleP.innerHTML = element.name
      statP.innerHTML = element.population
      progress.style.width = calculatePercantage(element.population, result[0].population) + "%"

      infoContainer.append(li)
      li.append(titleP)
      li.append(progressBar)
      progressBar.append(progress)
      li.append(statP)
    })

    titleInfo.innerHTML = text

}


function getMostPopulatedCountries(countries, number = 11){
    const totalPopulation = countries.reduce((accomulator, current) => accomulator + current.population, 0)
    const thisCountries = [...countries]

    thisCountries.push({name: "World", population: totalPopulation})

    return thisCountries.sort((a, b) => b.population - a.population).slice(0,11)
}

function calculatePercantage(value, total){
  return (value / total) * 100
}

function mostSpokenLanguages(array, number){
    const store = [] //array to store all language:number
    //Iterating over each country's languages
    array.forEach(element => {
      //setting variable with all language's of a country
      const languages = element.languages
      //Iterating over each language 
      languages.forEach(lang => {
        //setts first language beacause the store array is empty
        if(store.length === 0){
          store.push({[lang]: 1})
        }
        //Iterating over each element in store array
        for(let i = 0; i < store.length; i++){
          //Checks every element if language is set
          if(store[i][lang] !== undefined){
            store[i][lang] += 1
            //Increments value of language if found
            break;
          }
          //It gets here when the whole array is circled and is not found matchind language
          //Creates new element object with key language and value set to 1
          if(i === store.length - 1){
            store.push({[lang]: 1})
          }
        }
      })
      
    })
    //Sort the store array by descending
    const sortedStore = store.sort((a,b) => {
      return Object.values(b)[0] - Object.values(a)[0]
    }).slice(0,10)
    
    return sortedStore
}

function removeChildNodes(element){
  while(element.firstChild)
  {  
      element.removeChild(element.firstChild);
  }
}