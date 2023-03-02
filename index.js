console.log('Hello')

// String to DOM element Function
function stringToDom(string){
    let div = document.createElement('div')
    div.innerHTML = string
    return div.firstElementChild;
}

// Define key value varuiable starts from 1
let key = 1;
let value = 1;

// default view
document.querySelector('#customParameterBox').style.display = 'none'
document.querySelector('#jsonBox').style.display = 'none'

// if user click json then hide custom parameter
let json = document.querySelector('#json')

json.addEventListener('click', ()=>{
    document.querySelector('#customParameterBox').style.display = 'none'
    document.querySelector('#jsonBox').style.display = 'flex'
})
// if user click jscustom parameters then hide json box
let cusParam = document.querySelector('#cusParam')
cusParam.addEventListener('click',()=>{
    document.querySelector('#customParameterBox').style.display = 'flex'
    document.querySelector('#jsonBox').style.display = 'none'
})

// if user click + button then add new key value pairs for custom parameters
let params = document.querySelector('.params')
let addParameters = document.querySelector('#addParameters')
addParameters.addEventListener('click', ()=>{
    let string = `<div class="col-md-13 row my-1">
                    <div class="col-md-4">
                        <div class="input-group has-validation">
                            <span class="input-group-text" id="inputGroupPrepend">Key ${key+ 1}</span>
                            <input type="text" class="form-control" id="key${key+1}" aria-describedby="inputGroupPrepend">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="input-group has-validation">
                            <span class="input-group-text" id="inputGroupPrepend">Value ${value+1}</span>
                            <input type="text" class="form-control" id="value${value+1}" aria-describedby="inputGroupPrepend">
                        </div>
                    </div>
                    <div class="col-sm-2">
                        <button class="btn btn-primary delParameters">-</button>
                    </div>
                </div>`
    // console.log(stringToDom(string))
    params.appendChild(stringToDom(string))
    key++;
    value++;
    // if user click - button then delete this specific key value pairs
    let allCustomPara = document.querySelectorAll('.delParameters')
    // console.log(allCustomPara)
    for (const item of allCustomPara) {
        item.addEventListener('click', (e)=>{
            e.target.parentElement.parentElement.remove()
        })
    }
})


// if user click submit button 
let submit = document.querySelector('#submit')
submit.addEventListener('click', ()=>{
    document.querySelector('#responseText').innerHTML = 'Fetching Your Response... Please Wait ⏳⏳'
    let url = document.querySelector('#urlText').value
    let requestType = document.querySelector('input[name="requestType"]:checked').value
    let contenetType = document.querySelector('input[name="contenetType"]:checked').value
    let data = {}
    let demoData = {} // this is for stringyfy
    if(contenetType === 'JSON'){
        data = document.querySelector('#jsonText').value
    }
    else{
        for(let i = 0; i <key; i++){
            let keyValue = document.querySelector('#key'+(i+1)).value
            let valueVal = document.querySelector('#value'+(i+1)).value
            demoData[keyValue] = valueVal
        }
        data = JSON.stringify(demoData)
    }
    // console.log(url)
    // console.log(requestType)
    // console.log(contenetType)
    // console.log(data)

    if(requestType === 'GET'){
        fetch(url, {
            method: requestType,
        }).then(response=>response.text()).then(text=>{
            document.querySelector('#responseText').innerHTML = text
            prism.highlightAll();
        })
    }
    else{
        fetch(url, {
            method: requestType,
            body: data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }).then(response=>response.text()).then(text=>{
            document.querySelector('#responseText').innerHTML = text
            Prism.highlightAll();
        })
    }
})