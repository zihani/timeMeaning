
// 基于 indexedDB 封装的库
// https://github.com/xmoyking/localForage-cn
import localforage from 'localforage'
//创建一个 indexedDB
const myIndexedDB = localforage.createInstance({
    name: 'myIndexedDB',
})
export function setStorage(key,value) {
     myIndexedDB.setItem(key, value)
}
export async function getStorage(key) {
    try {
    const value = await myIndexedDB.getItem(key);
    return value
    } catch (err) {
        console.log(err);
    }
}

/**
 * set value
 */

/**
 * 取值
   由于是异步的 建议使用promise.then() 或 async/await 去读值
 */

// myIndexedDB.getItem('somekey').then(function (value) {
//     // we got our value
// }).catch(function (err) {
// // we got an error
// });
// // OR async /await 获取
// try {
//     const value = await myIndexedDB.getItem('somekey');
//     // This code runs once the value has been loaded
//     // from the offline store.
//     console.log(value);
// } catch (err) {
//     // This code runs if there were any errors.
//     console.log(err);
// }