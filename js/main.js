(function () {
  "use strict";
  document.documentElement.classList.add("js");
  var root = document.body.getAttribute("data-root") || "";
  var lang = document.documentElement.lang === "ro" ? "ro" : "ru";

  /* ---------- тексты интерфейса ---------- */
  var T = {
    ru: {
      recruiting: "идёт набор", question: "Вопрос", of: "из", letters: ["А", "Б", "В", "Г"],
      right: "Верно.", wrong: "Неверно.", point: "п.", rules: "ПДД",
      scoreAll: "Отлично! Вам осталось только научиться водить.",
      scoreGood: "Хорошая база. На курсе закроем пробелы.",
      scoreLow: "Есть над чем поработать — для этого и нужен хороший курс теории.",
      enroll: "Записаться на курс",
      noPoint: function (max) { return "Такого пункта нет. В основной части Правил пункты с 1 по " + max + "."; }
    },
    ro: {
      recruiting: "înscriere", question: "Întrebarea", of: "din", letters: ["A", "B", "C", "D"],
      right: "Corect.", wrong: "Greșit.", point: "p.", rules: "din Regulament",
      scoreAll: "Excelent! Vă rămâne doar să învățați să conduceți.",
      scoreGood: "O bază bună. La curs vom completa golurile.",
      scoreLow: "Mai aveți de lucrat — pentru asta există un curs teoretic bun.",
      enroll: "Înscrieți-vă la curs",
      noPoint: function (max) { return "Un asemenea punct nu există. În partea de bază a Regulamentului sunt punctele de la 1 la " + max + "."; }
    }
  }[lang];
  var pddMap = (window.PDD_MAP && window.PDD_MAP[lang]) || [];

  /* ---------- мобильное меню ---------- */
  var burger = document.querySelector(".burger");
  var nav = document.getElementById("nav");
  if (burger && nav) {
    var header = document.querySelector(".header");
    var setOpen = function (open) {
      // меню начинается сразу под шапкой (над ней может быть полоса с телефонами)
      if (open && header) nav.style.top = header.getBoundingClientRect().bottom + "px";
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      nav.classList.toggle("is-open", open);
      document.body.style.overflow = open ? "hidden" : "";
    };
    burger.addEventListener("click", function () {
      setOpen(burger.getAttribute("aria-expanded") !== "true");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 860) setOpen(false);
    });
  }

  /* ---------- активный пункт меню на внутренних страницах ---------- */
  var section = document.body.getAttribute("data-section");
  if (section) {
    var cur = document.querySelector('.nav a[data-section="' + section + '"]');
    if (cur) cur.setAttribute("aria-current", "page");
  }

  /* ---------- билет: если набор уже стартовал ---------- */
  var dateEl = document.querySelector("[data-start]");
  if (dateEl) {
    var start = new Date(dateEl.getAttribute("data-start") + "T23:59:59");
    if (Date.now() > start.getTime()) {
      var late = document.querySelector(".ticket__late");
      if (late) late.hidden = false;
      var tag = document.querySelector(".tt-row--hot .tt-tag");
      if (tag) tag.textContent = T.recruiting;
    }
  }

  /* ---------- ПДД: где лежит пункт N ---------- */
  function pointHref(n) {
    for (var i = 0; i < pddMap.length; i++) {
      if (n >= pddMap[i].from && n <= pddMap[i].to) return root + pddMap[i].file + "#p-" + n;
    }
    return null;
  }

  /* ---------- тест ---------- */
  function renderQuiz(box) {
    var data = window.QUIZ || [];
    var mode = box.getAttribute("data-quiz");
    var items = mode === "mini" ? data.slice(0, 3) : data;
    var answered = 0, right = 0;
    var letters = T.letters;

    items.forEach(function (it, idx) {
      var q = document.createElement("div");
      q.className = "q";
      var html = '<p class="q__num">' + T.question + " " + (idx + 1) + " " + T.of + " " + items.length + "</p>" +
        '<p class="q__text">' + it.q + '</p><div class="q__opts">';
      it.a.forEach(function (opt, j) {
        html += '<button type="button" class="q__opt" data-j="' + j + '"><b>' + letters[j] + "</b><span>" + opt + "</span></button>";
      });
      html += '</div><p class="q__why" hidden></p>';
      q.innerHTML = html;
      box.appendChild(q);

      q.querySelector(".q__opts").addEventListener("click", function (e) {
        var btn = e.target.closest(".q__opt");
        if (!btn) return;
        var j = +btn.getAttribute("data-j");
        var opts = q.querySelectorAll(".q__opt");
        opts.forEach(function (o) { o.disabled = true; });
        opts[it.right].classList.add("is-right");
        var ok = j === it.right;
        if (!ok) btn.classList.add("is-wrong");
        answered++; if (ok) right++;
        var why = q.querySelector(".q__why");
        var href = pointHref(it.p);
        var ref = T.point + " " + it.p + " " + T.rules;
        why.innerHTML = "<b>" + (ok ? T.right : T.wrong) + "</b> " + it.why +
          (href ? ' <a href="' + href + '">' + ref + "</a>" : " (" + ref + ")");
        why.hidden = false;
        if (answered === items.length && mode !== "mini") showScore();
      });
    });

    function showScore() {
      var s = document.createElement("div");
      s.className = "score";
      var msg = right === items.length ? T.scoreAll : right >= items.length * 0.7 ? T.scoreGood : T.scoreLow;
      var call = document.querySelector(".nav__cta");
      s.innerHTML = "<b>" + right + " " + T.of + " " + items.length + "</b><p>" + msg + "</p>" +
        '<p style="margin-top:16px"><a class="btn btn--accent" href="' + (call ? call.getAttribute("href") : "#") + '">' + T.enroll + "</a></p>";
      box.appendChild(s);
      s.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }
  document.querySelectorAll("[data-quiz]").forEach(renderQuiz);

  /* ---------- переход к пункту ПДД по номеру ---------- */
  var jump = document.getElementById("jump");
  if (jump) {
    jump.addEventListener("submit", function (e) {
      e.preventDefault();
      var n = parseInt(jump.querySelector("input").value, 10);
      var msg = jump.querySelector(".jump__msg");
      var href = n ? pointHref(n) : null;
      if (href) location.href = href;
      else msg.textContent = T.noPoint(pddMap.length ? pddMap[pddMap.length - 1].to : "…");
    });
  }

  /* ---------- оглавление: подсветка текущего раздела + сворачивание на мобильном ---------- */
  var toc = document.querySelector(".toc");
  if (toc) {
    var title = toc.querySelector(".toc__title");
    if (title && toc.hasAttribute("data-collapsible")) {
      title.addEventListener("click", function () { toc.classList.toggle("is-open"); });
    }
    var links = Array.prototype.slice.call(toc.querySelectorAll('ol a[href^="#"]'));
    var targets = links.map(function (a) { return document.getElementById(a.getAttribute("href").slice(1)); });
    if ("IntersectionObserver" in window && targets.length) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          var i = targets.indexOf(en.target);
          links.forEach(function (l, k) { l.classList.toggle("is-active", k === i); });
        });
      }, { rootMargin: "-20% 0px -70% 0px" });
      targets.forEach(function (t) { if (t) io.observe(t); });
    }
  }

  /* ---------- появление блоков при прокрутке ---------- */
  var sel = ".sec-head, .why li, .timetable, .plan, .car, .steps li, .checklist, .lib-card, .faq, .contacts > *, .teacher > *, .chapters, .article-card, .place, .docs, .table-wrap, .included li, .lang__item, .transport > div, .reasons";
  var els = document.querySelectorAll(sel);
  if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); ro.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (el, i) {
      el.classList.add("reveal");
      el.style.transitionDelay = (i % 3) * 60 + "ms";
      ro.observe(el);
    });
  }
})();
