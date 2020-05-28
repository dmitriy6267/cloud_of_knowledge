
let request = new XMLHttpRequest();
request.open('POST', 'http://krapipl.imumk.ru:8082/api/mobilev1/update', true);
request.send({'data':''});

let array = [];

document.addEventListener('click', (e) => {
  if (e.target.className === 'menu__row' || e.target.className === 'menu') {
    document.getElementById('popup').classList.toggle('menu__popup--show');
  } else {
    document.getElementById('popup').classList.remove('menu__popup--show');
  }
})

request.addEventListener("readystatechange", () => { 
  if (request.readyState === 4 && request.status === 200) {
    array = JSON.parse(request.response).items;
    document.getElementById('loader').style.display = "none";
    document.getElementById('list').style.display = "flex";
    createList(array);
  }
});

const createList = (arr) => {
    console.log(arr);
  for (let i=0; i<arr.length; i++) {
    document.getElementById('list').innerHTML += `<div class="item">
                        <div class="item__img" style="background-image: url(https://www.imumk.ru/svc/coursecover/${arr[i].courseId})">
                        </div>
                        <div class="item__info">
                          <p class="item__title">${arr[i].subject}</p>
                          <p class="item__grade">${createGrade(arr[i].grade)}</p>
                          <p class="item__genre">${arr[i].genre}</p>
                          <p class="item__details">
                            <a href="#">Подробнее</a>
                          </p>
                          <p class="item__price">
                            <a href="#" id="price">${arr[i].price}</a>
                          </p>
                        </div>
                      </div>`
  }
  document.getElementById('price-mode').addEventListener('click', (e) => {
    let price = document.querySelectorAll('.item__price');
    if (e.target.checked) {
      for (let i=0; i<price.length; i++) {
        price[i].innerHTML = `<a href="#" id="price">${arr[i].priceBonus}</a>`
      }
     } else {
      for (let i=0; i<price.length; i++) {
        price[i].innerHTML = `<a href="#" id="price">${arr[i].price}</a>`
      }
    }
  });
  document.getElementById('input').onkeydown = (e) => {
    console.log(e.keyCode);
    if (e.keyCode === 13) {
      search();
    };
  };
};

const createGrade = (data) => {
  let grade = `${data} класс`
  if (data.indexOf(';') !== -1) {
    grade = `${data.slice(0, data.indexOf(';'))}-${data.slice(data.lastIndexOf(';')+1)} классы`;
  }
  
  return grade;
}

const filter = (id) => {
if (document.getElementById(id).value.indexOf('Все') !== -1) {
  array = JSON.parse(request.response).items;
  document.getElementById('list').style.marginTop = "60px"; 
    document.getElementById('results').style.display = "none";
  createList(array);
} else {
  let secondArr = array.filter( item => {
    if (id === 'subject') {
      return item.subject === document.getElementById(id).value;
    };
    if (id === 'genre') {
      return item.genre === document.getElementById(id).value;
    };
    if (id === 'grade') {
      return item.grade.indexOf(document.getElementById(id).value) !== -1;
    }    
  });
    array = secondArr;
    console.log(array);
    document.getElementById('list').innerHTML = '';
    document.getElementById('list').style.marginTop = "0"; 
    document.getElementById('results').style.display = "block";
    createList(array);
  } 
};

const search = () => {
  let input = document.getElementById('input').value;
  if (input) {
    let searchArr = array.filter( item => {
      if (item.subject.toLowerCase().indexOf(input.toLowerCase()) !== -1) {
        console.log(item)
        return item;
      }
      if (item.genre.toLowerCase().indexOf(input.toLowerCase()) !== -1) {
        console.log(item)
        return item;
      }
      if (item.grade.indexOf(input) !== -1) {
        console.log(item)
        return item;
      }
    });
    document.getElementById('list').innerHTML = '';
    document.getElementById('list').style.marginTop = "60px"; 
    document.getElementById('results').style.display = "block";

    createList(searchArr);
  }
};