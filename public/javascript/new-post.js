const submitNewPost = async (e) => {
    e.preventDefault();
    const title = document.querySelector('#post-title').value.trim();
    const body = document.querySelector('#post-body').value.trim();
  
    if (title && body) {
      const res = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ title, body }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      console.log(res);
      if (res.ok) {
        document.location.replace('/dashboard');
      }
    } else {
      alert('Both fields are required.');
    }
  };
  
  document.querySelector('.new-post-form').addEventListener('submit', submitNewPost);
  