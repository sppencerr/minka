const toggleVoteDisplay = (e) => {
  e.preventDefault();
  const postMetaEl = e.target.parentElement.parentElement;
  const voteEl = postMetaEl.querySelector('.post-votes');
  voteEl.style.display = voteEl.style.display === 'block' ? 'none' : 'block';
};

const voteDataButtons = document.querySelectorAll('.btn-vote-count');
voteDataButtons.forEach(button => button.addEventListener('click', toggleVoteDisplay));
