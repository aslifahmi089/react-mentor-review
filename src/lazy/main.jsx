import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import LazyApp from "./LazyApp.jsx";

createRoot(document.getElementById("root"))
    .render(
        <StrictMode>
            <LazyApp/>
        </StrictMode>
    )
