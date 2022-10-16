const users = [
  { name: "Zelito 0", id: "0" },
  { name: "Zelito 1", id: "1" },
  { name: "Zelito 2", id: "2" },
  { name: "Zelito 3", id: "3" },
  { name: "Zelito 4", id: "4" },
  { name: "Zelito 5", id: "5" },
  { name: "Zelito 6", id: "6" },
  { name: "Zelito 7", id: "7" },
  { name: "Zelito 8", id: "8" },
  { name: "Zelito 9", id: "9" },
  { name: "Zelito 10", id: "10" },
  { name: "Zelito 11", id: "11" },
  { name: "Zelito 12", id: "12" },
  { name: "Zelito 13", id: "13" },
  { name: "Zelito 14", id: "14" },
  { name: "Zelito 15", id: "15" },
];

function myFunction(page = 0, limit = 4) {
  let startIndex = page;
  let lastIndex = limit;

  return function () {
    return {
      records: users.slice(
        startIndex * lastIndex,
        lastIndex * (startIndex + 1)
      ),
      next: ++startIndex
    };
  }
}

const getRecords = myFunction();

console.log(getRecords());
console.log(getRecords());
console.log(getRecords());
console.log(getRecords()); 