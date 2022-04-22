import '@/style/global.css';
import '@/style/index.css';
import $ from './helper';
import Item from './Item';
import Bucket from './Bucket';

const bucket = new Bucket();

// itemList 클릭
$('.list').addEventListener('click', ({ target }) => {
  if (!target.closest('.item')) return;
  handleItemClick(target.closest('.item'));
  bucket.commitChange();
});

const handleItemClick = (target) => {
  const name = $('h5', target).textContent;
  const priceText = $('span', target).textContent;
  const price = Number(priceText.replace(/원/, '').split(',').join(''));

  if (bucket.lookup(name)) {
    const updatedItem = bucket.itemList.find((item) => item.name === name);
    updatedItem.increaseQuantity();
  } else {
    const createdItem = new Item(name, price);
    bucket.addToItemList(createdItem);
    bucket.addToNameList(name);
  }
};

// 장바구니 아이템 수량 변경
$('.bucket').addEventListener('change', ({ target }) => {
  if (!target.closest('li')) return;
  handleQuantityChange({ node: target.closest('li'), quantity: target.value });
  bucket.commitChange();
});

const handleQuantityChange = ({ node, quantity }) => {
  const targetName = node.dataset.name;
  const updatedItem = bucket.itemList.find((item) => item.name === targetName);
  updatedItem.setQuantity(quantity);
};

// 장바구니 내 버튼 클릭
$('.bucket').addEventListener('click', ({ target }) => {
  target.closest('.delete') && bucket.handleDeleteButton(target);
  target.closest('.cancel') && bucket.reset();
  target.closest('.order') && bucket.handleOrderBtn();
  !target.closest('.order') && bucket.commitChange();
});

// Modal
document.addEventListener('click', ({ target }) => {
  target.closest('.yes') && handleModalBtn('submit');
  target.closest('.no') && handleModalBtn('cancel');
});

const handleModalBtn = (type) => {
  if (type === 'cancel') $('.modal').classList.add('hide');
  else if (type === 'submit') {
    $('.content').replaceChildren();
    $('.content').textContent = '햄식이를 도와줘서 고마워요';
  }
};
