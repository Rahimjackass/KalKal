import 'tailwindcss/tailwind.css';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function CustomFooter () {
    return (
        <div className='py-4 bottom-0 fixed w-full flex justify-center items-center text-white border-t'>
            <a
                href="https://www.linkedin.com/in/sina-rahimi-b64aaa196/"
                target="_blank"
                rel="noopener noreferrer"
            >
                Made by Sina
            </a>
        </div>
    )
}