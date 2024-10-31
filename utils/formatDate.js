const formatDate = (dateString) => {
    const date = new Date(dateString); // Convert string to Date object
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

export default formatDate