const $modal = `
                <div class="modal__close">
                  <img
                  width="22px"
                  height="22px"
                  src='./assets/close_icon.svg'
                  alt="close_icon_logo"
                  />
                </div>
                <div class="modal__card">
                  <div class="modal__header">
                    <div class="modal__back">
                      <img width="32px" height="24px" src='./assets/arrow_back_icon.svg' alt="arrow_back_icon" />
                    </div>
                    <h2>새 게시물 만들기</h2>
                    <p>공유하기</p>
                  </div>
                  <div class="modal__main">
                    <img src='./assets/media_icon.svg' alt="media_icon" />
                    <h3>사진과 동영상을 업로드 해보세요.</h3>
                    <label for="file">
                      <p>컴퓨터에서 선택</p>
                    </label>
                    <input type="file" name="file" id="file" />
                  </div>
                </div>
              `;

const $addPostBtn = document.querySelector('#add-post');
$addPostBtn.addEventListener('click', () => {
  console.log('click');
  const $modalEl = document.createElement('div');
  $modalEl.setAttribute("class", "modal__layout");
  $modalEl.innerHTML = $modal;
  document.body.prepend($modalEl);

  document.querySelector(".modal__close > img")
    .addEventListener('click', () => {
      document.body.removeChild($modalEl);
    })

})


