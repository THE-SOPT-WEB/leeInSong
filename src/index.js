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
