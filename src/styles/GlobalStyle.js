import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    --bg: #ffffff;
    --fg: #111;
    --muted: #666;
    --brand: #ff385c; 
    --card: #f7f7f7;
    --radius: 0px;
    --shadow: 0 8px 24px rgba(0,0,0,0.08);
  }
  * { box-sizing: border-box; }
  html, body, #root { height: 100%; }
  body {
    margin: 0;
    font-family: 'Noto Serif KR', serif; /* Default to serif for premium feel, or keep sans-serif for body */
    /* Let's keep sans-serif for body readability, but use serif for headers */
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    color: var(--fg);
    background: var(--bg);
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Noto Serif KR', serif;
  }
  a { color: inherit; text-decoration: none; }
  img { display:block; width:100%; height:100%; object-fit: cover; }
  button { border-radius: 0 !important; } /* Force sharp buttons */
`;

export default GlobalStyle;
