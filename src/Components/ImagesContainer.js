function ImagesContainer({ loaded, children }) {
  return (
    <div
      className="images-container"
      style={{ visibility: loaded ? "visible" : "hidden" }}
    >
      {children}
    </div>
  );
}

export default ImagesContainer;
