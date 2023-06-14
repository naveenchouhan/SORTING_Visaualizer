const arrayContainer = document.getElementById("array-container");
const NUM_BARS = 30;
const MAX_BAR_HEIGHT = 260;
let array = [];

function generateRandomArray() {
  array = [];
  arrayContainer.innerHTML = "";

  for (let i = 0; i < NUM_BARS; i++) {
    const height = Math.floor(Math.random() * MAX_BAR_HEIGHT) + 1;
    array.push(height);

    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${height}px`;
    arrayContainer.appendChild(bar);
  }
}

function swap(i, j) {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function bubbleSort() {
  const bars = document.getElementsByClassName("bar");
  const n = array.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      bars[j].style.backgroundColor = "rgb(61, 236, 87)";
      bars[j + 1].style.backgroundColor = "rgb(61, 236, 87)";

      if (array[j] > array[j + 1]) {
        swap(j, j + 1);
        bars[j].style.height = `${array[j]}px`;
        bars[j + 1].style.height = `${array[j + 1]}px`;
      }

      await delay(100);

      bars[j].style.backgroundColor = "rgb(31, 206, 250)";
      bars[j + 1].style.backgroundColor = "rgb(31, 206, 250)";
    }
  }
}

async function quickSort() {
  const bars = document.getElementsByClassName("bar");

  async function partition(low, high) {
    const pivot = array[high];
    let i = low - 1;

    bars[high].style.backgroundColor = "rgb(61, 236, 87)";

    for (let j = low; j < high; j++) {
      bars[j].style.backgroundColor = "rgb(61, 236, 87)";

      if (array[j] < pivot) {
        i++;
        swap(i, j);
        bars[i].style.height = `${array[i]}px`;
        bars[j].style.height = `${array[j]}px`;
      }

      await delay(100);

      bars[j].style.backgroundColor = "rgb(31, 206, 250)";
    }

    swap(i + 1, high);
    bars[i + 1].style.height = `${array[i + 1]}px`;
    bars[high].style.height = `${array[high]}px`;
    bars[high].style.backgroundColor = "rgb(31, 206, 250)";

    return i + 1;
  }

  async function quickSortHelper(low, high) {
    if (low < high) {
      const pivotIndex = await partition(low, high);
      await quickSortHelper(low, pivotIndex - 1);
      await quickSortHelper(pivotIndex + 1, high);
    }
  }

  await quickSortHelper(0, array.length - 1);
}

async function mergeSort() {
  const bars = document.getElementsByClassName("bar");

  async function merge(start, mid, end) {
    let i = start,
      j = mid + 1,
      k = start;
    const temp = array.slice();

    while (i <= mid && j <= end) {
      bars[i].style.backgroundColor = "rgb(61, 236, 87)";
      bars[j].style.backgroundColor = "rgb(61, 236, 87)";

      if (temp[i] <= temp[j]) {
        array[k] = temp[i];
        bars[k].style.height = `${array[k]}px`;
        i++;
      } else {
        array[k] = temp[j];
        bars[k].style.height = `${array[k]}px`;
        j++;
      }

      await delay(300);

      bars[i].style.backgroundColor = "rgb(31, 206, 250)";
      bars[j].style.backgroundColor = "rgb(31, 206, 250)";
      // update the bars' height with the array values
      bars[i].style.height = `${array[i]}px`;
      bars[j].style.height = `${array[j]}px`;
      k++;
    }

    while (i <= mid) {
      array[k] = temp[i];
      bars[k].style.height = `${array[k]}px`;
      i++;
      k++;
    }

    while (j <= end) {
      array[k] = temp[j];
      bars[k].style.height = `${array[k]}px`;
      j++;
      k++;
    }
  }

  async function mergeSortHelper(start, end) {
    if (start < end) {
      const mid = Math.floor((start + end) / 2);
      await mergeSortHelper(start, mid);
      await mergeSortHelper(mid + 1, end);
      await merge(start, mid, end);
    }
  }

  await mergeSortHelper(0, array.length - 1);
}

async function insertionSort() {
  const bars = document.getElementsByClassName("bar");
  const n = array.length;

  for (let i = 1; i < n; i++) {
    const key = array[i];
    let j = i - 1;

    bars[i].style.backgroundColor = "rgb(61, 236, 87)";

    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      bars[j + 1].style.height = `${array[j + 1]}px`;

      await delay(90);

      bars[j + 1].style.backgroundColor = "rgb(31, 206, 250)";

      j--;
    }

    array[j + 1] = key;

    await delay(100);

    bars[j + 1].style.height = `${key}px`;
    bars[i].style.backgroundColor = "rgb(31, 206, 250)";
  }
}

async function selectionSort() {
  const bars = document.getElementsByClassName("bar");
  const n = array.length;

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;

    bars[i].style.backgroundColor = "rgb(61, 236, 87)";

    for (let j = i + 1; j < n; j++) {
      bars[j].style.backgroundColor = "rgb(61, 236, 87)";

      if (array[j] < array[minIndex]) {
        if (minIndex !== i) {
          bars[minIndex].style.backgroundColor = "rgb(31, 206, 250)";
        }
        minIndex = j;
      } else {
        bars[j].style.backgroundColor = "rgb(31, 206, 250)";
      }

      await delay(60);
    }

    swap(i, minIndex);
    bars[i].style.height = `${array[i]}px`;
    bars[minIndex].style.height = `${array[minIndex]}px`;
    bars[i].style.backgroundColor = "rgb(31, 206, 250)";
    bars[minIndex].style.backgroundColor = "rgb(31, 206, 250)";
  }
}



