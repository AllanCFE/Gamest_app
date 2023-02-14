import '@/styles/globals.css'
import { SessionProvider, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps:{session, ...pageProps} }: AppProps) {
  return(
    <SessionProvider session={session}>
      {
        Component.auth ? (
          <Auth>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )
      }
    </SessionProvider>
  )
}

function Auth({children}) {
  const {status} = useSession({required: true});
  const router = useRouter();

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (status === "error") {
    router.push('/signin');
    return null;
  }

  return children
}
