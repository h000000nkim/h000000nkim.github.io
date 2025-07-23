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
