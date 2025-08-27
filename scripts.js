function copyEmail() {
  navigator.clipboard.writeText('h000000nkim@gmail.com')
    .then(() => alert('Email copied!'))
    .catch(err => console.error('Failed to copy email', err));
}

function loadMarkdownFiles(containerId, folder = '') {
  const apiUrl = `https://api.github.com/repos/h000000nkim/h000000nkim.github.io/contents/${folder}`;
  fetch(apiUrl)
    .then(res => res.json())
    .then(files => {
      const mdFiles = files.filter(f => f.name.endsWith('.md'));
      const converter = new showdown.Converter();
      mdFiles.forEach(f => {
        fetch(f.download_url)
          .then(r => r.text())
          .then(md => {
            const html = converter.makeHtml(md);
            const div = document.createElement('div');
            div.innerHTML = html;
            document.getElementById(containerId).appendChild(div);
          });
      });
    })
    .catch(err => console.error('Error loading markdown', err));
}

// Initialize scroll-based effects on pages that opt in by using the
// "hide-header" class on the body element. The header remains hidden
// until the user scrolls, and the page background color changes when
// scrolling as well.
function initScrollEffects() {
  const body = document.body;
  if (!body.classList.contains('hide-header')) return;

  const header = document.querySelector('header');

  const toggle = () => {
    if (window.scrollY > 50) {
      header.classList.add('visible');
      body.classList.add('scrolled');
    } else {
      header.classList.remove('visible');
      body.classList.remove('scrolled');
    }
  };

  toggle();
  window.addEventListener('scroll', toggle);
}

document.addEventListener("DOMContentLoaded", () => {
    const markdownContent = `
    # 통계 아카이브
    통계에 대한 다양한 자료를 여기에 추가합니다.
    - 평균
    - 분산
    - 표준편차
    `;

    const htmlContent = marked(markdownContent);
    document.getElementById("markdown-container").innerHTML = htmlContent;
});
