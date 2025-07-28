function copyEmail() {
  navigator.clipboard.writeText('h000000nkim@gmail.com')
    .then(() => alert('Email copied!'))
    .catch(err => console.error('Failed to copy email', err));
}

function loadMarkdownFiles(containerId) {
  const apiUrl = 'https://api.github.com/repos/h000000nkim/h000000nkim.github.io/contents';
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

function initHome() {
  const header = document.getElementById('main-header');
  if (!header) return;
  const update = () => {
    const y = window.scrollY;
    if (y > 50) {
      header.classList.add('show');
    } else {
      header.classList.remove('show');
    }
    const ratio = Math.min(1, y / window.innerHeight);
    const shade = Math.round(253 - 120 * ratio);
    document.body.style.backgroundColor = `rgb(${shade}, ${shade}, ${shade})`;
  };
  update();
  window.addEventListener('scroll', update);
}
