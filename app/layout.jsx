import '@styles/globals.css';
import Nav from '@components/Nav';
import Footer from '@components/Footer';
import Provider from '@components/Provider';

export const metadata = {
    title: 'BestPrompts',
    descript: 'Discover and share lots of useful AI Prompts'
}

function RootLayout({ children }) {
  return (
    <html lang='en'>
        <body>
            <Provider>
                <div className='main'>
                    <div className='gradient' />
                </div>

                <main className='app'>
                    <Nav />
                    {children}
                    <Footer />
                </main>
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout;