import '@/style/global.css';
import '@/style/index.css';
import $ from './helper';

const bucket = {
  itemList: [],
  nameList: [],
  totalSum: 0,
};

const initialItem = {
  name: '',
  quantity: 1,
  price: 0,
};

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
    const createdItem = { ...initialItem };
    createdItem.name = name;
    createdItem.price = price;
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
      <button>X</button>
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
