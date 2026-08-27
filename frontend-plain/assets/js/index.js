document.addEventListener("DOMContentLoaded", function () {
  const whatWeDoList = document.querySelector(".what-we-do-list");

  if (!whatWeDoList) return;

  const items = whatWeDoList.querySelectorAll(".what-we-do-item");

  items.forEach(function (item) {
    const trigger = item.querySelector(".what-we-do-trigger");

    if (!trigger) return;

    trigger.addEventListener("click", function () {
      const isActive = item.classList.contains("active");

      /* Close all panels */
      items.forEach(function (otherItem) {
        otherItem.classList.remove("active");
      });

      /* Open clicked panel if it wasn't already open */
      if (!isActive) {
        item.classList.add("active");
      }
    });
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const depList = document.querySelector(".department-list");
  if (!depList) return;
  const items = depList.querySelectorAll(".department-item");
  items.forEach(function (item) {
    const trigger = item.querySelector(".department-trigger");
    if (!trigger) return;
    trigger.addEventListener("click", function () {
      const isActive = item.classList.contains("active");
      items.forEach(function (otherItem) {
        otherItem.classList.remove("active");
      });
      if (!isActive) {
        item.classList.add("active");
      }
    });
  });
});
