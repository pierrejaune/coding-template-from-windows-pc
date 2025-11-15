// *********************************************************/
//
// *********************************************************/

const body = document.querySelector('body');
// const loading = document.getElementById('loading');
const fv = document.getElementById('fullpage_box');
const loading_logo = document.getElementById('loading_logo');

// body
body.style.opacity = '0';
body.style.overflow = 'hidden';
fv.style.opacity = '0';

window.addEventListener('load', () => {
  // *****************************************************/
  // loaded
  // *****************************************************/

  //
  body.style.opacity = '1';
  loading_logo.style.opacity = '0';

  setTimeout(() => {
    // loading.classList.add('appear');
    fv.style.opacity = '1';
  }, 1000);
  setTimeout(() => {
    // loading.style.opacity = "0";
    body.style.overflow = 'unset';
    loading_logo.style.opacity = '1';
  }, 3100);
  setTimeout(() => {
    // loading.classList.add('loaded');
    fv.classList.add('loaded');
  }, 6000);
});
