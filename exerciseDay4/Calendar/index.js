let dayOfWeek = 3;
let totalDays = 30;
let currentDay = new Date();
const dayTable = document.getElementById("daytable");

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];



const createBlankDay = () => {
  const blankDay = document.createElement("li");
  blankDay.setAttribute("class", "calendar__daynum--item blank");
  return blankDay;
};

const createNormalDayContent = (num) => {
  const li = document.createElement("p");
  li.textContent = num;
  return li;
};

const createNormalDay = (daynum, isActive = false) => {
  const normalDay = document.createElement("li");
  normalDay.setAttribute("class", "calendar__daynum--item");

  if (isActive) {
    normalDay.classList.add("active")
  } else {
    normalDay.addEventListener("mouseenter", () => {
      normalDay.classList.add("active");
    });
    normalDay.addEventListener("mouseleave", () => {
      normalDay.classList.remove("active");
    });

  }

  normalDay.appendChild(createNormalDayContent(daynum));
  return normalDay;
};

const renderDayOfMonth = (value) => {
  dayTable.innerHTML = "";
  const firstDay = new Date(value.getFullYear(), value.getMonth(), 0);
  const dow = firstDay.getDay() + 1;
  const tt = firstDay.getDate();
  for (let blank = 0; blank < dow; blank++) {
    dayTable.appendChild(createBlankDay());
  }

  for (let day = 1; day <= tt; day++) {
    dayTable.appendChild(createNormalDay(day, day === value.getDate()));
  }

  for (let blank = tt; blank <= 42; blank++) {
    dayTable.appendChild(createBlankDay());
  }
};

renderDayOfMonth(currentDay);

const handleChangeInputDay = (e) => {
  console.log(e.target.value);
  const value = new Date(e.target.value);
  // const firstDay = new Date(value.getFullYear(), value.getMonth(), 0);
  // const dow = firstDay.getDay() + 1;
  // const tt = firstDay.getDate();
  // console.log("dow", dow);
  // console.log("tt", tt);
  renderDayOfMonth(value);
};
const daytimeInput = document.getElementById("daytime");
daytimeInput.addEventListener("change", handleChangeInputDay);
