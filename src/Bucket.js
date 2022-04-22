import $ from './helper';

export default class Bucket {
  constructor() {
    this.itemList = [];
    this.nameList = [];
    this.totalSum = 0;
  }

  addToItemList(item) {
    this.itemList.push(item);
  }

  addToNameList(name) {
    this.nameList.push(name);
  }

  lookup(name) {
    return this.nameList.includes(name);
  }

  setTotalSum() {
    const itemListSum = this.itemList.map(({ price, quantity }) => price * quantity).reduce((acc, cur) => acc + cur, 0);
    this.totalSum = itemListSum;
    $('.totalprice').textContent = this.totalSum.toLocaleString('ko-KR') + '원';
  }

  handleDeleteButton(target) {
    const targetName = target.parentNode.dataset.name;
    const updatedItemList = this.itemList.filter(({ name }) => name !== targetName);
    const updatedNameList = this.nameList.filter((name) => name !== targetName);
    this.itemList = updatedItemList;
    this.nameList = updatedNameList;
  }

  handleOrderBtn() {
    $('.modal').classList.remove('hide');
  }

  singleItemTemplate(name, quantity, price) {
    return `
      <li data-name=${name}>
        <span>${name}</span>
        <input type="number" value=${quantity}>
        <span>${price.toLocaleString('ko-KR')}</span>
        <button class="delete">X</button>
      </li>
    `;
  }

  renderList() {
    $('.bucket__list').replaceChildren();
    $('.bucket__list').insertAdjacentHTML(
      'beforeend',
      this.itemList.map(({ name, quantity, price }) => this.singleItemTemplate(name, quantity, price)).join(''),
    );
  }

  commitChange() {
    this.setTotalSum();
    this.renderList();
  }

  reset() {
    this.itemList = [];
    this.nameList = [];
    this.totalSum = 0;
  }
}