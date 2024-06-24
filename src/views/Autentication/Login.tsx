import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Card, CardBody, Input, Button } from "@nextui-org/react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

type Inputs = {
  login: string;
  password: string;
};

function Login() {
  const [isVisible, setIsVisible] = useState(false);

  const User = z.object({
    login: z.string().email("Email inválido"),
    password: z.string().min(8, "Digite a senha"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(User),
  });
  console.log("errors: ", errors);
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const validation = User.safeParse(data);
    if (validation.success === true) {
      const login = "login@login.com";
      const password = "Senha@123";
      if (
        validation.data.login !== login ||
        validation.data.password !== password
      ) {
        toast.error("Login ou senha invalidos !");
      }
    }
    console.log("validation", validation);
  };

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{ backgroundColor: "#d1e8f0" }}
    >
      <Card
        className="border-none  dark:bg-default-100/50 w-[400px] max-w-[610px] h-[450px]   "
        shadow="sm"
      >
        <CardBody>
          <div className="items-center justify-center  max-w-[610px]">
            <div>
              <h1 className="flex items-center justify-center h-full my-5">
                LOGO
              </h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                  type="email"
                  label="Email"
                  {...register("login", { required: true })}
                  arial-invalid={errors.login ? "true" : "false"}
                />
                {errors.login && (
                  <p role="alert" className="text-red-500 text-sm">
                    {errors.login.message}
                  </p>
                )}

                <Input
                  {...register("password", { required: true })}
                  label="Password"
                  variant="bordered"
                  placeholder="Digite a sua senha"
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <FaEye className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  className="mt-5"
                  type={isVisible ? "text" : "password"}
                  arial-invalid={errors.login ? "true" : "false"}
                />
                {errors.password && (
                  <p role="alert" className="text-red-500 text-sm mb-5">
                    {errors.password.message}
                  </p>
                )}
                <div className="flex items-center justify-center h-full mt-10 ">
                  <Button color="primary" type="submit">
                    Login
                  </Button>
                </div>
              </form>
              <div className="flex flex-col items-center justify-center h-full mt-5">
                <div className="flex flex-row">
                  <h2>Não tem uma conta?</h2>
                  <Link to={"register"} className="text-blue-600">
                    Cadastre-se
                  </Link>
                </div>
                <Link to={"register"} className="text-blue-600">
                  Esqueci a minha senha
                </Link>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default Login;
