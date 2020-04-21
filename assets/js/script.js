// Menu Responsivo
let show = true

const menuAll = document.querySelector('.menu-all')
const menuToggle = document.querySelector('.menu-toggle')
const menuNav = document.querySelectorAll('.menu-nav ul a')
const menu = document.querySelector('.menu-bg')

menuToggle.addEventListener('click', () => {
  document.body.style.overflow = show ? 'hidden' : 'initial'

  menuAll.classList.toggle('on', show)
  show = !show
})

for (const menu of menuNav) {
  menu.addEventListener('click', () => {
    document.body.style.overflow = 'initial'
    menuAll.classList.add('active')
    menuAll.classList.remove('on')
  })
}

// Scroll Suave
const menuItems = document.querySelectorAll('.menu-nav ul a[href^="#"]')

let getScroolTopByHref = (element) => {
  const id = element.getAttribute('href')
  return document.querySelector(id).offsetTop
}

let scrollToIdClick = (event) => {
  event.preventDefault()
  const to = getScroolTopByHref(event.target) - 80

  scrollToPosition(to)
}

// Scrool Suave
let scrollToPosition = (to) => {
  smoothScrollTo(0, to, 1500)
  // window.scroll({
  //   top: to, /* - 80 */
  //   behavior: 'smooth',
  // })
}

let smoothScrollTo = (endX, endY, duration) => {
  const startX = window.scrollX || window.pageXOffset;
  const startY = window.scrollY || window.pageYOffset;
  const distanceX = endX - startX;
  const distanceY = endY - startY;
  const startTime = new Date().getTime();

  duration = typeof duration !== 'undefined' ? duration : 400;

  // Easing function
  const easeInOutQuart = (time, from, distance, duration) => {
    if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
    return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
  };

  const timer = setInterval(() => {
    const time = new Date().getTime() - startTime;
    const newX = easeInOutQuart(time, startX, distanceX, duration);
    const newY = easeInOutQuart(time, startY, distanceY, duration);
    if (time >= duration) {
      clearInterval(timer);
    }
    window.scroll(newX, newY);
  }, 1000 / 60); // 60 fps
};


menuItems.forEach(item => {
  item.addEventListener('click', scrollToIdClick)
})