let container = document.querySelector(".container");
function setCard(info = {}) {
    let div = document.createElement("div");
    div.className = "cat";
    div.id = `cat_${info.id}`;
    div.innerHTML = `
        <div class="img" style="background-image: url(${info.img_link || 'img/cat.png'})"></div>
        <div class="name">${info.name || "Ilya"}</div>
        <div class="rate">${info.rate || 0}</div>
    `;
    
    div.addEventListener("click", function(e) {
        window.location.replace(`cat.html#${info.id}`);
    });
    container.append(div);
}

let path = {
    getAll: "http://sb-cats.herokuapp.com/api/2/skillch/show",
    getOne: "http://sb-cats.herokuapp.com/api/2/skillch/show/",
    getId: "http://sb-cats.herokuapp.com/api/2/skillch/ids",
    add: "http://sb-cats.herokuapp.com/api/2/skillch/add",
    upd: "http://sb-cats.herokuapp.com/api/2/skillch/update/",
    del: "http://sb-cats.herokuapp.com/api/2/skillch/delete/"
}
let cats = storage.getItem("cats");
if (!cats) {
    fetch(path.getAll)
        .then(res => res.json())
        .then(result => {
            console.log(result);
            if (result.data) {
                storage.setItem("cats", JSON.stringify(result.data));
                result.data.forEach(cat => {
                    setCard(cat);
                });
            }
        });
} else {
    JSON.parse(cats).forEach(cat => {
        setCard(cat);
    });
}




let catBlocks = document.querySelectorAll(".cat>.name");
catBlocks.forEach(name => {
    name.addEventListener("click", function(e) {
        e.stopPropagation();
        name.parentElement.remove();
        let id = +name.parentElement.id.split("_")[1];
        console.log(id);
        let obj = JSON.parse(cats);

        let index = obj.findIndex((el, i) => el.id === id);
        obj.splice(index, 1);
        console.log(obj);
        storage.setItem("cats", JSON.stringify(obj));
    });
});
