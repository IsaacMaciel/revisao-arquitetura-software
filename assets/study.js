/* ============================================================
   Pós — Arquitetura de Software · JS de estudo
   Quiz, flashcards, scroll-reveal, barra de progresso, menu mobile.
   Vanilla, sem dependências, offline.
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Barra de progresso de leitura ---------- */
  function initProgress() {
    var bar = document.getElementById("progress");
    if (!bar) return;
    function update() {
      var h = document.documentElement;
      var scrolled = h.scrollTop || document.body.scrollTop;
      var max = (h.scrollHeight || document.body.scrollHeight) - h.clientHeight;
      bar.style.width = (max > 0 ? (scrolled / max) * 100 : 0) + "%";
    }
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  /* ---------- Scroll-reveal ---------- */
  function initReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Realce do item de navegação ativo por seção ---------- */
  function initScrollSpy() {
    var links = Array.prototype.slice.call(
      document.querySelectorAll('.sidebar nav a[href^="#"]')
    );
    if (!links.length) return;
    var map = {};
    links.forEach(function (a) {
      var id = a.getAttribute("href").slice(1);
      var sec = document.getElementById(id);
      if (sec) map[id] = a;
    });
    var sections = Object.keys(map).map(function (id) { return document.getElementById(id); });
    if (!("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          links.forEach(function (l) { l.classList.remove("active"); });
          var active = map[e.target.id];
          if (active) active.classList.add("active");
        }
      });
    }, { rootMargin: "-20% 0px -70% 0px" });
    sections.forEach(function (s) { io.observe(s); });
  }

  /* ---------- Flashcards (flip ao clicar) ---------- */
  function initFlashcards() {
    document.querySelectorAll(".flashcard").forEach(function (card) {
      card.setAttribute("tabindex", "0");
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", "Cartão de revisão — clique para virar");
      function flip() { card.classList.toggle("flipped"); }
      card.addEventListener("click", flip);
      card.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flip(); }
      });
    });
  }

  /* ---------- Quiz ----------
     Markup esperado:
     <div class="quiz" data-answer="B">
       <span class="quiz-label">Questão</span>
       <p class="q-text">...</p>
       <ul class="options">
         <li class="opt" data-key="A"><span class="marker">A</span><span>...</span></li>
         ...
       </ul>
       <div class="explain"><span class="verdict"></span> ...texto...</div>
     </div>
  */
  function initQuiz() {
    document.querySelectorAll(".quiz").forEach(function (quiz) {
      var answer = (quiz.getAttribute("data-answer") || "").trim().toUpperCase();
      var opts = Array.prototype.slice.call(quiz.querySelectorAll(".opt"));
      var explain = quiz.querySelector(".explain");
      var answered = false;

      opts.forEach(function (opt) {
        opt.setAttribute("tabindex", "0");
        opt.setAttribute("role", "button");
        function choose() {
          if (answered) return;
          answered = true;
          var key = (opt.getAttribute("data-key") || "").trim().toUpperCase();
          var isRight = key === answer;

          opts.forEach(function (o) {
            o.classList.add("disabled");
            var k = (o.getAttribute("data-key") || "").trim().toUpperCase();
            if (k === answer) {
              o.classList.add("correct");
            } else if (o === opt) {
              o.classList.add("wrong");
            } else {
              o.classList.add("dimmed");
            }
          });

          if (explain) {
            explain.classList.add("show");
            explain.classList.add(isRight ? "right" : "wrongv");
            var verdict = explain.querySelector(".verdict");
            if (verdict && !verdict.textContent.trim()) {
              verdict.textContent = isRight ? "✓ Correto" : "✗ Incorreto — a resposta é " + answer;
            } else if (verdict) {
              verdict.textContent = (isRight ? "✓ Correto — " : "✗ Incorreto (resposta: " + answer + ") — ") + verdict.textContent;
            }
          }
        }
        opt.addEventListener("click", choose);
        opt.addEventListener("keydown", function (e) {
          if (e.key === "Enter" || e.key === " ") { e.preventDefault(); choose(); }
        });
      });
    });
  }

  /* ---------- Menu mobile ---------- */
  function initMobileMenu() {
    var btn = document.querySelector(".menu-toggle");
    var nav = document.querySelector(".sidebar nav");
    if (!btn || !nav) return;
    btn.addEventListener("click", function () { nav.classList.toggle("open"); });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initProgress();
    initReveal();
    initScrollSpy();
    initFlashcards();
    initQuiz();
    initMobileMenu();
  });
})();
