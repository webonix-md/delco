// Întrebările testului online (versiunea română). Primele trei apar pe pagina principală, toate — pe /ro/examOnline.
// Răspunsurile sunt verificate după textul Regulamentului de pe site-ul școlii (numărul punctului — în câmpul p).
// ДЕМО: перевод вопросов из js/quiz-data.js — это не официальные экзаменационные билеты; дать вычитать директору.
window.QUIZ = [
  {
    q: "Care este viteza maximă pentru un autoturism în localitate (dacă indicatoarele nu stabilesc altfel)?",
    a: ["40 km/h", "50 km/h", "60 km/h"], right: 1, p: 47,
    why: "În localități — 50 km/h, iar prin zonele rezidențiale și teritoriile adiacente drumului — 20 km/h."
  },
  {
    q: "Intersecția drumurilor de semnificație echivalentă. Cui trebuie să cedați trecerea?",
    a: ["Vehiculelor care se apropie din stânga", "Vehiculelor care se apropie din dreapta", "Celor care merg înainte"], right: 1, p: 59,
    why: "Trebuie să cedați trecerea vehiculelor care se apropie din dreapta, indiferent de direcția lor ulterioară de deplasare."
  },
  {
    q: "Semnalele semaforului contrazic indicațiile agentului de circulație. Pe cine respectați?",
    a: ["Semaforul", "Agentul de circulație", "Indicatoarele rutiere"], right: 1, p: 16,
    why: "Semnalele și indicațiile agentului de circulație au prioritate față de semafor, indicatoare, marcaje și chiar față de Regulament."
  },
  {
    q: "Aveți o vechime în conducere mai mică de un an. Cu ce viteză maximă aveți voie să circulați?",
    a: ["70 km/h", "80 km/h", "90 km/h"], right: 0, p: 48,
    why: "Conducătorilor cu o vechime mai mică de un an le este interzis să depășească 70 km/h, iar pe vehicul, în față și în spate, trebuie aplicat semnul „Conducător începător”."
  },
  {
    q: "Avertizorul de avarie nu funcționează. La ce distanță amplasați triunghiul de presemnalizare (în afara traficului urban intens)?",
    a: ["Cel puțin 15 m", "Cel puțin 30 m", "Cel puțin 50 m"], right: 1, p: 37,
    why: "La cel puțin 30 m de vehicul, în spate sau în față, pe aceeași bandă. În localități, la trafic intens, poate fi amplasat mai aproape, important să fie observat."
  },
  {
    q: "În afara localității, drum obișnuit. Care este limita de viteză pentru un autoturism?",
    a: ["80 km/h", "90 km/h", "110 km/h"], right: 1, p: 47,
    why: "În afara localităților — 90 km/h, iar pe drumurile semnalizate cu indicatorul 5.4 „Drum pentru automobile” — 110 km/h."
  },
  {
    q: "Care este viteza maximă în zona rezidențială?",
    a: ["10 km/h", "20 km/h", "30 km/h"], right: 1, p: 47,
    why: "Prin zonele rezidențiale și teritoriile adiacente drumului — cel mult 20 km/h."
  },
  {
    q: "Puteți vorbi la telefon în timp ce conduceți?",
    a: ["Da, dacă discuția e scurtă", "Doar prin dispozitiv „mâini libere”", "Da, la semafor"], right: 1, p: 14,
    why: "Convorbirile telefonice în timpul mersului sunt interzise, cu excepția cazurilor când vehiculul sau telefonul are dispozitiv care permite convorbirea fără folosirea mâinilor."
  },
  {
    q: "Ce trebuie să facă conducătorul cu centurile de siguranță înainte de plecare?",
    a: ["Să-și cupleze propria centură", "Să-și cupleze centura și să se asigure că și pasagerii au cuplat centurile", "Nimic, este responsabilitatea pasagerilor"], right: 1, p: 11,
    why: "Conducătorul trebuie să poarte centura de siguranță și să se asigure că și pasagerii au cuplat centurile, dacă vehiculul este echipat cu acestea."
  },
  {
    q: "Înainte de trecerea la nivel cu calea ferată trebuie să lăsați trenul să treacă, iar linia de oprire și indicatorul lipsesc. Unde vă opriți?",
    a: ["Nu mai aproape de 5 m de prima șină", "Nu mai aproape de 10 m de prima șină", "Imediat în fața șinelor"], right: 1, p: 64,
    why: "În lipsa marcajului 1.12 și a indicatorului 2.2 — nu mai aproape de 10 m de prima șină."
  }
];
