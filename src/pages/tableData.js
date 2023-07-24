import d from "./SLAByCategory.json";
const allData = d.data

const subTableData = [{"id":21,"productCategory":"ბისკვიტი/ ზეფირი","orders":17,"orderedQuantity":574,"orderedAmount":6023,"slaByQuantity":93.76,"slaByAmount":93.76,"inTimeOrders":93.76},{"id":85,"productCategory":"შავი ჩაი","orders":5,"orderedQuantity":137,"orderedAmount":1573,"slaByQuantity":80,"slaByAmount":80,"inTimeOrders":80},{"id":20,"productCategory":"შამპუნი/ ბალზამი/ კონდიციონერი","orders":4,"orderedQuantity":208,"orderedAmount":2172,"slaByQuantity":100,"slaByAmount":100,"inTimeOrders":100},{"id":5,"productCategory":"სარეცხი სითხე","orders":12,"orderedQuantity":454,"orderedAmount":4562,"slaByQuantity":96.5,"slaByAmount":96.5,"inTimeOrders":96.5},{"id":81,"productCategory":"ქართული მდნარი ყველი","orders":11,"orderedQuantity":330,"orderedAmount":3721,"slaByQuantity":99.55,"slaByAmount":99.55,"inTimeOrders":99.55},{"id":58,"productCategory":"ტორტი/ ნამცხვარი","orders":11,"orderedQuantity":374,"orderedAmount":3588,"slaByQuantity":100,"slaByAmount":100,"inTimeOrders":100},{"id":20,"productCategory":"შამპუნი/ ბალზამი/ კონდიციონერი","orders":4,"orderedQuantity":208,"orderedAmount":2172,"slaByQuantity":100,"slaByAmount":100,"inTimeOrders":100},{"id":133,"productCategory":"შოკოლადის ბატონი","orders":21,"orderedQuantity":699,"orderedAmount":7292,"slaByQuantity":97.33,"slaByAmount":97.33,"inTimeOrders":97.33},{"id":19,"productCategory":"ჟურნალ-გაზეთები","orders":4,"orderedQuantity":184,"orderedAmount":922,"slaByQuantity":100,"slaByAmount":100,"inTimeOrders":100}]


let x = allData.map(obj => ({...obj, subRows:[...subTableData]}))


let allExpData = x.map(obj => {
    return {...obj, subRows: obj.subRows.map(obj => ({...obj, subRows:[...subTableData]}))}
})


export {allData, subTableData, allExpData}