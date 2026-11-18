(function () {
  var nav = document.querySelector(".site-nav");
  var toggle = document.querySelector(".nav-toggle");
  var year = document.getElementById("year");

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  document.querySelectorAll(".faq-item").forEach(function (item) {
    var button = item.querySelector("button");
    var answer = item.querySelector(".answer");
    if (!button || !answer) return;

    button.setAttribute("aria-expanded", item.hasAttribute("open") ? "true" : "false");

    button.addEventListener("click", function () {
      var willOpen = !item.hasAttribute("open");
      document.querySelectorAll(".faq-item").forEach(function (other) {
        other.removeAttribute("open");
        var otherBtn = other.querySelector("button");
        if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
      });
      if (willOpen) {
        item.setAttribute("open", "");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });

  var form = document.getElementById("strategy-form");
  var status = document.getElementById("form-status");

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var data = new FormData(form);
      var name = (data.get("name") || "").toString().trim();
      var company = (data.get("company") || "").toString().trim();
      var phone = (data.get("phone") || "").toString().trim();
      var email = (data.get("email") || "").toString().trim();
      var area = (data.get("area") || "").toString().trim();
      var help = (data.get("help") || "").toString().trim();

      if (!name || !email) {
        if (status) status.textContent = "Please add your name and email so we can reply.";
        return;
      }

      var body = [
        "Name: " + name,
        "Company: " + company,
        "Phone: " + phone,
        "Email: " + email,
        "Service area: " + area,
        "",
        "What they want help with:",
        help
      ].join("\n");

      var mailto =
        "mailto:terencenjeck52@gmail.com" +
        "?subject=" +
        encodeURIComponent("SANIA strategy call request — " + name) +
        "&body=" +
        encodeURIComponent(body);

      if (status) {
        status.textContent = "Opening your email app with a draft to terencenjeck52@gmail.com.";
      }
      window.location.href = mailto;
    });
  }
})();
