import styles from '@/styles/signup/selector.module.css'
import { getProviders, signIn } from 'next-auth/react';
import Image, { StaticImageData } from 'next/image'
import { useRouter } from 'next/router'

import LeftImage from '../../../public/signup/left.png'
import GoogleLogo from '../../../public/SignIn/Google.png'
import CredentialsLogo from '../../../public/SignIn/Mail.png'

export default function selector ({ providers }: { providers: any }) {
    interface logos {
        [key: string]: StaticImageData
    }

    const providersLogos:logos = {
        Google: GoogleLogo,
        credentials: CredentialsLogo
    }

    const router = useRouter()

    return (
        <main className={styles.main}>
            <div className={styles.left}>
                <Image src={LeftImage} alt="signup"/>
            </div>

            <div className={styles.right}>
                <div className={styles.holder}>
                    {Object.values(providers).map((provider:any) => (
                        <div key={provider.name} className={styles.providerLoginButton} onClick={() => provider.id == "Google" ? signIn(provider.id, {callbackUrl: `/signup/${router.query.usertype}?provider=${provider.id}`}) : router.push(`/signup/${router.query.usertype}?provider=${provider.id}`)}>
                        <span className={styles.providerLogo} key={provider.name} >
                            <Image src={providersLogos[provider.name]} alt={provider.name} style={{objectFit: 'contain', maxWidth: '30px', maxHeight: '30px'}} key={provider.name} />
                        </span>
                        <span key={provider} >
                            Log In with {provider.name}
                        </span>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}

export async function getServerSideProps(context:any){
    const providers = await getProviders();

    return {
        props: { providers }
    }
}