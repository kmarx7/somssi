const header = document.querySelector('#header');
const nav = document.querySelector('#nav');
const menuButton = document.querySelector('.menu-button');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  }));
}

if (header) {
  window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 30), { passive: true });
}

const imageSections = document.querySelectorAll('.image-section');
if (imageSections.length) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('in-view'); });
  }, { threshold: 0.2 });
  imageSections.forEach((section) => imageObserver.observe(section));
}

const calendar = document.querySelector('#calendar');
const monthLabel = document.querySelector('#month-label');
const selectedDate = document.querySelector('#selected-date');
const total = document.querySelector('#total');
const totalDetail = document.querySelector('#total-detail');
const privateMessage = document.querySelector('#private-message');
let monthIndex = 0;
let guests = 4;
let chosenDate = '';
const monthData = [
  { label: '2026.08', year: 2026, month: 7, available: [22, 23, 29, 30] },
  { label: '2026.09', year: 2026, month: 8, available: [5, 6, 12, 13, 19, 20, 26] },
  { label: '2026.10', year: 2026, month: 9, available: [3, 10, 17, 24, 31] }
];

function renderCalendar() {
  if (!calendar || !monthLabel) return;
  const data = monthData[monthIndex];
  const firstDay = new Date(data.year, data.month, 1).getDay();
  const days = new Date(data.year, data.month + 1, 0).getDate();
  const previousDays = new Date(data.year, data.month, 0).getDate();
  monthLabel.textContent = data.label;
  calendar.innerHTML = '';

  for (let slot = 0; slot < 42; slot += 1) {
    const button = document.createElement('button');
    button.type = 'button';
    let day;
    if (slot < firstDay) {
      day = previousDays - firstDay + slot + 1;
      button.className = 'other';
      button.disabled = true;
    } else if (slot >= firstDay + days) {
      day = slot - firstDay - days + 1;
      button.className = 'other';
      button.disabled = true;
    } else {
      day = slot - firstDay + 1;
      const available = data.available.includes(day);
      button.disabled = !available;
      if (available) {
        button.className = 'available';
        button.setAttribute('aria-label', `${data.label}.${String(day).padStart(2, '0')} 예약 가능`);
        button.addEventListener('click', () => {
          calendar.querySelectorAll('.selected').forEach((item) => item.classList.remove('selected'));
          button.classList.add('selected');
          chosenDate = `${data.label}.${String(day).padStart(2, '0')}`;
          if (selectedDate) selectedDate.textContent = chosenDate;
        });
      }
    }
    button.textContent = day;
    calendar.appendChild(button);
  }
}

function updateTotal() {
  if (!total) return;
  const packageInput = document.querySelector('input[name="package"]:checked');
  const packageName = packageInput?.value || 'signature';
  const prices = { basic: 79000, signature: 99000, premium: 129000 };
  const privateBooking = guests === 2;
  const unit = privateBooking ? 139000 : prices[packageName];
  const displayName = privateBooking ? 'Private' : packageName.charAt(0).toUpperCase() + packageName.slice(1);
  const guestsElement = document.querySelector('#guests');
  if (guestsElement) guestsElement.textContent = guests;
  total.textContent = `₩${(unit * guests).toLocaleString('ko-KR')}`;
  if (totalDetail) totalDetail.textContent = `${displayName} · ${guests} guests`;
  if (privateMessage) privateMessage.hidden = !privateBooking;
}

if (calendar) {
  document.querySelector('#prev-month')?.addEventListener('click', () => { monthIndex = Math.max(0, monthIndex - 1); renderCalendar(); });
  document.querySelector('#next-month')?.addEventListener('click', () => { monthIndex = Math.min(monthData.length - 1, monthIndex + 1); renderCalendar(); });
  document.querySelector('#minus')?.addEventListener('click', () => { guests = Math.max(2, guests - 1); updateTotal(); });
  document.querySelector('#plus')?.addEventListener('click', () => { guests = Math.min(6, guests + 1); updateTotal(); });
  document.querySelectorAll('input[name="package"]').forEach((input) => input.addEventListener('change', updateTotal));
  renderCalendar();
  updateTotal();
}

