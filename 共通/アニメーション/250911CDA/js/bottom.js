// *****************************************************/
// 素材
// *****************************************************/

// 画面幅取得
const windowWidth = $(window).width();
const windowHeight = $(window).height();
console.log(windowHeight);

// fullpageの対象要素を取得
const fullpage_Element = document.getElementById('fullpage');
const fullpage_list = fullpage_Element.querySelectorAll('.full_list');

// fullpageのpositionを取得
const fullpageClientRect = fullpage_Element.getBoundingClientRect();
const fullpagePositionY = fullpageClientRect.top;
console.log(fullpagePositionY);

// boxの高さを設定
// const sub_info_box = document.getElementById("sub_info_box");

// boxの高さを設定
const fullpage_box = document.getElementById('fullpage_box');
const list_num = fullpage_list.length;
const fullpage_box_height = windowHeight * (list_num + 2);
fullpage_box.style.height = fullpage_box_height + 'px';
console.log(list_num);

// *****************************************************/
// scroll function
// *****************************************************/

window.addEventListener('scroll', () => {
  const scroll_y = window.scrollY;

  for (var i = 0; i < fullpage_list.length; i++) {
    // class nameを取得
    const i_next = i + 1;
    const i_prev = i - 1;

    const height_i = windowHeight * i;

    // 位置での分岐
    if (0 < i) {
      // 位置での分岐
      if (height_i < scroll_y) {
        fullpage_list[i].classList.add('active');
        fullpage_list[i_prev].classList.add('prev');
        if (i_next == list_num) {
          fullpage_Element.classList.add('finished');
        }
      } else {
        fullpage_list[i].classList.remove('active');
        fullpage_list[i_prev].classList.remove('prev');
        if (i_next == list_num) {
          fullpage_Element.classList.remove('finished');
        }
      }
    }
  }
});

// *****************************************************/
// onclick function
// *****************************************************/

function credit(num) {
  const list_number = ('00' + num).slice(-2);
  // console.log(list_number);
  const btn_id = 'credit_btn_' + list_number;
  const menu_id = 'credit_menu_' + list_number;
  // console.log(btn_id);

  // 対象要素を取得
  const btn_Element = document.getElementById(btn_id);
  const menu_Element = document.getElementById(menu_id);
  console.log(menu_Element);

  btn_Element.classList.add('click');
  menu_Element.classList.add('click');

  setTimeout(() => {
    btn_Element.classList.add('end');
    menu_Element.classList.add('end');
  }, 1000);
}
