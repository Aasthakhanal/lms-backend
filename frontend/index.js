console.log("js file is found");

const booksContainer = document.getElementById("books-container");

const fetchBooks = async () => {
  const response = await fetch("http://localhost:5003/books");

  const booksData = await response.json();

  console.log(booksData);
  if (booksData.success) {
    booksData.data.map((book) => {
      console.log(book);
      booksContainer.innerHTML += `<div
        style="
          padding: 4px;
          background-color: aliceblue;
          border: 1px solid black;
          border-radius: 4px;
          width: 200px;
        "
      >
        <h3 style="margin-bottom: 4px">${book.title}</h3>
        <p>${book.author}</p>
      </div>
            `;
    });
  }
};

if (booksContainer) {
  fetchBooks();
}