const bookingForm = document.querySelector('#booking-form');
const completeDialog = document.querySelector('#complete-dialog');
if (bookingForm && completeDialog) {
  bookingForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!chosenDate) {
      selectedDate.textContent = '먼저 예약 가능한 날짜를 선택해 주세요';
      selectedDate.closest('.booking-step').scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    const data = new FormData(bookingForm);
    document.querySelector('#confirm-date').textContent = chosenDate;
    document.querySelector('#confirm-time').textContent = data.get('time');
    document.querySelector('#confirm-guests').textContent = `${guests} guests`;
    document.querySelector('#confirm-total').textContent = total.textContent;
    completeDialog.showModal();
  });
  completeDialog.querySelectorAll('.dialog-close,.dialog-action').forEach((button) => button.addEventListener('click', () => completeDialog.close()));
  completeDialog.addEventListener('click', (event) => { if (event.target === completeDialog) completeDialog.close(); });
}

const checkForm = document.querySelector('#check-form');
if (checkForm) {
  checkForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const result = document.querySelector('#reservation-result') || document.querySelector('#check-result');
    if (!result) return;
    result.hidden = false;
    result.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

// Experience discovery hub
const experienceHub = document.querySelector('.experience-hub-page');
if (experienceHub) {
  const filterButtons = [...document.querySelectorAll('[data-filter]')];
  const experienceCards = [...document.querySelectorAll('.hub-card')];
  const visibleCount = document.querySelector('#visible-count');

  const applyFilter = (filter) => {
    experienceCards.forEach((card) => card.classList.toggle('is-hidden', filter !== 'all' && card.dataset.category !== filter));
    filterButtons.forEach((button) => {
      const active = button.dataset.filter === filter;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    if (visibleCount) visibleCount.textContent = experienceCards.filter((card) => !card.classList.contains('is-hidden')).length;
  };

  filterButtons.forEach((button) => button.addEventListener('click', () => applyFilter(button.dataset.filter)));
  applyFilter('all');

  const toast = document.querySelector('#hub-toast');
  let toastTimer;
  document.querySelectorAll('.interest-button').forEach((button) => {
    button.addEventListener('click', () => {
      const registered = button.classList.toggle('registered');
      button.innerHTML = registered ? '관심 등록됨 <span>✓</span>' : `${button.closest('.quiet') ? '관심 있어요' : '오픈 알림 받기'} <span>＋</span>`;
      if (toast) {
        toast.textContent = registered ? '관심 Experience로 등록되었습니다.' : '관심 등록을 취소했습니다.';
        toast.classList.add('show');
        window.clearTimeout(toastTimer);
        toastTimer = window.setTimeout(() => toast.classList.remove('show'), 2200);
      }
    });
  });

  const testDialog = document.querySelector('#somssi-test');
  const questionSection = document.querySelector('#test-question');
  const resultSection = document.querySelector('#test-result');
  const questionKicker = document.querySelector('#question-kicker');
  const questionTitle = document.querySelector('#question-title');
  const optionWrap = document.querySelector('#test-options');
  const testStep = document.querySelector('#test-step');
  const testProgress = document.querySelector('#test-progress');
  let currentQuestion = 0;
  let scores = {};
  let recommendedTarget = 'card-string';

  const questions = [
    { title: '여행에서 가장 기억하고 싶은 순간은?', options: [['직접 한 곡을 완성한 순간', 'string'], ['고요하게 차를 내린 순간', 'tea'], ['내 이름을 작품으로 남긴 순간', 'brush'], ['손으로 기념품을 만든 순간', 'knot']] },
    { title: '당신이 가장 끌리는 감각은 무엇인가요?', options: [['울림과 리듬', 'string'], ['향과 온기', 'tea'], ['먹과 종이의 질감', 'brush'], ['실과 천의 촉감', 'knot']] },
    { title: '체험의 속도는 어느 쪽에 가깝나요?', options: [['함께 맞춰가는 활기찬 시간', 'string'], ['천천히 몰입하는 고요한 시간', 'tea'], ['집중해서 표현하는 시간', 'brush'], ['차분히 손을 움직이는 시간', 'knot']] },
    { title: '가져가고 싶은 결과물을 골라주세요.', options: [['나의 연주 영상', 'string'], ['내가 완성한 차상 사진', 'tea'], ['한글 이름 작품', 'brush'], ['내가 만든 노리개', 'knot']] },
    { title: '한국문화에서 먼저 만나고 싶은 것은?', options: [['전통음악의 선율', 'string'], ['환대와 차 문화', 'tea'], ['한글과 붓의 미감', 'brush'], ['한복과 장식의 색', 'knot']] }
  ];

  const resultData = {
    string: { seal: '絃', title: '줄을 다루는 솜씨', en: 'The Craft of Strings', copy: '손끝으로 소리를 만들고 하나의 곡을 완성할 때 가장 큰 즐거움을 느끼는 타입입니다.', target: 'card-string' },
    tea: { seal: '茶', title: '차 한 잔의 솜씨', en: 'The Craft of Tea', copy: '향과 온도, 느린 호흡 속에서 한국의 환대와 고요를 발견하는 타입입니다.', target: 'card-tea' },
    brush: { seal: '書', title: '붓을 다루는 솜씨', en: 'The Craft of Brush', copy: '한 획에 집중하고 나만의 흔적을 작품으로 남길 때 만족을 느끼는 타입입니다.', target: 'card-brush' },
    knot: { seal: '結', title: '매듭의 솜씨', en: 'The Craft of Knot', copy: '색과 촉감을 즐기며 손으로 천천히 완성한 물건에 의미를 담는 타입입니다.', target: 'card-knot' }
  };

  const showResult = () => {
    const bestType = Object.entries(scores).sort((a, b) => b[1] - a[1])[0]?.[0] || 'string';
    const data = resultData[bestType];
    recommendedTarget = data.target;
    questionSection.hidden = true;
    resultSection.hidden = false;
    document.querySelector('#result-seal').textContent = data.seal;
    document.querySelector('#test-result-title').textContent = data.title;
    document.querySelector('#test-result-en').textContent = data.en;
    document.querySelector('#test-result-copy').textContent = data.copy;
    document.querySelector('#match-score').textContent = `${Math.min(98, 84 + (scores[bestType] * 3))}%`;
    testStep.textContent = 'RESULT';
    testProgress.style.width = '100%';
  };

  const renderQuestion = () => {
    const question = questions[currentQuestion];
    questionSection.hidden = false;
    resultSection.hidden = true;
    questionKicker.textContent = `QUESTION ${String(currentQuestion + 1).padStart(2, '0')}`;
    questionTitle.textContent = question.title;
    testStep.textContent = `${String(currentQuestion + 1).padStart(2, '0')} / ${String(questions.length).padStart(2, '0')}`;
    testProgress.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
    optionWrap.innerHTML = '';
    question.options.forEach(([label, type], index) => {
      const option = document.createElement('button');
      option.type = 'button';
      option.innerHTML = `<small>${String(index + 1).padStart(2, '0')}</small> ${label}`;
      option.addEventListener('click', () => {
        scores[type] = (scores[type] || 0) + 1;
        currentQuestion += 1;
        if (currentQuestion >= questions.length) showResult();
        else renderQuestion();
      });
      optionWrap.appendChild(option);
    });
  };

  const restartTest = () => {
    currentQuestion = 0;
    scores = {};
    renderQuestion();
  };

  document.querySelectorAll('[data-open-somssi-test]').forEach((button) => button.addEventListener('click', () => {
    restartTest();
    testDialog?.showModal();
  }));
  testDialog?.querySelector('.test-close')?.addEventListener('click', () => testDialog.close());
  testDialog?.addEventListener('click', (event) => { if (event.target === testDialog) testDialog.close(); });
  document.querySelector('#restart-test')?.addEventListener('click', restartTest);
  document.querySelector('#view-recommendation')?.addEventListener('click', () => {
    testDialog?.close();
    applyFilter('all');
    const target = document.querySelector(`#${recommendedTarget}`);
    target?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    target?.classList.add('recommended-flash');
    window.setTimeout(() => target?.classList.remove('recommended-flash'), 2600);
  });
}
