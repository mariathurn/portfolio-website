import '../styles/NyanCat.css';

// Pixel-art cat with a pop-tart body, drawn on a 34 × 21 grid.
function NyanCat() {
    return (
        <svg className="nyan-cat-svg" viewBox="0 0 34 21" shapeRendering="crispEdges" aria-hidden="true">
            {/* Tail */}
            <rect x="0" y="9" width="6" height="5" fill="#000" />
            <rect x="1" y="10" width="5" height="3" fill="#999" />

            {/* Legs */}
            <rect x="4" y="17" width="4" height="4" fill="#000" />
            <rect x="5" y="17" width="2" height="3" fill="#999" />
            <rect x="9" y="17" width="4" height="4" fill="#000" />
            <rect x="10" y="17" width="2" height="3" fill="#999" />
            <rect x="17" y="17" width="4" height="4" fill="#000" />
            <rect x="18" y="17" width="2" height="3" fill="#999" />
            <rect x="22" y="17" width="4" height="4" fill="#000" />
            <rect x="23" y="17" width="2" height="3" fill="#999" />

            {/* Pop-tart body */}
            <rect x="4" y="0" width="22" height="19" rx="2" fill="#000" />
            <rect x="5" y="1" width="20" height="17" rx="2" fill="#fac898" />
            <rect x="7" y="3" width="16" height="13" rx="1" fill="#ff99ff" />
            <rect x="9" y="5" width="1" height="1" fill="#ff3399" />
            <rect x="14" y="4" width="1" height="1" fill="#ff3399" />
            <rect x="19" y="6" width="1" height="1" fill="#ff3399" />
            <rect x="11" y="9" width="1" height="1" fill="#ff3399" />
            <rect x="8" y="13" width="1" height="1" fill="#ff3399" />
            <rect x="13" y="12" width="1" height="1" fill="#ff3399" />
            <rect x="17" y="10" width="1" height="1" fill="#ff3399" />
            <rect x="10" y="15" width="1" height="1" fill="#ff3399" />

            {/* Head */}
            <rect x="19" y="5" width="14" height="12" fill="#000" />
            <rect x="19" y="3" width="4" height="3" fill="#000" />
            <rect x="29" y="3" width="4" height="3" fill="#000" />
            <rect x="20" y="4" width="2" height="2" fill="#999" />
            <rect x="30" y="4" width="2" height="2" fill="#999" />
            <rect x="20" y="6" width="12" height="10" fill="#999" />

            {/* Face */}
            <rect x="22" y="8" width="2" height="2" fill="#000" />
            <rect x="22" y="8" width="1" height="1" fill="#fff" />
            <rect x="28" y="8" width="2" height="2" fill="#000" />
            <rect x="28" y="8" width="1" height="1" fill="#fff" />
            <rect x="21" y="11" width="2" height="2" fill="#ff9999" />
            <rect x="29" y="11" width="2" height="2" fill="#ff9999" />
            <rect x="25" y="10" width="1" height="1" fill="#000" />
            <rect x="23" y="13" width="7" height="1" fill="#000" />
            <rect x="23" y="12" width="1" height="1" fill="#000" />
            <rect x="26" y="12" width="1" height="1" fill="#000" />
            <rect x="29" y="12" width="1" height="1" fill="#000" />
        </svg>
    );
}

export default NyanCat;
