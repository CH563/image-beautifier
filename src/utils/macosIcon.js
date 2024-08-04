import { svgToDataURL } from './utils';

const svg = `
<svg width="43" height="32" viewBox="0 0 52 38" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 24.75C9.17564 24.75 11.75 22.1756 11.75 19C11.75 15.8244 9.17564 13.25 6 13.25C2.82436 13.25 0.25 15.8244 0.25 19C0.25 22.1756 2.82436 24.75 6 24.75Z" fill="#FF5F57" stroke="black" stroke-opacity="0.2" stroke-width="0.5"></path><path d="M26 24.75C29.1756 24.75 31.75 22.1756 31.75 19C31.75 15.8244 29.1756 13.25 26 13.25C22.8244 13.25 20.25 15.8244 20.25 19C20.25 22.1756 22.8244 24.75 26 24.75Z" fill="#FEBC2E" stroke="black" stroke-opacity="0.2" stroke-width="0.5"></path><path d="M46 24.75C49.1756 24.75 51.75 22.1756 51.75 19C51.75 15.8244 49.1756 13.25 46 13.25C42.8244 13.25 40.25 15.8244 40.25 19C40.25 22.1756 42.8244 24.75 46 24.75Z" fill="#28C840" stroke="black" stroke-opacity="0.2" stroke-width="0.5"></path></svg>
`;

export default svgToDataURL(svg);