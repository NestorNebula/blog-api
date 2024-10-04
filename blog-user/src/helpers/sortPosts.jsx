const sortPosts = (posts) => {
  posts.sort((a, b) => {
    const aDate = new Date(a.creationDate);
    const bDate = new Date(b.creationDate);
    return bDate - aDate;
  });
  return <></>;
};

export default sortPosts;
