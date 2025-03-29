"use client";

import { createContext, useContext, ReactNode } from "react";
import {
     QueryClient,
     QueryClientProvider,
     useQuery,
} from "@tanstack/react-query";
import { getLatestCountry } from "../service/api.countries";

export interface Country {
     name: {
       common: string;
       official: string;
       nativeName: Record<string, {
         official: string;
         common: string;
       }>;
     };
     tld: string[];
     borders?: string[];
     cca2: string;
     ccn3: string;
     cca3: string;
     independent: boolean;
     status: string;
     unMember: boolean;
     currencies: Record<string, {
       name: string;
       symbol: string;
     }>;
     idd: {
       root: string;
       suffixes: string[];
     };
     capital: string[];
     altSpellings: string[];
     region: string;
     languages: Record<string, string>;
     translations: Record<string, {
       official: string;
       common: string;
     }>;
     latlng: [number, number];
     landlocked: boolean;
     area: number;
     demonyms: Record<string, {
       f: string;
       m: string;
     }>;
     flag: string;
     maps: {
       googleMaps: string;
       openStreetMaps: string;
     };
     population: number;
     car: {
       signs: string[];
       side: string;
     };
     timezones: string[];
     continents: string[];
     flags: {
       png: string;
       svg: string;
     };
     coatOfArms: Record<string, unknown>;
     startOfWeek: string;
     capitalInfo: {
       latlng: [number, number];
     };
   }
   

interface CountryContextType {
     country: Country[] | undefined;
     isLoading: boolean;
     isError: boolean;
     error: Error | null;
}

const CountryContext = createContext<CountryContextType | undefined>(undefined);

const queryClient = new QueryClient({
     defaultOptions: {
          queries: {
               staleTime: 5 * 60 * 1000,
               gcTime: 10 * 60 * 1000,
          },
     },
});

export function CountryProvider({ children }: { children: ReactNode }) {
     return (
          <QueryClientProvider client={queryClient}>
               <CountryFetcher>{children}</CountryFetcher>
          </QueryClientProvider>
     );
}

function CountryFetcher({ children }: { children: ReactNode }) {
     const {
          data: country,
          isLoading,
          isError,
          error,
     } = useQuery({
          queryKey: ["country"],
          queryFn: async () => {
               const response = await getLatestCountry();
               return response.data;
          },
     });

     const value = {
          country,
          isLoading,
          isError,
          error: error as Error | null,
     };

     return <CountryContext.Provider value={value}>{children}</CountryContext.Provider>;
}

export function useCountry() {
     const context = useContext(CountryContext);
     if (context === undefined) {
          throw new Error("usecountry must be used within a countryProvider");
     }
     return context;
}
