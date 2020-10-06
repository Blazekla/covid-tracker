function movingAverage(array, type) {
  const copyOfArray = [...array];
  const selectedData =
    type === "newCases" ? "positiveIncrease" : "deathIncrease";
  const newMappedArr = copyOfArray.map((element, index) => {
    let N = 7;

    if (N > index + 1) {
      N = index + 1;
    }

    let sum = 0;
    for (let x = 0; x < N; x++) {
      sum += copyOfArray[index - x][selectedData];
    }
    const result = Math.round(sum / N);
    return result;
  });

  return newMappedArr;
}

export default movingAverage;
