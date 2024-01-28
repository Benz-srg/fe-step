"use client";
import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import Card from "@mui/material/Card";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { useForm } from "react-hook-form";
import { msgError } from "../utils/swal";
import { useStore } from "@nanostores/react";
import { authStore } from "../store/auth";
import { useRouter } from "next/navigation";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#fff" : "#1A2027",
    border: "1px solid",
    borderColor: theme.palette.mode === "light" ? "#E0E3E7" : "#2D3843",
    width: "100%",
    padding: "10px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

type TLogin = {
  email: string;
  password: string;
};

const Login = () => {
  const form = useForm<TLogin>({
    defaultValues: { email: "step.admin@gmail.com", password: "123456789" },
  });
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const router = useRouter();

  const auth = useStore(authStore);

  React.useEffect(() => {
    if (auth.isLoggedIn) router.push("/");
  }, []);

  const onSubmit = async ({ email, password }: TLogin) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/v1/auth/login`,
      {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );
    const users = await response.json();
    if (users?.token) {
      authStore.set({ isLoggedIn: true, isInitialized: true, user: users });
      router.push("/");
    } else {
      console.error(users);
    }
  };

  return (
    <div>
      <Container>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <Card sx={{ maxWidth: 400, borderRadius: 3, p: 3 }}>
              <Typography
                component="h1"
                variant="h5"
                sx={{ textAlign: "center" }}
              >
                เข้าสู่ระบบ
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl variant="standard" fullWidth sx={{ mt: 1 }}>
                    <TextField
                      size="small"
                      label="อีเมล"
                      type="email"
                      placeholder="ระบุอีเมล"
                      {...register("email", {
                        required: "กรุณาระบุอีเมล",
                        validate: {
                          maxLength: (v) =>
                            v.length <= 50 ||
                            "The email should have at most 50 characters",
                          matchPattern: (v) =>
                            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                              v
                            ) || "Email address must be a valid address",
                        },
                      })}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  </FormControl>
                  {/* <FormControl variant="standard" fullWidth>
                    <InputLabel shrink htmlFor="bootstrap-input">
                      อีเมล
                    </InputLabel>
                    <BootstrapInput
                      id="bootstrap-input"
                      placeholder="ระบุอีเมล"
                      {...register("email", { required: "Email is required" })}
                    />
                  </FormControl> */}
                </Grid>
                <Grid item xs={12}>
                  <FormControl variant="standard" fullWidth>
                    {/* <InputLabel shrink htmlFor="bootstrap-input">
                      รหัสผ่าน
                    </InputLabel>
                    <BootstrapInput
                      id="bootstrap-input"
                      placeholder="ระบุรหัสผ่าน"
                      type="password"
                      {...register("password", {
                        required: "Password is required",
                      })}
                    /> */}
                    <FormControl variant="standard" fullWidth sx={{ mt: 1 }}>
                      <TextField
                        size="small"
                        label="รหัสผ่าน"
                        type="password"
                        placeholder="ระบุรหัสผ่าน"
                        {...register("password", {
                          required: "กรุณาระบุรหัสผ่าน",
                        })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                      />
                    </FormControl>
                  </FormControl>
                </Grid>
                <Grid item xs={6} sx={{ pt: "0 !important" }}>
                  <FormControlLabel
                    control={<Checkbox name="gilad" />}
                    label="จดจำไว้ในระบบ"
                  />
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{
                    pt: "0 !important",
                    display: "flex",
                    justifyContent: "end",
                    alignItems: "center",
                  }}
                >
                  <Link href="/forget-password">
                    <Typography>ลืมรหัสผ่าน</Typography>
                  </Link>
                </Grid>
                <Grid item xs={12} sx={{ textAlign: "center" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      pl: 5,
                      pr: 5,
                      borderRadius: 1.5,
                      background: "#f9ad1d",
                      color: "black",
                      "&:hover": {
                        background: "#e68a00", // สีที่คุณต้องการเมื่อ hover
                      },
                    }}
                  >
                    เข้าสู่ระบบ
                  </Button>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    gap: 1,
                  }}
                >
                  <Typography sx={{ fontSize: 12 }} component="p">
                    ยังไม่มีบัญชีใช่หรือไม่?
                  </Typography>
                  <Link href="/register">
                    <Typography component="p" sx={{ fontSize: 12 }}>
                      ลงทะเบียน
                    </Typography>{" "}
                  </Link>
                </Grid>
              </Grid>
            </Card>
          </Box>
        </form>
      </Container>
    </div>
  );
};

export default Login;
