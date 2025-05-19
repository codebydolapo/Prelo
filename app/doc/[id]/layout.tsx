import { auth } from '@clerk/nextjs/server';
import React from 'react';

// Server Component (Wrapper)
const AuthWrapper = async ({ children}: { children: React.ReactNode;}) => {
    auth.protect(); // Server-side authentication

    return (
        <>
            {children}
        </>
    );
};

function DocLayout(
    { children }: { children: React.ReactNode;}
) {
    auth.protect(); // Server-side authentication


    return (
        // <AuthWrapper>
        //     {children}
        // </AuthWrapper>
         <>
            {children}
        </>
    );
}

export default DocLayout;
