import classNames from "../../utils/classNames"
import { Oval } from 'react-loader-spinner';

export default function Badge({ text, className, disabled, type = 'primary', onClick, loading }) {

    const badgeStyles = {
        primary: 'text-primary border-primary bg-[rgba(128,178,176,0.5)]',
        secondary: 'text-white bg-primary'
    }

    return (
        <button onClick={onClick} className={
            classNames(
                disabled ? " bg-white opacity-70" : badgeStyles[type],
                `text-primary border-primary text-xs border px-3 py-2 rounded-lg ${className}`
            )
        }>
            {
                loading ? <Oval
                    height={12}
                    width={24}
                    color="#F5FFF2"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel='oval-loading'
                    secondaryColor="white"
                    strokeWidth={4}
                    strokeWidthSecondary={4}

                /> : text
            }
        </button>
    )
}