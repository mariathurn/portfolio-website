// Stroke icons, decorative only: the link or button text says what they mean.
type IconProps = { size?: number };

const paths = {
    right: ['M5 12h14', 'M13 6l6 6-6 6'],
    left: ['M19 12H5', 'M11 18l-6-6 6-6'],
    down: ['M12 5v14', 'M19 12l-7 7-7-7'],
    external: ['M7 17L17 7', 'M8 7h9v9'],
    moon: ['M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z'],
    sun: ['M12 2v2', 'M12 20v2', 'M4.9 4.9l1.4 1.4', 'M17.7 17.7l1.4 1.4', 'M2 12h2', 'M20 12h2', 'M4.9 19.1l1.4-1.4', 'M17.7 6.3l1.4-1.4', 'M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0z'],
};

function Icon({ name, size = 16 }: IconProps & { name: keyof typeof paths }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {paths[name].map((d) => <path key={d} d={d} />)}
        </svg>
    );
}

export const ArrowRight = (props: IconProps) => <Icon name="right" {...props} />;
export const ArrowLeft = (props: IconProps) => <Icon name="left" {...props} />;
export const ArrowDown = (props: IconProps) => <Icon name="down" {...props} />;
export const ExternalArrow = (props: IconProps) => <Icon name="external" {...props} />;
export const Moon = (props: IconProps) => <Icon name="moon" {...props} />;
export const Sun = (props: IconProps) => <Icon name="sun" {...props} />;
