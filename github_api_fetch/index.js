//pagination variable
var page = 0;
//XMLHttprequest
const getData = (page=0,num_users) => {
    btn.disabled =true;
    var request = new XMLHttpRequest();
    request.open("GET",`https://api.github.com/users?since=${ page }&per_page=12`);
    request.send();
    request.addEventListener('load',(event) =>{
        let data = JSON.parse(event.target.responseText);
        renderData(data);
    });
};

let btn = document.getElementById('btn');
let next_btn = document.getElementById('net');
let prev_btn = document.getElementById('prev_btn');



//click events
btn.addEventListener('click',function(){
        prev_btn.disabled = false;
        next_btn.disabled = false;
        btn.disabled = true;
        getData();
});
next_btn.addEventListener('click',() => {

    page += 10;
    btn.disabled = true;
    let take_data = document.getElementById('profile');
    take_data.innerHTML = "";
    getData(page);
})
prev_btn.addEventListener('click',() => {
    btn.disabled = true;

    page -= 10;
    if(page < 0){
            page+= 10;
    }
    else{
        btn.disabled = false;
        let take_data = document.getElementById('profile');
        take_data.innerHTML = "";
        getData(page);
    }

})


//GET DATA
const renderData = (data)=> {
    console.log(data);
    data.forEach((result)=> {
        let take_data = document.getElementById('profile');
        let list_item = document.createElement('list');
        let set_image = document.createElement('IMG');
        set_image.setAttribute('src',result.avatar_url);
        set_image.setAttribute('height','150px');
        set_image.setAttribute('width','150px');
        set_image.style.borderRadius = 50+"%";

        list_item.append(set_image);
        list_item.append(result.login);
        list_item.style.fontSize = 30+"px";
        take_data.appendChild(list_item);            
        });
};