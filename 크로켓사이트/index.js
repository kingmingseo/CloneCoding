
/***************네비바 클릭 시 화면 전환******************** */
let aTags = document.querySelectorAll('a');
aTags.forEach(element => {
  element.addEventListener('click', e => {
    e.preventDefault();
    console.log(e)
    console.log(element)
    let target = document.querySelector(element.getAttribute('href'));

    window.scrollTo({
      'behavior': 'smooth',
      'top': target.offsetTop
    })
  });
});

// element.getAttribute('href')를 할때 어떤 객체를 끌어올 것인지 주의 해야한다
// 클릭된 객체를 끌어오면 그 객체안에는 PointerEvent객체와 그에 연관된 isTrusted나 클릭된 X좌표 Y좌표 같은 속성들이 온다
// 그러므로 클릭된 객체를 가져오는 것이 아닌 forEach에서 반복문을 돌릴때 활용한 element를 가져와서 쿼리 셀렉을 해줘야한다. 


/***************이미지 슬라이드 기능 구현******************** */

let slider = document.querySelector('#slider');
let slides = slider.querySelector('.slides');
let slide = slides.querySelectorAll('.slide');

let currentSlide = 0;

setInterval(() => {
  let from = -(1024 * currentSlide);
  let to = from - 1024;
  slides.animate({
    marginLeft: [from + "px", to + "px"]
  }, {
    duration: 500,
    easing: "ease",
    iterations: 1,
    fill: "both"
  });
  currentSlide++;
  if (currentSlide === (slide.length - 1)) {
    currentSlide = 0
  }
}, 3000)

//animate({properties}, {duration[필수],easing,iteration, fill} ) 함수 사용
// marginLeft: [from , to] 형식으로 속성을 변화 시킴


/***************tab 기능 구현******************** */
let links = document.querySelectorAll('.tabs-list li a')
let items = document.querySelectorAll('.tabs-list li')

links.forEach((element) => {
  element.addEventListener('click', (e) => {
    e.preventDefault();
  })
})


items.forEach((element) => {
  element.addEventListener('click', (e) => {
    let tabId = element.querySelector('a').getAttribute('href');
    document.querySelectorAll('.tabs-list li, .tabs div.tab').forEach((item) => {
      item.classList.remove("active")
    })
    document.querySelector(tabId).classList.add("active");
    element.classList.add("active");
  })
})


