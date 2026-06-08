import { component$ } from "@builder.io/qwik";
import { QwikCityProvider, RouterOutlet } from "@builder.io/qwik-city";
import "./global.css";

export default component$(() => {
  return (
    <QwikCityProvider>
      <head>
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <title>Noise The White</title>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/svg+xml" href="/favicon-v4.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32-v4.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16-v4.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-v4.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={`document.documentElement.setAttribute('data-theme',localStorage.getItem('theme')||'dark')`}
        />
      </head>
      <body lang="en">
        <RouterOutlet />
      </body>
    </QwikCityProvider>
  );
});
