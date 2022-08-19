interface LoaderProps {
  show: boolean;
}

export const Loader: React.FC<LoaderProps> = ({ show }) => {
  if (!show) {
    return <></>;
  }
  return (
    <div
      id="loader"
      style={{
        background: "rgba(255,255,255,0.5)",
        width: "100%",
        height: "100%",
        zIndex: 1000,
        position: "absolute",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "40%",
          top: "20%",
        }}
      >
        <div className="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};
