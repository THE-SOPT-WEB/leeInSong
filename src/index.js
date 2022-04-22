import '@/style/global.css';
import '@/style/index.css';
import $ from './helper';

const bucket = {
  itemList: [],
  nameList: [],
  totalSum: 0,
};

class Item {
  constructor(name, price, quantity = 1) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }

  setQuantity(quantity) {
    this.quantity = quantity;
  }
}

$('.list').addEventListener('click', ({ target }) => {
  if (!target.closest('.item')) return;
  handleItemClick(target.closest('.item'));
  commitChange();
});

const handleItemClick = (target) => {
  const name = $('h5', target).textContent;
  const priceText = $('span', target).textContent;
  const price = Number(priceText.replace(/원/, '').split(',').join(''));

  if (bucket.nameList.includes(name)) {
    const updatedItem = bucket.itemList.find((item) => item.name === name);
    updatedItem.quantity++;
  } else {
    const createdItem = new Item(name, price);
    bucket.itemList.push(createdItem);
    bucket.nameList.push(name);
  }
};

const commitChange = () => {
  calculateSum();
  renderItemList();
  renderSum();
};

const renderItemList = () => {
  const itemListTemplate = bucket.itemList
    .map(({ name, quantity, price }) => itemTemplate(name, quantity, price))
    .join('');
  $('.bucket__list').replaceChildren();
  $('.bucket__list').insertAdjacentHTML('beforeend', itemListTemplate);
};

const itemTemplate = (name, quantity, price) => {
  return `
    <li data-name=${name}>
      <span>${name}</span>
      <input type="number" value=${quantity}>
      <span>${price.toLocaleString('ko-KR')}</span>
      <button class="delete">X</button>
    </li>
  `;
};

const calculateSum = () => {
  const itemListSum = bucket.itemList.map(({ price, quantity }) => price * quantity).reduce((acc, cur) => acc + cur, 0);
  bucket.totalSum = itemListSum;
};

const renderSum = () => {
  $('.totalprice').textContent = bucket.totalSum.toLocaleString('ko-KR') + '원';
};

// 장바구니 아이템 수량 변경
$('.bucket').addEventListener('change', ({ target }) => {
  if (!target.closest('li')) return;
  handleQuantityChange({ node: target.closest('li'), quantity: target.value });
  commitChange();
});

const handleQuantityChange = ({ node, quantity }) => {
  const targetName = node.dataset.name;
  const updatedItem = bucket.itemList.find((item) => item.name === targetName);
  updatedItem.setQuantity(quantity);
};

// 장바구니 내 버튼 클릭
$('.bucket').addEventListener('click', ({ target }) => {
  target.closest('.delete') && handleDeleteButton(target);
  target.closest('.cancel') && handleCancelBtn();
  target.closest('.order') && handleOrderBtn();
  !target.closest('.order') && commitChange();
});

const handleDeleteButton = (target) => {
  const targetName = target.parentNode.dataset.name;
  const updatedItemList = bucket.itemList.filter(({ name }) => name !== targetName);
  const updatedNameList = bucket.nameList.filter((name) => name !== targetName);
  bucket.itemList = updatedItemList;
  bucket.nameList = updatedNameList;
};

const handleCancelBtn = () => {
  bucket.itemList = [];
  bucket.nameList = [];
};

const handleOrderBtn = () => $('.modal').classList.remove('hide');

const handleModalBtn = (type) => {
  if (type === 'cancel') $('.modal').classList.add('hide');
  else if (type === 'submit') {
    $('.content').replaceChildren();
    $('.content').textContent = '햄식이를 도와줘서 고마워요';
  }
};

document.addEventListener('click', ({ target }) => {
  target.closest('.yes') && handleModalBtn('submit');
  target.closest('.no') && handleModalBtn('cancel');
});
