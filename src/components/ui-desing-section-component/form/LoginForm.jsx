import { useForm } from "react-hook-form";
import { Oval } from "react-loader-spinner";

import useSignin from "../../../hooks/useSignin";
import classNames from "../../../utils/classNames";
import Input from "../../ui-element-component/Input";

function Button({ type, text, disabled, loading, className }) {
  return (
    <button
      type="submit"
      className={classNames(
        type ? `bg-${type}` : "bg-primary",
        disabled && "opacity-70",
        "inline-flex items-center rounded-md  justify-center outline-none  bg-indigo-600 px-12 py-3 text-base font-medium text-white",
        className && className
      )}
    >
      {loading ? (
        <Oval
          height={24}
          width={24}
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

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm();
  const { isLoading, isError, login } = useSignin();

  const onSubmit = handleSubmit((data) => {
    login(data);
  });

  return (
    <section>
      <h1 className=" font-bold text-[32px] mb-3">Login to Hortisol</h1>
      <p className=" mb-[54px]">
        Generate and download reports by different States
      </p>

      {isError && (
        <p
          className="bg-[#FEE2E2] mb-3 border font-bold border-[#EF4444] text-[#B91C1C] px-4 py-3 rounded relative"
          role="alert"
        >
          Invalid Credentials
        </p>
      )}

      <form onSubmit={onSubmit}>
        <Input
          className="mb-3"
          required
          register={register}
          name="username"
          placeholder="Username"
        />
        <Input
          type="password"
          required
          register={register}
          name="password"
          placeholder="Password"
        />
        <Button
          disabled={!isValid}
          loading={isLoading}
          className="w-full mt-12"
          text="Login"
        />
      </form>
    </section>
  );
}
