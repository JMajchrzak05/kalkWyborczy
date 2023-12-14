const electoralName = document.querySelector("#electoralName")
const isCoalition = document.querySelector("#isCoalition")
const numberOfVotes = document.querySelector("#numberOfVotes")
const next = document.querySelector("#next")
const calc = document.querySelector("#calc")
const electoralList = document.querySelector("#electoralList")
let electoralTable = document.querySelector("#electoralTable")
const partyArr = []

next.addEventListener('click', (evt) => {
    evt.preventDefault();

    let li = document.createElement("li")
    if(isCoalition.checked){
        li.innerHTML = "<b>" + electoralName.value + "</b> jest koalicją, ilość głosów: " + numberOfVotes.value
        electoralList.appendChild(li)
    }else {
        li.innerHTML = "<b>" + electoralName.value + "</b> nie jest koalicją, ilość głosów: " + numberOfVotes.value
        electoralList.appendChild(li)
    }

    let electoralThreshold = 0
    if(isCoalition.checked){
         electoralThreshold = 8
    }else{ electoralThreshold = 5}
    


    const party = {
        electoralName: electoralName.value ,
        numberOfVotes: numberOfVotes.value , 
        electoralThreshold: electoralThreshold , 

    }
    partyArr.push(party)
    console.log(partyArr)
    partyArr.sort((a,b) => b.numberOfVotes - a.numberOfVotes)
    //bez Pana bym nie posortowal
    console.log(partyArr)
    
})

calc.addEventListener('click', evt =>{
    evt.preventDefault();
    
    electoralTable.innerHTML = ""
    let allVotes = 0
    for( i = 0; i < partyArr.length; i++ ){
         allVotes = allVotes + parseInt(partyArr[i].numberOfVotes)
    }

    let headerRow = document.createElement("tr")
    headerRow.innerHTML =          
    "<th>Miejsce</th><th>Nazwa ugrupowania</th><th>Próg wyborczy</th><th>Ilość głosów</th><th>Wynik procentowy</th>"
    electoralTable.appendChild(headerRow)
 



    for( i = 0; i < partyArr.length; i++ ){
        
        let percent = (partyArr[i].numberOfVotes / allVotes) * 100;

        let tr = document.createElement("tr")
        tr.innerHTML = 
        "<td>" + parseInt(i+1) + "</td>" + 
        "<td>" + partyArr[i].electoralName + "</td>" +
        "<td>" + partyArr[i].electoralThreshold + "%</td>" +
        "<td>" + partyArr[i].numberOfVotes + "</td>" +
        "<td>" + percent.toFixed(2) + "%</td>"
        if (percent>partyArr[i].electoralThreshold){
            tr.style.backgroundColor = "#a3ffa3"
        }else{
            tr.style.backgroundColor = "rgb(255, 161, 161)"
        }
        electoralTable.appendChild(tr)
        
    }
    console.log(allVotes)


})


