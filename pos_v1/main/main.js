'use strict';

function printReceipt(inputs) {

  mergeSame(inputs);
  let itemName = [];
  for (let item of mergeSame(inputs)) {
    for (let element of loadAllItems()) {
      if (item.key === element.barcode) {
        itemName.push(Object.assign(element, item));
      }
    }
  }

  let data = stitchingData(itemName);

  console.log(data);
}

function mergeSame(inputs) {
  let sameItems = [];
  for (let input of inputs) {
    let inputToSplit = input.split("-");
    let barCode = inputToSplit[0];
    let count;

    if (Number(inputToSplit[1])) {
      count = Number(inputToSplit[1]);
    } else {
      count = 1;
    }
    let sameItem = sameItems.find(item => item.key === barCode);
    if (sameItem) {
      if (Number(inputToSplit[1])) {
        sameItem.count += Number(inputToSplit[1])
      } else {
        sameItem.count++
      }
    } else {
      sameItems.push({key: barCode, count: count})
    }
  }

  return sameItems;
}

function  stitchingData (itemName) {
  let html_HEAD = `***<没钱赚商店>收据***\n`;
  let html_MIDDLE = `----------------------\n`;
  let html_TAIL = `**********************`;

  let html = "";
  let all = 0;
  let save = 0;
  for (let elem of itemName) {
    let unitPrice = elem.count % 1 === 0 ? parseFloat(elem.price).toFixed(2) * (elem.count - 1) : parseFloat(elem.price).toFixed(2) * elem.count;
    html += `名称：${elem.name}，数量：${elem.count}${elem.unit}，单价：${parseFloat(elem.price).toFixed(2)}(元)，小计：${parseFloat(unitPrice).toFixed(2)}(元)\n`;
    all += Number(unitPrice);
    save += Number(elem.count % 1 === 0 ? parseFloat(elem.price).toFixed(2) : 0);
  }
  let html_all = `总计：${parseFloat(all).toFixed(2)}(元)\n`
  let html_save = `节省：${parseFloat(save).toFixed(2)}(元)\n`;

  let data = html_HEAD + html + html_MIDDLE + html_all + html_save + html_TAIL;

  return data;
}
