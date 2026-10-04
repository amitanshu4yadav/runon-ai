import './globals.css';
import type { Metadata } from 'next';
export const metadata: Metadata={title:'Primez Agents — AI that gets work done',description:'Build and run AI agents that research, create, analyze and execute work.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
