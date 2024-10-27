"use strict";
// Sample blog posts
const blogs = [
    {
        title: "My second blog post...TypeScript is crazy!",
        date: "2024-10-25",
        description: "TypeScript is super cool! It feels like coding with a little sidekick—like Link and Navi!",
        image: "/Users/camilayeremin/camilayeremin.github.io/linkwebsite.jpg",
        imageAlt: "Link and Navi",
        slug: "my-second-blog"
    },
    {
        title: "First Blog Post!",
        date: "2024-10-20",
        description: "Trying to learn the basics so far!",
        image: "/Users/camilayeremin/camilayeremin.github.io/typescriptimage.png",
        imageAlt: "Getting Started with React",
        slug: "getting-started-with-react"
    }
    // Add more blog posts as needed
];
// Function to render and append blog posts
function renderBlogs() {
    const blogContainer = document.querySelector('.mainblog');
    // Clear existing content if any
    blogContainer.innerHTML = '';
    blogs.forEach(blog => {
        // Create a new div for the blog post
        const blogDiv = document.createElement('div');
        blogDiv.className = 'blog-post'; // Add a class for styling
        // Create the title element
        const titleElement = document.createElement('h1');
        titleElement.textContent = blog.title;
        // Create the image element
        const imageElement = document.createElement('img');
        imageElement.src = blog.image;
        imageElement.alt = blog.imageAlt;
        // Create the description element
        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = blog.description;
        // Create a link to the individual blog page using the slug
        const linkElement = document.createElement('a');
        linkElement.href = `blogs/${blog.slug}.html`; // Adjust path as necessary
        linkElement.textContent = "Read More"; // Link text
        // Append elements to the blog post div
        blogDiv.appendChild(titleElement);
        blogDiv.appendChild(imageElement);
        blogDiv.appendChild(descriptionElement);
        blogDiv.appendChild(linkElement);
        // Append the blog post div to the main blog container
        blogContainer.appendChild(blogDiv);
    });
}
// Function to display blogs when the page loads
function displayBlogs() {
    renderBlogs();
}
// Run the displayBlogs function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', displayBlogs);
