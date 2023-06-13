function load_from_options(){
    
    let request = new XMLHttpRequest();
    request.open("GET", 'https://api.exchangerate-api.com/v4/latest/USD');
    request.send();

    request.onload = () =>{
        if(request.status === 200){
            const objec = JSON.parse(request.response);

            for (const[key, values] of Object.entries(objec.rates)){
                let option = new Option(key, key);

                const select = document.getElementById("fc");
                select.appendChild(option, undefined);
            }
        } else {
            console.log('fail')
        }
    }
}

function load_to_options(){

    let from = document.getElementById("fc").value;
    
    let request = new XMLHttpRequest();
    request.open("GET", 'https://api.exchangerate-api.com/v4/latest/' + from);
    request.send();

    request.onload = () =>{
        if(request.status === 200){
            const objec = JSON.parse(request.response);

            for (const[key, values] of Object.entries(objec.rates)){
                let option = new Option(key, key);

                const select = document.getElementById("tc");
                select.appendChild(option, undefined);
            }
        } else {
            console.log('fail');
        }
    }
}

function calc(form){

    let from = form.fcurrency.value;
    let to = form.tcurrency.value;
    let initial_amount = form.amount.value;
    initial_amount = parseInt(initial_amount.substring(1))

    let final_amount = 0;

    let request = new XMLHttpRequest();
    request.open("GET", 'https://api.exchangerate-api.com/v4/latest/' + from);
    request.send();

    request.onload = () => {
        if(request.status === 200){
            const objec = JSON.parse(request.response);
            final_amount = objec.rates[to] * initial_amount;
            document.getElementById('output').innerHTML = "$" + final_amount.toFixed(2);

        } else {
            console.log('fail');
        }
    }   
}

function eval(form){
    
    let from = document.getElementById('fc').value;
    let to = document.getElementById('tc').value;

    if (from == 0 || to == 0){
        alert("Please make sure to select currencies in both boxes");
    } else {
        calc(form);
    }
}