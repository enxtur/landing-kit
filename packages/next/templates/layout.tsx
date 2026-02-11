import type { PropsWithChildren } from "react";
import Script from "next/script";
import "@landing-kit/templates";
import config from "../landing.config";

export default function RootLayout({ children }: PropsWithChildren) {
  const gtagId = config.analytics;

  return (
    <html lang="en">
      <head>
        {/* @ts-expect-error __HAS_CUSTOM_STYLE__ is replaced at build time by landing-kit CLI */}
        {__HAS_CUSTOM_STYLE__ && <link rel="stylesheet" href="/style.css" />}
      </head>
      <body>
        {gtagId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gtagId}');
              `}
            </Script>
          </>
        )}
        {children}
      </body>
    </html>
  );
}
