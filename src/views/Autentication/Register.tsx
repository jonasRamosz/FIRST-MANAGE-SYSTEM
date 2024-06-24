import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Card, CardBody, Input, Button } from "@nextui-org/react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

type Inputs = {
  login: string;
  password: string;
};
function Register() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const navigate = useNavigate();
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const User = z.object({
    login: z.string().email("Email invalido"),
    password: z
      .string()
      .min(8, " A senha deve ter ao menos 8 caracteres")
      .regex(
        passwordRegex,
        "A senha deve ter pelo menos um número, uma letra maiúscula, uma letra minúscula e um caractere especial."
      ),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(User),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("data: ", data);
    const validation = User.safeParse(data);
    console.log("validation: ", validation);
    if (validation.success === true) {
      toast.success("Registrado com sucesso !");
      navigate("/");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{ backgroundColor: "#d1e8f0" }}
    >
      <Card
        className="border-none dark:bg-default-100/50 w-[400px]  h-[480px]  "
        shadow="sm"
      >
        <CardBody>
          <div className="items-center justify-center ">
            <div>
              <div className="text-gray-500">
                <p className="text-3xl ">
                  {" "}
                  <strong>Cadastre-se</strong>
                </p>
                <h5>É rapido e facil</h5>
              </div>
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
                  type={isVisible ? "text" : "password"}
                  className=" mt-5"
                  arial-invalid={errors.login ? "true" : "false"}
                />
                {errors.password && (
                  <p role="alert" className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
                <div className="flex items-center justify-center h-full mt-10 ">
                  <Button color="primary" type="submit">
                    Cadastra-se
                  </Button>
                </div>
              </form>
              <div className="flex flex-col items-center justify-center h-full mt-5">
                <Link to={"/"} className="text-blue-600">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default Register;
