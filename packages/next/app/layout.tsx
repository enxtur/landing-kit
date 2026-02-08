import * as React from "react";
import Script from "next/script";
import "@landing/core/styles";
import { siteConfig } from "../site.config";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const gtagId = siteConfig.analytics;

  return (
    <html lang="en">
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
