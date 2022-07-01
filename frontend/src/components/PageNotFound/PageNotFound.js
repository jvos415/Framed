import "./PageNotFound.css"

const PageNotFound = () => {

  let footer = document.querySelector(".footer")
  if (footer) {
    footer.classList.add("footer-position")
  }

  return (
    <div className="page-not-found">
      <h3 id="page-not-found-title">Page Not Found!</h3>
      <p id="page-not-found-body">The Page you are looking for cannot be found</p>
    </div>
  )
}

export default PageNotFound;
