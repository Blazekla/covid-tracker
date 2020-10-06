function movingAverage(value) {
  const copyOfArray = [...value];

  const newMappedArr = copyOfArray.map((element, index) => {
    let N = 7;

    if (N > index + 1) {
      N = index + 1;
    }

    let sum = 0;
    for (let x = 0; x < N; x++) {
      // if (index === 215) {
      //   console.log("sum at x: ", x, " ", sum);
      //   console.log(
      //     "array value: ",
      //     index - x,
      //     " value of array: ",
      //     copyOfArray[index - x].positiveIncrease
      //   );
      // }
      sum += copyOfArray[index - x].positiveIncrease;
    }
    const result = Math.round(sum / N);
    // if (index === 215) {
    //   console.log("sum result: ", sum);
    // }
    // console.log("index: ", index, " result: ", result);
    return result;
  });

  // console.log("value passed: ", copyOfArray.length);
  // console.log("value changed new array: ", newMappedArr);

  return newMappedArr;
}

export default movingAverage;
