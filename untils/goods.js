/**
 * 
 * @param {*当前页的数量} pageSize
 * @param {*当前页} currentPage 
 * @param {*当前数组} arr 
 */
exports.pagination=function(pageSize, currentPage, arr) {
    let skipNum = (currentPage - 1) * pageSize;
    let newArr = (skipNum + pageSize >= arr.length) ? arr.slice(skipNum, arr.length) : arr.slice(skipNum, skipNum + pageSize);
    return newArr;
}
/**
 * 升序或者降序
 * @param {*排序的属性} attr 
 * @param {*true表示升序排序 false表示降序排序} rev 
 */

 exports.sortBy=function(attr, rev) {
    if (rev === undefined) {
        rev = 1;
    } else {
        rev = rev ? 1 : -1;
    }
    return function (a, b) {
        a = a[attr];
        b = b[attr];
        if (a < b) {
            return rev * -1;
        }
        if (a > b) {
            return rev * 1;
        }
        return 0;
    }
}
/**
 * 获取价格区间的商品
 * @param {*排序的数组}} arr 
 * @param {*最低价格} gt 
 * @param {*最高价格} lte 
 * @returns 
 */
exports.range=function(arr, gt, lte) {
    return arr.filter(item => item.goods_price >= gt && item.goods_price <= lte)
}
/**
 * 
 * @param {*目标数组} arr 
 * @param {*随机元素数量} count 
 * @returns 
 */
exports.getRandomArrayElements=function(arr, count) {
    var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(min);
}
/**
 * 
 * @param {对象} obj 
 * 检查
 */
exports.smallLists=function(key){
    if(key.indexOf("productImageSmall")==-1){
        return false
    }
    return true
}
