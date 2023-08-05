// Import stylesheets
import './style.css';

let button = document.getElementById('getDataAction');

let classData = [
  {
    name: 'Ram',
    id: '12A',
    marks: 56,
    class: 12,
  },
  {
    name: 'Ramesh',
    id: '12B',
    marks: 67,
    class: 12,
  },
  {
    name: 'Hari',
    id: '12C',
    marks: 78,
    class: 12,
  },
  {
    name: 'John',
    id: '12D',
    marks: 45,
    class: 12,
  },
  {
    name: 'Mohammad',
    id: '12E',
    marks: 57,
    class: 11,
  },
];

button.addEventListener('click', getData);

function getData() {
  document.getElementById('contain').innerHTML = '<p>Loading...</p>';
  mockData().then((classData) => {
    console.log(classData);
    createHTML(classData);
  });
}

function createHTML(classData) {
  let boxHtml = ``;
  classData.forEach((classValue) => {
    boxHtml =
      boxHtml +
      `<div class="box ${classValue.marks >= 60 ? 'box-green' : 'box-red'}">
    <p>${classValue.name}<p>
    <p>${classValue.id}<p>
    <p>${classValue.marks}<p>
    </div>`;
  });

  document.getElementById('contain').innerHTML = boxHtml;
}

function mockData() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(classData);
    }, 3000);
  });
}

document.getElementById('showBookData').addEventListener('click', showBookData);
document
  .getElementById('showBookDistributionData')
  .addEventListener('click', showBookDistributionData);

class Book {
  constructor(name, cost, author) {
    this.name = name;
    this.cost = cost;
    this.author = author;
  }

  getDeatilsOfThebook() {
    return `The name of the book is ${this.name} whose cost is Rs${this.cost} and whose author is ${this.author}`;
  }

  showBookData(trigger = 'book') {
    document.getElementById('projectData').innerHTML = `<p style="color:${
      trigger == 'bookDistribution' ? 'blue' : 'green'
    }">${this.getDeatilsOfThebook()}</p>`;
  }
}

class BookDistribution extends Book {
  constructor(name, cost, author, priceMargin, market, shops) {
    super(name, cost, author);
    this.priceMargin = priceMargin;
    this.market = market;
    this.shops = shops;
  }

  getDestributionDetails() {
    document.getElementById(
      'projectData'
    ).innerHTML = `<p style="color:red">The price margin of the books will be ${this.priceMargin} and we will target the ${this.market} market</p>`;
  }

  getShopDetails() {
    console.log('9876');
    let shopList = ``;
    this.shops.forEach((shop) => {
      shopList = shopList + `<li style="color:green">${shop}</li>`;
    });
    let shops = `<ul>${shopList}</ul>`;
    document.getElementById('projectData').innerHTML = shops;
  }
}

let book = new Book('Abhishek FE', 300, 'Abhishek');
let bookDistribution = new BookDistribution(
  'Justin`s football',
  700,
  'Justin sam',
  250,
  'Kr',
  ['Ramanna book shop', 'Priya press', 'Happy book shop']
);

function showBookData() {
  book.showBookData();
}

function showBookDistributionData() {
  bookDistribution.getDestributionDetails();
  setTimeout(() => {
    bookDistribution.getShopDetails();
  }, 3000);
  setTimeout(() => {
    bookDistribution.showBookData('bookDistribution');
  }, 6000);
}

let items = [
  {
    name: 'Fruits',
    price: 700,
  },
  {
    name: 'Vegetables',
    price: 200,
  },
  {
    name: 'Electronics',
    price: 2000,
  },
  {
    name: 'Junk',
    price: 12,
  },
  {
    name: 'shirts',
    price: 1200,
  },
];

let people = [
  {
    name: 'Alfred',
    age: 20,
  },
  {
    name: 'Mary',
    age: 20,
  },
  {
    name: 'Ruhi',
    age: 30,
  },
  {
    name: 'Tanya',
    age: 42,
  },
  {
    name: 'Biswa',
    age: 42,
  },
];

// {
//   20 : ['Alfred','Mary'],
//   30:['Ruhi'],
//   42:['Biswa,'Tanya']
// }

document.getElementById('reduceFn').addEventListener('click', showShoppingData);
document.getElementById('reduceGrp').addEventListener('click', groupByAge);

function showShoppingData() {
  let totalSum = 0;
  // items.forEach((item) => {
  //   totalSum = totalSum + item.price;
  // });

  // Reduce method takes all values from an array and then transforms it to one single value as per business logic
  // The reduce method takes in two parameters 1) call back functions , 2) starting point (total sum)
  // The call back function takes in 2 different parameters 1) accumulator --> The data to which we want the array to be reduced to. 2) each individual item that is iterated through the array.
  // Initial value of total is the starting point(total sum) . With every return the value of total is updated with the last calcluated value

  totalSum = items.reduce((total, item) => {
    //console.log('total ' + total + ' item  ' + item.price);
    return total + item.price;
  }, 100);

  document.getElementById(
    'projectData'
  ).innerHTML = `<p style="color:darkmagenta"> Total price of items ${totalSum}</p>`;
}

function groupByAge() {
  let groupedData = people.reduce((peopleGrp, item) => {
    if (peopleGrp[item.age]) {
      peopleGrp[item.age].push(item.name);
    } else {
      peopleGrp[item.age] = [item.name];
    }
    return peopleGrp;
  }, {});

  document.getElementById(
    'projectData'
  ).innerHTML = `<p style="color:teal"> Total price of items ${JSON.stringify(
    groupedData
  )}</p>`;
}

// Promise.all (Static method)
// Promise.all takes in an array of promises . It returns 1 single promise as a result of resolving of all the promises.
// Promise.all rejects if any of the promise is rejected

let p1 = Promise.resolve('I am awesome');
let p2 = new Promise((res, rej) => {
  setTimeout(() => {
    let totalItem = 0;
    totalItem = [3, 4, 5, 6, 7].reduce((total, item) => {
      return total + item;
    }, 0);
    res(totalItem);
  }, 2000);
});

let p3 = Promise.reject(new Error('p2_immediate_rejection'));
let p3 = Promise.resolve(93277823);

document.getElementById('prom').addEventListener('click', () => {
  Promise.all([p1, p2, p3])
    .then((data) => {
      document.getElementById(
        'projectData'
      ).innerHTML = `<p style="color:darkgreen"> Total price of items ${data}</p>`;
    })
    .catch((err) => {
      document.getElementById(
        'projectData'
      ).innerHTML = `<p style="color:darkgreen"> Total price of items ${err}</p>`;
    });
});
