import type { PropsWithChildren } from "react";
import Script from "next/script";
import "@landing-kit/templates";
import config from "../landing.config";

export default function RootLayout({ children }: PropsWithChildren) {
  const gtagId = config.analytics;

  const hasCustomStyle = Boolean("__HAS_CUSTOM_STYLE__");

  return (
    <html lang="en">
      <head>
        {hasCustomStyle && <link rel="stylesheet" href="/style.css" />}
        {gtagId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`}
              strategy="beforeInteractive"
            />
            <Script id="gtag-init" strategy="beforeInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gtagId}');
              `}
            </Script>
          </>
        )}
      </head>
      <body>{children}</body>
    </html>
  );
}
