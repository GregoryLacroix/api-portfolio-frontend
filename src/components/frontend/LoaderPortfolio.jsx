import React, { useEffect, useState } from "react";
import stylesFrontEnd from "../../css/frontend/style.module.css";

export default function LoaderPortfolio() {
  return (
    <div className={stylesFrontEnd.loaderWrapper}>
      <div className={stylesFrontEnd.loader}></div>
    </div>
  );
}
