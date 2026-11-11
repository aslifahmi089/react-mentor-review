import {lazy, Suspense, useState} from "react";

const Profile = lazy(() =>
    new Promise(resolve => setTimeout(resolve))
        .then(() => import("./Profile.jsx"))
);

export default function LazyApp() {
    const [show, setShow] = useState(false);

    return (
        <div>
            <h1>Lazy Load</h1>
            <button onClick={() => setShow(true)}>Show Profile</button>

            {show && (
                <Suspense fallback={<p>Loading...</p>}>
                    <Profile />
                </Suspense>
            )}
        </div>
    );
}
