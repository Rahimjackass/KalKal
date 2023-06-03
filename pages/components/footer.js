import 'tailwindcss/tailwind.css';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function CustomFooter () {
    return (
        <div className='py-8 bottom-0 fixed w-full flex justify-center items-center text-white bg-gradient-to-t from-blue-900'>
            {/* <a
                href="https://www.linkedin.com/in/sina-rahimi-b64aaa196/"
                target="_blank"
                rel="noopener noreferrer"
            >
                Made by Sina
            </a> */}
            <ConnectButton label="START"/>

        </div>
    )
}