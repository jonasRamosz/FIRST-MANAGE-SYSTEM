import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Card, CardBody, Input, Button } from "@nextui-org/react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

type Inputs = {
  login: string;
  password: string;
};
function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log("data: ", data);

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{ backgroundColor: "#d1e8f0" }}
    >
      <Card
        className="border-none  dark:bg-default-100/50 w-[400px] max-w-[610px] h-[400px] max-w-[500px]  "
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
                />

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
                  type={isVisible ? "text" : "password"}
                  className=" my-5"
                />
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
                {/* <Link href="register">Esqueci a minha senha</Link> */}
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default Login;
