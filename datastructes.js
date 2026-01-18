
class datastructes {

    arrayOperations() {

        const arr = [];
        arr.push("Rajesh", "Dumbu", "Bhagya", "Rajesh",  "Kukka", "Bhagya");
        console.log(arr);
        const arr2 = [];
        arr2.push(10, 20, 30, 40, 50);
        console.log(arr2);
        console.log(arr.length);

        arr.pop();
        console.log(arr);
        const double = arr2.map(x => x * 2);
        console.log(double);
        const total = arr2.reduce((sum, x) => sum + x, 0);
        console.log(total);
        const total2 = double.reduce((sum, x) => sum + x, 0);
        console.log(total2)
        const prices = ["$10", "$20", "$30"]
        const numbers = prices.map(p => Number(p.replace("$", "")));
        const totalprice = numbers.reduce((sum, x) => sum + x, 0);
        console.log(totalprice)
        const newarray = arr.filter(p => p.includes("Rajesh"));
        console.log(newarray);

    }

    setOperations() {

        const array = new Set();
        array.add("Rajesh");
        array.add("Bhagya");
        array.add("kukka");
        array.add("Rajesh");
        array.add("dumbu");
        const setsize = array.size;
        console.log(setsize);
        const newset = new Set(array);
        console.log(newset);
        array.delete("Bhagya");
        console.log(array)

        const bool = array.clear();
        console.log(bool)

    }

    objectOperartions() {

        const user = {
            age: 24,
            name: "Rajesh",
            salary: 50000,
            cgpa: 9.0

        }

        console.log(user.age);
        console.log(user.salary);

    }

    mapOperations() {

        const newmap = new Map();
        newmap.set("Name", "Rajesh");
        newmap.set("Age", 24);
        newmap.set("CGPA", 9.0);
        console.log(newmap.get("CGPA"));
        console.log(newmap.has("salary"));
        console.log(newmap.size);
        newmap.delete("Age");
        console.log(newmap);
        newmap.clear();
        console.log(newmap);

    }


}

const datastrcures = new datastructes();

datastrcures.arrayOperations();
datastrcures.setOperations();
datastrcures.objectOperartions();
datastrcures.mapOperations();


