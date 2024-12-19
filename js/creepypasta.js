document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname.endsWith("index.html") || window.location.pathname === "/") {
        const response = confirm("Apakah kamu sedang sendirian?");
        if (response) {
            alert("Hati-hati, jangan lupa periksa sekelilingmu...");
        } else {
            alert("Kamu yakin mereka manusia?");
        }
    }
});


function searchLegends() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const legends = document.querySelectorAll('.legend');

    legends.forEach(legend => {
        const title = legend.querySelector('h2').textContent.toLowerCase();
        if (title.includes(input)) {
            legend.style.display = "block";
        } else {
            legend.style.display = "none";
        }
    });
}

function toggleReadMore(id, button) {
    const moreText = document.getElementById(id);
    if (moreText.style.display === "none" || !moreText.style.display) {
        moreText.style.display = "inline";
        button.textContent = "Baca Lebih Sedikit";
    } else {
        moreText.style.display = "none";
        button.textContent = "Baca Selengkapnya";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".more").forEach(element => {
        element.style.display = "none";
    });
});


window.addEventListener("DOMContentLoaded", () => {
    const commentForm = document.getElementById("commentForm");
    const commentInput = document.getElementById("commentInput");
    const commentsList = document.getElementById("commentsList");
    const paginationDiv = document.getElementById("pagination");
    const commentsPerPage = 5;
    let currentPage = 1;

    if (!commentForm || !commentInput || !commentsList || !paginationDiv) {
        console.error("Elemen komentar atau pagination tidak ditemukan!");
        return;
    }

    function addCommentToDOM(commentText) {
        const commentDiv = document.createElement("div");
        commentDiv.classList.add("comment");
        commentDiv.innerHTML = `
            <p>${commentText}</p>
            <button class="delete-btn">Hapus</button>
        `;
        commentsList.appendChild(commentDiv);

        const deleteBtn = commentDiv.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", () => {
            deleteComment(commentText);
        });
    }

    function renderComments(page) {
        const comments = JSON.parse(localStorage.getItem("comments")) || [];
        commentsList.innerHTML = ""; 
        const start = (page - 1) * commentsPerPage;
        const end = start + commentsPerPage;

        comments.slice(start, end).forEach((comment) => addCommentToDOM(comment));
        renderPagination(comments.length);
    }

    function renderPagination(totalComments) {
        const totalPages = Math.ceil(totalComments / commentsPerPage);
        paginationDiv.innerHTML = "";

        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement("button");
            pageButton.textContent = i;
            pageButton.classList.add("page-btn");
            if (i === currentPage) {
                pageButton.classList.add("active");
            }
            pageButton.addEventListener("click", () => {
                currentPage = i;
                renderComments(currentPage);
            });
            paginationDiv.appendChild(pageButton);
        }
    }

    function saveComment(commentText) {
        const comments = JSON.parse(localStorage.getItem("comments")) || [];
        comments.push(commentText);
        localStorage.setItem("comments", JSON.stringify(comments));
    }

    function deleteComment(commentText) {
        let comments = JSON.parse(localStorage.getItem("comments")) || [];
        comments = comments.filter((comment) => comment !== commentText);
        localStorage.setItem("comments", JSON.stringify(comments));
        renderComments(currentPage);
    }

    commentForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const commentText = commentInput.value.trim();
        if (commentText) {
            saveComment(commentText);
            commentInput.value = "";
            renderComments(currentPage);
        }
    });

    renderComments(currentPage);
});





