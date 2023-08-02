import classNames from "../../utils/classNames";
import { Oval } from "react-loader-spinner";

export default function Button({
  type,
  text,
  disabled,
  onClick,
  isLoading,
  loaderSize,
}) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={classNames(
        type ? `bg-${type}` : "bg-primary",
        disabled && "opacity-70",
        "inline-flex items-center justify-center rounded-md  bg-indigo-600 px-12 py-3 text-base font-medium text-white shadow-sm w-[210px] whitespace-nowrap hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      )}
    >
      {isLoading ? (
        <Oval
          height={loaderSize}
          width={loaderSize}
          color="#F5FFF2"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="white"
          strokeWidth={4}
          strokeWidthSecondary={4}
        />
      ) : (
        text
      )}
    </button>
  );
}
