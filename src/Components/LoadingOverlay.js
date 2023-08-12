import { CircularProgress } from "react-cssfx-loading";

const overlayStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.5)",
};

function LoadingOverlay() {
  return (
    <div style={overlayStyle}>
      <CircularProgress color="rgba(153,8,79,1)" width="50px" height="50px" />
    </div>
  );
}
export default LoadingOverlay;
