import React from "react";

function Alert(props) {
  function capitalizeFirstLetter(string) {
    if (string === "danger") {
      string = "error";
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div style={{ height: "60px", position: "sticky" }}>
      {props.alert && (
        <div
          className={`alert alert-${props.alert.type} alert-dismissible fade show `}
          role="alert"
        >
          <strong>{capitalizeFirstLetter(props.alert.type)}</strong>:
          {props.alert.message}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}
    </div>
  );
}

export default Alert;
