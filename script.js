const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns =document.querySelectorAll(".dropdown select");

let btn=document.querySelector("form button");

let msg=document.querySelector(".msg");

let from_Curr=document.querySelector(".from select");
let to_Curr=document.querySelector(".to select");



window.addEventListener("load",() => {
    updateExchangeRate();
})

for(let select of dropdowns){
    for(Currcode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=Currcode;
        newOption.value=Currcode;
        if(select.name==="from" && Currcode==="USD"){
            newOption.selected="selected";

        }else if(select.name==="to" && Currcode==="INR"){
            newOption.selected="selected";

        }
        select.append(newOption);

    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);

    })
}

const updateFlag = (element) => {
    let Currcode = element.value;
    let countryCode=countryList[Currcode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
};

btn.addEventListener("click",  (evt) => {
    evt.preventDefault();
    updateExchangeRate();
    
});

updateExchangeRate= async() => {
    let amount =document.querySelector(".amount input");
    let amtVal=amount.value;
    if(amtVal==="" || amtVal<1){
        amtVal=1;
        amount.value="1";
    }

    
    //const URL=`${BASE_URL}/${from_Curr.value.toLowerCase().trim()}/${to_Curr.value.toLowerCase().trim()}.json`;
    //- const URL = `${BASE_URL}/${from_Curr.value.toLowerCase().trim()}/${to_Curr.value.toLowerCase().trim()}.json`;
    const URL = `${BASE_URL}/${from_Curr.value.toLowerCase().trim()}.json`;

    let response= await fetch(URL);
    
    let data= await response.json();
    //let rate=data[to_Curr.value.toLowerCase()];
 //   - let rate = data[to_Curr.value.toLowerCase()];
    let rate = data[from_Curr.value.toLowerCase()][to_Curr.value.toLowerCase()];

    let finalAmt=(amtVal*rate).toFixed(2);
    
    msg.innerText=`${amtVal} ${from_Curr.value} = ${finalAmt} ${to_Curr.value}`
}

