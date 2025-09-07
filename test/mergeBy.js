'use strict';

QUnit.module("Тестируем функцию mergeBy", function() {
    QUnit.test("Работает правильно с одинаковыми значениями по ключу", function(assert) {
        const array1 = [
            { id: 1, name: "Alice", tags: ["friend"] },
            { id: 2, name: "Bob", tags: ["colleague"] }
        ];
        const array2 = [
            { id: 1, age: 30, tags: ["travel"] },
            { id: 3, name: "Charlie" }
        ];
        const result = mergeBy(array1, array2, "id");

        assert.deepEqual(result, [
            { id: 1, name: "Alice", tags: ["friend", "travel"], age: 30 },
            { id: 2, name: "Bob", tags: ["colleague"] },
            { id: 3, name: "Charlie" }
        ]);
    });

    QUnit.test("Работает правильно с отсутствующими ключами", function(assert) {
        const array1 = [
            { id: 1, name: "Alice" },
            { id: 2, name: "Bob" }
        ];
        const array2 = [
            { age: 30 },
            { id: 2, age: 25 }
        ];
        const result = mergeBy(array1, array2, "id");

        assert.deepEqual(result, [
            { id: 1, name: "Alice" },
            { id: 2, name: "Bob", age: 25 }
        ]);
    });

    QUnit.test("Работает правильно с одинаковыми значениями по ключу, который не является первым свойством объекта", function(assert){
        const array1=[
            { id: 1, name:"Roma",age:20,tags:["friend"] },
            { animal:"Cat", tags:["box", "cream"],age:"20"  } 
        ];
        const array2 = [
            { age: 30, tags: ["travel"] },
            { name: "Roma", tags:["friend","boxer","mma"] }
        ];
        const result = mergeBy(array1, array2, "name");
        assert.deepEqual(result, [
            { id: 1, name: "Roma", age:20,tags:["friend","boxer","mma"] },
            
        ]);
    });

    QUnit.test("Работает правильно с дубликатами в массиве", function(assert) {
        const array1 = [
            { id: 1, name: "Alice" },
            { id: 3, name: ["Bob", "Roman", "Alexander", "Sanya", "Sanek"] }
        ];
        const array2 = [
            { age: 30 , sport: "MMA"},
            { id: 3, age: 25, name:[ "Alexander", "Sanya","Nadya","Viktoria"] }
        ];
        const result = mergeBy(array1, array2, "id");

        assert.deepEqual(result, [
            { id: 1, name: "Alice" },
            { id: 3, name: ["Bob","Roman", "Alexander", "Sanya", "Sanek","Nadya","Viktoria"], age: 25 }
        ]);
    });
});
