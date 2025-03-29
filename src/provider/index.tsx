"use client";

import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { CountryProvider } from '@/src/store/countryStore';
import { ReactNode, useState } from "react";

export default function Providers({ children }: { children: ReactNode }) {
     const [queryClient] = useState(() => new QueryClient());

     return (
          <QueryClientProvider client={queryClient}>
               <CountryProvider>
                    {children}
               </CountryProvider>
          </QueryClientProvider>
     );
}
