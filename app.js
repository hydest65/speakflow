document.querySelectorAll(".sentence").forEach((sentence) => {
  sentence.addEventListener("click", () => {
    document.querySelectorAll(".sentence").forEach((item) => item.classList.remove("active"));
    sentence.classList.add("active");
  });
});
