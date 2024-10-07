"use client";

import { setName } from "@/app/actions/profile";
import ClientSetName from "@/components/client-set-name";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type UpdateInputs = {
  name: string;
};

export default function SetNamePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateInputs>();

  const onSubmit: SubmitHandler<UpdateInputs> = async (data) => {
    setIsLoading(true);
    setSubmitError(null);

    try {
      const result = await setName(data.name);
      if (result.success && result.name) {
      }
      // navigate("/");
    } catch (error) {
      console.error("Update Failed: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // <div className="flex w-full min-h-screen items-center justify-center bg-gray-100">
    //   <div className="w-full max-w-md space-y-8">
    //     <div>
    //       <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
    //         名前を設定して
    //       </h2>
    //     </div>
    //     <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
    //       <input type="hidden" name="remember" defaultValue="true" />
    //       <div className="rounded-md  -space-y-px">
    //         <div>
    //           <label htmlFor="name" className="sr-only">
    //             Name
    //           </label>
    //           <input
    //             id="name"
    //             className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
    //             placeholder="名前を入力"
    //             {...register("name", {
    //               required: "名前を入力してください",
    //             })}
    //           />
    //           {errors.name && (
    //             <span className="text-red-500 text-xs mt-1">
    //               {errors.name.message}
    //             </span>
    //           )}
    //         </div>
    //       </div>

    //       <div>
    //         <button
    //           type="submit"
    //           disabled={isLoading}
    //           className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:cursor-not-allowed"
    //         >
    //           {isLoading ? "送信中..." : "名前を設定"}
    //         </button>
    //       </div>
    //     </form>
    //   </div>
    // </div>
    <ClientSetName />
  );
}
