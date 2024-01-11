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
$addPostBtn.addEventListener('click', createModal)
function createModal() {
  const $modalEl = document.createElement('div');
  $modalEl.setAttribute("class", "modal__layout");
  $modalEl.innerHTML = $modal;
  document.querySelector('body').prepend($modalEl);

  document.querySelector(".modal__close ")
    .addEventListener('click', () => {
      document.querySelector('body').removeChild($modalEl);
    })

  const $fileEl = document.querySelector('#file');
  $fileEl.addEventListener("input", function () {
    const reader = new FileReader();

    reader.readAsDataURL($fileEl.files[0]);
    reader.onload = function () {
      const imageBase64 = reader.result;

      document.querySelector(".modal__card").setAttribute("class", "modal__card write--post")
      document.querySelector(".modal__main").setAttribute("class", "modal__main write--post")
      const $backBtn = document.querySelector(".modal__back >img");
      const $shareBtn = document.querySelector(".modal__header>  p");
      $backBtn.style.visibility = "visible"
      $shareBtn.style.visibility = "visible"

      document.querySelector(".modal__main").innerHTML = createPost(imageBase64)

      $backBtn.addEventListener('click', () => {
        document.body.removeChild($modalEl);
        createModal();
      })

      $shareBtn.addEventListener('click', function () {
        const databaseName = "instagram";
        const version = 1;
        const data = {
          content: document.querySelector(".modal__write > textarea").value,
          image: imageBase64,
        };
        if (window.indexedDB) {
          const request = indexedDB.open(databaseName, version);

          request.onsuccess = function () {
            const store = request.result
              .transaction("posts", "readwrite")
              .objectStore("posts");


            const key = Date.now(); // 예시로 현재 시간을 key로 사용
            store.add(data, key).onsuccess = function () {
              store.getAll().onsuccess = function (e) {
                const response = e.target.result;

                const $mainPostEl = document.querySelector('.main__posts');
                $mainPostEl.setAttribute("class", "main__posts");
                document.querySelector('body').removeChild($modalEl);
                $mainPostEl.innerHTML = ""
                for (let i = 0; i < response.length; i++) {
                  const $postListEl = document.createElement("img");
                  $postListEl.setAttribute("src", response[i].image);

                  $mainPostEl.appendChild($postListEl);
                }


              }
            };
          };

        }
      });







    }
    reader.onerror = function (error) {
      alert("Error", error)
      document.body.removeChild($modalEl);
    }
  })
}

function createPost(img) {
  return `
  <div class="modal__post">
    <img width="478px" height="478px" src=${img} alt="img">
    <div class = "modal__write">
      <textarea placeholder = "문구 입력 ..." autofocus></textarea>
    </div>
  </div>
  `;
}

function main() {
  document.querySelector('#add-post').addEventListener('click', createModal);

  const databaseName = 'instagram';
  const version = 1;

  if (window.indexedDB) {
    const request = indexedDB.open(databaseName, version);
    request.onupgradeneeded = function () {
      request.result.createObjectStore("posts", { autoIncrement: true });
    }
    request.onsuccess = function () {
      const store = request.result
        .transaction('posts', 'readwrite')
        .objectStore('posts');
      store.getAll().onsuccess = function (e) {
        const response = e.target.result;
        if (response.length !== 0) {
          document.querySelector('.main__posts').innerHTML = ""
          for (let i = 0; i < response.length; i++) {
            const $postListEl = document.createElement("img");
            $postListEl.setAttribute("src", response[i].image);

            document.querySelector(".main__posts").appendChild($postListEl);
          }
        }
        else {
          document.querySelector('.main__posts').setAttribute("class", "main__posts not-posts");
        }

      };
    };
  }
}

main();


