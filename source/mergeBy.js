"use strict";

/**
 * Объединяет два объекта, комбинируя их свойства.
 * Если оба объекта содержат свойство с одинаковым ключом и оба значения являются массивами,
 * они объединяются в один массив без дубликатов.
 * Если свойство присутствует только в одном из объектов, оно добавляется в результат.
 * 
 * @param {Object} firstObject - Первый объект для объединения
 * @param {Object} secondObject - Второй объект для объединения
 * @returns {Object} Новый объект, содержащий объединенные свойства обоих объектов
 * 
 * @example
 * // returns { id: 1, name: "Alice", tags: ["friend", "travel"], age: 30 }
 * mergeTwoObjects(
 *   { id: 1, name: "Alice", tags: ["friend"] },
 *   { id: 1, age: 30, tags: ["travel"] }
 * );
 */
function mergeTwoObjects(firstObject, secondObject) {
    let mergedObject = {};
    
    for (let firstKey in firstObject) {
        // Если свойство есть во втором объекте и оба значения являются массивами
        if ((firstKey in secondObject) && Array.isArray(firstObject[firstKey]) && Array.isArray(secondObject[firstKey])) { 
            mergedObject[firstKey] = Array.from(new Set([...firstObject[firstKey], ...secondObject[firstKey]]));
        } else {
            mergedObject[firstKey] = firstObject[firstKey];
        }
    }  
    
    for (let secondKey in secondObject) {
        if (!(secondKey in firstObject)) {
            mergedObject[secondKey] = secondObject[secondKey];
        }
    }  
    
    return mergedObject;
}

/**
 * Объединяет два массива объектов по указанному ключу.
 * Объекты с одинаковым значением указанного ключа объединяются в один объект.
 * Объекты без совпадений по ключу добавляются в результат без изменений, при условии, что ключ есть в объекте
 * 
 * @param {Array.<Object>} firstArray - Первый массив объектов для объединения
 * @param {Array.<Object>} secondArray - Второй массив объектов для объединения
 * @param {string} key - Ключ, по которому происходит объединение объектов
 * @returns {Array.<Object>} Массив объединенных объектов
 * 
 * @example
 * // returns [
 * //   { id: 1, name: "Alice", tags: ["friend", "travel"], age: 30 },
 * //   { id: 2, name: "Bob", tags: ["colleague"] },
 * //   { id: 3, name: "Charlie" }
 * // ]
 * mergeBy(
 *   [
 *     { id: 1, name: "Alice", tags: ["friend"] },
 *     { id: 2, name: "Bob", tags: ["colleague"] }
 *   ],
 *   [
 *     { id: 1, age: 30, tags: ["travel"] },
 *     { id: 3, name: "Charlie" }
 *   ],
 *   "id"
 * );
 */
function mergeBy(firstArray, secondArray, key) {
    let mergedArray = [];
    let firstArrayCopy = [...firstArray];
    let secondArrayCopy = [...secondArray];
    let usedIndexes = new Set();
    
    for (let i = 0; i < firstArrayCopy.length; i++) {
        if (key in firstArrayCopy[i]) {
            // Флаг, указывающий, найден ли совпадающий объект во втором массиве
            let isMatch = false; 

            for (let j = 0; j < secondArrayCopy.length; j++) {
                // Пропускаем уже обработанные элементы
                if (usedIndexes.has(j)) {
                    continue;
                }

                if (key in secondArrayCopy[j]) {
                    if (firstArrayCopy[i][key] === secondArrayCopy[j][key]) {
                        // Объединяем объекты с совпадающими ключами
                        mergedArray.push(mergeTwoObjects(firstArrayCopy[i], secondArrayCopy[j]));
                        // Помечаем индекс как использованный
                        usedIndexes.add(j);
                        isMatch = true;
                        // Помечаем элемент как обработанный
                        secondArrayCopy[j] = null;
                    }
                }
            }
            
            // Если совпадение не найдено, добавляем объект из первого массива
            if (!isMatch) {
                mergedArray.push(firstArrayCopy[i]);
            }    
        }
    }
    
    // Добавляем необработанные объекты из второго массива.
    for (let j = 0; j < secondArrayCopy.length; j++) {
        //Обработанные элементы второго массива отмечены и равны null + также проверяем наличие ключа
        if (secondArrayCopy[j] !== null && key in secondArrayCopy[j]) {
            mergedArray.push(secondArrayCopy[j]);
        }
    }
    
    return mergedArray;
}